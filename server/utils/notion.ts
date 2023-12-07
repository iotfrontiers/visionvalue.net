import { H3Event } from 'h3'
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { NotionNotice, NotionListResponse, NotionPageRequest } from '~/composables/notion'

export const createNotionClient = () => {
  const { notion } = useRuntimeConfig()

  return new Client({
    auth: decryptString(notion.apiSecret),
  })
}

export const getNotionMarkdownContent = cachedFunction(
  async (id: string) => {
    const notion = createNotionClient()
    const n2m = new NotionToMarkdown({ notionClient: notion })
    const blocks = await n2m.pageToMarkdown(id)
    return n2m.toMarkdownString(blocks)?.parent || ''
  },
  {
    maxAge: 10 * 60,
    name: 'notion-markdown-content',
    getKey: pageId => pageId,
  },
)

export const createBoardListApi = async (event: any, databaseId: string) => {
  try {
    const body: NotionPageRequest = (await readBody(event)) || {}
    const notion = createNotionClient()
    const result = await notion.databases.query({
      database_id: databaseId,
      page_size: body.pageSize || 100,
      start_cursor: body.startCursor || undefined,
      filter: {
        property: '게시여부',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: '작성일',
          direction: 'descending',
        },
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    })

    const noticeList: NotionNotice[] = []
    result.results.forEach((row: any) => {
      noticeList.push({
        id: row.id as string,
        title: row?.properties?.['제목']?.title[0]?.['plain_text'] as string,
        author: row?.properties?.['작성자']?.['rich_text'][0]?.['plain_text'] as string,
        viewCnt: row?.properties?.['조회수']?.number as number,
        date: row?.properties?.['작성일']?.date?.start as string,
      })
    })

    return {
      nextCursor: result['next_cursor'],
      list: noticeList,
    } as NotionListResponse<NotionNotice>
  } catch (e) {
    console.error(e)
    return {
      list: [],
    }
  }
}

export const createBoardDetailApi = async (event: H3Event) => {
  try {
    const query = getQuery(event)
    const id: string = query['id'] as string
    const updateView: boolean = query['update'] === 'true'

    if (!id) {
      throw new Error('id is empty')
    }

    const notion = createNotionClient()
    const pageInfo = await notion.pages.retrieve({
      page_id: id as string,
    })

    if (updateView) {
      // @ts-ignore
      const viewCnt = pageInfo?.properties?.['조회수']?.number || 0

      notion.pages.update({
        page_id: id,
        properties: {
          조회수: {
            number: viewCnt + 1,
          },
        },
      })
    }

    // @ts-ignore
    if (pageInfo?.properties?.['게시여부']?.checkbox !== true) {
      throw new Error('Not Found Page')
    }

    // if (!existsSync(cacheDir)) {
    //   mkdirSync(cacheDir, { recursive: true })
    // }

    // @ts-ignore
    // const fileName = id + pageInfo['last_edited_time'].replace(/:/gi, '')
    // const cacheFilePath = `${cacheDir}/${fileName}`

    // if (existsSync(cacheFilePath)) {
    //   console.info('return cached result', cacheFilePath)
    //   return JSON.parse(readFileSync(cacheFilePath, { encoding: 'utf-8' })) as NotionNotice
    // }

    const data: NotionNotice = {
      id: pageInfo.id as string,
      // @ts-ignore
      title: pageInfo?.properties?.['제목']?.title[0]?.['plain_text'] as string,
      // @ts-ignore
      author: pageInfo?.properties?.['작성자']?.['rich_text'][0]?.['plain_text'] as string,
      // @ts-ignore
      viewCnt: pageInfo?.properties?.['조회수']?.number as number,
      // @ts-ignore
      date: pageInfo?.properties?.['작성일']?.date?.start as string,

      content: await getNotionMarkdownContent(id),

      imgUrl: '',
    }

    // if (!existsSync(cacheFilePath)) {
    //   writeFile(cacheFilePath, JSON.stringify(data), { encoding: 'utf-8' }, () => {})
    // }

    return data
  } catch (e) {
    console.error(e)
    return null
  }
}

export const getImageUrlInPage = cachedFunction(
  async (pageId: string) => {
    try {
      const notion = createNotionClient()
      const blockResult = await notion.blocks.children.list({
        block_id: pageId,
      })

      if (blockResult.results) {
        for (const block of blockResult.results) {
          if (block['type'] === 'image' && block['image']) {
            return block['image']?.external?.url || block['image']?.file?.url
          }
        }
      }
    } catch (e) {
      console.error(e)
      return null
    }
  },
  {
    maxAge: 10 * 60,
    name: 'notion-page-image-url',
    getKey: pageId => pageId,
  },
)

import { NotionNotice, NotionListResponse, NotionPageRequest } from '~/composables/notion'

/**
 * 공지사항 상세 조회
 */
export default defineEventHandler(async event => {
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

    return {
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
    } as NotionNotice
  } catch (e) {
    console.error(e)
    return null
  }
})

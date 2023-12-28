import { type NotionNotice, type NotionListResponse } from '~/composables/notion'
import { createNotionClient, getNotionMarkdownContent, getImageUrlInPage, getDataFilePath, getPageDataFilePath } from './utils'
import { writeFileSync, existsSync, readFileSync } from 'node:fs'
import consola from 'consola'

export const makePortfolioDataFile = async () => {
  consola.info('❤ load portfolio list data')

  try {
    const notion = createNotionClient()
    const result = await notion.databases.query({
      database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
      page_size: 100,
      start_cursor: undefined,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    })

    const dataFilePath = getDataFilePath('portfolio')
    let oldData: { list: NotionNotice[] } = null

    if (existsSync(dataFilePath)) {
      oldData = JSON.parse(
        readFileSync(dataFilePath, {
          encoding: 'utf-8',
        }),
      )
    }

    function requireUpdatePage(id: string, lastUpdatedTime: string) {
      if (!oldData) {
        return true
      }

      const pageData = oldData.list.find(row => row.id === id)

      if (!pageData) {
        return pageData
      }

      return lastUpdatedTime !== pageData.lastUpdateDate
    }

    const list: NotionNotice[] = []
    if (result.results) {
      for (const row of result.results) {
        const typedRow = row as any
        const title = typedRow.properties['Name']?.title?.map(t => t.plain_text).join('')
        const categories = typedRow.properties['카테고리']?.multi_select?.map(t => t.name)

        list.push({
          id: row.id as string,
          title,
          imgUrl: requireUpdatePage(row.id, row['last_edited_time']) ? await getImageUrlInPage(row.id) : oldData.list.find(r => r.id === row.id),
          categories,
          lastUpdateDate: row['last_edited_time'],
        })
      }
    }

    const r = {
      nextCursor: result['next_cursor'],
      list,
    } as NotionListResponse<NotionNotice>

    writeFileSync(dataFilePath, JSON.stringify(r, null, 2))
    consola.info('❤ finished portfolio list data')

    for (const item of list) {
      if (requireUpdatePage(item.id, item['last_edited_time'])) {
        await makeDetailFile(item.id)
      }
      consola.info('❤ load portfolio detail data : ' + item.id)
    }
  } catch (e) {
    console.error(e)
    return {
      list: [],
    }
  }
}

const makeDetailFile = async (id: string) => {
  if (!id) {
    throw new Error('id is empty')
  }

  const notion = createNotionClient()
  const pageInfo = await notion.pages.retrieve({
    page_id: id as string,
  })

  const data: NotionNotice = {
    id: pageInfo.id as string,
    // @ts-ignore
    title: pageInfo.properties['Name']?.title?.map(t => t.plain_text).join(''),
    // @ts-ignore
    categories: pageInfo.properties['카테고리']?.multi_select?.map(t => t.name),

    content: await getNotionMarkdownContent(id),

    imgUrl: '',
  }

  writeFileSync(getPageDataFilePath('portfolio', id), JSON.stringify(data, null, 2))
}

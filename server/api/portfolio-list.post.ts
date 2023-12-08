import { NotionPageRequest, NotionNotice, NotionListResponse } from '~/composables/notion'

/**
 * 포트폴리오 목록 조회
 */
export default cachedEventHandler(
  async event => {
    const { notion: notionConfig } = useRuntimeConfig()

    try {
      const body: NotionPageRequest = (await readBody(event)) || {}
      const notion = createNotionClient()
      const result = await notion.databases.query({
        database_id: notionConfig.portFolioDatabaseId,
        page_size: body.pageSize || 100,
        start_cursor: body.startCursor || undefined,
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'descending',
          },
        ],
      })

      const list: NotionNotice[] = []
      if (result.results) {
        for (const row of result.results) {
          const typedRow = row as any
          const title = typedRow.properties['Name']?.title?.map(t => t.plain_text).join('')
          const categories = typedRow.properties['카테고리']?.multi_select?.map(t => t.name)

          list.push({
            id: row.id as string,
            title,
            imgUrl: await getImageUrlInPage(row.id),
            categories,
          })
        }
      }

      return {
        nextCursor: result['next_cursor'],
        list,
      } as NotionListResponse<NotionNotice>
    } catch (e) {
      console.error(e)
      return {
        list: [],
      }
    }
  },
  {
    // maxAge: 10 * 60,
    maxAge: -1,
  },
)

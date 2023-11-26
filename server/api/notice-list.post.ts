import { NotionNotice, NotionListResponse, NotionPageRequest } from '~/composables/notion'

/**
 * 공지사항 목록 조회
 */
export default defineEventHandler(async event => {
  try {
    const body: NotionPageRequest = (await readBody(event)) || {}
    const notion = createNotionClient()
    const result = await notion.databases.query({
      database_id: process.env.NOTION_NOTICE_DATABASE_ID as string,
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
})

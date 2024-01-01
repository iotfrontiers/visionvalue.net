export default defineEventHandler(async event => {
  const query = getQuery(event)
  const id: string = query['id'] as string

  const notion = createNotionClient()
  const pageInfo = await notion.pages.retrieve({
    page_id: id as string,
  })

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
})

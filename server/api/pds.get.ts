/**
 * 자료실 상세 조회
 */
export default defineEventHandler(async event => {
  return createBoardDetailApi(event, process.env.NOTION_PDS_CACHE_DIR as string)
})

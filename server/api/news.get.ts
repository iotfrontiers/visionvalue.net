/**
 * News 상세 조회
 */
export default defineEventHandler(async event => {
  return createBoardDetailApi(event, process.env.NOTION_NEWS_CACHE_DIR as string)
})

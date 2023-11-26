/**
 * 공지사항 상세 조회
 */
export default defineEventHandler(async event => {
  return createBoardDetailApi(event, process.env.NOTION_NOTICE_CACHE_DIR as string)
})

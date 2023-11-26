import { createBoardListApi } from '../utils/notion'

/**
 * News 목록 조회
 */
export default defineEventHandler(async event => {
  return createBoardListApi(event, process.env.NOTION_NEWS_DATABASE_ID as string)
})

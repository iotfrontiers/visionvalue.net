import { createBoardListApi } from '../utils/notion'

/**
 * 자료실 목록 조회
 */
export default defineEventHandler(async event => {
  return createBoardListApi(event, process.env.NOTION_PDS_DATABASE_ID as string)
})

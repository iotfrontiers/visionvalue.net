import { NotionNotice, NotionListResponse, NotionPageRequest } from '~/composables/notion'
import { createBoardListApi } from '../utils/notion'

/**
 * 공지사항 목록 조회
 */
export default defineEventHandler(async event => {
  return createBoardListApi(event, process.env.NOTION_NOTICE_DATABASE_ID as string)
})

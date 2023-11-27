import { NotionNotice, NotionListResponse, NotionPageRequest } from '~/composables/notion'
import { createBoardListApi } from '../utils/notion'

/**
 * 공지사항 목록 조회
 */
export default defineEventHandler(async event => {
  const { notion: notionConfig } = useRuntimeConfig()
  return createBoardListApi(event, notionConfig.noticeDatabaseId)
})

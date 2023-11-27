import { createBoardListApi } from '../utils/notion'

/**
 * 자료실 목록 조회
 */
export default defineEventHandler(async event => {
  const { notion: notionConfig } = useRuntimeConfig()
  return createBoardListApi(event, notionConfig.pdsDatabaseId)
})

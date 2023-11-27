import { createBoardListApi } from '../utils/notion'

/**
 * News 목록 조회
 */
export default defineEventHandler(async event => {
  const { notion: notionConfig } = useRuntimeConfig()
  return createBoardListApi(event, notionConfig.newsDatabaseId as string)
})

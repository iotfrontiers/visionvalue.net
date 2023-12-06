import { createBoardListApi } from '../utils/notion'

/**
 * 공지사항 목록 조회
 */
export default cachedEventHandler(
  async event => {
    const { notion: notionConfig } = useRuntimeConfig()
    return createBoardListApi(event, notionConfig.noticeDatabaseId)
  },
  {
    maxAge: 600,
  },
)

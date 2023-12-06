import { createBoardListApi } from '../utils/notion'

/**
 * 포트폴리오 목록 조회
 */
export default cachedEventHandler(
  async event => {
    const { notion: notionConfig } = useRuntimeConfig()
    return createBoardListApi(event, notionConfig.portFolioDatabaseId)
  },
  {
    maxAge: 600,
  },
)

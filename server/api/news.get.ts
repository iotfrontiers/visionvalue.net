/**
 * News 상세 조회
 */
export default cachedEventHandler(
  async event => {
    const { notion: notionConfig } = useRuntimeConfig()
    return createBoardDetailApi(event, notionConfig.newsCacheDir as string)
  },
  {
    maxAge: 600,
    getKey(event) {
      const query = getQuery(event)
      return query['id'] as string
    },
  },
)

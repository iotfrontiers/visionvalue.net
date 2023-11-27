/**
 * 자료실 상세 조회
 */
export default defineEventHandler(async event => {
  const { notion: notionConfig } = useRuntimeConfig()
  return createBoardDetailApi(event, notionConfig.pdsCacheDir)
})

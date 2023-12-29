import { NotionDataLoader } from './loader'

export const makePortfolioDataFile = async () => {
  const loader = new NotionDataLoader({
    id: 'portfolio',
    hasImageInList: true,
    customizeDatabaseQuery(req) {
      req.sorts = [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ]
      return req
    },
    customizeDatabaseResponse(res) {
      const title = res.properties['Name']?.['title']?.map(t => t.plain_text).join('')
      const categories = res.properties['카테고리']?.['multi_select']?.map(t => t.name)

      return {
        title,
        categories,
      }
    },
    customizePageResponse(res) {
      const title = res.properties['Name']?.['title']?.map(t => t.plain_text).join('')
      const categories = res.properties['카테고리']?.['multi_select']?.map(t => t.name)

      return {
        title,
        categories,
      }
    },
  })
  await loader.loadDatabase(process.env.NOTION_PORTFOLIO_DATABASE_ID)
}

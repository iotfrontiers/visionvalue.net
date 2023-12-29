import { NotionDataLoader } from './loader'
import { useDeepMerge } from '../utils/core'

export const makeProductDataFile = async () => {
  const loader = new NotionDataLoader({
    id: 'product',
    hasImageInList: false,
    appendChildPageInfo: true,
    customizeDatabaseQuery(req) {
      return useDeepMerge(req, {
        sorts: [
          {
            timestamp: 'created_time',
            direction: 'ascending',
          },
        ],
      })
    },
  })

  await loader.loadPageHierarchy(process.env.NOTION_PRODUCT_PAGE_ID)
}

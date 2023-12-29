import { NotionDataLoader } from './loader'
import { useDeepMerge } from '../utils/core'

export const makeEducationDataFile = async () => {
  const loader = new NotionDataLoader({
    id: 'education',
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

  await loader.loadPageHierarchy(process.env.NOTION_EDUCATION_PAGE_ID)
}

import { type NotionNotice, type NotionListResponse } from '~/composables/notion'
import { useDeepMerge } from '../utils/core'
import { createNotionClient, getNotionMarkdownContent, getImageUrlInPage, getDataFilePath, getPageDataFilePath } from './utils'
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'pathe'
import consola from 'consola'
import {
  type PageObjectResponse,
  type PartialPageObjectResponse,
  type PartialDatabaseObjectResponse,
  type DatabaseObjectResponse,
  type QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'

export type NotionPageOrDatabaseResponse = PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse

export interface NotionDataLoaderOptions {
  id: 'portfolio' | 'notice' | 'news' | 'pds'
  hasImageInList: boolean
  customizeDatabaseQuery: (req: QueryDatabaseParameters) => Partial<QueryDatabaseParameters>
  customizeDatabaseResponse?: (res: DatabaseObjectResponse) => NotionNotice | Promise<NotionNotice>
  customizePageResponse?: (res: PageObjectResponse) => NotionNotice | Promise<NotionNotice>
}

export class NotionDataLoader {
  private options: Partial<NotionDataLoaderOptions>

  constructor(options: NotionDataLoaderOptions) {
    this.options = useDeepMerge({ hasImageInList: false }, options)
  }

  private createDirectories(filePath: string) {
    const targetDir = dirname(filePath)
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true })
    }
  }

  /**
   * 데이터페이스를 로드한다.
   * @param databaseId 데이터베이스 아이디
   * @param loadSubPages 하위 페이지 생성 여부
   * @returns
   */
  async loadDatabase(databaseId: string, loadSubPages = true) {
    consola.info(`load ${this.options.id} database`)

    try {
      const notion = createNotionClient()
      const queryOption = <QueryDatabaseParameters>this.options.customizeDatabaseQuery({
        database_id: databaseId,
        page_size: 100,
      })
      const result = await notion.databases.query(queryOption)

      const dataFilePath = getDataFilePath(this.options.id)
      this.createDirectories(dataFilePath)

      let oldData: { list: NotionNotice[] } = null
      if (existsSync(dataFilePath)) {
        oldData = JSON.parse(
          readFileSync(dataFilePath, {
            encoding: 'utf-8',
          }),
        )
      }

      function requireUpdatePage(id: string, lastUpdatedTime: string) {
        if (!oldData) {
          return true
        }

        const pageData = oldData.list.find(row => row.id === id)

        if (!pageData) {
          return pageData
        }

        return lastUpdatedTime !== pageData.lastUpdateDate
      }

      const list: NotionNotice[] = []
      if (result.results) {
        for (const row of result.results) {
          let listData: NotionNotice = {}
          if (this.options.customizeDatabaseResponse) {
            listData = (await this.options.customizeDatabaseResponse(<DatabaseObjectResponse>row)) || {}
          }

          listData = useDeepMerge({}, listData, {
            id: row.id as string,
            imgUrl: !this.options.hasImageInList
              ? null
              : requireUpdatePage(row.id, row['last_edited_time'])
              ? await getImageUrlInPage(row.id)
              : oldData.list.find(r => r.id === row.id)?.imgUrl,
            lastUpdateDate: row['last_edited_time'],
          })

          list.push(listData)
        }
      }

      const r = {
        nextCursor: result['next_cursor'],
        list,
      } as NotionListResponse<NotionNotice>

      writeFileSync(dataFilePath, JSON.stringify(r, null, 2))
      consola.info(`finished ${this.options.id} database`)

      for (const item of list) {
        await this.loadPage(item.id)
      }
    } catch (e) {
      console.error(e)
      return {
        list: [],
      }
    }
  }

  async loadPage(id: string) {
    if (!id) {
      throw new Error('id is empty')
    }

    consola.info(`load ${this.options.id} page data : ` + id)

    const dataFilePath = getPageDataFilePath(this.options.id, id)
    this.createDirectories(dataFilePath)

    let oldData: NotionNotice = null
    if (existsSync(dataFilePath)) {
      oldData = JSON.parse(readFileSync(dataFilePath, { encoding: 'utf-8' }))
    }

    const notion = createNotionClient()
    const pageInfo = await notion.pages.retrieve({
      page_id: id as string,
    })

    let data: NotionNotice = {}
    if (this.options.customizePageResponse) {
      data = (await this.options.customizePageResponse(<PageObjectResponse>pageInfo)) || {}
    }

    data = useDeepMerge({}, data, {
      id: pageInfo.id as string,
      content: oldData && oldData.lastUpdateDate === pageInfo['last_edited_time'] ? oldData.content : await getNotionMarkdownContent(id),
      lastUpdateDate: pageInfo['last_edited_time'],
      imgUrl: '',
    })

    writeFileSync(dataFilePath, JSON.stringify(data, null, 2))

    consola.info(`finished ${this.options.id} page data : ` + id)
  }
}

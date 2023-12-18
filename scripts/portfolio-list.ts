import { type NotionPageRequest, type NotionNotice, type NotionListResponse } from '~/composables/notion'
import { Client } from '@notionhq/client'
import { decryptString } from '../server/utils/crypt'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import { createHash } from 'node:crypto'
import { extname, resolve } from 'pathe'
import { writeFileSync } from 'node:fs'
import axios from 'axios'

const TARGET_FILE_PATH = resolve(__dirname, '../data/portfolio.json')

const createNotionClient = () => {
  return new Client({
    auth: decryptString(process.env.NOTION_API_SECRET),
  })
}

const makePortfolioDataFile = async () => {
  try {
    const notion = createNotionClient()
    const result = await notion.databases.query({
      database_id: process.env.NOTION_PORTFOLIO_DATABASE_ID,
      page_size: 100,
      start_cursor: undefined,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    })

    const list: NotionNotice[] = []
    if (result.results) {
      for (const row of result.results) {
        const typedRow = row as any
        const title = typedRow.properties['Name']?.title?.map(t => t.plain_text).join('')
        const categories = typedRow.properties['카테고리']?.multi_select?.map(t => t.name)

        list.push({
          id: row.id as string,
          title,
          imgUrl: await getImageUrlInPage(row.id),
          categories,
        })
      }
    }

    const r = {
      nextCursor: result['next_cursor'],
      list,
    } as NotionListResponse<NotionNotice>

    console.log('result', r)
    writeFileSync(TARGET_FILE_PATH, JSON.stringify(r, null, 2))
  } catch (e) {
    console.error(e)
    return {
      list: [],
    }
  }
}

const getImageUrlInPage = async (pageId: string, saveAsLocal: boolean = true) => {
  try {
    const notion = createNotionClient()
    const blockResult = await notion.blocks.children.list({
      block_id: pageId,
    })

    if (blockResult.results) {
      for (const block of blockResult.results) {
        if (block['type'] === 'image' && block['image']) {
          let fileUrl = null
          if (saveAsLocal && block['image']?.file?.url) {
            fileUrl = block['image']?.file?.url
            // const localFileUrl = await saveFileFromImageUrl('portfolio', fileUrl)
            const cloudinaryFileUrl = await uploadCloudinaryImage(fileUrl)
            if (cloudinaryFileUrl) {
              fileUrl = cloudinaryFileUrl
            }
          }

          return fileUrl ? fileUrl : block['image']?.external?.url
        }
      }
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

const setGlobalConfig = () => {
  cloudinary.config({
    cloud_name: decryptString(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: decryptString(process.env.CLOUDINARY_API_KEY),
    api_secret: decryptString(process.env.CLOUDINARY_API_SECRET),
  })
}

const uploadCloudinaryImage = (imageUrl: string) => {
  return new Promise(async (resolve, reject) => {
    setGlobalConfig()

    if (!imageUrl.includes('amazonaws.com')) {
      resolve(imageUrl)
      return
    }

    const resourceUrl = new URL(imageUrl)
    const fileId = createHash('md5')
      .update(resourceUrl.origin + resourceUrl.pathname)
      .digest('hex')

    const destUrl = cloudinary.url(`frontier/${fileId}`, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      secure: true,
      format: getFileExt(resourceUrl.pathname),
    })

    try {
      await axios.request({
        method: 'HEAD',
        url: destUrl,
      })
      resolve(destUrl)
      return
    } catch (e) {}

    cloudinary.uploader
      .upload(imageUrl, {
        public_id: fileId,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        overwrite: false,
      })
      .then(res => resolve(res.url))
      .catch(err => {
        console.error(err)
        //reject(err)
        resolve(imageUrl)
      })
  })
}

const getFileExt = (url: string) => {
  const ext = extname(url).toLocaleLowerCase()

  if (ext === '.jpeg') {
    return 'jpg'
  }

  return ext.substring(1)
}

dotenv.config()
makePortfolioDataFile()

import { Client } from '@notionhq/client'
import { v2 as cloudinary } from 'cloudinary'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { decryptString } from '../server/utils/crypt.ts'
import { extname, resolve, dirname } from 'pathe'
import { NotionToMarkdown } from 'notion-to-md'
import axios from 'axios'

/**
 * notion client 객체 생성
 * @returns
 */
export const createNotionClient = () => {
  return new Client({
    auth: decryptString(process.env.NOTION_API_SECRET),
  })
}

/**
 * 페이지의 이미지 URL을 반환
 * @param pageId
 * @param saveAsLocal
 * @returns
 */
export const getImageUrlInPage = async (pageId: string, saveAsLocal: boolean = true) => {
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

/**
 * cloudinary 전역 설정
 */
const setCloudinaryGlobalConfig = () => {
  cloudinary.config({
    cloud_name: decryptString(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: decryptString(process.env.CLOUDINARY_API_KEY),
    api_secret: decryptString(process.env.CLOUDINARY_API_SECRET),
  })
}

const getFileExt = (url: string) => {
  const ext = extname(url).toLocaleLowerCase()

  if (ext === '.jpeg') {
    return 'jpg'
  }

  return ext.substring(1)
}

const uploadCloudinaryImage = (imageUrl: string) => {
  return new Promise(async (resolve, reject) => {
    setCloudinaryGlobalConfig()

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

export const getNotionMarkdownContent = async (id: string, downloadResource: boolean = true) => {
  const notion = createNotionClient()
  const n2m = new NotionToMarkdown({ notionClient: notion })
  const blocks = await n2m.pageToMarkdown(id)

  if (downloadResource) {
    for (const block of blocks) {
      if (block.type === 'image') {
        if (block.parent) {
          const dataArr = block.parent.split('(')

          if (dataArr[1].includes('amazonaws.com')) {
            // const imgPath = await saveFileFromImageUrl(id, dataArr[1].substring(0, dataArr[1].length - 1))
            const cloudinaryFileUrl = await uploadCloudinaryImage(dataArr[1].substring(0, dataArr[1].length - 1))
            if (cloudinaryFileUrl) {
              block.parent = dataArr[0] + `(${cloudinaryFileUrl})`
            }
          }
        }
      }

      if (block.type === 'file') {
        if (block.parent) {
          const dataArr = block.parent.split('(')

          if (dataArr[1].includes('amazonaws.com')) {
            // const filePath = await saveFileFromImageUrl(id, dataArr[1].substring(0, dataArr[1].length - 1))
            const cloudinaryFileUrl = await uploadCloudinaryImage(dataArr[1].substring(0, dataArr[1].length - 1))

            if (cloudinaryFileUrl) {
              block.parent = dataArr[0] + `(${cloudinaryFileUrl})`
            }
          }
        }
      }
    }
  }

  return n2m.toMarkdownString(blocks)?.parent || ''
}

/**
 * 데이터 파일 경로 조회
 * @param id
 * @returns
 */
export const getDataFilePath = (id: string) => {
  return resolve(fileURLToPath(dirname(import.meta.url)), `../data/${id}.json`)
}

/**
 * 페이지 데이터 파일 경로 조회
 * @param id
 * @param pageId
 * @returns
 */
export const getPageDataFilePath = (id: string, pageId: string) => {
  return resolve(fileURLToPath(dirname(import.meta.url)), `../public/data/${id}/${pageId}.json`)
}

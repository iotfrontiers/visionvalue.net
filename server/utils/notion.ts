import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

export const createNotionClient = () => {
  return new Client({
    auth: process.env.NOTION_API_SECRET,
  })
}

export const getNotionMarkdownContent = async (id: string) => {
  const notion = createNotionClient()
  const n2m = new NotionToMarkdown({ notionClient: notion })
  const blocks = await n2m.pageToMarkdown(id)
  return n2m.toMarkdownString(blocks)?.parent || ''
}

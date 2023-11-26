import { NotionToMarkdown } from 'notion-to-md'

export default defineEventHandler(async event => {
  const notion = createNotionClient()
  const n2m = new NotionToMarkdown({ notionClient: notion })
  const blocks = await n2m.pageToMarkdown('75d74353-4c84-48ea-9287-4701b19e813a')
  return n2m.toMarkdownString(blocks)
})

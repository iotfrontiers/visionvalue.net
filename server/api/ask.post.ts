import { NotionAskReqeust } from '~/composables/notion'

/**
 * 기술/견적 문의
 */
export default defineEventHandler(async event => {
  const notion = createNotionClient()
  const body = (await readBody(event)) as NotionAskReqeust

  if (!body || !body.title || !body.author || !body.content || !body.email || !/.+@.+\..+/.test(body.email)) {
    throw new Error('유효하지 않은 요청입니다.')
  }

  notion.pages.create({
    parent: {
      database_id: process.env.NOTION_ASK_DATABASE_ID,
    },
    properties: {
      제목: {
        type: 'title',
        title: [
          {
            text: {
              content: body.title,
            },
          },
        ],
      },
      작성자: {
        type: 'rich_text',
        rich_text: [
          {
            text: {
              content: body.author,
            },
          },
        ],
      },
      이메일: {
        type: 'email',
        email: body.email,
      },
      연락처: {
        type: 'rich_text',
        rich_text: [
          {
            text: {
              content: body.contact,
            },
          },
        ],
      },
    },
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: body.content,
              },
            },
          ],
        },
      },
    ],
  })
})

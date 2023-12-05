import { NotionAskReqeust } from '~/composables/notion'

/**
 * 기술/견적 문의
 */
export default defineEventHandler(async event => {
  const { notion: notionConfig } = useRuntimeConfig()
  const notion = createNotionClient()
  const body = (await readBody(event)) as NotionAskReqeust

  if (!body || !body.title || !body.author || !body.content || !body.email || !/.+@.+\..+/.test(body.email)) {
    throw new Error('유효하지 않은 요청입니다.')
  }

  await notion.pages.create({
    parent: {
      database_id: notionConfig.askDatabaseId,
    },
    properties: {
      제목: {
        type: 'title',
        title: [
          {
            text: {
              content: body.title || '',
            },
          },
        ],
      },
      작성자: {
        type: 'rich_text',
        rich_text: [
          {
            text: {
              content: body.author || '',
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
              content: body.contact || '',
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
                content: body.content || '',
              },
            },
          ],
        },
      },
    ],
  })

  let mailContent = `<p>- 작성자: ${body.author || ''}</p>
  <p>- 작성자 이메일: ${body.email || ''}</p>
  <p>- 작성자 전화번호: ${body.contact || ''}</p>
  <p></p>
  <p>${body.content || ''}</p>
  `

  await sendEmail('프론티어 기술/견적문의 : ' + body.title, mailContent)
})

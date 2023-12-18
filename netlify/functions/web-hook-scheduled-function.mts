import type { Config } from '@netlify/functions'
import axios from 'axios'
import https from 'https'

export default async (req: Request) => {
  axios
    .post(`${process.env.SITE_URL || 'http://localhost:12005'}/api/portfolio-list`, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
    .then(() => {
      console.info('fetch portfolio finished....')
    })

  // const { next_run } = await req.json()
  // console.log('Received event! Next invocation at:', next_run)
}

export const config: Config = {
  schedule: '*/10 * * * *',
}

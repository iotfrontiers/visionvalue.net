import axios from 'axios'
import https from 'https'

export default defineNitroPlugin(async () => {
  // function callApi() {
  //   console.info('fetch portfolio started....', process.cwd())
  //   axios
  //     .post(`${process.env.SITE_URL || 'http://localhost:12005'}/api/portfolio-list`, {
  //       httpsAgent: new https.Agent({
  //         rejectUnauthorized: false,
  //       }),
  //     })
  //     .then(() => {
  //       console.info('fetch portfolio finished....')
  //     })
  // }
  // setInterval(() => {
  //   callApi()
  // }, 1000 * 60 * 10)
  // setTimeout(() => callApi(), 10000)
})

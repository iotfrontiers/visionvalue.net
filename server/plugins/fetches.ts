import axios from 'axios'

export default defineNitroPlugin(async () => {
  function callApi() {
    // console.info('fetch portfolio started....')
    // axios.post('http://localhost:12005/api/portfolio-list', {}).then(() => {
    //   console.info('fetch portfolio finished....')
    // })
  }

  setInterval(() => {
    callApi()
  }, 1000 * 60 * 10)

  setTimeout(() => callApi(), 10000)
})

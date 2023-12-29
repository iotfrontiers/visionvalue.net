import dotenv from 'dotenv'
import { makePortfolioDataFile } from './portfolio'
import { makeNewsDataFile } from './news'
import { makeNoticeDataFile } from './notice'
;(async () => {
  dotenv.config()
  await makePortfolioDataFile()
  await makeNewsDataFile()
  await makeNoticeDataFile()
})()

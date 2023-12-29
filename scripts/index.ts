import dotenv from 'dotenv'
import { makePortfolioDataFile } from './portfolio'
import { makeNewsDataFile } from './news'
import { makeNoticeDataFile } from './notice'
import { makePdsDataFile } from './pds'
import { makeEducationDataFile } from './education'
import { makeProductDataFile } from './product'
;(async () => {
  dotenv.config()
  await makePortfolioDataFile()
  await makeNewsDataFile()
  await makeNoticeDataFile()
  await makePdsDataFile()
  await makeEducationDataFile()
  await makeProductDataFile()
})()

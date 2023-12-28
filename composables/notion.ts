interface NotionNotice {
  id?: string
  num?: number
  title?: string
  author?: string
  viewCnt?: number
  date?: string
  content?: string
  imgUrl?: string
  categories?: string[]
  lastUpdateDate?: string
}

interface NotionListResponse<T> {
  nextCursor?: string
  list?: T[]
}

interface NotionPageRequest {
  pageSize?: number
  startCursor?: string
}

interface NotionAskReqeust {
  title?: string
  author?: string
  email?: string
  contact?: string
  content?: string
}

export { type NotionNotice, type NotionListResponse, type NotionPageRequest, type NotionAskReqeust }

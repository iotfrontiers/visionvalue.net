interface NotionNotice {
  id?: string
  num?: number
  title?: string
  author?: string
  viewCnt?: number
  date?: string
  content?: string
}

interface NotionListResponse<T> {
  nextCursor?: string
  list?: T[]
}

interface NotionPageRequest {
  pageSize?: number
  startCursor?: string
}

export { type NotionNotice, type NotionListResponse, type NotionPageRequest }

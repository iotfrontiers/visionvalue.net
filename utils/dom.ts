/**
 * html 문자열을 dom으로 변환한다.
 * @param html
 * @returns
 */
export const htmlToElement = (html: string) => {
  const template = document.createElement('template')
  html = html.trim()
  template.innerHTML = html
  return template.content.firstChild
}

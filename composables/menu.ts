import productMenuInfo from '~/data/product.json'

/**
 * 제품 소개 메뉴 정보
 * @returns
 */
export const useProductIntroMenu = () => {
  return computed(() => {
    return {
      show: productMenuInfo.children.length > 0,
      get default() {
        if (productMenuInfo.children.length > 0) {
          return {
            title: productMenuInfo.children[0].title,
            url: `/product/${productMenuInfo.children[0].id}`,
          }
        } else {
          return null
        }
      },
      menus: productMenuInfo.children,
    }
  })
}

/**
 * 제품 소개 URL 오픈
 * @param id
 * @param linkUrl
 */
export const openProductionUrl = (id: string, linkUrl: string) => {
  const router = useRouter()
  if (linkUrl) {
    window.open(linkUrl, '_blank')
  } else {
    router.push(`/product/${id}`)
  }
}

import productMenuInfo from '~/data/product.json'
import educationMenuInfo from '~/data/education.json'
import { type NotionData } from './notion'

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
 * 교육자료 메뉴 조회
 * @returns
 */
export const useEducationDataMenu = () => {
  return computed(() => {
    return {
      menus: educationMenuInfo.children,
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

/**
 * 교육자료 URL 오픈
 * @param id
 * @param linkUrl
 */
export const openEducationUrl = (id: string, linkUrl: string) => {
  const router = useRouter()
  if (linkUrl) {
    window.open(linkUrl, '_blank')
  } else {
    router.push(`/community/education/${id}`)
  }
}

/**
 * 교육자료 메뉴 조회
 * @param id
 * @returns
 */
export const findEducationMenu = (id: string): NotionData => {
  const menus = useEducationDataMenu().value.menus

  function find(menus: NotionData[]) {
    if (!menus) {
      return
    }

    for (const menu of menus) {
      if (menu.id === id) {
        return menu
      }

      const subResult = find(menu.children)
      if (subResult) {
        return subResult
      }
    }
  }

  return find(menus)
}

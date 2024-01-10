<template>
  <div class="page-wrap">
    <CommonPageContainer
      header-bg-img="banner-product.png"
      :tabItems="
        productIntroMenu.menus.map(menu => {
          return {
            title: menu.title,
            targetUrl: `/product/${menu.id}`,
            beforeRoute(tab) {
              if (menu.linkUrl) {
                openNewWindow(menu.linkUrl)
                return false
              }
            },
          }
        })
      "
    >
      <NuxtPage />
    </CommonPageContainer>
  </div>
</template>
<script lang="ts" setup>
const productIntroMenu = useProductIntroMenu()
</script>

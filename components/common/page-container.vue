<template>
  <VContainer class="sub-page-container" :fluid="true">
    <VRow class="page-header-row" :style="{ backgroundImage: `url(/img/${props.headerBgImg})` }">
      <MainHeader />
      <CommonPageTabs style="position: absolute; left: 0; right: 0; bottom: 0" :items="props.tabItems" @click:menu-item="menuTabClicked" />
    </VRow>
    <VRow class="content-wrap">
      <div class="section">
        <div class="sub-title text-h3 font-weight-black mb-15">{{ subTitle }}</div>
        <slot />
      </div>
    </VRow>
  </VContainer>
</template>
<script lang="ts" setup>
import type { Tab } from './page-tabs.vue'

const props = withDefaults(
  defineProps<{
    headerBgImg?: string
    tabItems: Tab[]
  }>(),
  {
    headerBgImg: 'banner-corp.png',
  },
)

const subTitle = ref(props.tabItems[0].title)

const menuTabClicked = (menu: Tab) => {
  subTitle.value = menu.title
}
</script>

<style lang="scss">
.sub-page-container {
  padding-bottom: 0;

  .v-row.page-header-row {
    min-height: min(506px, 80vw);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  }

  .content-wrap {
    height: auto;
    padding-bottom: 100px;
    padding-top: 90px;
    background-color: #fff;
    color: black;
  }

  .section {
    position: relative;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 10px;

    img {
      max-width: 100%;
    }
  }
}
</style>

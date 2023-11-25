<template>
  <VContainer class="sub-page-container" :fluid="true">
    <VRow class="page-header-row" :style="{ background: `url(/img/${props.headerBgImg})` }">
      <MainHeader />
      <CommonPageTabs style="position: absolute; left: 0; right: 0; bottom: 0" :items="props.tabItems" />
    </VRow>
    <VRow class="content-wrap">
      <div class="sub-title">타이틀</div>
      <div class="section">
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
</script>

<style lang="scss">
.v-row.page-header-row {
  min-height: 1018px;
  background-size: cover;
  position: relative;
}

.sub-page-container {
  .sub-title {
  }

  .content-wrap {
    height: auto;
    padding-bottom: 100px;
    padding-top: 90px;
    background-color: #fff;
    color: black;
  }

  .section {
    margin: 0 auto;
  }
}
</style>

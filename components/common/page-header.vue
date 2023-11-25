<template>
  <VContainer :fluid="true">
    <VRow class="page-header-row" :style="{ background: `url(/img/${props.headerBgImg})` }">
      <MainHeader />
      <CommonPageTabs style="position: absolute; left: 0; right: 0; bottom: 0" :items="props.tabItems" />
    </VRow>
    <VRow style="min-height: 100px">
      <slot />
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
</style>

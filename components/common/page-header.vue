<template>
  <VContainer :fluid="true">
    <VRow class="page-header-row" :style="{ background: `url(/img/${props.headerBgImg})` }">
      <MainHeader />
    </VRow>
    <VRow>
      <slot />
    </VRow>
  </VContainer>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    headerBgImg?: string
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
}
</style>

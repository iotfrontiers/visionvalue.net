<template>
  <VContainer>
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
    headerBgImg: 'banner-biz.png',
  },
)
</script>

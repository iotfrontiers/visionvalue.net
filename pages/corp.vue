<template>
  <div class="page-wrap">
    <CommonPageHeader
      header-bg-img="banner-corp.png"
      :tabItems="[
        { title: '인사말', targetUrl: '/corp/introduce' },
        { title: '사업영역', targetUrl: '/corp/field' },
        { title: '주요고객사', targetUrl: '/corp/client' },
        { title: '오시는길', targetUrl: '/corp/map' },
      ]"
    >
      <NuxtPage />
    </CommonPageHeader>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.page-wrap {
  width: 100%;
}
</style>

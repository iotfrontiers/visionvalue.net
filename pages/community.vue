<template>
  <div class="page-wrap">
    <CommonPageContainer
      header-bg-img="banner-commnity.png"
      :tabItems="[
        { title: '공지사항', targetUrl: '/community/notice' },
        { title: 'News', targetUrl: '/community/news' },
      ]"
    >
      <NuxtPage />
    </CommonPageContainer>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss"></style>

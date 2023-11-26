<template>
  <div class="page-wrap">
    <CommonPageHeader
      header-bg-img="banner-inquiry.png"
      :tabItems="[
        { title: '기술/견적문의', targetUrl: '/inquiry/ask' },
        { title: '자료실', targetUrl: '/inquiry/pds' },
      ]"
    >
      <NuxtPage />
    </CommonPageHeader>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss"></style>

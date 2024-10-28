<template>
  <div class="page-wrap">
    <CommonPageContainer
      header-bg-img="banner-field.png"
      :tabItems="[
        { title: '응용 LED 디스플레이', targetUrl: '/field/display' },
        { title: '웹 플랫폼', targetUrl: '/field/smart-factory' },
        { title: '개발(S/W & H/W)', targetUrl: '/field/dev' },
        { title: '인력 아웃소싱 사업', targetUrl: '/field/out-sourcing' },
      ]"
    >
      <NuxtPage />
    </CommonPageContainer>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss"></style>

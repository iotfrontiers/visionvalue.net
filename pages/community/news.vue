<template>
  <BoardList :listData="newsList" detailPageUrl="/community/news/" />
</template>
<script setup lang="ts">
import newsList from '~/data/news.json'
</script>

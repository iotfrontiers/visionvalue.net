<template>
  <BoardList :listData="pdsList" detailPageUrl="/inquiry/pds/" />
</template>
<script setup lang="ts">
import pdsList from '~/data/pds.json'
</script>

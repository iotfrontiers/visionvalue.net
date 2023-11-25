<template>
  <VRow class="top-menu" alignContent="center">
    <VCol>FRONTIER</VCol>
    <VSpacer />
    <VCol>기업소개</VCol>
    <VCol>사업분야</VCol>
    <VCol>커뮤니티</VCol>
    <VCol>문의사항</VCol>
    <VBtn icon="mdi-menu" style="margin-right: 20px" @click="() => (showDrawer = !showDrawer)"></VBtn>
  </VRow>
</template>
<script setup lang="ts">
const showDrawer = useMainDrawerOpenedState()
</script>
<style lang="scss">
.v-row.top-menu {
  margin: 48px 0 0 95px;
  max-height: 50px;
  min-height: 50px;

  .v-col {
    font-weight: 600;
  }
}
</style>

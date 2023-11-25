<template>
  <div class="top-menu d-flex justify-space-between flex-grow-1 align-center">
    <div class="font-weight-bold">FRONTIER</div>
    <div class="d-flex justify-space-between menus align-center">
      <VMenu transition="scroll-y-transition">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" class="v-btn--blank">기업소개</VBtn>
        </template>
        <VList>
          <VListItem>인사말</VListItem>
          <VListItem>사업영역</VListItem>
          <VListItem>주요고객사</VListItem>
          <VListItem>오시는길</VListItem>
        </VList>
      </VMenu>

      <VMenu transition="scroll-y-transition">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" class="v-btn--blank">사업분야</VBtn>
        </template>
        <VList>
          <VListItem>응용 LED 디스플레이</VListItem>
          <VListItem>스마트팩토리(빌딩 자동화), 기계식 주차장</VListItem>
          <VListItem>개발(S/W & H/W)</VListItem>
          <VListItem>인력 아웃소싱 사업</VListItem>
        </VList>
      </VMenu>

      <VMenu transition="scroll-y-transition">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" class="v-btn--blank">커뮤니티</VBtn>
        </template>
        <VList>
          <VListItem>공지사항</VListItem>
          <VListItem>News</VListItem>
        </VList>
      </VMenu>

      <VMenu transition="scroll-y-transition">
        <template v-slot:activator="{ props }">
          <VBtn v-bind="props" class="v-btn--blank">문의사항</VBtn>
        </template>
        <VList>
          <VListItem>기술/견적문의</VListItem>
          <VListItem>자료실</VListItem>
        </VList>
      </VMenu>

      <VBtn icon="mdi-menu" style="margin-right: 20px" @click="() => (showDrawer = !showDrawer)" class="v-btn--blank"></VBtn>
    </div>
  </div>
</template>
<script setup lang="ts">
const showDrawer = useMainDrawerOpenedState()
</script>
<style lang="scss">
.top-menu {
  margin: 54px 0 0 95px;
  max-height: 50px;
  min-height: 50px;
  font-weight: 600;

  .menus {
    gap: 50px;
  }
}
</style>

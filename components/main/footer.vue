<template>
  <VRow class="contact-us"> </VRow>
  <VFooter class="bg-grey-darken-4 d-flex flex-column align-stretch">
    <!-- <div>
      <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="text"></v-btn>
    </div> -->

    <div class="pt-0 flex-1-1-100">
      <VDivider color="white mt-10 mb-3" :thickness="2" />

      FRONTIER | 대표전화 : 031-520-8060 | 팩스 : 0504-183-4451 | 이메일 : iot.frontier@gmail.com <br />
      주소 : 경기도 성남시 분당구 성남대로 779번길6(이매동, KT분당지사) 1층 104-3호
    </div>
  </VFooter>
</template>
<script setup lang="ts">
const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
</script>
<style lang="scss">
footer.v-footer {
  padding: 0 95px 50px 95px;
}
</style>

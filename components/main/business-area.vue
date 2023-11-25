<template>
  <VRow class="business-row">
    <VCol class="left-col">
      <div class="title">Business Area</div>
      <div class="desc">
        <span class="text-grey-darken-2">다양한 통합 개발 서비스와 함께</span> <br /><span class="font-weight-medium"
          >끝 없는 프로젝트를 이어나갑니다.</span
        >
      </div>
      <VRow class="buttons" align="center">
        <VCol>
          <VBtn>VIEW MORE</VBtn>
        </VCol>
        <VCol> 01/04 </VCol>
      </VRow>
    </VCol>
    <VCol>
      <!-- swiper ... -->
    </VCol>
  </VRow>
</template>
<style lang="scss">
.main-container {
  .v-row.business-row {
    background-color: #fff;
    color: #000;
    padding: 70px 0 70px 095px;

    .left-col {
      max-width: 300px;

      .title {
        font-weight: 700;
        font-size: 25px;
        padding: 20px 0;
        border-bottom: 1px solid #000;
      }

      .desc {
        margin-top: 20px;
        font-size: 15px;
        line-height: 25px;
      }

      .buttons {
        margin-top: 50px;
      }
    }
  }
}
</style>

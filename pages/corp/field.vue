<template>
  <div class="mt-10 mb-10 ml-10 mr-10" style="width: 100%">
    <!-- <div class="title">주요 사업 영역</div> -->
    <VRow>
      <VCol :cols="6">
        <VCard title="응용 LED 디스플레이 사업" class="field-box">
          <div class="desc d-flex">
            <div class="flex-grow-1">
              <div><VIcon icon="mdi-square-small" /> LED 전광판 제작</div>
              <div><VIcon icon="mdi-square-small" /> 다양한 맞춤형 LED 제작</div>
            </div>
            <div class="flex-grow-1">
              <div><VIcon icon="mdi-square-small" /> 고객의 원하는 표시 및 기능 제공</div>
              <div style="padding-left: 1rem">(원격 제어, 업데이트, 모니터링 등)</div>
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol :cols="6">
        <VCard title="스마트팩토리(빌딩 자동화)" class="field-box">
          <div class="desc d-flex">
            <div class="flex-grow-1">
              <div><VIcon icon="mdi-square-small" /> HMI 작화 제작</div>
              <div><VIcon icon="mdi-square-small" /> PLC 연동 제어</div>
            </div>
            <div class="flex-grow-1">
              <div><VIcon icon="mdi-square-small" /> 임베디드 시스템을 통한</div>
              <div style="padding-left: 1rem">다양한 솔루션 제공</div>
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol :cols="6">
        <VCard title="개발(S/W, HW) 개발 사업" class="field-box">
          <div class="desc d-flex">
            <div class="flex-grow-1">
              <div><VIcon icon="mdi-square-small" /> 시제품 제작</div>
              <div><VIcon icon="mdi-square-small" /> 정부지원 과제 개발</div>
              <div><VIcon icon="mdi-square-small" /> 양산형 제품 개발</div>
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol :cols="6">
        <VCard title="인력 아웃소싱 사업" class="field-box">
          <div class="desc d-flex">
            <div class="flex-grow-1">
              <div><VIcon icon="mdi-square-small" /> 시스템 엔지니어 아웃소싱</div>
              <div><VIcon icon="mdi-square-small" /> 유지보수 인력 아웃소싱</div>
              <div>&nbsp;</div>
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
<style lang="scss">
.v-card.field-box {
  border-top: 5px solid #42a5f5;
  padding: 40px 30px;
  background-color: #fff;
  color: #000;

  .v-card-item {
    margin-bottom: 30px;
  }
  .v-card-item .title {
    font-size: 1.2rem;
    font-weight: 500;
  }

  .desc {
    font-size: 1rem;
    margin: 0 20px;
  }
}
</style>

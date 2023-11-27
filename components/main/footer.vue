<template>
  <VContainer :fluid="true" noGutters>
    <VRow class="contact-us-row">
      <VCol cols="12">
        <div class="section-title">Contact Us</div>
        <VDivider class="mt-4" :thickness="2" length="250px"></VDivider>
      </VCol>
      <VCol></VCol>
      <VCol cols="7">
        <v-container class="content">
          <VRow justify="end">
            <VCol>
              <span class="site">
                <a href="www.frontiers.co.kr">www.frontiers.co.kr</a>
              </span>
            </VCol>
            <VCol>
              <span class="mail">
                <a href="mailto:iot.frontier@gmail.com">iot.frontier@gmail.com</a>
              </span>
            </VCol>
          </VRow>
          <VRow justify="end">
            <VCol
              ><span class="phone"><a href="tel:031-520-8060">031-520-8060</a></span></VCol
            >
            <VCol
              ><span class="fax"><a href="fax:0504-163-4451">0504-163-4451</a></span></VCol
            >
          </VRow>
        </v-container>
      </VCol>
    </VRow>
  </VContainer>
  <VFooter class="bg-grey-darken-4 d-flex flex-column align-stretch">
    <!-- <div>
      <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="text"></v-btn>
    </div> -->

    <div class="pt-0 flex-1-1-100">
      <VDivider color="white mt-10 mb-3" :thickness="2" />

      FRONTIER | 대표전화 : 031-520-8060 | 팩스 : 0504-163-4451 | 이메일 : iot.frontier@gmail.com <br />
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

.contact-us-row {
  min-height: 335px;
  background-image: url('/img/main-contact.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  padding-bottom: 0;
  padding-left: 95px;
  padding-top: 40px;

  .section-title {
    font-size: 32px;
    font-weight: 700;
  }

  .v-divider {
    opacity: 1;
  }

  .content {
    span {
      display: flex;
      align-items: center;
      line-height: 1;
      font-size: 20px;
      font-weight: 500;
      min-width: 250px;

      &.site {
        background: url('/icon/web-site.png') no-repeat 0 0/1.6rem;
      }

      &.mail {
        background: url('/icon/mail.png') no-repeat 0 0/1.6rem;
      }

      &.phone {
        background: url('/icon/phone.png') no-repeat 0 0/1.4rem;
      }

      &.fax {
        background: url('/icon/fax.png') no-repeat 0 0/1.6rem;
      }

      &::before {
        width: 2.6rem;
        height: 1.6rem;
        content: '';
        display: inline-flex;
      }
    }
  }
}
</style>

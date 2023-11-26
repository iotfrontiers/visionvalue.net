<template>
  <VRow class="business-row">
    <!-- <VCol class="left-col" cols="3"> -->
    <VCol class="left-col">
      <div class="section-title">Business Area</div>
      <div class="desc">
        <span class="text-grey-darken-2">다양한 통합 개발 서비스와 함께</span> <br /><span class="font-weight-medium"
          >끝 없는 프로젝트를 이어나갑니다.</span
        >
      </div>
      <VRow class="buttons" align="center">
        <VCol>
          <VBtn>VIEW MORE</VBtn>
        </VCol>
        <VCol style="text-align: justify">
          <v-pagination v-model="selectedIdx" :length="4" color="brown-darken-4" @update:modelValue="onUpdatePageNum"></v-pagination>
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="9">
      <!-- swiper ... -->
      <Swiper class="swiper-container" :slides-per-view="'auto'" :space-between="10" @swiper="onSwiper" @activeIndexChange="onActiveIndexChange">
        <SwiperSlide v-for="(item, idx) in resources" :key="idx">
          <a v-if="item.idx !== 99">
            <div>
              <img :src="`/img/main-field-box${idx + 1}.png`" />

              <div class="title font-weight-medium mt-4">
                <v-divider :thickness="3" :class="['me-4', 'ms-1', { selected: selectedIdx === item.idx }]" vertical></v-divider>
                {{ item.label }}
              </div>
            </div>
          </a>
        </SwiperSlide>
      </Swiper>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
import { Swiper } from 'swiper/vue'
// import { Pagination, FreeMode } from 'swiper/modules'

const swiper = ref()

const resources: { idx: number; label: string }[] = [
  { idx: 1, label: '응용 LED 디스플레이' },
  { idx: 2, label: '스마트팩토리(빌딩 자동화), 기계식 주차장' },
  { idx: 3, label: '개발(S/W & H/W)' },
  { idx: 4, label: '인력 아웃소싱 사업' },
  // { idx: 99, label: '' },
  // { idx: 99, label: '' },
  // { idx: 99, label: '' },
  // { idx: 99, label: '' },
]

const selectedIdx = ref<number>(1)

const onSwiper = (swiperInstance: any) => {
  swiper.value = swiperInstance
}

function onUpdatePageNum(idx: number) {
  swiper.value.slideTo(idx - 1)
}

function onActiveIndexChange(obj: any) {
  selectedIdx.value = obj.realIndex + 1
}
</script>

<style lang="scss">
.main-container {
  .v-row.business-row {
    background-color: #fff;
    color: #000;
    padding: 70px 0 70px 95px;

    .left-col {
      // max-width: 300px;
      margin-right: 100px;
      min-width: 200px;
      margin-bottom: 20px;

      .section-title {
        // font-weight: 700;
        // font-size: 25px;
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

        .v-pagination {
          // width: 200px;
          display: inline-block;
          .v-pagination__prev {
            display: none;
            margin: 0;
          }
          .v-pagination__next {
            display: none;
            margin: 0;
          }

          .v-pagination__item {
            margin: 0;
          }

          .v-btn__content {
            font-weight: 600;
            font-size: 30px;
          }

          .v-pagination__item--is-active .v-btn__content {
            font-weight: 900;
            font-size: 40px !important;
          }
        }
      }
    }

    .swiper-container {
      .swiper-slide {
        width: 340px;
      }

      .v-divider {
        &.selected {
          border-color: blue;
          opacity: 0.6;
        }
      }

      .title {
        height: 35px;
        display: flex;
        align-items: center;
        font-size: 18px;
      }
    }
  }
}
</style>

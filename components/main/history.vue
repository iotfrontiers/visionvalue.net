<template>
  <VRow class="history-row">
    <VCol cols="12" alignSelf="stretch" class="section-title">History</VCol>
    <VCol>
      <VTimeline align="start" side="end" theme="light">
        <VTimelineItem v-for="(item, idx) in resources" :key="idx" dotColor="cyan" size="x-small">
          <template #opposite>
            <div :class="`pt-1 headline font-weight-bold`" v-text="item.year"></div>
          </template>
          <div class="item-body-content">
            <p v-for="(sub, i) in item.content" :key="i">
              <span class="item-body-date">{{ sub.date }}</span>
              {{ sub.text }}
            </p>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCol>
  </VRow>
</template>

<script lang="ts" setup>
const resources = [
  { year: '2023', content: [] },
  {
    year: '2020',
    content: [
      { date: '10.12 ', text: '회사 상호 변경 (트루솔루션 → 프런티어)' },
      { date: '10.17 ', text: '연구개발전담부서 설립' },
      { date: '10.29 ', text: '벤처기업인증' },
    ],
  },
  { year: '2019', content: [{ date: '12월', text: '회사 설립(자본금 200,000,000)' }] },
]
</script>

<style lang="scss">
.main-container {
  .v-row.history-row {
    background-color: #fff;
    color: #000;
    padding: 30px 95px 70px 95px;

    .section-title {
      text-align: center;
      // font-size: 25px;
      // font-weight: 700;
    }

    .v-timeline-item__opposite {
      // padding-top: 15px;
      .headline {
        font-size: 22px;
        line-height: 0.8;
      }
    }

    .v-timeline-item__body {
      .item-body-content {
        font-size: 18px;
        p {
          height: 30px;
        }
        .item-body-date {
          font-weight: 500;
          padding-right: 7px;
        }
      }
    }
  }
}
</style>

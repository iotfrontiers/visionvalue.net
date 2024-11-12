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
  { year: '2024', content: [
      { date: '10월', text: '2024 디딤돌 R&D 지원사업 선정' },
      { date: '8월', text: '기업부설연구소 설립' },
      { date: '8월', text: '창업기업확인서 인증' },
      { date: '7월', text: '벤처기업확인서 인증' },
      { date: '7월', text: '소프트웨어사업자 관리확인서 인증' },
      { date: '7월', text: '성남산업진흥원 입주기업 선정' },
      { date: '6월', text: '여성기업확인서 인증' },
      { date: '5월', text: '연구개발전담부서 설립' },
      { date: '5월', text: '중소기업확인서 인증' },
      { date: '4월', text: '(주)비젼밸류 법인설립' },
    ] },
]
</script>

<style lang="scss">
.main-container {
  .v-row.history-row {
    background-color: #fff;
    color: #000;
    // padding: 30px 95px 70px 95px;
    padding: 30px min(5vw, 95px) 70px min(5vw, 95px);

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
          // height: 30px;
          line-height: 30px;
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

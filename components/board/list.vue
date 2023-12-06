<template>
  <VDataTable
    theme="light"
    noDataText="조회된 데이터가 없습니다."
    :items="noticeData?.list"
    :itemsPerPage="pageSize"
    :itemsPerPageOptions="[]"
    selectStrategy="single"
    density="compact"
    :headers="headers"
  >
    <template #bottom></template>
    <template #item.title="{ value, item }">
      <NuxtLink :to="`${props.detailPageUrl}${item.id}`">{{ value }}</NuxtLink>
    </template>
  </VDataTable>
</template>

<script setup lang="ts">
import type { NotionListResponse, NotionNotice } from '~/composables/notion'
import { useDisplay } from 'vuetify'

const props = withDefaults(
  defineProps<{
    apiUrl?: string
    detailPageUrl?: string
  }>(),
  {
    apiUrl: '/api/notice-list',
    detailPageUrl: '/community/notice/',
  },
)

const currentPage = ref(1)
const pageSize = ref(100)
const noticeData = ref<NotionListResponse<NotionNotice>>()

async function loadNotice() {
  await useLoadingTask(async () => {
    try {
      noticeData.value = await $fetch(props.apiUrl, {
        method: 'post',
        body: {
          pageSize: pageSize.value,
        },
      })

      let startNo = pageSize.value * (currentPage.value - 1)
      noticeData.value?.list?.forEach(row => {
        row.num = ++startNo
      })
    } catch (e) {
      alert(COMMON_MESSAGES.DATA_RETRIEVE_ERROR)
    }
  })
}

loadNotice()

// for responsibiltiy
const { xs: mobile } = useDisplay()
const headers = computed(() => {
  return [
    {
      title: '번호',
      key: 'num',
      align: 'center',
      width: 80,
      sortable: false,
    },
    {
      title: '제목',
      key: 'title',
      sortable: false,
    },
    {
      title: '작성자',
      key: 'author',
      align: 'center',
      width: 100,
      sortable: false,
    },
    {
      title: '조회',
      key: 'viewCnt',
      align: 'center',
      width: 100,
      sortable: false,
    },
    {
      title: '작성일',
      key: 'date',
      align: 'center',
      width: 150,
      sortable: false,
    },
  ].filter(header => (!mobile.value ? true : ['title', 'viewCnt'].includes(header.key)))
})
</script>

<style lang="scss">
.v-table {
  border-top: 3px solid #546e7a;
}
</style>

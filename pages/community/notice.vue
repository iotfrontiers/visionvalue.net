<template>
  <div class="mt-10 mb-10 ml-10 mr-10" style="width: 100%">
    <VDataTable
      theme="light"
      noDataText="조회된 데이터가 없습니다."
      :items="noticeData?.list"
      :itemsPerPage="pageSize"
      :itemsPerPageOptions="[]"
      selectStrategy="single"
      :headers="[
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
      ]"
    >
      <template #bottom></template>
      <template #item.title="{ value, item }">
        <NuxtLink :to="`/community/notice/${item.id}`">{{ value }}</NuxtLink>
      </template>
    </VDataTable>
  </div>
</template>

<script setup lang="ts">
import type { NotionListResponse, NotionNotice } from '~/composables/notion'

const route = useRoute()
const currentPage = ref(1)
const pageSize = ref(100)
const noticeData = ref<NotionListResponse<NotionNotice>>()

async function loadNotice() {
  try {
    noticeData.value = await $fetch('/api/notice-list', {
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
}

loadNotice()
</script>

<style lang="scss">
.v-table {
  border-top: 3px solid #546e7a;
}
</style>

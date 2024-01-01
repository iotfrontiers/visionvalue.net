<template>
  <CommonMarkdownViewer v-if="noticeInfo" :content="noticeInfo.content" />
</template>
<script setup lang="ts">
import type { NotionData } from '~/composables/notion'

const route = useRoute()
const router = useRouter()
const noticeInfo = ref<NotionData>(null)
async function loadDetail() {
  await useLoadingTask(async () => {
    noticeInfo.value = await $fetch(`/data/product/${route.params.id}.json`)
    if (!noticeInfo.value) {
      alert(COMMON_MESSAGES.DATA_NOT_FOUND_ERROR)
      router.back()
    }
  })
}

onMounted(() => loadDetail())
</script>

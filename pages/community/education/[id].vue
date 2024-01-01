<template>
  <div class="detail-box" v-if="!hasChildren && noticeInfo">
    <div class="d-flex flex-row-reverse">
      <VBtn icon="mdi-microsoft-xbox-controller-menu" theme="light" class="v-btn--blank" @click="() => $router.push('/community/education')"></VBtn>
    </div>
    <div class="title">{{ noticeInfo.title }}</div>
    <VDivider class="mt-8 mb-8" />
    <CommonMarkdownViewer :content="noticeInfo.content" @contentUpdated="updatedContent" />
  </div>
  <div v-else-if="hasChildren">
    <div class="d-flex align-center">
      <VChipGroup class="ma-2">
        <VChip v-for="menu in targetMenu.children">{{ menu.title }}</VChip>
      </VChipGroup>
    </div>
  </div>
  <div v-else></div>
</template>
<script lang="ts" setup>
import type { NotionData } from '~/composables/notion'

const route = useRoute()
const router = useRouter()
const noticeInfo = ref<NotionData>(null)
async function loadDetail() {
  await useLoadingTask(async () => {
    noticeInfo.value = await $fetch(`/data/education/${route.params.id}.json`)
    if (!noticeInfo.value) {
      alert(COMMON_MESSAGES.DATA_NOT_FOUND_ERROR)
      router.back()
    }
  })
}

const targetMenu = computed(() => findEducationMenu(route.params.id as string))
const hasChildren = computed(() => targetMenu.value.children && targetMenu.value.children.length > 0)

function updatedContent(dom: HTMLDivElement) {
  const linkEls = dom.getElementsByTagName('a')
  for (let i = 0; i < linkEls.length; i++) {
    const item = linkEls.item(i)
    const linkUrl = item.getAttribute('href')

    if (linkUrl && linkUrl.startsWith('https://youtu.be')) {
      const url = new URL(linkUrl)
      const targetId = url.pathname.substring(1)

      item.parentElement.append(
        htmlToElement(
          `<iframe width="560" height="315" src="https://www.youtube.com/embed/${targetId}?si=nz8V9xeXMGVAZpcB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
        ),
      )
    }

    if (linkUrl && linkUrl.startsWith('https://www.youtube.com/watch')) {
      const url = new URL(linkUrl)
      const targetId = url.searchParams.get('v')

      if (targetId) {
        item.parentElement.append(
          htmlToElement(
            `<iframe width="560" height="315" src="https://www.youtube.com/embed/${targetId}?si=nz8V9xeXMGVAZpcB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
          ),
        )
      }
    }
  }

  for (let i = linkEls.length - 1; i >= 0; i--) {
    const item = linkEls.item(i)
    if (item) {
      item.remove()
    }
  }
}

onMounted(() => loadDetail())
</script>
<style lang="scss" scoped>
.detail-box {
  border-top: 3px solid #546e7a;
  padding-top: 10px;
  padding-left: 10px;

  .title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-left: 10px;
  }

  .profile {
    font-size: 1rem;
  }
}
</style>

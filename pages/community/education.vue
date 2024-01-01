<template>
  <VList density="compact" theme="light" v-if="!id">
    <VListItem v-for="menu in educationMenus.menus">
      <template #prepend>
        <VIcon>mdi-pencil-box-outline</VIcon>
      </template>

      <template #default>
        <a @click="goEducationPage(menu)" class="education-menu">{{ menu.title }}</a>
      </template>
    </VListItem>
  </VList>
  <div v-else>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { openEducationUrl } from '#imports'
import type { NotionData } from '~/composables/notion'

const route = useRoute()
const id = computed(() => route.params.id)

const educationMenus = useEducationDataMenu()
function goEducationPage(menu: NotionData) {
  return openEducationUrl(menu.id, menu.linkUrl)
}
</script>
<style lang="scss" scoped>
.education-menu {
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>

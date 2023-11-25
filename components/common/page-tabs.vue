<template>
  <div class="d-flex">
    <div v-for="(item, idx) in props.items" :key="idx" class="flex-grow-1">
      {{ item.title }}
    </div>
  </div>
</template>
<script lang="ts">
export interface Tab {
  title: string
  targetUrl: string
}
</script>
<script setup lang="ts">
const props = defineProps<{
  items: Tab[]
}>()
</script>

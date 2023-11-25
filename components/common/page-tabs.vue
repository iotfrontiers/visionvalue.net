<template>
  <div class="d-flex tabs align-stretch">
    <div
      v-for="(item, idx) in props.items"
      :key="idx"
      :class="{
        active: selectedIndex === idx,
      }"
      class="flex-grow-1 tab d-flex align-center justify-center"
      @click="$router.push(item.targetUrl)"
    >
      <span>{{ item.title }}</span>
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

const selectedIndex = ref(-1)

const route = useRoute()
onMounted(() => {
  if (props.items) {
    const sameRouteIndex = props.items.findIndex(i => i.targetUrl === route.path)
    if (sameRouteIndex > -1) {
      selectedIndex.value = sameRouteIndex
      return
    }

    selectedIndex.value = -1
  }
})
</script>
<style lang="scss">
.tabs {
  width: 100%;
  height: 70px;
  background: rgba(0, 0, 0, 0.15);
}

.tabs .tab {
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background-color: #fff;
    color: #000;
  }
}
</style>

<template>
  <div class="d-flex tabs align-stretch">
    <div
      v-for="(item, idx) in props.items"
      :key="idx"
      :class="{
        active: selectedIndex === idx,
      }"
      class="flex-grow-1 tab d-flex align-center justify-center"
      @click="itemClicked(item)"
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

const emit = defineEmits<{
  (e: 'click:menuItem', menu: Tab): void
}>()

const selectedIndex = ref(-1)

const route = useRoute()
onMounted(() => {
  selectdIndex()
})

function selectdIndex() {
  if (props.items) {
    const sameRouteIndex = props.items.findIndex(i => i.targetUrl === route.path || route.path.startsWith(i.targetUrl))
    if (sameRouteIndex > -1) {
      selectedIndex.value = sameRouteIndex

      emit('click:menuItem', props.items[selectedIndex.value < 0 ? 0 : selectedIndex.value])

      return
    }

    selectedIndex.value = -1
  }
}

const itemClicked = (item: Tab) => {
  useRouter()
    .push(item.targetUrl)
    .then(() => selectdIndex())
}

watch(
  () => route.fullPath,
  () => {
    nextTick(() => selectdIndex())
  },
)
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
  font-size: min(1.2rem, max(4vw, 10px));
  font-weight: 500;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background-color: #fff;
    color: #000;
  }
}
</style>

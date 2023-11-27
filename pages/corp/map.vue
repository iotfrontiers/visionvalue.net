<template>
  <VRow no-gutters>
    <VCol :cols="12" align-self="center">
      <!-- <div class="map-container"> -->
      <div id="map" style="width: 80%; height: 55vh"></div>
      <!-- </div> -->
    </VCol>
    <VCol class="mt-10">
      <span>경기 성남시 분당구 성남대로331번길 8 9층 901호</span>
    </VCol>
  </VRow>
</template>
<script lang="ts" setup>
declare const naver: any

const map = shallowRef()

useHead({
  script: [{ type: 'text/javascript', src: 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=y1fjmf6ydu' }],
})

onMounted(async () => {
  setTimeout(() => {
    map.value = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.3663172, 127.1066211),
      zoom: 18,
    })

    new naver.maps.Marker({
      position: new naver.maps.LatLng(37.365979, 127.1067124),
      map: map.value,
    })
  }, 500)
})

const getObjectAsync = (fn: () => any) => {
  return new Promise<any>(resolve => {
    const obj = fn()

    if (obj) {
      resolve(obj)
      return
    }

    const findObj = () => {
      const obj = fn()

      if (obj) {
        resolve(obj)
        return
      }

      setTimeout(() => findObj(), 100)
    }

    setTimeout(() => findObj(), 100)
  })
}
</script>

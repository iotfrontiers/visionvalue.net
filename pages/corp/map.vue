<template>
  <VRow no-gutters>
    <VCol :cols="12" align-self="center">
      <!-- <div class="map-container"> -->
      <div id="map" style="width: 80%; height: 55vh"></div>
      <!-- </div> -->
    </VCol>
    <VCol class="mt-10">
      <span>경기도 성남시 분당구 성남대로 779번길6(이매동, KT분당지사) 1층 104-3호 </span>
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
      center: new naver.maps.LatLng(37.3999, 127.1281),
      zoom: 18,
    })

    new naver.maps.Marker({
      position: new naver.maps.LatLng(37.3999, 127.1281),
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

<template>
  <VRow class="maps-wrap" no-gutters>
    <VCol class="mb-10">
      <span>경기 성남시 분당구 성남대로331번길 8 20층 9호</span>
    </VCol>
    <VCol :cols="12" align="center">
      <!-- <div class="map-container"> -->
      <div id="map" style="width: 90%; height: 55vh"></div>
      <!-- </div> -->
    </VCol>
  </VRow>
</template>
<script lang="ts" setup>
const map = shallowRef()

useHead({
  script: [{ type: 'text/javascript', src: 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=py452ejk83' }],
})

onMounted(async () => {
  await getObjectAsync(() => globalThis.naver)

  map.value = new globalThis.naver.maps.Map('map', {
    center: new globalThis.naver.maps.LatLng(37.3663172, 127.1066211),
    zoom: 18,
  })

  const marker = new globalThis.naver.maps.Marker({
    position: new globalThis.naver.maps.LatLng(37.365979, 127.1067124),
    map: map.value,
  })

  const contentString = [
    '<div class="iw_inner">',
    '   <h3>(주) 비젼밸류</h3>',
    '   <p>경기 성남시 분당구 성남대로331번길 8 20층 9호<br />',

    '       tel: <a href="tel:010-3911-7684">010-3911-7684</a><br />',
    '       e-mail: <a href="mailto:ykp@visionvalue.net">ykp@visionvalue.net</a>',
    '   </p>',
    '</div>',
  ].join('')

  const infoWindow = new globalThis.naver.maps.InfoWindow({
    content: contentString,
    // maxWidth: 478,
  })

  globalThis.naver.maps.Event.addListener(marker, 'click', function (e) {
    if (infoWindow.getMap()) {
      infoWindow.close()
    } else {
      infoWindow.open(map.value, marker)
    }
  })

  infoWindow.open(map.value, marker)
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

<style lang="scss">
.maps-wrap {
  .iw_inner {
    padding: 10px;
    text-align: left;

    h3 {
      font-weight: 600;
      margin: 40px 0 18px 0;
    }

    p {
      margin-bottom: 20px;
    }
  }
}
</style>

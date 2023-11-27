<template>
  <ul class="client-container">
    <li v-for="i of 29">
      <img :src="`/client/group-img${i}.png`" />
    </li>
  </ul>
</template>
<style lang="scss">
.client-container {
  display: flex;
  flex-wrap: wrap;
  list-style: none;

  li {
    position: relative;
    width: 300px;
    height: 100%;
    border: 1px solid #ddd;
    margin: 10px 20px 10px 0;
    list-style: none;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      top: 0;
      height: 100%;
      border: 3px solid #007ac3;
      transition: 0.3s;
      opacity: 0;
    }

    // &:nth-child(4n) {
    //   margin-right: 0;
    // }

    // &:nth-child(n + 5) {
    //   margin-top: 22px;
    // }

    ::before {
      box-sizing: border-box;
    }

    img {
      border: 0;
      max-width: 100%;
      vertical-align: middle;
    }
  }
}
</style>

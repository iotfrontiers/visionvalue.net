<template>
  <VLayout class="rounded rounded-md" style="flex-direction: column">
    <MainDrawer />
    <VMain class="d-flex align-center justify-center" style="min-height: 300px">
      <slot />
    </VMain>
    <MainFooter />
  </VLayout>
</template>
<script lang="ts" setup></script>

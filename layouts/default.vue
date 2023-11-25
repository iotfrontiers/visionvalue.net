<template>
  <VLayout class="rounded rounded-md" style="flex-direction: column">
    <MainDrawer />

    <!-- <v-app-bar :order="order" color="grey-lighten-2" flat title="Application bar">
      <template v-slot:append>
        <v-switch v-model="order" hide-details inset label="Toggle order" true-value="-1" false-value="0"></v-switch>
      </template>
    </v-app-bar> -->

    <VMain class="d-flex align-center justify-center" style="min-height: 300px">
      <slot />
    </VMain>
    <MainFooter />
  </VLayout>
</template>
<script lang="ts" setup></script>

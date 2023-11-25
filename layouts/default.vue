<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>

    <v-app-bar :order="order" color="grey-lighten-2" flat title="Application bar">
      <template v-slot:append>
        <v-switch v-model="order" hide-details inset label="Toggle order" true-value="-1" false-value="0"></v-switch>
      </template>
    </v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <slot />
    </v-main>
  </v-layout>
</template>
<script lang="ts" setup>
const order = ref(0)
</script>

<script setup>
import Alert from "../components/Alert.vue";
import { NoSymbolIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <Alert title="404: Page not Found" :icon="NoSymbolIcon">
    <p class="mt-2">
      This page not exist, please return to
      <router-link class="font-bold hover:underline" to="/home"
        >Home</router-link
      >
    </p>
  </Alert>
</template>

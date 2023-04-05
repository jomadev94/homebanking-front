<script setup>
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import Alert from "../components/Alert.vue";
import { onMounted } from "vue";
import ApiService from "../services/ApiService";
import { useRoute } from "vue-router";

onMounted(async() => {
    const code=useRoute().params.code;
    console.log(code);
    const result=await ApiService.verify(code);
    console.log(result);
});
</script>

<template>
    <Alert title="Client verificated" :icon="CheckCircleIcon">
      <p class="mt-2">
        You are verificated. Go to
        <router-link class="font-bold hover:underline" to="/home"
          >Home</router-link>
      </p>
    </Alert>
  </template>

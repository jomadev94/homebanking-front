<script setup>
const props=defineProps(['cardTitle'])
</script>

<template>
  <div class="flex-col bg-white rounded-md p-4 w-full">
    <div v-if="cardTitle" class="flex justify-between items-center mb-2">
      <h4 class="text-3xl font-bold">{{ cardTitle }}</h4>
      <slot name="options"></slot>
    </div>
    <slot></slot>
  </div>
</template>

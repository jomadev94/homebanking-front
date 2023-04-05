<script setup>
const props = defineProps(["text"]);
</script>

<template>
  <div class="flex justify-between">
    <h2 class="text-4xl font-extrabold text-slate-100 mb-4 custom-shadow">{{ text }}</h2>
    <slot></slot>
  </div>
</template>

<style scoped>
.custom-shadow{
    text-shadow: 5px 5px 5px black;
}
</style>

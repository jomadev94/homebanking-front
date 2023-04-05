<script setup>
const props = defineProps(['titles']);
</script>

<template>
  <table class="table-fixed w-full">
    <thead>
      <tr>
        <th v-for="title in titles" class="text-start">
            {{ title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

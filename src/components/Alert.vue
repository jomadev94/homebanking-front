<script setup>
import Card from "../components/Card.vue";

const props = defineProps({
  icon: {
    type: Function,
  },
  title: {
    type: String,
  }
});
</script>

<template>
  <Card class="max-w-3xl">
    <div class="flex gap-4 items-center">
      <component :is="props.icon" class="h-28 w-28"></component>
      <section>
          <h2 class="font-bold text-6xl">{{props.title}}</h2>
          <slot></slot>
      </section>
    </div>
  </Card>
</template>

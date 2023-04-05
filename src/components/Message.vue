<script setup>
import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "default",
  },
});

function getColor() {
  if (props.type === "default") return "bg-gray-600";
  if (props.type === "success") return "bg-green-600";
  if (props.type === "error") return "bg-red-600";
}
</script>
<template>
  <transition
    enter-active-class="transition duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-300 ease-out"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div class="text-white flex p-4 gap-5 items-center" :class="getColor()">
      <ExclamationTriangleIcon
        v-if="props.type === 'default'"
        class="w-8 h-8"
      ></ExclamationTriangleIcon>
      <ShieldCheckIcon
        v-else-if="props.type === 'success'"
        class="w-8 h-8"
      ></ShieldCheckIcon>
      <ShieldExclamationIcon v-else class="w-8 h-8"></ShieldExclamationIcon>
      <p class="text-xl">
        {{ text }}
      </p>
    </div>
  </transition>
</template>

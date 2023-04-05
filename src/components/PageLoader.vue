<script setup>
import { ref } from "vue";
import router from "../router";

const show = ref(true);

router.beforeEach((to, from, next) => {
  show.value = true;
  setTimeout(() => {
    next();
  }, 1000);
});

router.afterEach((to, from, fail) => {
  return setTimeout(() => {
    show.value = false;
  }, 1000);
});
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-500 ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="w-screen h-screen bg-gray-900 fixed flex justify-center items-center z-50"
    >
      <div
        class="flex flex-col justify-center items-center gap-2.5 h-36 overflow-hidden"
      >
        <div
          class="w-16 h-16 rounded-full border-8 border-l-sky-400 animate-spin"
        ></div>
        <div class="h-4 up">
          <p class="text-white">Loading</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.up {
  animation: to-up 0.5s ease-out;
}

@keyframes to-up {
  0% {
    transform: translateY(10rem);
  }
  100% {
    transform: none;
  }
}
</style>

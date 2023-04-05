<script setup>
import {
ChevronLeftIcon,
ChevronRightIcon
} from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";
import Button from "./Button.vue";
import BankCard from "./BankCard.vue";

let container;
const position = ref(1);

const props=defineProps({
    items:{
        type:Array,
        required:true
    },
    carouselId:{
        type:String,
        required:true
    }
})

onMounted(() => {
  container = document.getElementById(props.carouselId);
});

function prev() {
  if (position.value > 1) {
    container.scrollLeft -= container.offsetWidth;
    position.value--;
  }
}

function next() {
  if (position.value < props.items.length) {
    container.scrollLeft += container.offsetWidth;
    position.value++;
  }
}
</script>

<template>
  <section class="relative">
    <div
      :id="props.carouselId"
      class="flex bg-slate-400 overflow-hidden scroll-smooth transition-transform duration-300"
    >
      <div
        v-for="item in props.items"
        class="w-full h-auto bg-white flex-shrink-0 flex justify-center items-center p-4"
      >
        <BankCard
        :number="item.number"
          :card-holder="item.cardHolder"
          :cvv="item.cvv"
          :color="item.color"
          :type="item.type"
          :tru-date="item.truDate"
          :from-date="item.fromDate"
          :id-card="item.id"
        >
        </BankCard>
      </div>
    </div>
    <Button
      position-button="absolute"
      v-if="position > 1"
      color-button="transparent"
      class="absolute left-0 top-1/2 -mt-4"
      @click="prev()"
    >
      <ChevronLeftIcon class="h-8"></ChevronLeftIcon>
    </Button>
    <Button
      position-button="absolute"
      v-if="position < props.items.length"
      color-button="transparent"
      class="absolute right-0 top-1/2 -mt-4"
      @click="next()"
    >
      <ChevronRightIcon class="h-8"></ChevronRightIcon>
    </Button>
  </section>
</template>

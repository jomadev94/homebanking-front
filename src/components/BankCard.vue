<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps([
  "number",
  "cardHolder",
  "color",
  "type",
  "cvv",
  "fromDate",
  "truDate",
  "idCard"
]);

const viewFront=ref(true);
let card;

onMounted(() => {
  card=document.getElementById(`${props.idCard}`);
})

function selectColor() {
  switch (props.color) {
    case "SILVER":
      return "bg-gradient-to-tl to-gray-700 from-white/80 text-black";
    case "TITANIUM":
      return "bg-gradient-to-bl to-gray-600/90 from-zinc-800";
    default:
      return "bg-gradient-to-tr to-yellow-400 from-amber-600";
  }
}

function rotate(){
  viewFront.value=!viewFront.value;
  card.style.transform= viewFront.value?"rotateY(0deg)":"rotateY(180deg)";
}

</script>

<template>
  <div id="card" class="h-72 max-w-lg w-full relative text-white card-font cursor-pointer" @click="rotate()">
    <div class="flip" :id="props.idCard">
      <div
        id="front"
        class="flex flex-col gap-4 p-4 h-full w-full rounded-3xl shadow shadow-black"
        :class="selectColor()"
      >
        <div class="absolute bottom-5 right-6 flex flex-row">
          <div class="bg-red-500 rounded-full w-8 h-8"></div>
          <div
            class="bg-yellow-500 rounded-full w-8 h-8 -ml-3 opacity-70"
          ></div>
        </div>
        <div>
          <img
            id="front-logo"
            class="max-h-16"
            src="../assets/logo.png"
            alt="Bank Logo"
          />
        </div>
        <p class="text-sky-200">{{ type }}</p>
        <div class="flex flex-row gap-4 items-center">
          <img class="max-h-14" src="../assets/chip.png" alt="Card chip" />
          <svg
            class="wave"
            viewBox="0 3.71 26.959 38.787"
            width="26.959"
            height="38.787"
            fill="white"
          >
            <path
              d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z"
            ></path>
            <path
              d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z"
            ></path>
            <path
              d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z"
            ></path>
          </svg>
        </div>
        <div class="flex flex-row justify-between max-w-md">
          <span v-for="num in number" class="font-bold text-2xl">{{
            num
          }}</span>
        </div>
        <div class="flex gap-4">
          <p class="text-xl font-bold">
            <span class="text-sm">Since:</span> {{ fromDate }}
          </p>
          <p class="text-xl font-bold">
            <span class="text-sm">Thru:</span> {{ truDate }}
          </p>
        </div>
        <p class="text-xl font-bold">{{ cardHolder }}</p>
      </div>
      <div
        id="back"
        class="flex flex-col gap-2 h-full w-full rounded-3xl shadow shadow-black"
        :class="selectColor()"
      >
        <div class="h-16 w-full bg-black mt-9"></div>
        <div class="flex flex-col px-8 gap-2 font-sans">
          <p class="text-right">CVV</p>
          <div class="bg-white text-black p-1 md:p-2 w-full text-end rounded-md">
            <span class="text-sm md:text-lg">{{ cvv }}</span>
          </div>
          <div class="text-xs text-justify mt-1 md:mt-2 ">
            <p>
              This card is property of Monzo Bank, Wonderland. Misuse is
              criminal offence. If found, please return to Monzo Bank or to the
              nearest bank with MasterCard logo.
            </p>
            <p class="mt-1 md:mt-2">
              Use of this card is subject to the credit card agreement.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#card {
  perspective: 1000;
}

.flip {
  width: inherit;
  height: inherit;
  transition: 0.7s;
  transform-style: preserve-3d;
}

.card-font {
  font-family: "cc font";
}

#front {
  transform: translateZ(0);
}

#back {
  transform: rotateY(180deg);
}

#front,
#back {
  position: absolute;
  backface-visibility: hidden;
  overflow: hidden;
}

#front-logo {
  position: absolute;
  top: 0.5rem;
  right: 1.5rem;
  max-width: 7rem;
}

.bg-card {
  background-color: #0093e9;
  background-image: linear-gradient(37deg, #0093e9 0%, #80d0c7 100%);
}
</style>

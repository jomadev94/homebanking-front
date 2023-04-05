<script setup>
import { onMounted, ref } from "vue";
import BankCard from "../components/BankCard.vue";
import Card from "../components/Card.vue";
import Message from "../components/Message.vue";
import Title from "../components/Title.vue";
import ApiService from "../services/ApiService";
import { formatMonthYear } from "../utils/dateFormatter";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import Select from "../components/Select.vue";
import Radio from "../components/Radio.vue";
import Carousel from "../components/Carousel.vue";

const debits = ref([]);
const credits = ref([]);
const createModal = ref(false);

const cardTypes = [
  { id: 1, name: "DEBIT", unavailable: false },
  { id: 2, name: "CREDIT", unavailable: false },
];

const cardColors = [
  { id: 1, name: "GOLD" },
  { id: 2, name: "SILVER" },
  { id: 3, name: "TITANIUM" },
];

const selectedType = ref(cardTypes[0]);
const selectedColor = ref(cardColors[0]);

onMounted(async () => {
  try {
    const current = (await ApiService.getClientInfo()).data.data;
    const resultMapping = current.cards.map((card) => {
      const numberArray = card.number.match(/.{1,4}/g);
      card.number = numberArray;
      card.truDate = formatMonthYear(card.truDate);
      card.fromDate = formatMonthYear(card.fromDate);
      return card;
    });
    debits.value = resultMapping.filter((card) => card.type === "DEBIT");
    credits.value = resultMapping.filter((card) => card.type === "CREDIT");
    if (debits.value.length === 3) {
      cardTypes[0].unavailable = true;
      selectedType.value = cardTypes[1];
      return;
    }
    if (credits.value.length === 3) {
      cardTypes[1].unavailable = true;
      selectedType.value = cardTypes[0];
    }
  } catch (error) {
    console.log(error);
  }
});

async function createCard() {
  try {
    const sType = selectedType.value.name;
    const sColor = selectedColor.value.name;
    if (
      (sType === "CREDIT" && credits.value.length < 3) ||
      (sType === "DEBIT" && debits.value.length < 3)
    ) {
      const card = (await ApiService.createCard({ color: sColor, type: sType }))
        .data.data;
      card.number = card.number.match(/.{1,4}/g);
      card.truDate = formatMonthYear(card.truDate);
      card.fromDate = formatMonthYear(card.fromDate);
      if (card.type === "CREDIT") {
        credits.value.push(card);
        if (credits.value.length === 3) {
          cardTypes[1].unavailable = true;
          selectedType.value = cardTypes[0];
        }
      } else {
        debits.value.push(card);
        if (debits.value.length === 3) {
          cardTypes[0].unavailable = true;
          selectedType.value = cardTypes[1];
        }
      }
      createModal.value = false;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <Title text="Cards">
    <Button
      @click="createModal = true"
      color-button="alter"
      class="mb-4"
      v-if="debits.length + credits.length < 6"
    >
      Add new card</Button
    >
  </Title>
  <div class="flex flex-col gap-4">
    <Card card-title="Debit Cards">
      <Carousel v-if="debits.length > 0" :items="debits" carousel-id="debits-box"></Carousel>
      <Message v-else text="You don't have a debit card"></Message>
    </Card>
    <Card card-title="Credit Cards">
      <Carousel v-if="credits.length > 0" :items="credits" carousel-id="credits-box"></Carousel>
      <Message v-else text="You don't have a credit card"></Message>
    </Card>
  </div>
  <Modal :open="createModal" @closed="createModal = false">
    <template v-slot:header> Add new Card </template>
    <template v-slot:content>
      <div class="flex flex-col gap-4 mt-2 mb-5">
        <Select
          label="Select card type:"
          :options="cardTypes"
          v-model:selected-option="selectedType"
        ></Select>
        <Radio
          :options="cardColors"
          label="Pick one class:"
          v-model:selected="selectedColor"
        ></Radio>
      </div>
    </template>
    <template v-slot:options>
      <Button @click="createCard()"> New Card </Button>
    </template>
  </Modal>
</template>

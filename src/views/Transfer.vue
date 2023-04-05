<script setup>
import Title from "../components/Title.vue";
import Card from "../components/Card.vue";
import Input from "../components/Input.vue";
import Select from "../components/Select.vue";
import useVuelidate from "@vuelidate/core";
import { ref, onMounted, reactive, watch } from "vue";
import ApiService from "../services/ApiService";
import TextArea from "../components/TextArea.vue";
import Button from "../components/Button.vue";
import Message from "../components/Message.vue";
import Modal from "../components/Modal.vue";
import { globalRules } from "../utils/globals";

const transferForm = reactive({
  from: "",
  to: "",
  amount: "100",
  description: "",
});

const responseMessage = reactive({
  show: false,
  type: "default",
  text: "",
});

const rules = {
  from: {
    required: globalRules.required,
  },
  to: {
    required: globalRules.required,
    toFormat: globalRules.toFormat,
  },
  amount: {
    required: globalRules.required,
    numeric: globalRules.numeric,
    minValue: globalRules.minValue(100),
  },
  description: {
    required: globalRules.required,
    maxLength: globalRules.maxLength(200),
  },
};

const v$ = useVuelidate(rules, transferForm);
const myAccounts = ref([]);
const openModal = ref(false);
const load=ref(false);

onMounted(async () => {
  try {
    const client = (await ApiService.getClientInfo()).data.data;
    const options = client
      ? client.accounts.map((account) => ({
          id: account.number,
          name: account.number + " - $" + account.balance,
        }))
      : [];
    myAccounts.value = options;
    transferForm.from = options[0];
  } catch (error) {
    console.log(error);
  }
});

function isNumeric(event) {
  event = event ? event : window.event;
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode < 48 || charCode > 57) event.preventDefault();
}

watch(transferForm, (newValue) => {
  responseMessage.show = false;
});

async function makeTransaction(event) {
  event.preventDefault();
  responseMessage.text =
    "Failed Transaction: remember to select an account with sufficient balance and that destination account must exists";
  responseMessage.type = "error";
  try {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      load.value=true;
      await ApiService.makeTransaction({
        amount: Number.parseFloat(transferForm.amount),
        description: transferForm.description,
        from: transferForm.from.id,
        to: transferForm.to,
      });
      responseMessage.text =
        "Successful Transaction: you can check the result in the account details";
      responseMessage.type = "success";
    }
  } finally {
    load.value=false;
    responseMessage.show = true;
    openModal.value = false;
  }
}

function open() {
  openModal.value = true;
}
</script>

<template>
  <Title text="Transfer"></Title>
  <Card card-title="Make transfer">
    <form class="flex flex-col gap-2" @submit.prevent="open()">
      <Select
        label="Account from"
        :options="myAccounts"
        v-model:selected-option="v$.from.$model"
      ></Select>
      <Input
        input-label="Account to"
        input-id="accountTo"
        input-placeholder="VIN9542034"
        v-model:data="v$.to.$model"
        :input-errors="v$.to.$errors"
      ></Input>
      <Input
        @keypress="isNumeric($event)"
        input-label="Amount"
        input-id="amount"
        input-placeholder="min $100"
        v-model:data="v$.amount.$model"
        :input-errors="v$.amount.$errors"
      ></Input>
      <TextArea
        area-label="Description"
        area-id="description"
        area-placeholder="Write a description"
        v-model:data="v$.description.$model"
        :area-errors="v$.description.$errors"
      >
      </TextArea>
      <Message
        v-if="responseMessage.show"
        :type="responseMessage.type"
        :text="responseMessage.text"
        class="mt-2"
      ></Message>
      <Button class="w-28 mt-2 self-end" type-button="submit">
        Transfer
      </Button>
    </form>
    <Modal :open="openModal" @closed="openModal = false">
      <template v-slot:header>
        <p>Make transaction</p>
      </template>
      <template v-slot:content>
        <p>Are you sure you want to make the transaction?</p>
      </template>
      <template v-slot:options>
        <Button :is-loading="load" @click="makeTransaction($event)"> Yes </Button>
      </template>
    </Modal>
  </Card>
</template>

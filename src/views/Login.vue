<script setup>
import { reactive, ref, watch } from "vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import Message from "../components/Message.vue";
import Input from "../components/Input.vue";
import Title from "../components/Title.vue";
import AuthService from "../services/AuthService";
import useVuelidate from "@vuelidate/core";
import { globalRules } from "../utils/globals";

const form = reactive({
  email: "",
  password: "",
});

const rules = {
  email: {
    required: globalRules.required,
  },
  password: {
    required: globalRules.required,
  },
};

const v$ = useVuelidate(rules, form);
const load = ref(false);
const error = ref(false);

watch(form, (newFormValue) => {
  error.value = false;
});


async function login() {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    try {
      load.value = true;
      await AuthService.login(form.email, form.password);
    } catch (err) {
      error.value = true;
      console.log(err);
    } finally {
      load.value = false;
    }
  } else {
    error.value = true;
  }
}
</script>

<template>
  <Title text="Welcome to Liberbank Portal" class="text-center"></Title>
  <Card card-title="Enter your access data" class="max-w-lg h-auto">
    <form class="flex flex-col gap-3" @submit.prevent="login()">
      <Input
        input-id="email"
        input-label="Email"
        input-placeholder="User@Domain.com"
        v-model:data="v$.email.$model"
        :input-errors="v$.email.$errors"
      ></Input>
      <Input
        input-id="password"
        input-label="Password"
        input-placeholder="*********"
        v-model:data="v$.password.$model"
        input-type="password"
        :input-errors="v$.password.$errors"
      ></Input>
      <Message
        v-if="error"
        text="Email or password incorrect!"
        type="error"
      ></Message>
      <Button :is-loading="load" type-button="submit"> Sign In </Button>
    </form>
  </Card>
  <div class="mt-3 max-w-lg w-full flex justify-end items-center gap-2 text-lg">
    <span>Don't have an account?</span>
    <router-link
      class="transition-transform text-white hover:scale-105 hover:font-bold"
      to="/register"
    >
      Register
    </router-link>
  </div>
</template>

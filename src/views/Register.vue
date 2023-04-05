<script setup>
import useVuelidate from "@vuelidate/core";
import { reactive, ref, watch } from "vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import Input from "../components/Input.vue";
import Message from "../components/Message.vue";
import Title from "../components/Title.vue";
import ApiService from "../services/ApiService";
import AuthService from "../services/AuthService";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
import { globalRules } from "../utils/globals";

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const password= reactive({
  show:false,
  icon:EyeSlashIcon,
  type:"password"
});

const rules={
  firstName:{
    required: globalRules.required,
    minLength: globalRules.minLength(3),
    maxLength: globalRules.maxLength(20)
  },
  lastName:{
    required: globalRules.required,
    minLength: globalRules.minLength(3),
    maxLength: globalRules.maxLength(20)
  },
  email:{
    required: globalRules.required,
    email: globalRules.email
  },
  password:{
    required: globalRules.required,
    minLength: globalRules.minLength(8),
    maxLength: globalRules.maxLength(14),
    passFormat: globalRules.passFormat
  },
}

const v$=useVuelidate(rules,form);
const error = ref(false);
const load=ref(false);

watch(form,(newFormValue)=>{
    error.value=false;
});

function showHidePass(){
  password.show=!password.show;
  password.icon=password.show? EyeIcon : EyeSlashIcon;
  password.type=password.show? "text": "password";
}

async function register() {
  v$.value.$touch();
  load.value=true;
  if(!v$.value.$invalid){
    try {
      await ApiService.register(form);
      await AuthService.login(form.email,form.password);
      return
    } catch (err) {}
  }
  load.value=false;
  error.value = true;
}
</script>

<template>
  <Title text="Register new account" class="text-center"></Title>
  <Card class="max-w-lg h-auto">
    <form class="flex flex-col gap-4">
      <Input
        input-id="firstName"
        input-label="First Name"
        input-placeholder="Your name"
        v-model:data="v$.firstName.$model"
        :input-errors="v$.firstName.$errors"
      ></Input>
      <Input
        input-id="lastName"
        input-label="Last Name"
        input-placeholder="Your last name"
        v-model:data="v$.lastName.$model"
        :input-errors="v$.lastName.$errors"
      ></Input>
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
        :input-type="password.type"
        v-model:data="v$.password.$model"
        :input-errors="v$.password.$errors"
      >
      <Button @click="showHidePass()">
        <component :is="password.icon" class="w-6 h-6"></component>
      </Button>
    </Input>
      <Message v-if="error" type="error" text="Debe completar todos los campos!"></Message>
      <Button :is-loading="load" @click="register()">Register</Button>
    </form>
  </Card>
  <div class="mt-3 max-w-lg w-full flex justify-end items-center gap-2 text-lg">
    <span>Go back to</span>
    <router-link
      class="transition-transform text-white hover:scale-105 hover:font-bold"
      to="/login"
    >
      Login
    </router-link>
  </div>
</template>

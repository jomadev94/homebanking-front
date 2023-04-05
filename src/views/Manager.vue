<script setup>
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import useVuelidate from "@vuelidate/core";
import {
email, helpers, maxLength, minLength, required
} from "@vuelidate/validators";
import { onMounted, reactive, ref } from "vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import Input from "../components/Input.vue";
import Modal from "../components/Modal.vue";
import Table from "../components/Table.vue";
import Title from "../components/Title.vue";
import ApiService from "../services/ApiService";

const passFormat = helpers.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/);

const formCreate = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

const rulesCreate = {
  firstName: {
    required: helpers.withMessage(
      ({ $property }) => `${$property} field is required`,
      required
    ),
    minLength: helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be longer than ${$params.min}`,
      minLength(3)
    ),
    maxLength: helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be less than ${$params.max}`,
      maxLength(20)
    ),
  },
  lastName: {
    required: helpers.withMessage(
      ({ $property }) => `${$property} field is required`,
      required
    ),
    minLength: helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be longer than ${$params.min}`,
      minLength(3)
    ),
    maxLength: helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be less than ${$params.max}`,
      maxLength(20)
    ),
  },
  email: {
    required: helpers.withMessage(
      ({ $property }) => `${$property} field is required`,
      required
    ),
    email: helpers.withMessage("Invalid email format", email),
  },
  password: {
    required: helpers.withMessage(
      ({ $property }) => `${$property} field is required`,
      required
    ),
    minLength: helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be longer than ${$params.min}`,
      minLength(8)
    ),
    maxLength: helpers.withMessage(
      ({ $params, $property }) =>
        `${$property} field must be less than ${$params.max}`,
      maxLength(14)
    ),
    passFormat: helpers.withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      passFormat
    ),
  },
};

const v1$ = useVuelidate(rulesCreate, formCreate);

const formEdit = reactive({
  firstName: "",
  lastName: "",
  email: "",
});

const rulesEdit = {
  firstName: rulesCreate.firstName,
  lastName: rulesCreate.lastName,
  email: rulesCreate.email,
};

const v2$ = useVuelidate(rulesEdit, formEdit);

const modalDelete = ref(false);
const modalEdit = ref(false);

function openDeleteClient(client) {
  seletedClient.value = client;
  modalDelete.value = true;
}

function openEditClient(client) {
  seletedClient.value = client;
  formEdit.firstName = client.firstName;
  formEdit.lastName = client.lastName;
  formEdit.email = client.email;
  modalEdit.value = true;
}

const clients = ref([]);
const jsonContent = ref([]);
const seletedClient = ref([]);

onMounted(async () => {
  try {
    const result = await ApiService.getClients();
    if (result.status != 200)
      throw new Error("No se pudo conectar con el servidor");
    clients.value = result.data;
    jsonContent.value = result;
  } catch (error) {
    console.log("No se pudo conectar con el servidor");
  }
});

async function addClient(event) {
  event.preventDefault();
  if (!v1$.value.$invalid) {
    const client = {
      firstName: formCreate.firstName,
      lastName: formCreate.lastName,
      email: formCreate.email,
      password: formCreate.password,
    };
    const result = await ApiService.register(client);
    clients.value.push(result.data);
    jsonContent.value = result;
  }
}

async function removeClient() {
  try {
    await ApiService.removeClient(seletedClient.value.id);
    const removeIndex = clients.value.indexOf(
      (client) => client.id === seletedClient.value.id
    );
    clients.value.splice(removeIndex, 1);
    setModalDelete(false);
  } catch (err) {
    console.log(err);
  }
}

async function editClient() {
  const client = {
    id: formEdit.id,
    firstName: formEdit.firstName,
    lastName: formEdit.lastName,
    email: formEdit.email,
  };
  try {
    await ApiService.editClient(client.id, client);
    clients.value.map((client) => {
      if (client.id === formEdit.id) {
        (client.firstName = formEdit.firstName),
          (client.lastName = formEdit.lastName),
          (client.email = formEdit.email);
      }
    });
    setModalEdit(false);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <Title text="Admin Dashboard"></Title>
  <div class="grid grid-cols-2 gap-4">
    <div class="flex flex-col gap-4 overflow-hidden">
      <Card card-title="Create Client">
        <form class="flex flex-col gap-2">
          <Input
            input-id="inputFirstName"
            v-model:data="v1$.firstName.$model"
            input-label="First name"
            input-placeholder="Insert First Name"
            :input-errors="v1$.firstName.$errors"
          >
          </Input>
          <Input
            input-id="inputLastName"
            v-model:data="v1$.lastName.$model"
            :input-errors="v1$.lastName.$errors"
            input-label="Last name"
            input-placeholder="Insert lastName"
          ></Input>
          <Input
            input-id="inputEmail"
            v-model:data="v1$.email.$model"
            :input-errors="v1$.email.$errors"
            input-label="Email"
            input-placeholder="Insert Email"
            input-type="email"
          ></Input>
          <Input
            input-id="inputPassword"
            v-model:data="v1$.password.$model"
            :input-errors="v1$.password.$errors"
            input-label="Password"
            input-placeholder="*******"
            input-type="password"
          ></Input>
          <Button @click="addClient" class="self-end w-40"> Add Client </Button>
        </form>
      </Card>

      <Card
        card-title="Client Manager"
        class="order-last overflow-y-auto max-h-96"
      >
        <Table :titles="['First Name', 'Last Name', 'Email', 'Edit', 'Delete']">
          <tr v-for="client in clients">
            <td>{{ client.firstName }}</td>
            <td>{{ client.lastName }}</td>
            <td class="text-ellipsis overflow-hidden">{{ client.email }}</td>
            <td>
              <Button @click="openEditClient(client)" type-button="edit">
                <PencilSquareIcon class="w-5 h-5"></PencilSquareIcon>
              </Button>
            </td>
            <td>
              <Button @click="openDeleteClient(client)" type-button="delete">
                <TrashIcon class="h-5 w-5"></TrashIcon>
              </Button>
            </td>
          </tr>
        </Table>
      </Card>
    </div>

    <Card card-title="Client REST response" class="overflow-y-scroll admin-h">
      <pre>{{ jsonContent }}</pre>
    </Card>
  </div>

  <!-- Modal Delete -->

  <Modal :open="modalDelete" @closed="modalDelete = false">
    <template v-slot:header>
      Delete account: {{ seletedClient.email }}
    </template>
    <template v-slot:content>
      <p class="text-lg my-4">Are you sure you want to delete your account?</p>
    </template>
    <template v-slot:options>
      <Button type-button="delete" @click="removeClient()">Delete</Button>
    </template>
  </Modal>

  <!-- Modal Edit -->

  <Modal :open="modalEdit" @closed="modalEdit = false">
    <template v-slot:header> Edit account: {{ seletedClient.email }} </template>
    <template v-slot:content>
      <form class="flex flex-col gap-2 my-4">
        <Input
          input-id="inputFirstName"
          v-model:data="v2$.firstName.$model"
          :input-errors="v2$.firstName.$errors"
          input-label="First name"
          input-placeholder="Insert First Name"
        >
        </Input>
        <Input
          input-id="inputLastName"
          v-model:data="v2$.lastName.$model"
          :input-errors="v2$.lastName.$errors"
          input-label="Last name"
          input-placeholder="Insert lastName"
        ></Input>
        <Input
          input-id="inputEmail"
          v-model:data="v2$.email.$model"
          :input-errors="v2$.email.$errors"
          input-label="Email"
          input-placeholder="Insert Email"
          input-type="email"
        ></Input>
      </form>
    </template>
    <template v-slot:options>
      <Button type-button="edit" @click="editClient()">Edit</Button>
    </template>
  </Modal>
</template>

<style scoped>
.admin-h {
  height: calc(100vh - 12rem);
}
</style>

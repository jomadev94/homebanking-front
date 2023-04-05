<script setup>
import { ref, onMounted } from "vue";
import Card from "../components/Card.vue";
import Title from "../components/Title.vue";
import Table from "../components/Table.vue";
import Button from "../components/Button.vue";
import Message from "../components/Message.vue";
import { format } from "../utils/dateFormatter";
import ApiService from "../services/ApiService";
import { PlusIcon } from "@heroicons/vue/24/solid";
import Carousel from "../components/Carousel.vue";

const client = ref([]);
const accounts = ref([]);
const hasLoans = ref(false);

async function addAccount() {
  try {
    const created = (await ApiService.createAccount()).data.data;
    created.creationDate = format(created.creationDate);
    accounts.value.push(created);
  } catch (err) {
    console.log(err);
  }
}

onMounted(async () => {
  try {
    const current = (await ApiService.getClientInfo()).data.data;
    client.value = {
      firstName: current.firstName,
      lastName: current.lastName,
      email: current.email,
      loans: current.loans,
    };
    hasLoans.value = current.loans.length > 0;
    const accountsFormat = current.accounts.map((account) => {
      account.creationDate = format(account.creationDate);
      return account;
    });
    accounts.value = accountsFormat;
  } catch (error) {}
});
</script>

<template>
  <Title text="Home"></Title>
  <div class="grid grid-cols-1 gap-x-0 gap-y-4 sm:grid-cols-3 sm:gap-4">
    <Card card-title="Client information">
      <p>Name: {{ client.firstName }}</p>
      <p>Lastname: {{ client.lastName }}</p>
      <p>Email: {{ client.email }}</p>
    </Card>

    <Card card-title="Loans" class="col-span-2 row-span-2">
      <Table
        v-if="hasLoans"
        :titles="['id', 'loanId', 'name', 'amount', 'payments']"
      >
        <tr v-for="loan in client.loans">
          <td>
            {{ loan.id }}
          </td>
          <td>{{ loan.loanId }}</td>
          <td>{{ loan.name }}</td>
          <td>{{ "$ " + loan.amount }}</td>
          <td>{{ loan.payments }}</td>
        </tr>
      </Table>
      <Message v-else text="You dont have loans!"></Message>
    </Card>

    <Card :card-title="client.firstName + '\'s Accounts'">
      <template v-slot:options>
        <Button v-if="accounts.length < 3" @click="addAccount()">
          <PlusIcon class="w-5 h-5 text-white"></PlusIcon>
        </Button>
      </template>
      <Table :titles="['Account Number', 'Created Date', 'Balance']">
        <tr v-for="account in accounts">
          <td>
            <router-link
              :to="'/account/' + account.id"
              class="text-blue-900 hover:font-bold hover:underline underline-offset-4"
            >
              {{ account.number }}
            </router-link>
          </td>
          <td>{{ account.creationDate }}</td>
          <td>{{ "$ " + account.balance }}</td>
        </tr>
      </Table>
    </Card>
  </div>
</template>

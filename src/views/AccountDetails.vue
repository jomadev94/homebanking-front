<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Title from "../components/Title.vue";
import Card from "../components/Card.vue";
import Message from "../components/Message.vue";
import { format } from "../utils/dateFormatter";
import ApiService from "../services/ApiService";

const account = ref([]);
const transactions = ref([]);
const accountId = useRoute().params.id;

onMounted(async () => {
  try {
    const result = (await ApiService.getAccount(accountId)).data.data;
    result.creationDate = format(result.creationDate);
    account.value = result;
    transactions.value = result.transactions
      .map((t) => {
        t.date = format(t.date);
        return t;
      })
      .sort((t1, t2) => t2.id - t1.id);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <Title :text="'Account: ' + account.number"></Title>
  <div class="flex flex-col gap-4 md:flex-row">
    <Card card-title="Account information" class="md:w-1/4">
      <p>Creation date: {{ account.creationDate }}</p>
      <p>Balance: {{ "$" + account.balance }}</p>
    </Card>
    <Card card-title="Transactions">
      <table v-if="transactions.length > 0" class="table-fixed w-full">
        <thead>
          <tr>
            <th class="text-start">Id</th>
            <th class="text-start">Description</th>
            <th class="text-start">Type</th>
            <th class="text-start">Date</th>
            <th class="text-start">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.description }}</td>
            <td
              :class="
                transaction.type === 'CREDIT'
                  ? 'text-green-600 opacity-90'
                  : 'text-red-600 opacity-90'
              "
            >
              {{ transaction.type }}
            </td>
            <td>{{ transaction.date }}</td>
            <td>{{ transaction.amount }}</td>
          </tr>
        </tbody>
      </table>
      <Message v-else text="You dont have any transaction!"></Message>
    </Card>
  </div>
</template>

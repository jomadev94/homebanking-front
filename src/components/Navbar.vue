<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
ArrowRightOnRectangleIcon,
BanknotesIcon,
BellIcon,
ChevronDownIcon,
ChevronUpIcon,
CreditCardIcon,
HomeIcon
} from "@heroicons/vue/24/solid";
import { onMounted, ref } from "vue";
import AuthService from "../services/AuthService";

const client = ref(null);
const links = [
  {
    title: "Home",
    href: "/home",
    icon: HomeIcon,
  },
  {
    title: "Cards",
    href: "/cards",
    icon: CreditCardIcon,
  },
  {
    title: "Transfer",
    href: "/transfer",
    icon: BanknotesIcon,
  },
];

onMounted(async () => {
  client.value = JSON.parse(localStorage.getItem("client"));
});

function goTo(nav, close) {
  close();
  nav();
}
</script>

<template>
  <header class="h-16">
    <nav class="flex bg-slate-100 justify-between items-center h-16 px-8">
      <div class="flex gap-4 items-center">
        <router-link to="/">
          <img
            class="w-20 h-14 md:h-16 md:w-auto"
            src="../assets/logo.png"
            alt="Bank logo"
          />
        </router-link>
      </div>
      <div v-if="client" class="flex gap-6 items-center">
        <button class="bg-slate-800 rounded-full text-gray-50 p-2">
          <BellIcon class="w-5 h-5"></BellIcon>
        </button>
        <Menu as="div" class="relative z-10" v-slot="{ open }">
          <MenuButton
            class="bg-gradient-to-br from-gray-900 to-blue-900 p-2 text-white rounded-md"
          >
            <div class="flex gap-2 items-center">
              <span>{{ client.firstName }}</span>
              <ChevronUpIcon v-if="open" class="w-5 h-5"></ChevronUpIcon>
              <ChevronDownIcon v-else class="w-5 h-5"></ChevronDownIcon>
            </div>
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-300 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="flex flex-col absolute top-12 right-0 z-50 bg-gradient-to-br from-gray-900 to-blue-500 rounded-md text-right shadow-lg w-60 text-white overflow-hidden border-2 border-opacity-50 border-black"
            >
              <MenuItem
                v-for="(link, index) in links"
                :key="index"
                v-slot="{close}"
              >
                <router-link
                  :to="link.href"
                  v-slot="{href, navigate }"
                  active-class="bg-black font-bold"
                >
                  <a
                    :href="href"
                    @click.prevent="goTo(navigate,close)"
                    role="link"
                  >
                    <div class="flex gap-3 items-center justify-end py-2 px-4">
                      <span>{{ link.title }}</span>
                      <component :is="link.icon" class="h-5 w-5"></component>
                    </div>
                  </a>
                </router-link>
              </MenuItem>
              <!-- <MenuItem v-if="client.email === 'admin'" class="py-2 px-4">
              </template>
                <router-link to="/admin" active-class="bg-black font-bold">
                  <div class="flex gap-3 items-center justify-end">
                    <span>Manager</span>
                    <WrenchScrewdriverIcon
                      class="h-5 w-5"
                    ></WrenchScrewdriverIcon>
                  </div>
                </router-link>
              </MenuItem> -->
              <MenuItem @click="AuthService.logout" class="py-2 px-4">
                <button>
                  <div class="flex gap-3 items-center justify-end">
                    <span>Logout</span>
                    <ArrowRightOnRectangleIcon
                      class="h-5 w-5"
                    ></ArrowRightOnRectangleIcon>
                  </div>
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
  </header>
</template>

<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  label: { type: String, required: true },
  selectedOption: {},
  options: { type: Array, required: true },
});

const emits = defineEmits(["update:selectedOption"]);
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <label :for="label" class="font-bold">{{ label+":" }}</label>
    <Listbox
      :id="label"
      :model-value="selectedOption"
      @update:model-value="emits('update:selectedOption', $event)"
    >
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white p-2 text-left shadow-md shadow-black border-2 border-black focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
        >
          <span class="block truncate">{{ selectedOption.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full z-10 shadow-black overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected, disabled }"
              v-for="option in options"
              :key="option.name"
              :value="option"
              :disabled="option.unavailable"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-blue-300 text-sky-700' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                  disabled ? 'hidden' : '',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ option.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-700"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

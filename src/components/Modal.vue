<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import Button from "./Button.vue";

const emit=defineEmits(['closed']);
const props = defineProps({
  open: { type: Boolean, required: true },
});

</script>

<template>
  <TransitionRoot :show="open" as="template">
    <Dialog class="relative z-50" @close="emit('closed')">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/80" aria-hidden="true" />
      </TransitionChild>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
          as="template"
        >
          <DialogPanel class="w-full max-w-md rounded bg-white p-4">
            <DialogTitle class="font-bold text-2xl"><slot name="header"></slot></DialogTitle>
            <slot name="content"></slot>
            <div class="flex gap-4 justify-end mt-4">
              <slot name="options"></slot>
              <Button @click="emit('closed')" color-button="cancel">Cancel</Button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

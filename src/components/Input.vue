<script setup>
const emit = defineEmits(["update:data"]);
const props = defineProps({
  inputLabel: { type: String, required: true },
  inputId: { type: String, required: true },
  inputType: { type: String, default: "text" },
  data: { type: String, default: "" },
  inputPlaceholder: { type: String, required: true },
  inputErrors: { type: Array, required: true },
});

function updateData(event) {
  emit("update:data", event.target.value);
}
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <label class="font-bold" :for="props.inputId">{{ props.inputLabel + ":" }}</label>
    <div class="flex gap-2">
      <input
        class="border-2 rounded-md p-2  focus:outline-none focus:outline-offset-0 w-full"
        :class="
          props.inputErrors.length > 0 ? 'border-red-700 focus:outline-red-700' : 'border-slate-900 focus:outline-blue-900'
        "
        :id="props.inputId"
        :type="props.inputType"
        :value="data"
        @input="updateData($event)"
        :placeholder="props.inputPlaceholder"
        required
      />
      <slot></slot>
    </div>
    <span class="text-red-700 text-sm mt-1" v-for="error in props.inputErrors">
      {{ error.$message }}
    </span>
  </div>
</template>

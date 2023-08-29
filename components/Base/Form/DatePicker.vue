<!-- eslint-disable vue/require-explicit-emits -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="[{ 'mb-2': !customClass }, { 'mt-4': !props.label }]"
    class="datepicker"
  >
    <label
      v-if="props.label"
      :for="props.inputId"
      :class="{ 'd-none': customClass }"
    >
      {{ props.label ?? "" }}
      <span v-if="required">*</span>
    </label>
    <vue-date-picker
      :id="props.inputId"
      v-model="defaultDate"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :format="formatDate"
      class="datePicker_custom"
      :enable-time-picker="false"
      :class="{ 'is-invalid': props.errors }"
      :input-class-name="customClass"
      auto-apply
      :min-date="minDate"
      :max-date="maxDate"
      :year-picker="yearPicker"
      :month-picker="monthPicker"
      @update:model-value="
        (modelData: any) => $emit('update:modelValue', modelData)
      "
    />
    <div v-if="props.errors" class="invalid-feedback">
      {{ props.errors }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  required: {
    type: Boolean,
    default: true,
  },
  inputId: {
    type: String,
    default: "",
    required: true,
  },
  modelValue: {
    type: [Date, String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  minDate: {
    type: [Date, String],
    default: null,
  },
  maxDate: {
    type: [Date, String],
    default: null,
  },
  customClass: {
    type: String,
    default: "",
  },
  formatDate: {
    type: String,
    default: "yyyy/MM/dd",
  },
  yearPicker: {
    type: Boolean,
    default: false,
  },
  monthPicker: {
    type: Boolean,
    default: false,
  },
});
const date = ref(props.modelValue);

const defaultDate = computed(() => {
  date.value = props.modelValue;
  return props.modelValue;
});
</script>

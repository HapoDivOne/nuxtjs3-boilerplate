<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/require-explicit-emits -->
<template>
  <div class="mb-3 input_custom">
    <label v-if="props.label" :for="props.inputId" class="mb-2"
      >{{ props.label
      }}<span v-if="required" class="text-required ms-1">*</span></label
    >
    <input
      :id="props.inputId"
      :type="type ?? 'text'"
      :value="phoneFormatNumber(modelValue)"
      class="form-control"
      aria-describedby="emailHelp"
      :placeholder="placeholder"
      :class="{ 'is-invalid': props.errors }"
      :disabled="disabled"
      :maxlength="props.maxlength"
      @input="
        $emit(
          'update:modelValue',
          phoneFormatNumber($event?.target?.value) ?? '',
        )
      "
    />
    <div v-if="props.errors" class="invalid-feedback">
      {{ props.errors }}
    </div>
  </div>
</template>
<script setup lang="ts">
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
  type: {
    type: String,
    default: "", // Default input type is text
  },
  modelValue: {
    type: [String],
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
  maxlength: {
    type: Number,
    default: 255,
  },
});

const phoneFormatNumber = (e: any) => {
  const textNumber = e.replace(/\D/g, "").match(/(\d{0,3})(\d{0,4})(\d{0,4})/);

  return !textNumber[2]
    ? textNumber[1]
    : textNumber[1] +
        "-" +
        textNumber[2] +
        (textNumber[3] ? "-" + textNumber[3] : "");
};
</script>

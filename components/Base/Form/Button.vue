<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button class="btn btn-submit" type="submit" :disabled="props.loading">
    <span v-if="props.loading" class="spinner-border spinner-border-sm"></span>
    {{ props.title }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

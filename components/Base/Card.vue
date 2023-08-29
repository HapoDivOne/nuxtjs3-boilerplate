<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="card_custom" :class="classCustom">
    <div name="collapse" mode="in-out">
      <div
        class="card_custom--title"
        :class="{ 'border-radius': !viewContent }"
        @click="toggleClick"
      >
        <div class="card_custom--title-left">
          <img
            v-if="props.iconSrc"
            :src="getImageIcon(props.iconSrc) as string"
            alt="logo"
          />
          <input v-else type="checkbox" />
          <p class="title_card">{{ props.title }}</p>
        </div>
        <div class="card_custom--title-right">
          <img
            src="~/assets/images/icon/btn_up.svg"
            alt="btnUp"
            :class="{ 'transform-rotate-180': viewContent }"
          />
        </div>
      </div>
      <div v-if="viewContent" class="card_custom--content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  iconSrc: {
    type: String,
    default: "",
  },
  classCustom: {
    type: String,
    default: "",
  },
});
const viewContent = ref(true);

const toggleClick = () => {
  viewContent.value = !viewContent.value;
};
</script>

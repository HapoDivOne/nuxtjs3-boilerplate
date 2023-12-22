<template>
  <v-container class="min-vh-100 bg-white">
    <v-row>
      <v-col class="text-center text-indigo-darken-3">
        <h1 class="red--text">{{ $t("auth.login.title_1") }}</h1>
        <div>{{ $t("auth.login.sub_title") }}</div>
      </v-col>
    </v-row>
    <v-row class="h-100">
      <v-col>
        <v-sheet class="mx-auto" max-width="500">
          <v-form @submit="submitForm" class="v-justify-center v-align-center">
            <v-sheet class="mt-3">
              <v-text-field
                v-model="formData.email"
                prepend-icon="mdi-email"
                type="email"
                :rules="emailRules"
                :label="$t('common.email')"
                :error-messages="errors.email"
                variant="underlined"
              ></v-text-field>
            </v-sheet>
            <v-sheet class="mt-3">
              <v-text-field
                v-model="formData.password"
                :rules="passwordRules"
                :label="$t('common.password')"
                :error-messages="errors.password"
                type="password"
                prepend-icon="mdi-lock"
                variant="underlined"
              ></v-text-field>
            </v-sheet>
            <v-btn
              type="submit"
              color="indigo-darken-3 mt-8"
              block
              class="mt-2"
              size="x-large"
              >{{ $t("common.buttons.login") }}
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { STATUS_CODES } from "~/constants/statusCode";
import { useAuthStore } from "~/stores/auth";
import { REGEX_EMAIL } from "~/constants/regex";
import { useI18n } from "vue-i18n";
const { $toast } = useNuxtApp();

const { t } = useI18n();
const authStore = useAuthStore();
const errors: any = ref({});

const formData = reactive({
  email: ref(""),
  password: ref(""),
  rememberToken: ref(false),
});

const emailRules = [
  (v: string) => !!v || t("auth.validation.email_required"),
  (v: string) => REGEX_EMAIL.test(v) || t("auth.validation.email_format"),
];

const passwordRules = [
  (v: string) => !!v || t("auth.validation.password_required"),
];

const submitForm = async (event: Event) => {
  errors.value = {};
  event.preventDefault();

  try {
    await authStore.login({
      ...formData,
    });
  } catch (error: any) {
    if (error.response.status === STATUS_CODES.VALIDATION) {
      errors.value.email = error.response.data.errors.email?.[0];
      errors.value.password = error.response.data.errors.password?.[0];
    } else if (error.response.status === STATUS_CODES.UN_AUTHORIZED) {
      errors.value.email = error.response.data.message;
    } else {
      $toast.error(error.message);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/auth/style.scss";
</style>

<template>
  <v-container class="min-vh-100 bg-white">
    <v-row>
      <v-col class="text-center text-indigo-darken-3">
        <h1 class="red--text">{{ $t("auth.login.title_1") }}</h1>
        <h1>{{ $t("auth.login.title_2") }}</h1>
        <div>
          {{ $t("auth.login.sub_title") }}
        </div>
      </v-col>
    </v-row>
    <v-row class="h-100">
      <v-col>
        <v-sheet class="mx-auto" max-width="500">
          <v-form @submit="submitForm" class="v-justify-center v-align-center">
            <v-sheet class="mt-3">
              <v-text-field
                v-model="email"
                prepend-icon="mdi-email"
                type="email"
                :rules="emailRules"
                :label="$t('common.email')"
                variant="underlined"
              ></v-text-field>
            </v-sheet>
            <v-sheet class="mt-3">
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :label="$t('common.password')"
                type="password"
                prepend-icon="mdi-lock"
                variant="underlined"
              ></v-text-field>
            </v-sheet>
            <v-btn type="submit" color="indigo-darken-3 mt-8"
                   block class="mt-2" size="x-large">{{ $t('common.buttons.login') }}
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { STATUS_CODES } from "~/constants/statusCode";
import { useAuthStore } from "~/stores/auth";
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const rememberToken = ref(false);
const errors: any = ref({});

const emailRules = [
  (v: string) => !!v || 'メールアドレスは必須です',
  (v: string) => /.+@.+\..+/.test(v) || '正しいメールアドレスを入力してください',
];
const passwordRules = [(v: string) => !!v || "パスワードは必須です"];

const submitForm = (event: Event) => {
  errors.value = {}; // clear error msg
  event.preventDefault();
  authStore
    .login({
      email: email.value,
      password: password.value,
      rememberToken: rememberToken.value,
    })
    .catch((error: any) => {
      if (error.response.status === STATUS_CODES.VALIDATION) {
        errors.value.email = error.response.data.errors.email?.[0];
        errors.value.password = error.response.data.errors.password?.[0];
      } else if (error.response.status === STATUS_CODES.UN_AUTHORIZED) {
        errors.value.email = error.response.data.message;
      }
    });
};
</script>

<style lang="scss">
@import "@/assets/scss/pages/auth/style.scss";
</style>

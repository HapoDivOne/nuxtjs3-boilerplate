<template>
  <v-container class="d-flex align-center flex-1-1">
    <div>hello</div>
    <v-sheet width="500" class="mx-auto mt-4">
      <v-form @submit="submitForm">
        <v-text-field
          v-model="email"
          type="email"
          :rules="emailRules"
          label="メールアドレス"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="パスワード"
          type="password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2" size="x-large">ログイン</v-btn>
      </v-form>
    </v-sheet>
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
  console.log(email.value);
  console.log(password.value);
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

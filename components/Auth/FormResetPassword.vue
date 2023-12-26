<template>
  <BaseLoading v-if="loading" />
  <v-sheet v-else class="min-vh-100">
    <v-row>
      <v-col class="text-center">
        <h1>{{ $t("auth.password_reset.title") }}</h1>
        <div>
          {{ $t("auth.password_reset.sub_title") }}
        </div>
      </v-col>
    </v-row>
    <v-row class="h-100">
      <v-col>
        <v-sheet class="mx-auto" max-width="500">
          <v-form @submit="submitForm" class="v-justify-center v-align-center">
            <v-sheet class="mt-3">
              <v-text-field
                v-model="formData.new_password"
                type="password"
                id="password"
                :rules="passwordRules"
                :label="$t('auth.password_reset.new_password.label')"
                variant="outlined"
                :errors="errors.new_password"
              ></v-text-field>
            </v-sheet>
            <v-sheet class="mt-5">
              <v-text-field
                v-model="formData.password_confirmed"
                :rules="passwordConfirmationRules"
                id="passwordConfirmation"
                :label="$t('auth.password_reset.password_confirmed.label')"
                type="password"
                variant="outlined"
                :errors="errors.password_confirmed"
              ></v-text-field>
            </v-sheet>
            <v-btn
              type="submit"
              color="indigo-darken-3 mt-8"
              block
              class="mt-2"
              size="x-large"
              >{{ $t("common.buttons.send") }}
            </v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { STATUS_CODES } from "~/constants/statusCode";
import { useAuthStore } from "~/stores/auth";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { $toast } = useNuxtApp();
const { token } = useRoute().query;
const errors: any = ref({});
const authStore = useAuthStore();
const loading = ref(false);
const btnLoading = ref(false);

const formData = ref({
  new_password: "",
  password_confirmed: "",
});

const passwordRules = [
  (v: string) => !!v || t("auth.validation.password_required"),
];

const passwordConfirmationRules = [
  ...passwordRules,
  (v: string) =>
    v === formData.value.new_password || t("auth.validation.password_match"),
];

authStore
  .checkTokenResetPass(token)
  .then((response: any) => {
    if (response?.status === STATUS_CODES.OK) {
      loading.value = false;
    }
  })
  .catch((error: any) => {
    $toast.error(error.response?._data.message);
    navigateTo("/forgot-password");
  });

const submitForm = (event: Event) => {
  event.preventDefault();
  btnLoading.value = true;
  errors.value = {}; // clear error msg
  authStore
    .resetPassword({
      token,
      new_password: formData.value.new_password,
      password_confirmed: formData.value.password_confirmed,
    })
    .then((response: any) => {
      btnLoading.value = false;
      // TODO: show toast
      $toast.success(response.data.message);
      navigateTo("/login");
    })
    .catch((error) => {
      btnLoading.value = false;
      if (error.response.status === STATUS_CODES.VALIDATION) {
        Object.entries(error.response.data.errors).map((item: any) => {
          return (errors.value[item?.[0]] = item?.[1]?.[0]);
        });
      } else {
        // TODO: show toast
        $toast.error(error.response.data.message);
      }
    });
};
</script>

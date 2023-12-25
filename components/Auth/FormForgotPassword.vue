<template>
  <v-sheet class="min-vh-100">
    <v-row>
      <v-col class="text-center">
        <h1>{{ $t("auth.change_password.title") }}</h1>
      </v-col>
    </v-row>
    <v-row class="h-100">
      <v-col>
        <v-sheet class="mx-auto" max-width="500">
          <v-form @submit="submitForm" class="v-justify-center v-align-center">
            <v-sheet class="mt-3">
              <v-text-field
                v-model="email"
                type="email"
                id="email"
                :rules="emailRules"
                :label="$t('common.email')"
                variant="underlined"
                :errors="errors.email"
                placeholder="example@example.com"
              ></v-text-field>
            </v-sheet>
            <v-sheet class="mt-10 text-center">
              <div>
                {{ $t("auth.password_reset.title") }}
              </div>
              <div>
                {{ $t("auth.password_reset.sub_title") }}
              </div>
            </v-sheet>
            <v-btn
              type="submit"
              color="indigo-darken-3 mt-8"
              block
              class="mt-2"
              size="x-large"
              :loading="btnLoading"
            >{{ $t("common.buttons.reset") }}
            </v-btn>
            <v-sheet class="mt-10 text-center">
              <a href="/login">{{ $t("common.buttons.back") }}</a>
            </v-sheet>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import { SEND_RESET_PASSWORD_MAIL, createEndpoint } from "~/constants/api";
import { STATUS_CODES } from "~/constants/statusCode";
import { REGEX_EMAIL } from "~/constants/regex";
const { $toast } = useNuxtApp();
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const email = ref("");
const errors: any = ref({});
const btnLoading = ref(false);

const emailRules = [
  (v: string) => !!v || t("auth.validation.email_required"),
  (v: string) => REGEX_EMAIL.test(v) || t("auth.validation.email_format"),
];

const submitForm = (event: Event) => {
  event.preventDefault();
  btnLoading.value = true;
  errors.value = {}; // clear error msg
  $fetch(createEndpoint(SEND_RESET_PASSWORD_MAIL), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
    }),
  })
    .then((response: any) => {
      btnLoading.value = false;
      // TODO: show toast
      $toast.success(response.message);
    })
    .catch((e: any) => {
      btnLoading.value = false;
      const status = e.response.status;
      if (status === STATUS_CODES.VALIDATION) {
        errors.value.email = e.response._data.errors.email?.[0];
      } else if (status === STATUS_CODES.BAD_REQUEST) {
        // TODO: show toast
        $toast.error(e.response._data.message);
      } else {
        // TODO: show toast
        $toast.error(e.response._data.message);
      }
    });
};
</script>

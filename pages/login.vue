<template>
  <v-theme-provider>
    <v-sheet class="min-vh-100">
      <v-row>
        <v-col class="text-center">
          <h1 class="red--text">{{ $t("auth.login.title_1") }}</h1>
          <div>{{ $t("auth.login.sub_title") }}</div>
        </v-col>
      </v-row>
      <v-row class="h-100">
        <v-col>
          <FormLogin />
        </v-col>
      </v-row>
    </v-sheet>
  </v-theme-provider>
</template>

<script setup lang="ts">
import FormLogin from "~/components/Auth/FormLogin.vue";
</script>

<style lang="scss">
@import "@/assets/scss/pages/auth/style.scss";
</style>

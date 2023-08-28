// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: "/api/v1", // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
});

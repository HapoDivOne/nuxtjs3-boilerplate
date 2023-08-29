// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Nuxt 3 - Haposoft",
      meta: [{ name: "description", content: "Nuxt3 - Boilerplate" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  plugins: ["~/plugins/vue-toastification.ts"],
  runtimeConfig: {
    public: {
      apiBase: "/api/v1", // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
});

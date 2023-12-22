import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
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
  build: {
    transpile: ['vuetify', 'i18n'],
  },
  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/scss/master.scss",
    "vue-toastification/dist/index.css",
  ],
  devtools: { enabled: true },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
  ],
  plugins: ["~/plugins/vue-toastification.ts", "~/plugins/bootstrap.client.ts"],
  runtimeConfig: {
    public: {
      apiBase: "/api/v1", // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});

import { createI18n } from "vue-i18n";
import en from "~/locales/en";
import ja from "~/locales/ja";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    defaultLocale: "en",
    legacy: false,
    globalInjection: true,
    locale: "en",
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "ja",
        name: "日本語",
      },
    ],
    strategy: "prefix",
    messages: {
      en,
      ja,
    },
  });

  vueApp.use(i18n);
});

import { defineRouting } from "next-intl/routing";

export const locales = ["fa", "en", "ar", "ru"] as const;
export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["fa", "ar"];

export const routing = defineRouting({
  locales,
  defaultLocale: "fa",
  localePrefix: "always",
});

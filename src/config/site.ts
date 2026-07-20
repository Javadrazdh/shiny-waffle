import type { Locale } from "@/i18n/routing";

/**
 * Central place for brand + contact configuration.
 * Update these values to change contact details everywhere on the site.
 */
export const siteConfig = {
  // Update this to the production domain once purchased.
  url: "https://javadasadi.com",
  defaultOgImage: "/images/og-default.jpg",
  phone: {
    display: "۰۹۱۲ ۲۷۰ ۳۶۶۹",
    displayLatin: "0912 270 3669",
    tel: "+989122703669",
  },
  whatsapp: "https://wa.me/989122703669",
  telegram: "https://t.me/+989122703669",
  // Optional — fill in later when available.
  email: "",
  instagram: "",
  location: {
    city: "Sari",
    region: "Mazandaran",
    country: "IR",
    // Approximate Sari coordinates (edit to the exact office location).
    latitude: 36.5633,
    longitude: 53.056,
  },
} as const;

export const brandName: Record<Locale, string> = {
  fa: "جواد اسدی | املاک ساری",
  en: "Javad Asadi Real Estate — Sari",
  ar: "جواد أسدي للعقارات — ساري",
  ru: "Джавад Асади Недвижимость — Сари",
};

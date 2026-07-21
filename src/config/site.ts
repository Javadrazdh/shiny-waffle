import type { Locale } from "@/i18n/routing";

/**
 * Central place for brand + contact configuration.
 * Update these values to change contact details everywhere on the site.
 */
export const siteConfig = {
  // Public site URL. Set NEXT_PUBLIC_SITE_URL at build time (e.g. the GitHub
  // Pages URL, or a custom domain once purchased).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://javadasadi.com").replace(
    /\/$/,
    "",
  ),
  defaultOgImage: "/images/og-default.jpg",
  phone: {
    display: "۰۹۱۲ ۲۷۰ ۳۶۶۹",
    displayLatin: "0912 270 3669",
    tel: "+989122703669",
  },
  whatsapp: "https://wa.me/989122703669",
  telegram: "https://t.me/+989122703669",
  // Colleague / partner contact.
  colleague: {
    name: {
      fa: "مهندس سلیلی",
      en: "Eng. Salili",
      ar: "المهندس سلیلي",
      ru: "Инж. Салили",
    },
    phone: {
      display: "۰۹۳۰ ۰۷۸ ۵۵۷۷",
      displayLatin: "0930 078 5577",
      tel: "+989300785577",
    },
    whatsapp: "https://wa.me/989300785577",
  },
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

export const advisorName: Record<Locale, string> = {
  fa: "مهندس جواد اسدی",
  en: "Eng. Javad Asadi",
  ar: "المهندس جواد أسدي",
  ru: "Инж. Джавад Асади",
};

export const brandName: Record<Locale, string> = {
  fa: "مهندس جواد اسدی | املاک ساری",
  en: "Eng. Javad Asadi Real Estate — Sari",
  ar: "المهندس جواد أسدي للعقارات — ساري",
  ru: "Инж. Джавад Асади Недвижимость — Сари",
};

export const navItems = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "listings", href: "/listings" },
  { key: "owners", href: "/owners" },
  { key: "buyers", href: "/buyers" },
  { key: "collaboration", href: "/collaboration" },
  { key: "testimonials", href: "/testimonials" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export const localeLabels: Record<string, string> = {
  fa: "فارسی",
  en: "English",
  ar: "العربية",
  ru: "Русский",
};

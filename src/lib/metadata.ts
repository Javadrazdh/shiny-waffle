import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

export async function pageMetadata(
  locale: Locale,
  key: string,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${key}` });
  const title = t("title");
  const description = t("description");
  const cleanPath = path === "/" ? "" : path;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${cleanPath}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}${cleanPath}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${cleanPath}`,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

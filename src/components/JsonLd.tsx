import { siteConfig, brandName } from "@/config/site";
import type { Locale } from "@/i18n/routing";

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: brandName[locale],
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}${siteConfig.defaultOgImage}`,
    telephone: siteConfig.phone.tel,
    areaServed: [
      { "@type": "City", name: "Sari" },
      { "@type": "AdministrativeArea", name: "Mazandaran" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.location.latitude,
      longitude: siteConfig.location.longitude,
    },
    priceRange: "$$$$",
    knowsLanguage: ["fa", "en", "ar", "ru"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

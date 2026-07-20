import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getListing, getListings } from "@/content";
import { Link } from "@/i18n/navigation";
import { Gallery } from "@/components/Gallery";
import { LinkButton } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  const listings = await getListings();
  return routing.locales.flatMap((locale) =>
    listings.map((l) => ({ locale, slug: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const listing = await getListing(slug);
  if (!listing) return {};
  const base = await pageMetadata(locale, "listings", `/listings/${slug}`);
  return {
    ...base,
    title: listing.title[locale],
    description: listing.description[locale],
    openGraph: {
      ...base.openGraph,
      title: listing.title[locale],
      description: listing.description[locale],
      images: [{ url: listing.images[0] }],
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const listing = await getListing(slug);
  if (!listing) notFound();
  const t = await getTranslations();
  const l = t.raw("listingsPage.labels") as Record<string, string>;

  const specs = [
    { label: l.type, value: listing.type[locale] },
    { label: l.area, value: `${listing.areaSqm.toLocaleString(locale)} ${l.sqm}` },
    { label: l.location, value: listing.location[locale] },
    { label: l.deed, value: listing.deedStatus[locale] },
    { label: l.potential, value: listing.potential[locale] },
    { label: l.price, value: listing.price[locale] },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t("nav.home"), url: `/${locale}` },
          { name: t("nav.listings"), url: `/${locale}/listings` },
          { name: listing.title[locale], url: `/${locale}/listings/${slug}` },
        ]}
      />
      <div className="pt-28">
        <div className="container-luxe">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
          >
            <ArrowIcon className="size-4 rotate-180 rtl:rotate-0" />
            {t("listingsPage.back")}
          </Link>
        </div>
      </div>

      <section className="py-12">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <Gallery images={listing.images} alt={listing.title[locale]} />
            <div className="mt-10">
              <span className="rounded-full border border-gold/50 px-3 py-1 text-xs text-gold">
                {listing.type[locale]}
              </span>
              <h1 className="text-display mt-4 text-3xl leading-tight text-cream md:text-4xl">
                {listing.title[locale]}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                {listing.description[locale]}
              </p>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-ink-2 p-6">
              <dl className="divide-y divide-line">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <dt className="text-muted">{spec.label}</dt>
                    <dd className="text-cream">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-gold/40 bg-ink-2 p-6">
              <p className="text-sm leading-relaxed text-muted">
                {t("listingsPage.detailsNote")}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <LinkButton href="/contact" variant="gold" withArrow>
                  {t("cta.requestInfo")}
                </LinkButton>
                <LinkButton href="/buyers" variant="outline">
                  {t("cta.requestBuy")}
                </LinkButton>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

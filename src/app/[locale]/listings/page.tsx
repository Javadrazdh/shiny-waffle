import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getListings } from "@/content";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ListingCard } from "@/components/ListingCard";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "listings", "/listings");
}

export default async function ListingsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const listings = await getListings();

  return (
    <>
      <PageHero
        eyebrow={t("listingsPage.eyebrow")}
        title={t("listingsPage.title")}
        subtitle={t("listingsPage.subtitle")}
        image="/images/villa-forest.jpg"
      />

      <section className="border-t border-line bg-ink py-20">
        <div className="container-luxe">
          {listings.length === 0 ? (
            <p className="text-center text-muted">{t("featured.empty")}</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listings.map((listing, i) => (
                <Reveal key={listing.slug} delay={(i % 3) * 0.08}>
                  <ListingCard
                    listing={listing}
                    locale={locale}
                    areaLabel={t("listingsPage.labels.area")}
                    sqmLabel={t("listingsPage.labels.sqm")}
                  />
                </Reveal>
              ))}
            </div>
          )}
          <p className="mt-10 text-center text-sm text-muted">
            {t("listingsPage.detailsNote")}
          </p>
        </div>
      </section>
    </>
  );
}

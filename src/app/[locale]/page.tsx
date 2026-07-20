import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getServices, getFeaturedListings } from "@/content";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, LinkButton, Eyebrow } from "@/components/ui";
import { ServiceCard } from "@/components/ServiceCard";
import { ListingCard } from "@/components/ListingCard";
import { CheckIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "home", "/");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [services, featured] = await Promise.all([
    getServices(),
    getFeaturedListings(),
  ]);
  const t = await getTranslations();

  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="border-t border-line bg-ink py-24">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/about.jpg"
                alt={t("intro.title")}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-5">
              <Eyebrow>{t("intro.eyebrow")}</Eyebrow>
              <h2 className="text-display text-3xl leading-tight text-cream md:text-4xl lg:text-5xl">
                {t("intro.title")}
              </h2>
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {t("intro.body")}
              </p>
              <div>
                <LinkButton href="/about" variant="outline" withArrow>
                  {t("intro.cta")}
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Specialties */}
      <section className="border-t border-line bg-ink-2 py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              eyebrow={t("specialties.eyebrow")}
              title={t("specialties.title")}
              subtitle={t("specialties.subtitle")}
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 4) * 0.08}>
                <ServiceCard
                  service={service}
                  locale={locale}
                  ctaLabel={t("cta.viewOpportunities")}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="border-t border-line bg-ink py-24">
        <div className="container-luxe">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading
                eyebrow={t("featured.eyebrow")}
                title={t("featured.title")}
                subtitle={t("featured.subtitle")}
              />
              <LinkButton href="/listings" variant="ghost" withArrow>
                {t("cta.viewAll")}
              </LinkButton>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing, i) => (
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
        </div>
      </section>

      {/* Why me */}
      <section className="relative overflow-hidden border-t border-line bg-ink-2 py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow={t("why.eyebrow")}
              title={t("why.title")}
            />
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {(t.raw("why.items") as { title: string; body: string }[]).map(
              (item, i) => (
                <Reveal key={item.title} delay={(i % 4) * 0.08}>
                  <div className="flex flex-col gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full border border-gold/50 text-gold">
                      <CheckIcon className="size-5" />
                    </div>
                    <h3 className="text-base font-medium text-cream">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden border-t border-line py-24">
        <Image
          src="/images/villa-luxury.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="container-luxe relative z-10 flex flex-col items-center gap-6 text-center">
          <h2 className="text-display max-w-3xl text-3xl leading-tight text-cream md:text-4xl lg:text-5xl">
            {t("owners.title")}
          </h2>
          <p className="max-w-2xl text-muted md:text-lg">{t("owners.lead")}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <LinkButton href="/owners" variant="gold" withArrow>
              {t("cta.listProperty")}
            </LinkButton>
            <LinkButton href="/collaboration" variant="outline">
              {t("cta.exclusiveSale")}
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

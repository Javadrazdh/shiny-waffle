import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getServices } from "@/content";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LinkButton, Eyebrow } from "@/components/ui";
import { ServiceIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "services", "/services");
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow={t("servicesPage.eyebrow")}
        title={t("servicesPage.title")}
        subtitle={t("servicesPage.subtitle")}
        image="/images/land.jpg"
      />

      <section className="border-t border-line bg-ink">
        {services.map((service, i) => (
          <div
            key={service.slug}
            id={service.slug}
            className={`border-b border-line scroll-mt-24 ${
              i % 2 === 1 ? "bg-ink-2" : "bg-ink"
            }`}
          >
            <div className="container-luxe grid items-center gap-10 py-20 lg:grid-cols-2">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={service.image}
                    alt={service.title[locale]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.12} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex flex-col gap-5">
                  <div className="flex size-12 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </div>
                  <Eyebrow>{t("servicesPage.eyebrow")}</Eyebrow>
                  <h2 className="text-display text-3xl leading-tight text-cream md:text-4xl">
                    {service.title[locale]}
                  </h2>
                  <p className="text-base leading-relaxed text-muted md:text-lg">
                    {service.excerpt[locale]}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <LinkButton href="/listings" variant="gold" withArrow>
                      {t("cta.viewOpportunities")}
                    </LinkButton>
                    <LinkButton href="/contact" variant="outline">
                      {t("cta.requestConsult")}
                    </LinkButton>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

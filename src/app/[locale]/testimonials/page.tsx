import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getTestimonials } from "@/content";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LinkButton } from "@/components/ui";
import { StarIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "testimonials", "/testimonials");
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHero
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        image="/images/interior.jpg"
      />

      <section className="border-t border-line bg-ink py-20">
        <div className="container-luxe">
          <p className="mb-12 rounded-xl border border-line bg-ink-2 px-5 py-4 text-sm text-muted">
            {t("testimonials.note")}
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <figure className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-ink-2 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-gold">
                      {Array.from({ length: item.rating }).map((_, s) => (
                        <StarIcon key={s} />
                      ))}
                    </div>
                    {item.sample ? (
                      <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">
                        {t("testimonials.sampleBadge")}
                      </span>
                    ) : null}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-cream/90">
                    “{item.quote[locale]}”
                  </blockquote>
                  <figcaption className="border-t border-line pt-4 text-sm">
                    <span className="text-cream">{item.name}</span>
                    <span className="mt-1 block text-muted">
                      {item.dealType[locale]} · {item.city[locale]}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <LinkButton href="/contact" variant="outline" withArrow>
              {t("cta.consult")}
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}

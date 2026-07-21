import Image from "@/components/Img";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, LinkButton } from "@/components/ui";
import { CheckIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "about", "/about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const items = t.raw("why.items") as { title: string; body: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("intro.eyebrow")}
        title={t("meta.about.title")}
        subtitle={t("intro.title")}
        image="/images/about.jpg"
      />

      <section className="border-t border-line bg-ink py-24">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/interior.jpg"
                alt={t("intro.title")}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-5">
              <SectionHeading eyebrow={t("intro.eyebrow")} title={t("intro.title")} />
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {t("intro.body")}
              </p>
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {t("collaboration.lead")}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <LinkButton href="/contact" variant="gold" withArrow>
                  {t("cta.consult")}
                </LinkButton>
                <LinkButton href="/services" variant="outline">
                  {t("nav.services")}
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-24">
        <div className="container-luxe">
          <Reveal>
            <SectionHeading align="center" eyebrow={t("why.eyebrow")} title={t("why.title")} />
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 4) * 0.08}>
                <div className="flex flex-col gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <CheckIcon className="size-5" />
                  </div>
                  <h3 className="text-base font-medium text-cream">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "buyers", "/buyers");
}

export default async function BuyersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero
        eyebrow={t("buyers.eyebrow")}
        title={t("buyers.title")}
        subtitle={t("buyers.lead")}
        image="/images/coastal.jpg"
      />

      <section className="border-t border-line bg-ink py-20">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {t("buyers.body")}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-line bg-ink-2 p-6 md:p-8">
              <h2 className="text-display mb-6 text-2xl text-cream">
                {t("buyers.formTitle")}
              </h2>
              <LeadForm formType="buyer" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

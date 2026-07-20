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
  return pageMetadata(locale, "owners", "/owners");
}

export default async function OwnersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const types = t.raw("owners.types") as string[];

  return (
    <>
      <PageHero
        eyebrow={t("owners.eyebrow")}
        title={t("owners.title")}
        subtitle={t("owners.lead")}
        image="/images/villa-luxury.jpg"
      />

      <section className="border-t border-line bg-ink py-20">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {t("owners.body")}
              </p>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-line bg-ink-2 px-4 py-2 text-sm text-cream/90"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-line bg-ink-2 p-6 md:p-8">
              <h2 className="text-display mb-6 text-2xl text-cream">
                {t("owners.formTitle")}
              </h2>
              <LeadForm formType="owner" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

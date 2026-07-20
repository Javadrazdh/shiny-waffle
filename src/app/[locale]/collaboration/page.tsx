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
  return pageMetadata(locale, "collaboration", "/collaboration");
}

export default async function CollaborationPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const steps = t.raw("collaboration.steps") as { title: string; body: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("collaboration.eyebrow")}
        title={t("collaboration.title")}
        subtitle={t("collaboration.lead")}
        image="/images/partnership.jpg"
      />

      <section className="border-t border-line bg-ink py-24">
        <div className="container-luxe">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 4) * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-ink-2 p-6 hover-lift">
                  <span className="text-display text-3xl text-gold">
                    {(i + 1).toLocaleString(locale, { minimumIntegerDigits: 2 })}
                  </span>
                  <h3 className="text-base font-medium text-cream">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-20">
        <div className="container-luxe max-w-2xl">
          <Reveal>
            <div className="rounded-2xl border border-line bg-ink p-6 md:p-8">
              <h2 className="text-display mb-6 text-2xl text-cream">
                {t("collaboration.cta")}
              </h2>
              <LeadForm formType="collaboration" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

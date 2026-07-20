import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { PhoneIcon, WhatsAppIcon, TelegramIcon, MapPinIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const channels = [
    {
      icon: <PhoneIcon className="size-5" />,
      label: t("contact.phoneLabel"),
      value: siteConfig.phone.displayLatin,
      href: `tel:${siteConfig.phone.tel}`,
    },
    {
      icon: <WhatsAppIcon className="size-5" />,
      label: t("contact.whatsappLabel"),
      value: siteConfig.phone.displayLatin,
      href: siteConfig.whatsapp,
    },
    {
      icon: <TelegramIcon className="size-5" />,
      label: t("contact.telegramLabel"),
      value: siteConfig.phone.displayLatin,
      href: siteConfig.telegram,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        image="/images/nature.jpg"
      />

      <section className="border-t border-line bg-ink py-20">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="flex flex-col gap-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-line bg-ink-2 p-5 transition-colors hover:border-gold"
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 text-gold">
                    {c.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm text-muted">{c.label}</span>
                    <span className="text-cream" dir="ltr">
                      {c.value}
                    </span>
                  </span>
                </a>
              ))}
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-ink-2 p-5">
                <span className="flex size-11 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <MapPinIcon className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm text-muted">
                    {t("contact.locationLabel")}
                  </span>
                  <span className="text-cream">{t("contact.location")}</span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-2xl border border-line bg-ink-2 p-6 md:p-8">
              <h2 className="text-display mb-6 text-2xl text-cream">
                {t("contact.formTitle")}
              </h2>
              <LeadForm formType="contact" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

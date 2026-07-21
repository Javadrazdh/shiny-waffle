import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { siteConfig, advisorName } from "@/config/site";
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

  const team = [
    {
      name: advisorName[locale],
      role: t("contact.roleLead"),
      phone: siteConfig.phone,
      whatsapp: siteConfig.whatsapp,
    },
    {
      name: siteConfig.colleague.name[locale],
      role: t("contact.roleColleague"),
      phone: siteConfig.colleague.phone,
      whatsapp: siteConfig.colleague.whatsapp,
    },
  ];

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

      <section className="border-t border-line bg-ink-2 py-20">
        <div className="container-luxe">
          <Reveal>
            <h2 className="text-display mb-8 text-center text-2xl text-cream md:text-3xl">
              {t("contact.teamTitle")}
            </h2>
          </Reveal>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-ink p-6 text-center">
                  <div>
                    <p className="text-display text-xl text-cream">{m.name}</p>
                    <p className="mt-1 text-sm text-gold">{m.role}</p>
                    <p className="mt-2 text-sm text-muted" dir="ltr">
                      {m.phone.displayLatin}
                    </p>
                  </div>
                  <div className="mt-auto flex justify-center gap-3">
                    <a
                      href={`tel:${m.phone.tel}`}
                      className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
                    >
                      <PhoneIcon className="size-4" />
                      {t("contact.callAction")}
                    </a>
                    <a
                      href={m.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink"
                    >
                      <WhatsAppIcon className="size-4" />
                      {t("contact.whatsappAction")}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

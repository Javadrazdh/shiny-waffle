import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { brandName, siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { PhoneIcon, WhatsAppIcon, TelegramIcon, MapPinIcon } from "./icons";

export async function Footer() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="text-display text-xl text-cream">{brandName[locale]}</p>
          <p className="mt-1 text-sm text-gold">{t("brandLine")}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t("about")}</p>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-cream/70">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {tn(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-cream/70">
            {t("contactTitle")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="flex items-center gap-2 text-muted transition-colors hover:text-gold"
              >
                <PhoneIcon className="size-4 text-gold" />
                <span dir="ltr">{siteConfig.phone.displayLatin}</span>
              </a>
            </li>
            <li>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-gold"
              >
                <WhatsAppIcon className="size-4 text-gold" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted transition-colors hover:text-gold"
              >
                <TelegramIcon className="size-4 text-gold" />
                Telegram
              </a>
            </li>
            <li className="border-t border-line pt-3">
              <a
                href={`tel:${siteConfig.colleague.phone.tel}`}
                className="flex items-center gap-2 text-muted transition-colors hover:text-gold"
              >
                <PhoneIcon className="size-4 text-gold" />
                <span>
                  {siteConfig.colleague.name[locale]}
                  <span className="text-cream/50"> · {tc("roleColleague")}</span>
                  <br />
                  <span dir="ltr">{siteConfig.colleague.phone.displayLatin}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-2 text-muted">
              <MapPinIcon className="size-4 text-gold" />
              {tc("location")}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest text-cream/70">
            {t("noteTitle")}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {t("disclaimer")}
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted md:flex-row">
          <p>
            © {year} {brandName[locale]}. {t("rights")}
          </p>
          <p dir="ltr">Sari · Mazandaran · Iran</p>
        </div>
      </div>
    </footer>
  );
}

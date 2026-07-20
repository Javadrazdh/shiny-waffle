"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { PhoneIcon, WhatsAppIcon, TelegramIcon } from "./icons";

export function FloatingContact() {
  const t = useTranslations("cta");

  return (
    <div className="fixed bottom-5 end-4 z-40 flex flex-col gap-3">
      <a
        href={siteConfig.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsapp")}
        className="flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-110"
      >
        <WhatsAppIcon className="size-6" />
      </a>
      <a
        href={siteConfig.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("telegram")}
        className="flex size-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lg shadow-black/40 transition-transform hover:scale-110"
      >
        <TelegramIcon className="size-6" />
      </a>
      <a
        href={`tel:${siteConfig.phone.tel}`}
        aria-label={t("callNow")}
        className="flex size-12 items-center justify-center rounded-full bg-gold text-ink shadow-lg shadow-black/40 transition-transform hover:scale-110"
      >
        <PhoneIcon className="size-6" />
      </a>
    </div>
  );
}

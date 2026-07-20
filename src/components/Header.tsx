"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/nav";
import { brandName, siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { PhoneIcon } from "./icons";

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between py-3">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-display text-lg md:text-xl text-cream">
            {brandName[locale]}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm transition-colors duration-300 hover:text-gold ${
                  active ? "text-gold" : "text-cream/90"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phone.tel}`}
            className="hidden items-center gap-2 rounded-full border border-gold px-4 py-2 text-xs text-gold transition-colors hover:bg-gold hover:text-ink md:inline-flex"
          >
            <PhoneIcon className="size-4" />
            <span dir="ltr">{siteConfig.phone.displayLatin}</span>
          </a>
          <div className="hidden lg:block">
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            aria-label={t("menu")}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-line text-cream lg:hidden"
          >
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span
                className={`h-px w-full bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span className={`h-px w-full bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-px w-full bg-current transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md transition-[max-height] duration-500 ${
          open ? "max-h-[80vh]" : "max-h-0"
        }`}
      >
        <nav className="container-luxe flex flex-col py-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/60 py-3 text-cream/90 transition-colors hover:text-gold"
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-4">
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="inline-flex items-center gap-2 text-sm text-gold"
              dir="ltr"
            >
              <PhoneIcon className="size-4" />
              {siteConfig.phone.displayLatin}
            </a>
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}

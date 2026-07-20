"use client";

import { useLocale } from "next-intl";
import { useTransition, useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeLabels } from "@/lib/nav";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function change(next: string) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-cream transition-colors hover:border-gold hover:text-gold"
      >
        {localeLabels[locale]}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute end-0 mt-2 min-w-32 overflow-hidden rounded-xl border border-line bg-ink-2 py-1 shadow-2xl z-50"
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => change(l)}
                className={`block w-full px-4 py-2 text-start text-sm transition-colors hover:bg-ink-3 ${
                  l === locale ? "text-gold" : "text-cream"
                }`}
              >
                {localeLabels[l]}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

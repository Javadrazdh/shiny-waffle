import Image from "@/components/Img";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { ServiceIcon, ArrowIcon } from "./icons";

export function ServiceCard({
  service,
  locale,
  ctaLabel,
}: {
  service: Service;
  locale: Locale;
  ctaLabel: string;
}) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 hover-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute bottom-4 start-4 flex size-11 items-center justify-center rounded-full border border-gold/60 bg-ink/70 text-gold backdrop-blur">
          <ServiceIcon name={service.icon} className="size-5" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-lg font-medium text-cream">{service.title[locale]}</h3>
        <p className="text-sm leading-relaxed text-muted">
          {service.excerpt[locale]}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-sm text-gold">
          {ctaLabel}
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

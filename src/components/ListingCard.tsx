import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Listing } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { MapPinIcon } from "./icons";

export function ListingCard({
  listing,
  locale,
  areaLabel,
  sqmLabel,
}: {
  listing: Listing;
  locale: Locale;
  areaLabel: string;
  sqmLabel: string;
}) {
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 hover-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={listing.images[0]}
          alt={listing.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <span className="absolute top-4 start-4 rounded-full border border-gold/50 bg-ink/70 px-3 py-1 text-xs text-gold backdrop-blur">
          {listing.type[locale]}
        </span>
        <span className="absolute bottom-4 end-4 rounded-full bg-gold px-3 py-1 text-xs font-medium text-ink">
          {listing.price[locale]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-medium leading-snug text-cream">
          {listing.title[locale]}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted">
          <MapPinIcon className="size-4 text-gold" />
          {listing.location[locale]}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4 text-sm">
          <span className="text-muted">{areaLabel}</span>
          <span className="text-cream" dir="ltr">
            {listing.areaSqm.toLocaleString(locale)} {sqmLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

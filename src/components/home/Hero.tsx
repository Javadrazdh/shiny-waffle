import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/components/ui";

export async function Hero() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("cta");

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-transparent" />

      <div className="container-luxe relative z-10 pt-24">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-sm uppercase tracking-[0.25em] text-gold">
            {t("eyebrow")}
          </p>
          <h1
            className="animate-fade-up text-display mt-6 text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl xl:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            {t("title")}
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg"
            style={{ animationDelay: "0.2s" }}
          >
            {t("subtitle")}
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-wrap gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <LinkButton href="/contact" variant="gold" withArrow>
              {tc("consult")}
            </LinkButton>
            <LinkButton href="/owners" variant="outline">
              {tc("listProperty")}
            </LinkButton>
            <LinkButton href="/buyers" variant="outline">
              {tc("requestBuy")}
            </LinkButton>
            <LinkButton href="/collaboration" variant="ghost">
              {tc("exclusiveSale")}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}

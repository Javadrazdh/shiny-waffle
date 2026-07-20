import { getTranslations } from "next-intl/server";
import { LinkButton } from "@/components/ui";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 pt-24 text-center">
      <div className="flex flex-col items-center gap-6">
        <p className="text-display text-7xl text-gold">404</p>
        <h1 className="text-display text-2xl text-cream md:text-3xl">
          {t("hero.eyebrow")}
        </h1>
        <LinkButton href="/" variant="gold" withArrow>
          {t("nav.home")}
        </LinkButton>
      </div>
    </section>
  );
}

import Image from "@/components/Img";
import { Eyebrow } from "./ui";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image = "/images/nature.jpg",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pb-14 pt-32">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      <div className="container-luxe relative z-10">
        <div className="flex max-w-3xl flex-col gap-5">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-display text-4xl leading-tight text-cream md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-base leading-relaxed text-cream/80 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

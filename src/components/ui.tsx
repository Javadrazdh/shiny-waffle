import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "./icons";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold">
      <span className="gold-line" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center flex flex-col items-center gap-4"
          : "max-w-2xl flex flex-col gap-4"
      }
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-display text-3xl md:text-4xl lg:text-5xl leading-tight text-cream">
        {title}
      </h2>
      {subtitle ? (
        <p className="text-muted text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

type ButtonVariant = "gold" | "outline" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  gold: "bg-gold text-ink hover:bg-gold-soft border border-gold",
  outline:
    "border border-line text-cream hover:border-gold hover:text-gold bg-transparent",
  ghost: "text-cream hover:text-gold",
};

export function LinkButton({
  href,
  children,
  variant = "gold",
  className = "",
  withArrow = false,
}: {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300 ${variantClass[variant]} ${className}`}
    >
      {children}
      {withArrow ? (
        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      ) : null}
    </Link>
  );
}

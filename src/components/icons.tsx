import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function WhatsAppIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Z" />
      <path d="M8.5 7.8c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4 0 .5l-.4.5c-.1.2-.3.3-.1.6a6 6 0 0 0 2.9 2.5c.3.1.5.1.7-.1l.5-.6c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.4v.6c-.1.5-.9 1-1.3 1a6.6 6.6 0 0 1-6.4-4.6c-.2-.5-.5-1.4-.5-2 0-.6.3-1.1.5-1.3Z" />
    </svg>
  );
}

export function TelegramIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M21.5 4.3 2.9 11.5c-.9.4-.9 1.6 0 1.9l4.6 1.5 1.8 5.5c.2.6 1 .7 1.4.2l2.5-2.7 4.6 3.4c.5.4 1.3.1 1.4-.5l3.1-15c.2-.8-.6-1.4-1.3-1Z" />
      <path d="m7.5 14.9 9.4-6.2-7.6 7.3" />
    </svg>
  );
}

export function MapPinIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ArrowIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function StarIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18} {...p}>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
    </svg>
  );
}

const strokeIcons: Record<string, ReactElement> = {
  land: <path d="M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6" />,
  partnership: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0" />
    </>
  ),
  industrial: <path d="M3 20V10l5 3V10l5 3V6l6 3v11H3Z" />,
  coastal: (
    <>
      <path d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" />
      <path d="M12 3v6M9 6l3-3 3 3" />
      <circle cx="18" cy="6" r="2" />
    </>
  ),
  forest: (
    <>
      <path d="M12 2 7 10h10L12 2Z" />
      <path d="M12 8 6 17h12L12 8Z" />
      <path d="M12 17v5" />
    </>
  ),
  villa: <path d="M3 21V10l9-6 9 6v11h-6v-6H9v6H3Z" />,
  commercial: (
    <>
      <path d="M3 21V7l9-4 9 4v14" />
      <path d="M9 21v-5h6v5M7 10h.01M12 10h.01M17 10h.01M7 14h.01M17 14h.01" />
    </>
  ),
  investment: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 7v5M16 7h5" />
    </>
  ),
};

export function ServiceIcon({ name, ...p }: IconProps & { name: string }) {
  return (
    <svg {...base} {...p}>
      {strokeIcons[name] ?? strokeIcons.villa}
    </svg>
  );
}

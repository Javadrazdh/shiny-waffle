import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Javad Asadi Real Estate — Sari",
    short_name: "Javad Asadi",
    description: "Real Estate Advisor in Sari & Mazandaran",
    start_url: "/fa",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [{ src: "/images/og-default.jpg", sizes: "any", type: "image/jpeg" }],
  };
}

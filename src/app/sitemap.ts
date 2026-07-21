import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { navItems } from "@/lib/nav";
import { getListings, getPosts } from "@/content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const staticPaths = ["", ...navItems.map((n) => n.href)];

  const [listings, posts] = await Promise.all([getListings(), getPosts()]);
  const dynamicPaths = [
    ...listings.map((l) => `/listings/${l.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  return allPaths.map((path) => ({
    url: `${base}/${routing.defaultLocale}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${base}/${l}${path}`]),
      ),
    },
  }));
}

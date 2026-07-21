import Image from "@/components/Img";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/content";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return pageMetadata(locale, "blog", "/blog");
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow={t("blog.eyebrow")}
        title={t("blog.title")}
        subtitle={t("blog.subtitle")}
        image="/images/blog-1.jpg"
      />

      <section className="border-t border-line bg-ink py-20">
        <div className="container-luxe grid gap-8 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-2 hover-lift"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title[locale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <time className="text-xs uppercase tracking-widest text-gold">
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="text-xl font-medium leading-snug text-cream">
                    {post.title[locale]}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {post.excerpt[locale]}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-3 text-sm text-gold">
                    {t("cta.readMore")}
                    <ArrowIcon className="size-4 rtl:rotate-180" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

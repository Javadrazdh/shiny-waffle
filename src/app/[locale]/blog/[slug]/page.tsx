import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { getPost, getPosts } from "@/content";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/components/ui";
import { ArrowIcon } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const posts = await getPosts();
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const base = await pageMetadata(locale, "blog", `/blog/${slug}`);
  return {
    ...base,
    title: post.title[locale],
    description: post.excerpt[locale],
    openGraph: {
      ...base.openGraph,
      type: "article",
      title: post.title[locale],
      description: post.excerpt[locale],
      images: [{ url: post.cover }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getPost(slug);
  if (!post) notFound();
  const t = await getTranslations();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.date,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <section className="relative flex min-h-[52vh] items-end overflow-hidden pb-14 pt-32">
        <Image src={post.cover} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="container-luxe relative z-10">
          <time className="text-xs uppercase tracking-widest text-gold">
            {t("blog.publishedOn")}{" "}
            {new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-display mt-4 max-w-3xl text-3xl leading-tight text-cream md:text-5xl">
            {post.title[locale]}
          </h1>
        </div>
      </section>

      <article className="border-t border-line bg-ink py-16">
        <div className="container-luxe max-w-3xl">
          <p className="text-lg leading-relaxed text-cream/90">
            {post.excerpt[locale]}
          </p>
          <div className="mt-8 space-y-6 text-base leading-loose text-muted">
            {post.body[locale].split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
            >
              <ArrowIcon className="size-4 rotate-180 rtl:rotate-0" />
              {t("blog.back")}
            </Link>
            <LinkButton href="/contact" variant="gold" withArrow>
              {t("cta.consult")}
            </LinkButton>
          </div>
        </div>
      </article>
    </>
  );
}

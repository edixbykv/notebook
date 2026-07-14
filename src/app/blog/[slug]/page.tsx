import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";
import { Section, Container } from "@/components/notebook/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/notebook/reveal";
import { Squiggle } from "@/components/notebook/doodles";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return buildMetadata({ title: "Article not found" });
  return buildMetadata({
    title: post.title,
    path: `/blog/${post.slug}`,
    description: post.excerpt,
    type: "article",
    keywords: [post.category],
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);
  const fallbackRelated = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);
  const relatedPosts = related.length ? related : fallbackRelated;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema({
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            date: post.date,
          }),
        ]}
      />

      <article>
        <header className="relative overflow-hidden ruled-paper pb-10 pt-28 sm:pt-32 lg:pt-40">
          <Container>
            <Breadcrumbs items={crumbs} />
            <div className="mx-auto max-w-3xl">
              <span className="inline-block rounded-full bg-marker px-3 py-1 text-xs font-bold text-paper">
                {post.category}
              </span>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <Squiggle color="#E53935" className="mt-4 h-4 w-44" draw={false} />
              <div className="mt-5 flex items-center gap-5 text-sm text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </Container>
        </header>

        <Section className="bg-paper py-12 sm:py-16">
          <Container>
            <div className="mx-auto max-w-3xl">
              <ArticleBody post={post} />

              <div className="mt-12 rounded-2xl bg-paper-deep p-7 text-center shadow-paper">
                <p className="font-hand text-2xl font-bold text-marker">
                  Enjoyed this?
                </p>
                <p className="mt-1 text-ink-soft">
                  Let&apos;s turn these ideas into real growth for your
                  business.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper"
                >
                  Book a free consultation
                </Link>
              </div>

              <Link
                href="/blog"
                className="mt-10 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-marker"
              >
                <ArrowLeft className="h-4 w-4" /> Back to all articles
              </Link>
            </div>
          </Container>
        </Section>

        {/* related */}
        <Section ruled className="ruled-paper py-14">
          <Container>
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-ink">
              Keep reading
            </h2>
            <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <Reveal key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block h-full rounded-lg bg-paper p-6 shadow-paper transition-all hover:-translate-y-1 hover:shadow-paper-lift"
                  >
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-0.5 text-xs font-bold",
                        p.color === "marker"
                          ? "bg-marker text-paper"
                          : p.color === "ink"
                            ? "bg-ink text-paper"
                            : "bg-sticky text-ink"
                      )}
                    >
                      {p.category}
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink group-hover:text-marker">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{p.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      </article>

      <FinalCtaSection />
    </>
  );
}

/** Generated, on-brand long-form body so each article reads as a real post. */
function ArticleBody({
  post,
}: {
  post: (typeof blogPosts)[number];
}) {
  return (
    <div className="prose-notebook space-y-6 text-lg leading-relaxed text-ink-soft [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:mt-10 [&_strong]:text-ink">
      <p className="text-xl text-ink">{post.excerpt}</p>

      <p>
        At KVai Solutions, we believe the businesses that win with technology
        aren&apos;t the ones chasing every shiny trend — they&apos;re the ones
        who apply the right tools to the right problems. This article breaks
        down a practical way to think about{" "}
        <strong>{post.category.toLowerCase()}</strong> so you can act on it this
        week, not someday.
      </p>

      <h2>Why this matters right now</h2>
      <p>
        The bar for what customers expect keeps rising. Faster responses,
        slicker experiences, and content that actually speaks to them. The good
        news is that the same shift that raised the bar also handed small and
        mid-sized businesses the tools to clear it — often for a fraction of
        what it used to cost.
      </p>

      <h2>The approach we actually use</h2>
      <p>
        We start with outcomes, never tools. What does growth look like for
        you — more qualified leads, fewer hours lost to admin, a brand people
        remember? Once that&apos;s clear, the &ldquo;how&rdquo; gets a lot
        simpler. We map the smallest set of changes that move that number, ship
        them, measure, and iterate.
      </p>
      <p>
        Crucially, we keep humans in the loop. Our guiding principle —{" "}
        <strong>AI should empower people, not replace them</strong> — means
        every system we build is designed to give you leverage and control, not
        take it away.
      </p>

      <h2>Where to start</h2>
      <p>
        Pick one painful, repetitive, or high-leverage area and go deep there
        first. A focused win builds momentum and trust far better than a dozen
        half-finished experiments. If you&apos;re not sure where that is, that
        &apos;s exactly what our free consultation is for — we&apos;ll help you
        find the single highest-impact move for your business.
      </p>

      <h2>The bottom line</h2>
      <p>
        You don&apos;t need to do everything at once. You need the right next
        step, executed well. That&apos;s the whole philosophy behind how we
        work — and it&apos;s how we help businesses grow faster without burning
        out their teams.
      </p>
    </div>
  );
}

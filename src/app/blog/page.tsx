import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { Reveal } from "@/components/notebook/reveal";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  path: "/blog",
  description:
    "Practical, no-hype articles on AI, websites, social media, automation, and SEO — written to help you actually grow your business.",
  keywords: ["AI blog", "business growth tips", "marketing insights"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="The notebook"
        title="Ideas worth writing down"
        description="Strategies, playbooks, and honest takes on growing a business with AI — minus the hype and jargon."
        crumbs={crumbs}
      />

      <Section className="bg-paper">
        <Container>
          {/* featured */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-6 overflow-hidden rounded-2xl bg-paper-deep shadow-paper transition-shadow hover:shadow-paper-lift md:grid-cols-2"
            >
              <div
                className={cn(
                  "relative min-h-[220px]",
                  featured.color === "sticky" && "bg-sticky",
                  featured.color === "marker" && "bg-marker",
                  featured.color === "ink" && "bg-ink"
                )}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(0,0,0,0.08) 0 12px, transparent 12px 24px)",
                  }}
                />
                <span className="absolute left-6 top-6 rounded-full bg-paper px-3 py-1 text-xs font-bold text-ink">
                  Featured · {featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="flex items-center gap-4 text-xs text-ink-soft">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(featured.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-ink-soft">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-marker">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* grid */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg bg-paper shadow-paper transition-all hover:-translate-y-1 hover:shadow-paper-lift"
                >
                  <div
                    className={cn(
                      "relative h-32",
                      post.color === "sticky" && "bg-sticky",
                      post.color === "marker" && "bg-marker",
                      post.color === "ink" && "bg-ink"
                    )}
                  >
                    <span className="tape" aria-hidden="true" />
                    <span
                      className={cn(
                        "absolute bottom-3 left-4 rounded-full px-2.5 py-0.5 text-xs font-bold",
                        post.color === "sticky"
                          ? "bg-ink text-paper"
                          : "bg-paper text-ink"
                      )}
                    >
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-ink-soft">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-ink-soft">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-marker">
                      Read more
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}

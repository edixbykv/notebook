import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Video, FileText, Download, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { Reveal } from "@/components/notebook/reveal";
import { SocialScienceChapter } from "@/components/sections/social-science-chapter";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Vlog & Interactive LMS",
  path: "/vlog",
  description:
    "Interactive LMS modules, study guides, video breakdowns, and educational projects built by KVai Solutions.",
  keywords: ["Vlog", "LMS platform", "interactive education", "study guides", "Class 6 Social Science"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Vlog & LMS", path: "/vlog" },
];

export default function VlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Interactive LMS & Vlog"
        title="Knowledge presented with clarity & motion"
        description="Experience our interactive educational LMS modules, video breakdowns, and textbook chapter transformations — engineered with notebook precision."
        crumbs={crumbs}
      />

      <Section className="bg-paper py-12 sm:py-16">
        <Container>
          {/* Active Featured LMS Chapter */}
          <Reveal>
            <div className="mb-10 rounded-2xl border-2 border-ink/15 bg-paper-deep p-6 shadow-notebook sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-marker px-3 py-1 text-xs font-bold text-ink">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured Interactive LMS Module
                  </span>
                  <span className="text-xs font-semibold text-ink-soft">
                    Awareness Social Sciences &bull; Class VI
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="/documents/social-science-chap-1.pdf"
                    download
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper transition-transform hover:scale-105"
                  >
                    <Download className="h-3.5 w-3.5 text-marker" />
                    Original PDF
                  </a>
                  <Link
                    href="/blog/locating-places-and-reading-maps"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ink hover:text-marker-deep"
                  >
                    Open Standalone Article
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Render the complete chapter study & quiz system */}
              <div className="mt-8">
                <SocialScienceChapter />
              </div>
            </div>
          </Reveal>

          {/* More LMS & Vlog Projects */}
          <div className="mt-16 text-center">
            <h3 className="font-display text-2xl font-bold text-ink">
              Looking for custom LMS, Educational, or Video Content?
            </h3>
            <p className="mt-2 text-sm text-ink-soft max-w-xl mx-auto">
              We design and build custom interactive learning portals, educational digital platforms, and high-converting video edits.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper shadow-lg hover:bg-ink-soft transition-colors"
              >
                <Video className="h-4 w-4 text-marker" />
                Explore Video Portfolio
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-marker px-6 py-3 text-sm font-bold text-ink shadow-lg hover:scale-105 transition-transform"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}

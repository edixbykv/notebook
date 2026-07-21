import type { Metadata } from "next";
import Link from "next/link";
import { Download, BookOpen, Sparkles, GraduationCap, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { Reveal } from "@/components/notebook/reveal";
import { SocialScienceChapter } from "@/components/sections/social-science-chapter";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const metadata: Metadata = buildMetadata({
  title: "Class VI Social Science LMS & Interactive Study Portal",
  path: "/lms",
  description:
    "Interactive LMS study portal for Class VI Social Science Chapter 1 — Locating Places and Reading Maps. Complete reading module, time zone calculator, and quiz.",
  keywords: ["Class 6 Social Science LMS", "Locating Places and Reading Maps", "Interactive Study Portal", "PDF Reader"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "LMS Portal", path: "/lms" },
];

export default function LmsPortalPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Interactive Learning Portal"
        title="Class VI Social Science — Locating Places & Reading Maps"
        description="A complete interactive LMS study module, chapter breakdown, time calculator, and practice evaluation system — powered by KVai LMS."
        crumbs={crumbs}
      />

      <Section className="bg-paper py-12 sm:py-16">
        <Container>
          {/* Top Banner Card */}
          <Reveal>
            <div className="mb-10 rounded-2xl border-2 border-ink/15 bg-paper-deep p-6 shadow-notebook sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper font-bold">
                    <GraduationCap className="h-5 w-5 text-marker" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-marker">
                      Awareness Social Sciences &bull; Class VI
                    </span>
                    <h2 className="font-display text-2xl font-bold text-ink">
                      Chapter 1: Locating Places and Reading Maps
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="/documents/social-science-chap-1.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-bold text-paper transition-transform hover:scale-105 shadow-md"
                  >
                    <Download className="h-4 w-4 text-marker" />
                    Download PDF Book (6 MB)
                  </a>
                </div>
              </div>

              {/* Embedded Interactive PDF Viewer & Reader */}
              <div className="mb-8">
                <h3 className="font-display text-lg font-bold text-ink mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-marker" />
                  Official Textbook Reader (15 Pages)
                </h3>
                <div className="relative overflow-hidden rounded-xl border border-ink/20 bg-black shadow-2xl">
                  <iframe
                    src="/documents/social-science-chap-1.pdf#toolbar=1"
                    className="h-[650px] w-full border-0"
                    title="Social Science Class VI Chapter 1 Textbook PDF"
                  />
                </div>
              </div>

              {/* Complete Interactive Chapter Content */}
              <div className="mt-10 pt-8 border-t border-ink/15">
                <h3 className="font-display text-xl font-bold text-ink mb-6 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-marker" />
                  Interactive Study Module, Calculator &amp; Quiz
                </h3>
                <SocialScienceChapter />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}

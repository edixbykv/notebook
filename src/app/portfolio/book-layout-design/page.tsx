import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Download,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowLeft,
  BookOpen,
  Cpu,
  Globe,
  Grid,
  PenTool,
  Palette,
  ExternalLink,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { Reveal } from "@/components/notebook/reveal";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { SocialScienceChapter } from "@/components/sections/social-science-chapter";

export const metadata: Metadata = buildMetadata({
  title: "Class VI Social Science Textbook & Layout Design Case Study",
  path: "/portfolio/book-layout-design",
  description:
    "Complete 15-page editorial DTP layout design in Adobe InDesign for Class VI Social Science Chapter 1 — featuring 42 custom EPS vector maps, time formulas, and CMYK preflight.",
  keywords: [
    "Textbook layout design",
    "InDesign DTP project",
    "Editorial graphic design",
    "Curriculum book design",
    "EPS vector maps",
    "Class VI Social Science",
  ],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Textbook Layout Design", path: "/portfolio/book-layout-design" },
];

const CHAPTER_SPREADS = [
  {
    id: "spread-1",
    title: "Chapter Opener & Shape of Earth",
    pages: "Pages 1 – 3",
    description:
      "2-column layout with Chapter Head ornament banner (Chapter Head-1.eps), key learning objectives, oblate spheroid diagram, and 66.5° orbital tilt vector.",
    highlights: ["Custom Ornament Header", "Oblate Spheroid Specs", "66.5° Tilt Axis Graphic"],
  },
  {
    id: "spread-2",
    title: "Latitudes & Global Heat Zones",
    pages: "Pages 4 – 6",
    description:
      "Structured breakdown of Equator 0°, Tropics 23.5° N/S, Polar Circles 66.5° N/S, and Torrid/Temperate/Frigid heat zones with custom sun ray angle vectors.",
    highlights: ["Heat Zone Swatches", "Sun Ray Vector Graphics", "Parallel Latitude Grid"],
  },
  {
    id: "spread-3",
    title: "Longitudes & Time Zone Formulas",
    pages: "Pages 7 – 9",
    description:
      "Greenwich Prime Meridian 0°, 180° Date Line, and Indian Standard Time (IST 82.5° E / +5:30) calculations using custom equation vectors (Eqn1.eps, Eqn2.eps).",
    highlights: ["1° = 4 Min Time Formula", "IST 82.5° E Breakdown", "Eqn1 & Eqn2 Vectors"],
  },
  {
    id: "spread-4",
    title: "Maps, Scale & Compass Rose",
    pages: "Pages 10 – 12",
    description:
      "Physical, Political, and Thematic Map classifications paired with a 3-tier Map Scale guide (Verbal, Ratio, Bar) and an 8-Point Compass Rose directional graphic.",
    highlights: ["8-Point Compass Rose", "3-Tier Map Scale Guide", "Conventional Legend Signs"],
  },
  {
    id: "spread-5",
    title: "End-of-Chapter Exercises & Evaluation",
    pages: "Pages 13 – 15",
    description:
      "Comprehensive student assessment layout including Multiple Choice Questions, Fill in the Blanks, Short Answers, and Map-Pointing Practical Activities.",
    highlights: ["MCQ Grid Layout", "Fill-in-the-Blanks Styling", "Practical Map Activity"],
  },
];

export default function BookLayoutDesignCaseStudyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Case Study &bull; Editorial & DTP Layout Design"
        title="Class VI Social Science Textbook & Curriculum Design"
        description="A complete 15-page educational publication package created in Adobe InDesign CC — featuring multi-column typesetting, 42 custom EPS vector maps, time formulas, and CMYK preflight."
        crumbs={crumbs}
      />

      <Section className="bg-paper py-12 sm:py-16">
        <Container>
          {/* Back to Portfolio Link */}
          <div className="mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-marker-deep transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Portfolio Showcase
            </Link>
          </div>

          {/* Key Project Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <div className="rounded-xl border border-ink/15 bg-paper-deep p-5 shadow-paper">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-paper font-bold">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ink-soft uppercase tracking-wider">
                    Total Pages
                  </span>
                  <div className="font-display text-xl font-bold text-ink">15 Pages</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-ink/15 bg-paper-deep p-5 shadow-paper">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-marker text-ink font-bold">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ink-soft uppercase tracking-wider">
                    Vector Assets
                  </span>
                  <div className="font-display text-xl font-bold text-ink">42 EPS Files</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-ink/15 bg-paper-deep p-5 shadow-paper">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-paper font-bold">
                  <PenTool className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ink-soft uppercase tracking-wider">
                    Software Stack
                  </span>
                  <div className="font-display text-xl font-bold text-ink">Adobe InDesign CC</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-ink/15 bg-paper-deep p-5 shadow-paper">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-marker text-ink font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-ink-soft uppercase tracking-wider">
                    Print Specification
                  </span>
                  <div className="font-display text-xl font-bold text-ink">300 DPI CMYK</div>
                </div>
              </div>
            </div>
          </div>

          {/* Live In-Browser PDF Reader Showcase */}
          <Reveal>
            <div className="mb-16 rounded-2xl border-2 border-ink/15 bg-paper-deep p-6 shadow-notebook sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4 mb-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-marker px-3 py-1 text-xs font-bold text-ink">
                    <Sparkles className="h-3.5 w-3.5" />
                    Live 15-Page High-Res PDF Document
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                    Social Science Chapter 1: Locating Places and Reading Maps
                  </h3>
                </div>

                <a
                  href="/documents/social-science-chap-1.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-paper transition-transform hover:scale-105 shadow-md"
                >
                  <Download className="h-4 w-4 text-marker" />
                  Download Complete PDF (6 MB)
                </a>
              </div>

              {/* Embedded Interactive PDF Viewer */}
              <div className="relative overflow-hidden rounded-xl border border-ink/20 bg-black shadow-2xl">
                <iframe
                  src="/documents/social-science-chap-1.pdf#toolbar=1"
                  className="h-[650px] w-full border-0"
                  title="Social Science Class VI Chapter 1 PDF Document"
                />
              </div>
            </div>
          </Reveal>

          {/* Editorial Design & Production Specifications Grid */}
          <div className="mb-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-ink/15 bg-paper p-6 shadow-paper space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-paper font-bold text-sm">
                  <Grid className="h-4 w-4 text-marker" />
                </div>
                <h4 className="font-display text-xl font-bold text-ink">
                  Grid &amp; Typesetting Hierarchy
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">
                Designed with a 2-column grid system optimized for middle-school readability. Custom margins account for inner binding gutting and outer margins for marginal note callouts.
              </p>
              <ul className="space-y-2 text-xs text-ink-soft">
                <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                  <span className="font-bold text-ink">Grid Columns:</span>
                  <span>2 Equal Columns with 4.2mm Gutter</span>
                </li>
                <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                  <span className="font-bold text-ink">Heading Font:</span>
                  <span>Custom Display Serif (Bold, 24pt/28pt)</span>
                </li>
                <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                  <span className="font-bold text-ink">Body Typography:</span>
                  <span>High-Legibility Serif (11pt / 14pt leading)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-bold text-ink">Header / Folio:</span>
                  <span>Custom Ornament Banner (Chapter Head-1.eps)</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-ink/15 bg-paper p-6 shadow-paper space-y-4">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-marker text-ink font-bold text-sm">
                  <Palette className="h-4 w-4" />
                </div>
                <h4 className="font-display text-xl font-bold text-ink">
                  CMYK Color System &amp; Preflight
                </h4>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">
                Engineered for offset printing machines with strict CMYK color separations, zero RGB oversights, and preflight validation.
              </p>
              <ul className="space-y-2 text-xs text-ink-soft">
                <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                  <span className="font-bold text-ink">Primary Text Ink:</span>
                  <span>100% K Black (Overprint Enabled)</span>
                </li>
                <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                  <span className="font-bold text-ink">Heat Zones Color Scheme:</span>
                  <span>Process Yellow, Warm Amber, Process Cyan</span>
                </li>
                <li className="flex items-center justify-between border-b border-ink/10 pb-1.5">
                  <span className="font-bold text-ink">Bleed &amp; Safety:</span>
                  <span>3mm Bleed Marks + Crop Guides</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-bold text-ink">Preflight Status:</span>
                  <span className="font-bold text-green-700">0 Errors &bull; PDF/X-1a Ready</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Chapter Spreads Breakdown */}
          <div className="mb-16 space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-marker uppercase tracking-widest">
                Editorial Structure
              </span>
              <h3 className="font-display text-3xl font-bold text-ink mt-1">
                15-Page Chapter Spreads Breakdown
              </h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CHAPTER_SPREADS.map((spread, idx) => (
                <div
                  key={spread.id}
                  className="rounded-xl border border-ink/15 bg-paper-deep p-6 shadow-notebook flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-ink/10 pb-2 mb-3">
                      <span className="font-display text-base font-bold text-marker-deep">
                        Spread 0{idx + 1}
                      </span>
                      <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-bold text-ink border border-ink/10">
                        {spread.pages}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-ink">{spread.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                      {spread.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink/10 flex flex-wrap gap-1.5">
                    {spread.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="rounded bg-paper px-2 py-0.5 text-[10px] font-bold text-ink-soft border border-ink/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Study Chapter Component */}
          <Reveal>
            <div className="mb-16 rounded-2xl border border-ink/15 bg-paper p-6 shadow-notebook sm:p-8">
              <div className="mb-6 border-b border-ink/10 pb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-bold text-paper">
                  <Globe className="h-3.5 w-3.5 text-marker" />
                  Interactive Digital LMS &amp; Study Version
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                  Digital Classroom Edition: Interactive Reader &amp; Quiz
                </h3>
              </div>

              <SocialScienceChapter />
            </div>
          </Reveal>

          {/* Client Deliverables & File Package Card */}
          <div className="rounded-2xl border-2 border-ink/15 bg-paper-deep p-8 shadow-notebook">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-marker">
                  Complete DTP Source Package
                </span>
                <h3 className="font-display text-2xl font-bold text-ink mt-1">
                  Social Science Chap-1 Package
                </h3>
                <p className="mt-2 text-sm text-ink-soft max-w-xl">
                  Includes InDesign Master (.indd), Interchange (.idml), 42 High-Res EPS Vectors, Document Fonts library, and Print-Ready 300 DPI CMYK PDF.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/documents/social-science-chap-1.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-marker px-6 py-3 text-sm font-bold text-ink shadow-md hover:scale-105 transition-transform"
                >
                  <Download className="h-4 w-4" />
                  Download PDF (6 MB)
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}

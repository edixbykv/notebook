import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  path: "/portfolio",
  description:
    "Real businesses, real results. Browse KVai Solutions' portfolio of websites, AI automations, and social media growth case studies — with before & after numbers.",
  keywords: ["case studies", "portfolio", "client results"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Our work"
        title="A notebook full of results"
        description="Every project here started as a sketch on the page — and ended with measurable business growth. Filter by what you're looking for."
        crumbs={crumbs}
      />
      <PortfolioGrid />
      <FinalCtaSection />
    </>
  );
}

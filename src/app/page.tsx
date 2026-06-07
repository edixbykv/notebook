import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { Hero } from "@/components/sections/hero";
import { BrandStrip } from "@/components/sections/brand-strip";
import { ProblemSection } from "@/components/sections/problem-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyKvaiSection } from "@/components/sections/why-kvai-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const metadata: Metadata = buildMetadata({
  path: "/",
  description:
    "KVAI Solutions is your AI-powered business growth partner. We build mobile-first websites, drive social media growth, and deploy AI automation to help your business grow faster. Book a free consultation.",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />
      <Hero />
      <BrandStrip />
      <ProblemSection />
      <ServicesSection />
      <WhyKvaiSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}

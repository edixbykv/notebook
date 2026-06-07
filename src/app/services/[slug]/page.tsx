import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { services, processSteps } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
} from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { StickyNote } from "@/components/notebook/sticky-note";
import { Highlight } from "@/components/notebook/highlight";
import { Button } from "@/components/ui/button";
import { Accordion as FaqAccordion } from "@/components/notebook/accordion";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

type Params = { params: Promise<{ slug: string }> };

const extraContent: Record<
  string,
  { faqs: { q: string; a: string }[]; deliverables: string[] }
> = {
  "website-development": {
    deliverables: [
      "Custom design & development",
      "Mobile + tablet + desktop layouts",
      "SEO-ready pages & structured data",
      "Contact forms & lead capture",
      "Analytics & tracking setup",
      "Speed optimisation",
    ],
    faqs: [
      {
        q: "What platform do you build on?",
        a: "We build fast, modern sites on Next.js and React for performance and SEO, with easy-to-manage content. For simpler needs we can also work with the right no-code or CMS platform.",
      },
      {
        q: "Will my website rank on Google?",
        a: "We build SEO in from the ground up — fast load times, clean structure, structured data and on-page optimisation. Combined with a content plan, that's what consistently earns rankings.",
      },
      {
        q: "Do you offer maintenance?",
        a: "Yes. We offer care plans covering updates, security, backups and small changes so your site stays fast and current.",
      },
    ],
  },
  "social-media-growth": {
    deliverables: [
      "Content strategy & calendar",
      "Short-form video direction",
      "AI-assisted content production",
      "Profile & bio optimisation",
      "Community engagement systems",
      "Monthly performance reports",
    ],
    faqs: [
      {
        q: "Which platforms do you cover?",
        a: "We focus on where your customers actually are — usually Instagram, YouTube Shorts, LinkedIn and Facebook — rather than spreading thin across everything.",
      },
      {
        q: "Do you create the content too?",
        a: "Yes. We handle strategy, scripting, and production direction, using AI to speed up output while keeping your brand voice authentically human.",
      },
      {
        q: "How soon will I see results?",
        a: "Engagement usually improves within the first month; meaningful audience and lead growth typically compounds over 3–6 months of consistent execution.",
      },
    ],
  },
  "ai-automation": {
    deliverables: [
      "Workflow & process audit",
      "AI chatbot / lead qualifier",
      "CRM & tool integrations",
      "Automated follow-ups & reminders",
      "Custom AI agent workflows",
      "Team training & handover",
    ],
    faqs: [
      {
        q: "Is this going to replace my staff?",
        a: "No — that's our core principle. We automate repetitive busywork so your team can focus on judgement, creativity and relationships. AI empowers people; it doesn't replace them.",
      },
      {
        q: "What tools do you integrate with?",
        a: "We work with the tools you already use — popular CRMs, email, calendars, spreadsheets, WhatsApp and more — plus custom GPT-based workflows where they add real value.",
      },
      {
        q: "Is my data safe?",
        a: "Absolutely. We follow least-privilege access, use reputable providers, and keep you fully in control of your data and the automations we build.",
      },
    ],
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return buildMetadata({ title: "Service not found" });
  return buildMetadata({
    title: service.title,
    path: `/services/${service.slug}`,
    description: service.description,
    keywords: [service.title, service.short],
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const extra = extraContent[service.slug];
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            title: service.title,
            description: service.description,
            slug: service.slug,
          }),
          faqSchema(extra.faqs),
        ]}
      />

      <PageHero
        eyebrow={`Service ${service.number}`}
        title={service.title}
        description={service.description}
        crumbs={crumbs}
      >
        <Button href="/contact" size="lg">
          {service.cta} <ArrowRight className="h-4 w-4" />
        </Button>
      </PageHero>

      {/* benefits */}
      <Section className="bg-paper">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The outcome"
              title={
                <>
                  What you actually <Highlight>get</Highlight>
                </>
              }
              description="Forget features for a second — here's the real-world impact on your business."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={i * 0.08}>
                <StickyNote
                  color={i === 1 ? "red" : i === 2 ? "ink" : "yellow"}
                  rotate={i % 2 === 0 ? "-2deg" : "2deg"}
                  className="h-full"
                >
                  <Sparkles
                    className={
                      i === 2 ? "h-6 w-6 text-sticky" : "h-6 w-6 text-marker-deep"
                    }
                  />
                  <p
                    className={`mt-3 font-display text-xl font-bold leading-tight ${
                      i === 2 ? "text-paper" : "text-ink"
                    }`}
                  >
                    {benefit}
                  </p>
                </StickyNote>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* deliverables */}
      <Section ruled className="ruled-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="What's included"
                title="Everything in the package"
                description="A clear scope, no surprises. Here's what we deliver."
              />
              <div className="mt-6">
                <Button href="/contact" variant="ink">
                  Get a custom quote
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {extra.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2.5 rounded-lg bg-paper p-4 text-sm shadow-paper"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-marker"
                      strokeWidth={3}
                    />
                    <span className="font-medium text-ink">{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* process recap */}
      <Section className="bg-paper-deep">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we'll work"
              title="A simple path to launch"
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08}>
                <div className="h-full rounded-lg bg-paper p-5 shadow-paper">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-ink bg-sticky font-marker text-xl">
                    {step.number}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* faq */}
      <Section className="bg-paper">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Good to know"
              title={`${service.title} — your questions`}
            />
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-paper-deep p-2 sm:p-6">
            <FaqAccordion items={extra.faqs} />
          </div>
        </Container>
      </Section>

      {/* related services */}
      <Section ruled className="ruled-paper">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Keep exploring" title="Other services" />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between rounded-lg bg-paper p-6 shadow-paper transition-all hover:-translate-y-1 hover:shadow-paper-lift"
                >
                  <div>
                    <span className="font-marker text-2xl text-marker">
                      {s.number}
                    </span>
                    <h3 className="font-display text-xl font-bold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{s.short}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-ink/40 transition-all group-hover:translate-x-1 group-hover:text-marker" />
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}

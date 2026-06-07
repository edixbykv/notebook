import type { Metadata } from "next";
import { Target, Heart, Zap, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { StickyNote } from "@/components/notebook/sticky-note";
import { Highlight, Underlined } from "@/components/notebook/highlight";
import { GrowthChart } from "@/components/notebook/doodles";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const metadata: Metadata = buildMetadata({
  title: "About",
  path: "/about",
  description:
    "KVAI Solutions is an AI-powered business growth partner built on one belief: AI should empower people, not replace them. Learn our story, mission, and values.",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const values = [
  {
    icon: Heart,
    title: "Human + AI",
    text: "We use AI to amplify people, never to replace them. Technology serves the human, not the other way around.",
  },
  {
    icon: Target,
    title: "Results over noise",
    text: "We measure success by your growth — leads, revenue, time saved — not vanity metrics or buzzwords.",
  },
  {
    icon: Zap,
    title: "Move fast, with care",
    text: "We ship quickly and iterate, but we never cut corners on quality, accessibility, or craft.",
  },
  {
    icon: Users,
    title: "True partnership",
    text: "We're an extension of your team. Your wins are our wins, and we're in it for the long game.",
  },
];

const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "15hrs", label: "Saved / week avg" },
  { value: "2×", label: "Avg lead growth" },
  { value: "100%", label: "Founder-led" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="About KVAI"
        title={
          <>
            We help businesses grow — the{" "}
            <span className="text-marker">human + AI</span> way
          </>
        }
        description="KVAI Solutions was founded on a simple, slightly contrarian belief: in a world racing to replace people with AI, the real winners will be the ones who use AI to make their people unstoppable."
        crumbs={crumbs}
      />

      {/* story */}
      <Section className="bg-paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Our story"
                title={
                  <>
                    Built to make growth{" "}
                    <Underlined color="#E53935">feel simple</Underlined>
                  </>
                }
              />
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
                <p>
                  Most business owners we meet aren&apos;t short on ideas —
                  they&apos;re short on time, clarity, and the right systems.
                  They know they should be online, automating, and growing.
                  They just don&apos;t have a partner who makes it happen.
                </p>
                <p>
                  So we built one. KVAI Solutions blends{" "}
                  <Highlight>strategy, design, and AI</Highlight> into a single
                  growth partner — the kind that treats your business like a
                  notebook full of possibilities, and then actually executes on
                  them.
                </p>
                <p>
                  Our principle keeps us honest:{" "}
                  <strong className="text-ink">
                    AI should empower people, not replace them.
                  </strong>{" "}
                  Every website, automation, and campaign we build is designed
                  to give you and your team more leverage — not less control.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mx-auto max-w-sm">
                <StickyNote color="yellow" rotate="-3deg" className="mb-4">
                  <p className="font-hand text-2xl font-bold leading-tight">
                    Mission
                  </p>
                  <p className="mt-1 text-sm text-ink/80">
                    Make world-class growth tools accessible to every
                    ambitious business.
                  </p>
                </StickyNote>
                <div className="rounded-lg bg-paper-deep p-5 shadow-paper">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-hand text-lg font-bold">
                      Growth, our way
                    </span>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                      up & to the right
                    </span>
                  </div>
                  <GrowthChart className="h-28 w-full" draw={false} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* stats */}
      <Section ruled className="ruled-paper py-14">
        <Container>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div className="rounded-lg bg-paper p-6 text-center shadow-paper">
                  <div className="font-display text-4xl font-bold text-marker">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-ink-soft">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* values */}
      <Section className="bg-paper-deep">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we stand for"
              title={
                <>
                  Our <Highlight>values</Highlight>
                </>
              }
              description="The principles scribbled in the margins of everything we do."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={i * 0.08}>
                  <div className="flex h-full gap-4 rounded-lg bg-paper p-6 shadow-paper">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink text-paper">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink">
                        {value.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                        {value.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-ink p-8 text-center text-paper shadow-paper-lift">
              <p className="font-hand text-3xl font-bold text-sticky">
                &ldquo;{siteConfig.principle}&rdquo;
              </p>
              <p className="mt-3 text-sm text-paper/70">
                The line we keep coming back to.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}

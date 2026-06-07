"use client";

import { processSteps } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { Circled } from "@/components/notebook/highlight";
import { useDrawPaths } from "@/hooks/use-gsap";
import { ArrowRightCurve, HandArrow } from "@/components/notebook/doodles";

export function ProcessSection() {
  const ref = useDrawPaths<HTMLDivElement>({ stagger: 0.3 });

  return (
    <Section ruled className="ruled-paper">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                A simple, proven <Circled color="#1E88E5">4-step</Circled> path
              </>
            }
            description="No mystery, no jargon. Here's exactly how we take you from where you are to where you want to be."
          />
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div className="grid gap-8 md:grid-cols-4 md:gap-4">
            {processSteps.map((step, i) => (
              <div key={step.number} className="relative">
                <Reveal delay={i * 0.1}>
                  <div className="relative z-10 h-full rounded-lg bg-paper p-6 text-center shadow-paper md:text-left">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink bg-sticky font-marker text-2xl text-ink md:mx-0">
                      {step.number}
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </Reveal>

                {/* connecting arrow (desktop) */}
                {i < processSteps.length - 1 && (
                  <ArrowRightCurve
                    color="#E53935"
                    className="absolute -right-3 top-7 z-20 hidden h-10 w-16 md:block"
                  />
                )}
                {/* connecting arrow (mobile, vertical-ish) */}
                {i < processSteps.length - 1 && (
                  <HandArrow
                    color="#E53935"
                    className="mx-auto my-2 h-12 w-12 md:hidden"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

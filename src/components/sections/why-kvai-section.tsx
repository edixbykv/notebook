"use client";

import {
  Smartphone,
  Search,
  Workflow,
  TrendingUp,
  HeartHandshake,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import { whyKvai } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/notebook/reveal";
import { Underlined } from "@/components/notebook/highlight";

const icons: LucideIcon[] = [
  Smartphone,
  Search,
  Workflow,
  TrendingUp,
  HeartHandshake,
  Cpu,
];

export function WhyKvaiSection() {
  return (
    <Section className="bg-paper-deep">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                eyebrow="Why KVai"
                title={
                  <>
                    Built for{" "}
                    <Underlined color="#E53935">real growth</Underlined>, not
                    vanity metrics
                  </>
                }
                description="We're not just another agency churning out templates. Every decision is measured against one question: will this move your business forward?"
              />
              <div className="mt-6 rounded-lg border-l-4 border-marker bg-paper p-5 shadow-paper">
                <p className="font-hand text-2xl font-bold leading-snug text-ink">
                  &ldquo;AI should empower people, not replace them.&rdquo;
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  — Our founding principle
                </p>
              </div>
            </div>
          </Reveal>

          <RevealStagger className="grid gap-4 sm:grid-cols-2">
            {whyKvai.map((item, i) => {
              const Icon = icons[i];
              return (
                <RevealItem key={item.title}>
                  <div className="group h-full rounded-lg bg-paper p-6 shadow-paper transition-all duration-300 hover:-translate-y-1 hover:shadow-paper-lift">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-paper transition-colors group-hover:bg-marker">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </Container>
    </Section>
  );
}

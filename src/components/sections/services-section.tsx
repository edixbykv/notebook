"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { Highlight } from "@/components/notebook/highlight";
import { cn } from "@/lib/utils";

const colorMap = {
  sticky: "sticky-note",
  marker: "sticky-note sticky-note--red",
  ink: "sticky-note sticky-note--ink",
} as const;

export function ServicesSection() {
  return (
    <Section ruled id="services" className="ruled-paper">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Three ways we help you <Highlight>grow</Highlight>
              </>
            }
            description="Pinned to the board and ready to go. Pick one — or combine all three for compounding results."
          />
        </Reveal>

        <div className="mt-11 grid gap-7 md:grid-cols-3 md:gap-6 lg:gap-7">
          {services.map((service, i) => {
            const isInk = service.color === "ink";
            return (
              <Reveal key={service.slug} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, rotate: 0 }}
                  style={{ rotate: service.rotate }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "relative flex h-full flex-col rounded-[3px] p-6 sm:p-7",
                    colorMap[service.color],
                    "shadow-sticky"
                  )}
                >
                  <span className="pin-dot" aria-hidden="true" />

                  <span
                    className={cn(
                      "font-marker text-4xl",
                      isInk ? "text-sticky" : "text-marker"
                    )}
                  >
                    {service.number}
                  </span>
                  <h3
                    className={cn(
                      "mt-2 font-display text-2xl font-bold leading-tight",
                      isInk ? "text-paper" : "text-ink"
                    )}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 font-hand text-xl font-bold",
                      isInk ? "text-sticky" : "text-marker-deep"
                    )}
                  >
                    {service.tagline}
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      isInk ? "text-paper/85" : "text-ink/80"
                    )}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.features.slice(0, 4).map((f) => (
                      <li
                        key={f}
                        className={cn(
                          "flex items-start gap-2 text-sm",
                          isInk ? "text-paper/90" : "text-ink/85"
                        )}
                      >
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            isInk ? "text-sticky" : "text-marker"
                          )}
                          strokeWidth={3}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className={cn(
                      "group mt-6 inline-flex items-center gap-1.5 self-start rounded-full px-4 py-2 text-sm font-bold transition-all",
                      isInk
                        ? "bg-sticky text-ink hover:gap-2.5"
                        : "bg-ink text-paper hover:gap-2.5"
                    )}
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

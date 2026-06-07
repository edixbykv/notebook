"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { Highlight } from "@/components/notebook/highlight";
import { cn } from "@/lib/utils";

function renderQuote(quote: string, highlight: string) {
  const idx = quote.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx === -1) return quote;
  return (
    <>
      {quote.slice(0, idx)}
      <Highlight>{quote.slice(idx, idx + highlight.length)}</Highlight>
      {quote.slice(idx + highlight.length)}
    </>
  );
}

export function TestimonialsSection() {
  const rotations = ["-1.5deg", "1deg", "-0.5deg"];
  return (
    <Section className="bg-paper-deep">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Kind words"
            title={
              <>
                Businesses that <Highlight>grew with us</Highlight>
              </>
            }
            description="Don't just take our word for it — here's what our clients have to say."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotations[i] }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ rotate: 0, y: -4 }}
              className={cn(
                "relative flex h-full flex-col rounded-lg bg-paper p-6 shadow-paper",
                "before:absolute before:-top-2.5 before:left-1/2 before:h-5 before:w-20 before:-translate-x-1/2 before:rotate-[-3deg] before:bg-sticky/60 before:shadow-sm"
              )}
            >
              <Quote className="h-7 w-7 text-marker/30" />
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-sticky-deep text-sticky-deep"
                  />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-ink">
                &ldquo;{renderQuote(t.quote, t.highlight)}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-dashed border-ink/15 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-marker text-base text-paper">
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-ink">
                    {t.name}
                  </div>
                  <div className="text-xs text-ink-soft">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

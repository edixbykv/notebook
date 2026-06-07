"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { problems } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal, RevealStagger, RevealItem } from "@/components/notebook/reveal";
import { Circled } from "@/components/notebook/highlight";
import { HandArrow } from "@/components/notebook/doodles";

export function ProblemSection() {
  return (
    <Section className="bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Sound familiar?"
            title={
              <>
                Growing a business today is{" "}
                <Circled color="#E53935">harder</Circled> than ever
              </>
            }
            description="Most businesses aren't failing because of bad products. They're stuck because of these five very common, very fixable problems."
          />
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, i) => (
            <RevealItem key={problem.title}>
              <motion.div
                whileHover={{ y: -4, rotate: i % 2 === 0 ? -1 : 1 }}
                className="group relative h-full rounded-lg border-2 border-dashed border-ink/20 bg-paper p-6 transition-colors hover:border-marker/40"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-marker/10 text-marker transition-colors group-hover:bg-marker group-hover:text-paper">
                  <X className="h-5 w-5" strokeWidth={3} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  <span className="line-through decoration-marker/60 decoration-2">
                    {problem.title}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {problem.note}
                </p>
              </motion.div>
            </RevealItem>
          ))}

          {/* the "answer" card */}
          <RevealItem>
            <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-lg bg-ink p-6 text-paper">
              <HandArrow
                color="#FFF176"
                className="absolute -right-1 -top-1 h-14 w-14 rotate-[200deg]"
                draw={false}
              />
              <p className="font-hand text-2xl font-bold text-sticky">
                The good news?
              </p>
              <p className="mt-1 font-display text-2xl font-semibold leading-tight">
                Every one of these is solvable with the right partner.
              </p>
              <p className="mt-3 text-sm text-paper/70">
                That&apos;s exactly what we do at KVAI Solutions.
              </p>
            </div>
          </RevealItem>
        </RevealStagger>
      </Container>
    </Section>
  );
}

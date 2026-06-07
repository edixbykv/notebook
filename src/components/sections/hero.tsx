"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Underlined } from "@/components/notebook/highlight";
import { StickyNote } from "@/components/notebook/sticky-note";
import {
  HandArrow,
  LoopArrow,
  StarDoodle,
  GrowthChart,
  ScribbleDot,
} from "@/components/notebook/doodles";
import { siteConfig } from "@/lib/site";

/** stagger delay for the CSS `.reveal-load` entrance */
const style = (d: number): React.CSSProperties =>
  ({ ["--d" as string]: `${d}ms` }) as React.CSSProperties;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden ruled-paper grain pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-44">
      {/* notebook spiral binding down the left edge */}
      <div className="spiral-binding pointer-events-none absolute inset-y-0 left-1 hidden w-3 opacity-60 sm:block" />
      {/* decorative doodles */}
      <StarDoodle
        color="#E53935"
        className="absolute left-[6%] top-32 hidden h-9 w-9 animate-float sm:block"
        draw={false}
      />
      <LoopArrow
        color="#111111"
        className="animate-sway absolute right-[4%] top-28 hidden h-24 w-24 opacity-80 lg:block"
        draw={false}
      />
      <ScribbleDot
        color="#1E88E5"
        className="absolute bottom-24 left-[10%] hidden h-7 w-7 animate-float-slow lg:block"
        draw={false}
      />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left: copy — CSS entrances so the LCP headline paints at FCP,
              not after JS hydration */}
          <div className="relative">
            <span
              style={style(0)}
              className="reveal-load inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-paper px-4 py-1.5 text-sm font-bold text-ink shadow-paper"
            >
              <Sparkles className="h-4 w-4 text-marker" />
              {siteConfig.tagline}
            </span>

            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink text-balance sm:text-6xl lg:text-7xl">
              <span style={style(80)} className="reveal-load block">
                Your competitors
              </span>
              <span style={style(180)} className="reveal-load block">
                are using{" "}
                <Underlined color="#E53935" delay={0.8}>
                  AI.
                </Underlined>
              </span>
              <span
                style={style(300)}
                className="reveal-load mt-1 block font-marker text-marker"
              >
                Are you?
              </span>
            </h1>

            <p
              style={style(440)}
              className="reveal-load mt-6 max-w-xl text-lg leading-relaxed text-ink-soft text-pretty"
            >
              We help businesses grow faster with{" "}
              <span className="font-semibold text-ink">
                AI, websites, marketing, and automation
              </span>{" "}
              — combining human creativity with intelligent technology.
            </p>

            <div
              style={style(560)}
              className="reveal-load mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="/contact" size="lg" className="cta-pulse">
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View Our Work
              </Button>
            </div>

            <div
              style={style(680)}
              className="reveal-load mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft"
            >
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-1.5 font-bold text-ink transition-colors hover:text-marker"
              >
                <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
              </a>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-600" />
                Booking projects for {new Date().getFullYear()}
              </span>
            </div>
          </div>

          {/* right: notebook collage */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto hidden h-full w-full max-w-md lg:block"
          >
            <div className="relative">
              <StickyNote
                color="yellow"
                rotate="-4deg"
                float
                className="absolute left-0 top-0 w-56"
                pin="pin"
              >
                <p className="font-hand text-2xl font-bold leading-tight text-ink">
                  Idea → Website
                </p>
                <p className="mt-1 text-sm text-ink/70">
                  Launch in 2–4 weeks
                </p>
              </StickyNote>

              <StickyNote
                color="red"
                rotate="5deg"
                float
                className="absolute right-0 top-16 w-52"
                pin="tape"
              >
                <p className="font-hand text-2xl font-bold leading-tight text-ink">
                  + AI Automation
                </p>
                <p className="mt-1 text-sm text-ink/80">
                  Save 15 hrs / week
                </p>
              </StickyNote>

              <div className="absolute left-6 top-52 w-64 rotate-[-2deg] rounded-lg bg-paper p-5 shadow-paper-lift">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-hand text-lg font-bold text-ink">
                    Growth plan
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                    +112%
                  </span>
                </div>
                <GrowthChart className="h-24 w-full" draw={false} />
              </div>

              <HandArrow
                color="#E53935"
                className="animate-bob absolute -right-2 top-44 h-16 w-16"
                draw={false}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* mobile collage */}
      <div className="container mt-10 flex gap-3 overflow-x-auto pb-2 hide-scrollbar lg:hidden">
        <StickyNote color="yellow" rotate="-2deg" className="w-44 shrink-0">
          <p className="font-hand text-xl font-bold leading-tight">
            Idea → Website
          </p>
          <p className="mt-1 text-xs text-ink/70">Launch in 2–4 weeks</p>
        </StickyNote>
        <StickyNote color="red" rotate="2deg" className="w-44 shrink-0">
          <p className="font-hand text-xl font-bold leading-tight">
            + AI Automation
          </p>
          <p className="mt-1 text-xs text-ink/80">Save 15 hrs / week</p>
        </StickyNote>
        <StickyNote color="ink" rotate="-1deg" className="w-44 shrink-0">
          <p className="font-hand text-xl font-bold leading-tight">
            + Social Growth
          </p>
          <p className="mt-1 text-xs text-paper/80">Real leads, monthly</p>
        </StickyNote>
      </div>
    </section>
  );
}

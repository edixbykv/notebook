"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Underlined } from "@/components/notebook/highlight";
import { StarDoodle, ScribbleDot } from "@/components/notebook/doodles";
import { HeroMacbook } from "@/components/sections/hero-macbook";
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

          {/* right: MacBook with a live CRM dashboard loop */}
          <HeroMacbook className="mx-auto hidden w-full max-w-md lg:block" />
        </div>

        {/* mobile MacBook */}
        <HeroMacbook className="mx-auto mt-10 w-full max-w-sm lg:hidden" />
      </div>
    </section>
  );
}

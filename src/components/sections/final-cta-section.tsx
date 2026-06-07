"use client";

import { motion } from "framer-motion";
import { Phone, Globe, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/notebook/section";
import { Button } from "@/components/ui/button";
import {
  StarDoodle,
  LoopArrow,
  HandArrow,
} from "@/components/notebook/doodles";
import { Underlined } from "@/components/notebook/highlight";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
      {/* faint ruled lines on dark */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 31px, #fff 31px, #fff 32px)",
        }}
      />
      <StarDoodle
        color="#FFF176"
        className="absolute left-[8%] top-16 hidden h-10 w-10 animate-float sm:block"
        draw={false}
      />
      <LoopArrow
        color="#E53935"
        className="animate-sway absolute right-[6%] top-12 hidden h-24 w-24 lg:block"
        draw={false}
      />

      <Container className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-hand text-2xl font-bold text-sticky"
        >
          Your competitors won&apos;t wait. Neither should you.
        </motion.p>

        <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Ready to{" "}
          <Underlined color="#E53935">grow your business?</Underlined>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-paper/75">
          Let&apos;s build something extraordinary. Book your free
          consultation and get a clear, no-pressure growth plan.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/contact" variant="primary" size="lg" className="cta-pulse">
            Book Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href={siteConfig.phoneHref} variant="sticky" size="lg">
            <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-paper/70">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 transition-colors hover:text-sticky"
          >
            <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
          </a>
          <a
            href={siteConfig.url}
            className="flex items-center gap-2 transition-colors hover:text-sticky"
          >
            <Globe className="h-4 w-4" /> kvai.in
          </a>
        </div>

        <HandArrow
          color="#FFF176"
          className="mx-auto mt-6 h-12 w-12 rotate-[200deg] opacity-80"
          draw={false}
        />
      </Container>
    </section>
  );
}

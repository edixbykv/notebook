"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, Clock, Search, Users } from "lucide-react";
import { Container } from "@/components/notebook/section";

const stats = [
  { icon: TrendingUp, value: "2×", label: "avg. lead growth" },
  { icon: Clock, value: "15 hrs", label: "saved / week" },
  { icon: Search, value: "98", label: "avg. SEO score" },
  { icon: Users, value: "50+", label: "projects shipped" },
];

export function BrandStrip() {
  return (
    <section
      aria-label="KVAI Solutions results at a glance"
      className="relative border-y border-dashed border-ink/15 bg-paper-deep py-7"
    >
      <Container>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          {/* trust line */}
          <div className="flex items-center gap-3 text-center lg:text-left">
            <div className="flex -space-x-2">
              {["RM", "PS", "AV", "SR"].map((n, i) => (
                <span
                  key={n}
                  style={{ zIndex: 10 - i }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper bg-ink font-marker text-xs text-paper"
                >
                  {n}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-3.5 w-3.5 fill-marker text-marker"
                  />
                ))}
                <span className="ml-1 text-sm font-bold text-ink">
                  Loved by founders
                </span>
              </div>
              <p className="text-xs text-ink-soft">
                Real businesses growing with <strong>KVAI Solutions</strong>
              </p>
            </div>
          </div>

          {/* stats */}
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:w-auto lg:gap-x-9">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-2.5"
                >
                  <Icon className="h-5 w-5 shrink-0 text-marker" />
                  <div className="leading-none">
                    <div className="font-display text-xl font-bold text-ink">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-xs text-ink-soft">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

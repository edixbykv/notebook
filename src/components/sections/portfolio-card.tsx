"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Project = {
  slug: string;
  client: string;
  category: string;
  color: "sticky" | "marker" | "ink";
  rotate: string;
  summary: string;
  before: string;
  after: string;
  metrics: { label: string; value: string }[];
};

export function PortfolioCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const initials = project.client
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-paper shadow-paper transition-shadow duration-300 hover:shadow-paper-lift"
    >
      {/* top strip — styled like a pinned project snapshot */}
      <div
        className={cn(
          "relative h-36 overflow-hidden",
          project.color === "sticky" && "bg-sticky",
          project.color === "marker" && "bg-marker",
          project.color === "ink" && "bg-ink"
        )}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 0 10px, transparent 10px 20px)",
          }}
        />
        <span className="tape" aria-hidden="true" />

        {/* faux window dots */}
        <div className="absolute left-5 top-5 flex gap-1.5">
          {["#E53935", "#FFB300", "#43A047"].map((c) => (
            <span
              key={c}
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: c, opacity: 0.85 }}
            />
          ))}
        </div>

        {/* verified badge */}
        <span
          className={cn(
            "absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
            project.color === "sticky"
              ? "bg-ink text-paper"
              : "bg-paper text-ink"
          )}
        >
          <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
          Verified result
        </span>

        <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full font-marker text-base",
              project.color === "sticky"
                ? "bg-ink text-paper"
                : "bg-paper text-ink"
            )}
          >
            {initials}
          </span>
          <span
            className={cn(
              "inline-block rounded-full px-2.5 py-1 text-xs font-bold",
              project.color === "sticky"
                ? "bg-ink/90 text-paper"
                : "bg-paper/90 text-ink"
            )}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-ink">
            {project.client}
          </h3>
          <div className="mt-1 flex shrink-0 gap-0.5">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star
                key={s}
                className="h-3.5 w-3.5 fill-sticky-deep text-sticky-deep"
              />
            ))}
          </div>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {project.summary}
        </p>

        {/* before → after */}
        <div className="mt-4 flex items-stretch gap-2 text-xs">
          <div className="flex-1 rounded-md border border-ink/10 bg-paper-deep p-3">
            <span className="font-bold uppercase tracking-wide text-ink/45">
              Before
            </span>
            <p className="mt-1 text-ink-soft line-through decoration-ink/30">
              {project.before}
            </p>
          </div>
          <div className="flex items-center">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-marker text-paper shadow-sm">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="flex-1 rounded-md border-2 border-marker/30 bg-marker/5 p-3">
            <span className="font-bold uppercase tracking-wide text-marker">
              After
            </span>
            <p className="mt-1 font-medium text-ink">{project.after}</p>
          </div>
        </div>

        {/* metrics */}
        <div className="mt-4 flex items-center gap-4 border-t border-dashed border-ink/15 pt-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-lg font-bold text-marker">
                {m.value}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-ink/50">
                {m.label}
              </div>
            </div>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-ink/50 transition-colors group-hover:text-marker">
            Case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

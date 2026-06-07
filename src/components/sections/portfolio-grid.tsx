"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { PortfolioCard } from "./portfolio-card";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Website Development",
  "AI Automation",
  "Social Media Growth",
];

export function PortfolioGrid() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === active);

  return (
    <Section className="bg-paper">
      <Container>
        {/* filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full border-2 px-4 py-2 text-sm font-bold transition-all",
                active === cat
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 bg-paper text-ink hover:border-ink/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <PortfolioCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}

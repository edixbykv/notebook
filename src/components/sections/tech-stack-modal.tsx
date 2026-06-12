"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Cloud,
  Database,
  FileText,
  LayoutTemplate,
  Lock,
  PlayCircle,
  Search,
  Server,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import type { PortfolioItem, TechGroup } from "@/lib/site";
import { cn } from "@/lib/utils";

const GROUP_ICON: Record<TechGroup["icon"], LucideIcon> = {
  frontend: LayoutTemplate,
  motion: Sparkles,
  backend: Server,
  database: Database,
  auth: Lock,
  mobile: Smartphone,
  commerce: ShoppingCart,
  video: PlayCircle,
  search: Search,
  booking: CalendarCheck,
  seo: TrendingUp,
  content: FileText,
  infra: Cloud,
  tooling: Wrench,
};

export function TechStackModal({
  project,
  onClose,
}: {
  project: PortfolioItem | null;
  onClose: () => void;
}) {
  // Lock body scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {project && project.tech && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <button
            aria-label="Close technical details"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-ink/40 backdrop-blur-sm"
          />

          {/* paper sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.client} — tech stack & architecture`}
            initial={{ y: 60, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="paper-card relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-ink/10 bg-paper shadow-2xl sm:rounded-3xl"
          >
            {/* spiral binding strip */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-around px-6 pt-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-ink/10 ring-1 ring-ink/15" />
              ))}
            </div>

            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-dashed border-ink/15 px-6 pb-4 pt-7">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-marker">
                  {project.category}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  {project.client}
                </h3>
                <p className="font-hand text-xl text-ink-soft">Under the hood</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full border border-ink/15 bg-paper p-2 text-ink-soft transition-colors hover:bg-ink hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* scroll body */}
            <div className="overflow-y-auto px-6 py-5">
              {/* architecture blurb */}
              <p className="text-sm leading-relaxed text-ink-soft">
                {project.tech.architecture}
              </p>

              {/* architecture flow */}
              <div className="mt-5">
                <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-ink">
                  Architecture
                </h4>
                <div className="flex flex-wrap items-center gap-y-2">
                  {project.tech.flow.map((node, i) => (
                    <motion.div
                      key={node}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="flex items-center"
                    >
                      <span className="whitespace-nowrap rounded-lg border border-ink/15 bg-sticky/60 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm">
                        {node}
                      </span>
                      {i < project.tech!.flow.length - 1 && (
                        <ArrowUpRight className="mx-1 h-4 w-4 rotate-45 text-marker" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* stack groups */}
              <div className="mt-6">
                <h4 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-ink">
                  Full Tech Stack
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.tech.stack.map((group, gi) => {
                    const Icon = GROUP_ICON[group.icon];
                    return (
                      <motion.div
                        key={group.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + gi * 0.06 }}
                        className="rounded-2xl border border-ink/10 bg-white/50 p-4"
                      >
                        <div className="mb-2.5 flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-marker/10 text-marker">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="font-display text-sm font-bold text-ink">
                            {group.title}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item, ii) => (
                            <motion.span
                              key={item}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.25 + gi * 0.06 + ii * 0.04 }}
                              className="rounded-full border border-ink/12 bg-paper px-2.5 py-1 text-xs font-medium text-ink-soft"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* footer */}
            <div className="border-t border-dashed border-ink/15 px-6 py-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-marker"
                )}
              >
                Visit the live {project.client} site
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

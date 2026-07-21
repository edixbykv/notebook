"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, ExternalLink } from "lucide-react";
import { GraphicItem } from "@/data/graphic-items";

export function GraphicLightboxModal({
  item,
  items,
  onClose,
  onSelect,
}: {
  item: GraphicItem | null;
  items: GraphicItem[];
  onClose: () => void;
  onSelect: (item: GraphicItem) => void;
}) {
  const currentIndex = item ? items.findIndex((i) => i.slug === item.slug) : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else {
      onSelect(items[items.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    } else {
      onSelect(items[0]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          onSelect(items[currentIndex - 1]);
        } else {
          onSelect(items[items.length - 1]);
        }
      }
      if (e.key === "ArrowRight") {
        if (currentIndex >= 0 && currentIndex < items.length - 1) {
          onSelect(items[currentIndex + 1]);
        } else {
          onSelect(items[0]);
        }
      }
    };

    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, currentIndex, items, onClose, onSelect]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/90 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-ink/20 bg-paper shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 bg-paper-deep/60 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-marker/15 px-3 py-1 text-xs font-bold text-marker-deep">
                  <Tag className="h-3.5 w-3.5" />
                  {item.tag}
                </span>
                <span className="text-xs font-semibold text-ink-soft">
                  {currentIndex + 1} of {items.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  aria-label="Close preview modal"
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-marker hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="relative flex flex-1 flex-col items-center justify-center overflow-auto bg-black/95 p-4 sm:p-8">
              {/* Previous / Next Floating Buttons */}
              <button
                onClick={handlePrev}
                aria-label="Previous graphic"
                className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/80 text-ink shadow-lg backdrop-blur-sm transition-all hover:bg-marker hover:scale-110 sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next graphic"
                className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-paper/80 text-ink shadow-lg backdrop-blur-sm transition-all hover:bg-marker hover:scale-110 sm:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Main Image Display */}
              <div className="relative flex max-h-[68vh] w-full items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[68vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                />
              </div>
            </div>

            {/* Footer details */}
            <div className="flex flex-col justify-between gap-2 border-t border-ink/10 bg-paper px-6 py-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <p className="font-hand text-lg text-ink-soft">Client: {item.client}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {item.link && (
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-1.5 rounded-full bg-marker px-4 py-2 text-xs font-bold text-ink transition-transform hover:scale-105 shadow-md"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Full Case Study
                  </a>
                )}
                <a
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper-deep px-4 py-2 text-xs font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  View Original HD
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Sparkles } from "lucide-react";
import { graphicItems, GraphicItem } from "@/data/graphic-items";
import { GraphicLightboxModal } from "./graphic-lightbox-modal";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Creatives" },
  { id: "social", label: "Social Posts" },
  { id: "banner", label: "Banners & Ads" },
  { id: "healthcare", label: "Healthcare & Beauty" },
  { id: "branding", label: "Branding & Luxury" },
] as const;

export function GraphicGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GraphicItem | null>(null);

  const filteredItems = graphicItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-10">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-bold transition-all duration-200",
                isActive
                  ? "bg-ink text-paper shadow-md scale-105"
                  : "border border-ink/15 bg-paper text-ink-soft hover:bg-paper-deep hover:text-ink"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Graphic Design Posts */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredItems.map((item, index) => {
          // Stagger slightly for notebook pinned look
          const rotateClass =
            index % 4 === 0
              ? "hover:-rotate-1"
              : index % 4 === 1
              ? "hover:rotate-1"
              : index % 4 === 2
              ? "hover:-rotate-1.5"
              : "hover:rotate-1.5";

          return (
            <motion.div
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              onClick={() => setSelectedItem(item)}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-xl border border-ink/15 bg-paper p-3 shadow-notebook transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                rotateClass
              )}
            >
              {/* Tape Accent */}
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-3 z-10 h-7 w-16 rotate-12 bg-marker/40 opacity-80 backdrop-blur-xs shadow-xs"
              />

              {/* Image Container with fixed ratio for uniformity */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-paper-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between bg-ink/75 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex justify-end">
                    <span className="inline-flex items-center gap-1 rounded-full bg-marker px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      {item.tag}
                    </span>
                  </div>

                  <div className="text-center text-paper">
                    <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-paper/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Eye className="h-5 w-5 text-paper" />
                    </div>
                    <p className="font-display text-base font-bold leading-tight">
                      {item.title}
                    </p>
                    <p className="mt-1 font-hand text-sm text-paper/80">
                      {item.client}
                    </p>
                  </div>

                  <div className="text-center text-[10px] font-medium text-paper/60 uppercase tracking-widest">
                    Click to Preview HD
                  </div>
                </div>
              </div>

              {/* Card Label */}
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <h4 className="font-display text-sm font-bold text-ink line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="font-hand text-xs text-ink-soft">{item.client}</p>
                </div>
                <span className="rounded-md bg-paper-deep px-2 py-0.5 text-[10px] font-semibold text-ink-soft border border-ink/10">
                  {item.tag}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Lightbox Modal */}
      <GraphicLightboxModal
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </div>
  );
}

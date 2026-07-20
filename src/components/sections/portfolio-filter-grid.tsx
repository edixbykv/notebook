"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, Palette, Video, Layers } from "lucide-react";
import { Section, Container } from "@/components/notebook/section";
import { ProjectsShowcase } from "./tablet-showcase";
import { GraphicGallery } from "./graphic-gallery";
import { VideoGallery } from "./video-gallery";
import { cn } from "@/lib/utils";

type MainTab = {
  id: "all" | "web" | "graphic" | "video";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  description: string;
};

const MAIN_TABS: MainTab[] = [
  {
    id: "all",
    label: "All Work",
    icon: Layers,
    description: "Websites, Apps, Graphic Design & Video Production",
  },
  {
    id: "web",
    label: "Websites & Apps",
    icon: LayoutGrid,
    description: "Interactive live web platforms & companion mobile apps",
  },
  {
    id: "graphic",
    label: "Graphic Design",
    icon: Palette,
    badge: "23 Work Samples",
    description: "Social media posts, luxury branding, ads & banners",
  },
  {
    id: "video",
    label: "Video Editing",
    icon: Video,
    badge: "Reels & Ads",
    description: "Short form video edits, commercial ads & reels",
  },
];

export function PortfolioFilterGrid() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <Section className="bg-paper py-12 md:py-20">
      <Container>
        {/* Main Tab Navigation */}
        <div className="mb-14 flex flex-col items-center">
          <div className="inline-flex max-w-full flex-wrap justify-center gap-2 rounded-2xl border border-ink/15 bg-paper-deep/80 p-2 shadow-notebook">
            {MAIN_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-300",
                    isActive
                      ? "bg-ink text-paper shadow-lg scale-100"
                      : "text-ink-soft hover:bg-paper hover:text-ink"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-marker" : "text-ink-soft"
                    )}
                  />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-extrabold",
                        isActive
                          ? "bg-marker text-ink"
                          : "bg-ink/10 text-ink-soft"
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subtitle describing current category */}
          <p className="mt-4 font-hand text-xl text-ink-soft">
            {MAIN_TABS.find((t) => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === "all" && (
            <motion.div
              key="tab-all"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-24"
            >
              {/* Websites & Apps Showcase */}
              <div>
                <div className="mb-10 flex items-center gap-4 border-b border-ink/15 pb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper font-bold">
                    01
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                      Websites &amp; Mobile Apps
                    </h2>
                    <p className="font-hand text-lg text-ink-soft">
                      High-converting digital platforms engineered for growth
                    </p>
                  </div>
                </div>
                <ProjectsShowcase all />
              </div>

              {/* Graphic Design Section */}
              <div>
                <div className="mb-10 flex items-center gap-4 border-b border-ink/15 pb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-marker text-ink font-bold">
                    02
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                      Graphic Design &amp; Social Media Creatives
                    </h2>
                    <p className="font-hand text-lg text-ink-soft">
                      High-impact visual post designs, ads, and brand collateral
                    </p>
                  </div>
                </div>
                <GraphicGallery />
              </div>

              {/* Video Editing Section */}
              <div>
                <div className="mb-10 flex items-center gap-4 border-b border-ink/15 pb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper font-bold">
                    03
                  </span>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                      Video Editing &amp; Reel Production
                    </h2>
                    <p className="font-hand text-lg text-ink-soft">
                      Short-form video edits, commercial reels, and promotional ads
                    </p>
                  </div>
                </div>
                <VideoGallery />
              </div>
            </motion.div>
          )}

          {activeTab === "web" && (
            <motion.div
              key="tab-web"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsShowcase all />
            </motion.div>
          )}

          {activeTab === "graphic" && (
            <motion.div
              key="tab-graphic"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <GraphicGallery />
            </motion.div>
          )}

          {activeTab === "video" && (
            <motion.div
              key="tab-video"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <VideoGallery />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}

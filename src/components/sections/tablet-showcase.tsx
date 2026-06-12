"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { portfolio } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = (typeof portfolio)[number];

const FRAME: Record<string, string> = {
  silver: "/projects/tablet-frame.png",
  graphite: "/projects/tablet-frame-graphite.png",
  gold: "/projects/tablet-frame-gold.png",
  marker: "/projects/tablet-frame-marker.png",
};

// Screen "window" inside the cropped tablet frame, leaving a thin black bezel.
// Values are % of the frame box (aspect 1544 x 1226). The numbers below come
// from measuring the PNG, so the screenshot lands exactly on the display.
const WIN = { left: 1.94, top: 6.12, width: 96.05, height: 91.44 };
const WIN_W_PX = 1483; // window width  in the frame's intrinsic pixels
const WIN_H_PX = 1121; // window height in the frame's intrinsic pixels

// Phone overlay (CSS-drawn). The inner screen aspect (height / width) drives
// how far the mobile screenshot scrolls so it lines up with the tablet.
const PHONE_SCREEN_AR = 2.16;

function tabletScroll(project: Project) {
  // How far the screenshot must travel so its bottom reaches the window bottom,
  // expressed as a % of the image's own height.
  const visibleFraction = (WIN_H_PX * project.imgW) / (WIN_W_PX * project.imgH);
  const endPct = -(1 - visibleFraction) * 100;
  // Longer pages scroll a little longer so the speed stays comfortable.
  const duration = Math.min(16, Math.max(6.5, project.imgH / 1400));
  return { endPct, duration };
}

function Phone({
  project,
  active,
  reverse,
  onEnter,
  onLeave,
}: {
  project: Project;
  active: boolean;
  reverse: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const imgW = project.mobileW ?? 780;
  const imgH = project.mobileH ?? 1688;
  const visibleFraction = (PHONE_SCREEN_AR * imgW) / imgH;
  const endPct = -(1 - visibleFraction) * 100;
  const duration = Math.min(18, Math.max(8, imgH / 1500));

  return (
    <div
      aria-hidden="true"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        "absolute bottom-[-6%] z-20 w-[30%] drop-shadow-2xl",
        reverse ? "left-[-4%] -rotate-[5deg]" : "right-[-4%] rotate-[5deg]"
      )}
      style={{ aspectRatio: "1 / 2.03" }}
    >
      {/* phone body */}
      <div className="absolute inset-0 rounded-[16%/8%] bg-gradient-to-b from-[#2b2b30] to-[#0c0c0e] p-[3.2%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[13%/6.4%] bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.mobile}
            alt=""
            draggable={false}
            loading="lazy"
            className="block w-full will-change-transform"
            style={{
              transform: active ? `translateY(${endPct}%)` : "translateY(0%)",
              transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.4, 1)`,
            }}
          />
          {/* glare */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
          {/* notch / pill */}
          <span className="absolute left-1/2 top-[1.5%] h-[2.6%] w-[34%] -translate-x-1/2 rounded-full bg-black/90" />
        </div>
      </div>
    </div>
  );
}

function DeviceStage({
  project,
  reverse,
}: {
  project: Project;
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // On touch / no-hover devices, both previews auto-scroll while in view.
  const [inView, setInView] = useState(false);
  // On hover devices, only the device the pointer is over scrolls.
  const [hoverTablet, setHoverTablet] = useState(false);
  const [hoverPhone, setHoverPhone] = useState(false);
  const { endPct, duration } = tabletScroll(project);
  const hasPhone = Boolean(project.mobile);

  const tabletActive = inView || hoverTablet;
  const phoneActive = inView || hoverPhone;

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.5),
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative", hasPhone && "pr-[6%]", hasPhone && reverse && "pl-[6%] pr-0")}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the ${project.client} live website in a new tab`}
        onMouseEnter={() => setHoverTablet(true)}
        onMouseLeave={() => setHoverTablet(false)}
        className="group relative block w-full select-none outline-none focus-visible:ring-2 focus-visible:ring-marker focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        style={{ aspectRatio: "1544 / 1226" }}
      >
        {/* screen — screenshot sits in front of the frame's black display */}
        <span
          className="absolute z-10 overflow-hidden bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          style={{
            left: `${WIN.left}%`,
            top: `${WIN.top}%`,
            width: `${WIN.width}%`,
            height: `${WIN.height}%`,
            borderRadius: "2.3%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.client} website — full-page preview`}
            draggable={false}
            loading="lazy"
            className="block w-full will-change-transform"
            style={{
              transform: tabletActive ? `translateY(${endPct}%)` : "translateY(0%)",
              transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.4, 1)`,
            }}
          />
          {/* soft screen glare */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
        </span>

        {/* tablet frame (silver rim + bezel + pencil), drawn behind the screen */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FRAME[project.frame] ?? FRAME.silver}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />

        {/* live badge */}
        <span className="absolute right-[7%] top-[11%] z-20 inline-flex items-center gap-1 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-paper backdrop-blur-sm transition-all duration-300 group-hover:bg-marker">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
          </span>
          Live
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>

      {hasPhone && (
        <Phone
          project={project}
          active={phoneActive}
          reverse={reverse}
          onEnter={() => setHoverPhone(true)}
          onLeave={() => setHoverPhone(false)}
        />
      )}
    </div>
  );
}

function ProjectRow({ project, reverse }: { project: Project; reverse: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <div className={cn("relative", reverse && "lg:order-2")}>
        {/* warm glow behind the tablet */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-90 rounded-full bg-marker/10 blur-3xl"
        />
        <DeviceStage project={project} reverse={reverse} />
      </div>

      <div className={cn("text-center lg:text-left", reverse && "lg:order-1")}>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-marker">
          {project.category}
        </span>
        <h3 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          {project.client}
        </h3>
        <p className="mt-1 font-hand text-2xl text-ink-soft">{project.tagline}</p>
        <p className="mx-auto mt-4 max-w-md text-ink-soft leading-relaxed lg:mx-0">
          {project.summary}
        </p>

        {project.features && (
          <ul className="mx-auto mt-5 grid max-w-md gap-2 text-left sm:grid-cols-2 lg:mx-0">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-ink-soft"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-marker" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-semibold text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7">
          <Button href={project.url} variant="ink" size="lg">
            Visit live site
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsShowcase({
  className,
  all = false,
}: {
  className?: string;
  /** Show every project (portfolio page). Default shows only home-featured ones. */
  all?: boolean;
}) {
  const projects = all ? portfolio : portfolio.filter((p) => p.home !== false);
  return (
    <div className={cn("space-y-20 md:space-y-28", className)}>
      {projects.map((project, i) => (
        <ProjectRow key={project.slug} project={project} reverse={i % 2 === 1} />
      ))}
    </div>
  );
}

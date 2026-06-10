"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Underlined } from "@/components/notebook/highlight";

// three.js / r3f stay out of the initial bundle — loaded only on desktop, only
// when the section nears the viewport.
const FerrariScene = dynamic(
  () => import("@/components/sections/ferrari-scene").then((m) => m.FerrariScene),
  { ssr: false },
);

/** Lightweight top-view race car for phones — pure SVG, ~0 weight, slides with
 *  scroll so the "drives left → right" idea still works without loading any 3D. */
function MobileCar({ x }: { x: MotionValue<string> }) {
  return (
    <motion.div
      style={{ x }}
      className="absolute left-0 top-1/2 w-32 -translate-y-1/2"
    >
      <svg viewBox="0 0 220 90" className="h-auto w-full drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)]">
        {/* rear wing */}
        <rect x="6" y="22" width="11" height="46" rx="3" fill="#b71c1c" />
        {/* wheels */}
        <rect x="30" y="4" width="34" height="18" rx="6" fill="#141414" />
        <rect x="30" y="68" width="34" height="18" rx="6" fill="#141414" />
        <rect x="150" y="8" width="30" height="15" rx="5" fill="#141414" />
        <rect x="150" y="67" width="30" height="15" rx="5" fill="#141414" />
        {/* body */}
        <path
          d="M20 38 L150 30 Q200 40 212 45 Q200 50 150 60 L20 52 Q12 45 20 38 Z"
          fill="#E53935"
        />
        {/* nose stripe */}
        <path d="M150 38 Q195 43 208 45 Q195 47 150 52 Z" fill="#ffffff" opacity="0.85" />
        {/* cockpit + halo */}
        <ellipse cx="92" cy="45" rx="15" ry="9" fill="#161616" />
        <circle cx="92" cy="45" r="5" fill="#3a3a3a" />
        {/* front wing */}
        <rect x="200" y="30" width="9" height="30" rx="3" fill="#b71c1c" />
      </svg>
    </motion.div>
  );
}

export function FerrariShowcase() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [mount3d, setMount3d] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // feed scroll progress into the 3D scene without re-rendering React
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  // the SVG car (phones) rides the same scroll: off-left → off-right
  const carX = useTransform(scrollYProgress, [0, 1], ["-30vw", "115vw"]);

  // only treat real desktops as 3D-capable
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Desktop only: warm up the 3D scene early so the car is ready before it
  // scrolls into view. Phones never download the model.
  useEffect(() => {
    if (!isDesktop) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "fetch";
    link.href = "/models/ferrari.glb";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    const el = sectionRef.current;
    let done = false;
    const arm = () => {
      if (done) return;
      done = true;
      setMount3d(true);
    };

    const io = el
      ? new IntersectionObserver(([e]) => e.isIntersecting && arm(), {
          rootMargin: "1500px 0px",
        })
      : null;
    io?.observe(el!);

    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const ric = w.requestIdleCallback
      ? w.requestIdleCallback(arm, { timeout: 3000 })
      : window.setTimeout(arm, 2500);

    return () => {
      io?.disconnect();
      if (w.cancelIdleCallback) w.cancelIdleCallback(ric);
      else clearTimeout(ric);
      link.remove();
    };
  }, [isDesktop]);

  // staged text reveals timed to the car's drive across the screen
  const t1 = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const t1y = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);
  const t2 = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  const t2y = useTransform(scrollYProgress, [0.4, 0.55], [40, 0]);
  const t3 = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);
  const t3y = useTransform(scrollYProgress, [0.75, 0.9], [40, 0]);

  return (
    <section
      ref={sectionRef}
      aria-label="Moving your business forward"
      className="relative h-[320vh] bg-ink text-paper"
    >
      {/* pinned stage */}
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* faint grid backdrop (z-0) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* dashed marker "road" — sits BEHIND the car (z-0) so the car rides on top */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-px bg-[repeating-linear-gradient(90deg,#FFC400_0_28px,transparent_28px_56px)] opacity-50" />

        {/* car layer (z-10) — 3D on desktop, light SVG on phones */}
        <div className="absolute inset-0 z-10">
          {isDesktop ? (
            mount3d ? (
              <FerrariScene progress={progress} />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-paper/40">
                Loading…
              </div>
            )
          ) : (
            <MobileCar x={carX} />
          )}
        </div>

        {/* section label (z-20) */}
        <span className="absolute left-1/2 top-10 z-20 -translate-x-1/2 rounded-full border border-paper/25 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-paper/80">
          Always moving forward
        </span>

        {/* staged copy revealing as the car drives left → right (z-20) */}
        <motion.h2
          style={reduce ? undefined : { opacity: t1, y: t1y }}
          className="absolute left-5 right-5 top-[16%] z-20 max-w-xs font-display text-2xl font-semibold leading-tight sm:left-16 sm:right-auto sm:top-[20%] sm:text-5xl"
        >
          Fast, smooth, <Underlined color="#FFC400">reliable</Underlined>.
        </motion.h2>

        <motion.p
          style={reduce ? undefined : { opacity: t2, y: t2y }}
          className="absolute left-1/2 top-[42%] z-20 w-[88%] max-w-md -translate-x-1/2 text-center text-base leading-relaxed text-paper/85 sm:top-[24%] sm:text-2xl"
        >
          AI that keeps your business{" "}
          <span className="font-marker text-marker">moving forward</span> — handling
          the busywork so your team can focus on what matters.
        </motion.p>

        <motion.div
          style={reduce ? undefined : { opacity: t3, y: t3y }}
          className="absolute bottom-[14%] right-5 z-20 max-w-[16rem] text-right sm:bottom-[18%] sm:right-16 sm:max-w-sm"
        >
          <p className="font-display text-2xl font-semibold leading-tight sm:text-5xl">
            Built to help you
            <br />
            <span className="font-marker text-marker">go further.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

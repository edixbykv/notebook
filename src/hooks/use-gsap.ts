"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureRegistered() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveal direct children (or [data-reveal] descendants) with a staggered
 * scroll-triggered entrance.
 */
export function useRevealChildren<T extends HTMLElement = HTMLDivElement>(opts?: {
  y?: number;
  stagger?: number;
  start?: string;
  selector?: string;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    ensureRegistered();
    const el = ref.current;
    if (!el) return;

    const targets = opts?.selector
      ? el.querySelectorAll(opts.selector)
      : (Array.from(el.children) as Element[]);
    if (!targets.length) return;

    if (reducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: opts?.y ?? 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: opts?.stagger ?? 0.1,
        scrollTrigger: {
          trigger: el,
          start: opts?.start ?? "top 82%",
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/**
 * Animate SVG paths drawing themselves on scroll. Targets elements matching
 * `.draw-path` within the container.
 */
export function useDrawPaths<T extends HTMLElement = HTMLDivElement>(opts?: {
  start?: string;
  duration?: number;
  stagger?: number;
}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    ensureRegistered();
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll<SVGGeometryElement>(".draw-path");
    if (!paths.length) return;

    paths.forEach((p) => {
      const len = p.getTotalLength?.() ?? 1000;
      p.style.setProperty("--len", `${len}`);
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    if (reducedMotion()) {
      paths.forEach((p) => (p.style.strokeDashoffset = "0"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: opts?.duration ?? 1.1,
        ease: "power2.inOut",
        stagger: opts?.stagger ?? 0.15,
        scrollTrigger: {
          trigger: el,
          start: opts?.start ?? "top 78%",
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

/** Subtle parallax drift for decorative elements. */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  amount = 60
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    ensureRegistered();
    const el = ref.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}

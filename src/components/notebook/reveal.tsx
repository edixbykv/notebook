"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  Children,
  isValidElement,
  cloneElement,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight scroll-reveal primitives.
 *
 * These intentionally avoid Framer Motion: reveals are the most-used animation
 * on the site, so doing them with a tiny shared IntersectionObserver + CSS
 * transitions keeps main-thread hydration cost (and TBT) low while looking
 * identical. Reduced-motion users get content shown instantly.
 */

let observer: IntersectionObserver | null = null;
const getObserver = () => {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.05 }
    );
  }
  return observer;
};

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      el.classList.add("is-visible");
      return;
    }
    const obs = getObserver();
    obs?.observe(el);
    return () => obs?.unobserve(el);
  }, []);
  return ref;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 26 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal-on-scroll", className)}
      style={
        {
          "--d": `${delay * 1000}ms`,
          "--ry": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function RevealStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  // assign incremental delays to RevealItem children
  let i = 0;
  const enhanced = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const el = child as ReactElement<{ _index?: number }>;
      // only number RevealItem children
      const idx = i++;
      return cloneElement(el, { _index: idx });
    }
    return child;
  });
  return (
    <div ref={ref} className={cn("reveal-group", className)}>
      {enhanced}
    </div>
  );
}

export function RevealItem({
  children,
  className,
  _index = 0,
}: {
  children: ReactNode;
  className?: string;
  _index?: number;
}) {
  return (
    <div
      className={cn("reveal-item", className)}
      style={{ "--d": `${_index * 90}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

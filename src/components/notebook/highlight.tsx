"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MarkerUnderline,
  SketchCircle,
  DoubleUnderline,
} from "./doodles";

/** Yellow marker highlight behind inline text. */
export function Highlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("marker-highlight font-semibold", className)}>
      {children}
    </span>
  );
}

/** Text in marker-red. */
export function Marked({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("marker-red font-display", className)}>{children}</span>
  );
}

type UnderlinedProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  variant?: "single" | "double";
  delay?: number;
};

/** Word(s) with an animated hand-drawn underline that draws on view. */
export function Underlined({
  children,
  className,
  color = "#E53935",
  variant = "single",
  delay = 0.15,
}: UnderlinedProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const Doodle = variant === "double" ? DoubleUnderline : MarkerUnderline;

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      <span className="pointer-events-none absolute -bottom-2 left-0 right-0 h-3">
        <motion.span
          className="block h-full w-full"
          initial={reduce ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          animate={
            inView || reduce
              ? { clipPath: "inset(0 0% 0 0)" }
              : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{ duration: 0.7, delay, ease: "easeInOut" }}
        >
          <Doodle color={color} draw={false} className="h-full w-full" />
        </motion.span>
      </span>
    </span>
  );
}

/** Word(s) circled with a sketchy ellipse that draws on view. */
export function Circled({
  children,
  className,
  color = "#E53935",
  delay = 0.2,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <span
      ref={ref}
      className={cn("relative inline-block px-3 py-1", className)}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 -inset-x-1 -inset-y-2">
        <motion.span
          className="block h-full w-full"
          initial={reduce ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
          animate={
            inView || reduce
              ? { clipPath: "inset(0 0% 0 0)" }
              : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{ duration: 0.9, delay, ease: "easeInOut" }}
        >
          <SketchCircle color={color} draw={false} className="h-full w-full" />
        </motion.span>
      </span>
    </span>
  );
}

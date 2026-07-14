import { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { Reveal } from "@/components/notebook/reveal";
import {
  StarDoodle,
  Squiggle,
  LoopArrow,
} from "@/components/notebook/doodles";
import { StickyNote } from "@/components/notebook/sticky-note";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  note,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  crumbs: { name: string; path: string }[];
  /** optional handwritten brand note shown on the right (desktop) */
  note?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden ruled-paper grain pb-10 pt-28 sm:pt-32 lg:pb-14 lg:pt-40">
      {/* notebook spiral binding down the left edge */}
      <div className="spiral-binding pointer-events-none absolute inset-y-0 left-1 hidden w-3 opacity-60 sm:block" />
      <StarDoodle
        color="#E53935"
        className="animate-bob absolute right-[8%] top-28 hidden h-10 w-10 sm:block lg:hidden"
        draw={false}
      />
      <LoopArrow
        color="#111111"
        className="animate-sway absolute right-[5%] top-24 hidden h-20 w-20 opacity-70 lg:block"
        draw={false}
      />

      <div className="container relative">
        <Breadcrumbs items={crumbs} />
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="max-w-3xl">
            {eyebrow && (
              <Reveal>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-paper px-3.5 py-1.5 text-sm font-bold text-ink shadow-paper">
                  <span className="h-2 w-2 rounded-full bg-marker" />
                  {eyebrow}
                  <span className="font-hand text-marker">· KVai</span>
                </span>
              </Reveal>
            )}
            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl font-semibold leading-[1.04] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
                {title}
              </h1>
            </Reveal>
            <Squiggle color="#E53935" className="mt-4 h-4 w-48" draw={false} />
            {description && (
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
                  {description}
                </p>
              </Reveal>
            )}
            {children && <div className="mt-7">{children}</div>}
          </div>

          {/* brand note accent (desktop) */}
          <Reveal delay={0.18} className="hidden lg:block">
            <div className="relative ml-auto w-fit">
              <StickyNote
                color="yellow"
                rotate="3deg"
                float
                pin="tape"
                className="w-60"
              >
                <p className="font-hand text-2xl font-bold leading-tight text-ink">
                  {note ?? "AI should empower people, not replace them."}
                </p>
                <p className="mt-2 font-hand text-lg text-ink/70">
                  — the KVai team
                </p>
              </StickyNote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

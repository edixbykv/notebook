"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Inbox } from "lucide-react";
import { StarDoodle } from "@/components/notebook/doodles";
import { cn } from "@/lib/utils";

type Lead = { name: string; company: string; initials: string };

const LEADS: Lead[] = [
  { name: "Rahul Sharma", company: "Sharma Traders", initials: "RS" },
  { name: "Priya Menon", company: "Bloom Studio", initials: "PM" },
  { name: "Aman Khanna", company: "FitClub Gym", initials: "AK" },
];

// relative bar heights (0–1) for the mini "Leads this week" chart
const BARS = [0.45, 0.62, 0.5, 0.78, 0.66, 0.88, 1];

const STATUS = [
  { label: "New", cls: "bg-black/[0.06] text-black/45" },
  { label: "Replied", cls: "bg-amber-100 text-amber-700" },
  { label: "Booked", cls: "bg-green-100 text-green-700" },
];

const STEP_MS = 900; // time on each step
const HOLD_MS = 1600; // pause once all booked, before looping
const TOTAL = LEADS.length + 1; // step at which every lead is booked

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * A MacBook mock-up with a self-contained, looping "CRM" dashboard inside.
 * Leads arrive and progress New → Replied → Booked while the KPI tiles tick up.
 * Layout inside the screen is fixed-height, so nothing reflows as it animates.
 */
export function HeroMacbook({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(TOTAL);
      return;
    }
    if (!inView) return;
    let t: ReturnType<typeof setTimeout>;
    const tick = (s: number) => {
      const next = (s + 1) % (TOTAL + 1);
      const delay = s === TOTAL ? HOLD_MS : STEP_MS;
      t = setTimeout(() => {
        setStep(next);
        tick(next);
      }, delay);
    };
    tick(step);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  const p = step / TOTAL; // 0 → 1 progress across the loop
  const leadsCount = Math.round(32 + p * 15);
  const bookedCount = Math.round(6 + p * 8);
  const repliedPct = Math.round(80 + p * 16);
  const allBooked = step >= TOTAL;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* warm glow behind the laptop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 scale-90 rounded-full bg-marker/10 blur-3xl"
      />

      {/* hand-drawn accents to keep the notebook vibe */}
      <StarDoodle
        color="#E53935"
        className="absolute -left-4 -top-5 hidden h-8 w-8 animate-float lg:block"
        draw={false}
      />
      <span className="absolute -right-3 -top-4 hidden rotate-6 rounded-md bg-sticky px-2 py-1 font-marker text-xs text-ink shadow-sticky lg:block">
        runs 24/7
      </span>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="animate-float-slow"
      >
        {/* lid / screen */}
        <div className="rounded-t-2xl bg-[#1d1d1f] p-[2.4%] shadow-paper-lift">
          <div
            className="relative overflow-hidden rounded-lg bg-[#fbfbfa] ring-1 ring-white/5"
            style={{ aspectRatio: "16 / 10" }}
          >
            {/* camera dot */}
            <span className="absolute left-1/2 top-[3px] z-20 h-1 w-1 -translate-x-1/2 rounded-full bg-white/20" />

            <div className="flex h-full w-full flex-col text-[#1d1d1f]">
              {/* app top bar */}
              <div className="flex items-center gap-1.5 border-b border-black/5 bg-white px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-1.5 text-[10px] font-bold tracking-tight">
                  KVAI <span className="text-marker">CRM</span>
                </span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-ink/90 px-1.5 py-0.5 text-[8px] font-bold text-paper">
                  <span className="relative flex h-1 w-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1 w-1 rounded-full bg-green-400" />
                  </span>
                  Live
                </span>
              </div>

              {/* body: mini sidebar + main */}
              <div className="flex min-h-0 flex-1">
                {/* sidebar */}
                <div className="hidden w-9 flex-col items-center gap-2 border-r border-black/5 bg-white py-3 sm:flex">
                  <span className="h-4 w-4 rounded-md bg-marker/90" />
                  <span className="h-1.5 w-5 rounded-full bg-black/10" />
                  <span className="h-1.5 w-5 rounded-full bg-black/10" />
                  <span className="h-1.5 w-5 rounded-full bg-black/10" />
                  <span className="mt-auto h-1.5 w-5 rounded-full bg-black/10" />
                </div>

                {/* main panel */}
                <div className="relative flex-1 space-y-2 overflow-hidden p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold">Leads Pipeline</span>
                    <span className="text-[8px] font-semibold text-black/35">
                      Today
                    </span>
                  </div>

                  {/* KPI tiles */}
                  <div className="grid grid-cols-3 gap-1.5">
                    <Kpi label="New leads" value={leadsCount} />
                    <Kpi label="Replied" value={`${repliedPct}%`} />
                    <Kpi label="Booked" value={bookedCount} accent />
                  </div>

                  {/* bar chart card */}
                  <div className="rounded-md border border-black/5 bg-white px-2.5 py-2">
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-[8px] font-bold text-black/55">
                        Leads this week
                      </span>
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-green-100 px-1 py-px text-[7px] font-bold text-green-700">
                        ↑ {Math.round(12 + p * 30)}%
                      </span>
                    </div>
                    <div className="flex h-10 items-end gap-1">
                      {BARS.map((h, i) => {
                        const last = i === BARS.length - 1;
                        return (
                          <motion.div
                            key={i}
                            className={cn(
                              "flex-1 rounded-sm",
                              last ? "bg-marker" : "bg-marker/25"
                            )}
                            initial={false}
                            animate={{
                              height: `${(0.35 + p * 0.65) * h * 100}%`,
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeInOut",
                              delay: i * 0.03,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* lead rows */}
                  <div className="space-y-1.5 pt-0.5">
                    {LEADS.map((lead, i) => {
                      const si = clamp(step - i, 0, 2);
                      const s = STATUS[si];
                      const booked = si === 2;
                      return (
                        <div
                          key={lead.name}
                          className={cn(
                            "flex items-center gap-2 rounded-md border bg-white px-2 py-1.5 transition-colors duration-300",
                            booked ? "border-green-200" : "border-black/5"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold transition-colors duration-300",
                              booked
                                ? "bg-green-100 text-green-700"
                                : "bg-marker/10 text-marker"
                            )}
                          >
                            {lead.initials}
                          </span>
                          <div className="min-w-0 flex-1 leading-tight">
                            <div className="truncate text-[9px] font-bold">
                              {lead.name}
                            </div>
                            <div className="truncate text-[8px] text-black/40">
                              {lead.company}
                            </div>
                          </div>
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                              key={s.label}
                              initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.6, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className={cn(
                                "shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold",
                                s.cls
                              )}
                            >
                              {s.label}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* new-lead toast at the start of each loop */}
                  <AnimatePresence>
                    {step === 0 && !reduce && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="pointer-events-none absolute right-3 top-[34px] z-10 inline-flex items-center gap-1 rounded-md bg-ink px-2 py-1 text-[8px] font-bold text-paper shadow"
                      >
                        <Inbox className="h-2.5 w-2.5" />
                        New lead captured
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* booked stamp when everything is done */}
                  <AnimatePresence>
                    {allBooked && (
                      <motion.div
                        initial={reduce ? false : { scale: 0.8, rotate: -6, opacity: 0 }}
                        animate={{ scale: 1, rotate: -4, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md border-2 border-green-600/70 bg-white/80 px-2 py-0.5 font-marker text-xs text-green-700 backdrop-blur-sm"
                      >
                        All booked ✓
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* soft screen glare */}
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* base / hinge — slightly wider than the lid, like a real MacBook */}
        <div className="relative left-1/2 w-[112%] -translate-x-1/2">
          <div className="h-[10px] rounded-b-xl bg-gradient-to-b from-[#dfe1e5] via-[#c2c5cb] to-[#9b9ea5]" />
          <div className="mx-auto h-[5px] w-[16%] rounded-b-lg bg-[#7c7f86]" />
        </div>
      </motion.div>
    </div>
  );
}

function Kpi({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-2 py-1.5",
        accent ? "border-green-200 bg-green-50/60" : "border-black/5 bg-white"
      )}
    >
      <div className="text-[7px] font-semibold uppercase tracking-wide text-black/40">
        {label}
      </div>
      <div
        className={cn(
          "text-sm font-bold tabular-nums leading-tight",
          accent ? "text-green-700" : "text-ink"
        )}
      >
        {value}
      </div>
    </div>
  );
}

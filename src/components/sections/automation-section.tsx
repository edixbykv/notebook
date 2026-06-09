"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Inbox,
  Sparkles,
  Database,
  Send,
  CalendarCheck,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { Underlined } from "@/components/notebook/highlight";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type Node = { icon: LucideIcon; label: string; caption: string };

const NODES: Node[] = [
  { icon: Inbox, label: "New lead", caption: "New lead just came in…" },
  { icon: Sparkles, label: "AI replies", caption: "AI reads & replies instantly…" },
  { icon: Database, label: "CRM synced", caption: "Details saved to your CRM…" },
  { icon: Send, label: "Follow-up", caption: "Smart follow-up sent…" },
  { icon: CalendarCheck, label: "Booked", caption: "Meeting booked — you're in. ✓" },
];

const STEP_MS = 1150; // time spent on each node
const HOLD_MS = 1600; // pause on the final "done" stamp before looping

export function AutomationSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-80px" });
  const reduce = useReducedMotion();

  // step 0..4 = that node is in progress; step 5 = all done (stamp showing)
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(NODES.length); // show everything completed, no motion
      return;
    }
    if (!inView) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = (s: number) => {
      const next = (s + 1) % (NODES.length + 1);
      const delay = s === NODES.length ? HOLD_MS : STEP_MS;
      timer = setTimeout(() => {
        setStep(next);
        tick(next);
      }, delay);
    };
    tick(step);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  const done = step >= NODES.length;
  // leading edge of the progress line, as a % across the node centres
  const fillPct = Math.min(step, NODES.length - 1) / (NODES.length - 1) * 100;
  const activeCaption = done
    ? "From lead to booked — fully automated."
    : NODES[step].caption;

  return (
    <Section className="bg-paper-deep">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="AI Automation"
            title={
              <>
                Your business keeps working,{" "}
                <Underlined color="#E53935">even while you sleep</Underlined>
              </>
            }
            description="We wire your tools together with AI so leads get answered, data stays in sync, and follow-ups happen on their own — no copy-paste, no missed messages."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={wrapRef} className="mx-auto mt-12 max-w-3xl">
            {/* notebook / app frame */}
            <div className="relative rounded-2xl border-2 border-ink/85 bg-paper shadow-paper-lift">
              {/* top bar */}
              <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-marker/80" />
                <span className="h-3 w-3 rounded-full bg-sticky-deep" />
                <span className="h-3 w-3 rounded-full bg-ink/20" />
                <span className="ml-2 font-marker text-sm text-ink-soft">
                  automation-engine
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-paper">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  Running 24/7
                </span>
              </div>

              {/* workflow */}
              <div className="px-4 pb-6 pt-8 sm:px-8">
                <div className="relative">
                  {/* base track + animated fill (sits behind the node row) */}
                  <div className="pointer-events-none absolute inset-x-[10%] top-7 -z-0">
                    <div className="h-[3px] w-full rounded-full bg-ink/10" />
                    <motion.div
                      className="absolute left-0 top-0 h-[3px] rounded-full bg-marker"
                      animate={{ width: `${fillPct}%` }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    {/* travelling pulse on the leading edge */}
                    {!done && !reduce && (
                      <motion.span
                        className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marker shadow-[0_0_0_4px_rgba(229,57,53,0.25)]"
                        animate={{ left: `${fillPct}%` }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    )}
                  </div>

                  {/* nodes */}
                  <div className="relative z-10 grid grid-cols-5 gap-1 sm:gap-3">
                    {NODES.map((node, i) => {
                      const Icon = node.icon;
                      const isDone = step > i || done;
                      const isActive = step === i && !done;
                      return (
                        <div
                          key={node.label}
                          className="flex flex-col items-center text-center"
                        >
                          <motion.div
                            animate={{ scale: isActive ? 1.12 : 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            className={[
                              "relative flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-colors duration-300 sm:h-14 sm:w-14",
                              isDone
                                ? "border-ink bg-ink text-paper"
                                : isActive
                                  ? "border-marker bg-paper text-marker"
                                  : "border-ink/20 bg-paper text-ink/40",
                            ].join(" ")}
                          >
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                            {/* pulsing ring on the active node */}
                            {isActive && (
                              <motion.span
                                className="absolute inset-0 rounded-xl border-2 border-marker"
                                initial={{ opacity: 0.7, scale: 1 }}
                                animate={{ opacity: 0, scale: 1.45 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                              />
                            )}
                            {/* check badge once done */}
                            {isDone && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[11px] font-bold text-white shadow"
                              >
                                ✓
                              </motion.span>
                            )}
                          </motion.div>
                          <span
                            className={[
                              "mt-2 text-[10px] font-semibold leading-tight sm:text-xs",
                              isDone || isActive ? "text-ink" : "text-ink/40",
                            ].join(" ")}
                          >
                            {node.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* live caption / result */}
                <div className="mt-7 flex min-h-[52px] items-center justify-center">
                  {done ? (
                    <motion.div
                      key="stamp"
                      initial={reduce ? false : { scale: 0.8, rotate: -6, opacity: 0 }}
                      animate={{ scale: 1, rotate: -3, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="rounded-lg border-2 border-green-600/70 px-4 py-1.5 font-marker text-lg text-green-700"
                    >
                      Done — in ~4 seconds ✓
                    </motion.div>
                  ) : (
                    <motion.p
                      key={step}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-hand text-2xl text-ink"
                    >
                      {activeCaption}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            {/* CTA under the frame */}
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <p className="text-sm text-ink-soft">
                This is one workflow. Imagine your whole business on autopilot.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Automate my business
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-ink-soft underline-offset-4 hover:text-marker hover:underline"
              >
                or ask us on WhatsApp →
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

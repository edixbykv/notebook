"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Globe,
  Share2,
  Zap,
  Users,
  Inbox,
  Sparkles,
  Database,
  CalendarCheck,
  Gauge,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { StarDoodle } from "@/components/notebook/doodles";
import { cn } from "@/lib/utils";

/* ── view config: one focused screen per service ─────────────────────────── */
const VIEWS = [
  { id: "web", icon: Globe, title: "Websites" },
  { id: "social", icon: Share2, title: "Social Growth" },
  { id: "ai", icon: Zap, title: "AI Automation" },
  { id: "crm", icon: Users, title: "Leads · CRM" },
] as const;

const SIDEBAR: LucideIcon[] = [Globe, Share2, Zap, Users];

const VIEW_MS = 3000; // time each screen stays before switching

// AI automation pipeline shown as a mini flowchart
const FLOW: { icon: LucideIcon; label: string }[] = [
  { icon: Inbox, label: "Lead" },
  { icon: Sparkles, label: "AI reply" },
  { icon: Database, label: "CRM" },
  { icon: CalendarCheck, label: "Booked" },
];

const BARS = [0.4, 0.55, 0.48, 0.7, 0.62, 0.84, 1]; // follower-growth chart
const LEADS = [
  { initials: "RS", name: "Rahul Sharma", co: "Sharma Traders", status: 2 },
  { initials: "PM", name: "Priya Menon", co: "Bloom Studio", status: 1 },
  { initials: "AK", name: "Aman Khanna", co: "FitClub Gym", status: 0 },
];
const STATUS = [
  { label: "New", cls: "bg-black/[0.06] text-black/45" },
  { label: "Replied", cls: "bg-amber-100 text-amber-700" },
  { label: "Booked", cls: "bg-green-100 text-green-700" },
];

/**
 * A MacBook mock-up whose screen auto-cycles through a focused dashboard view
 * for each KVai service — Websites, Social Growth, AI Automation and Leads/CRM —
 * so the full offering reads at a glance without crowding one screen.
 */
export function HeroMacbook({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotion();
  const [view, setView] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => setView((v) => (v + 1) % VIEWS.length), VIEW_MS);
    return () => clearInterval(t);
  }, [inView, reduce]);

  const active = VIEWS[view];

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

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="animate-float-slow"
      >
        {/* lid / screen */}
        <div className="rounded-t-2xl bg-[#1d1d1f] p-[2.4%] shadow-paper-lift">
          <div
            className="relative overflow-hidden rounded-lg bg-[#f3f4f6] ring-1 ring-white/5"
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
                  KVai <span className="text-marker">Studio</span>
                </span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-ink/90 px-1.5 py-0.5 text-[8px] font-bold text-paper">
                  <span className="relative flex h-1 w-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1 w-1 rounded-full bg-green-400" />
                  </span>
                  Live
                </span>
              </div>

              {/* body: sidebar + main */}
              <div className="flex min-h-0 flex-1">
                {/* sidebar — active service highlighted */}
                <div className="hidden w-9 flex-col items-center gap-2.5 border-r border-black/5 bg-white py-3 sm:flex">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-marker text-paper">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  {SIDEBAR.map((Icon, i) => (
                    <span
                      key={i}
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-300",
                        i === view
                          ? "bg-marker/10 text-marker"
                          : "text-black/30"
                      )}
                    >
                      <Icon className="h-3 w-3" />
                    </span>
                  ))}
                </div>

                {/* main panel — one focused view at a time */}
                <div className="relative flex-1 overflow-hidden">
                  {/* view header (crossfades with the screen) */}
                  <div className="flex items-center justify-between px-3 pt-2.5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center gap-1.5 text-[11px] font-bold"
                      >
                        <active.icon className="h-3 w-3 text-marker" />
                        {active.title}
                      </motion.div>
                    </AnimatePresence>
                    {/* view dots */}
                    <div className="flex gap-1">
                      {VIEWS.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1 w-1 rounded-full transition-colors duration-300",
                            i === view ? "bg-marker" : "bg-black/15"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* swapping body */}
                  <div className="relative h-[calc(100%-26px)] px-3 pb-3 pt-2">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active.id}
                        initial={reduce ? false : { opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute inset-x-3 bottom-3 top-2"
                      >
                        {active.id === "web" && <WebView reduce={!!reduce} />}
                        {active.id === "social" && <SocialView reduce={!!reduce} />}
                        {active.id === "ai" && <AiView reduce={!!reduce} />}
                        {active.id === "crm" && <CrmView reduce={!!reduce} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* soft screen glare */}
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/15" />
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

/* ── shared bits ─────────────────────────────────────────────────────────── */

function Stat({
  icon: Icon,
  value,
  label,
  accent,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex-1 rounded-md border px-2 py-1.5",
        accent ? "border-green-200 bg-green-50/60" : "border-black/5 bg-white"
      )}
    >
      <Icon className={cn("h-3 w-3", accent ? "text-green-600" : "text-marker")} />
      <div
        className={cn(
          "mt-1 text-base font-bold tabular-nums leading-none",
          accent ? "text-green-700" : "text-ink"
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[7px] font-semibold uppercase tracking-wide text-black/40">
        {label}
      </div>
    </div>
  );
}

/* ── Websites view ───────────────────────────────────────────────────────── */
function WebView({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-1.5">
        <Stat icon={Globe} value="18" label="Sites live" />
        <Stat icon={Gauge} value="98" label="PageSpeed" />
        <Stat icon={TrendingUp} value="+212%" label="Conversions" accent />
      </div>
      <div className="flex flex-1 flex-col rounded-md border border-black/5 bg-white px-2.5 py-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[8px] font-bold text-black/55">
            Monthly visitors
          </span>
          <span className="text-[7px] font-bold text-green-600">↑ live</span>
        </div>
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="kv-web" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E88E5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1E88E5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,33 L16,26 L32,29 L48,16 L64,20 L80,9 L100,5 L100,40 L0,40 Z"
            fill="url(#kv-web)"
          />
          <motion.path
            d="M0,33 L16,26 L32,29 L48,16 L64,20 L80,9 L100,5"
            fill="none"
            stroke="#1E88E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={reduce ? undefined : { duration: 1.4, ease: "easeInOut" }}
          />
          <circle cx="100" cy="5" r="2.6" fill="#1E88E5" />
        </svg>
      </div>
    </div>
  );
}

/* ── Social Growth view ──────────────────────────────────────────────────── */
function SocialView({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-1.5">
        <Stat icon={Share2} value="94k" label="Reach" />
        <Stat icon={Users} value="+5.2k" label="Followers" />
        <Stat icon={TrendingUp} value="+186%" label="Engagement" accent />
      </div>
      <div className="flex flex-1 flex-col rounded-md border border-black/5 bg-white px-2.5 py-2">
        <span className="mb-1 text-[8px] font-bold text-black/55">
          Follower growth
        </span>
        <div className="flex flex-1 items-end gap-1">
          {BARS.map((h, i) => {
            const last = i === BARS.length - 1;
            return (
              <motion.div
                key={i}
                className={cn(
                  "flex-1 rounded-sm",
                  last ? "bg-marker" : "bg-marker/25"
                )}
                initial={reduce ? false : { height: 0 }}
                animate={{ height: `${h * 100}%` }}
                transition={
                  reduce ? undefined : { duration: 0.5, delay: i * 0.05 }
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── AI Automation view ──────────────────────────────────────────────────── */
function AiView({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-1.5">
        <Stat icon={Zap} value="7" label="Workflows" />
        <Stat icon={CalendarCheck} value="15 hrs" label="Saved / wk" accent />
      </div>
      <div className="flex flex-1 flex-col justify-center rounded-md border border-black/5 bg-white px-2.5 py-2">
        <span className="mb-3 text-[8px] font-bold text-black/55">
          Lead → booked, on autopilot
        </span>
        <div className="relative">
          {/* connector track + travelling pulse */}
          <div className="pointer-events-none absolute inset-x-[12%] top-[11px]">
            <div className="h-[2px] w-full rounded-full bg-marker/30" />
            {!reduce && (
              <motion.span
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marker shadow-[0_0_0_3px_rgba(229,57,53,0.2)]"
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            )}
          </div>
          {/* nodes pop in one by one */}
          <div className="relative z-10 grid grid-cols-4">
            {FLOW.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.label}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={
                    reduce
                      ? undefined
                      : { delay: 0.2 + i * 0.45, type: "spring", stiffness: 320, damping: 18 }
                  }
                  className="flex flex-col items-center gap-1"
                >
                  <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md border border-marker bg-marker text-paper">
                    <Icon className="h-3 w-3" />
                  </span>
                  <span className="text-[7px] font-bold text-ink">{node.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Leads / CRM view ────────────────────────────────────────────────────── */
function CrmView({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-1.5">
        <Stat icon={Inbox} value="47" label="New leads" />
        <Stat icon={Sparkles} value="96%" label="Replied" />
        <Stat icon={CalendarCheck} value="31" label="Booked" accent />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {LEADS.map((lead, i) => {
          const s = STATUS[lead.status];
          const booked = lead.status === 2;
          return (
            <motion.div
              key={lead.name}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reduce ? undefined : { delay: 0.1 + i * 0.12 }}
              className={cn(
                "flex flex-1 items-center gap-2 rounded-md border bg-white px-2",
                booked ? "border-green-200" : "border-black/5"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold",
                  booked ? "bg-green-100 text-green-700" : "bg-marker/10 text-marker"
                )}
              >
                {lead.initials}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[9px] font-bold">{lead.name}</div>
                <div className="truncate text-[8px] text-black/40">{lead.co}</div>
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold",
                  s.cls
                )}
              >
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

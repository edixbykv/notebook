import { cn } from "@/lib/utils";

type DoodleProps = {
  className?: string;
  color?: string;
  strokeWidth?: number;
  draw?: boolean;
};

const base = (draw?: boolean) =>
  cn("overflow-visible", draw && "[&_path]:draw-path [&_line]:draw-path");

/** Curved hand-drawn arrow, points down-right by default. */
export function HandArrow({
  className,
  color = "#E53935",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      className={cn(base(draw), className)}
    >
      <path
        d="M6 8C22 44 44 70 96 74"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M78 60C84 66 92 72 98 75C96 67 95 58 96 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Long sweeping arrow pointing right. */
export function ArrowRightCurve({
  className,
  color = "#111111",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      aria-hidden="true"
      className={cn(base(draw), className)}
    >
      <path
        d="M4 40C50 12 120 10 188 30"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M170 16C178 22 186 27 190 31C184 35 178 42 174 50"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-sketched ellipse to circle a word. */
export function SketchCircle({
  className,
  color = "#E53935",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 220 90"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn(base(draw), className)}
    >
      <path
        d="M110 6C40 4 8 22 8 46C8 72 64 84 120 84C176 84 214 70 212 44C210 22 168 9 96 8"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Marker-style underline that draws itself. */
export function MarkerUnderline({
  className,
  color = "#E53935",
  strokeWidth = 7,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 300 24"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn(base(draw), className)}
    >
      <path
        d="M4 14C70 6 150 6 210 10C250 12 280 14 296 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Double underline for emphasis. */
export function DoubleUnderline({
  className,
  color = "#111111",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 300 30"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn(base(draw), className)}
    >
      <path
        d="M6 8C80 3 200 3 294 7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M10 20C90 16 210 16 290 21"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Squiggly underline. */
export function Squiggle({
  className,
  color = "#1E88E5",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 300 20"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn(base(draw), className)}
    >
      <path
        d="M4 12C24 2 44 2 64 12C84 22 104 22 124 12C144 2 164 2 184 12C204 22 224 22 244 12C264 2 284 2 296 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn star / sparkle. */
export function StarDoodle({
  className,
  color = "#E53935",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
      className={cn(base(draw), className)}
    >
      <path
        d="M30 6L30 54M6 30L54 30M13 13L47 47M47 13L13 47"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Loose scribble circle bullet. */
export function ScribbleDot({
  className,
  color = "#E53935",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={cn(base(draw), className)}
    >
      <path
        d="M20 6C12 6 6 12 6 20C6 28 12 34 20 34C28 34 34 28 34 20C34 13 29 7 22 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Big looping growth arrow (used in hero / process). */
export function LoopArrow({
  className,
  color = "#E53935",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 140 120"
      fill="none"
      aria-hidden="true"
      className={cn(base(draw), className)}
    >
      <path
        d="M14 100C10 60 30 20 74 20C104 20 124 40 122 66C120 88 100 98 86 88C76 81 78 66 92 64"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M2 86C6 92 11 99 14 104C19 99 26 94 32 91"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Upward trending chart doodle. */
export function GrowthChart({
  className,
  color = "#111111",
  strokeWidth = 3,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      aria-hidden="true"
      className={cn(base(draw), className)}
    >
      <path d="M10 8V80H112" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        className="chart-trend"
        d="M22 66L48 48L66 58L102 20"
        stroke="#E53935"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 18H104V34"
        stroke="#E53935"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Underline shaped like a check / swoosh. */
export function CheckSwoosh({
  className,
  color = "#2E7D32",
  strokeWidth = 4,
  draw = true,
}: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 32"
      fill="none"
      aria-hidden="true"
      className={cn(base(draw), className)}
    >
      <path
        d="M4 16L15 27L36 4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      title="KVAI Solutions — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      {/* Custom monogram: an ink "K" whose upper arm rises into a marker-red
          growth spark — "AI-powered business growth", notebook style. */}
      <span
        aria-hidden="true"
        className="relative grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper shadow-pin transition-transform duration-300 group-hover:-rotate-6"
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* stem of the K */}
          <path
            d="M13 9.5V30.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* lower arm */}
          <path
            d="M13 21 L25.5 30.5"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* upper arm rising into a growth spark (marker red) */}
          <path
            d="M13 21 L27 8.5"
            stroke="#e53935"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* arrowhead on the rising arm */}
          <path
            d="M21.5 8.5 H27.5 V14.5"
            stroke="#e53935"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* AI spark accent */}
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-marker ring-2 ring-ink" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          KVAI<span className="text-marker">.</span>
        </span>
        <span className="font-hand text-sm font-semibold text-ink-soft">
          Solutions
        </span>
      </span>
    </Link>
  );
}

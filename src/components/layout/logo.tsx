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
      <span
        aria-hidden="true"
        className="relative grid h-10 w-10 place-items-center rounded-lg bg-ink text-paper shadow-pin transition-transform duration-300 group-hover:-rotate-6"
      >
        <span className="font-marker text-lg leading-none">KV</span>
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-marker" />
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

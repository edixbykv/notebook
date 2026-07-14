import Link from "next/link";
import Image from "next/image";
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
      title="KVai Solutions — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className="relative overflow-hidden grid h-10 w-10 place-items-center rounded-xl bg-black shadow-pin transition-transform duration-300 group-hover:-rotate-6"
      >
        <Image
          src="/logo.png"
          alt="KVai Logo"
          width={40}
          height={40}
          priority
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          KVai<span className="text-marker">.</span>
        </span>
        <span className="font-hand text-sm font-semibold text-ink-soft">
          Solutions
        </span>
      </span>
    </Link>
  );
}

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StickyNoteProps = {
  children: ReactNode;
  className?: string;
  color?: "yellow" | "red" | "ink";
  pin?: "pin" | "tape" | "none";
  rotate?: string;
  float?: boolean;
};

export function StickyNote({
  children,
  className,
  color = "yellow",
  pin = "pin",
  rotate = "-1deg",
  float = false,
}: StickyNoteProps) {
  return (
    <div
      style={
        float
          ? ({ ["--rot" as string]: rotate } as React.CSSProperties)
          : { transform: `rotate(${rotate})` }
      }
      className={cn(
        "sticky-note rounded-[2px] p-5 transition-transform duration-300 sm:p-6",
        color === "red" && "sticky-note--red",
        color === "ink" && "sticky-note--ink",
        float ? "note-float hover:[animation-play-state:paused]" : "hover:-translate-y-1 hover:rotate-0",
        className
      )}
    >
      {pin === "pin" && <span className="pin-dot" aria-hidden="true" />}
      {pin === "tape" && <span className="tape" aria-hidden="true" />}
      {children}
    </div>
  );
}

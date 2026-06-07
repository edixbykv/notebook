import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-3 inline-flex items-center gap-2 font-hand text-xl font-bold text-marker",
            align === "center" && "justify-center"
          )}
        >
          <span className="text-2xl leading-none">✦</span>
          {eyebrow}
        </span>
      )}
      <Tag className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink text-balance sm:text-4xl lg:text-5xl">
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-ink-soft text-pretty sm:text-lg",
            align === "center" ? "mx-auto max-w-xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

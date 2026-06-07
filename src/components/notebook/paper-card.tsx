import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PaperCard({
  children,
  className,
  as: Tag = "div",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  hover?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "paper-card p-6 sm:p-7",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-paper-lift",
        className
      )}
    >
      {children}
    </Tag>
  );
}

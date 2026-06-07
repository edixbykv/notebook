import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  ruled = false,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  ruled?: boolean;
  as?: "section" | "div";
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative overflow-hidden py-14 sm:py-16 lg:py-24",
        ruled && "ruled-paper",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("container relative", className)}>{children}</div>
  );
}

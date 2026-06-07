import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marker focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "btn-shine bg-marker text-paper shadow-[0_4px_0_0_#9b2420] hover:bg-marker-deep hover:shadow-[0_2px_0_0_#9b2420] hover:translate-y-[2px]",
        ink: "btn-shine bg-ink text-paper shadow-[0_4px_0_0_#000] hover:bg-black hover:shadow-[0_2px_0_0_#000] hover:translate-y-[2px]",
        outline:
          "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
        sticky:
          "btn-shine bg-sticky text-ink shadow-sticky hover:shadow-sticky-hover hover:-translate-y-0.5 border border-ink/10",
        ghost: "text-ink hover:bg-ink/5",
        link: "text-ink underline-offset-4 hover:text-marker",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        default: "h-11 px-6",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (href) {
      const isExternal = /^https?:|^tel:|^mailto:/.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            className={classes}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

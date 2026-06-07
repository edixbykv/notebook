"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Mobile-only sticky conversion bar. Appears after the visitor scrolls past
 * the hero and hides again near the very bottom (where the footer already has
 * its own call-to-action), so it never covers footer content.
 */
export function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >=
        document.documentElement.scrollHeight - 320;
      setShow(y > 560 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 lg:hidden",
        show ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={siteConfig.phoneHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink bg-paper text-sm font-bold text-ink active:scale-95"
        >
          <Phone className="h-4 w-4" /> Call now
        </a>
        <Link
          href="/contact"
          className="btn-shine flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-full bg-marker text-sm font-bold text-paper shadow-[0_4px_0_0_#9b2420] active:translate-y-0.5"
        >
          <CalendarCheck className="h-4 w-4" /> Book Free Consultation
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { mainNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change + lock scroll while open
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink/10 bg-paper/85 backdrop-blur-md shadow-[0_4px_20px_rgba(17,17,17,0.06)]"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="group relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive(item.href)
                      ? "text-marker"
                      : "text-ink hover:text-marker"
                  )}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full w-72 pt-3"
                    >
                      <div className="paper-card -rotate-1 p-2 shadow-paper-lift">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-3 py-2.5 transition-colors hover:bg-sticky/40"
                          >
                            <span className="block text-sm font-bold text-ink">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="mt-0.5 block text-xs text-ink-soft">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive(item.href)
                    ? "text-marker"
                    : "text-ink hover:text-marker"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-marker"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
          <Button href="/contact" size="sm">
            Book Free Consultation
          </Button>
        </div>

        {/* mobile toggle */}
        <button
          className="grid h-11 w-11 place-items-center rounded-lg border-2 border-ink/15 text-ink lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <nav
              className="container flex flex-col gap-1 py-6"
              aria-label="Mobile"
            >
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block border-b border-ink/10 py-4 font-display text-2xl font-semibold",
                      isActive(item.href) ? "text-marker" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="flex flex-col gap-1 py-2 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 font-hand text-lg text-ink-soft"
                        >
                          → {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Button href="/contact" size="lg">
                  Book Free Consultation
                </Button>
                <Button href={siteConfig.phoneHref} variant="outline" size="lg">
                  <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

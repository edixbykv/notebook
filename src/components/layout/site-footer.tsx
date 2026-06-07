import Link from "next/link";
import { Phone, Mail, Globe, ArrowUpRight, MapPin } from "lucide-react";
import { mainNav, services, siteConfig } from "@/lib/site";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { StarDoodle } from "@/components/notebook/doodles";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-2 border-dashed border-ink/15 bg-paper-deep">
      {/* CTA strip */}
      <div className="container relative pt-16">
        <div className="relative mx-auto max-w-4xl rounded-2xl bg-ink px-6 py-10 text-center text-paper shadow-paper-lift sm:px-12 sm:py-14">
          <StarDoodle
            color="#FFF176"
            className="animate-bob absolute -left-4 -top-4 h-10 w-10 sm:left-8"
            draw={false}
          />
          <StarDoodle
            color="#E53935"
            className="animate-sway absolute -right-3 bottom-6 h-8 w-8"
            draw={false}
          />
          <p className="font-hand text-2xl font-bold text-sticky">
            Let&apos;s build something extraordinary
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Ready to grow your business?
          </h2>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="primary" size="lg">
              Book a Free Consultation
            </Button>
            <Button
              href={siteConfig.phoneHref}
              variant="sticky"
              size="lg"
            >
              <Phone className="h-4 w-4" /> {siteConfig.phoneDisplay}
            </Button>
          </div>
        </div>
      </div>

      {/* links */}
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            {siteConfig.tagline}. We help businesses grow faster with AI,
            websites, marketing, and automation.
          </p>
          <p className="mt-4 font-hand text-lg font-bold text-marker-deep">
            &ldquo;{siteConfig.principle}&rdquo;
          </p>
        </div>

        <nav aria-label="Footer — pages">
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-ink">
            Explore
          </h3>
          <ul className="space-y-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-soft transition-colors hover:text-marker"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer — services">
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-ink">
            Services
          </h3>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-ink-soft transition-colors hover:text-marker"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-ink">
            Get in touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 text-ink-soft transition-colors hover:text-marker"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.emailHref}
                className="flex items-center gap-2 text-ink-soft transition-colors hover:text-marker"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.url}
                className="flex items-center gap-2 text-ink-soft transition-colors hover:text-marker"
              >
                <Globe className="h-4 w-4 shrink-0" />
                kvai.in
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
            <li className="flex items-center gap-2 text-ink-soft">
              <MapPin className="h-4 w-4 shrink-0" />
              {siteConfig.address.locality}, {siteConfig.address.countryName}
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-ink/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-soft sm:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-hand text-sm">
            Built with care — and a little AI. 🖊️
          </p>
        </div>
      </div>
    </footer>
  );
}

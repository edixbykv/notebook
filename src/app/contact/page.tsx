import type { Metadata } from "next";
import { Phone, Mail, Globe, MapPin, Clock, MessageCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { Reveal } from "@/components/notebook/reveal";
import { StickyNote } from "@/components/notebook/sticky-note";
import { HandArrow } from "@/components/notebook/doodles";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Book a free consultation with KVai Solutions. Call +91 76781 20635 or send us a message — we'll reply within one business day with a clear growth plan.",
  keywords: ["contact KVai", "free consultation", "book a call"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const contactCards = [
  {
    icon: Phone,
    label: "Call us",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: siteConfig.whatsapp,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: siteConfig.emailHref,
  },
  {
    icon: Globe,
    label: "Website",
    value: "kvai.in",
    href: siteConfig.url,
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Let's talk"
        title="Book your free consultation"
        description="Tell us where you want to take your business. We'll come back with a clear, no-pressure plan — usually within one business day."
        crumbs={crumbs}
      />

      <Section className="bg-paper">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            {/* left: info */}
            <div>
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-ink">
                  Reach us directly
                </h2>
                <p className="mt-2 text-ink-soft">
                  Prefer to skip the form? Any of these work — pick whatever&apos;s
                  easiest for you.
                </p>
              </Reveal>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {contactCards.map((card, i) => {
                  const Icon = card.icon;
                  const external = card.href.startsWith("http");
                  return (
                    <Reveal key={card.label} delay={i * 0.06}>
                      <a
                        href={card.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-4 rounded-lg bg-paper-deep p-4 shadow-paper transition-all hover:-translate-y-0.5 hover:shadow-paper-lift"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-paper transition-colors group-hover:bg-marker">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide text-ink/50">
                            {card.label}
                          </div>
                          <div className="font-display font-bold text-ink">
                            {card.value}
                          </div>
                        </div>
                      </a>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={0.2}>
                <div className="mt-6 space-y-3 rounded-lg border-2 border-dashed border-ink/15 p-5">
                  <div className="flex items-center gap-2 text-sm text-ink-soft">
                    <Clock className="h-4 w-4 text-marker" />
                    <span>Mon–Sat, 9:00 AM – 7:00 PM IST</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-soft">
                    <MapPin className="h-4 w-4 text-marker" />
                    <span>
                      {siteConfig.address.locality},{" "}
                      {siteConfig.address.countryName} · Serving clients
                      worldwide
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="relative mt-8 hidden sm:block">
                  <StickyNote color="yellow" rotate="-3deg" className="max-w-xs">
                    <p className="font-hand text-2xl font-bold leading-tight">
                      The consultation is 100% free.
                    </p>
                    <p className="mt-1 text-sm text-ink/80">
                      Worst case, you leave with a clear action plan. No catch.
                    </p>
                  </StickyNote>
                  <HandArrow
                    color="#E53935"
                    className="absolute -right-4 -top-6 h-12 w-12 rotate-[160deg]"
                    draw={false}
                  />
                </div>
              </Reveal>
            </div>

            {/* right: form */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

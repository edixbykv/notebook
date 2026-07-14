import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Container } from "@/components/notebook/section";
import { Reveal } from "@/components/notebook/reveal";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  path: "/services",
  description:
    "Explore KVai Solutions' services: website development, social media growth, and AI automation — everything you need to grow your business faster.",
  keywords: ["website design", "social media marketing", "business automation"],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          ...services.map((s) =>
            serviceSchema({
              title: s.title,
              description: s.description,
              slug: s.slug,
            })
          ),
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title="Everything you need to grow — in one place"
        description="Three core services, designed to work brilliantly on their own or even better together. Pick your starting point."
        crumbs={crumbs}
      />

      <Section className="bg-paper">
        <Container>
          <div className="space-y-8">
            {services.map((service, i) => {
              const isInk = service.color === "ink";
              return (
                <Reveal key={service.slug} delay={i * 0.05}>
                  <div
                    className={cn(
                      "grid gap-8 rounded-2xl p-7 shadow-paper sm:p-10 lg:grid-cols-2 lg:items-center",
                      isInk ? "bg-ink text-paper" : "bg-paper-deep"
                    )}
                  >
                    <div className={cn(i % 2 === 1 && "lg:order-2")}>
                      <span
                        className={cn(
                          "font-marker text-5xl",
                          isInk ? "text-sticky" : "text-marker"
                        )}
                      >
                        {service.number}
                      </span>
                      <h2
                        className={cn(
                          "mt-2 font-display text-3xl font-bold",
                          isInk ? "text-paper" : "text-ink"
                        )}
                      >
                        {service.title}
                      </h2>
                      <p
                        className={cn(
                          "mt-3 text-base leading-relaxed",
                          isInk ? "text-paper/80" : "text-ink-soft"
                        )}
                      >
                        {service.description}
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
                        className={cn(
                          "group mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                          isInk
                            ? "bg-sticky text-ink"
                            : "bg-ink text-paper"
                        )}
                      >
                        {service.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    <ul
                      className={cn(
                        "grid gap-3 sm:grid-cols-2",
                        i % 2 === 1 && "lg:order-1"
                      )}
                    >
                      {service.features.map((f) => (
                        <li
                          key={f}
                          className={cn(
                            "flex items-start gap-2 rounded-lg p-3 text-sm",
                            isInk ? "bg-white/5" : "bg-paper"
                          )}
                        >
                          <Check
                            className={cn(
                              "mt-0.5 h-4 w-4 shrink-0",
                              isInk ? "text-sticky" : "text-marker"
                            )}
                            strokeWidth={3}
                          />
                          <span className={isInk ? "text-paper/90" : "text-ink"}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <FinalCtaSection />
    </>
  );
}

import { faqs as defaultFaqs } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { Underlined } from "@/components/notebook/highlight";
import { Accordion } from "@/components/notebook/accordion";
import { Button } from "@/components/ui/button";

export function FaqSection({
  items = defaultFaqs,
}: {
  items?: { q: string; a: string }[];
}) {
  return (
    <Section id="faq" className="bg-paper">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                eyebrow="Questions?"
                title={
                  <>
                    Things people{" "}
                    <Underlined color="#E53935">often ask</Underlined>
                  </>
                }
                description="Can't find your answer here? We're a quick call away — and the consultation is always free."
              />
              <div className="mt-6">
                <Button href="/contact">Ask us anything</Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-lg bg-paper-deep p-2 sm:p-6">
              <Accordion items={items} />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

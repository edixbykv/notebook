import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { Highlight } from "@/components/notebook/highlight";
import { ProjectsShowcase } from "./tablet-showcase";

export function PortfolioSection() {
  return (
    <Section id="portfolio" className="bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Proof, not promises"
            title={
              <>
                Live projects. <Highlight>Real businesses.</Highlight>
              </>
            }
            description="Hover any device to scroll the real, live website we designed and built — or tap through to see it in action."
          />
        </Reveal>

        <ProjectsShowcase className="mt-14" />
      </Container>
    </Section>
  );
}

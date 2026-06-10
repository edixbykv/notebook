import { Section, Container } from "@/components/notebook/section";
import { ProjectsShowcase } from "./tablet-showcase";

export function PortfolioGrid() {
  return (
    <Section className="bg-paper">
      <Container>
        <ProjectsShowcase all />
      </Container>
    </Section>
  );
}

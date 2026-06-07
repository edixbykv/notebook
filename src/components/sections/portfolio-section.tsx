import { portfolio } from "@/lib/site";
import { Section, Container } from "@/components/notebook/section";
import { SectionHeading } from "@/components/notebook/section-heading";
import { Reveal } from "@/components/notebook/reveal";
import { Highlight } from "@/components/notebook/highlight";
import { PortfolioCard } from "./portfolio-card";
import { Button } from "@/components/ui/button";

export function PortfolioSection() {
  const featured = portfolio.slice(0, 3);
  return (
    <Section id="portfolio" className="bg-paper">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Proof, not promises"
            title={
              <>
                Real businesses. <Highlight>Real results.</Highlight>
              </>
            }
            description="A peek into our notebook of recent projects — and the numbers that came out the other side."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <PortfolioCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="outline" size="lg">
            See the full portfolio
          </Button>
        </div>
      </Container>
    </Section>
  );
}

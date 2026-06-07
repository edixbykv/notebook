import { PageTransition } from "@/components/providers/page-transition";

/**
 * App Router `template.tsx` re-mounts its children on every navigation, which
 * (a) lets <PageTransition> replay the notebook page-turn, and (b) re-triggers
 * the scroll/whileInView animations on each page — marker underlines, sketch
 * arrows, sticky notes and doodles all draw themselves in again on entry.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StarDoodle, HandArrow } from "@/components/notebook/doodles";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden ruled-paper pt-20">
      <StarDoodle
        color="#E53935"
        className="absolute left-[12%] top-1/4 hidden h-10 w-10 animate-float sm:block"
        draw={false}
      />
      <div className="container relative text-center">
        <p className="font-marker text-[7rem] leading-none text-marker sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
          This page got erased.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Looks like this page was just a doodle that didn&apos;t make the final
          notebook. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" /> Back to home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact us
          </Button>
        </div>
        <HandArrow
          color="#111111"
          className="mx-auto mt-8 h-12 w-12 rotate-[200deg] opacity-70"
          draw={false}
        />
        <Link
          href="/portfolio"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors hover:text-marker"
        >
          <ArrowLeft className="h-4 w-4" /> Or browse our work
        </Link>
      </div>
    </section>
  );
}

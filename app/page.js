import { Hero } from "./components/Hero";
import { OpsStrip } from "./components/OpsStrip";
import { SiteFooter } from "./components/SiteFooter";
import { StickySocialBar } from "./components/StickySocialBar";

export default function Home() {
  return (
    <>
      <main id="main-content" className="flex min-h-0 flex-1 flex-col">
        <Hero />
        <section
          className="border-t border-white/10 px-6 py-12 md:px-10 md:py-16"
          aria-labelledby="work-with-us-heading"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="work-with-us-heading"
              className="font-display text-2xl tracking-tight text-zinc-100 md:text-3xl"
            >
              Why BimRoss exists
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
              We help Bittensor teams that want production discipline without bureaucracy. BimRoss
              is intentionally compact: one owner, fast decisions, tight feedback loops, and
              systems shaped by direct accountability.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-lg border border-white/15 bg-white/[0.03] p-4">
                <p className="font-semibold text-white">Single-person ownership</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  One accountable owner means less committee drag, tighter product judgment, and
                  faster execution.
                </p>
              </article>
              <article className="rounded-lg border border-white/15 bg-white/[0.03] p-4">
                <p className="font-semibold text-white">Operator proof</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  We build for real uptime, real incentives, and real production constraints, not
                  slide decks.
                </p>
              </article>
              <article className="rounded-lg border border-white/15 bg-white/[0.03] p-4">
                <p className="font-semibold text-white">Trillion-dollar ambition</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  We are building for a world where a single person can wield company-scale
                  leverage, and we want to be early to that curve.
                </p>
              </article>
            </div>
          </div>
        </section>
        <OpsStrip />
      </main>
      <footer className="relative z-20 flex shrink-0 flex-col" role="contentinfo">
        <StickySocialBar />
        <SiteFooter />
      </footer>
    </>
  );
}

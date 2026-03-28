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
              Who we help
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
              Bittensor teams that need dependable operations, secure execution paths, and faster
              iteration across miner and validator workflows.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <article className="rounded-lg border border-white/15 bg-white/[0.03] p-4">
                <p className="font-semibold text-white">What we do</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  Operate miner and validator infrastructure with production deployment discipline.
                </p>
              </article>
              <article className="rounded-lg border border-white/15 bg-white/[0.03] p-4">
                <p className="font-semibold text-white">How we prove it</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  We share operator updates in public so teams can see decisions and outcomes.
                </p>
              </article>
              <article className="rounded-lg border border-white/15 bg-white/[0.03] p-4">
                <p className="font-semibold text-white">Where to start</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  Follow updates, review products, then contact us for focused implementation.
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

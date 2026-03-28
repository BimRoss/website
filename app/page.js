import { Hero } from "./components/Hero";
import { SiteFooter } from "./components/SiteFooter";
import { StickySocialBar } from "./components/StickySocialBar";

export default function Home() {
  return (
    <>
      <main id="main-content" className="flex min-h-0 flex-1 flex-col bg-black">
        <Hero />
        <section
          className="border-t border-white/10 px-6 py-12 md:px-10 md:py-16"
          aria-labelledby="start-here"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              id="start-here"
              className="font-display text-2xl tracking-tight text-zinc-100 md:text-3xl"
            >
              Start here
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
              The fastest way to understand BimRoss is to look at the flagship product, a shipped
              automation product, and the founder behind the work.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <a
                href="https://subnetsignal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-white/[0.03] p-4 transition hover:border-white/25 hover:bg-white/[0.05]"
              >
                <p className="font-semibold text-white">Subnet Signal</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  Bittensor tooling for operators who want signal, not noise.
                </p>
              </a>
              <a
                href="https://getinvoicepilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-white/[0.03] p-4 transition hover:border-white/25 hover:bg-white/[0.05]"
              >
                <p className="font-semibold text-white">Invoice Pilot</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  Automation software for invoicing and operational admin workflows.
                </p>
              </a>
              <a
                href="https://grantfoster.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-white/[0.03] p-4 transition hover:border-white/25 hover:bg-white/[0.05]"
              >
                <p className="font-semibold text-white">Founder profile</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">
                  The personal site behind the company, with shipped work and public proof.
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative z-20 flex shrink-0 flex-col" role="contentinfo">
        <StickySocialBar />
        <SiteFooter />
      </footer>
    </>
  );
}

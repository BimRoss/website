import { Hero } from "./components/Hero";
import { StartHereCards } from "./components/StartHereCards";
import { SiteFooter } from "./components/SiteFooter";
import { StickySocialBar } from "./components/StickySocialBar";

export default function Home() {
  return (
    <>
      <main
        id="main-content"
        className="flex w-full flex-none flex-col bg-black md:min-h-0 md:flex-1 md:overflow-hidden"
      >
        {/* Desktop: fills viewport minus footer and vertically centers hero. Mobile: stack from top; page scrolls. */}
        <div className="flex flex-col max-md:justify-start md:min-h-0 md:flex-1 md:justify-center">
          <Hero />
        </div>
        <section
          className="hidden border-t border-white/10 px-6 py-12 md:px-10 md:py-16"
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
              Start with live signal, what is shipping next, and the founder behind the work.
            </p>
            <StartHereCards />
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

import { Hero } from "./components/Hero";
import { StartHereCards } from "./components/StartHereCards";
import { SiteFooter } from "./components/SiteFooter";
import { StickySocialBar } from "./components/StickySocialBar";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col md:min-h-0">
      <main
        id="main-content"
        className="flex w-full flex-1 flex-col max-md:bg-transparent md:bg-black md:min-h-0 md:overflow-hidden"
      >
        {/* Desktop: fills viewport minus footer and vertically centers hero. Mobile: spacer below hero shows backdrop; footer at bottom of viewport. */}
        <div className="flex flex-1 flex-col max-md:min-h-0">
          <div className="flex flex-col max-md:justify-start md:min-h-0 md:flex-1 md:justify-center">
            <Hero />
          </div>
          <div
            className="pointer-events-none max-md:min-h-[2rem] max-md:flex-1 max-md:shrink-0"
            aria-hidden
          />
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
      <footer
        className="relative z-20 mt-auto flex w-full shrink-0 flex-col max-md:pb-[env(safe-area-inset-bottom,0px)]"
        role="contentinfo"
      >
        <StickySocialBar />
        <SiteFooter />
      </footer>
    </div>
  );
}

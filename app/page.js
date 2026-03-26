import { Hero } from "./components/Hero";
import { SiteFooter } from "./components/SiteFooter";
import { StickySocialBar } from "./components/StickySocialBar";

export default function Home() {
  return (
    <>
      <main id="main-content" className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Hero />
      </main>
      <footer className="relative z-20 flex shrink-0 flex-col" role="contentinfo">
        <StickySocialBar />
        <SiteFooter />
      </footer>
    </>
  );
}

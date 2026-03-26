import { Hero } from "./components/Hero";
import { SiteFooter } from "./components/SiteFooter";
import { StickySocialBar } from "./components/StickySocialBar";

export default function Home() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <Hero />
      <footer className="relative z-20 flex shrink-0 flex-col" role="contentinfo">
        <StickySocialBar />
        <SiteFooter />
      </footer>
    </div>
  );
}

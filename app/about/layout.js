import { SiteFooter } from "../components/SiteFooter";
import { StickySocialBar } from "../components/StickySocialBar";

export default function AboutLayout({ children }) {
  return (
    <div className="flex min-h-full flex-1 flex-col md:min-h-0">
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
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

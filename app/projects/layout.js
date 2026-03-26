import { SiteFooter } from "../components/SiteFooter";
import { StickySocialBar } from "../components/StickySocialBar";

export default function ProjectsLayout({ children }) {
  return (
    <>
      {children}
      <footer className="relative z-20 flex shrink-0 flex-col" role="contentinfo">
        <StickySocialBar />
        <SiteFooter />
      </footer>
    </>
  );
}

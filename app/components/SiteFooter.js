export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <div
      id="site-footer"
      className="relative z-10 shrink-0 border-t border-black/10 bg-gradient-to-b from-white/[0.16] via-white/[0.1] to-transparent px-5 py-2.5 backdrop-blur-sm backdrop-saturate-110 md:px-10 md:py-3"
    >
      <p className="text-center font-sans text-[10px] text-zinc-800 md:text-xs">
        © {year} BimRoss LLC. All rights reserved.
      </p>
    </div>
  );
}

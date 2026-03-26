import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <div
      id="site-footer"
      className="relative z-10 shrink-0 border-t border-white/10 bg-black px-5 py-2.5 md:px-10"
    >
      <nav
        aria-label="Site pages"
        className="mb-1.5 flex items-center justify-center gap-4 text-[10px] text-zinc-300 md:text-xs"
      >
        <Link
          href="/"
          className="underline-offset-2 hover:underline focus-visible:underline"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="underline-offset-2 hover:underline focus-visible:underline"
        >
          About
        </Link>
        <Link href="/projects" className="underline-offset-2 hover:underline focus-visible:underline">
          Projects
        </Link>
      </nav>
      <p className="text-center font-sans text-[10px] text-zinc-500 md:text-xs">
        © {year} BimRoss LLC. All rights reserved.
      </p>
    </div>
  );
}

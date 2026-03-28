"use client";

import Image from "next/image";
import { useRef } from "react";

import NetworkBackdrop from "./NetworkBackdrop";

const productCTAs = [
  { label: "See Subnet Signal", href: "https://subnetsignal.com" },
  { label: "Explore Invoice Pilot", href: "https://getinvoicepilot.com" },
  { label: "Talk to Founder", href: "mailto:grant@bimross.com?subject=Talk%20to%20BimRoss" },
  { label: "Founder Profile", href: "https://grantfoster.dev" },
];

function productCtaClassName() {
  return [
    "hero-cta product-cta inline-flex min-h-[52px] min-w-[12rem] items-center justify-center px-10 py-4",
    "border border-white/45 bg-gradient-to-br from-white/44 via-white/30 to-white/18",
    "shadow-[0_12px_36px_rgba(0,0,0,0.055),inset_0_1px_0_rgba(255,255,255,0.55)]",
    "backdrop-blur-md backdrop-saturate-115",
    "font-display text-sm font-semibold uppercase tracking-[0.18em] text-zinc-900",
    "transform-gpu transition-[transform,border-color,box-shadow,background-color,backdrop-filter,opacity]",
    "hover:border-white/60 hover:from-white/52 hover:via-white/36 hover:to-white/22",
    "hover:shadow-[0_18px_44px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.72)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900/40",
    "md:min-w-[14rem] md:px-12 md:py-5",
  ].join(" ");
}

export function Hero() {
  const networkRef = useRef(null);
  const ctaClass = productCtaClassName();

  return (
    <section
      className="relative flex min-h-0 flex-1 flex-col justify-start bg-white px-5 pt-6 pb-4 md:justify-center md:px-10 md:py-8 md:pb-8"
      aria-labelledby="hero-heading"
    >
      <div className="fixed inset-0 z-0">
        <NetworkBackdrop ref={networkRef} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_55%_at_50%_35%,rgba(0,0,0,0.045),transparent_60%)]"
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col md:block md:flex-none">
        <div className="hero-reveal flex min-h-0 flex-1 flex-col gap-6 md:h-auto md:flex-none md:flex-row md:items-center md:justify-between md:gap-12 md:gap-y-8 lg:gap-16">
          <div
            className="pointer-events-auto min-w-0 max-w-2xl shrink-0 text-left max-md:cursor-pointer max-md:active:opacity-[0.92] max-md:transition-opacity lg:max-w-3xl"
            onClick={(e) => {
              if (
                typeof window !== "undefined" &&
                window.matchMedia("(min-width: 768px)").matches
              ) {
                return;
              }
              networkRef.current?.triggerBurstAtClient(
                e.clientX,
                e.clientY,
              );
            }}
          >
            <p className="border-l-2 border-black/40 pl-4 font-mono text-[10px] font-medium leading-relaxed tracking-[0.2em] text-zinc-800 sm:text-xs sm:tracking-[0.18em]">
              founder-led operator leverage
            </p>
            <h1
              id="hero-heading"
              className="font-display mt-5 flex flex-row flex-wrap items-end gap-x-2 gap-y-1 sm:mt-7 sm:flex-nowrap sm:gap-x-3 md:gap-x-4"
            >
              <span className="sr-only">BimRoss</span>
              <Image
                src="/logo.png"
                alt="BimRoss wordmark"
                width={522}
                height={582}
                priority
                className="h-20 w-auto shrink-0 brightness-0 sm:h-24 md:h-28 lg:h-32"
              />
              <span
                className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-black md:text-7xl lg:text-8xl"
                aria-hidden
              >
                imRoss
              </span>
            </h1>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-zinc-900 md:mt-8 md:text-lg md:leading-relaxed lg:text-xl">
              BimRoss is a founder-led, single-person LLC building Bittensor
              infrastructure, AI products, and operator tooling for teams that
              need secure execution, reliable operations, and incentive
              alignment.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-2 text-sm font-medium text-zinc-800 sm:grid-cols-3">
              <li className="rounded border border-black/10 bg-white/65 px-3 py-2">
                Founder-led execution
              </li>
              <li className="rounded border border-black/10 bg-white/65 px-3 py-2">
                Secure execution + TEE workflows
              </li>
              <li className="rounded border border-black/10 bg-white/65 px-3 py-2">
                Fleet-based GitOps delivery
              </li>
            </ul>
          </div>

          <nav
            aria-label="Products and links"
            className="products-scroll products-reveal pointer-events-auto flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto overscroll-y-contain pb-1 sm:max-w-md md:h-auto md:w-auto md:flex-none md:shrink-0 md:items-end md:overflow-visible md:gap-5 md:pb-0"
          >
            {productCTAs.map((cta) => (
              <div key={cta.href} className="product-cta-shell">
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClass}
                >
                  {cta.label}
                </a>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

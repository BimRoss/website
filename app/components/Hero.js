"use client";

import { useCallback } from "react";
import Image from "next/image";
import NetworkBackdrop from "./NetworkBackdrop";
import { useSiteToast } from "./ToastProvider";

const productCTAs = [
  { kind: "toast", label: "Joanne", message: "Coming Soon!" },
  { kind: "link", label: "Invoice Pilot", href: "https://getinvoicepilot.com" },
  { kind: "link", label: "Subnet Signal", href: "https://subnetsignal.com" },
  { kind: "link", label: "Bittensor Agent", href: "https://x.com/subnet_signal" },
  { kind: "link", label: "Me", href: "https://grantfoster.dev" },
];

/** Dark canvas: low-opacity white + blur reads as frosted glass over the mesh */
const ctaClassName =
  "hero-cta inline-flex min-h-[52px] min-w-[12rem] items-center justify-center border border-white/28 bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-transparent px-10 py-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-zinc-50 shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md backdrop-saturate-150 transition hover:border-white/50 hover:from-white/[0.18] hover:via-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 md:min-w-[14rem] md:px-12 md:py-5";

/** Single-screen hero: mesh + BimRoss story + product CTAs (no page scroll). */
export function Hero() {
  const { showToast } = useSiteToast();

  const onJoanneClick = useCallback(() => showToast("Coming Soon!"), [showToast]);

  return (
    <>
      <section
        className="relative flex min-h-0 flex-1 flex-col justify-start px-5 pb-6 pt-[max(3rem,env(safe-area-inset-top,0px))] md:justify-center md:px-10 md:py-8 md:pb-8"
        aria-labelledby="hero-heading"
      >
      <div className="absolute inset-0 z-0">
        <NetworkBackdrop />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_55%_at_50%_35%,rgba(255,255,255,0.04),transparent_60%)]"
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col md:block md:flex-none">
        <div className="hero-reveal flex min-h-0 flex-1 flex-col gap-8 md:h-auto md:flex-none md:flex-row md:items-center md:justify-between md:gap-12 md:gap-y-8 lg:gap-16">
          <div className="pointer-events-auto min-w-0 max-w-2xl text-left lg:max-w-3xl">
            <p className="border-l-2 border-white/35 pl-4 font-mono text-[10px] font-medium leading-relaxed tracking-[0.2em] text-zinc-300 sm:text-xs sm:tracking-[0.18em]">
              Happy automations
            </p>
            <h1
              id="hero-heading"
              className="font-display mt-5 flex flex-row flex-wrap items-end gap-x-2 gap-y-1 sm:mt-7 sm:flex-nowrap sm:gap-x-3 md:gap-x-4"
            >
              <span className="sr-only">BimRoss LLC</span>
              <Image
                src="/logo.png"
                alt="BimRoss wordmark"
                width={522}
                height={582}
                priority
                className="h-20 w-auto shrink-0 sm:h-24 md:h-28 lg:h-32"
              />
              <span
                className="flex items-end gap-1.5 sm:gap-2 md:gap-2.5"
                aria-hidden
              >
                <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-5xl font-semibold leading-[0.95] tracking-tight text-transparent md:text-7xl lg:text-8xl">
                  imRoss
                </span>
                <span className="hero-brand-llc">LLC</span>
              </span>
            </h1>
            <p className="mt-5 font-sans text-base leading-relaxed text-zinc-400 md:mt-7 md:text-lg md:leading-relaxed lg:text-xl">
              We design, operate, and scale Bittensor infrastructure—from miner fleets to
              incentive design. We also do everything else.
            </p>
          </div>

          <nav
            aria-label="Products and links"
            className="products-scroll pointer-events-auto flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto overscroll-y-contain pb-1 sm:max-w-md md:h-auto md:w-auto md:flex-none md:shrink-0 md:items-end md:overflow-visible md:gap-5 md:pb-0"
          >
            {productCTAs.map((cta) => {
              if (cta.kind === "toast") {
                return (
                  <button
                    key={cta.label}
                    type="button"
                    onClick={onJoanneClick}
                    className={ctaClassName}
                  >
                    {cta.label}
                  </button>
                );
              }
              return (
                <a
                  key={cta.href}
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ctaClassName}
                >
                  {cta.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
      </section>
    </>
  );
}

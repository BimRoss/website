"use client";

import Image from "next/image";
import { useRef } from "react";

import NetworkBackdrop from "./NetworkBackdrop";
import { siteDescription } from "../data/site";

/** Sharp rectangular CTAs — black glass (translucent + blur) */
function productCtaClassName() {
  return [
    "product-cta inline-flex min-h-[48px] min-w-[11rem] items-center justify-center px-8 py-3.5",
    "font-display text-sm font-semibold uppercase tracking-[0.18em] text-zinc-50",
    "transform-gpu focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35",
    "md:min-h-[52px] md:min-w-[14rem] md:px-12 md:py-5",
  ].join(" ");
}

const heroLinks = [
  { label: "GitHub", href: "https://github.com/BimRoss/" },
  { label: "Make a Company", href: "https://makeacompany.ai" },
  {
    label: "How We Do It",
    href: "https://github.com/BimRoss/cursor-rules",
  },
  { label: "Founder", href: "https://grantfoster.dev" },
];

export function Hero() {
  const networkRef = useRef(null);

  return (
    <section
      className="relative w-full shrink-0 overflow-x-hidden overflow-y-visible bg-black px-5 pt-2.5 pb-6 md:px-10 md:py-8"
      aria-labelledby="hero-heading"
    >
      <div className="fixed inset-0 z-0">
        <NetworkBackdrop ref={networkRef} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_55%_at_50%_35%,rgba(255,255,255,0.04),transparent_60%)]"
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-6xl">
        <div className="hero-reveal flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-12 md:gap-y-8 lg:gap-16">
          <div
            className="pointer-events-auto min-w-0 max-w-2xl text-left max-md:cursor-pointer max-md:active:opacity-[0.92] max-md:transition-opacity md:flex md:shrink-0 md:flex-col md:justify-center lg:max-w-3xl"
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
            <p className="border-l-2 border-white/35 pl-4 font-mono text-[10px] font-medium leading-relaxed tracking-[0.2em] text-zinc-300 sm:text-xs sm:tracking-[0.18em]">
              Company as code
            </p>
            <h1
              id="hero-heading"
              className="font-display mt-3 flex flex-row flex-wrap items-end gap-x-1 gap-y-1 sm:mt-7 sm:flex-nowrap sm:gap-x-1.5 md:gap-x-2"
            >
              <span className="sr-only">BimRoss</span>
              <Image
                src="/logo.png"
                alt="BimRoss wordmark"
                width={522}
                height={582}
                priority
                className="h-20 w-auto shrink-0 sm:h-24 md:h-28 lg:h-32"
              />
              <span
                className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text font-display text-5xl font-semibold leading-[0.95] tracking-tight text-transparent md:text-7xl lg:text-8xl"
                aria-hidden
              >
                imRoss
              </span>
            </h1>
            <p className="mt-5 max-w-3xl font-sans text-[15px] leading-6 text-zinc-300 md:mt-8 md:text-lg md:leading-relaxed lg:text-xl">
              {siteDescription}
            </p>
          </div>

          <nav
            aria-label="Site links"
            className="products-scroll products-reveal pointer-events-auto flex w-full flex-col gap-3 pb-1 sm:max-w-md md:h-auto md:w-auto md:shrink-0 md:items-end md:gap-5 md:pb-0"
          >
            {heroLinks.map((cta) => {
              const ctaClass = productCtaClassName();
              return (
                <div key={`${cta.label}-${cta.href}`} className="product-cta-shell">
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass}
                  >
                    {cta.label}
                  </a>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </section>
  );
}

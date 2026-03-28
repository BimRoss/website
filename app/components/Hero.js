"use client";

import { useRef } from "react";
import Image from "next/image";
import NetworkBackdrop from "./NetworkBackdrop";
import { useSiteToast } from "./ToastProvider";

const productCTAs = [
  { kind: "link", label: "See Subnet Signal", href: "https://subnetsignal.com" },
  { kind: "link", label: "Explore Invoice Pilot", href: "https://getinvoicepilot.com" },
  { kind: "link", label: "Talk to Founder", href: "mailto:grant@bimross.com" },
  { kind: "link", label: "Founder Profile", href: "https://grantfoster.dev" },
];

/** Dark canvas: frosted glass — fuller fill + thin white rim */
const ctaClassName = [
  "hero-cta product-cta inline-flex min-h-[52px] min-w-[12rem] items-center justify-center px-10 py-4",
  "border border-white/30 bg-gradient-to-br from-white/[0.16] via-white/[0.08] to-white/[0.02]",
  "shadow-[0_14px_40px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.14)]",
  "backdrop-blur-md backdrop-saturate-150",
  "font-display text-sm font-semibold uppercase tracking-[0.18em] text-zinc-50",
  "transform-gpu transition-[transform,border-color,box-shadow,background-color,backdrop-filter,opacity]",
  "hover:border-white/45 hover:from-white/[0.22] hover:via-white/[0.12]",
  "hover:shadow-[0_18px_48px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.2)]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70",
  "md:min-w-[14rem] md:px-12 md:py-5",
].join(" ");

/** Single-screen hero: mesh + BimRoss story + product CTAs (no page scroll). */
export function Hero() {
  const { showToast } = useSiteToast();
  const networkRef = useRef(null);

  return (
    <>
      <section
        className="relative flex min-h-0 flex-1 flex-col justify-start px-5 pb-6 pt-[max(3rem,env(safe-area-inset-top,0px))] md:justify-center md:px-10 md:py-8 md:pb-8"
        aria-labelledby="hero-heading"
      >
      <div className="fixed inset-0 z-0">
        <NetworkBackdrop ref={networkRef} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_55%_at_50%_35%,rgba(255,255,255,0.04),transparent_60%)]"
        aria-hidden
      />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col md:block md:flex-none">
        <div className="hero-reveal flex min-h-0 flex-1 flex-col gap-8 md:h-auto md:flex-none md:flex-row md:items-center md:justify-between md:gap-12 md:gap-y-8 lg:gap-16">
          <div
            className="pointer-events-auto min-w-0 max-w-2xl text-left max-md:cursor-pointer max-md:active:opacity-[0.92] max-md:transition-opacity lg:max-w-3xl"
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
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-zinc-400 md:mt-7 md:text-lg md:leading-relaxed lg:text-xl">
              Founder-led Bittensor infrastructure, AI systems, and operator software. We build
              calm, reliable tooling with secure execution, clear incentives, and end-to-end
              delivery from local development through GitHub, CI/CD, and Kubernetes.
            </p>
            <div className="mt-5 max-w-xl rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.05] px-4 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-100/70 sm:text-[11px]">
                Long-horizon thesis
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200 md:text-base">
                We are building for a world where a single person can wield company-scale leverage.
              </p>
            </div>
            <ul className="mt-5 grid grid-cols-1 gap-2 text-sm font-medium text-zinc-200 sm:grid-cols-3">
              <li className="rounded border border-white/20 bg-white/[0.06] px-3 py-2">
                Founder-led execution
              </li>
              <li className="rounded border border-white/20 bg-white/[0.06] px-3 py-2">
                TEE-integrated workflows
              </li>
              <li className="rounded border border-white/20 bg-white/[0.06] px-3 py-2">
                Fleet-based GitOps delivery
              </li>
            </ul>
          </div>

          <nav
            aria-label="Products and links"
            className="products-scroll products-reveal pointer-events-auto flex min-h-0 w-full flex-1 flex-col gap-4 overflow-y-auto overscroll-y-contain pb-1 sm:max-w-md md:h-auto md:w-auto md:flex-none md:shrink-0 md:items-end md:overflow-visible md:gap-5 md:pb-0"
          >
            {productCTAs.map((cta) => {
              if (cta.kind === "toast") {
                return (
                  <div key={cta.label} className="product-cta-shell">
                    <button
                      type="button"
                      onClick={() => showToast(cta.message)}
                      className={ctaClassName}
                    >
                      {cta.label}
                    </button>
                  </div>
                );
              }
              return (
                <div key={cta.href} className="product-cta-shell">
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClassName}
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
    </>
  );
}

"use client";

import { useSiteToast } from "./ToastProvider";

export function StartHereCards() {
  const { showToast } = useSiteToast();
  const cardClass =
    "rounded-lg border border-white/15 bg-white/[0.03] p-4 text-left transition hover:border-white/25 hover:bg-white/[0.05]";

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <div className={cardClass}>
        <p className="font-semibold text-white">Subnet Signal</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">
          Bittensor tooling for operators who want signal, not noise.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          <a
            href="https://subnetsignal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            Open Subnet Signal
          </a>
          <a
            href="https://x.com/subnet_signal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
          >
            X Agent
          </a>
        </div>
      </div>
      <button type="button" className={cardClass} onClick={() => showToast("Coming soon")}>
        <p className="font-semibold text-white">Invoice Pilot</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">
          Happy automations for invoice workflows — shipping next.
        </p>
      </button>
      <button type="button" className={cardClass} onClick={() => showToast("Coming soon")}>
        <p className="font-semibold text-white">Thread Pilot</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">
          AI-assisted thread workflows — shipping next.
        </p>
      </button>
      <a
        href="https://grantfoster.dev"
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        <p className="font-semibold text-white">Founder</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">
          Grant Foster — profile, projects, and public proof.
        </p>
      </a>
    </div>
  );
}

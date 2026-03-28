"use client";

import { useSiteToast } from "./ToastProvider";

export function StartHereCards() {
  const { showToast } = useSiteToast();
  const cardClass =
    "rounded-lg border border-white/15 bg-white/[0.03] p-4 text-left transition hover:border-white/25 hover:bg-white/[0.05]";

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      <a
        href="https://subnetsignal.com"
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        <p className="font-semibold text-white">Subnet Signal</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-300">
          Bittensor tooling for operators who want signal, not noise.
        </p>
      </a>
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

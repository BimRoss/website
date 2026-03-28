const pillars = [
  {
    id: "subnet-42",
    label: "Subnet 42",
    title: "Protocol you can reason about",
    body:
      "We develop and operate Subnet 42—translating incentives, protocol behavior, and operational discipline so the network rewards the work that actually matters.",
  },
  {
    id: "tee-worker",
    label: "tee-worker",
    title: "Attested execution",
    body:
      "tee-worker runs sensitive computation inside a trusted execution environment: attested execution, defense-in-depth, and cryptographic assurance that what we report is what ran.",
  },
  {
    id: "invoice-pilot",
    label: "Invoice Pilot",
    title: "Invoicing without the busywork",
    body:
      "Invoice Pilot will turn quotes and time into clean invoices and follow-ups. Coming soon — same happy-automations posture as the rest of the stack.",
  },
  {
    id: "subnet-signal",
    label: "Subnet Signal",
    title: "Ecosystem intelligence",
    body:
      "Subnet Signal surfaces subnet-wide signals—attention, sentiment, and activity—so you can see what the market is pricing before the narrative catches up.",
    href: "https://subnetsignal.com",
    hrefLabel: "Open Subnet Signal",
  },
];

export function ProductPillars() {
  return (
    <section
      className="border-t border-white/10 bg-black/40 px-5 py-20 md:px-10 md:py-28"
      aria-labelledby="pillars-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <h2
            id="pillars-heading"
            className="font-display text-3xl font-normal tracking-tight text-zinc-50 md:text-4xl"
          >
            What we build
          </h2>
          <p className="mt-3 font-sans text-base leading-relaxed text-zinc-400 md:text-lg">
            Four product lines—one operating posture: ship infra and tools that stay honest under real-world pressure.
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 md:gap-8">
          {pillars.map((pillar, i) => (
            <li
              key={pillar.id}
              className={`group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-950/80 to-black p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:border-white/20 hover:shadow-[0_0_40px_-16px_rgba(255,255,255,0.12)] ${
                i === 1 ? "md:-translate-y-1" : ""
              }`}
            >
              <span className="font-mono text-xs font-medium uppercase tracking-wider text-zinc-300">
                {pillar.label}
              </span>
              <h3 className="mt-3 font-display text-xl font-normal text-zinc-50 md:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
                {pillar.body}
              </p>
              {pillar.href ? (
                <a
                  href={pillar.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 font-sans text-sm font-medium text-zinc-200 underline-offset-4 hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
                >
                  {pillar.hrefLabel}
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

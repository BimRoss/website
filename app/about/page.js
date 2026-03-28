import { JsonLd } from "../components/JsonLd";
import { buildAboutPageJsonLd } from "../data/site";

export const metadata = {
  title: "About",
  description:
    "About BimRoss: Bittensor, AI, distributed networks, blockchain incentives, full-stack software, and end-to-end delivery through GitHub, CI/CD, and Kubernetes.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildAboutPageJsonLd()} />
      <main id="main-content" className="min-h-dvh bg-black px-6 py-16 text-zinc-100 md:px-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">About BimRoss</h1>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            BimRoss has one goal — become the first trillion-dollar, single-person LLC. That was not
            possible before; it is now with AI. We build distributed infrastructure, agentic-powered
            backend systems, and self-improving UIs, with a focus on Bittensor and the idea of
            company-as-code.
          </p>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            Our work includes miner fleet operations, TEE-integrated workflows, blockchain
            incentive design, and products such as Subnet Signal (live), plus Invoice Pilot and
            Thread Pilot (coming soon).
          </p>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            End-to-end execution means connecting local AI-assisted development and code generation
            to GitHub, CI/CD, and Kubernetes—and encoding execution playbooks (including Alex
            Hormozi–style frameworks) into reusable agent rules so we compound speed safely.
          </p>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            BimRoss is intentionally built as a founder-led single-person LLC — proving
            company-scale leverage without proportional headcount.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-zinc-300">
            <li>Company: BimRoss LLC</li>
            <li>Founder: Grant Foster</li>
            <li>Primary domain: bimross.com</li>
            <li>Contact: grant@bimross.com</li>
          </ul>
        </div>
      </main>
    </>
  );
}

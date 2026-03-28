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
            BimRoss builds and operates Bittensor infrastructure with a focus on reliability,
            economic alignment, AI-assisted workflows, and practical operator tooling across
            distributed networks.
          </p>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            Our work includes miner fleet operations, TEE-integrated workflows, blockchain
            incentive design, and full-stack products such as Subnet Signal and Invoice Pilot
            (happy automations for back-office work).
          </p>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            End-to-end execution means connecting local AI-assisted development and code generation
            to GitHub, CI/CD, and Kubernetes—and encoding execution playbooks (including Alex
            Hormozi–style frameworks) into reusable agent rules so we compound speed safely.
          </p>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            BimRoss is intentionally built as a founder-led single-person LLC. Press and industry
            commentary have discussed a single-person trillion-dollar company; we aim to be that
            company.
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

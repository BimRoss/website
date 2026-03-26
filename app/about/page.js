import { JsonLd } from "../components/JsonLd";
import { buildAboutPageJsonLd } from "../data/site";

export const metadata = {
  title: "About",
  description:
    "About BimRoss: we design and operate Bittensor infrastructure, including miner fleets, TEE workflows, and incentive systems.",
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
            economic alignment, and practical operator tooling.
          </p>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            Our work includes miner fleet operations, TEE-integrated workflows, and incentive
            design across products such as Subnet Signal and Invoice Pilot.
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

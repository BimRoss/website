import { JsonLd } from "../components/JsonLd";
import { buildProjectsPageJsonLd, projects } from "../data/site";

export const metadata = {
  title: "Projects",
  description:
    "Projects built and operated by BimRoss: Subnet Signal, Invoice Pilot (happy automations), and related properties.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={buildProjectsPageJsonLd()} />
      <main id="main-content" className="min-h-dvh bg-black px-6 py-16 text-zinc-100 md:px-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">Projects</h1>
          <p className="text-base leading-relaxed text-zinc-300 md:text-lg">
            A concise directory of BimRoss projects and related properties.
          </p>
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.url} className="rounded border border-white/15 p-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-white underline-offset-2 hover:underline"
                >
                  {project.name}
                </a>
                <p className="mt-1 text-sm leading-relaxed text-zinc-300">{project.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

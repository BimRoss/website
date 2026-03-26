const projects = [
  {
    name: "Subnet Signal",
    url: "https://subnetsignal.com",
    description: "Bittensor tools and intelligence for subnet operators and builders.",
  },
  {
    name: "Invoice Pilot",
    url: "https://getinvoicepilot.com",
    description: "Automation for invoice workflows and operational admin.",
  },
  {
    name: "Grant Foster",
    url: "https://grantfoster.dev",
    description: "Founder profile, projects, and engineering background.",
  },
];

export const metadata = {
  title: "Projects",
  description:
    "Projects built and operated by BimRoss, including Subnet Signal and Invoice Pilot.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
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
  );
}

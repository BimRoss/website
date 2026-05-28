import { socials } from "./socials";

export const SITE_URL = "https://bimross.com";
export const SITE_NAME = "BimRoss";
export const ORG_NAME = "BimRoss LLC";

/** Default HTML `<title>`, Open Graph, and Twitter card title — keep in sync with `/llms.txt` and `siteProfile.siteTitle`. */
export const siteTitle = "BimRoss | Company as code";

export const siteDescription =
  "Building the world's first billion-dollar company with one human. Company as code. AI agents that live in Slack — flagship product makeacompany.ai.";

/** Shorter HTML meta description (~155 chars) — full narrative stays in JSON-LD, profile.json, and llms.txt */
export const metaDescription =
  "Company as code. One human running a billion-dollar company on a workforce of Slack-native AI agents. Flagship: makeacompany.ai ($99/mo Claude in Slack).";

export const ogDescription =
  "Billion-dollar company, one human. Company as code — AI agents that live in Slack. See makeacompany.ai.";

const sameAs = [
  ...socials.flatMap((entry) =>
    typeof entry.href === "string" && /^https?:\/\//.test(entry.href) ? [entry.href] : [],
  ),
  "https://makeacompany.ai",
  "https://subnetsignal.com",
  "https://grantfoster.dev",
];

/** Public project directory — used by /projects, JSON-LD ItemList, and /projects.json */
export const projects = [
  {
    name: "makeacompany.ai",
    url: "https://makeacompany.ai",
    description:
      "Flagship product — Slack-native AI team for $99/mo. Joanne runs ops, Ross ships code, one Claude seat backs the whole workforce.",
  },
  {
    name: "Subnet Signal",
    url: "https://subnetsignal.com",
    description:
      "Bittensor subnet intelligence — agentic backend + D3 visualizer for subnet operators and builders.",
  },
  {
    name: "Grant Foster",
    url: "https://grantfoster.dev",
    description: "Founder profile, projects, and engineering background.",
  },
];

/** Machine-readable profile for agents and tools (mirrors /profile.json). */
export const siteProfile = {
  type: "Organization",
  name: ORG_NAME,
  brand: SITE_NAME,
  siteTitle,
  url: SITE_URL,
  description: siteDescription,
  email: "grant@bimross.com",
  founder: {
    type: "Person",
    name: "Grant Foster",
    url: "https://grantfoster.dev",
  },
  sameAs,
  focus: [
    "company-as-code",
    "Slack-native AI agents",
    "agent orchestration (claude-code-based workforce)",
    "single-operator leverage at company scale",
    "end-to-end delivery from local AI-assisted development through GitHub, CI/CD, and Kubernetes",
    "happy automations",
  ],
  projects: projects.map((p) => ({
    name: p.name,
    url: p.url,
    description: p.description,
  })),
  endpoints: {
    profileJson: `${SITE_URL}/profile.json`,
    projectsJson: `${SITE_URL}/projects.json`,
    llmsTxt: `${SITE_URL}/llms.txt`,
    llmsFullTxt: `${SITE_URL}/llms-full.txt`,
  },
  ambition:
    "Building the world's first billion-dollar company with one human. Company as code — encode the operator into agents that live in Slack and ship work.",
  e2eDefinition:
    "E2E means owning the path from local AI-assisted development through GitHub, CI/CD, and Kubernetes without handoff gaps.",
};

/**
 * Root layout JSON-LD — emitted as a literal <script type="application/ld+json"> in HTML
 * so crawlers and “readiness” scanners see classic structured data.
 */
export function buildRootJsonLd() {
  const logoUrl = `${SITE_URL}/icon`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: siteTitle,
        description: siteDescription,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: ORG_NAME,
        legalName: ORG_NAME,
        url: SITE_URL,
        description: siteDescription,
        email: "grant@bimross.com",
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          contentUrl: logoUrl,
        },
        sameAs,
        founder: {
          "@type": "Person",
          name: "Grant Foster",
          url: "https://grantfoster.dev",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "grant@bimross.com",
          availableLanguage: "English",
        },
        knowsAbout: [
          "Slack-native AI agents",
          "Claude Code agent orchestration",
          "company-as-code",
          "single-operator company scaling",
          "AI workforce design",
          "MCP servers",
          "agentic infrastructure",
          "full-stack development",
          "GitHub",
          "CI/CD",
          "Kubernetes",
          "GitOps",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: `${SITE_NAME} — Home`,
        description: siteDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects`,
        name: "BimRoss projects and properties",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          item: {
            "@type": "WebApplication",
            name: p.name,
            url: p.url,
            description: p.description,
          },
        })),
      },
    ],
  };
}

export function buildAboutPageJsonLd() {
  const url = `${SITE_URL}/about`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "About BimRoss",
        description:
          "About BimRoss LLC: company-as-code, single-operator leverage, and a Slack-native AI workforce. Flagship product makeacompany.ai; agentic infrastructure shipped end-to-end through GitOps.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About", item: url },
        ],
      },
    ],
  };
}

export function buildProjectsPageJsonLd() {
  const url = `${SITE_URL}/projects`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: "BimRoss projects",
        description:
          "Directory of BimRoss properties: makeacompany.ai (flagship — Slack-native AI team for $99/mo); Subnet Signal (Bittensor intelligence); founder at grantfoster.dev.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Projects", item: url },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          item: {
            "@type": "WebApplication",
            name: p.name,
            url: p.url,
            description: p.description,
          },
        })),
      },
    ],
  };
}

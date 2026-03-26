import { socials } from "./socials";

export const SITE_URL = "https://bimross.com";
export const SITE_NAME = "BimRoss";
export const ORG_NAME = "BimRoss LLC";

export const siteDescription =
  "BimRoss designs, operates, and scales Bittensor infrastructure—from miner fleets to incentive design—including Subnet 42, tee-worker TEE execution, and Subnet Signal.";

export const ogDescription =
  "Bittensor infrastructure from miners to incentives—Subnet 42, TEE execution, Subnet Signal.";

const sameAs = [
  ...socials.flatMap((entry) =>
    typeof entry.href === "string" && /^https?:\/\//.test(entry.href) ? [entry.href] : [],
  ),
  "https://subnetsignal.com",
  "https://getinvoicepilot.com",
  "https://grantfoster.dev",
];

/** Public project directory — used by /projects, JSON-LD ItemList, and /projects.json */
export const projects = [
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

/** Machine-readable profile for agents and tools (mirrors /profile.json). */
export const siteProfile = {
  type: "Organization",
  name: ORG_NAME,
  brand: SITE_NAME,
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
    "Bittensor infrastructure",
    "miner operations",
    "TEE execution",
    "incentive design",
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
  },
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
        name: SITE_NAME,
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
          "Bittensor",
          "Subnet 42",
          "TEE",
          "cryptocurrency mining infrastructure",
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
          "About BimRoss LLC: Bittensor infrastructure, miner fleets, TEE workflows, and incentive systems.",
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
          "Directory of projects built and operated by BimRoss, including Subnet Signal and Invoice Pilot.",
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

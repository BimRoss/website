import { IBM_Plex_Sans, Syne } from "next/font/google";
import Script from "next/script";

import { JsonLd } from "./components/JsonLd";
import { buildRootJsonLd, metaDescription, ogDescription } from "./data/site";
import { ToastProvider } from "./components/ToastProvider";
import "./globals.css";

const syne = Syne({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const siteUrl = "https://bimross.com";
const siteName = "BimRoss";
const siteTitle = "BimRoss — Bittensor, AI & company-as-code";
const ogImagePath = "/opengraph-image";

const rootJsonLd = buildRootJsonLd();

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  applicationName: siteName,
  category: "technology",
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/icon", type: "image/png" }],
  },
  title: {
    default: siteTitle,
    template: "%s · BimRoss",
  },
  description: metaDescription,
  keywords: [
    "Bittensor",
    "AI",
    "artificial intelligence",
    "distributed networks",
    "blockchain",
    "full stack",
    "end-to-end",
    "GitHub",
    "CI/CD",
    "Kubernetes",
    "mining",
    "validators",
    "Subnet 42",
    "TEE",
    "Subnet Signal",
    "BimRoss",
  ],
  openGraph: {
    title: siteTitle,
    description: ogDescription,
    url: siteUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: "BimRoss - Bittensor, AI, distributed systems, and full-stack infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: ogDescription,
    images: [ogImagePath],
    creator: "@subnet_signal",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  const gaMeasurementID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${syne.variable} ${ibmPlex.variable} h-full overflow-hidden bg-black text-zinc-50`}
    >
      <body
        className="relative z-0 h-dvh overflow-hidden bg-black text-zinc-50 antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-[10001] bg-black px-4 py-2 text-sm text-white ring-1 ring-white/20 focus:not-sr-only focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Skip to main content
        </a>
        <JsonLd data={rootJsonLd} />
        <ToastProvider>
          <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden md:overflow-x-hidden md:overflow-y-auto">
            {children}
          </div>
        </ToastProvider>
        {gaMeasurementID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaMeasurementID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}

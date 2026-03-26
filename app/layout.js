import { IBM_Plex_Sans, Syne } from "next/font/google";
import Script from "next/script";
import { ToastProvider } from "./components/ToastProvider";
import "./globals.css";

/** Display: geometric, high-contrast — avoids generic serif “startup” look */
const syne = Syne({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
  display: "swap",
});

const siteUrl = "https://bimross.com";

const siteDescription =
  "BimRoss designs, operates, and scales Bittensor infrastructure—from miner fleets to incentive design—including Subnet 42, tee-worker TEE execution, and Subnet Signal.";

const ogDescription =
  "Bittensor infrastructure from miners to incentives—Subnet 42, TEE execution, Subnet Signal.";

const sameAs = [
  siteUrl,
  "https://subnetsignal.com",
  "https://getinvoicepilot.com",
  "https://grantfoster.dev",
  "https://x.com/subnet_signal",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "BimRoss",
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "BimRoss LLC",
      url: siteUrl,
      description: siteDescription,
      sameAs,
    },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  title: {
    default: "BimRoss - Bittensor Infrastructure",
    template: "%s · BimRoss",
  },
  description: siteDescription,
  keywords: [
    "Bittensor",
    "mining",
    "validators",
    "Subnet 42",
    "TEE",
    "Subnet Signal",
    "BimRoss",
  ],
  openGraph: {
    title: "BimRoss - Bittensor Infrastructure",
    description: ogDescription,
    url: siteUrl,
    siteName: "BimRoss",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 522,
        height: 582,
        alt: "BimRoss",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BimRoss - Bittensor Infrastructure",
    description: ogDescription,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  const gaMeasurementID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${syne.variable} ${ibmPlex.variable} h-full overflow-hidden`}
    >
      <body className="relative z-0 h-dvh overflow-hidden bg-[#000000] antialiased">
        <Script
          id="ld-json-bimross"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <ToastProvider>
          <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden">
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

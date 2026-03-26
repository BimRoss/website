import { IBM_Plex_Sans, Syne } from "next/font/google";
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

export const metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  title: {
    default: "BimRoss - Bittensor Infrastructure",
    template: "%s · BimRoss",
  },
  description:
    "BimRoss designs, operates, and scales Bittensor infrastructure—from miner fleets to owner incentive design—including Subnet 42, tee-worker TEE execution, and Subnet Signal.",
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
    description:
      "Bittensor infrastructure from miners to owner incentives—Subnet 42, TEE execution, Subnet Signal.",
    url: siteUrl,
    siteName: "BimRoss",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BimRoss - Bittensor Infrastructure",
    description:
      "Bittensor infrastructure from miners to owner incentives—Subnet 42, TEE execution, Subnet Signal.",
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
  return (
    <html
      lang="en"
      className={`${syne.variable} ${ibmPlex.variable} h-full overflow-hidden`}
    >
      <body className="relative z-0 h-dvh overflow-hidden bg-[#000000] antialiased">
        <ToastProvider>
          <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden">
            {children}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}

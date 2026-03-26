/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  /** Browsers / defaults often request `/icon.png`; we serve the same asset as `metadata.icons`. */
  async rewrites() {
    return [{ source: "/icon.png", destination: "/logo.png" }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
        ],
      },
    ];
  },
};

export default nextConfig;

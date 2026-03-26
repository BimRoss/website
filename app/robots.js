const siteUrl = "https://bimross.com";

/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).host,
  };
}

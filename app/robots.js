/** @returns {import("next").MetadataRoute.Robots} */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://bimross.com/sitemap.xml",
    host: "bimross.com",
  };
}

const siteUrl = "https://bimross.com";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

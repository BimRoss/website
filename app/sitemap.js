/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  return [
    {
      url: "https://bimross.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

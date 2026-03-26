/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  const baseUrl = "https://bimross.com";
  const lastModified = new Date();

  return ["/", "/about", "/projects"].map((path, index) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}

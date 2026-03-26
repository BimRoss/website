export const dynamic = "force-static";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  const baseUrl = "https://bimross.com";
  const lastModified = new Date();

  const paths = [
    "/",
    "/about",
    "/projects",
    "/profile.json",
    "/projects.json",
  ];

  return paths.map((path, index) => ({
    url: `${baseUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path.endsWith(".json") ? 0.5 : 0.8,
  }));
}

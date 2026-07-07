import { SITE } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getAllProjectSlugs } from "@/lib/content";

export default function sitemap() {
  const staticPaths = ["", "/about", "/projets", "/contact"];
  const slugs = getAllProjectSlugs();
  const now = new Date();
  const entries = [];

  const withAlternates = (path) => ({
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE.url}/${l}${path}`])
    ),
  });

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
        alternates: withAlternates(path),
      });
    }
    for (const slug of slugs) {
      const path = `/projets/${slug}`;
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6,
        alternates: withAlternates(path),
      });
    }
  }

  return entries;
}

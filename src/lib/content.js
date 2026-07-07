import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

// Ordered list of project categories (keys map to i18n `categories.*`).
export const CATEGORIES = [
  "web",
  "cyber",
  "ai",
  "devops",
  "software",
  "web3",
  "games",
  "academic",
];

/** Resolve a localized field ({fr, en}) or return the value as-is. */
export function loc(value, locale) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[locale] ?? value.fr ?? Object.values(value)[0];
  }
  return value;
}

/** Read + parse every JSON file in content/projects. */
function readRawProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, f), "utf8")));
}

/** All projects, localized and sorted (order asc, then date desc). */
export function getAllProjects(locale) {
  return readRawProjects()
    .map((p) => localizeProject(p, locale))
    .sort((a, b) => {
      const oa = a.order ?? 999;
      const ob = b.order ?? 999;
      if (oa !== ob) return oa - ob;
      return (b.date || "").localeCompare(a.date || "");
    });
}

export function getFeaturedProjects(locale, limit = 3) {
  return getAllProjects(locale)
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProject(slug, locale) {
  const raw = readRawProjects().find((p) => p.slug === slug);
  return raw ? localizeProject(raw, locale) : null;
}

export function getAllProjectSlugs() {
  return readRawProjects().map((p) => p.slug);
}

function localizeProject(p, locale) {
  return {
    slug: p.slug,
    category: p.category,
    order: p.order,
    featured: !!p.featured,
    date: p.date || null,
    title: loc(p.title, locale),
    description: loc(p.description, locale),
    tags: p.tags || [],
    softSkills: loc(p.softSkills, locale) || [],
    link: p.link || null,
    repo: p.repo || null,
    cover: p.cover || null,
    images: p.images || [],
  };
}

/** Profile, with localized fields resolved for the given locale. */
export function getProfile(locale) {
  const raw = JSON.parse(
    fs.readFileSync(path.join(CONTENT_DIR, "profile.json"), "utf8")
  );
  return {
    ...raw,
    role: loc(raw.role, locale),
    shortBio: loc(raw.shortBio, locale),
    longBio: loc(raw.longBio, locale),
    experience: (raw.experience || []).map((e) => ({
      ...e,
      role: loc(e.role, locale),
      period: loc(e.period, locale),
      description: loc(e.description, locale),
      highlight: e.highlight
        ? { ...e.highlight, title: loc(e.highlight.title, locale) }
        : null,
    })),
    education: (raw.education || []).map((e) => ({
      ...e,
      degree: loc(e.degree, locale),
      period: loc(e.period, locale),
    })),
    skills: (raw.skills || []).map((s) => ({
      category: loc(s.category, locale),
      items: s.items,
    })),
  };
}

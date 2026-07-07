export const SITE = {
  // Override with NEXT_PUBLIC_SITE_URL (e.g. http://localhost:3000 in CI /
  // Lighthouse, the real domain in production).
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dorismond.fr",
  name: "Samuel Dorismond",
  title: {
    fr: "Samuel Dorismond - Ingénieur Cybersécurité & Développeur Web",
    en: "Samuel Dorismond - Cybersecurity Engineer & Web Developer",
  },
  description: {
    fr: "Portfolio de Samuel Dorismond, élève-ingénieur à l'EPITA et apprenti Ingénieur Cybersécurité chez Cyber Test Systems. Développement web, IA, DevOps et cybersécurité.",
    en: "Portfolio of Samuel Dorismond, engineering student at EPITA and Cybersecurity Engineering apprentice at Cyber Test Systems. Web development, AI, DevOps and cybersecurity.",
  },
};

/**
 * Build correct per-page alternates: a self-referencing canonical and
 * fr/en hreflang links for the SAME path.
 * @param {string} locale current locale
 * @param {string} path path after the locale, e.g. "" or "/projets" or "/projets/aloqas-qa"
 */
export function alternatesFor(locale, path = "") {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      fr: `/fr${path}`,
      en: `/en${path}`,
    },
  };
}

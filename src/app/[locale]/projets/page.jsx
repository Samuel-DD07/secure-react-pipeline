import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAllProjects, CATEGORIES } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ProjectsGrid from "@/components/ProjectsGrid";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/projets"),
  };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projects" });
  const projects = getAllProjects(locale);

  return (
    <div className="container-page py-16 sm:py-24">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-muted">{t("intro")}</p>
      </header>
      <ProjectsGrid projects={projects} categories={CATEGORIES} />
    </div>
  );
}

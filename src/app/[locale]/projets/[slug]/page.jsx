import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getProject, getAllProjectSlugs } from "@/lib/content";
import { SITE, alternatesFor } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug, locale);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: alternatesFor(locale, `/projets/${slug}`),
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug, locale);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "project" });
  const tc = await getTranslations({ locale, namespace: "categories" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: { "@type": "Person", name: SITE.name },
    url: project.link || `${SITE.url}/${locale}/projets/${project.slug}`,
  };

  return (
    <article className="container-page max-w-4xl py-16 sm:py-24">
      <JsonLd data={jsonLd} />

      <Link
        href="/projets"
        className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <FiArrowLeft /> {t("back")}
      </Link>

      <span className="pill mb-4 block w-fit text-accent">
        {tc(project.category)}
      </span>
      <h1 className="text-4xl font-bold sm:text-5xl">{project.title}</h1>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-semibold text-muted">
          {t("descriptionTitle")}
        </h2>
        <p className="text-lg leading-relaxed">{project.description}</p>
      </section>

      {project.tags.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-muted">
            {t("hardSkillsTitle")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.softSkills.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-muted">
            {t("softSkillsTitle")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.softSkills.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {project.images.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-muted">
            {t("galleryTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.images.map((img, i) => (
              <a
                key={img}
                href={img}
                target="_blank"
                rel="noreferrer"
                className="card group relative aspect-video overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${project.title} - ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </a>
            ))}
          </div>
        </section>
      )}

      {project.link && (
        <div className="mt-12">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            {t("view")} <FiExternalLink />
          </a>
        </div>
      )}
    </article>
  );
}

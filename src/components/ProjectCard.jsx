import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ProjectCover from "./ProjectCover";

export default function ProjectCard({ project, priority = false }) {
  const tc = useTranslations("categories");

  return (
    <Link
      href={`/projets/${project.slug}`}
      className="group card card-hover flex flex-col overflow-hidden"
    >
      <ProjectCover
        cover={project.cover}
        title={project.title}
        tags={project.tags}
        priority={priority}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="pill self-start !py-0.5 text-accent">
          {tc(project.category)}
        </span>
        <h3 className="font-heading text-lg font-semibold leading-snug">
          {project.title}
        </h3>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

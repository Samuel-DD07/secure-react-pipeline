"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid({ projects, categories }) {
  const t = useTranslations("projects");
  const tc = useTranslations("categories");
  const [active, setActive] = useState("all");

  // Only show filter pills for categories that actually have projects.
  const usedCategories = useMemo(
    () => categories.filter((c) => projects.some((p) => p.category === c)),
    [categories, projects]
  );

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [projects, active]
  );

  const pill = (key, label) => (
    <button
      key={key}
      type="button"
      onClick={() => setActive(key)}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
        active === key
          ? "gradient-accent text-white"
          : "border border-border text-muted hover:text-fg"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {pill("all", t("all"))}
        {usedCategories.map((c) => pill(c, tc(c)))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted">{t("empty")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={i < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}

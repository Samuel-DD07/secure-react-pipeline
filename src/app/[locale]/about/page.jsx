import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/content";
import { alternatesFor } from "@/lib/site";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const profile = getProfile(locale);
  return {
    title: t("title"),
    description: profile.shortBio,
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const profile = getProfile(locale);

  return (
    <div className="container-page max-w-4xl py-16 sm:py-24">
      {/* Intro */}
      <header className="flex flex-col items-center text-center">
        <div className="relative h-40 w-40 overflow-hidden rounded-full border border-border grayscale">
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl">{profile.name}</h1>
        <p className="mt-3 text-lg text-accent">{profile.role}</p>
      </header>

      <section className="mt-14">
        <h2 className="mb-6 text-center text-2xl font-bold">
          {t("presentationTitle")}
        </h2>
        <div className="space-y-4">
          {profile.longBio.map((p, i) => (
            <p
              key={i}
              className="rounded-2xl border border-border bg-surface p-5 leading-relaxed text-muted"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">{t("experienceTitle")}</h2>
        <ol className="relative border-l border-border pl-8">
          {profile.experience.map((exp, i) => (
            <li key={i} className="mb-10 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full gradient-accent" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-heading text-lg font-semibold">
                  {exp.role}
                </h3>
                <span className="text-sm text-muted">{exp.period}</span>
              </div>
              <p className="text-accent">
                {exp.company}
                {exp.location ? ` · ${exp.location}` : ""}
              </p>
              <p className="mt-3 leading-relaxed text-muted">
                {exp.description}
              </p>
              {exp.highlight?.photos?.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 text-sm font-semibold">
                    {exp.highlight.title}
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {exp.highlight.photos.map((src, j) => (
                      <div
                        key={j}
                        className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border"
                      >
                        <Image
                          src={src}
                          alt={exp.highlight.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 200px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">{t("educationTitle")}</h2>
        <ol className="relative border-l border-border pl-8">
          {profile.education.map((ed, i) => (
            <li key={i} className="mb-10 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-heading text-lg font-semibold">
                  {ed.degree}
                </h3>
                <span className="text-sm text-muted">{ed.period}</span>
              </div>
              <p className="text-muted">{ed.school}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">{t("skillsTitle")}</h2>
        <div className="space-y-6">
          {profile.skills.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 font-heading text-base font-semibold text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

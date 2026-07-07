import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getProfile, getFeaturedProjects } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { FiArrowRight } from "react-icons/fi";

const DOMAINS = ["cyber", "web", "ai", "devops"];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { alternates: alternatesFor(locale, "") };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const profile = getProfile(locale);
  const featured = getFeaturedProjects(locale, 3);

  return <HomeContent profile={profile} featured={featured} />;
}

function HomeContent({ profile, featured }) {
  const t = useTranslations("home");
  const tc = useTranslations("categories");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-accent-from/30 to-accent-to/20 blur-[120px] animate-blob"
        />
        <div className="container-page relative grid min-h-[calc(100vh-4rem)] items-center gap-12 py-24 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Text column */}
          <div className="flex flex-col">
            <Reveal>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
                {profile.role}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
                {profile.name}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {profile.shortBio}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/projets" className="btn-primary">
                  {t("ctaProjects")} <FiArrowRight />
                </Link>
                <Link href="/contact" className="btn-outline">
                  {t("ctaContact")}
                </Link>
              </div>
            </Reveal>

            {/* Domains */}
            <Reveal delay={0.2}>
              <div className="mt-14 flex flex-wrap gap-3">
                {DOMAINS.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-border bg-surface/50 px-4 py-2 text-sm font-medium text-muted"
                  >
                    {tc(d)}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Photo column */}
          <Reveal delay={0.1} className="order-first flex justify-center lg:order-none">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-full bg-gradient-to-br from-accent-from/25 to-accent-to/20 blur-3xl"
              />
              <div className="relative h-56 w-56 overflow-hidden rounded-full border border-border shadow-2xl sm:h-72 sm:w-72 lg:h-[22rem] lg:w-[22rem]">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 1024px) 288px, 352px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="container-page py-24">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold">{t("featuredTitle")}</h2>
                <p className="mt-2 text-muted">{t("featuredSubtitle")}</p>
              </div>
              <Link
                href="/projets"
                className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-accent hover:opacity-80 sm:flex"
              >
                {t("seeAll")} <FiArrowRight />
              </Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} priority={i < 3} />
            ))}
          </div>
          <div className="mt-10 sm:hidden">
            <Link href="/projets" className="btn-outline w-full">
              {t("seeAll")} <FiArrowRight />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

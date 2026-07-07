import { setRequestLocale, getTranslations } from "next-intl/server";
import { getProfile } from "@/lib/content";
import { alternatesFor } from "@/lib/site";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/contact"),
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const profile = getProfile(locale);

  const links = [
    {
      icon: MdOutlineEmail,
      label: profile.email,
      href: `mailto:${profile.email}`,
    },
    { icon: FaLinkedin, label: "LinkedIn", href: profile.linkedin },
    { icon: FaGithub, label: "GitHub", href: profile.github },
  ];

  return (
    <div className="container-page flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-bold sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted">{t("intro")}</p>

      <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
        {links.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="card card-hover flex min-w-0 flex-col items-center gap-3 p-6"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full gradient-accent text-white">
              <Icon className="h-6 w-6" />
            </span>
            <span className="max-w-full break-words text-center text-sm font-medium text-muted">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

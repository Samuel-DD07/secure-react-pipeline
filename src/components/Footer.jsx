import { useTranslations } from "next-intl";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

export default function Footer({ profile }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.name}. {t("rights")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-fg"
          >
            <MdOutlineEmail className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-fg"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-fg"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

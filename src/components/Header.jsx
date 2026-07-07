"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitch from "./LanguageSwitch";

const NAV = [
  { href: "/about", key: "about" },
  { href: "/projets", key: "projects" },
  { href: "/contact", key: "contact" },
];

export default function Header({ profile }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/70 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          DORISMOND<span className="text-gradient">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden text-muted transition-colors hover:text-fg sm:block"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden text-muted transition-colors hover:text-fg sm:block"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <LanguageSwitch />
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-fg lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border bg-bg lg:hidden">
          <div className="container-page flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  isActive(item.href) ? "text-fg" : "text-muted"
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

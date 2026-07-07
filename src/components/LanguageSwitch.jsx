"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("lang");
  const other = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      aria-label={t("switch")}
      onClick={() => router.replace(pathname, { locale: other })}
      className="grid h-9 min-w-9 place-items-center rounded-full border border-border px-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
    >
      {other.toUpperCase()}
    </button>
  );
}

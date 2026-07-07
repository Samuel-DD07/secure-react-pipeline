import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import { inter, sora } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { getProfile } from "@/lib/content";
import { ThemeProvider } from "@/components/ThemeProvider";
import TechBackground from "@/components/TechBackground";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: SITE.title[locale],
      template: `%s - ${SITE.name}`,
    },
    description: SITE.description[locale],
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      title: SITE.title[locale],
      description: SITE.description[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.title[locale],
      description: SITE.description[locale],
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const profile = getProfile(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE.url,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github],
    worksFor: { "@type": "Organization", name: "Cyber Test Systems" },
    alumniOf: "EPITA",
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable}`}
    >
      <body className="min-h-screen">
        <JsonLd data={jsonLd} />
        <ThemeProvider>
          <TechBackground />
          <NextIntlClientProvider messages={messages}>
            <Header profile={profile} />
            <main>{children}</main>
            <Footer profile={profile} />
          </NextIntlClientProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

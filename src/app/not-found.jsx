import { inter, sora } from "@/lib/fonts";
import "./globals.css";

// Global fallback for non-localized routes (has no [locale] layout,
// so it must render its own <html>/<body>).
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${inter.variable} ${sora.variable} dark`}>
      <body>
        <div className="container-page flex min-h-screen flex-col items-center justify-center text-center">
          <p className="font-heading text-6xl font-bold text-gradient">404</p>
          <p className="mt-4 text-lg text-muted">
            Page introuvable / Page not found
          </p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/fr" className="btn-outline mt-8">
            ← Accueil / Home
          </a>
        </div>
      </body>
    </html>
  );
}

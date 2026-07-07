import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-heading text-6xl font-bold text-gradient">404</p>
      <p className="mt-4 text-lg text-muted">
        Cette page n&apos;existe pas. / This page doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-outline mt-8">
        ← Accueil / Home
      </Link>
    </div>
  );
}

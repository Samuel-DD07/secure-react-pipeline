import Image from "next/image";

/**
 * Project cover image with a graceful fallback (stylized "code" card)
 * for projects that don't have a screenshot yet.
 */
export default function ProjectCover({ cover, title, tags = [], priority = false }) {
  if (cover) {
    return (
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={cover}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-surface-2 to-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <span className="font-heading text-3xl font-bold text-gradient">
          &lt;/&gt;
        </span>
        <span className="max-w-[16rem] truncate text-xs font-medium text-muted">
          {tags[0] || title}
        </span>
      </div>
    </div>
  );
}

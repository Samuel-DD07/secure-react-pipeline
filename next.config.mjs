import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Consolidate SEO on a single canonical domain: permanently redirect the
  // secondary domain (samuel.dorismond.fr) to the primary one (dorismond.fr).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "samuel.dorismond.fr" }],
        destination: "https://dorismond.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

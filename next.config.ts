import type { NextConfig } from "next";
import { slugRedirectEntries } from "./lib/slug-redirects";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    // Blog post slug 301s (renamed posts) + legacy tool consolidation.
    return [
      ...slugRedirectEntries(),
      // Glossary consolidation: /glossary is the legacy copy of the same
      // Sanity doc /academy/glossary renders. Canonical is /academy/glossary
      // (richer Academy page, DefinedTermSet authority). 301 to it and drop
      // /glossary from sitemap, llms.txt, llms-full.txt (see PR-39).
      {
        source: "/glossary",
        destination: "/academy/glossary",
        permanent: true,
      },
      // Legacy tool URLs -> consolidated free tools
      {
        source: "/tools/flesch-kincaid",
        destination: "/free/flesch-kincaid-calculator",
        permanent: true,
      },
      {
        source: "/tools/readability",
        destination: "/free/flesch-kincaid-calculator",
        permanent: true,
      },
      // Redirect apex domain to www (uncomment when apex domain is configured)
      // {
      //   source: "/:path*",
      //   has: [{ type: "host", value: "promptraise.com" }],
      //   destination: "https://www.promptraise.com/:path*",
      //   permanent: true,
      // },
      // Add legacy URL redirects here when inventory is available
      // Example:
      // {
      //   source: "/old-page",
      //   destination: "/new-page",
      //   permanent: true,
      // },
    ];
  },
  async headers() {
    const contentSecurityPolicy = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data: https:",
      "font-src 'self' https: data:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' https://app.termly.io https://*.termly.io https://www.clarity.ms https://*.clarity.ms https://www.googletagmanager.com https://*.googletagmanager.com",
      "connect-src 'self' https:",
      "frame-src https://app.termly.io https://*.termly.io https://www.youtube.com https://youtube.com https://player.vimeo.com",
      "object-src 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

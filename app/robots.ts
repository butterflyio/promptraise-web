import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";
const isStaging = process.env.SITE_ENV === "staging";

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicit per-bot allows for every AI crawler the audit tool tests
      // (audit.promptraise.com check-set v1.1.0, 20 crawlers). Keeping this
      // list in sync with TESTED_CRAWLERS in the audit repo is deliberate:
      // what we advocate for clients, we run on ourselves.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Anthropic-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Gemini-User", allow: "/" },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
      { userAgent: "Cohere-AI", allow: "/" },
      { userAgent: "GrokBot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "ExaBot", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

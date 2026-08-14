import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

import { SiteChrome } from "@/components/site-chrome";
import TermlyCMP from "@/components/termly-cmp";
import { getSiteSettings } from "@/sanity/lib/queries";

import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const faviconUrl = settings?.favicon?.asset?.url ?? `${siteUrl}/favicon.ico`;
  const socialImageUrl =
    settings?.openGraphImage?.asset?.url ??
    settings?.logo?.asset?.url ??
    faviconUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "PromptRaise — AI Visibility for Web3",
      template: "%s | PromptRaise",
    },
    description:
      "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery. We help projects appear in ChatGPT, Perplexity, Claude, and Gemini.",
    keywords: [
      "AI visibility",
      "LLM ranking",
      "Web3 marketing",
      "ChatGPT optimization",
      "Perplexity SEO",
      "AI search",
      "Web3 discovery",
    ],
    authors: [{ name: "PromptRaise" }],
    creator: "PromptRaise",
    publisher: "PromptRaise",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: "PromptRaise",
      title: "PromptRaise — AI Visibility for Web3",
      description:
        "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery.",
      images: [socialImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: "PromptRaise — AI Visibility for Web3",
      description:
        "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery.",
      creator: "@promptraise",
      images: [socialImageUrl],
    },
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    alternates: {
      canonical: siteUrl,
      types: {
        "text/plain": `${siteUrl}/llms.txt`,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? {
            "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
          }
        : undefined,
    },
  };
}

function StructuredData({
  settings,
}: {
  settings: Awaited<ReturnType<typeof getSiteSettings>>;
}) {
  const brandMark = `${siteUrl}/brand/promptraise-mark.svg`;
  const logo = settings?.logo?.asset?.url ?? brandMark;
  const legalName = settings?.organizationLegalName || "PromptRaise";
  const siteName = settings?.siteName || "PromptRaise";
  const socialLinks = settings?.socialLinks ?? {};
  const sameAs = [
    socialLinks.x,
    socialLinks.telegram,
    socialLinks.discord,
    socialLinks.reddit,
    socialLinks.youtube,
  ].filter(Boolean) as string[];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: legalName,
    url: siteUrl,
    logo,
    description:
      "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery.",
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      ...(socialLinks.telegram
        ? { url: socialLinks.telegram }
        : { url: "https://t.me/promptraise" }),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <StructuredData settings={settings} />
      </head>
      <body className="min-h-full">
        <Suspense fallback={null}>
          <TermlyCMP
            websiteUUID="7e325b94-5a2f-4d14-9502-ccf9e7e8e5e7"
            autoBlock={true}
          />
        </Suspense>
        <SiteChrome settings={settings}>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}

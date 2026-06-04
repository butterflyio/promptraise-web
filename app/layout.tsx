import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { SiteShell } from "@/components/site-shell";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptRaise — AI Visibility for Web3",
    description:
      "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery.",
    creator: "@promptraise",
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

function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PromptRaise",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    description:
      "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery.",
    sameAs: ["https://twitter.com/promptraise", "https://t.me/promptraise"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://audit.promptraise.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PromptRaise",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <StructuredData />
      </head>
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}

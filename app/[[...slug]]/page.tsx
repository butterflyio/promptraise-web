import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import {
  SectionRenderer,
  type SectionBlock,
} from "@/components/sections/registry";
import {
  getAllPages,
  getHomePage,
  getPageBySlug,
  getPageBySlugPreview,
  getSiteSettings,
  getSiteSettingsPreview,
  HOME_SLUG,
  normalizePageSlug,
  type PageDoc,
} from "@/sanity/lib/queries";

export const revalidate = 30;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

function parseSlug(params: Awaited<PageProps["params"]>): string {
  const parts = params.slug ?? [];
  if (parts.length === 0) return HOME_SLUG;
  return normalizePageSlug(parts.join("/"));
}

/** The legacy home page as an ordered list of registry blocks. */
function homePageSections(
  homePage: NonNullable<Awaited<ReturnType<typeof getHomePage>>>,
): SectionBlock[] {
  const blocks: SectionBlock[] = [];
  if (homePage.hero) blocks.push({ _type: "hero", ...homePage.hero });
  if (homePage.visibilitySection)
    blocks.push({ _type: "visibility", ...homePage.visibilitySection });
  if (homePage.problem) blocks.push({ _type: "problem", ...homePage.problem });
  if (homePage.aiTraining)
    blocks.push({ _type: "aiTraining", ...homePage.aiTraining });
  if (homePage.process) blocks.push({ _type: "process", ...homePage.process });
  if (homePage.comparison)
    blocks.push({ _type: "comparison", ...homePage.comparison });
  if (homePage.whyChoose)
    blocks.push({ _type: "whyChoose", ...homePage.whyChoose });
  if (homePage.plans) blocks.push({ _type: "plans", ...homePage.plans });
  if (homePage.auditCta)
    blocks.push({ _type: "auditCta", ...homePage.auditCta });
  if (homePage.team) blocks.push({ _type: "team", ...homePage.team });
  if (homePage.askAi) blocks.push({ _type: "askAi", ...homePage.askAi });
  return blocks;
}

/** Blocks for a page doc: its sections array as registry blocks. */
function pageDocSections(doc: PageDoc): SectionBlock[] {
  return (doc.sections ?? []).filter(
    (s): s is SectionBlock => typeof s._type === "string",
  );
}

export async function generateStaticParams() {
  const pages = await getAllPages();
  const params: Array<{ slug?: string[] }> = [{ slug: [] }];
  for (const page of pages) {
    const slug = page.slug?.current?.replace(/^\/+|\/+$/g, "");
    if (!slug) continue;
    params.push({ slug: slug.split("/") });
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolved = await params;
  const slug = parseSlug(resolved);
  const isDraft = (await draftMode()).isEnabled;
  // Fetch the page doc for the home slug too - it carries real metadata.
  const doc = isDraft
    ? await getPageBySlugPreview(slug)
    : await getPageBySlug(slug);

  if (!doc) {
    return {
      title: "Page not found",
      robots: { index: false, follow: false },
    };
  }

  const title = doc.metaTitle || doc.title || "PromptRaise";
  const description = doc.metaDescription || undefined;
  const ogImage = doc.ogImage?.asset?.url
    ? { url: doc.ogImage.asset.url }
    : undefined;

  return {
    title,
    description,
    ...(ogImage
      ? { openGraph: { title, description, images: [ogImage] } }
      : {}),
    robots: doc.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: { canonical: `${siteUrl}${slug}` },
  };
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const slug = parseSlug(resolved);

  const isDraft = (await draftMode()).isEnabled;
  const settings = isDraft
    ? await getSiteSettingsPreview()
    : await getSiteSettings();

  let blocks: SectionBlock[] = [];
  let faq: PageDoc["faq"] = [];

  if (slug === HOME_SLUG) {
    // Home: prefer the `page` doc with slug "/", fall back to the legacy
    // homePage doc during the transition.
    const pageDoc = isDraft
      ? await getPageBySlugPreview(HOME_SLUG)
      : await getPageBySlug(HOME_SLUG);
    if (pageDoc) {
      blocks = pageDocSections(pageDoc);
      faq = pageDoc.faq;
    } else {
      const homePage = await getHomePage();
      blocks = homePage ? homePageSections(homePage) : [];
    }
  } else {
    const doc = isDraft
      ? await getPageBySlugPreview(slug)
      : await getPageBySlug(slug);
    if (!doc) notFound();
    blocks = pageDocSections(doc);
    faq = doc.faq;
  }

  const faqItems = (faq ?? []).filter((item) => item.question && item.answer);

  return (
    <main>
      {faqItems.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      ) : null}
      {blocks.map((block, index) => (
        <SectionRenderer
          key={`${slug}-${block._type}-${index}`}
          block={block}
          settings={settings}
        />
      ))}
    </main>
  );
}

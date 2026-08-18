import { sanityClient, getPreviewClient } from "./client";

export interface SiteSettings {
  siteName: string;
  organizationLegalName: string;
  primaryTelegramCtaUrl: string;
  freeAuditCtaUrl: string;
  headerCtaLabel?: string;
  headerCtaUrl?: string;
  logo?: {
    asset?: {
      url?: string;
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
  favicon?: {
    asset?: {
      url?: string;
    };
  };
  openGraphImage?: {
    asset?: {
      url?: string;
    };
  };
  announcement?: {
    enabled?: boolean;
    text?: string;
    linkLabel?: string;
    linkUrl?: string;
  };
  headerNavItems?: Array<{
    label: string;
    href: string;
  }>;
  footerPoweredByText?: string;
  footerCopyrightText?: string;
  footerLegalLinks?: Array<{
    label: string;
    href: string;
  }>;
  socialLinks: {
    x?: string;
    telegram?: string;
    discord?: string;
    reddit?: string;
    youtube?: string;
  };
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings" && _id == "site-settings"][0]{
    siteName,
    organizationLegalName,
    primaryTelegramCtaUrl,
    freeAuditCtaUrl,
    headerCtaLabel,
    headerCtaUrl,
    headerNavItems,
    footerPoweredByText,
    footerCopyrightText,
    footerLegalLinks,
    socialLinks,
    announcement,
    logo{
      asset->{url, metadata{dimensions}}
    },
    favicon{
      asset->{url, metadata{dimensions}}
    },
    openGraphImage{
      asset->{url, metadata{dimensions}}
    }
  }`;
  return sanityClient.fetch(query);
}

/**
 * Shared type namespace for legacy home sections. Section components import
 * nested types from here (e.g. `HomePage["process"]`) for their CMS content
 * props. The legacy `homePage` DOCUMENT was retired (home renders from the
 * `page` doc `page-home`), but the type remains as the section shape source.
 */
export interface HomePageCta {
  label?: string;
  href?: string;
}

export interface HomePageHeroTrustLogo {
  name?: string;
  symbol?: string;
  logo?: string;
  dimmed?: boolean;
}

export interface HomePageHero {
  eyebrow?: string;
  headlinePrefix?: string;
  headlineHighlight?: string;
  headlineSuffix?: string;
  body?: string[];
  primaryCta?: HomePageCta;
  secondaryCta?: HomePageCta;
  trustBar?: {
    label?: string;
    badge?: string;
    logos?: HomePageHeroTrustLogo[];
  };
}

export interface HomePageVisibilityStatCard {
  value?: string;
  label?: string;
}

export interface HomePageVisibilitySection {
  headline?: {
    lineOne?: string;
    lineTwo?: string;
  };
  statCards?: HomePageVisibilityStatCard[];
}

export interface HomePage {
  hero?: HomePageHero;
  visibilitySection?: HomePageVisibilitySection;
  problem?: {
    windowTitle?: string;
    heading?: string;
    subtext?: string;
    ctaLabel?: string;
    problems?: Array<{ title?: string; desc?: string }>;
  };
  aiTraining?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    layers?: Array<{
      number?: string;
      title?: string;
      description?: string;
      benefits?: string[];
    }>;
  };
  process?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    steps?: Array<{
      number?: string;
      label?: string;
      title?: string;
      desc?: string;
    }>;
  };
  comparison?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    features?: string[];
    companies?: Array<{ name?: string; logo?: string }>;
  };
  whyChoose?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    cards?: Array<{ title?: string; desc?: string }>;
  };
  plans?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    ctaLabel?: string;
  };
  auditCta?: {
    heading?: string;
    subtext?: string;
    ctaLabel?: string;
    checklistHeading?: string;
    checklist?: string[];
  };
  team?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    members?: Array<{
      name?: string;
      role?: string;
      bio?: string;
      image?: { asset?: { url?: string } };
      linkedin?: string;
      x?: string;
    }>;
    backedBy?: Array<{ label?: string; href?: string; logo?: string }>;
  };
  askAi?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    prompt?: string;
    assistants?: Array<{ name?: string; baseHref?: string }>;
  };
}

export interface PageDoc {
  _id: string;
  _updatedAt?: string;
  title?: string;
  slug?: { current?: string };
  metaTitle?: string;
  metaDescription?: string;
  noindex?: boolean;
  faq?: Array<{ question?: string; answer?: string }>;
  ogImage?: {
    asset?: {
      url?: string;
    };
  };
  sections?: Array<Record<string, unknown> & { _type: string }>;
}

/** The canonical home slug. Pages with slug "/" (or empty) resolve to "/". */
export const HOME_SLUG = "/";

export function normalizePageSlug(slug: string | undefined): string {
  if (!slug || slug === "" || slug === "index") {
    return HOME_SLUG;
  }
  return slug.startsWith("/") ? slug : `/${slug}`;
}

export async function getPageBySlug(rawSlug: string): Promise<PageDoc | null> {
  const path = normalizePageSlug(rawSlug);
  // Sanity slugs are stored without a leading slash ("campaign-x"); the
  // home page is the exception and stores "/" as its slug value.
  const storedSlug = path === HOME_SLUG ? HOME_SLUG : path.replace(/^\/+/, "");
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    slug,
    metaTitle,
    metaDescription,
    noindex,
    faq,
    ogImage{asset->{url}},
    sections[]{
      ...,
      _type == "team" => {
        ...,
        members[]{
          ...,
          image{asset->{url}}
        }
      }
    },
  }`;
  return sanityClient.fetch(query, { slug: storedSlug });
}

/**
 * Draft-aware variant used by Draft Mode: resolves drafts.* documents so
 * Studio edits appear before publishing. Falls back to the published fetch
 * when no read token / preview client is configured.
 */
export async function getPageBySlugPreview(
  rawSlug: string,
): Promise<PageDoc | null> {
  const path = normalizePageSlug(rawSlug);
  const storedSlug = path === HOME_SLUG ? HOME_SLUG : path.replace(/^\/+/, "");
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    slug,
    metaTitle,
    metaDescription,
    noindex,
    faq,
    ogImage{asset->{url}},
    sections[]{
      ...,
      _type == "team" => {
        ...,
        members[]{
          ...,
          image{asset->{url}}
        }
      }
    },
  }`;
  try {
    return await getPreviewClient().fetch(query, { slug: storedSlug });
  } catch {
    return getPageBySlug(rawSlug);
  }
}

export async function getSiteSettingsPreview() {
  const query = `*[_type == "siteSettings" && _id == "site-settings"][0]{
    siteName,
    organizationLegalName,
    primaryTelegramCtaUrl,
    freeAuditCtaUrl,
    headerCtaLabel,
    headerCtaUrl,
    headerNavItems,
    footerPoweredByText,
    footerCopyrightText,
    footerLegalLinks,
    socialLinks,
    announcement,
    logo{
      asset->{url, metadata{dimensions}}
    },
    favicon{
      asset->{url, metadata{dimensions}}
    },
    openGraphImage{
      asset->{url, metadata{dimensions}}
    }
  }`;
  try {
    return await getPreviewClient().fetch(query);
  } catch {
    return getSiteSettings();
  }
}

export async function getAllPages(): Promise<PageDoc[]> {
  const query = `*[_type == "page"]{
    _id,
    _updatedAt,
    slug,
    noindex,
  }`;
  return sanityClient.fetch(query);
}

export interface GlossaryTermDoc {
  _key?: string;
  term: string;
  aliases?: string[];
  category?: string;
  definition?: string;
  example?: string;
  related?: string[];
}

export interface GlossaryDoc {
  _id: string;
  _updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  categories?: string[];
  terms?: GlossaryTermDoc[];
}

const GLOSSARY_QUERY = `*[_type == "glossary" && _id == "glossary"][0]{
  _id,
  _updatedAt,
  metaTitle,
  metaDescription,
  intro,
  categories,
  terms[]{
    _key,
    term,
    aliases,
    category,
    definition,
    example,
    related
  }
}`;

export async function getGlossary(): Promise<GlossaryDoc | null> {
  return sanityClient.fetch(GLOSSARY_QUERY);
}

/** Draft-aware variant used by Draft Mode: resolves drafts.* docs. */
export async function getGlossaryPreview(): Promise<GlossaryDoc | null> {
  try {
    return await getPreviewClient().fetch(GLOSSARY_QUERY);
  } catch {
    return getGlossary();
  }
}

// ── Blog posts ───────────────────────────────────────────────────────────

export interface AuthorDoc {
  _id: string;
  _type: string;
  _updatedAt?: string;
  _createdAt?: string;
  name?: string;
  slug?: { current?: string };
  role?: string;
  avatar?: { asset?: { url?: string } };
  shortBio?: string;
  longBio?: Array<Record<string, unknown>>;
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: { asset?: { url?: string } };
  noindex?: boolean;
}

/** Author shape as it appears on a post (resolved via the reference). */
export interface PostAuthor {
  _id?: string;
  name?: string;
  role?: string;
  shortBio?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  avatar?: { asset?: { url?: string } };
  slug?: { current?: string };
}

export interface PostDoc {
  _id: string;
  _type: string;
  _updatedAt?: string;
  _createdAt?: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  coverImage?: { asset?: { url?: string } };
  categories?: string[];
  body?: Array<Record<string, unknown>>;
  author?: PostAuthor;
  publishedAt?: string;
  status?: string;
  lastUpdated?: string;
  reviewedBy?: string;
  reviewedDate?: string;
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: { asset?: { url?: string } };
  noindex?: boolean;
  featured?: boolean;
}

/** Shared projection for an author document (full profile). */
const AUTHOR_PROJECTION = `{
  _id,
  _type,
  _updatedAt,
  _createdAt,
  name,
  slug,
  role,
  avatar{asset->{url}},
  shortBio,
  longBio,
  linkedin,
  twitter,
  github,
  website,
  metaTitle,
  metaDescription,
  openGraphImage{asset->{url}},
  noindex
}`;

const POST_PROJECTION = `{
  _id,
  _type,
  _updatedAt,
  _createdAt,
  title,
  slug,
  excerpt,
  coverImage{asset->{url}},
  categories,
  body,
  author->{
    _id,
    name,
    role,
    shortBio,
    avatar{asset->{url}},
    linkedin,
    twitter,
    github,
    website,
    slug
  },
  publishedAt,
  status,
  lastUpdated,
  reviewedBy,
  reviewedDate,
  metaTitle,
  metaDescription,
  openGraphImage{asset->{url}},
  noindex,
  featured
}`;

/** All published posts (status == published, publishedAt <= now). */
export async function getAllPosts(): Promise<PostDoc[]> {
  const query = `*[_type == "post" && status == "published" && (!defined(publishedAt) || publishedAt <= now())] | order(publishedAt desc)${POST_PROJECTION}`;
  return sanityClient.fetch(query);
}

/** Single published post by slug. */
export async function getPostBySlug(slug: string): Promise<PostDoc | null> {
  const query = `*[_type == "post" && slug.current == $slug && status == "published" && (!defined(publishedAt) || publishedAt <= now())][0]${POST_PROJECTION}`;
  return sanityClient.fetch(query, { slug });
}

/** Draft-aware variant for post preview (unpublished edits render live). */
export async function getPostBySlugPreview(
  slug: string,
): Promise<PostDoc | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]${POST_PROJECTION}`;
  try {
    return await getPreviewClient().fetch(query, { slug });
  } catch {
    return getPostBySlug(slug);
  }
}

/** All post slugs (for generateStaticParams) regardless of status. */
export async function getAllPostSlugs(): Promise<Array<{ slug: string }>> {
  const query = `*[_type == "post" && status == "published" && (!defined(publishedAt) || publishedAt <= now())]{
    slug
  }`;
  const docs = (await sanityClient.fetch(query)) as Array<{
    slug?: { current?: string };
  }>;
  return docs
    .map((d) => d.slug?.current)
    .filter((s): s is string => Boolean(s))
    .map((slug) => ({ slug }));
}

// ── Authors ──────────────────────────────────────────────────────────────

/** All authors (for the studio list + sitemap). */
export async function getAllAuthors(): Promise<AuthorDoc[]> {
  const query = `*[_type == "author"] | order(name asc)${AUTHOR_PROJECTION}`;
  return sanityClient.fetch(query);
}

/** All public, indexable authors (not noindex). GROQ `!noindex` is falsy for
 * unset (null) fields, so use `noindex != true` to include default authors. */
export async function getAllPublicAuthors(): Promise<AuthorDoc[]> {
  const query = `*[_type == "author" && noindex != true] | order(name asc)${AUTHOR_PROJECTION}`;
  return sanityClient.fetch(query);
}

/** Single author by slug. */
export async function getAuthorBySlug(slug: string): Promise<AuthorDoc | null> {
  const query = `*[_type == "author" && slug.current == $slug][0]${AUTHOR_PROJECTION}`;
  return sanityClient.fetch(query, { slug });
}

/** All author slugs (for generateStaticParams). */
export async function getAllAuthorSlugs(): Promise<Array<{ slug: string }>> {
  const query = `*[_type == "author"]{ slug }`;
  const docs = (await sanityClient.fetch(query)) as Array<{
    slug?: { current?: string };
  }>;
  return docs
    .map((d) => d.slug?.current)
    .filter((s): s is string => Boolean(s))
    .map((slug) => ({ slug }));
}

/** Author's published posts, newest first. */
export async function getPostsByAuthor(authorId: string): Promise<PostDoc[]> {
  const query = `*[_type == "post" && status == "published" && (!defined(publishedAt) || publishedAt <= now()) && author._ref == $authorId] | order(publishedAt desc)${POST_PROJECTION}`;
  return sanityClient.fetch(query, { authorId });
}

/** Related published posts sharing at least one category with the current
 * post (excluding it), newest first - powers the related-posts module. */
export async function getRelatedPosts(
  currentId: string,
  categories: string[] = [],
  limit = 3,
): Promise<PostDoc[]> {
  const base = `*[_type == "post" && status == "published" && (!defined(publishedAt) || publishedAt <= now()) && _id != $currentId`;
  const catClause =
    categories.length > 0
      ? ` && (count((categories)[@ in $categories]) > 0)`
      : "";
  const query = `${base}${catClause}] | order(publishedAt desc)[0...$limit]${POST_PROJECTION}`;
  try {
    return (await sanityClient.fetch(query, {
      currentId,
      categories,
      limit,
    })) as PostDoc[];
  } catch {
    return [];
  }
}

// ── Flesch-Kincaid calculator page copy ────────────────────────────────────
// Editable singleton "fleschKincaidLanding". The Next page renders with the
// in-code defaults (lib/flesch-copy.ts) when this doc is missing; every field
// merges over the default so a blank CMS field never kills a section.

const FLESCH_PROJECTION = `{
  heroTitle,
  heroSubtitle,
  privacyBadge,
  privacyTitle,
  privacyBody,
  contentTypeLabel,
  sampleText,
  introSectionTitle,
  introBody1,
  introBody2,
  formulasTitle,
  formulasSubtext,
  formulaDefinitions[]{key, description},
  engineVerdictTitle,
  engineVerdictIntro,
  citationSectionTitle,
  citationSectionIntro,
  faq[]{question, answer},
  ctaHeading,
  ctaBody,
  ctaLabel,
  ctaHref
}`;

const FLESCH_QUERY = `*[_type == "fleschKincaidLanding" && _id == "fleschKincaidLanding"][0]${FLESCH_PROJECTION}`;

export type FleschLandingDoc = Record<string, unknown> | null;

export async function getFleschKincaidLanding(): Promise<FleschLandingDoc> {
  try {
    return (await sanityClient.fetch(FLESCH_QUERY)) ?? null;
  } catch {
    return null;
  }
}

/** Draft-aware variant used by Draft Mode: resolves drafts.* docs. */
export async function getFleschKincaidLandingPreview(): Promise<FleschLandingDoc> {
  try {
    return (await getPreviewClient().fetch(FLESCH_QUERY)) ?? null;
  } catch {
    return getFleschKincaidLanding();
  }
}

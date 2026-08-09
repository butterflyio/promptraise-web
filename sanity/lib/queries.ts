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
    steps?: Array<{ number?: string; label?: string; title?: string; desc?: string }>;
  };
  comparison?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    features?: string[];
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
  };
  askAi?: {
    badge?: string;
    heading?: string;
    subtext?: string;
    prompt?: string;
  };
}

export async function getHomePage(): Promise<HomePage | null> {
  const query = `*[_type == "homePage" && _id == "home-page"][0]`;
  return sanityClient.fetch(query);
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

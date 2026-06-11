import { sanityClient } from "./client";

export interface SiteSettings {
  siteName: string;
  organizationLegalName: string;
  primaryTelegramCtaUrl: string;
  freeAuditCtaUrl: string;
  headerNavItems?: Array<{
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
  const query = `*[_type == "siteSettings" && _id == "site-settings"][0]`;
  return sanityClient.fetch(query);
}

export interface HomePageCta {
  label?: string;
  href?: string;
}

export interface HomePageHeroTrustLogo {
  name?: string;
  symbol?: string;
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
}

export async function getHomePage(): Promise<HomePage | null> {
  const query = `*[_type == "homePage" && _id == "home-page"][0]`;
  return sanityClient.fetch(query);
}

import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://www.devsomeware.com";

export const SITE_CONFIG = {
  name: "Devsomeware",
  legalName: "Devsomeware Private Limited",
  title: "Devsomeware | Software Development Company for Startups & Businesses",
  description:
    "Devsomeware builds high-performance websites, SaaS products, MVPs, internal tools, and growth-focused software for startups and companies.",
  locale: "en_US",
  twitterHandle: "@devsomeware",
  keywords: [
    "software development company",
    "next.js development",
    "startup MVP development",
    "custom web app development",
    "enterprise software solutions",
    "SEO services",
    "internal tools development",
    "Devsomeware",
  ],
};

function withProtocol(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `https://${value}`;
}

export function getBaseUrl(): string {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    FALLBACK_SITE_URL;

  try {
    const parsed = new URL(withProtocol(rawUrl));
    return parsed.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBaseUrl()}${normalizedPath}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({ title, description, path, keywords }: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedKeywords = keywords ?? SITE_CONFIG.keywords;

  return {
    title,
    description,
    keywords: resolvedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: absoluteUrl("/assets/bann.png"),
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} Open Graph Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: SITE_CONFIG.twitterHandle,
      images: [absoluteUrl("/assets/bann.png")],
    },
  };
}
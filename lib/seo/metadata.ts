/**
 * SEO Metadata Utilities
 * Helper functions for generating consistent metadata across pages
 */

import type { Metadata } from 'next';
import { seoConfig, type PageConfig } from '@/config/seo';

// Type definitions for Open Graph and Twitter Card
interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface OpenGraph {
  type: string;
  siteName: string;
  title: string;
  description: string;
  url: string;
  images: OpenGraphImage[];
  locale: string;
  alternateLocale?: string[];
}

interface TwitterCard {
  card: string;
  title: string;
  description: string;
  images: string[];
  creator?: string;
  site?: string;
}

/**
 * Generate canonical URL for a page
 */
export function generateCanonical(path: string): string {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
}

/**
 * Generate Open Graph metadata
 */
export function generateOpenGraph(
  title: string,
  description: string,
  path: string,
  images?: string[]
): OpenGraph {
  const url = generateCanonical(path);
  const defaultImages = images?.map((img) => ({
    url: img.startsWith('http') ? img : `${seoConfig.siteUrl}${img}`,
    width: seoConfig.social.ogImageWidth,
    height: seoConfig.social.ogImageHeight,
    alt: title,
  })) || [
    {
      url: `${seoConfig.siteUrl}${seoConfig.social.ogImage}`,
      width: seoConfig.social.ogImageWidth,
      height: seoConfig.social.ogImageHeight,
      alt: title,
    },
  ];

  return {
    type: 'website',
    siteName: seoConfig.siteName,
    title,
    description,
    url,
    images: defaultImages,
    locale: seoConfig.locale,
    alternateLocale: seoConfig.alternateLocales,
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterCard(
  title: string,
  description: string,
  image?: string
): TwitterCard {
  const defaultImage = image?.startsWith('http') 
    ? image 
    : `${seoConfig.siteUrl}${seoConfig.social.twitterImage}`;

  return {
    card: seoConfig.social.twitterCardType,
    title,
    description,
    images: [defaultImage],
    creator: seoConfig.social.twitterHandle,
    site: seoConfig.social.twitterHandle,
  };
}

/**
 * Generate complete metadata object for a page
 */
export function generateMetadata(pageConfig: PageConfig): Metadata {
  const canonicalUrl = generateCanonical(pageConfig.path);
  const openGraph = generateOpenGraph(
    pageConfig.title,
    pageConfig.description,
    pageConfig.path
  );
  const twitterCard = generateTwitterCard(
    pageConfig.title,
    pageConfig.description
  );

  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: [...seoConfig.defaultKeywords, ...pageConfig.keywords],
    authors: [{ name: seoConfig.siteName }],
    creator: seoConfig.siteName,
    publisher: seoConfig.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph,
    twitter: twitterCard,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: seoConfig.verification.google,
      other: {
        bing: seoConfig.verification.bing || '',
      },
    },
    category: 'Developer Tools',
  };
}

/**
 * Generate metadata for the home page
 */
export function generateHomeMetadata(): Metadata {
  return generateMetadata(seoConfig.pages.home);
}

/**
 * Generate metadata for the contact page
 */
export function generateContactMetadata(): Metadata {
  return generateMetadata(seoConfig.pages.contact);
}

/**
 * Generate metadata for the privacy page
 */
export function generatePrivacyMetadata(): Metadata {
  return generateMetadata(seoConfig.pages.privacy);
}

/**
 * Generate metadata for the terms page
 */
export function generateTermsMetadata(): Metadata {
  return generateMetadata(seoConfig.pages.terms);
}

/**
 * Generate metadata for the 404 page
 */
export function generateNotFoundMetadata(): Metadata {
  return {
    title: 'Page Not Found - Markdown Typing SVG',
    description: 'The page you\'re looking for doesn\'t exist. Return to the Markdown Typing SVG home page to create animated SVGs.',
    robots: {
      index: false,
      follow: true,
    },
  };
}

/**
 * Generate custom metadata for a page
 */
export function generateCustomMetadata(
  title: string,
  description: string,
  path: string,
  keywords?: string[]
): Metadata {
  const pageConfig: PageConfig = {
    title,
    description,
    keywords: keywords || [],
    path,
    priority: 0.5,
    changeFrequency: 'monthly',
  };

  return generateMetadata(pageConfig);
}

/**
 * Get page configuration by path
 */
export function getPageConfig(path: string): PageConfig | undefined {
  const pageMap: Record<string, PageConfig> = {
    '/': seoConfig.pages.home,
    '/contact': seoConfig.pages.contact,
    '/privacy': seoConfig.pages.privacy,
    '/terms': seoConfig.pages.terms,
  };

  return pageMap[path];
}

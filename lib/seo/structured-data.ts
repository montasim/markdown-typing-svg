/**
 * Structured Data Generator
 * Utilities for generating JSON-LD structured data for rich snippets
 */

import { seoConfig } from '@/config/seo';

/**
 * Base interface for all structured data
 */
interface StructuredData {
  '@context': string;
  '@type': string;
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.structuredData.organization.name,
    url: seoConfig.structuredData.organization.url,
    logo: seoConfig.structuredData.organization.logo,
    description: seoConfig.structuredData.organization.description,
    sameAs: seoConfig.structuredData.organization.sameAs,
  };
}

/**
 * Generate WebSite Schema
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoConfig.siteName,
    alternateName: seoConfig.alternateName,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seoConfig.siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
  };
}

/**
 * Generate WebPage Schema
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  path: string,
  lastModified?: string
) {
  const url = `${seoConfig.siteUrl}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'SVG Generator',
      description: 'Tool for creating animated typing SVGs',
    },
    ...(lastModified && { dateModified: lastModified }),
  };
}

/**
 * Generate SoftwareApplication Schema
 */
export function generateSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: seoConfig.structuredData.softwareApplication.name,
    applicationCategory: seoConfig.structuredData.softwareApplication.applicationCategory,
    operatingSystem: seoConfig.structuredData.softwareApplication.operatingSystem,
    offers: {
      '@type': 'Offer',
      price: seoConfig.structuredData.softwareApplication.offers.price,
      priceCurrency: seoConfig.structuredData.softwareApplication.offers.priceCurrency,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: seoConfig.structuredData.softwareApplication.aggregateRating.ratingValue,
      ratingCount: seoConfig.structuredData.softwareApplication.aggregateRating.ratingCount,
      bestRating: '5',
      worstRating: '1',
    },
    description: seoConfig.defaultDescription,
    url: seoConfig.siteUrl,
    author: {
      '@type': 'Organization',
      name: seoConfig.siteName,
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0.0',
    applicationSubCategory: 'Developer Tools',
    featureList: [
      'Animated typing SVGs',
      'Custom fonts',
      'Color customization',
      'Dark mode support',
      'Live preview',
      'Export to Markdown and HTML',
      'Shareable URLs',
    ],
  };
}

/**
 * Generate FAQPage Schema
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbListSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${seoConfig.siteUrl}${item.path}`,
    })),
  };
}

/**
 * Generate HowTo Schema (optional, for tutorial content)
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate complete structured data for the home page
 */
export function generateHomeStructuredData() {
  const softwareApp = generateSoftwareApplicationSchema();
  const webSite = generateWebSiteSchema();
  const organization = generateOrganizationSchema();

  // FAQs from the home page
  const faqs = [
    {
      question: 'How do I use the generated SVG in my GitHub README?',
      answer: 'Copy the Markdown code from the "Embed Code" section and paste it directly into your README.md file. The SVG will automatically render when your README is viewed.',
    },
    {
      question: 'Can I use custom fonts not available on Google Fonts?',
      answer: 'Currently, only Google Fonts are supported for automatic embedding. You can specify any font family name in the font field, but it will only work if the font is available on the user\'s system.',
    },
    {
      question: 'What\'s the difference between multiline and single-line mode?',
      answer: 'Multiline mode displays each line on a new line, while single-line mode retypes all lines on the same line. Use multiline for a list-style display and single-line for a typing effect on one line.',
    },
    {
      question: 'Can I customize the typing animation speed?',
      answer: 'Yes! Use the Duration slider to control how fast each line types (in milliseconds), and the Pause slider to control the delay between lines. Lower values make the animation faster.',
    },
    {
      question: 'How do I share my configuration with others?',
      answer: 'Simply copy the URL from your browser address bar - it contains all your settings. You can also use the Direct URL from the embed code section to share the exact SVG image.',
    },
  ];

  const faqPage = generateFAQPageSchema(faqs);

  const breadcrumb = generateBreadcrumbListSchema([
    { name: 'Home', path: '/' },
  ]);

  return [softwareApp, webSite, organization, faqPage, breadcrumb];
}

/**
 * Generate structured data for legal pages (Privacy/Terms)
 */
export function generateLegalStructuredData(title: string, path: string, lastModified: string) {
  const pageConfig = seoConfig.pages[path as keyof typeof seoConfig.pages];
  const webPage = generateWebPageSchema(title, pageConfig?.description || '', path, lastModified);
  const organization = generateOrganizationSchema();

  const breadcrumb = generateBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: title, path },
  ]);

  return [webPage, organization, breadcrumb];
}

/**
 * Generate structured data for contact page
 */
export function generateContactStructuredData() {
  const webPage = generateWebPageSchema(
    seoConfig.pages.contact.title,
    seoConfig.pages.contact.description,
    seoConfig.pages.contact.path
  );
  const organization = generateOrganizationSchema();

  const breadcrumb = generateBreadcrumbListSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]);

  return [webPage, organization, breadcrumb];
}

/**
 * Convert structured data to JSON-LD script tag
 */
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data),
  };
}

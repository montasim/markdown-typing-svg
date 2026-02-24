/**
 * SEO Configuration
 * Centralized configuration for all SEO-related settings
 */

export const seoConfig = {
  // Site Information
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://markdown-typing-svg.netlify.app',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Markdown Typing SVG',
  alternateName: 'Typing SVG Generator',
  
  // Default Metadata
  defaultTitle: 'Markdown Typing SVG - Create Animated SVGs for Your README',
  defaultDescription:
    'Create beautiful animated typing SVGs for your GitHub README, profiles, and more. Fully customizable with live preview, dark mode, and instant export.',
  
  // Keywords Strategy
  defaultKeywords: [
    'typing svg',
    'animated svg',
    'github readme',
    'markdown',
    'svg generator',
    'typing animation',
    'github profile',
    'developer tools',
    'svg creator',
    'animated text',
    'readme generator',
    'profile badge',
    'open source',
    'free tool'
  ],
  
  // Primary Keywords (for emphasis)
  primaryKeywords: [
    'typing svg',
    'animated svg',
    'github readme svg',
    'svg generator'
  ],
  
  // Social Media Configuration
  social: {
    twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@yourusername',
    twitterCardType: 'summary_large_image',
    ogImage: '/og-image.png',
    twitterImage: '/twitter-image.png',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterImageWidth: 1200,
    twitterImageHeight: 600,
  },
  
  // Page-Specific Configuration
  pages: {
    home: {
      title: 'Markdown Typing SVG - Create Animated SVGs for Your README',
      description: 'Free online tool to create beautiful animated typing SVGs for GitHub README, profiles, and more. Fully customizable with live preview, dark mode, and instant export.',
      keywords: [
        'typing svg',
        'animated svg',
        'github readme',
        'svg generator',
        'typing animation',
        'github profile svg',
        'animated text svg',
        'readme generator'
      ],
      path: '/',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    contact: {
      title: 'Contact Us - Markdown Typing SVG',
      description: 'Get in touch with the Markdown Typing SVG team. Report issues, start discussions, or ask questions about our SVG generator tool.',
      keywords: [
        'contact',
        'support',
        'help',
        'feedback',
        'issues',
        'github issues',
        'discussions'
      ],
      path: '/contact',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
    },
    privacy: {
      title: 'Privacy Policy - Markdown Typing SVG',
      description: 'Learn how Markdown Typing SVG collects, uses, and protects your data. Our commitment to privacy and data security.',
      keywords: [
        'privacy policy',
        'data protection',
        'terms',
        'legal',
        'gdpr',
        'data security'
      ],
      path: '/privacy',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    terms: {
      title: 'Terms of Service - Markdown Typing SVG',
      description: 'Terms of service for Markdown Typing SVG. Read our usage guidelines, license terms, and user agreements.',
      keywords: [
        'terms of service',
        'terms',
        'legal',
        'license',
        'agreement',
        'usage guidelines'
      ],
      path: '/terms',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  },
  
  // Structured Data Configuration
  structuredData: {
    organization: {
      name: 'Markdown Typing SVG',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://markdown-typing-svg.netlify.app',
      logo: '/logo.png',
      description: 'Create beautiful animated typing SVGs for your GitHub README, profiles, and more.',
      sameAs: [
        process.env.NEXT_PUBLIC_GITHUB_URL,
        process.env.NEXT_PUBLIC_TWITTER_HANDLE && `https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_HANDLE.replace('@', '')}`,
        process.env.NEXT_PUBLIC_LINKEDIN_URL,
      ].filter(Boolean) as string[],
    },
    softwareApplication: {
      name: 'Markdown Typing SVG',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        ratingValue: '4.8',
        ratingCount: '1000',
      },
    },
  },
  
  // Robots Configuration
  robots: {
    allow: ['/', '/contact', '/privacy', '/terms'],
    disallow: ['/api/'],
  },
  
  // Sitemap Configuration
  sitemap: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://markdown-typing-svg.netlify.app',
  },
  
  // Verification Codes (add as needed)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  },
  
  // Locale Configuration
  locale: 'en_US',
  alternateLocales: ['en_GB', 'en_AU'],
};

// Type definitions
export type SEOConfig = typeof seoConfig;
export type PageConfig = typeof seoConfig.pages[keyof typeof seoConfig.pages];
export type SocialConfig = typeof seoConfig.social;
export type StructuredDataConfig = typeof seoConfig.structuredData;

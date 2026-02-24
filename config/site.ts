/**
 * Site Configuration
 * Reads configuration values from environment variables
 */

export const siteConfig = {
  // Project Information
  projectName: process.env.NEXT_PUBLIC_PROJECT_NAME || 'Markdown Typing SVG',
  projectDescription:
    process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION ||
    'Create beautiful animated typing SVGs for your GitHub README, profiles, and more.',

  // GitHub Information
  github: {
    username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'yourusername',
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO || 'markdown-typing-svg',
    url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/yourusername/markdown-typing-svg',
    issuesUrl:
      process.env.NEXT_PUBLIC_GITHUB_ISSUES_URL ||
      'https://github.com/yourusername/markdown-typing-svg/issues',
    discussionsUrl:
      process.env.NEXT_PUBLIC_GITHUB_DISCUSSIONS_URL ||
      'https://github.com/yourusername/markdown-typing-svg/discussions',
  },

  // Contact Information
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@example.com',
    linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/yourusername',
    twitterUrl: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/yourusername',
  },

  // Developer Information
  developer: {
    name: process.env.NEXT_PUBLIC_DEVELOPER_NAME || 'Your Name',
    website: process.env.NEXT_PUBLIC_DEVELOPER_WEBSITE || 'https://yourwebsite.com',
  },
};

// Type definitions for site config
export type SiteConfig = typeof siteConfig;

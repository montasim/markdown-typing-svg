import type { MetadataRoute } from 'next';
import { seoConfig } from '@/config/seo';

export default function imageSitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.siteUrl.replace(/\/$/, '');

  // This sitemap will include social sharing images once they are created
  // For now, it's a placeholder that can be updated when images are added
  
  return [
    {
      url: `${baseUrl}/og-image.png`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/twitter-image.png`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}

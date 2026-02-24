import { generatePrivacyMetadata } from '@/lib/seo/metadata';
import { generateLegalStructuredData } from '@/lib/seo/structured-data';

export const metadata = generatePrivacyMetadata();

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for privacy page
  const lastModified = new Date().toISOString();
  const structuredData = generateLegalStructuredData(
    'Privacy Policy',
    '/privacy',
    lastModified
  );

  return (
    <>
      {/* JSON-LD Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      {children}
    </>
  );
}

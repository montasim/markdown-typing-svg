import { generateTermsMetadata } from '@/lib/seo/metadata';
import { generateLegalStructuredData } from '@/lib/seo/structured-data';

export const metadata = generateTermsMetadata();

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for terms page
  const lastModified = new Date().toISOString();
  const structuredData = generateLegalStructuredData(
    'Terms of Service',
    '/terms',
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

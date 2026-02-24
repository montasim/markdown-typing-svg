import { generateContactMetadata } from '@/lib/seo/metadata';
import { generateContactStructuredData } from '@/lib/seo/structured-data';

export const metadata = generateContactMetadata();

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for contact page
  const structuredData = generateContactStructuredData();

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

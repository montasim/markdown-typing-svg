import { generateHomeMetadata } from '@/lib/seo/metadata';
import { generateHomeStructuredData } from '@/lib/seo/structured-data';

export const metadata = generateHomeMetadata();

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for the home page
  const structuredData = generateHomeStructuredData();

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

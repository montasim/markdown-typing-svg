import { generateHomeMetadata } from '@/lib/seo/metadata';
import { generateHomeStructuredData } from '@/lib/seo/structured-data';
import { ToastProvider } from '@/hooks/useToast';

export const metadata = generateHomeMetadata();

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for the home page
  const structuredData = generateHomeStructuredData();

  return (
    <ToastProvider>
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
    </ToastProvider>
  );
}

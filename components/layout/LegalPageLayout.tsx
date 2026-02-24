import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export interface LegalSection {
  title: string;
  content: React.ReactNode;
}

export interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
  breadcrumbs?: Array<{ name: string; href: string }>;
}

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  sections,
  breadcrumbs,
}: LegalPageLayoutProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumbs */}
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          {description}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        {sections.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {section.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

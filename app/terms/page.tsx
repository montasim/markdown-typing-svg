import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: (
        <>
          <p>
            By accessing and using Markdown Typing SVG, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
          <p>
            Markdown Typing SVG reserves the right to modify these terms at any time. Your continued use of the service following any changes constitutes your acceptance of the new terms.
          </p>
        </>
      ),
    },
    {
      title: '2. Use License',
      content: (
        <>
          <p>
            Permission is granted to use Markdown Typing SVG for the purpose of creating animated typing SVGs for personal and commercial projects, including but not limited to GitHub README files, personal websites, and professional portfolios.
          </p>
          <p>
            You may not:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to reverse engineer or modify the service</li>
            <li>Remove any copyright or proprietary notices</li>
            <li>Use the service to generate harmful or offensive content</li>
          </ul>
        </>
      ),
    },
    {
      title: '3. User Content',
      content: (
        <>
          <p>
            You retain all rights to any text or content you input into Markdown Typing SVG. By using the service, you represent and warrant that you have the right to use and share such content.
          </p>
          <p>
            Markdown Typing SVG does not claim ownership of any user-generated content. However, you grant us a non-exclusive, worldwide, royalty-free license to use, store, and process your content solely for the purpose of providing the service.
          </p>
        </>
      ),
    },
    {
      title: '4. Disclaimer',
      content: (
        <>
          <p>
            The materials on Markdown Typing SVG are provided on an 'as is' basis. Markdown Typing SVG makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, Markdown Typing SVG does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
          </p>
        </>
      ),
    },
    {
      title: '5. Limitation of Liability',
      content: (
        <p>
          In no event shall Markdown Typing SVG or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Markdown Typing SVG, even if Markdown Typing SVG or a Markdown Typing SVG authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>
      ),
    },
    {
      title: '6. Privacy Policy',
      content: (
        <>
          <p>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using Markdown Typing SVG, you agree to the collection and use of information in accordance with our Privacy Policy.
          </p>
          <Link href="/privacy">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              View Privacy Policy
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </>
      ),
    },
    {
      title: '7. Changes to Terms',
      content: (
        <p>
          Markdown Typing SVG reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
        </p>
      ),
    },
    {
      title: '8. Contact Information',
      content: (
        <>
          <p>
            If you have any questions about these Terms of Service, please contact us through our contact page.
          </p>
          <Link href="/contact">
            <Button className="w-full sm:w-auto">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <LegalPageLayout
      title="Terms of Service"
      description="Please read these terms carefully before using Markdown Typing SVG."
      lastUpdated={lastUpdated}
      sections={sections}
    />
  );
}

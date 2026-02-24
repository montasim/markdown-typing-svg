import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const sections = [
    {
      title: '1. Information We Collect',
      content: (
        <>
          <p>
            Markdown Typing SVG collects minimal information necessary to provide and improve our service. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Usage Data:</strong> We may collect anonymous usage statistics to understand how our service is being used and to improve performance.</li>
            <li><strong>Browser Information:</strong> We collect basic browser information such as browser type, operating system, and device type for compatibility purposes.</li>
            <li><strong>Generated SVGs:</strong> The SVGs you generate are created client-side and are not stored on our servers unless you choose to share them.</li>
          </ul>
        </>
      ),
    },
    {
      title: '2. How We Use Your Information',
      content: (
        <>
          <p>
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>To provide, maintain, and improve our services</li>
            <li>To analyze usage patterns and optimize performance</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>
        </>
      ),
    },
    {
      title: '3. Cookies and Local Storage',
      content: (
        <>
          <p>
            Markdown Typing SVG uses browser local storage to store your theme preference (light/dark mode). This information is stored locally on your device and is not transmitted to our servers.
          </p>
          <p>
            We do not use tracking cookies or third-party analytics services that track your browsing behavior across websites.
          </p>
        </>
      ),
    },
    {
      title: '4. Data Security',
      content: (
        <p>
          We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      ),
    },
    {
      title: '5. Third-Party Services',
      content: (
        <>
          <p>
            Markdown Typing SVG may use third-party services to enhance functionality. These services may have their own privacy policies:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Google Fonts:</strong> We use Google Fonts to provide typography options. Google may collect data about font usage.</li>
            <li><strong>Lucide Icons:</strong> We use Lucide React for icons, which is loaded from a CDN.</li>
          </ul>
        </>
      ),
    },
    {
      title: '6. Your Rights',
      content: (
        <>
          <p>
            You have the following rights regarding your information:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Access:</strong> You can request information about the data we collect about you.</li>
            <li><strong>Deletion:</strong> You can request deletion of your personal information.</li>
            <li><strong>Opt-out:</strong> You can disable local storage in your browser settings.</li>
            <li><strong>Portability:</strong> You can request a copy of your data in a structured format.</li>
          </ul>
        </>
      ),
    },
    {
      title: '7. Children\'s Privacy',
      content: (
        <p>
          Markdown Typing SVG is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information.
        </p>
      ),
    },
    {
      title: '8. International Data Transfers',
      content: (
        <p>
          Markdown Typing SVG may store and process your information in any country where we operate or where our service providers are located. By using our service, you consent to the transfer of your information to these countries.
        </p>
      ),
    },
    {
      title: '9. Changes to This Privacy Policy',
      content: (
        <>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </>
      ),
    },
    {
      title: '10. Contact Us',
      content: (
        <>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our contact page. We will respond to your inquiries within a reasonable timeframe.
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
      title="Privacy Policy"
      description="Your privacy is important to us. Learn how we protect your data."
      lastUpdated={lastUpdated}
      sections={sections}
      breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Privacy', href: '/privacy' }]}
    />
  );
}

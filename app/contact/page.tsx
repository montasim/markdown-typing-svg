'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Github, Send, CheckCircle, AlertCircle, HelpCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Alternative Contact Methods */}
        <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href={siteConfig.github.issuesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">Report an issue on GitHub</span>
              </a>
              <a
                href={siteConfig.github.discussionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">Start a discussion</span>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm break-all">{siteConfig.contact.email}</span>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We typically respond to inquiries within 24-48 hours on business days.
              </p>
            </CardContent>
          </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto my-64 sm:my-56">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900 dark:text-slate-50 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Common questions about using Markdown Typing SVG
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[
            {
              question: "How do I use the generated SVG in my GitHub README?",
              answer: "Copy the Markdown code from the 'Embed Code' section and paste it directly into your README.md file. The SVG will automatically render when your README is viewed."
            },
            {
              question: "Can I use custom fonts not available on Google Fonts?",
              answer: "Currently, only Google Fonts are supported for automatic embedding. You can specify any font family name in the font field, but it will only work if the font is available on the user's system."
            },
            {
              question: "What's the difference between multiline and single-line mode?",
              answer: "Multiline mode displays each line on a new line, while single-line mode retypes all lines on the same line. Use multiline for a list-style display and single-line for a typing effect on one line."
            },
            {
              question: "Can I customize the typing animation speed?",
              answer: "Yes! Use the Duration slider to control how fast each line types (in milliseconds), and the Pause slider to control the delay between lines. Lower values make the animation faster."
            },
            {
              question: "How do I share my configuration with others?",
              answer: "Simply copy the URL from your browser address bar - it contains all your settings. You can also use the Direct URL from the embed code section to share the exact SVG image."
            },
            {
              question: "Is there a limit to the number of lines I can add?",
              answer: "No, you can add as many lines as you want using the 'Add line' button. However, keep in mind that more lines may require adjusting the width and height for proper display."
            },
            {
              question: "Can I use this on platforms other than GitHub?",
              answer: "Absolutely! The SVG works anywhere that supports Markdown or HTML, including GitLab, Bitbucket, personal websites, documentation sites, and more."
            },
            {
              question: "What's the maximum size for the SVG?",
              answer: "Width can go up to 1000px and height up to 500px, but you should adjust based on your content and layout needs. Larger sizes may affect loading times."
            }
          ].map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  aria-expanded={expandedFaq === index}
                >
                  <span className="font-medium text-sm sm:text-base text-slate-900 dark:text-slate-50 pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

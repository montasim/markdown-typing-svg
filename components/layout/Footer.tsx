import Link from 'next/link';
import { Github, Keyboard, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: siteConfig.contact.linkedinUrl,
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: siteConfig.developer.githubUrl,
    icon: Github,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Logo & Description */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <Keyboard className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900 dark:text-slate-50" />
              <span className="font-bold text-slate-900 dark:text-slate-50">
                {siteConfig.projectName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {siteConfig.projectDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-3 sm:mb-4">
              Connect
            </h3>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
          <p className="text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} {siteConfig.projectName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

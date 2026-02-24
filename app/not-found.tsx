import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Home, Keyboard } from 'lucide-react';
import Link from 'next/link';
import { generateNotFoundMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateNotFoundMetadata();

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          {/* 404 Display */}
          <div className="relative">
            <div className="text-9xl font-bold text-slate-200 dark:text-slate-800">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Search className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Page Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/" className="block w-full">
              <Button className="w-full" size="lg">
                <Home className="mr-2 w-5 h-5" />
                Go to Home
              </Button>
            </Link>

            <Link href="/" className="block w-full">
              <Button variant="outline" className="w-full" size="lg">
                <Keyboard className="mr-2 w-4 h-4" />
                Try the Editor
              </Button>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              Looking for something else?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/terms"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Terms
              </Link>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <Link
                href="/privacy"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Privacy
              </Link>
              <span className="text-slate-400 dark:text-slate-600">•</span>
              <Link
                href="/contact"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

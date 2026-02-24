'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home, Github } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            {error.message && (
              <p className="text-sm text-slate-500 dark:text-slate-500 font-mono bg-slate-100 dark:bg-slate-900 p-3 rounded-md">
                {error.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="mr-2 w-5 h-5" />
              Try Again
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full" size="lg">
                  <Home className="mr-2 w-4 h-4" />
                  Home
                </Button>
              </Link>

              <a
                href={siteConfig.github.issuesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button variant="outline" className="w-full" size="lg">
                  <Github className="mr-2 w-4 h-4" />
                  Report Issue
                </Button>
              </a>
            </div>
          </div>

          {/* Additional Help */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Need help?{' '}
              <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

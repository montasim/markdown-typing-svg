import { NextRequest, NextResponse } from 'next/server';
import { SVGGenerator } from '@/lib/svg/generator';
import { TypingSVGOptionsSchema } from '@/lib/validation/schema';
import { parseQueryParams } from '@/lib/utils/url';
import { defaultOptions } from '@/config/defaults';

/**
 * GET /api/svg
 * Generates an SVG with typing animation based on query parameters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Check if lines parameter is provided
    if (!searchParams.get('lines')) {
      // Redirect to root page if no lines provided
      const rootUrl = new URL('/', request.url);
      return NextResponse.redirect(rootUrl);
    }

    // Parse query parameters
    const parsedOptions = parseQueryParams(searchParams);
    
    // Merge with defaults
    const options = {
      ...defaultOptions,
      ...parsedOptions,
    };

    // Validate options
    const validatedOptions = TypingSVGOptionsSchema.parse(options);

    // Generate SVG
    const generator = new SVGGenerator(validatedOptions);
    const svg = await generator.generate();

    // Return SVG with appropriate headers
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
        'CDN-Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('SVG generation error:', error);
    
    // Return error SVG
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate SVG';
    const errorSVG = generateErrorSVG(errorMessage);
    
    return new NextResponse(errorSVG, {
      status: 422,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
      },
    });
  }
}

/**
 * Generate an error SVG
 */
function generateErrorSVG(message: string): string {
  return `<!-- Error -->
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='50' viewBox='0 0 400 50'>
  <rect width='100%' height='100%' fill='#00000000'/>
  <text x='0' y='30' font-family='monospace' font-size='14' fill='#ff6464'>
    Error: ${escapeHTML(message)}
  </text>
</svg>`;
}

/**
 * Escape HTML special characters
 */
function escapeHTML(str: string): string {
  return str.replace(/[&<>"']/g, (char) => {
    const escapeMap: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escapeMap[char];
  });
}

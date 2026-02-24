/**
 * Google Fonts converter service
 * Handles fetching and converting Google Fonts to base64 for SVG embedding
 */

interface FontCacheEntry {
  css: string;
  timestamp: number;
}

export class GoogleFontConverter {
  private static cache = new Map<string, FontCacheEntry>();
  private static readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  /**
   * Fetch and convert Google Font to CSS with base64 encoded font data
   */
  static async fetchFontCSS(
    font: string,
    weight: number,
    text: string
  ): Promise<string> {
    const cacheKey = `${font}-${weight}-${text}`;
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.css;
    }

    try {
      // Fetch from Google Fonts API
      const css = await this.fetchFromGoogleFonts(font, weight, text);
      
      // Encode font files to base64
      const encodedCSS = await this.encodeFonts(css);
      
      // Cache the result
      this.cache.set(cacheKey, {
        css: encodedCSS,
        timestamp: Date.now(),
      });
      
      return encodedCSS;
    } catch (error) {
      console.error('Failed to fetch Google Font:', error);
      return '';
    }
  }

  /**
   * Fetch CSS from Google Fonts API
   */
  private static async fetchFromGoogleFonts(
    font: string,
    weight: number,
    text: string
  ): Promise<string> {
    const url = new URL('https://fonts.googleapis.com/css2');
    url.searchParams.set('family', `${font}:wght@${weight}`);
    url.searchParams.set('text', text);
    url.searchParams.set('display', 'fallback');

    const response = await fetch(url.toString(), {
      next: { revalidate: this.CACHE_DURATION / 1000 }, // Cache for 24 hours
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.statusText}`);
    }

    return await response.text();
  }

  /**
   * Replace font URLs in CSS with base64 data URIs
   */
  private static async encodeFonts(css: string): Promise<string> {
    const urlRegex = /\((https:\/\/fonts\.gstatic\.com.+?)\) format\('(.*?)'\)/g;
    const matches = [...css.matchAll(urlRegex)];

    for (const match of matches) {
      const [_, url, fontType] = match;
      try {
        const fontData = await this.fetchFontData(url);
        const dataURI = `data:font/${fontType};base64,${fontData}`;
        css = css.replace(url, dataURI);
      } catch (error) {
        console.error(`Failed to encode font from ${url}:`, error);
        // Continue with other fonts if one fails
      }
    }

    return `<style>\n${css}</style>\n`;
  }

  /**
   * Fetch font file and convert to base64
   */
  private static async fetchFontData(url: string): Promise<string> {
    const response = await fetch(url, {
      next: { revalidate: this.CACHE_DURATION / 1000 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch font data: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
  }

  /**
   * Clear the font cache
   */
  static clearCache(): void {
    this.cache.clear();
  }
}

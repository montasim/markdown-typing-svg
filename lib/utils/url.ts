import { TypingSVGOptions } from '@/types/options';
import { defaultOptions } from '@/config/defaults';

/**
 * Build query string from options, excluding default values
 */
export function buildQueryString(options: TypingSVGOptions): string {
  const params = new URLSearchParams();
  
  // Set lines with separator - custom encode to preserve semicolons
  params.set('lines', customEncode(options.lines.join(options.separator)));
  
  // Only include non-default values for other parameters
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'lines') return; // Already handled above
    
    const keyOfOptions = key as keyof TypingSVGOptions;
    const defaultValue = defaultOptions[keyOfOptions];
    
    // Skip if value matches default
    let shouldSkip = false;
    if (Array.isArray(value) && Array.isArray(defaultValue)) {
      // Compare arrays by value
      shouldSkip = JSON.stringify(value) === JSON.stringify(defaultValue);
    } else {
      shouldSkip = value === defaultValue;
    }
    
    if (!shouldSkip) {
      // Remove hash from colors for URL
      let stringValue = String(value);
      if (key === 'color' || key === 'background') {
        stringValue = stringValue.replace(/^#/, '');
      }
      params.set(key, stringValue);
    }
  });

  return params.toString();
}

/**
 * Custom encode that keeps semicolons and spaces
 */
export function customEncode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%3B/g, ';')
    .replace(/%20/g, '+');
}

/**
 * Parse query parameters from URLSearchParams
 */
export function parseQueryParams(searchParams: URLSearchParams): Partial<TypingSVGOptions> {
  const options: Partial<TypingSVGOptions> = {};
  
  const lines = searchParams.get('lines');
  if (lines) {
    // Decode URL-encoded characters (handles %2C for commas, %20 for spaces, etc.)
    // URLSearchParams.get() already decodes once, but we need to handle cases
    // where the URL might be double-encoded
    let decodedLines: string;
    try {
      decodedLines = decodeURIComponent(lines);
      // Handle double-encoded URLs by checking if there are still encoded patterns
      // after the first decode (e.g., %25 becomes % after first decode)
      // Continue decoding until no more percent-encoded sequences remain
      while (/%[0-9A-F]{2}/i.test(decodedLines)) {
        decodedLines = decodeURIComponent(decodedLines);
      }
    } catch {
      // If decoding fails, use the original value
      decodedLines = lines;
    }
    // Replace + with spaces (URL encoding uses + for spaces)
    decodedLines = decodedLines.replace(/\+/g, ' ');
    const separator = searchParams.get('separator') || ';';
    options.lines = decodedLines.split(separator).filter(line => line.length > 0);
  }
  
  const font = searchParams.get('font');
  if (font) options.font = font;
  
  const weight = searchParams.get('weight');
  if (weight) {
    const parsedWeight = parseInt(weight, 10);
    if (!isNaN(parsedWeight)) {
      options.weight = parsedWeight;
    }
  }
  
  const size = searchParams.get('size');
  if (size) {
    const parsedSize = parseInt(size, 10);
    if (!isNaN(parsedSize)) {
      options.size = parsedSize;
    }
  }
  
  const color = searchParams.get('color');
  if (color) options.color = `#${color}`;
  
  const background = searchParams.get('background');
  if (background) options.background = `#${background}`;
  
  const center = searchParams.get('center');
  if (center) options.center = center === 'true';
  
  const vCenter = searchParams.get('vCenter');
  if (vCenter) options.vCenter = vCenter === 'true';
  
  const width = searchParams.get('width');
  if (width) {
    const parsedWidth = parseInt(width, 10);
    if (!isNaN(parsedWidth)) {
      options.width = parsedWidth;
    }
  }
  
  const height = searchParams.get('height');
  if (height) {
    const parsedHeight = parseInt(height, 10);
    if (!isNaN(parsedHeight)) {
      options.height = parsedHeight;
    }
  }
  
  const multiline = searchParams.get('multiline');
  if (multiline) options.multiline = multiline === 'true';
  
  const duration = searchParams.get('duration');
  if (duration) {
    const parsedDuration = parseInt(duration, 10);
    if (!isNaN(parsedDuration)) {
      options.duration = parsedDuration;
    }
  }
  
  const pause = searchParams.get('pause');
  if (pause) {
    const parsedPause = parseInt(pause, 10);
    if (!isNaN(parsedPause)) {
      options.pause = parsedPause;
    }
  }
  
  const repeat = searchParams.get('repeat');
  if (repeat) options.repeat = repeat === 'true';
  
  const random = searchParams.get('random');
  if (random) options.random = random === 'true';
  
  const separator = searchParams.get('separator');
  if (separator) options.separator = separator;
  
  const letterSpacing = searchParams.get('letterSpacing');
  if (letterSpacing) {
    // Validate that it's a reasonable CSS value (number, normal, or valid unit)
    const validPattern = /^(normal|\d+(\.\d+)?(px|em|rem|%|ch|ex|vw|vh)?)$/;
    if (validPattern.test(letterSpacing)) {
      options.letterSpacing = letterSpacing;
    }
  }
  
  return options;
}

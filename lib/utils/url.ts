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
    
    const defaultValue = defaultOptions[key as keyof TypingSVGOptions];
    
    // Skip if value matches default
    if (value !== defaultValue) {
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
    // Replace + with spaces (URL-encoded spaces)
    const decodedLines = lines.replace(/\+/g, ' ');
    const separator = searchParams.get('separator') || ';';
    options.lines = decodedLines.split(separator).filter(line => line.length > 0);
  }
  
  const font = searchParams.get('font');
  if (font) options.font = font;
  
  const weight = searchParams.get('weight');
  if (weight) options.weight = parseInt(weight, 10);
  
  const size = searchParams.get('size');
  if (size) options.size = parseInt(size, 10);
  
  const color = searchParams.get('color');
  if (color) options.color = `#${color}`;
  
  const background = searchParams.get('background');
  if (background) options.background = `#${background}`;
  
  const center = searchParams.get('center');
  if (center) options.center = center === 'true';
  
  const vCenter = searchParams.get('vCenter');
  if (vCenter) options.vCenter = vCenter === 'true';
  
  const width = searchParams.get('width');
  if (width) options.width = parseInt(width, 10);
  
  const height = searchParams.get('height');
  if (height) options.height = parseInt(height, 10);
  
  const multiline = searchParams.get('multiline');
  if (multiline) options.multiline = multiline === 'true';
  
  const duration = searchParams.get('duration');
  if (duration) options.duration = parseInt(duration, 10);
  
  const pause = searchParams.get('pause');
  if (pause) options.pause = parseInt(pause, 10);
  
  const repeat = searchParams.get('repeat');
  if (repeat) options.repeat = repeat === 'true';
  
  const random = searchParams.get('random');
  if (random) options.random = random === 'true';
  
  const separator = searchParams.get('separator');
  if (separator) options.separator = separator;
  
  const letterSpacing = searchParams.get('letterSpacing');
  if (letterSpacing) options.letterSpacing = letterSpacing;
  
  return options;
}

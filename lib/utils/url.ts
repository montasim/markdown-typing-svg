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
      if (key === 'color' || key === 'background' || key === 'gradientFrom' || key === 'gradientTo' || key === 'cursorColor' || key === 'textShadowColor') {
        stringValue = stringValue.replace(/^#/, '');
      }
      // Handle characterPauses array
      if (key === 'characterPauses' && Array.isArray(value)) {
        stringValue = value.join(',');
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

  const gradient = searchParams.get('gradient');
  if (gradient) options.gradient = gradient === 'true';

  const gradientFrom = searchParams.get('gradientFrom');
  if (gradientFrom) options.gradientFrom = `#${gradientFrom}`;

  const gradientTo = searchParams.get('gradientTo');
  if (gradientTo) options.gradientTo = `#${gradientTo}`;

  const cursor = searchParams.get('cursor');
  if (cursor) options.cursor = cursor === 'true';

  const cursorColor = searchParams.get('cursorColor');
  if (cursorColor) options.cursorColor = `#${cursorColor}`;

  const borderRadius = searchParams.get('borderRadius');
  if (borderRadius) {
    const parsedBorderRadius = parseInt(borderRadius, 10);
    if (!isNaN(parsedBorderRadius)) {
      options.borderRadius = parsedBorderRadius;
    }
  }

  const textShadow = searchParams.get('textShadow');
  if (textShadow) options.textShadow = textShadow === 'true';

  const textShadowBlur = searchParams.get('textShadowBlur');
  if (textShadowBlur) {
    const parsedTextShadowBlur = parseFloat(textShadowBlur);
    if (!isNaN(parsedTextShadowBlur)) {
      options.textShadowBlur = parsedTextShadowBlur;
    }
  }

  const textShadowColor = searchParams.get('textShadowColor');
  if (textShadowColor) options.textShadowColor = `#${textShadowColor}`;

  const textShadowOffsetX = searchParams.get('textShadowOffsetX');
  if (textShadowOffsetX) {
    const parsedTextShadowOffsetX = parseFloat(textShadowOffsetX);
    if (!isNaN(parsedTextShadowOffsetX)) {
      options.textShadowOffsetX = parsedTextShadowOffsetX;
    }
  }

  const textShadowOffsetY = searchParams.get('textShadowOffsetY');
  if (textShadowOffsetY) {
    const parsedTextShadowOffsetY = parseFloat(textShadowOffsetY);
    if (!isNaN(parsedTextShadowOffsetY)) {
      options.textShadowOffsetY = parsedTextShadowOffsetY;
    }
  }

  const animationType = searchParams.get('animationType');
  if (animationType && ['typing', 'fade', 'slide', 'bounce', 'wave'].includes(animationType)) {
    options.animationType = animationType as 'typing' | 'fade' | 'slide' | 'bounce' | 'wave';
  }

  const easing = searchParams.get('easing');
  if (easing && ['linear', 'ease-in', 'ease-out', 'ease-in-out', 'custom'].includes(easing)) {
    options.easing = easing as 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'custom';
  }

  const easingBezier = searchParams.get('easingBezier');
  if (easingBezier) options.easingBezier = easingBezier;

  const cursorStyle = searchParams.get('cursorStyle');
  if (cursorStyle && ['block', 'line', 'underscore'].includes(cursorStyle)) {
    options.cursorStyle = cursorStyle as 'block' | 'line' | 'underscore';
  }

  const reverseTyping = searchParams.get('reverseTyping');
  if (reverseTyping) options.reverseTyping = reverseTyping === 'true';

  const characterPauses = searchParams.get('characterPauses');
  if (characterPauses) {
    const parsedCharacterPauses = characterPauses.split(',').map(p => parseInt(p.trim(), 10)).filter(n => !isNaN(n));
    if (parsedCharacterPauses.length > 0) {
      options.characterPauses = parsedCharacterPauses;
    }
  }

  return options;
}

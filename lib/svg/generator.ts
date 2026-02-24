import { TypingSVGOptions } from '@/types/options';
import { GoogleFontConverter } from '@/lib/fonts/google-fonts';
import { AnimationCalculator } from './animation';

/**
 * SVG Generator service
 * Generates animated SVG with typing effect
 */
export class SVGGenerator {
  private options: TypingSVGOptions;
  private fontCSS: string;

  constructor(options: TypingSVGOptions) {
    this.options = { ...options };
    
    // Randomize lines if requested
    if (this.options.random) {
      this.options.lines = this.shuffleArray([...this.options.lines]);
    }
    
    this.fontCSS = '';
  }

  /**
   * Generate the complete SVG
   */
  async generate(): Promise<string> {
    await this.loadFontCSS();
    return this.renderSVG();
  }

  /**
   * Load Google Fonts CSS if needed
   */
  private async loadFontCSS(): Promise<void> {
    if (this.options.font !== 'monospace') {
      this.fontCSS = await GoogleFontConverter.fetchFontCSS(
        this.options.font,
        this.options.weight,
        this.options.lines.join('')
      );
    }
  }

  /**
   * Render the complete SVG string
   */
  private renderSVG(): string {
    const { width, height, background, size, multiline, lines, borderRadius } = this.options;
    const paths = this.generatePaths();
    const texts = this.generateTexts();
    const defs = this.generateDefs();
    const cursor = this.generateCursor();

    // Calculate appropriate height based on font size if current height is too small
    const calculatedHeight = this.calculateHeight(height, size, multiline, lines.length);

    // Generate rounded corners attribute if borderRadius > 0
    const rxAttr = borderRadius > 0 ? ` rx='${borderRadius}'` : '';

    return `<!-- https://github.com/DenverCoder1/readme-typing-svg/ -->
<svg xmlns='http://www.w3.org/2000/svg'
    xmlns:xlink='http://www.w3.org/1999/xlink'
    viewBox='0 0 ${width} ${calculatedHeight}'
    style='background-color: ${background};'
    width='${width}px' height='${calculatedHeight}px'>
  ${this.fontCSS}
  ${defs}
  <rect width='100%' height='100%' fill='${background}'${rxAttr} opacity='0'/>${background !== '#00000000' ? `\n  <rect width='100%' height='100%' fill='${background}'${rxAttr}/>` : ''}
  ${paths}
  ${texts}
  ${cursor}
</svg>`;
  }

  /**
   * Generate gradient definition for gradient text mode
   */
  private generateGradientDef(): string {
    const { gradient, gradientFrom, gradientTo } = this.options;

    if (!gradient) return '';

    return `<linearGradient id='textGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
      <stop offset='0%' stop-color='${gradientFrom}' />
      <stop offset='100%' stop-color='${gradientTo}' />
    </linearGradient>`;
  }

  /**
   * Generate filter definition for text shadow
   */
  private generateFilterDef(): string {
    const { textShadow, textShadowBlur, textShadowColor, textShadowOffsetX, textShadowOffsetY } = this.options;

    if (!textShadow) return '';

    return `<filter id='textShadow' x='-50%' y='-50%' width='200%' height='200%'>
      <feDropShadow
        dx='${textShadowOffsetX}'
        dy='${textShadowOffsetY}'
        stdDeviation='${textShadowBlur}'
        flood-color='${textShadowColor}'
        flood-opacity='0.5'
      />
    </filter>`;
  }

  /**
   * Generate combined defs block for gradient and/or text shadow
   */
  private generateDefs(): string {
    const gradientDef = this.generateGradientDef();
    const filterDef = this.generateFilterDef();

    if (!gradientDef && !filterDef) return '';

    return `<defs>
  ${gradientDef}
  ${filterDef}
</defs>`;
  }

  /**
   * Generate blinking cursor element
   */
  private generateCursor(): string {
    const { cursor, cursorColor, cursorStyle, size, font, center, vCenter, letterSpacing, lines, duration, pause, repeat } = this.options;

    if (!cursor || lines.length === 0) return '';

    // Calculate total animation time for the last line
    const totalDuration = duration + pause;
    const beginTime = lines.length > 1 ? `${(lines.length - 1) * totalDuration}ms` : '0ms';
    const repeatAttr = repeat ? `repeat indefinite` : '';

    // Generate cursor based on style
    switch (cursorStyle) {
      case 'block':
        return this.generateBlockCursor(cursorColor, size, center, vCenter, beginTime, repeatAttr);
      case 'line':
        return this.generateLineCursor(cursorColor, size, center, vCenter, beginTime, repeatAttr);
      case 'underscore':
        return this.generateUnderscoreCursor(cursorColor, size, center, vCenter, beginTime, repeatAttr);
      default:
        return this.generateBlockCursor(cursorColor, size, center, vCenter, beginTime, repeatAttr);
    }
  }

  private generateBlockCursor(color: string, size: number, center: boolean, vCenter: boolean, beginTime: string, repeatAttr: string): string {
    const cursorWidth = Math.max(2, size * 0.1);
    const cursorHeight = size * 0.8;
    return `<rect x='${center ? '50%' : '0'}' y='${vCenter ? '50%' : '10'}' width='${cursorWidth}' height='${cursorHeight}' fill='${color}'>
    <animate attributeName='opacity' values='1;0;0;1' keyTimes='0;0.4;0.6;1' dur='${cursorWidth * 100}ms' begin='${beginTime}' repeatCount='${repeatAttr}' />
  </rect>`;
  }

  private generateLineCursor(color: string, size: number, center: boolean, vCenter: boolean, beginTime: string, repeatAttr: string): string {
    const cursorWidth = Math.max(2, size * 0.05);
    const cursorHeight = size * 0.8;
    return `<rect x='${center ? '50%' : '0'}' y='${vCenter ? '50%' : '10'}' width='${cursorWidth}' height='${cursorHeight}' fill='${color}'>
    <animate attributeName='opacity' values='1;0;0;1' keyTimes='0;0.4;0.6;1' dur='${cursorWidth * 100}ms' begin='${beginTime}' repeatCount='${repeatAttr}' />
  </rect>`;
  }

  private generateUnderscoreCursor(color: string, size: number, center: boolean, vCenter: boolean, beginTime: string, repeatAttr: string): string {
    const cursorWidth = Math.max(2, size * 0.3);
    const cursorHeight = Math.max(2, size * 0.05);
    const cursorY = vCenter ? '50%' : '10';
    return `<rect x='${center ? '50%' : '0'}' y='${cursorY}' width='${cursorWidth}' height='${cursorHeight}' fill='${color}'>
    <animate attributeName='opacity' values='1;0;0;1' keyTimes='0;0.4;0.6;1' dur='${cursorWidth * 100}ms' begin='${beginTime}' repeatCount='${repeatAttr}' />
  </rect>`;
  }

  /**
   * Calculate appropriate height based on font size and configuration
   */
  private calculateHeight(currentHeight: number, fontSize: number, multiline: boolean, lineCount: number): number {
    const padding = Math.max(10, fontSize * 0.2); // Dynamic padding based on font size
    const lineHeight = fontSize + 5;
    
    if (multiline) {
      // For multiline, the last line's y-offset is (lineCount) * lineHeight
      // We need height to accommodate all lines plus padding
      const lastLineYOffset = lineCount * lineHeight;
      const requiredHeight = lastLineYOffset + padding;
      return Math.max(currentHeight, requiredHeight);
    } else {
      // For single line, ensure height is at least font size + padding
      const requiredHeight = fontSize + padding * 2;
      return Math.max(currentHeight, requiredHeight);
    }
  }

  /**
   * Generate all path elements with animations
   */
  private generatePaths(): string {
    return this.options.lines
      .map((_, index) => this.generatePath(index))
      .join('');
  }

  /**
   * Generate a single path element with animation
   */
  private generatePath(index: number): string {
    const animation = new AnimationCalculator(this.options, index).calculate();

    return `<path id='path${index}'>
  <animate id='d${index}' 
           attributeName='d' 
           begin='${animation.begin}'
           dur='${animation.dur}' 
           fill='${animation.fill}'
           values='${animation.values.join(' ; ')}' 
           keyTimes='${animation.keyTimes.join(';')}' />
</path>`;
  }

  /**
   * Generate all text elements
   */
  private generateTexts(): string {
    return this.options.lines
      .map((line, index) => this.generateText(line, index))
      .join('');
  }

  /**
   * Generate a single text element
   */
  private generateText(line: string, index: number): string {
    const { font, size, color, center, vCenter, letterSpacing, gradient, textShadow } = this.options;

    // Use gradient fill if gradient mode is enabled
    const fillValue = gradient ? 'url(#textGradient)' : color;

    // Apply text shadow filter if enabled
    const filterAttr = textShadow ? " filter='url(#textShadow)'" : '';

    return `<text font-family='"${font}", monospace'
      fill='${fillValue}'
      font-size='${size}'
      dominant-baseline='${vCenter ? 'middle' : 'auto'}'
      x='${center ? '50%' : '0%'}'
      text-anchor='${center ? 'middle' : 'start'}'
      letter-spacing='${letterSpacing}'${filterAttr}>
  <textPath xlink:href='#path${index}'>
    ${this.escapeHTML(line)}
  </textPath>
</text>`;
  }

  /**
   * Escape HTML special characters to prevent injection
   */
  private escapeHTML(str: string): string {
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

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}

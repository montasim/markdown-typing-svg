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
    const { width, height, background, size, multiline, lines } = this.options;
    const paths = this.generatePaths();
    const texts = this.generateTexts();

    // Calculate appropriate height based on font size if current height is too small
    const calculatedHeight = this.calculateHeight(height, size, multiline, lines.length);

    return `<!-- https://github.com/DenverCoder1/readme-typing-svg/ -->
<svg xmlns='http://www.w3.org/2000/svg'
    xmlns:xlink='http://www.w3.org/1999/xlink'
    viewBox='0 0 ${width} ${calculatedHeight}'
    style='background-color: ${background};'
    width='${width}px' height='${calculatedHeight}px'>
  ${this.fontCSS}
  ${paths}
  ${texts}
</svg>`;
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
    const { font, size, color, center, vCenter, letterSpacing } = this.options;

    return `<text font-family='"${font}", monospace' 
      fill='${color}' 
      font-size='${size}'
      dominant-baseline='${vCenter ? 'middle' : 'auto'}'
      x='${center ? '50%' : '0%'}' 
      text-anchor='${center ? 'middle' : 'start'}'
      letter-spacing='${letterSpacing}'>
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

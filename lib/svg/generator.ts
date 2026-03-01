import { TypingSVGOptions, SVGAnimationConfig } from '@/types/options';
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
    const cssDef = this.generateCSSAnimationDef();

    if (!gradientDef && !filterDef && !cssDef) return '';

    return `<defs>
  ${gradientDef}
  ${filterDef}
  ${cssDef}
</defs>`;
  }

  /**
   * Generate CSS animation definitions for bounce and wave
   */
  private generateCSSAnimationDef(): string {
    const { animationType, duration, pause } = this.options;

    if (animationType !== 'bounce' && animationType !== 'wave') return '';

    const totalDuration = duration + pause;
    let cssContent = '';

    if (animationType === 'bounce') {
      cssContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    .bounce-text {
      animation: bounce ${totalDuration}ms ease-in-out;
    }`;
    } else if (animationType === 'wave') {
      const text = this.options.lines.join('');
      // Generate per-character animation delays
      cssContent = `
    @keyframes wave {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .wave-char {
      display: inline-block;
      animation: wave ${totalDuration}ms ease-in-out;
      animation-iteration-count: 1;
    }`;
    }

    return `<style type='text/css'>
${cssContent}
</style>`;
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
   * For typing animation, generates animated paths
   * For fade/slide animations, generates static paths only
   */
  private generatePaths(): string {
    // For typing animation, we need animated paths
    // For fade/slide, paths are static (just for positioning textPath)
    const animationType = this.options.animationType;

    return this.options.lines
      .map((_, index) => {
        if (animationType === 'typing') {
          return this.generateAnimatedPath(index);
        } else {
          // For fade/slide, generate static invisible paths for textPath reference
          return this.generateStaticPath(index);
        }
      })
      .join('');
  }

  /**
   * Generate a single path element with animation (for typing animation)
   */
  private generateAnimatedPath(index: number): string {
    const animation = new AnimationCalculator(this.options, index).calculate();

    // Build animate attributes
    let animateAttrs = `attributeName='${animation.attributeName || 'd'}'`;

    animateAttrs += `
           begin='${animation.begin}'
           dur='${animation.dur}'
           fill='${animation.fill}'
           values='${animation.values.join(' ; ')}'
           keyTimes='${animation.keyTimes.join(';')}'`;

    // Add calcMode if specified (for easing)
    if (animation.calcMode) {
      animateAttrs += `
           calcMode='${animation.calcMode}'`;
    }

    // Add keySplines if specified (for spline easing)
    if (animation.keySplines && animation.keySplines.length > 0) {
      animateAttrs += `
           keySplines='${animation.keySplines.join(';')}'`;
    }

    return `<path id='path${index}'>
  <animate id='d${index}' ${animateAttrs} />
</path>`;
  }

  /**
   * Generate a static path for fade/slide animations (no animation, just for textPath)
   */
  private generateStaticPath(index: number): string {
    const { width, multiline, size } = this.options;
    const height = this.calculateHeight(this.options.height, size, multiline, this.options.lines.length);
    const nextIndex = index + 1;
    const lineHeight = size + 5;
    const yOffset = multiline ? nextIndex * lineHeight : height / 2;

    // Static path at full width for textPath to follow
    return `<path id='path${index}' d='m0,${yOffset} h${width}' />`;
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
   * For fade/slide animations, includes inline <animate> elements
   * For bounce/wave animations, applies CSS classes
   */
  private generateText(line: string, index: number): string {
    const { font, size, color, center, vCenter, letterSpacing, gradient, textShadow, animationType } = this.options;

    // Use gradient fill if gradient mode is enabled
    const fillValue = gradient ? 'url(#textGradient)' : color;

    // Apply text shadow filter if enabled
    const filterAttr = textShadow ? " filter='url(#textShadow)'" : '';

    // Build text element with potential inline animation or CSS classes
    const textElementStart = `<text font-family='"${font}", monospace'
      fill='${fillValue}'
      font-size='${size}'
      dominant-baseline='${vCenter ? 'middle' : 'auto'}'
      x='${center ? '50%' : '0%'}'
      text-anchor='${center ? 'middle' : 'start'}'
      letter-spacing='${letterSpacing}'${filterAttr}>`;

    const textElementEnd = `</text>`;

    // For bounce and wave animations, apply CSS classes
    if (animationType === 'bounce') {
      return `${textElementStart}
  <textPath xlink:href='#path${index}' class='bounce-text'>
    ${this.escapeHTML(line)}
  </textPath>
${textElementEnd}`;
    }

    if (animationType === 'wave') {
      // For wave, wrap each character in a tspan with staggered animation
      const chars = line.split('');
      const content = chars.map((char, i) => {
        const delay = (i * 0.1).toFixed(2);
        if (char === ' ') {
          return '<tspan xml:space="preserve"> </tspan>';
        }
        return `<tspan class='wave-char' style='animation-delay: ${delay}s'>${this.escapeHTML(char)}</tspan>`;
      }).join('');

      return `${textElementStart}
  <textPath xlink:href='#path${index}'>
    ${content}
  </textPath>
${textElementEnd}`;
    }

    // For fade and slide animations, we need inline animation on the text element
    if (animationType === 'fade' || animationType === 'slide') {
      const animation = new AnimationCalculator(this.options, index).calculate();
      const inlineAnimation = this.generateInlineAnimation(animation);

      return `${textElementStart}
  ${inlineAnimation}
  <textPath xlink:href='#path${index}'>
    ${this.escapeHTML(line)}
  </textPath>
${textElementEnd}`;
    }

    // For typing animation, no inline animation needed (it's on the path)
    return `${textElementStart}
  <textPath xlink:href='#path${index}'>
    ${this.escapeHTML(line)}
  </textPath>
${textElementEnd}`;
  }

  /**
   * Generate inline <animate> element for text-based animations (fade/slide)
   */
  private generateInlineAnimation(animation: SVGAnimationConfig): string {
    const isTransform = animation.attributeName === 'transform';

    // For transform animations, use animateTransform element
    if (isTransform) {
      let animateAttrs = `attributeName='${animation.attributeName}'
           type='${animation.type || 'translate'}'
           begin='${animation.begin}'
           dur='${animation.dur}'
           fill='${animation.fill}'
           values='${animation.values.join(';')}'
           keyTimes='${animation.keyTimes.join(';')}'`;

      // Add calcMode if specified
      if (animation.calcMode) {
        animateAttrs += `
           calcMode='${animation.calcMode}'`;
      }

      // Add keySplines if specified
      if (animation.keySplines && animation.keySplines.length > 0) {
        animateAttrs += `
           keySplines='${animation.keySplines.join(';')}'`;
      }

      return `<animateTransform ${animateAttrs} />`;
    }

    // For other attributes (like opacity), use regular animate element
    let animateAttrs = `attributeName='${animation.attributeName}'`;

    animateAttrs += `
           begin='${animation.begin}'
           dur='${animation.dur}'
           fill='${animation.fill}'
           values='${animation.values.join(';')}'
           keyTimes='${animation.keyTimes.join(';')}'`;

    // Add calcMode if specified
    if (animation.calcMode) {
      animateAttrs += `
           calcMode='${animation.calcMode}'`;
    }

    // Add keySplines if specified
    if (animation.keySplines && animation.keySplines.length > 0) {
      animateAttrs += `
           keySplines='${animation.keySplines.join(';')}'`;
    }

    return `<animate ${animateAttrs} />`;
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

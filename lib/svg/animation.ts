import { TypingSVGOptions, SVGAnimationConfig } from '@/types/options';

/**
 * Calculator for SVG animation properties
 */
export class AnimationCalculator {
  constructor(
    private options: TypingSVGOptions,
    private index: number
  ) {}

  /**
   * Calculate appropriate height based on font size and configuration
   */
  private calculateHeight(): number {
    const { size, multiline, lines } = this.options;
    const padding = Math.max(10, size * 0.2); // Dynamic padding based on font size
    const lineHeight = size + 5;
    
    if (multiline) {
      // For multiline, the last line's y-offset is (lineCount) * lineHeight
      // We need height to accommodate all lines plus padding
      const lastLineYOffset = lines.length * lineHeight;
      const requiredHeight = lastLineYOffset + padding;
      return Math.max(this.options.height, requiredHeight);
    } else {
      // For single line, ensure height is at least font size + padding
      const requiredHeight = size + padding * 2;
      return Math.max(this.options.height, requiredHeight);
    }
  }

  /**
   * Calculate animation configuration based on options
   */
  calculate(): SVGAnimationConfig {
    if (this.options.multiline) {
      return this.calculateMultilineAnimation();
    }
    return this.calculateSingleLineAnimation();
  }

  /**
   * Calculate animation for single line mode (retype on same line)
   */
  private calculateSingleLineAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, width } = this.options;
    const height = this.calculateHeight();
    const lastLineIndex = this.options.lines.length - 1;
    const yOffset = height / 2;
    const emptyLine = `m0,${yOffset} h0`;
    const fullLine = `m0,${yOffset} h${width}`;

    const begin = this.calculateBegin(lastLineIndex);
    const freeze = !repeat && this.index === lastLineIndex;
    const values = [emptyLine, fullLine, fullLine, freeze ? fullLine : emptyLine];
    const keyTimes = [
      '0',
      String((0.8 * duration) / (duration + pause)),
      String((0.8 * duration + pause) / (duration + pause)),
      '1',
    ];

    return {
      begin,
      dur: `${duration + pause}ms`,
      fill: freeze ? 'freeze' : 'remove',
      values,
      keyTimes,
    };
  }

  /**
   * Calculate animation for multiline mode (each line on new line)
   */
  private calculateMultilineAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, width, size } = this.options;
    const height = this.calculateHeight();
    const nextIndex = this.index + 1;
    const lineHeight = size + 5;
    const lineDuration = (duration + pause) * nextIndex;
    const yOffset = nextIndex * lineHeight;
    const emptyLine = `m0,${yOffset} h0`;
    const fullLine = `m0,${yOffset} h${width}`;

    const begin = `0s${repeat ? `;d${this.options.lines.length - 1}.end` : ''}`;
    const values = [emptyLine, emptyLine, fullLine, fullLine];
    const keyTimes = [
      '0',
      String(this.index / nextIndex),
      String(this.index / nextIndex + duration / lineDuration),
      '1',
    ];

    return {
      begin,
      dur: `${lineDuration}ms`,
      fill: 'freeze',
      values,
      keyTimes,
    };
  }

  /**
   * Calculate animation begin time
   */
  private calculateBegin(lastLineIndex: number): string {
    if (this.index === 0) {
      const { repeat } = this.options;
      return repeat ? `0s;d${lastLineIndex}.end` : '0s';
    }
    return `d${this.index - 1}.end`;
  }
}

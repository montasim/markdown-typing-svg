import { TypingSVGOptions, SVGAnimationConfig } from '@/types/options';

/**
 * Calculator for SVG animation properties
 */
export class AnimationCalculator {
  // Cache for word positions to avoid recalculation
  private wordPositionsCache: Map<number, number[]> = new Map();
  constructor(
    private options: TypingSVGOptions,
    private index: number
  ) {}

  /**
   * Get easing function for SMIL animation
   * Maps CSS easing functions to SMIL calcMode and keySplines
   * Returns keySplines array with appropriate number of values for the animation segments
   */
  private getEasingFunction(numSegments: number = 1): { calcMode: 'linear' | 'spline'; keySplines?: string[] } {
    const { easing, easingBezier } = this.options;

    // Standard CSS easing to SMIL keySplines mapping
    const easingMap: Record<string, string> = {
      'linear': '0 0 1 1',
      'ease-in': '0.42 0 1 1',
      'ease-out': '0 0 0.58 1',
      'ease-in-out': '0.42 0 0.58 1',
    };

    if (easing === 'custom' && easingBezier) {
      // Parse custom bezier (format: "0.4, 0, 0.2, 1")
      const customSpline = easingBezier.split(',').map(s => s.trim()).join(' ');
      // Create array with same value for each segment
      const keySplines = Array(numSegments).fill(customSpline);
      return { calcMode: 'spline', keySplines };
    }

    if (easing === 'linear') {
      return { calcMode: 'linear' };
    }

    // Create array with same easing for each segment
    const splineValue = easingMap[easing] || easingMap['linear'];
    const keySplines = Array(numSegments).fill(splineValue);
    return {
      calcMode: 'spline',
      keySplines,
    };
  }

  /**
   * Calculate cumulative positions (widths) for each word in the text
   * Returns array of positions where each position is the cumulative width up to that word
   */
  private calculateWordPositions(text: string): number[] {
    // Check cache first
    if (this.wordPositionsCache.has(this.index)) {
      return this.wordPositionsCache.get(this.index)!;
    }

    const words = text.split(' ');
    const positions: number[] = [0];  // Start at 0
    const { size, weight } = this.options;

    // Approximate character width based on font size
    // Monospace fonts have uniform width, variable fonts vary
    const isMonospace = this.options.font.toLowerCase().includes('mono');
    const avgCharWidth = size * (isMonospace ? 0.6 : 0.5);

    // Calculate cumulative width for each word
    let cumulativeWidth = 0;
    for (const word of words) {
      // Simple approximation: word length * average char width
      // Add space width (0.3 * avgCharWidth)
      cumulativeWidth += word.length * avgCharWidth;
      positions.push(Math.min(cumulativeWidth, this.options.width));
      cumulativeWidth += avgCharWidth * 0.3;  // Space after word
    }

    // Cache the result
    this.wordPositionsCache.set(this.index, positions);
    return positions;
  }

  /**
   * Apply word-level pauses to animation values and keyTimes
   * Extends keyTimes at word boundaries to create pause effect
   */
  private applyWordPauses(
    baseValues: (string | number)[],
    baseKeyTimes: string[],
    yOffset: number
  ): { values: (string | number)[]; keyTimes: string[] } {
    const { characterPauses, duration, pause } = this.options;

    // If no character pauses specified, return base values
    if (!characterPauses || characterPauses.length === 0) {
      return { values: baseValues, keyTimes: baseKeyTimes };
    }

    const text = this.options.lines[this.index];
    const words = text.split(' ');
    const wordPositions = this.calculateWordPositions(text);
    const totalDuration = duration + pause;

    // Convert character indices to word indices (pause after which word)
    // characterPauses contains character indices, we need to map to word boundaries
    const pauseAfterWords: number[] = [];
    for (const charIndex of characterPauses) {
      let charCount = 0;
      for (let i = 0; i < words.length; i++) {
        charCount += words[i].length + 1;  // +1 for space
        if (charIndex <= charCount) {
          pauseAfterWords.push(i + 1);  // Pause after this word (0-indexed)
          break;
        }
      }
    }

    // If no valid word pauses found, return base values
    if (pauseAfterWords.length === 0) {
      return { values: baseValues, keyTimes: baseKeyTimes };
    }

    // Build extended values and keyTimes with pauses
    const newValues: (string | number)[] = [];
    const newKeyTimes: string[] = [];

    // Original timing calculation
    const typingTime = 0.8 * duration;  // 80% of duration for typing
    const timePerPosition = typingTime / wordPositions[wordPositions.length - 1];

    let currentTime = 0;
    let lastValue = baseValues[0];

    for (let i = 0; i < wordPositions.length; i++) {
      const position = wordPositions[i];
      const pathValue = typeof baseValues[0] === 'string'
        ? (baseValues[0] as string).replace(/h\d+/, `h${position}`)
        : position;

      // Add the path value
      newValues.push(pathValue);
      newKeyTimes.push(String(currentTime / totalDuration));

      // If this is a pause point, add duplicate value with extended time
      if (pauseAfterWords.includes(i)) {
        const pauseDuration = pause * 0.5;  // Use half of pause duration for word pause
        newValues.push(pathValue);  // Duplicate value (stay at same position)
        newKeyTimes.push(String((currentTime + pauseDuration) / totalDuration));
        currentTime += pauseDuration;
      }

      lastValue = pathValue;
      currentTime += timePerPosition;
    }

    return { values: newValues, keyTimes: newKeyTimes };
  }

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
    // Route to correct animation type based on animationType option
    switch (this.options.animationType) {
      case 'fade':
        return this.calculateFadeAnimation();
      case 'slide':
        return this.calculateSlideAnimation();
      case 'bounce':
      case 'wave':
        // For bounce and wave, return basic config but mark as CSS animation
        return this.calculateCSSAnimation();
      case 'typing':
      default:
        // Original typing animation
        if (this.options.multiline) {
          return this.calculateMultilineAnimation();
        }
        return this.calculateSingleLineAnimation();
    }
  }

  /**
   * Calculate animation for single line mode (retype on same line)
   */
  private calculateSingleLineAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, width, reverseTyping, characterPauses } = this.options;
    const height = this.calculateHeight();
    const lastLineIndex = this.options.lines.length - 1;
    const yOffset = height / 2;
    const emptyLine = `m0,${yOffset} h0`;
    const fullLine = `m0,${yOffset} h${width}`;

    const begin = this.calculateBegin(lastLineIndex);
    const freeze = !repeat && this.index === lastLineIndex;

    // Adjust values based on reverseTyping
    let baseValues: string[];
    if (reverseTyping) {
      // Start with full text, then delete
      baseValues = [fullLine, fullLine, emptyLine, freeze ? emptyLine : fullLine];
    } else {
      // Original: Start empty, then type
      baseValues = [emptyLine, fullLine, fullLine, freeze ? fullLine : emptyLine];
    }

    const baseKeyTimes = [
      '0',
      String((0.8 * duration) / (duration + pause)),
      String((0.8 * duration + pause) / (duration + pause)),
      '1',
    ];

    // Apply word pauses if characterPauses is specified
    let values: (string | number)[];
    let keyTimes: string[];

    if (characterPauses && characterPauses.length > 0 && !reverseTyping) {
      const paused = this.applyWordPauses(baseValues, baseKeyTimes, yOffset);
      values = paused.values;
      keyTimes = paused.keyTimes;
    } else {
      values = baseValues;
      keyTimes = baseKeyTimes;
    }

    const easing = this.getEasingFunction(3);  // 3 animation segments (4 keyTimes - 1)

    return {
      begin,
      dur: `${duration + pause}ms`,
      fill: freeze ? 'freeze' : 'remove',
      values: values as string[],
      keyTimes,
      calcMode: easing.calcMode,
      keySplines: easing.keySplines,
    };
  }

  /**
   * Calculate animation for multiline mode (each line on new line)
   */
  private calculateMultilineAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, width, size, reverseTyping } = this.options;
    const height = this.calculateHeight();
    const nextIndex = this.index + 1;
    const lineHeight = size + 5;
    const lineDuration = (duration + pause) * nextIndex;
    const yOffset = nextIndex * lineHeight;
    const emptyLine = `m0,${yOffset} h0`;
    const fullLine = `m0,${yOffset} h${width}`;

    const begin = `0s${repeat ? `;d${this.options.lines.length - 1}.end` : ''}`;

    // Adjust values and keyTimes based on reverseTyping
    let values: string[];
    let keyTimes: string[];

    if (reverseTyping) {
      // Line appears fully, then disappears
      values = [fullLine, fullLine, emptyLine, emptyLine];
      keyTimes = [
        '0',
        String(this.index / nextIndex),
        String(this.index / nextIndex + (duration / lineDuration) * 0.8),  // Faster deletion
        '1',
      ];
    } else {
      // Original: Line appears, stays visible
      values = [emptyLine, emptyLine, fullLine, fullLine];
      keyTimes = [
        '0',
        String(this.index / nextIndex),
        String(this.index / nextIndex + duration / lineDuration),
        '1',
      ];
    }

    const easing = this.getEasingFunction(3);  // 3 animation segments (4 keyTimes - 1)

    return {
      begin,
      dur: `${lineDuration}ms`,
      fill: 'freeze',
      values,
      keyTimes,
      calcMode: easing.calcMode,
      keySplines: easing.keySplines,
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

  /**
   * Calculate fade animation (opacity-based)
   */
  private calculateFadeAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, multiline, reverseTyping } = this.options;
    const lastLineIndex = this.options.lines.length - 1;
    const freeze = !repeat && this.index === lastLineIndex;

    let begin: string;
    let values: string[];
    let keyTimes: string[];

    if (multiline) {
      // Multiline fade: each line fades in sequentially
      const nextIndex = this.index + 1;
      const lineDuration = (duration + pause) * nextIndex;

      begin = `0s${repeat ? `;d${this.options.lines.length - 1}.end` : ''}`;

      if (reverseTyping) {
        values = ['1', '1', '0', '0'];  // Start visible, fade out
        keyTimes = [
          '0',
          String(this.index / nextIndex),
          String(this.index / nextIndex + (duration / lineDuration) * 0.8),
          '1',
        ];
      } else {
        values = ['0', '0', '1', '1'];  // Start invisible, fade in
        keyTimes = [
          '0',
          String(this.index / nextIndex),
          String(this.index / nextIndex + duration / lineDuration),
          '1',
        ];
      }

      const easing = this.getEasingFunction(3);  // 3 segments (4 keyTimes - 1)

      return {
        attributeName: 'opacity',
        begin,
        dur: `${lineDuration}ms`,
        fill: 'freeze',
        values,
        keyTimes,
        calcMode: easing.calcMode,
        keySplines: easing.keySplines,
      };
    } else {
      // Single-line fade: text fades in and out on same line
      begin = this.calculateBegin(lastLineIndex);

      if (reverseTyping) {
        values = ['1', '1', '0', freeze ? '0' : '1'];  // Start visible, fade out
      } else {
        values = ['0', '1', '1', freeze ? '1' : '0'];  // Start invisible, fade in
      }

      keyTimes = [
        '0',
        String((0.8 * duration) / (duration + pause)),
        String((0.8 * duration + pause) / (duration + pause)),
        '1',
      ];

      const easing = this.getEasingFunction(3);  // 3 segments (4 keyTimes - 1)

      return {
        attributeName: 'opacity',
        begin,
        dur: `${duration + pause}ms`,
        fill: freeze ? 'freeze' : 'remove',
        values,
        keyTimes,
        calcMode: easing.calcMode,
        keySplines: easing.keySplines,
      };
    }
  }

  /**
   * Calculate slide animation (transform-based)
   */
  private calculateSlideAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, width, multiline, reverseTyping } = this.options;
    const lastLineIndex = this.options.lines.length - 1;
    const freeze = !repeat && this.index === lastLineIndex;

    let begin: string;
    let values: string[];
    let keyTimes: string[];

    if (multiline) {
      // Multiline slide: each line slides in from left
      const nextIndex = this.index + 1;
      const lineDuration = (duration + pause) * nextIndex;

      begin = `0s${repeat ? `;d${this.options.lines.length - 1}.end` : ''}`;

      if (reverseTyping) {
        values = ['0', '0', `-${width}`, `-${width}`];  // Slide out to left
        keyTimes = [
          '0',
          String(this.index / nextIndex),
          String(this.index / nextIndex + (duration / lineDuration) * 0.8),
          '1',
        ];
      } else {
        values = [`-${width}`, `-${width}`, '0', '0'];  // Slide in from left
        keyTimes = [
          '0',
          String(this.index / nextIndex),
          String(this.index / nextIndex + duration / lineDuration),
          '1',
        ];
      }

      const easing = this.getEasingFunction(3);  // 3 segments (4 keyTimes - 1)

      return {
        attributeName: 'transform',
        type: 'translate',
        begin,
        dur: `${lineDuration}ms`,
        fill: 'freeze',
        values,
        keyTimes,
        calcMode: easing.calcMode,
        keySplines: easing.keySplines,
      };
    } else {
      // Single-line slide: text slides in and out on same line
      begin = this.calculateBegin(lastLineIndex);

      if (reverseTyping) {
        values = ['0', '0', `-${width}`, freeze ? `-${width}` : '0'];  // Slide out to left
      } else {
        values = [`-${width}`, '0', '0', freeze ? '0' : `-${width}`];  // Slide in from left
      }

      keyTimes = [
        '0',
        String((0.8 * duration) / (duration + pause)),
        String((0.8 * duration + pause) / (duration + pause)),
        '1',
      ];

      const easing = this.getEasingFunction(3);  // 3 segments (4 keyTimes - 1)

      return {
        attributeName: 'transform',
        type: 'translate',
        begin,
        dur: `${duration + pause}ms`,
        fill: freeze ? 'freeze' : 'remove',
        values,
        keyTimes,
        calcMode: easing.calcMode,
        keySplines: easing.keySplines,
      };
    }
  }

  /**
   * Calculate CSS-based animation (for bounce and wave)
   * Returns minimal config; actual animation is in embedded CSS
   */
  private calculateCSSAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, multiline } = this.options;
    const lastLineIndex = this.options.lines.length - 1;

    if (multiline) {
      const nextIndex = this.index + 1;
      const lineDuration = (duration + pause) * nextIndex;
      const begin = `0s${repeat ? `;d${this.options.lines.length - 1}.end` : ''}`;

      return {
        attributeName: 'css',
        begin,
        dur: `${lineDuration}ms`,
        fill: 'freeze',
        values: ['0'],
        keyTimes: ['0'],
      };
    } else {
      const begin = this.calculateBegin(lastLineIndex);
      const freeze = !repeat && this.index === lastLineIndex;

      return {
        attributeName: 'css',
        begin,
        dur: `${duration + pause}ms`,
        fill: freeze ? 'freeze' : 'remove',
        values: ['0'],
        keyTimes: ['0'],
      };
    }
  }
}

/**
 * Options for generating typing SVG
 */
export interface TypingSVGOptions {
  /** Text lines to display */
  lines: string[];
  /** Font family name */
  font: string;
  /** Font weight (100-900) */
  weight: number;
  /** Font size in pixels */
  size: number;
  /** Text color in hex format */
  color: string;
  /** Background color in hex format */
  background: string;
  /** Horizontally center text */
  center: boolean;
  /** Vertically center text */
  vCenter: boolean;
  /** SVG width in pixels */
  width: number;
  /** SVG height in pixels */
  height: number;
  /** Display each line on new line or retype on same line */
  multiline: boolean;
  /** Duration of typing animation per line in milliseconds */
  duration: number;
  /** Pause between lines in milliseconds */
  pause: number;
  /** Loop the animation */
  repeat: boolean;
  /** Separator used between lines */
  separator: string;
  /** Randomize line order */
  random: boolean;
  /** Letter spacing CSS value */
  letterSpacing: string;
  /** Enable gradient text effect */
  gradient: boolean;
  /** Gradient start color (for gradient mode) */
  gradientFrom: string;
  /** Gradient end color (for gradient mode) */
  gradientTo: string;
  /** Show blinking cursor at end of text */
  cursor: boolean;
  /** Cursor color */
  cursorColor: string;
  /** Border radius for background */
  borderRadius: number;
  /** Enable text shadow/glow effect */
  textShadow: boolean;
  /** Text shadow blur radius */
  textShadowBlur: number;
  /** Text shadow color */
  textShadowColor: string;
  /** Text shadow horizontal offset */
  textShadowOffsetX: number;
  /** Text shadow vertical offset */
  textShadowOffsetY: number;
  /** Animation type (typing, fade, slide, bounce, wave) */
  animationType: 'typing' | 'fade' | 'slide' | 'bounce' | 'wave';
  /** Animation easing function */
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'custom';
  /** Custom easing bezier curve (when easing is 'custom') */
  easingBezier?: string;
  /** Cursor style (block, line, underscore) */
  cursorStyle: 'block' | 'line' | 'underscore';
  /** Enable reverse typing effect */
  reverseTyping: boolean;
  /** Character pauses (array of character indices to pause at) */
  characterPauses?: number[];
}

/**
 * Configuration for SVG animation
 */
export interface SVGAnimationConfig {
  /** Animation begin time */
  begin: string;
  /** Animation duration */
  dur: string;
  /** Animation fill mode */
  fill: 'freeze' | 'remove';
  /** Animation values */
  values: string[];
  /** Animation key times */
  keyTimes: string[];
  /** SMIL calcMode for easing (linear, spline, discrete, paced) */
  calcMode?: 'linear' | 'spline' | 'discrete' | 'paced';
  /** Cubic-bezier control points for spline easing */
  keySplines?: string[];
  /** Attribute name to animate (d, opacity, transform) */
  attributeName?: string;
  /** Transform type (for transform animations) */
  type?: string;
}

/**
 * API response for SVG generation
 */
export interface SVGResponse {
  /** Generated SVG string */
  svg: string;
  /** Content type */
  contentType: string;
}

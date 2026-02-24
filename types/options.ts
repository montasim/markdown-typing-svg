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

import { TypingSVGOptions } from '@/types/options';

/**
 * Default options for TypingSVG
 */
export const defaultOptions: TypingSVGOptions = {
  lines: ['The five boxing wizards jump quickly'],
  font: 'Fira Code',
  weight: 400,
  size: 20,
  color: '#36BCF7',
  background: '#00000000',
  center: false,
  vCenter: false,
  width: 435,
  height: 50,
  multiline: false,
  duration: 5000,
  pause: 1000,
  repeat: true,
  separator: ';',
  random: false,
  letterSpacing: 'normal',
};

/**
 * Dummy text for default line values
 */
export const dummyText = [
  'The five boxing wizards jump quickly',
  'How vexingly quick daft zebras jump',
  'Quick fox jumps nightly above wizard',
  'Sphinx of black quartz, judge my vow',
  'Waltz, bad nymph, for quick jigs vex',
  'Glib jocks quiz nymph to vex dwarf',
  'Jived fox nymph grabs quick waltz',
];

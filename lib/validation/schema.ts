import { z } from 'zod';
import { TypingSVGOptions } from '@/types/options';

/**
 * Zod schema for validating TypingSVGOptions
 */
export const TypingSVGOptionsSchema: z.ZodType<TypingSVGOptions> = z.object({
  lines: z.array(z.string().min(1)).min(1, 'At least one line is required'),
  font: z.string().regex(/^[A-Za-z0-9\- ]+$/, 'Font can only contain letters, numbers, spaces, and hyphens'),
  weight: z.number().int().min(100).max(900),
  size: z.number().int().positive('Font size must be positive'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/, 'Invalid color format'),
  background: z.string().regex(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/, 'Invalid color format'),
  center: z.boolean(),
  vCenter: z.boolean(),
  width: z.number().int().positive('Width must be positive'),
  height: z.number().int().positive('Height must be positive'),
  multiline: z.boolean(),
  duration: z.number().int().positive('Duration must be positive'),
  pause: z.number().int().nonnegative('Pause must be non-negative'),
  repeat: z.boolean(),
  separator: z.string(),
  random: z.boolean(),
  letterSpacing: z.string(),
});

/**
 * Validate options using the schema
 */
export function validateOptions(options: Partial<TypingSVGOptions>): TypingSVGOptions {
  return TypingSVGOptionsSchema.parse(options);
}

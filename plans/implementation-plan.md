# Markdown Typing SVG - Implementation Plan

## Project Overview

Convert the existing PHP-based "Readme Typing SVG" application to a modern Next.js application with a clean, modern, gradient UI and background shapes. The application generates animated SVG images with typing effects for GitHub READMEs.

## Architecture Principles

- **Clean Code**: Readable, maintainable, and well-documented code
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Modular Approach**: Separated concerns with clear module boundaries
- **Next.js Best Practices**: App Router, Server Components, API Routes, TypeScript, Tailwind CSS

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Form Handling**: React Hook Form (optional)
- **Validation**: Zod
- **SVG Generation**: Server-side rendering with React components

## Project Structure

```
markdown-typing-svg/
├── app/
│   ├── api/
│   │   └── svg/
│   │       └── route.ts              # API endpoint for SVG generation
│   ├── demo/
│   │   └── page.tsx                 # Demo/editor page
│   ├── layout.tsx                   # Root layout with theme provider
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Global styles
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── card.tsx
│   │   ├── slider.tsx
│   │   ├── switch.tsx
│   │   ├── tooltip.tsx
│   │   ├── tabs.tsx
│   │   └── color-picker.tsx         # Custom color picker component
│   ├── demo/
│   │   ├── PreviewSection.tsx       # Live preview of SVG
│   │   ├── OptionsPanel.tsx         # Configuration options
│   │   ├── LinesEditor.tsx          # Add/remove text lines
│   │   ├── CodeOutput.tsx           # Markdown/HTML code display
│   │   ├── CopyButton.tsx           # Copy to clipboard button
│   │   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   │   └── BorderToggle.tsx         # Show/hide border toggle
│   ├── svg/
│   │   ├── TypingSVG.tsx            # Main SVG component
│   │   ├── SVGPath.tsx              # Animated path component
│   │   └── SVGText.tsx              # Text component with textPath
│   └── layout/
│       ├── Header.tsx               # Page header
│       ├── Footer.tsx               # Page footer
│       └── BackgroundShapes.tsx     # Decorative background shapes
├── lib/
│   ├── svg/
│   │   ├── generator.ts             # SVG generation logic
│   │   ├── animation.ts             # Animation calculations
│   │   └── templates.ts             # SVG template builders
│   ├── fonts/
│   │   ├── google-fonts.ts          # Google Fonts API integration
│   │   ├── font-converter.ts       # Font to base64 conversion
│   │   └── font-cache.ts           # Font caching strategy
│   ├── validation/
│   │   ├── schema.ts                # Zod validation schemas
│   │   └── validators.ts            # Custom validation functions
│   ├── utils/
│   │   ├── url.ts                   # URL encoding/decoding utilities
│   │   ├── color.ts                 # Color manipulation utilities
│   │   └── string.ts                # String manipulation utilities
│   └── constants.ts                 # Application constants
├── types/
│   ├── svg.ts                       # SVG-related type definitions
│   ├── options.ts                   # Options type definitions
│   └── api.ts                       # API response types
├── hooks/
│   ├── useSVGGenerator.ts           # Custom hook for SVG generation
│   ├── useDebounce.ts               # Debounce hook
│   ├── useLocalStorage.ts            # Local storage persistence
│   └── useTheme.ts                  # Theme management hook
├── config/
│   ├── fonts.ts                     # Available fonts configuration
│   └── defaults.ts                  # Default values
└── public/
    └── fonts/                       # Pre-cached fonts (optional)
```

## Core Features Implementation

### 1. SVG Generation Engine

#### 1.1 Type Definitions

```typescript
// types/options.ts
export interface TypingSVGOptions {
  lines: string[];
  font: string;
  weight: number;
  size: number;
  color: string;
  background: string;
  center: boolean;
  vCenter: boolean;
  width: number;
  height: number;
  multiline: boolean;
  duration: number;
  pause: number;
  repeat: boolean;
  separator: string;
  random: boolean;
  letterSpacing: string;
}

export interface SVGAnimationConfig {
  begin: string;
  dur: string;
  fill: 'freeze' | 'remove';
  values: string[];
  keyTimes: string[];
}
```

#### 1.2 Validation Layer

```typescript
// lib/validation/schema.ts
import { z } from 'zod';

export const TypingSVGOptionsSchema = z.object({
  lines: z.array(z.string().min(1)).min(1),
  font: z.string().regex(/^[A-Za-z0-9\- ]+$/),
  weight: z.number().int().min(100).max(900),
  size: z.number().int().positive(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/),
  background: z.string().regex(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/),
  center: z.boolean(),
  vCenter: z.boolean(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  multiline: z.boolean(),
  duration: z.number().int().positive(),
  pause: z.number().int().nonnegative(),
  repeat: z.boolean(),
  separator: z.string(),
  random: z.boolean(),
  letterSpacing: z.string(),
});
```

#### 1.3 SVG Generator Service

```typescript
// lib/svg/generator.ts
export class SVGGenerator {
  private options: TypingSVGOptions;
  private fontCSS: string;

  constructor(options: TypingSVGOptions) {
    this.options = options;
    this.fontCSS = '';
  }

  async generate(): Promise<string> {
    await this.loadFontCSS();
    return this.renderSVG();
  }

  private async loadFontCSS(): Promise<void> {
    if (this.options.font !== 'monospace') {
      this.fontCSS = await GoogleFontConverter.fetchFontCSS(
        this.options.font,
        this.options.weight,
        this.options.lines.join('')
      );
    }
  }

  private renderSVG(): string {
    const { width, height, background } = this.options;
    const paths = this.generatePaths();
    const texts = this.generateTexts();

    return `
<svg xmlns='http://www.w3.org/2000/svg'
    xmlns:xlink='http://www.w3.org/1999/xlink'
    viewBox='0 0 ${width} ${height}'
    style='background-color: ${background};'
    width='${width}px' height='${height}px'>
  ${this.fontCSS}
  ${paths}
  ${texts}
</svg>`;
  }

  private generatePaths(): string {
    return this.options.lines.map((_, index) => 
      this.generatePath(index)
    ).join('');
  }

  private generatePath(index: number): string {
    const animation = this.calculateAnimation(index);
    return `
<path id='path${index}'>
  <animate id='d${index}' 
           attributeName='d' 
           begin='${animation.begin}'
           dur='${animation.dur}ms' 
           fill='${animation.fill}'
           values='${animation.values.join(' ; ')}' 
           keyTimes='${animation.keyTimes.join(';')}' />
</path>`;
  }

  private generateTexts(): string {
    return this.options.lines.map((line, index) => 
      this.generateText(line, index)
    ).join('');
  }

  private generateText(line: string, index: number): string {
    const { font, size, color, center, vCenter, letterSpacing } = this.options;
    return `
<text font-family='"${font}", monospace' 
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

  private calculateAnimation(index: number): SVGAnimationConfig {
    // Animation calculation logic
    // ... implementation
  }

  private escapeHTML(str: string): string {
    return str.replace(/[&<>"']/g, (char) => {
      const escapeMap: Record<string, string> = {
        '&': '&',
        '<': '<',
        '>': '>',
        '"': '"',
        "'": ''',
      };
      return escapeMap[char];
    });
  }
}
```

#### 1.4 Animation Calculator

```typescript
// lib/svg/animation.ts
export class AnimationCalculator {
  constructor(
    private options: TypingSVGOptions,
    private index: number
  ) {}

  calculate(): SVGAnimationConfig {
    if (this.options.multiline) {
      return this.calculateMultilineAnimation();
    }
    return this.calculateSingleLineAnimation();
  }

  private calculateSingleLineAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, width, height } = this.options;
    const lastLineIndex = this.options.lines.length - 1;
    const yOffset = height / 2;
    const emptyLine = `m0,${yOffset} h0`;
    const fullLine = `m0,${yOffset} h${width}`;

    const begin = this.calculateBegin(lastLineIndex);
    const freeze = !repeat && this.index === lastLineIndex;
    const values = [emptyLine, fullLine, fullLine, freeze ? fullLine : emptyLine];
    const keyTimes = [
      '0',
      (0.8 * duration) / (duration + pause),
      (0.8 * duration + pause) / (duration + pause),
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

  private calculateMultilineAnimation(): SVGAnimationConfig {
    const { duration, pause, repeat, width, height, size } = this.options;
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
      this.index / nextIndex,
      this.index / nextIndex + duration / lineDuration,
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

  private calculateBegin(lastLineIndex: number): string {
    if (this.index === 0) {
      const { repeat } = this.options;
      return repeat ? `0s;d${lastLineIndex}.end` : '0s';
    }
    return `d${this.index - 1}.end`;
  }
}
```

### 2. Google Fonts Integration

```typescript
// lib/fonts/google-fonts.ts
export class GoogleFontConverter {
  private static cache = new Map<string, string>();

  static async fetchFontCSS(
    font: string,
    weight: number,
    text: string
  ): Promise<string> {
    const cacheKey = `${font}-${weight}-${text}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const css = await this.fetchFromGoogleFonts(font, weight, text);
      const encodedCSS = await this.encodeFonts(css);
      
      this.cache.set(cacheKey, encodedCSS);
      return encodedCSS;
    } catch (error) {
      console.error('Failed to fetch Google Font:', error);
      return '';
    }
  }

  private static async fetchFromGoogleFonts(
    font: string,
    weight: number,
    text: string
  ): Promise<string> {
    const url = new URL('https://fonts.googleapis.com/css2');
    url.searchParams.set('family', `${font}:wght@${weight}`);
    url.searchParams.set('text', text);
    url.searchParams.set('display', 'fallback');

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.statusText}`);
    }

    return await response.text();
  }

  private static async encodeFonts(css: string): Promise<string> {
    const urlRegex = /\((https:\/\/fonts\.gstatic\.com.+?)\) format\('(.*?)'\)/g;
    const matches = [...css.matchAll(urlRegex)];

    for (const match of matches) {
      const [_, url, fontType] = match;
      const fontData = await this.fetchFontData(url);
      const dataURI = `data:font/${fontType};base64,${fontData}`;
      css = css.replace(url, dataURI);
    }

    return `<style>\n${css}</style>\n`;
  }

  private static async fetchFontData(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch font data: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
  }
}
```

### 3. API Route

```typescript
// app/api/svg/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SVGGenerator } from '@/lib/svg/generator';
import { TypingSVGOptionsSchema } from '@/lib/validation/schema';
import { parseQueryParams } from '@/lib/utils/url';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const options = parseQueryParams(searchParams);

    // Validate options
    const validatedOptions = TypingSVGOptionsSchema.parse(options);

    // Generate SVG
    const generator = new SVGGenerator(validatedOptions);
    const svg = await generator.generate();

    // Return SVG with appropriate headers
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: error.errors },
        { status: 422 }
      );
    }

    console.error('SVG generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate SVG' },
      { status: 500 }
    );
  }
}
```

### 4. Demo Page Components

#### 4.1 Main Demo Page

```typescript
// app/demo/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { PreviewSection } from '@/components/demo/PreviewSection';
import { OptionsPanel } from '@/components/demo/OptionsPanel';
import { LinesEditor } from '@/components/demo/LinesEditor';
import { CodeOutput } from '@/components/demo/CodeOutput';
import { defaultOptions } from '@/config/defaults';
import { TypingSVGOptions } from '@/types/options';
import { useDebounce } from '@/hooks/useDebounce';

export default function DemoPage() {
  const [options, setOptions] = useState<TypingSVGOptions>(defaultOptions);
  const debouncedOptions = useDebounce(options, 300);

  const handleOptionsChange = useCallback((newOptions: Partial<TypingSVGOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  const handleLinesChange = useCallback((lines: string[]) => {
    setOptions(prev => ({ ...prev, lines }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <BackgroundShapes />
      
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Options */}
          <div className="space-y-6">
            <LinesEditor
              lines={options.lines}
              onChange={handleLinesChange}
            />
            <OptionsPanel
              options={options}
              onChange={handleOptionsChange}
            />
          </div>

          {/* Right Panel - Preview & Output */}
          <div className="space-y-6">
            <PreviewSection options={debouncedOptions} />
            <CodeOutput options={debouncedOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### 4.2 Lines Editor Component

```typescript
// components/demo/LinesEditor.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus } from 'lucide-react';

interface LinesEditorProps {
  lines: string[];
  onChange: (lines: string[]) => void;
}

export function LinesEditor({ lines, onChange }: LinesEditorProps) {
  const dummyText = [
    'The five boxing wizards jump quickly',
    'How vexingly quick daft zebras jump',
    'Quick fox jumps nightly above wizard',
  ];

  const handleAddLine = () => {
    const newIndex = lines.length;
    const newText = dummyText[newIndex % dummyText.length];
    onChange([...lines, newText]);
  };

  const handleRemoveLine = (index: number) => {
    if (lines.length > 1) {
      onChange(lines.filter((_, i) => i !== index));
    }
  };

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...lines];
    newLines[index] = value;
    onChange(newLines);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Add your text</h2>
        <Button onClick={handleAddLine} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add line
        </Button>
      </div>

      <div className="space-y-3">
        {lines.map((line, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1">
              <Label htmlFor={`line-${index}`} className="sr-only">
                Line {index + 1}
              </Label>
              <Input
                id={`line-${index}`}
                value={line}
                onChange={(e) => handleLineChange(index, e.target.value)}
                placeholder="Enter text here"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleRemoveLine(index)}
              disabled={lines.length === 1}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### 4.3 Options Panel Component

```typescript
// components/demo/OptionsPanel.tsx
'use client';

import { TypingSVGOptions } from '@/types/options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from '@/components/ui/color-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OptionsPanelProps {
  options: TypingSVGOptions;
  onChange: (options: Partial<TypingSVGOptions>) => void;
}

export function OptionsPanel({ options, onChange }: OptionsPanelProps) {
  const handleReset = () => {
    onChange(defaultOptions);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Options</CardTitle>
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Typography</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="font">Font Family</Label>
              <Input
                id="font"
                value={options.font}
                onChange={(e) => onChange({ font: e.target.value })}
                placeholder="Fira Code"
              />
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="weight">Font Weight</Label>
              <Select
                value={options.weight.toString()}
                onValueChange={(value) => onChange({ weight: parseInt(value) })}
              >
                <SelectTrigger id="weight">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                    <SelectItem key={weight} value={weight.toString()}>
                      {weight}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="size">Font Size: {options.size}px</Label>
            <Slider
              id="size"
              min={10}
              max={72}
              step={1}
              value={[options.size]}
              onValueChange={([value]) => onChange({ size: value })}
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="letterSpacing">Letter Spacing</Label>
            <Input
              id="letterSpacing"
              value={options.letterSpacing}
              onChange={(e) => onChange({ letterSpacing: e.target.value })}
              placeholder="normal"
            />
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Colors</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="color">Text Color</Label>
              <ColorPicker
                id="color"
                value={options.color}
                onChange={(value) => onChange({ color: value })}
              />
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="background">Background</Label>
              <ColorPicker
                id="background"
                value={options.background}
                onChange={(value) => onChange({ background: value })}
                alphaEnabled
              />
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Dimensions</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="width">Width: {options.width}px</Label>
              <Slider
                id="width"
                min={100}
                max={1000}
                step={5}
                value={[options.width]}
                onValueChange={([value]) => onChange({ width: value })}
              />
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="height">Height: {options.height}px</Label>
              <Slider
                id="height"
                min={20}
                max={500}
                step={5}
                value={[options.height]}
                onValueChange={([value]) => onChange({ height: value })}
              />
            </div>
          </div>
        </div>

        {/* Alignment */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Alignment</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="center">Horizontally Centered</Label>
            <Switch
              id="center"
              checked={options.center}
              onCheckedChange={(checked) => onChange({ center: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="vCenter">Vertically Centered</Label>
            <Switch
              id="vCenter"
              checked={options.vCenter}
              onCheckedChange={(checked) => onChange({ vCenter: checked })}
            />
          </div>
        </div>

        {/* Animation */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground">Animation</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label htmlFor="duration">Duration: {options.duration}ms</Label>
              <Slider
                id="duration"
                min={500}
                max={10000}
                step={100}
                value={[options.duration]}
                onValueChange={([value]) => onChange({ duration: value })}
              />
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="pause">Pause: {options.pause}ms</Label>
              <Slider
                id="pause"
                min={0}
                max={5000}
                step={100}
                value={[options.pause]}
                onValueChange={([value]) => onChange({ pause: value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="multiline">Multiline</Label>
            <Switch
              id="multiline"
              checked={options.multiline}
              onCheckedChange={(checked) => onChange({ multiline: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="repeat">Repeat</Label>
            <Switch
              id="repeat"
              checked={options.repeat}
              onCheckedChange={(checked) => onChange({ repeat: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="random">Random Order</Label>
            <Switch
              id="random"
              checked={options.random}
              onCheckedChange={(checked) => onChange({ random: checked })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### 4.4 Preview Section Component

```typescript
// components/demo/PreviewSection.tsx
'use client';

import { useState } from 'react';
import { TypingSVGOptions } from '@/types/options';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { buildQueryString } from '@/lib/utils/url';

interface PreviewSectionProps {
  options: TypingSVGOptions;
}

export function PreviewSection({ options }: PreviewSectionProps) {
  const [showBorder, setShowBorder] = useState(false);
  const queryString = buildQueryString(options);
  const svgUrl = `/api/svg?${queryString}`;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <img
            src={svgUrl}
            alt="Typing SVG Preview"
            className={`w-full ${showBorder ? 'border-2 border-dashed border-red-500 rounded' : ''}`}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="show-border"
            checked={showBorder}
            onCheckedChange={setShowBorder}
          />
          <Label htmlFor="show-border">Show border</Label>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### 4.5 Code Output Component

```typescript
// components/demo/CodeOutput.tsx
'use client';

import { TypingSVGOptions } from '@/types/options';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/components/demo/CopyButton';
import { buildQueryString } from '@/lib/utils/url';

interface CodeOutputProps {
  options: TypingSVGOptions;
}

export function CodeOutput({ options }: CodeOutputProps) {
  const queryString = buildQueryString(options);
  const imageUrl = `${window.location.origin}/api/svg?${queryString}`;
  const repoLink = 'https://git.io/typing-svg';
  
  const markdown = `[![Typing SVG](${imageUrl})](${repoLink})`;
  const html = `<a href="${repoLink}"><img src="${imageUrl}" alt="Typing SVG" /></a>`;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Embed Code</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="markdown">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="html">HTML</TabsTrigger>
          </TabsList>
          
          <TabsContent value="markdown" className="space-y-4">
            <div className="relative">
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{markdown}</code>
              </pre>
              <CopyButton text={markdown} />
            </div>
          </TabsContent>
          
          <TabsContent value="html" className="space-y-4">
            <div className="relative">
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{html}</code>
              </pre>
              <CopyButton text={html} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
```

### 5. Custom Hooks

```typescript
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

```typescript
// hooks/useSVGGenerator.ts
import { useCallback, useState } from 'react';
import { TypingSVGOptions } from '@/types/options';
import { SVGGenerator } from '@/lib/svg/generator';

export function useSVGGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSVG = useCallback(async (options: TypingSVGOptions) => {
    setIsLoading(true);
    setError(null);

    try {
      const generator = new SVGGenerator(options);
      const svg = await generator.generate();
      return svg;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate SVG');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { generateSVG, isLoading, error };
}
```

### 6. Utility Functions

```typescript
// lib/utils/url.ts
import { TypingSVGOptions } from '@/types/options';

export function buildQueryString(options: TypingSVGOptions): string {
  const params = new URLSearchParams();
  
  // Only include non-default values
  const defaults = defaultOptions;
  
  Object.entries(options).forEach(([key, value]) => {
    if (key === 'lines') {
      params.set('lines', value.join(options.separator));
    } else if (value !== defaults[key as keyof TypingSVGOptions]) {
      params.set(key, String(value));
    }
  });

  return customEncode(params.toString());
}

export function customEncode(str: string): string {
  return encodeURIComponent(str)
    .replace(/%3B/g, ';')
    .replace(/%20/g, '+');
}

export function parseQueryParams(searchParams: URLSearchParams): Partial<TypingSVGOptions> {
  const options: Partial<TypingSVGOptions> = {};
  
  const lines = searchParams.get('lines');
  if (lines) {
    const separator = searchParams.get('separator') || ';';
    options.lines = lines.split(separator);
  }
  
  const font = searchParams.get('font');
  if (font) options.font = font;
  
  const weight = searchParams.get('weight');
  if (weight) options.weight = parseInt(weight);
  
  const size = searchParams.get('size');
  if (size) options.size = parseInt(size);
  
  const color = searchParams.get('color');
  if (color) options.color = `#${color}`;
  
  const background = searchParams.get('background');
  if (background) options.background = `#${background}`;
  
  const center = searchParams.get('center');
  if (center) options.center = center === 'true';
  
  const vCenter = searchParams.get('vCenter');
  if (vCenter) options.vCenter = vCenter === 'true';
  
  const width = searchParams.get('width');
  if (width) options.width = parseInt(width);
  
  const height = searchParams.get('height');
  if (height) options.height = parseInt(height);
  
  const multiline = searchParams.get('multiline');
  if (multiline) options.multiline = multiline === 'true';
  
  const duration = searchParams.get('duration');
  if (duration) options.duration = parseInt(duration);
  
  const pause = searchParams.get('pause');
  if (pause) options.pause = parseInt(pause);
  
  const repeat = searchParams.get('repeat');
  if (repeat) options.repeat = repeat === 'true';
  
  const random = searchParams.get('random');
  if (random) options.random = random === 'true';
  
  const separator = searchParams.get('separator');
  if (separator) options.separator = separator;
  
  const letterSpacing = searchParams.get('letterSpacing');
  if (letterSpacing) options.letterSpacing = letterSpacing;
  
  return options;
}
```

### 7. Configuration

```typescript
// config/defaults.ts
import { TypingSVGOptions } from '@/types/options';

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
```

```typescript
// config/fonts.ts
export const popularFonts = [
  'Fira Code',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Oswald',
  'Raleway',
  'Merriweather',
  'Playfair Display',
  'Poppins',
  'Source Code Pro',
  'JetBrains Mono',
];
```

## UI/UX Design

### Design System

- **Color Palette**: Gradient backgrounds with purple, blue, and pink tones
- **Typography**: Clean sans-serif fonts with good readability
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Shadows**: Soft shadows for depth and hierarchy
- **Border Radius**: Rounded corners for modern feel
- **Dark Mode**: Full dark mode support with smooth transitions

### Background Shapes

```typescript
// components/layout/BackgroundShapes.tsx
export function BackgroundShapes() {
  return (
    <>
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="fixed bottom-0 left-20 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
    </>
  );
}
```

### Animations

```css
/* Add to globals.css */
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
```

## Testing Strategy

### Unit Tests

- SVG generation logic
- Animation calculations
- Validation schemas
- Utility functions

### Integration Tests

- API route endpoints
- Component interactions
- State management

### E2E Tests

- Full user flows
- Cross-browser compatibility
- Performance testing

## Performance Optimization

1. **Font Caching**: Cache converted fonts in memory
2. **Debouncing**: Debounce preview updates
3. **Code Splitting**: Lazy load components
4. **Image Optimization**: Use Next.js Image component
5. **API Caching**: Implement HTTP caching headers

## Security Considerations

1. **Input Validation**: Validate all user inputs
2. **XSS Prevention**: Escape HTML in SVG text
3. **CORS**: Configure CORS properly
4. **Rate Limiting**: Implement rate limiting for API

## Deployment

### Vercel (Recommended)

- Automatic deployments from Git
- Edge functions for API routes
- CDN for static assets
- Environment variables management

### Docker

- Containerized application
- Easy deployment to any platform
- Consistent environments

## Documentation

### README.md

- Project overview
- Installation instructions
- Usage examples
- API documentation
- Contributing guidelines

### Code Documentation

- JSDoc comments for functions
- TypeScript for type safety
- Clear variable naming
- Inline comments for complex logic

## Migration Checklist

- [ ] Set up project structure
- [ ] Implement type definitions
- [ ] Create validation schemas
- [ ] Build SVG generator service
- [ ] Implement Google Fonts integration
- [ ] Create API route
- [ ] Build demo page components
- [ ] Implement UI components
- [ ] Add custom hooks
- [ ] Create utility functions
- [ ] Implement background shapes
- [ ] Add dark mode support
- [ ] Write tests
- [ ] Optimize performance
- [ ] Create documentation
- [ ] Deploy application

## Feature Parity Comparison

| Feature | PHP Version | Next.js Version | Status |
|---------|-------------|----------------|--------|
| SVG Generation | ✅ | ✅ | Planned |
| Multiple Lines | ✅ | ✅ | Planned |
| Font Customization | ✅ | ✅ | Planned |
| Color Customization | ✅ | ✅ | Planned |
| Alignment Options | ✅ | ✅ | Planned |
| Animation Controls | ✅ | ✅ | Planned |
| Google Fonts Integration | ✅ | ✅ | Planned |
| Demo Site | ✅ | ✅ | Planned |
| Live Preview | ✅ | ✅ | Planned |
| Code Generation | ✅ | ✅ | Planned |
| Copy to Clipboard | ✅ | ✅ | Planned |
| Dark Mode | ✅ | ✅ | Planned |
| Permalink Sharing | ✅ | ✅ | Planned |
| Border Toggle | ✅ | ✅ | Planned |
| Input Validation | ✅ | ✅ | Planned |
| Error Handling | ✅ | ✅ | Planned |
| Caching | ✅ | ✅ | Planned |
| Responsive Design | ✅ | ✅ | Planned |

## Additional Enhancements

1. **Preset Templates**: Pre-configured SVG templates
2. **Export Options**: Download SVG as file
3. **History**: Save and load configurations
4. **Share URL**: Generate shareable URLs
5. **Analytics**: Track usage (optional)
6. **A/B Testing**: Test different designs
7. **Accessibility**: WCAG compliance
8. **i18n**: Multi-language support

## Conclusion

This implementation plan provides a comprehensive roadmap for converting the PHP-based Readme Typing SVG application to a modern Next.js application. The plan follows clean code principles, SOLID principles, and Next.js best practices while maintaining feature parity with the original application and adding a modern, gradient UI with background shapes.

The modular architecture ensures maintainability and scalability, while the use of TypeScript provides type safety throughout the application. The implementation can be executed incrementally, allowing for testing and validation at each stage.

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Plus, ChevronDown, ChevronUp, Palette, Moon, Zap, Type, Settings, Copy, Share2, Gauge, Accessibility, Keyboard, Sparkles, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { defaultOptions, dummyText } from '@/config/defaults';
import { TypingSVGOptions } from '@/types/options';
import { buildQueryString, parseQueryParams } from '@/lib/utils/url';
import { useDebounce } from '@/hooks/useDebounce';

export default function DemoPage() {
  // Parse URL parameters on initial load
  const getInitialOptions = (): TypingSVGOptions => {
    if (typeof window === 'undefined') return defaultOptions;
    
    const searchParams = new URLSearchParams(window.location.search);
    const parsedOptions = parseQueryParams(searchParams);
    
    // Merge parsed options with defaults
    return { ...defaultOptions, ...parsedOptions };
  };

  const [options, setOptions] = useState<TypingSVGOptions>(getInitialOptions);
  const [showBorder, setShowBorder] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const debouncedOptions = useDebounce(options, 300);
  const isFirstRender = useRef(true);

  // Update URL when options change (but not on initial render)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Skip URL update on first render to preserve user's URL
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    const queryString = buildQueryString(options);
    const url = new URL(window.location.href);
    url.search = queryString;
    window.history.replaceState({}, '', url.toString());
  }, [options]);

  const handleOptionsChange = useCallback((newOptions: Partial<TypingSVGOptions>) => {
    setOptions(prev => ({ ...prev, ...newOptions }));
  }, []);

  const handleLinesChange = useCallback((lines: string[]) => {
    setOptions(prev => ({ ...prev, lines }));
  }, []);

  const handleAddLine = () => {
    const newIndex = options.lines.length;
    const newText = dummyText[newIndex % dummyText.length];
    handleLinesChange([...options.lines, newText]);
  };

  const handleRemoveLine = (index: number) => {
    if (options.lines.length > 1) {
      handleLinesChange(options.lines.filter((_, i) => i !== index));
    }
  };

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...options.lines];
    newLines[index] = value;
    handleLinesChange(newLines);
  };

  const handleReset = () => {
    setOptions(defaultOptions);
  };

  const queryString = buildQueryString(options);
  const svgUrl = `/api/svg?${queryString}`;
  const imageUrl = typeof window !== 'undefined' ? `${window.location.origin}${svgUrl}` : svgUrl;
  const repoLink = 'https://git.io/typing-svg';
  const markdown = `[![Typing SVG](${imageUrl})](${repoLink})`;
  const html = `<a href="${repoLink}"><img src="${imageUrl}" alt="Typing SVG" /></a>`;
  const directUrl = imageUrl;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50">Markdown Typing SVG</h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Create animated typing SVGs for your GitHub README
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Panel - Options */}
          <div className="space-y-6">
            {/* Lines Editor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add your text</CardTitle>
                  <Button onClick={handleAddLine} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add line
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {options.lines.map((line, index) => (
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
                      disabled={options.lines.length === 1}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Options Panel */}
            <Card>
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
                  <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Typography</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label htmlFor="font" className="block mb-3">Font Family</Label>
                      <Input
                        id="font"
                        value={options.font}
                        onChange={(e) => handleOptionsChange({ font: e.target.value })}
                        placeholder="Fira Code"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="size" className="block mb-3">Font Size</Label>
                      <Input
                        id="size"
                        type="number"
                        value={options.size}
                        onChange={(e) => handleOptionsChange({ size: parseInt(e.target.value) || 0 })}
                        placeholder="20"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="letterSpacing" className="block mb-3">Letter Spacing</Label>
                    <select
                      id="letterSpacing"
                      value={options.letterSpacing}
                      onChange={(e) => handleOptionsChange({ letterSpacing: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-500"
                    >
                      <option value="normal">Normal</option>
                      <option value="-2px">Tight (-2px)</option>
                      <option value="-1px">Tight (-1px)</option>
                      <option value="0px">0px</option>
                      <option value="1px">Loose (1px)</option>
                      <option value="2px">Loose (2px)</option>
                      <option value="3px">Wide (3px)</option>
                      <option value="4px">Wide (4px)</option>
                      <option value="5px">Extra Wide (5px)</option>
                      <option value="6px">Extra Wide (6px)</option>
                      <option value="8px">Extra Wide (8px)</option>
                      <option value="10px">Extra Wide (10px)</option>
                    </select>
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Colors</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label htmlFor="color" className="block mb-3">Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="color"
                          type="color"
                          value={options.color}
                          onChange={(e) => handleOptionsChange({ color: e.target.value })}
                          className="w-16 h-10 p-1 rounded cursor-pointer"
                        />
                        <Input
                          value={options.color}
                          onChange={(e) => handleOptionsChange({ color: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="background" className="block mb-3">Background</Label>
                      <div className="flex gap-2">
                        <Input
                          id="background"
                          type="color"
                          value={options.background}
                          onChange={(e) => handleOptionsChange({ background: e.target.value })}
                          className="w-16 h-10 p-1 rounded cursor-pointer"
                        />
                        <Input
                          value={options.background}
                          onChange={(e) => handleOptionsChange({ background: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dimensions */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Dimensions</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label htmlFor="width" className="block mb-3">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        value={options.width}
                        onChange={(e) => handleOptionsChange({ width: parseInt(e.target.value) || 0 })}
                        placeholder="435"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="height" className="block mb-3">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        value={options.height}
                        onChange={(e) => handleOptionsChange({ height: parseInt(e.target.value) || 0 })}
                        placeholder="50"
                      />
                    </div>
                  </div>
                </div>

                {/* Alignment */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Alignment</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="center">Horizontally Centered</Label>
                    <Switch
                      id="center"
                      checked={options.center}
                      onCheckedChange={(checked) => handleOptionsChange({ center: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vCenter">Vertically Centered</Label>
                    <Switch
                      id="vCenter"
                      checked={options.vCenter}
                      onCheckedChange={(checked) => handleOptionsChange({ vCenter: checked })}
                    />
                  </div>
                </div>

                {/* Animation */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Animation</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label htmlFor="duration" className="block mb-3">Duration: {options.duration}ms</Label>
                      <Slider
                        id="duration"
                        min={500}
                        max={10000}
                        step={100}
                        value={options.duration}
                        onValueChange={(value) => handleOptionsChange({ duration: value })}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="pause" className="block mb-3">Pause: {options.pause}ms</Label>
                      <Slider
                        id="pause"
                        min={0}
                        max={5000}
                        step={100}
                        value={options.pause}
                        onValueChange={(value) => handleOptionsChange({ pause: value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="multiline">Multiline</Label>
                    <Switch
                      id="multiline"
                      checked={options.multiline}
                      onCheckedChange={(checked) => handleOptionsChange({ multiline: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="repeat">Repeat</Label>
                    <Switch
                      id="repeat"
                      checked={options.repeat}
                      onCheckedChange={(checked) => handleOptionsChange({ repeat: checked })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="random">Random Order</Label>
                    <Switch
                      id="random"
                      checked={options.random}
                      onCheckedChange={(checked) => handleOptionsChange({ random: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview & Output */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative svg-preview-container">
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
                  <Label htmlFor="show-border" className="text-sm sm:text-base">Show border</Label>
                </div>
              </CardContent>
            </Card>

            {/* Code Output */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Embed Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <Label htmlFor="markdown" className="text-sm sm:text-base block mb-3">Markdown</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(markdown)}
                      className="w-full sm:w-auto"
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-slate-100 dark:bg-slate-900 p-3 sm:p-4 rounded-lg w-full text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    <code id="markdown">{markdown}</code>
                  </pre>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <Label htmlFor="html" className="text-sm sm:text-base block mb-3">HTML</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(html)}
                      className="w-full sm:w-auto"
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-slate-100 dark:bg-slate-900 p-3 sm:p-4 rounded-lg w-full text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    <code id="html">{html}</code>
                  </pre>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <Label htmlFor="url" className="text-sm sm:text-base block mb-3">Direct URL</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(directUrl)}
                      className="w-full sm:w-auto"
                    >
                      Copy
                    </Button>
                  </div>
                  <pre className="bg-slate-100 dark:bg-slate-900 p-3 sm:p-4 rounded-lg w-full text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-all">
                    <code id="url">{directUrl}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-64 sm:mt-56">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900 dark:text-slate-50 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
              Features
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Everything you need to create beautiful typing SVGs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Palette, gradient: 'from-purple-500 to-pink-500', title: 'Modern UI', description: 'Clean, gradient interface with animated background shapes' },
              { icon: Moon, gradient: 'from-blue-500 to-cyan-500', title: 'Dark Mode', description: 'Full dark mode support with smooth transitions' },
              { icon: Zap, gradient: 'from-yellow-500 to-orange-500', title: 'Live Preview', description: 'Real-time preview of your SVG as you customize' },
              { icon: Type, gradient: 'from-green-500 to-emerald-500', title: 'Custom Fonts', description: 'Support for Google Fonts with automatic embedding' },
              { icon: Settings, gradient: 'from-indigo-500 to-purple-500', title: 'Fully Customizable', description: 'Extensive options for fonts, colors, sizes, and animations' },
              { icon: Copy, gradient: 'from-pink-500 to-rose-500', title: 'Easy Export', description: 'Copy Markdown or HTML code with one click' },
              { icon: Share2, gradient: 'from-cyan-500 to-blue-500', title: 'Shareable URLs', description: 'Generate shareable URLs with your configuration' },
              { icon: Gauge, gradient: 'from-red-500 to-orange-500', title: 'Fast & Responsive', description: 'Built with Next.js for optimal performance on all devices' },
              { icon: Accessibility, gradient: 'from-violet-500 to-purple-500', title: 'Accessible', description: 'WCAG compliant with proper ARIA labels' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-50 mb-1">{feature.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="my-64 sm:my-56">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900 dark:text-slate-50 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Common questions about using Markdown Typing SVG
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                question: "How do I use the generated SVG in my GitHub README?",
                answer: "Copy the Markdown code from the 'Embed Code' section and paste it directly into your README.md file. The SVG will automatically render when your README is viewed."
              },
              {
                question: "Can I use custom fonts not available on Google Fonts?",
                answer: "Currently, only Google Fonts are supported for automatic embedding. You can specify any font family name in the font field, but it will only work if the font is available on the user's system."
              },
              {
                question: "What's the difference between multiline and single-line mode?",
                answer: "Multiline mode displays each line on a new line, while single-line mode retypes all lines on the same line. Use multiline for a list-style display and single-line for a typing effect on one line."
              },
              {
                question: "Can I customize the typing animation speed?",
                answer: "Yes! Use the Duration slider to control how fast each line types (in milliseconds), and the Pause slider to control the delay between lines. Lower values make the animation faster."
              },
              {
                question: "How do I share my configuration with others?",
                answer: "Simply copy the URL from your browser address bar - it contains all your settings. You can also use the Direct URL from the embed code section to share the exact SVG image."
              },
              {
                question: "Is there a limit to the number of lines I can add?",
                answer: "No, you can add as many lines as you want using the 'Add line' button. However, keep in mind that more lines may require adjusting the width and height for proper display."
              },
              {
                question: "Can I use this on platforms other than GitHub?",
                answer: "Absolutely! The SVG works anywhere that supports Markdown or HTML, including GitLab, Bitbucket, personal websites, documentation sites, and more."
              },
              {
                question: "What's the maximum size for the SVG?",
                answer: "Width can go up to 1000px and height up to 500px, but you should adjust based on your content and layout needs. Larger sizes may affect loading times."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    aria-expanded={expandedFaq === index}
                  >
                    <span className="font-medium text-sm sm:text-base text-slate-900 dark:text-slate-50 pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


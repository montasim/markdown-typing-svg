'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Plus, ChevronDown, ChevronUp, Palette, Moon, Zap, Type, Settings, Copy, Share2, Gauge, Accessibility, Keyboard, Sparkles, HelpCircle, Square, Download, FileJson, Upload, GripVertical, Edit2, List, Undo, Redo, Keyboard as KeyboardIcon, Github, Gitlab, MessageCircle, MessageSquare, FileText, Globe, File, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToastProvider, useToast } from '@/hooks/useToast';
import { ToastDisplay } from '@/components/ui/toast-display';
import { defaultOptions, dummyText } from '@/config/defaults';
import { TypingSVGOptions } from '@/types/options';
import { buildQueryString, parseQueryParams } from '@/lib/utils/url';
import { useDebounce } from '@/hooks/useDebounce';
import { usePresets } from '@/hooks/usePresets';
import { useUndoRedo } from '@/hooks/useUndoRedo';
import { useKeyboardShortcuts, commonShortcuts } from '@/hooks/useKeyboardShortcuts';
import { textTemplates, templateCategories } from '@/config/templates';
import { platformPresets } from '@/config/platform-presets';

export default function DemoPage() {
  // Parse URL parameters on initial load
  const getInitialOptions = (): TypingSVGOptions => {
    if (typeof window === 'undefined') return defaultOptions;
    
    const searchParams = new URLSearchParams(window.location.search);
    const parsedOptions = parseQueryParams(searchParams);
    
    // Merge parsed options with defaults
    return { ...defaultOptions, ...parsedOptions };
  };

  const { addToast } = useToast();
  const { state: options, setState: setOptions, undo, redo, canUndo, canRedo } = useUndoRedo<TypingSVGOptions>(getInitialOptions());
  const [showBorder, setShowBorder] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showPlatformPresets, setShowPlatformPresets] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [bulkEditText, setBulkEditText] = useState('');
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const { presets, addPreset, removePreset, loadPreset } = usePresets();
  const debouncedOptions = useDebounce(options, 300);
  const isFirstRender = useRef(true);

  // Setup keyboard shortcuts
  useKeyboardShortcuts([
    { ...commonShortcuts.undo, handler: () => { if (canUndo) undo(); } },
    { ...commonShortcuts.redo, handler: () => { if (canRedo) redo(); } },
    { ...commonShortcuts.save, handler: () => { exportConfig(); } },
    { ...commonShortcuts.reset, handler: () => { handleReset(); } },
  ]);

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
    setOptions({ ...options, ...newOptions });
  }, [options]);

  const handleLinesChange = useCallback((lines: string[]) => {
    setOptions({ ...options, lines });
  }, [options]);

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

  const handleLoadTemplate = (templateId: string) => {
    const template = textTemplates.find(t => t.id === templateId);
    if (template) {
      setOptions({ ...defaultOptions, ...template.options });
      setShowTemplates(false);
      addToast({ title: 'Template loaded', description: `"${template.name}" has been applied`, variant: 'success' });
    }
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      addPreset(presetName.trim(), options);
      setPresetName('');
      setShowPresets(false);
    }
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = loadPreset(presetId);
    if (preset) {
      setOptions(preset.options);
      setShowPresets(false);
      addToast({ title: 'Preset loaded', description: `"${preset.name}" has been applied`, variant: 'success' });
    }
  };

  const handleLoadPlatformPreset = (presetId: string) => {
    const preset = platformPresets.find(p => p.id === presetId);
    if (preset) {
      const code = preset.generateCode(options);
      copyToClipboard(code.markdown);
      addToast({ 
        title: 'Code copied', 
        description: `${preset.name} code has been copied to clipboard. ${code.description}`, 
        variant: 'success' 
      });
    }
  };

  const filteredTemplates = selectedCategory === 'All'
    ? textTemplates
    : textTemplates.filter(t => t.category === selectedCategory);

  const exportConfig = () => {
    const configStr = JSON.stringify(options, null, 2);
    const blob = new Blob([configStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'typing-svg-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setOptions({ ...options, ...imported });
          addToast({ title: 'Configuration imported', description: 'Your configuration has been loaded successfully', variant: 'success' });
        } catch (err) {
          console.error('Failed to import config:', err);
          addToast({ title: 'Import failed', description: 'Invalid file format', variant: 'destructive' });
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = '';
  };

  const toggleBulkEdit = () => {
    if (!showBulkEdit) {
      setBulkEditText(options.lines.join('\n'));
    } else {
      // Apply bulk edit changes
      const newLines = bulkEditText.split('\n').filter(line => line.trim() !== '');
      if (newLines.length > 0) {
        handleLinesChange(newLines);
      }
    }
    setShowBulkEdit(!showBulkEdit);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newLines = [...options.lines];
    const draggedItem = newLines[draggedIndex];
    newLines.splice(draggedIndex, 1);
    newLines.splice(index, 0, draggedItem);
    handleLinesChange(newLines);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
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
      addToast({ title: 'Copied to clipboard', description: 'Code has been copied successfully', variant: 'success' });
    } catch (err) {
      console.error('Failed to copy:', err);
      addToast({ title: 'Copy failed', description: 'Failed to copy to clipboard', variant: 'destructive' });
    }
  };

  const downloadSVG = async (url: string) => {
    try {
      const response = await fetch(url);
      const svgText = await response.text();
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'typing-svg.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      addToast({ title: 'Download started', description: 'SVG file is being downloaded', variant: 'success' });
    } catch (err) {
      console.error('Failed to download:', err);
      addToast({ title: 'Download failed', description: 'Failed to download SVG', variant: 'destructive' });
    }
  };

  const exportPNG = async () => {
    try {
      // Fetch the SVG
      const response = await fetch(svgUrl);
      const svgText = await response.text();

      // Create an image from the SVG
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = options.width;
        canvas.height = options.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Draw image on canvas
          ctx.drawImage(img, 0, 0);

          // Convert to PNG and download
          canvas.toBlob((blob) => {
            if (blob) {
              const pngUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = pngUrl;
              link.download = 'typing-svg.png';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(pngUrl);
              addToast({ title: 'Export started', description: 'PNG file is being exported', variant: 'success' });
            }
          }, 'image/png');
        }

        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      console.error('Failed to export PNG:', err);
      addToast({ title: 'Export failed', description: 'Failed to export PNG. Note: PNG export may not work with animated SVGs.', variant: 'destructive' });
    }
  };

  const exportJPG = async () => {
    try {
      // Fetch the SVG
      const response = await fetch(svgUrl);
      const svgText = await response.text();

      // Create an image from the SVG
      const img = new Image();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = options.width;
        canvas.height = options.height;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          // Fill white background for JPG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw image on canvas
          ctx.drawImage(img, 0, 0);

          // Convert to JPG and download
          canvas.toBlob((blob) => {
            if (blob) {
              const jpgUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = jpgUrl;
              link.download = 'typing-svg.jpg';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(jpgUrl);
              addToast({ title: 'Export started', description: 'JPG file is being exported', variant: 'success' });
            }
          }, 'image/jpeg', 0.95);
        }

        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      console.error('Failed to export JPG:', err);
      addToast({ title: 'Export failed', description: 'Failed to export JPG. Note: JPG export may not work with animated SVGs.', variant: 'destructive' });
    }
  };

  const exportCSV = () => {
    try {
      // Create CSV content from lines
      const csvContent = options.lines.map(line => `"${line.replace(/"/g, '""')}"`).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'typing-svg.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast({ title: 'Export started', description: 'CSV file is being exported', variant: 'success' });
    } catch (err) {
      console.error('Failed to export CSV:', err);
      addToast({ title: 'Export failed', description: 'Failed to export CSV', variant: 'destructive' });
    }
  };

  return (
    <>
      <ToastDisplay />
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
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleBulkEdit}
                      title={showBulkEdit ? 'Individual edit' : 'Bulk edit'}
                    >
                      {showBulkEdit ? <List className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                    </Button>
                    <Button onClick={handleAddLine} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add line
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {showBulkEdit ? (
                  <div className="space-y-2">
                    <Label htmlFor="bulk-edit">
                      Edit all lines at once (one per line). Click "Done" to apply changes.
                    </Label>
                    <textarea
                      id="bulk-edit"
                      value={bulkEditText}
                      onChange={(e) => setBulkEditText(e.target.value)}
                      className="flex min-h-[200px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-500"
                      placeholder="Enter each line of text here..."
                    />
                  </div>
                ) : (
                  options.lines.map((line, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-start"
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
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
                  ))
                )}
                {showBulkEdit && (
                  <Button onClick={toggleBulkEdit} className="w-full">
                    Done
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Options Panel */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Options</CardTitle>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      id="import-config"
                      accept=".json"
                      onChange={importConfig}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('import-config')?.click()}
                    >
                      Import
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportConfig}
                    >
                      Export
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      Reset
                    </Button>
                  </div>
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
                      <Label htmlFor="color" className="block mb-3">
                        Text Color
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="color"
                          type="color"
                          value={options.color}
                          onChange={(e) => handleOptionsChange({ color: e.target.value })}
                          className="w-16 h-10 p-1 rounded cursor-pointer"
                          disabled={options.gradient}
                        />
                        <Input
                          value={options.color}
                          onChange={(e) => handleOptionsChange({ color: e.target.value })}
                          className="flex-1"
                          disabled={options.gradient}
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

                {/* Effects */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-400">Effects</h3>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="gradient">Gradient Text</Label>
                    <Switch
                      id="gradient"
                      checked={options.gradient}
                      onCheckedChange={(checked) => handleOptionsChange({ gradient: checked })}
                    />
                  </div>

                  {options.gradient && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Label htmlFor="gradientFrom" className="block mb-3">Gradient From</Label>
                        <div className="flex gap-2">
                          <Input
                            id="gradientFrom"
                            type="color"
                            value={options.gradientFrom}
                            onChange={(e) => handleOptionsChange({ gradientFrom: e.target.value })}
                            className="w-16 h-10 p-1 rounded cursor-pointer"
                          />
                          <Input
                            value={options.gradientFrom}
                            onChange={(e) => handleOptionsChange({ gradientFrom: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="gradientTo" className="block mb-3">Gradient To</Label>
                        <div className="flex gap-2">
                          <Input
                            id="gradientTo"
                            type="color"
                            value={options.gradientTo}
                            onChange={(e) => handleOptionsChange({ gradientTo: e.target.value })}
                            className="w-16 h-10 p-1 rounded cursor-pointer"
                          />
                          <Input
                            value={options.gradientTo}
                            onChange={(e) => handleOptionsChange({ gradientTo: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="textShadow">Text Shadow</Label>
                    <Switch
                      id="textShadow"
                      checked={options.textShadow}
                      onCheckedChange={(checked) => handleOptionsChange({ textShadow: checked })}
                    />
                  </div>

                  {options.textShadow && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Label htmlFor="textShadowColor" className="block mb-3">Shadow Color</Label>
                        <div className="flex gap-2">
                          <Input
                            id="textShadowColor"
                            type="color"
                            value={options.textShadowColor}
                            onChange={(e) => handleOptionsChange({ textShadowColor: e.target.value })}
                            className="w-16 h-10 p-1 rounded cursor-pointer"
                          />
                          <Input
                            value={options.textShadowColor}
                            onChange={(e) => handleOptionsChange({ textShadowColor: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="textShadowBlur" className="block mb-3">Blur: {options.textShadowBlur}px</Label>
                        <Slider
                          id="textShadowBlur"
                          min={0}
                          max={20}
                          step={1}
                          value={options.textShadowBlur}
                          onValueChange={(value) => handleOptionsChange({ textShadowBlur: value })}
                        />
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="textShadowOffsetX" className="block mb-3">Offset X: {options.textShadowOffsetX}px</Label>
                        <Slider
                          id="textShadowOffsetX"
                          min={-20}
                          max={20}
                          step={1}
                          value={options.textShadowOffsetX}
                          onValueChange={(value) => handleOptionsChange({ textShadowOffsetX: value })}
                        />
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="textShadowOffsetY" className="block mb-3">Offset Y: {options.textShadowOffsetY}px</Label>
                        <Slider
                          id="textShadowOffsetY"
                          min={-20}
                          max={20}
                          step={1}
                          value={options.textShadowOffsetY}
                          onValueChange={(value) => handleOptionsChange({ textShadowOffsetY: value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options Panel */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Advanced Options</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  >
                    {showAdvancedOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {showAdvancedOptions && (
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label htmlFor="animationType" className="block mb-3">Animation Type</Label>
                      <select
                        id="animationType"
                        value={options.animationType}
                        onChange={(e) => handleOptionsChange({ animationType: e.target.value as any })}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-500"
                      >
                        <option value="typing">Typing</option>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="bounce">Bounce</option>
                        <option value="wave">Wave</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="easing" className="block mb-3">Easing</Label>
                      <select
                        id="easing"
                        value={options.easing}
                        onChange={(e) => handleOptionsChange({ easing: e.target.value as any })}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-500"
                      >
                        <option value="linear">Linear</option>
                        <option value="ease-in">Ease In</option>
                        <option value="ease-out">Ease Out</option>
                        <option value="ease-in-out">Ease In Out</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <Label htmlFor="cursorStyle" className="block mb-3">Cursor Style</Label>
                      <select
                        id="cursorStyle"
                        value={options.cursorStyle}
                        onChange={(e) => handleOptionsChange({ cursorStyle: e.target.value as any })}
                        className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-500"
                      >
                        <option value="block">Block</option>
                        <option value="line">Line</option>
                        <option value="underscore">Underscore</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <Label htmlFor="reverseTyping">Reverse Typing</Label>
                      <Switch
                        id="reverseTyping"
                        checked={options.reverseTyping}
                        onCheckedChange={(checked) => handleOptionsChange({ reverseTyping: checked })}
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

                {/* Other */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cursor">Show Cursor</Label>
                    <Switch
                      id="cursor"
                      checked={options.cursor}
                      onCheckedChange={(checked) => handleOptionsChange({ cursor: checked })}
                    />
                  </div>

                  {options.cursor && (
                    <div className="space-y-4">
                      <Label htmlFor="cursorColor" className="block mb-3">Cursor Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="cursorColor"
                          type="color"
                          value={options.cursorColor}
                          onChange={(e) => handleOptionsChange({ cursorColor: e.target.value })}
                          className="w-16 h-10 p-1 rounded cursor-pointer"
                        />
                        <Input
                          value={options.cursorColor}
                          onChange={(e) => handleOptionsChange({ cursorColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Label htmlFor="borderRadius" className="block mb-3">Border Radius: {options.borderRadius}px</Label>
                    <Slider
                      id="borderRadius"
                      min={0}
                      max={50}
                      step={1}
                      value={options.borderRadius}
                      onValueChange={(value) => handleOptionsChange({ borderRadius: value })}
                    />
                  </div>
                </div>
              </CardContent>
              )}
            </Card>

            {/* Templates Panel */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Text Templates</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTemplates(!showTemplates)}
                  >
                    {showTemplates ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {showTemplates && (
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === 'All' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory('All')}
                    >
                      All
                    </Button>
                    {templateCategories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {filteredTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleLoadTemplate(template.id)}
                        className="text-left p-3 mr-4 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="font-medium text-sm text-slate-900 dark:text-slate-50">{template.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{template.description}</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Right Panel - Preview & Output */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base sm:text-lg">Preview</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => undo()}
                        disabled={!canUndo}
                        title="Undo (Ctrl+Z)"
                      >
                        <Undo className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => redo()}
                        disabled={!canRedo}
                        title="Redo (Ctrl+Y)"
                      >
                        <Redo className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                      <ChevronDown className={`w-4 h-4 transition-transform ${showDownloadDropdown ? 'rotate-180' : ''}`} />
                    </Button>
                    {showDownloadDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => { downloadSVG(svgUrl); setShowDownloadDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download SVG
                        </button>
                        <button
                          onClick={() => { exportPNG(); setShowDownloadDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download PNG
                        </button>
                        <button
                          onClick={() => { exportJPG(); setShowDownloadDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download JPG
                        </button>
                        <button
                          onClick={() => { exportCSV(); setShowDownloadDropdown(false); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download CSV
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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

            {/* My Presets Panel */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">My Presets</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPresets(!showPresets)}
                    className="gap-2"
                  >
                    {showPresets ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {showPresets && (
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={presetName}
                      onChange={(e) => setPresetName(e.target.value)}
                      placeholder="Preset name..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSavePreset}
                      size="sm"
                      disabled={!presetName.trim()}
                    >
                      Save
                    </Button>
                  </div>
                  {presets.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                      No presets saved yet. Save your current configuration!
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                      {presets.map(preset => (
                        <div
                          key={preset.id}
                          className="flex items-center justify-between p-3 rounded-md border border-slate-200 dark:border-slate-700"
                        >
                          <div>
                            <div className="font-medium text-sm text-slate-900 dark:text-slate-50">{preset.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {new Date(preset.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadPreset(preset.id)}
                            >
                              Load
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removePreset(preset.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              )}
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

            {/* Platform Presets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">Platform Presets</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPlatformPresets(!showPlatformPresets)}
                  >
                    {showPlatformPresets ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              {showPlatformPresets && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {platformPresets.map(preset => {
                      const IconComponent = (() => {
                        switch (preset.id) {
                          case 'github': return Github;
                          case 'gitlab': return Gitlab;
                          case 'discord': return MessageCircle;
                          case 'slack': return MessageSquare;
                          case 'notion': return FileText;
                          case 'html': return Globe;
                          case 'markdown': return File;
                          case 'direct-url': return Link;
                          default: return File;
                        }
                      })();
                      return (
                        <button
                          key={preset.id}
                          onClick={() => handleLoadPlatformPreset(preset.id)}
                          className="flex flex-col items-center justify-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors gap-3"
                        >
                          <IconComponent className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                          <span className="text-xs text-center font-medium text-slate-900 dark:text-slate-50">{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    Click a platform to copy the appropriate embed code for that platform.
                  </p>
                </CardContent>
              )}
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
    </>
  );
}


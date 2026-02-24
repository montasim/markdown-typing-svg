# Font Size, Width, and Height Mechanism Update

## Overview
Update the markdown-typing-svg project to use the same Font Size, Width, and Height mechanism and values as the readme-typing-svg-old project.

## Current Implementation (markdown-typing-svg)

### Font Size
- **Component**: Slider
- **Range**: min=10, max=72, step=1
- **Default**: 20px
- **Location**: `app/(home)/page.tsx` lines 176-185

### Width
- **Component**: Slider
- **Range**: min=100, max=1000, step=5
- **Default**: 435px
- **Location**: `app/(home)/page.tsx` lines 268-277

### Height
- **Component**: Slider
- **Range**: min=20, max=500, step=5
- **Default**: 50px
- **Location**: `app/(home)/page.tsx` lines 280-289

## Reference Implementation (readme-typing-svg-old)

### Font Size
- **Component**: Number input (type="number")
- **Range**: No min/max constraints (unrestricted)
- **Default**: 20
- **Location**: `src/demo/index.php` lines 69-70

### Width
- **Component**: Number input (type="number")
- **Range**: No min/max constraints (unrestricted)
- **Default**: 435
- **Location**: `src/demo/index.php` lines 127-128

### Height
- **Component**: Number input (type="number")
- **Range**: No min/max constraints (unrestricted)
- **Default**: 50
- **Location**: `src/demo/index.php` lines 129-130

## Changes Required

### 1. Replace Font Size Slider with Number Input
**File**: `app/(home)/page.tsx` (lines 175-185)

**Current code:**
```tsx
<div className="space-y-4">
  <Label htmlFor="size" className="block mb-3">Font Size: {options.size}px</Label>
  <Slider
    id="size"
    min={10}
    max={72}
    step={1}
    value={options.size}
    onValueChange={(value) => handleOptionsChange({ size: value })}
  />
</div>
```

**New code:**
```tsx
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
```

### 2. Replace Width Slider with Number Input
**File**: `app/(home)/page.tsx` (lines 268-278)

**Current code:**
```tsx
<div className="space-y-4">
  <Label htmlFor="width" className="block mb-3">Width: {options.width}px</Label>
  <Slider
    id="width"
    min={100}
    max={1000}
    step={5}
    value={options.width}
    onValueChange={(value) => handleOptionsChange({ width: value })}
  />
</div>
```

**New code:**
```tsx
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
```

### 3. Replace Height Slider with Number Input
**File**: `app/(home)/page.tsx` (lines 280-290)

**Current code:**
```tsx
<div className="space-y-4">
  <Label htmlFor="height" className="block mb-3">Height: {options.height}px</Label>
  <Slider
    id="height"
    min={20}
    max={500}
    step={5}
    value={options.height}
    onValueChange={(value) => handleOptionsChange({ height: value })}
  />
</div>
```

**New code:**
```tsx
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
```

### 4. Remove Slider Import (if no longer used)
**File**: `app/(home)/page.tsx` (line 9)

Check if Slider component is used elsewhere in the file. If not, remove the import:
```tsx
import { Slider } from '@/components/ui/slider';
```

## Default Values Verification

The current default values in `config/defaults.ts` already match the reference:
- `size: 20` ✓
- `width: 435` ✓
- `height: 50` ✓

No changes needed to the default values.

## Summary of Changes

1. Replace Slider component with Input component for Font Size
2. Replace Slider component with Input component for Width
3. Replace Slider component with Input component for Height
4. Remove min/max/step constraints (allow unrestricted input)
5. Update labels to remove dynamic value display (e.g., "Font Size: 20px" → "Font Size")
6. Handle number parsing with fallback to 0 for invalid input
7. Optionally remove Slider import if no longer needed

## Benefits

- **Consistency**: Matches the reference implementation exactly
- **Flexibility**: Users can enter any value without slider constraints
- **Simplicity**: Number inputs are simpler and more direct
- **User Control**: Users have full control over exact values

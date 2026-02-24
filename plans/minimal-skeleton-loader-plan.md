# Minimal Skeleton Loader Implementation Plan

## Problem Analysis

The current skeleton loaders are "flashy" because they use `var(--muted-bg)` which creates too much contrast with the background:

**Current Implementation:**
- Light mode: `--muted-bg: #f8fafc` (light gray) vs background `#ffffff`
- Dark mode: `--muted-bg: #1e293b` (dark slate) vs background `#0f172a`

This creates a visible difference that stands out too much.

## Solution: Ultra-Minimal Skeleton Design

### Design Principles
1. **Subtle opacity-based colors** - Use very low opacity overlays instead of distinct colors
2. **No animations** - Ensure absolutely no shimmer, pulse, or transition effects
3. **Minimal contrast** - Colors should be barely distinguishable from the background

### Proposed CSS Changes

#### Light Mode (Default)
```css
.skeleton {
  background-color: rgba(0, 0, 0, 0.04); /* Very subtle dark overlay */
}
```

#### Dark Mode
```css
.dark .skeleton {
  background-color: rgba(255, 255, 255, 0.04); /* Very subtle light overlay */
}
```

### Comparison

| Aspect | Current | Proposed |
|--------|---------|----------|
| Light mode color | `#f8fafc` | `rgba(0,0,0,0.04)` |
| Dark mode color | `#1e293b` | `rgba(255,255,255,0.04)` |
| Contrast | High | Very low |
| Visual impact | Noticeable | Subtle |

## Implementation Steps

1. **Update [`app/globals.css`](app/globals.css:145)**
   - Replace `background-color: var(--muted-bg)` with opacity-based colors
   - Keep all existing variant classes (text, title, avatar, etc.)

2. **Verify skeleton components**
   - Ensure no Tailwind transition classes are applied
   - Check for any hover effects that might add flashiness

3. **Test in browser**
   - Verify skeleton loaders appear minimal and subtle
   - Check both light and dark modes

## Files to Modify

- [`app/globals.css`](app/globals.css:145) - Update skeleton background colors

## Files to Review (No changes expected)

- [`components/skeleton/Skeleton.tsx`](components/skeleton/Skeleton.tsx:1) - Base component
- [`components/skeleton/PageSkeleton.tsx`](components/skeleton/PageSkeleton.tsx:1) - Page layout skeleton
- [`components/skeleton/SkeletonCard.tsx`](components/skeleton/SkeletonCard.tsx:1) - Card skeleton
- [`components/skeleton/SkeletonButton.tsx`](components/skeleton/SkeletonButton.tsx:1) - Button skeleton
- [`components/skeleton/SVGSkeleton.tsx`](components/skeleton/SVGSkeleton.tsx:1) - SVG preview skeleton

## Expected Outcome

After implementation, the skeleton loaders will be:
- Barely visible (subtle opacity difference)
- No animations or transitions
- Consistent across light and dark modes
- Professional and minimal appearance

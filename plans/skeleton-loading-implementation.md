# Skeleton Loading Implementation Plan

## Overview
This plan details the implementation of proper skeleton loading for the root page (`app/(home)/page.tsx`). Skeleton loading will appear during:
1. **Initial page load** - While React hydrates and the page renders
2. **SVG preview loading** - While the SVG is being generated/fetched from the API

The skeleton loading will be responsive, showing different layouts for different devices (mobile, tablet, desktop).

---

## Architecture

### Component Structure
```
components/
├── skeleton/
│   ├── Skeleton.tsx              # Base skeleton element
│   ├── SkeletonCard.tsx          # Card skeleton wrapper
│   ├── SkeletonButton.tsx        # Button skeleton
│   ├── SkeletonInput.tsx         # Input field skeleton
│   ├── SkeletonText.tsx          # Text line skeleton
│   ├── PageSkeleton.tsx          # Full page skeleton (initial load)
│   └── SVGSkeleton.tsx           # SVG preview skeleton
```

### Loading States
1. **Initial Page Load** - Full page skeleton that mimics the complete page layout
2. **SVG Loading** - Skeleton specifically for the SVG preview card

---

## Implementation Steps

### Step 1: Add Skeleton Loading Styles to `globals.css`

Add shimmer animation and skeleton base styles:

```css
/* Skeleton shimmer animation */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--muted-bg) 0%,
    var(--muted-bg) 40%,
    var(--muted) 50%,
    var(--muted-bg) 60%,
    var(--muted-bg) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
  border-radius: 4px;
}

.dark .skeleton {
  background: linear-gradient(
    90deg,
    var(--muted-bg) 0%,
    var(--muted-bg) 40%,
    var(--muted) 50%,
    var(--muted-bg) 60%,
    var(--muted-bg) 100%
  );
}

/* Skeleton variants */
.skeleton-text {
  height: 1em;
  margin-bottom: 0.5em;
}

.skeleton-text-sm {
  height: 0.875em;
}

.skeleton-text-lg {
  height: 1.25em;
}

.skeleton-title {
  height: 1.5em;
  margin-bottom: 0.75em;
}

.skeleton-avatar {
  border-radius: 50%;
}

.skeleton-circle {
  border-radius: 50%;
}

.skeleton-rounded {
  border-radius: 8px;
}

.skeleton-pill {
  border-radius: 9999px;
}
```

---

### Step 2: Create Base Skeleton Component

**File:** `components/skeleton/Skeleton.tsx`

```tsx
import { cn } from '@/lib/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'text-sm' | 'text-lg' | 'title' | 'avatar' | 'circle' | 'rounded' | 'pill';
}

export function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton',
        {
          'skeleton-text': variant === 'text',
          'skeleton-text-sm': variant === 'text-sm',
          'skeleton-text-lg': variant === 'text-lg',
          'skeleton-title': variant === 'title',
          'skeleton-avatar': variant === 'avatar',
          'skeleton-circle': variant === 'circle',
          'skeleton-rounded': variant === 'rounded',
          'skeleton-pill': variant === 'pill',
        },
        className
      )}
      {...props}
    />
  );
}
```

---

### Step 3: Create Skeleton Card Component

**File:** `components/skeleton/SkeletonCard.tsx`

```tsx
import { Skeleton } from './Skeleton';

interface SkeletonCardProps {
  header?: boolean;
  contentLines?: number;
  className?: string;
}

export function SkeletonCard({ header = true, contentLines = 3, className }: SkeletonCardProps) {
  return (
    <div className={cn('border border-slate-200 dark:border-slate-700 rounded-lg p-4', className)}>
      {header && (
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-32" variant="title" />
          <Skeleton className="h-8 w-24" variant="pill" />
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: contentLines }).map((_, i) => (
          <Skeleton key={i} className="w-full" variant="text" />
        ))}
      </div>
    </div>
  );
}
```

---

### Step 4: Create Skeleton Button Component

**File:** `components/skeleton/SkeletonButton.tsx`

```tsx
import { Skeleton } from './Skeleton';

interface SkeletonButtonProps {
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function SkeletonButton({ size = 'default', className }: SkeletonButtonProps) {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };

  return (
    <Skeleton className={cn('inline-flex items-center justify-center', sizeClasses[size], className)} />
  );
}
```

---

### Step 5: Create Skeleton Input Component

**File:** `components/skeleton/SkeletonInput.tsx`

```tsx
import { Skeleton } from './Skeleton';

interface SkeletonInputProps {
  className?: string;
}

export function SkeletonInput({ className }: SkeletonInputProps) {
  return <Skeleton className={cn('h-10 w-full', className)} />;
}
```

---

### Step 6: Create Page Skeleton Component

**File:** `components/skeleton/PageSkeleton.tsx`

This component mimics the full page layout with responsive variants:

```tsx
import { Skeleton } from './Skeleton';
import { SkeletonCard } from './SkeletonCard';
import { SkeletonButton } from './SkeletonButton';

export function PageSkeleton() {
  return (
    <div className="py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with Quick Actions Bar */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Skeleton className="h-8 sm:h-10 w-64 sm:w-80 mb-2" variant="title" />
              <Skeleton className="h-4 sm:h-5 w-48 sm:w-56" variant="text-sm" />
            </div>
            <div className="flex flex-wrap gap-2">
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mb-6">
          <SkeletonCard header={true} contentLines={2} className="shadow-lg border-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Lines Editor */}
          <div className="space-y-6">
            <SkeletonCard header={true} contentLines={4} className="border-2" />
            <SkeletonCard header={true} contentLines={3} />
            <SkeletonCard header={true} contentLines={3} />
          </div>

          {/* Right Panel - Options */}
          <div className="space-y-6">
            <SkeletonCard header={true} contentLines={6} />
            <SkeletonCard header={true} contentLines={4} />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 sm:mt-20">
          <div className="text-center mb-8 sm:mb-10">
            <Skeleton className="h-6 sm:h-7 w-32 mx-auto mb-2" variant="title" />
            <Skeleton className="h-4 sm:h-5 w-56 mx-auto" variant="text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} header={false} contentLines={2} />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="my-16 sm:my-20">
          <div className="text-center mb-8 sm:mb-10">
            <Skeleton className="h-6 sm:h-7 w-48 mx-auto mb-2" variant="title" />
            <Skeleton className="h-4 sm:h-5 w-64 mx-auto" variant="text-sm" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} header={false} contentLines={2} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### Step 7: Create SVG Skeleton Component

**File:** `components/skeleton/SVGSkeleton.tsx`

This component shows a skeleton specifically for the SVG preview area:

```tsx
import { Skeleton } from './Skeleton';

interface SVGSkeletonProps {
  className?: string;
}

export function SVGSkeleton({ className }: SVGSkeletonProps) {
  return (
    <div className={className}>
      <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
        {/* SVG placeholder skeleton */}
        <div className="w-full h-24 sm:h-32 flex items-center justify-center">
          <Skeleton className="w-3/4 h-16 sm:h-20" variant="rounded" />
        </div>
      </div>
      {/* Controls skeleton */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-10 h-5" variant="pill" />
          <Skeleton className="h-4 w-24" variant="text-sm" />
        </div>
        <Skeleton className="h-4 w-16" variant="text-sm" />
      </div>
    </div>
  );
}
```

---

### Step 8: Update `page.tsx` to Implement Loading States

#### 8.1: Add loading state for SVG preview

```tsx
// Add near top of component
const [svgLoading, setSvgLoading] = useState(true);
const [svgLoaded, setSvgLoaded] = useState(false);

// Add useEffect to track SVG loading
useEffect(() => {
  setSvgLoading(true);
  setSvgLoaded(false);

  const img = new Image();
  img.onload = () => {
    setSvgLoading(false);
    setSvgLoaded(true);
  };
  img.onerror = () => {
    setSvgLoading(false);
  };
  img.src = svgUrl;
}, [svgUrl]);
```

#### 8.2: Replace SVG preview with skeleton when loading

```tsx
{/* In the preview card content */}
<CardContent className="space-y-4">
  {svgLoading ? (
    <SVGSkeleton />
  ) : (
    <>
      <div className="relative bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
        <img
          src={svgUrl}
          alt="Typing SVG Preview"
          className={`w-full mx-auto ${showBorder ? 'border-2 border-dashed border-red-500 rounded' : ''}`}
          onLoad={() => setSvgLoading(false)}
        />
      </div>
      {/* ... rest of preview controls */}
    </>
  )}
</CardContent>
```

---

### Step 9: Create Loading Wrapper for Initial Page Load

Since the page is a client component, we need to handle initial hydration. We can use a loading state that shows the skeleton on first render:

```tsx
// Add near top of component
const [isInitialLoad, setIsInitialLoad] = useState(true);

// Add useEffect to hide skeleton after initial load
useEffect(() => {
  const timer = setTimeout(() => {
    setIsInitialLoad(false);
  }, 500); // Short delay to show skeleton
  return () => clearTimeout(timer);
}, []);

// In the return statement, wrap content
return (
  <>
    <ToastDisplay />
    {isInitialLoad ? (
      <PageSkeleton />
    ) : (
      <div className="py-6 sm:py-8">
        {/* ... existing page content */}
      </div>
    )}
  </>
);
```

---

## Device-Specific Skeleton Variants

### Mobile (≤ 640px)
- Single column layout
- Smaller text and spacing
- Stacked buttons
- 1-2 lines for text skeletons

### Tablet (641px - 1024px)
- Two column grid for main content
- Medium text and spacing
- Wrapped buttons
- 2-3 lines for text skeletons

### Desktop (≥ 1025px)
- Two column grid with proper spacing
- Full text and spacing
- Horizontal button layout
- 3-4 lines for text skeletons

---

## Responsive Design Considerations

1. **Tailwind breakpoints** used:
   - `sm:` (640px) - Small devices
   - `md:` (768px) - Medium devices
   - `lg:` (1024px) - Large devices
   - `xl:` (1280px) - Extra large devices

2. **Skeleton sizing**:
   - Heights use responsive classes (`h-8 sm:h-10`)
   - Widths use percentages or responsive values
   - Spacing uses responsive margins/padding

3. **Grid layouts**:
   - Mobile: `grid-cols-1`
   - Tablet: `grid-cols-1 sm:grid-cols-2`
   - Desktop: `grid-cols-1 lg:grid-cols-2` or `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

---

## Files to Create/Modify

### New Files
1. `components/skeleton/Skeleton.tsx` - Base skeleton component
2. `components/skeleton/SkeletonCard.tsx` - Card skeleton wrapper
3. `components/skeleton/SkeletonButton.tsx` - Button skeleton
4. `components/skeleton/SkeletonInput.tsx` - Input field skeleton
5. `components/skeleton/SkeletonText.tsx` - Text line skeleton (optional)
6. `components/skeleton/PageSkeleton.tsx` - Full page skeleton
7. `components/skeleton/SVGSkeleton.tsx` - SVG preview skeleton
8. `components/skeleton/index.ts` - Export all skeleton components

### Modified Files
1. `app/globals.css` - Add skeleton styles and shimmer animation
2. `app/(home)/page.tsx` - Add loading states and integrate skeleton components

---

## Testing Checklist

- [ ] Skeleton appears on initial page load
- [ ] Skeleton disappears after initial load (500ms delay)
- [ ] SVG skeleton appears when SVG is loading
- [ ] SVG skeleton disappears when SVG loads
- [ ] Skeleton looks correct on mobile (≤ 640px)
- [ ] Skeleton looks correct on tablet (641px - 1024px)
- [ ] Skeleton looks correct on desktop (≥ 1025px)
- [ ] Shimmer animation works smoothly
- [ ] Dark mode skeleton colors are correct
- [ ] Skeleton matches actual content layout

---

## Performance Considerations

1. **Minimal DOM nodes** - Skeleton components should be lightweight
2. **CSS-based animation** - Use CSS animations instead of JS for shimmer
3. **Short display time** - Initial skeleton should only show for ~500ms
4. **Conditional rendering** - Only render skeleton when actually loading

---

## Accessibility Considerations

1. **ARIA attributes** - Add `role="status"` and `aria-label="Loading..."` to skeleton containers
2. **Screen reader support** - Skeleton content should be announced as loading
3. **Focus management** - Ensure focus is not trapped during loading states

---

## Future Enhancements

1. **Configurable delay** - Allow users to adjust skeleton display time
2. **Progressive loading** - Show skeleton for individual sections as they load
3. **Error state skeleton** - Different skeleton for error states
4. **Customizable animation** - Allow different animation styles

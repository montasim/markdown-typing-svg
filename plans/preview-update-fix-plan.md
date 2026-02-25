# Preview Update Fix Plan

## Issue Description
When adding new text or changing text in the "Add your text" field, the preview image is not updating. The user reports that the preview remains static even when text is modified.

## Root Cause Analysis

### Current Implementation
The preview image is rendered in [`app/(home)/page.tsx`](app/(home)/page.tsx:563-568):

```tsx
<img
  src={svgUrl}
  alt="Typing SVG Preview"
  className={`w-full mx-auto ${showBorder ? 'border-2 border-dashed border-red-500 rounded' : ''}`}
  onLoad={() => setSvgLoading(false)}
/>
```

The `svgUrl` is computed from the options state:
```tsx
const queryString = buildQueryString(options);
const svgUrl = `/api/svg?${queryString}`;
```

### The Problem
When the user types in the text input field:
1. [`handleLineChange()`](app/(home)/page.tsx:115-119) updates `options.lines`
2. `svgUrl` is recomputed with the new query string
3. The img `src` attribute changes
4. **However**, the browser may cache the SVG image and serve the cached version instead of fetching the new one

This is especially problematic because:
- The SVG API endpoint (`/api/svg`) may send caching headers
- The browser sees the same URL pattern and assumes it's the same resource
- Even though the query parameters change, aggressive caching can prevent the update

## Solution Options

### Option 1: Add a `key` prop to the img element (Recommended)
Add a `key` prop to the img element that changes when the options change. This forces React to unmount and remount the img element, which causes the browser to reload the image.

**Pros:**
- Simple and clean solution
- Leverages React's built-in mechanism
- No changes to URL structure
- Works reliably

**Cons:**
- Slight performance overhead from remounting the element

### Option 2: Add a cache-busting query parameter
Add a timestamp or random value as a query parameter to the URL (e.g., `&t=${timestamp}`).

**Pros:**
- Explicit cache busting
- Works even with aggressive caching

**Cons:**
- Changes URL structure
- May cause issues with URL sharing/copying
- The cache parameter should not be included in shared URLs

### Option 3: Use `debouncedOptions` for preview
Use the existing `debouncedOptions` state (line 56) instead of `options` for the preview to reduce update frequency and avoid rapid changes.

**Pros:**
- Reduces unnecessary API calls
- Better performance during typing

**Cons:**
- Doesn't solve the caching issue directly
- Adds delay to preview updates

## Recommended Solution

I recommend **Option 1** (Add a `key` prop) combined with **Option 3** (Use `debouncedOptions`):

1. Use `debouncedOptions` for the preview to reduce unnecessary updates while typing
2. Add a `key` prop to the img element based on the query string to force remounting when options change
3. Keep the existing loading state management

This approach provides:
- Better performance (debouncing)
- Reliable preview updates (key prop)
- Clean implementation (no URL changes)

## Implementation Steps

1. **Update the preview img element** in [`app/(home)/page.tsx`](app/(home)/page.tsx:563-568):
   - Add a `key` prop based on the query string
   - Optionally use `debouncedOptions` instead of `options` for the preview

2. **Test the fix**:
   - Add a new line using the "Add line" button
   - Type in the text input field
   - Verify the preview updates correctly
   - Verify the preview doesn't update too frequently (if debouncing is implemented)

## Code Changes

### Change 1: Add key prop to preview img element

Location: [`app/(home)/page.tsx`](app/(home)/page.tsx:563-568)

Current code:
```tsx
<img
  src={svgUrl}
  alt="Typing SVG Preview"
  className={`w-full mx-auto ${showBorder ? 'border-2 border-dashed border-red-500 rounded' : ''}`}
  onLoad={() => setSvgLoading(false)}
/>
```

Updated code:
```tsx
<img
  key={queryString}  // Add this line
  src={svgUrl}
  alt="Typing SVG Preview"
  className={`w-full mx-auto ${showBorder ? 'border-2 border-dashed border-red-500 rounded' : ''}`}
  onLoad={() => setSvgLoading(false)}
/>
```

### Change 2 (Optional): Use debouncedOptions for preview

Location: [`app/(home)/page.tsx`](app/(home)/page.tsx:234-236)

Current code:
```tsx
const queryString = buildQueryString(options);
const svgUrl = `/api/svg?${queryString}`;
const imageUrl = typeof window !== 'undefined' ? `${window.location.origin}${svgUrl}` : svgUrl;
```

Updated code:
```tsx
const queryString = buildQueryString(debouncedOptions);
const svgUrl = `/api/svg?${queryString}`;
const imageUrl = typeof window !== 'undefined' ? `${window.location.origin}${svgUrl}` : svgUrl;
```

Note: If using debouncedOptions, we also need to update the useEffect that depends on svgUrl to use debouncedOptions instead.

## Testing Checklist

- [ ] Add a new line using the "Add line" button - preview should update
- [ ] Type in an existing text input field - preview should update
- [ ] Delete a line - preview should update
- [ ] Drag and drop to reorder lines - preview should update
- [ ] Use bulk edit mode - preview should update when clicking "Done"
- [ ] Load a template - preview should update
- [ ] Load a preset - preview should update
- [ ] Reset to defaults - preview should update
- [ ] Verify the preview doesn't flicker excessively (if debouncing is implemented)

## Additional Considerations

1. **Performance**: The debouncing approach reduces the number of API calls and preview updates while typing, which is beneficial for performance.

2. **User Experience**: The 300ms debounce delay provides a good balance between responsiveness and performance. Users won't notice the delay, but the app will be more efficient.

3. **Browser Compatibility**: The key prop approach is a standard React pattern and works across all modern browsers.

4. **Caching Headers**: If the API endpoint sends caching headers, the key prop approach ensures the browser always fetches a fresh image when options change.

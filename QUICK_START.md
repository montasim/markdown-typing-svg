# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000` (or 3001 if 3000 is in use).

### 3. Test the Application

#### Landing Page
Visit `http://localhost:3000` to see the landing page with:
- Gradient hero section
- Feature cards
- "Get Started" button

#### Demo/Editor Page
Visit `http://localhost:3000/demo` to access the interactive editor with:
- Text lines editor (add/remove lines)
- Typography options (font, size, letter spacing)
- Color pickers (text and background)
- Dimension controls (width and height sliders)
- Alignment toggles (horizontal and vertical centering)
- Animation controls (duration, pause, repeat, multiline, random)
- Live SVG preview
- Markdown and HTML code export
- Copy to clipboard buttons
- Dark/light mode toggle

### 4. Test SVG Generation

#### Basic Test
1. Go to `/demo`
2. The preview should show an animated typing SVG
3. Try changing the text in the first line
4. The preview should update automatically

#### Advanced Test
1. Change the font to "Roboto"
2. Set text color to "#FF0000" (red)
3. Enable horizontal centering
4. Set duration to 3000ms
5. The preview should reflect all changes

#### Export Test
1. Click "Copy" button next to Markdown
2. You should see "Copied to clipboard!" alert
3. Paste into a test markdown file to verify

### 5. Test API Directly

```bash
# Test basic SVG
curl "http://localhost:3000/api/svg?lines=Hello+World"

# Test with custom options
curl "http://localhost:3000/api/svg?lines=Test;Multiple;Lines&font=Fira+Code&color=36BCF7&center=true" > test.svg
```

### 6. Test Dark Mode

1. Click the moon/sun icon in the top right
2. The entire interface should toggle between light and dark themes
3. The preference should be saved to localStorage
4. Refresh the page - theme should persist

## 🐛 Troubleshooting

### Preview Not Showing

**Problem**: SVG preview image is blank or not loading

**Solutions**:
1. Check browser console for errors
2. Verify the API endpoint is working: `curl "http://localhost:3000/api/svg?lines=Test"`
3. Check if the image src URL is correct
4. Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Dark Mode Not Working

**Problem**: Theme toggle doesn't change colors

**Solutions**:
1. Open browser DevTools (F12)
2. Check the `<html>` element for `class="dark"` or `class="light"`
3. Clear localStorage: `localStorage.clear()` and refresh
4. Check if browser is blocking localStorage (private/incognito mode)
5. Verify Tailwind CSS dark mode classes are working

### Build Errors

**Problem**: TypeScript or build errors

**Solutions**:
1. Check all imports are correct
2. Verify all components are exported properly
3. Run `pnpm lint` to check for issues
4. Delete `.next` folder and rebuild: `rm -rf .next && pnpm build`

### Port Already in Use

**Problem**: `Port 3000 is in use` error

**Solutions**:
1. Kill the process using port 3000: `lsof -ti:3000 | xargs kill -9`
2. Or use the alternate port shown (e.g., 3001)
3. Or specify a different port: `PORT=3002 pnpm dev`

## 📝 Development Tips

### Hot Reload
- Changes to `.tsx` files trigger automatic reload
- Changes to `.ts` files in `lib/` also trigger reload
- API route changes require manual restart

### Debugging
- Add `console.log()` statements for debugging
- Use React DevTools for component state inspection
- Check Network tab for API requests

### Performance
- The preview uses 300ms debouncing to prevent excessive re-renders
- SVGs are cached for 24 hours on the server
- Google Fonts are cached in memory for 24 hours

## ✅ Verification Checklist

Before considering the implementation complete, verify:

- [ ] Landing page loads and displays correctly
- [ ] Demo page loads without errors
- [ ] SVG preview shows animated typing
- [ ] Adding/removing text lines works
- [ ] All options (font, colors, size, etc.) update preview
- [ ] Dark mode toggle works and persists
- [ ] Copy to clipboard works for Markdown
- [ ] Copy to clipboard works for HTML
- [ ] URL updates with current configuration
- [ ] API endpoint returns valid SVG
- [ ] Build completes without errors
- [ ] Responsive design works on mobile

## 🎯 Next Steps

Once everything is working:

1. **Deploy to Vercel** (recommended)
   ```bash
   vercel
   ```

2. **Or deploy to other platforms**
   - Netlify
   - Railway
   - Render
   - DigitalOcean

3. **Customize for your needs**
   - Add your branding
   - Modify color scheme
   - Add more features
   - Integrate with your existing tools

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review the [README.md](README.md) for documentation
3. Check the [FEATURE_COMPARISON.md](FEATURE_COMPARISON.md) for feature details
4. Open an issue with reproduction steps

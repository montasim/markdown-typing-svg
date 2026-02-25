# ⌨️ Markdown Typing SVG

[![Live Demo](https://markdown-typing-svg.netlify.app/api/svg?lines=Live+Demo;Create+Animated+SVGs;For+Your+Profile&font=Fira+Code&size=20&color=36BCF7&center=true&width=400&height=50)](https://markdown-typing-svg.netlify.app)

> Create beautiful animated typing SVGs for your GitHub README, profiles, and more. A modern Next.js implementation with extensive customization options.

**Live Demo**: https://markdown-typing-svg.netlify.app

---

## ✨ Features

### Core Features
- 🎨 **Modern UI** - Clean, gradient interface with animated background shapes
- 🌙 **Dark Mode** - Full dark mode support with smooth transitions
- ⚡ **Live Preview** - Real-time preview of your SVG as you customize
- 🔤 **Custom Fonts** - Support for 1000+ Google Fonts with automatic embedding
- 🎛️ **Fully Customizable** - 25+ configuration options for fonts, colors, sizes, and animations
- 📋 **Easy Export** - Copy Markdown or HTML code with one click
- 🔄 **Shareable URLs** - Generate shareable URLs with your configuration

### Advanced Features
- 🎬 **Multiple Animation Types** - Typing, fade, slide, bounce, and wave animations
- 🌈 **Gradient Text** - Beautiful gradient text effects with customizable colors
- ✨ **Text Effects** - Text shadow/glow effects with blur and offset controls
- 💫 **Cursor Styles** - Block, line, and underscore cursor options
- 🎯 **Animation Control** - Custom easing functions and timing control
- 📐 **Responsive Design** - Works perfectly on all devices
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🔍 **SEO Optimized** - Comprehensive SEO with structured data and sitemaps

### Platform Support
- 🐙 GitHub README
- 🦊 GitLab
- 💬 Discord
- 📱 Slack
- 📝 Notion
- 🌐 HTML Websites
- And many more...

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/markdown-typing-svg.git
cd markdown-typing-svg

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### Basic Usage

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Enter your text lines (separated by semicolons)
3. Customize the options (font, colors, size, animation, etc.)
4. Copy the generated Markdown or HTML code
5. Paste it into your GitHub README or any markdown file

### Quick Example

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+World;Welcome+to+My+Profile)](https://git.io/typing-svg)
```

---

## 📖 Configuration Options

### Text Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lines` | string | `The five boxing wizards jump quickly` | Text lines to display (separate with `;` or use URL-encoded `+` for spaces) |
| `font` | string | `Fira Code` | Font family from Google Fonts |
| `weight` | integer | `400` | Font weight (100-900) |
| `size` | integer | `20` | Font size in pixels |
| `letterSpacing` | string | `normal` | Letter spacing CSS value (e.g., `2px`, `0.5em`) |

### Color Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | string | `36BCF7` | Text color in hex format (without `#`) |
| `background` | string | `00000000` | Background color in hex format (without `#`, supports alpha) |
| `gradient` | boolean | `false` | Enable gradient text effect |
| `gradientFrom` | string | `36BCF7` | Gradient start color (hex without `#`) |
| `gradientTo` | string | `B836F7` | Gradient end color (hex without `#`) |
| `textShadow` | boolean | `false` | Enable text shadow/glow effect |
| `textShadowBlur` | number | `4` | Text shadow blur radius |
| `textShadowColor` | string | `36BCF7` | Text shadow color (hex without `#`) |
| `textShadowOffsetX` | number | `0` | Text shadow horizontal offset |
| `textShadowOffsetY` | number | `0` | Text shadow vertical offset |

### Layout Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `width` | integer | `435` | SVG width in pixels |
| `height` | integer | `50` | SVG height in pixels |
| `center` | boolean | `false` | Horizontally center text |
| `vCenter` | boolean | `false` | Vertically center text |
| `borderRadius` | integer | `0` | Border radius for background (pixels) |

### Animation Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `animationType` | string | `typing` | Animation type: `typing`, `fade`, `slide`, `bounce`, `wave` |
| `duration` | integer | `5000` | Typing duration per line in milliseconds |
| `pause` | integer | `1000` | Pause between lines in milliseconds |
| `repeat` | boolean | `true` | Loop the animation |
| `easing` | string | `linear` | Easing function: `linear`, `ease-in`, `ease-out`, `ease-in-out`, `custom` |
| `easingBezier` | string | `0.4, 0, 0.2, 1` | Custom bezier curve (when easing is `custom`) |
| `reverseTyping` | boolean | `false` | Enable reverse typing effect |

### Display Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `multiline` | boolean | `false` | Display each line on new line vs retype on same line |
| `random` | boolean | `false` | Randomize line order |
| `separator` | string | `;` | Separator between lines |

### Cursor Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `cursor` | boolean | `false` | Show blinking cursor at end of text |
| `cursorColor` | string | `36BCF7` | Cursor color (hex without `#`) |
| `cursorStyle` | string | `block` | Cursor style: `block`, `line`, `underscore` |

---

## 🎨 Live Examples

### Basic Example

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+World;Welcome+to+My+Profile)](https://git.io/typing-svg)
```

![Basic Example](https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+World;Welcome+to+My+Profile)

### Custom Font and Color

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Full-stack+developer;Open+source+enthusiast&font=Fira+Code&color=FF6464&center=true&width=380&height=50)](https://git.io/typing-svg)
```

![Custom Font](https://markdown-typing-svg.netlify.app/api/svg?lines=Full-stack+developer;Open+source+enthusiast&font=Fira+Code&color=FF6464&center=true&width=380&height=50)

### Gradient Text

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Building+the+Future;One+Line+at+a+Time&gradient=true&gradientFrom=667eea&gradientTo=764ba2&center=true)](https://git.io/typing-svg)
```

![Gradient Text](https://markdown-typing-svg.netlify.app/api/svg?lines=Building+the+Future;One+Line+at+a+Time&gradient=true&gradientFrom=667eea&gradientTo=764ba2&center=true)

### Text Shadow Effect

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Neon+Glow;Cyberpunk+Vibes&textShadow=true&textShadowBlur=6&textShadowColor=00FFFF&background=0D0D0D&center=true)](https://git.io/typing-svg)
```

![Text Shadow](https://markdown-typing-svg.netlify.app/api/svg?lines=Neon+Glow;Cyberpunk+Vibes&textShadow=true&textShadowBlur=6&textShadowColor=00FFFF&background=0D0D0D&center=true)

### Multiline Display

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=JavaScript+%2F+TypeScript;React+%2F+Vue+%2F+Angular;Node.js+%2B+Python+%2B+Go&multiline=true&center=true&height=80)](https://git.io/typing-svg)
```

![Multiline](https://markdown-typing-svg.netlify.app/api/svg?lines=JavaScript+%2F+TypeScript;React+%2F+Vue+%2B+Angular;Node.js+%2B+Python+%2B+Go&multiline=true&center=true&height=80)

### With Cursor

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Typing+with+Cursor;Blink+Block+Cursor&cursor=true&cursorStyle=block&cursorColor=36BCF7&background=1a1a2e)](https://git.io/typing-svg)
```

![With Cursor](https://markdown-typing-svg.netlify.app/api/svg?lines=Typing+with+Cursor;Blink+Block+Cursor&cursor=true&cursorStyle=block&cursorColor=36BCF7&background=1a1a2e)

### Retro Terminal Style

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=%3E+INITIALIZING...;%3E+LOADING...;%3E+READY&font=Fira+Code&color=00FF00&background=000000&multiline=true)](https://git.io/typing-svg)
```

![Retro Terminal](https://markdown-typing-svg.netlify.app/api/svg?lines=%3E+INITIALIZING...;%3E+LOADING...;%3E+READY&font=Fira+Code&color=00FF00&background=000000&multiline=true)

### Custom Duration and Pause

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Fast+Typing;Quick+Animation&duration=2000&pause=500&center=true)](https://git.io/typing-svg)
```

![Custom Duration](https://markdown-typing-svg.netlify.app/api/svg?lines=Fast+Typing;Quick+Animation&duration=2000&pause=500&center=true)

### Random Line Order

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Line+One;Line+Two;Line+Three;Line+Four&random=true&center=true)](https://git.io/typing-svg)
```

![Random Order](https://markdown-typing-svg.netlify.app/api/svg?lines=Line+One;Line+Two;Line+Three;Line+Four&random=true&center=true)

### Letter Spacing

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Wide+Spacing;Expanded+Text&letterSpacing=4px&center=true)](https://git.io/typing-svg)
```

![Letter Spacing](https://markdown-typing-svg.netlify.app/api/svg?lines=Wide+Spacing;Expanded+Text&letterSpacing=4px&center=true)

---

## 🎬 Animation Types

### Typing Animation (Default)

The classic typing effect where characters appear one by one.

```
animationType=typing
```

![Typing](https://markdown-typing-svg.netlify.app/api/svg?lines=Typing+Animation;Characters+Appear+One+by+One&animationType=typing&center=true)

### Fade Animation

Text fades in smoothly with opacity transitions.

```
animationType=fade
```

![Fade](https://markdown-typing-svg.netlify.app/api/svg?lines=Fade+Animation;Smooth+Opacity+Transition&animationType=fade&center=true)

### Slide Animation

Text slides in from the left side.

```
animationType=slide
```

![Slide](https://markdown-typing-svg.netlify.app/api/svg?lines=Slide+Animation;Text+Slides+In&animationType=slide&center=true)

### Bounce Animation

Text bounces in with a spring effect.

```
animationType=bounce
```

![Bounce](https://markdown-typing-svg.netlify.app/api/svg?lines=Bounce+Animation;Spring+Effect&animationType=bounce&center=true)

### Wave Animation

Text appears with a wave motion.

```
animationType=wave
```

![Wave](https://markdown-typing-svg.netlify.app/api/svg?lines=Wave+Animation;Wavy+Motion&animationType=wave&center=true)

---

## 🌐 Platform-Specific Usage

### GitHub README

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Full+Stack+Developer;React+%2B+Node.js)](https://git.io/typing-svg)
```

### GitLab

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=GitLab+Developer;Open+Source+Contributor)](https://git.io/typing-svg)
```

### Discord

Copy and paste this URL directly into Discord:

```
https://markdown-typing-svg.netlify.app/api/svg?lines=Discord+User;Gaming+Enthusiast
```

### Slack

Use this format for Slack:

```
<https://markdown-typing-svg.netlify.app/api/svg?lines=Slack+User|Typing SVG>
```

### Notion

```markdown
![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Notion+User;Productivity+Expert)
```

### HTML Website

```html
<a href="https://git.io/typing-svg">
  <img src="https://markdown-typing-svg.netlify.app/api/svg?lines=Your+Text+Here" alt="Typing SVG" />
</a>
```

### Direct URL

Use this URL anywhere that supports image links:

```
https://markdown-typing-svg.netlify.app/api/svg?lines=Your+Text+Here
```

---

## 📋 Templates & Presets

### Professional Templates

#### Developer Title
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Full+Stack+Developer;React+%26+Node.js;Open+Source+Enthusiast&font=Fira+Code&size=20&color=36BCF7&center=true&width=400&height=50)](https://git.io/typing-svg)
```

#### CTO Profile
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Chief+Technology+Officer;Leading+Innovation;Building+Scalable+Systems&font=Fira+Code&size=20&color=0066CC&center=true&width=420&height=50)](https://git.io/typing-svg)
```

#### DevOps Engineer
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=DevOps+Engineer;CI%2FCD+Expert;Cloud+Infrastructure+Specialist&font=JetBrains+Mono&size=18&color=FF6600&center=true&width=450&height=60&multiline=true)](https://git.io/typing-svg)
```

#### Data Scientist
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Data+Scientist;Machine+Learning+Engineer;Turning+Data+into+Insights&font=Roboto&size=20&color=00CED1&center=true&width=420&height=50)](https://git.io/typing-svg)
```

### Style Templates

#### Gradient Vibes
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Building+the+Future;One+Line+at+a+Time&gradient=true&gradientFrom=667eea&gradientTo=764ba2&center=true)](https://git.io/typing-svg)
```

#### Neon Glow
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=NEON+DREAMS;CYBERPUNK+VIBES&font=Orbitron&size=24&color=00FFFF&background=0D0D0D&textShadow=true&textShadowBlur=8&textShadowColor=00FFFF&center=true)](https://git.io/typing-svg)
```

#### Retro Terminal
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=%3E+INITIALIZING...;%3E+LOADING...;%3E+READY&font=Fira+Code&size=18&color=00FF00&background=000000&multiline=true)](https://git.io/typing-svg)
```

#### Elegant Serif
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Crafting+Digital+Experiences;With+Passion+%26+Precision&font=Playfair+Display&size=22&color=2C3E50&center=true&width=450&height=50)](https://git.io/typing-svg)
```

### Gaming Templates

#### Gaming Profile
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Pro+Gamer;Twitch+Streamer;FPS+Champion&font=Press+Start+2P&size=16&color=00FF00&background=1a1a2e&center=true)](https://git.io/typing-svg)
```

#### Game Developer
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Game+Developer;Unity+%26+Unreal;Creating+Immersive+Worlds&font=Press+Start+2P&size=16&color=FF006E&background=16213E&center=true&multiline=true&height=60)](https://git.io/typing-svg)
```

### Quote Templates

#### Inspirational
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Code+is+poetry;Make+it+work%2C+make+it+right%2C+make+it+fast;Talk+is+cheap.+Show+me+the+code&font=Fira+Code&size=18&color=FFD700&center=true&width=450&height=50)](https://git.io/typing-svg)
```

#### Humorous
```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=99+little+bugs+in+the+code;99+little+bugs;Take+one+down%2C+patch+it+around;127+little+bugs+in+the+code&font=JetBrains+Mono&size=16&color=FD79A8&center=true&multiline=true&height=80)](https://git.io/typing-svg)
```

---

## 🔧 API Reference

### Endpoint

```
GET /api/svg
```

### Query Parameters

All parameters are optional except `lines`. Parameters are passed as URL query parameters.

### Example API Calls

```bash
# Basic request
curl "https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+World"

# With custom options
curl "https://markdown-typing-svg.netlify.app/api/svg?lines=Test&font=Roboto&color=FF0000&center=true&width=400"

# With gradient
curl "https://markdown-typing-svg.netlify.app/api/svg?lines=Gradient+Text&gradient=true&gradientFrom=667eea&gradientTo=764ba2"

# With text shadow
curl "https://markdown-typing-svg.netlify.app/api/svg?lines=Glowing+Text&textShadow=true&textShadowBlur=8&textShadowColor=00FFFF"

# Multiline with cursor
curl "https://markdown-typing-svg.netlify.app/api/svg?lines=Line+One;Line+Two;Line+Three&multiline=true&cursor=true&cursorStyle=block"
```

### Response

**Content-Type**: `image/svg+xml; charset=utf-8`

**Cache-Control**: `public, max-age=86400` (24 hours)

The API returns an SVG image that can be embedded directly in HTML or markdown.

### Error Handling

If invalid parameters are provided, the API returns an error SVG with status code 422.

---

## 🏗️ Architecture

### Project Structure

```
markdown-typing-svg/
├── app/                      # Next.js App Router pages
│   ├── (home)/              # Home page group
│   │   ├── layout.tsx       # Home layout with metadata
│   │   └── page.tsx         # Interactive editor page
│   ├── api/svg/             # API endpoint for SVG generation
│   ├── contact/             # Contact page
│   ├── privacy/             # Privacy policy page
│   ├── terms/               # Terms of service page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # Dynamic sitemap
│   ├── sitemap-images.ts    # Image sitemap
│   ├── not-found.tsx        # 404 page
│   └── error.tsx            # Error page
├── components/              # React components
│   ├── layout/              # Layout components (Navbar, Footer, etc.)
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   └── skeleton/            # Loading skeleton components
├── lib/                     # Core business logic
│   ├── fonts/               # Google Fonts integration
│   ├── svg/                 # SVG generation engine
│   ├── seo/                 # SEO utilities and metadata
│   ├── validation/          # Input validation
│   └── utils/               # Utility functions
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── config/                  # Configuration files
│   ├── defaults.ts          # Default options
│   ├── platform-presets.ts  # Platform-specific presets
│   ├── templates.ts         # Text templates
│   ├── seo.ts               # SEO configuration
│   └── site.ts              # Site configuration
├── public/                  # Static assets
│   ├── robots.txt           # Robots.txt for SEO
│   ├── og-image.png         # Open Graph image
│   └── twitter-image.png    # Twitter Card image
└── plans/                   # Implementation plans and documentation
```

### Key Technologies

- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety throughout
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Zod 4.3.6** - Runtime type validation
- **Lucide React 0.575.0** - Beautiful icons
- **pnpm** - Fast, disk space efficient package manager

### Design Patterns

- **Single Responsibility** - Each module has one clear purpose
- **Dependency Inversion** - Components depend on abstractions
- **Open/Closed** - Easy to extend without modifying existing code
- **Interface Segregation** - Focused, specific interfaces
- **Liskov Substitution** - Proper inheritance hierarchies

---

## 🛠️ Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Environment Variables

No environment variables are required for basic functionality. Optional variables can be added for:

- `NEXT_PUBLIC_SITE_URL` - Base URL for generated links
- `NEXT_PUBLIC_GOOGLE_FONTS_API_KEY` - Custom Google Fonts API key

### Code Style

- Follow existing code style and formatting
- Use TypeScript for all new code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📦 Deployment

### Netlify (Recommended)

```bash
# Install Netlify CLI
pnpm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:

- Netlify
- AWS Amplify
- Google Cloud Run
- Railway
- Render
- DigitalOcean App Platform
- Cloudflare Pages

---

## 🔍 SEO Implementation

This project includes comprehensive SEO optimization:

### Features

- **Dynamic Sitemaps** - Automatically generated sitemaps for all pages
- **Robots.txt** - Proper crawler configuration
- **Structured Data** - JSON-LD schemas for rich snippets
- **Open Graph Tags** - Optimized social sharing previews
- **Twitter Cards** - Enhanced Twitter sharing
- **Canonical URLs** - Prevent duplicate content issues
- **Meta Tags** - Optimized titles and descriptions
- **Breadcrumbs** - Semantic navigation structure

### Structured Data Types

- **Organization** - Company information
- **WebSite** - Site metadata
- **WebPage** - Page-specific data
- **SoftwareApplication** - Application details
- **FAQPage** - Frequently asked questions
- **BreadcrumbList** - Navigation structure

### SEO Files

- [`config/seo.ts`](config/seo.ts) - Centralized SEO configuration
- [`lib/seo/metadata.ts`](lib/seo/metadata.ts) - Metadata utilities
- [`lib/seo/structured-data.ts`](lib/seo/structured-data.ts) - Schema generator
- [`public/robots.txt`](public/robots.txt) - Crawler configuration
- [`app/sitemap.ts`](app/sitemap.ts) - Dynamic sitemap

For detailed SEO documentation, see [`SEO_IMPLEMENTATION_SUMMARY.md`](SEO_IMPLEMENTATION_SUMMARY.md).

---

## 🧪 Testing

### Manual Testing

1. Visit the root page at `/`
2. Test all configuration options
3. Verify SVG generation with different parameters
4. Test copy to clipboard functionality
5. Verify dark/light mode toggle
6. Test responsive design on different screen sizes
7. Test with various fonts from Google Fonts

### API Testing

```bash
# Test basic SVG generation
curl "http://localhost:3000/api/svg?lines=Hello+World"

# Test with custom options
curl "http://localhost:3000/api/svg?lines=Test&font=Roboto&color=FF0000&center=true"

# Test production API
curl "https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+World"
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines

- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Follow the existing code style

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Original [Readme Typing SVG](https://github.com/DenverCoder1/readme-typing-svg) by DenverCoder1
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Google Fonts](https://fonts.google.com/) for font support
- [Next.js](https://nextjs.org/) for the React framework

---

## 📞 Support

- 📧 Open an issue for bug reports or feature requests
- 💬 Join discussions for questions and ideas
- ⭐ Star the repository if you find it useful
- 📖 Check the [Quick Start Guide](QUICK_START.md) for getting started
- 📋 See [Feature Comparison](FEATURE_COMPARISON.md) for PHP vs Next.js comparison
- 🔍 Read [SEO Implementation Summary](SEO_IMPLEMENTATION_SUMMARY.md) for SEO details

---

## 🌐 Production

- **Live Demo**: https://markdown-typing-svg.netlify.app
- **API Endpoint**: https://markdown-typing-svg.netlify.app/api/svg

---

## 📊 Project Stats

- **Total Templates**: 40+
- **Supported Platforms**: 8+
- **Configuration Options**: 25+
- **Animation Types**: 5
- **Google Fonts**: 1000+
- **Color Effects**: Gradient, Shadow, Glow

---

Made with ❤️ using Next.js 16, React 19, and TypeScript

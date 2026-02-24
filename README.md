# ⌨️ Markdown Typing SVG

Create beautiful animated typing SVGs for your GitHub README, profiles, and more. This is a modern Next.js implementation of the popular Readme Typing SVG project.

**Live Demo**: https://markdown-typing-svg.netlify.app

![Markdown Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Markdown+Typing+SVG;Create+animated+SVGs+for+your+README;Fully+customizable+with+live+preview)

## ✨ Features

- 🎨 **Modern UI** - Clean, gradient interface with animated background shapes
- 🌙 **Dark Mode** - Full dark mode support with smooth transitions
- ⚡ **Live Preview** - Real-time preview of your SVG as you customize
- 🔤 **Custom Fonts** - Support for Google Fonts with automatic embedding
- 🎛️ **Fully Customizable** - Extensive options for fonts, colors, sizes, and animations
- 📋 **Easy Export** - Copy Markdown or HTML code with one click
- 🔄 **Shareable URLs** - Generate shareable URLs with your configuration
- 🚀 **Fast** - Built with Next.js for optimal performance
- 📱 **Responsive** - Works perfectly on all devices
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- 🔍 **SEO Optimized** - Comprehensive SEO with structured data and sitemaps
- 📄 **Legal Pages** - Privacy policy and terms of service included

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

### Usage

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Enter your text lines
3. Customize the options (font, colors, size, animation, etc.)
4. Copy the generated Markdown or HTML code
5. Paste it into your GitHub README or any markdown file

### Project Pages

- **Home** (`/`) - Interactive SVG generator with live preview
- **Contact** (`/contact`) - Get in touch with the team
- **Privacy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms of service

## 📖 Example Usage

### Basic Usage

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+World;Welcome+to+My+Profile)](https://git.io/typing-svg)
```

### With Custom Options

```markdown
[![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Full-stack+developer;Open+source+enthusiast&font=Fira+Code&color=36BCF7&center=true&width=380&height=50)](https://git.io/typing-svg)
```

### HTML Usage

```html
<a href="https://git.io/typing-svg">
  <img src="https://markdown-typing-svg.netlify.app/api/svg?lines=Your+Text+Here" alt="Typing SVG" />
</a>
```

## ⚙️ Options

| Parameter | Description | Type | Default | Example |
|-----------|-------------|--------|---------|----------|
| `lines` | Text to display (separated by `;`) | string | - | `Hello;World;Welcome` |
| `font` | Font family from Google Fonts | string | `Fira Code` | `Roboto`, `Open Sans` |
| `weight` | Font weight (100-900) | integer | `400` | `700` |
| `size` | Font size in pixels | integer | `20` | `24` |
| `color` | Text color (hex without #) | string | `36BCF7` | `FF6464` |
| `background` | Background color (hex without #) | string | `00000000` | `FEFF4C` |
| `center` | Horizontally center text | boolean | `false` | `true` |
| `vCenter` | Vertically center text | boolean | `false` | `true` |
| `width` | SVG width in pixels | integer | `435` | `500` |
| `height` | SVG height in pixels | integer | `50` | `80` |
| `multiline` | Each line on new line vs retype on same line | boolean | `false` | `true` |
| `duration` | Typing duration per line in milliseconds | integer | `5000` | `3000` |
| `pause` | Pause between lines in milliseconds | integer | `1000` | `500` |
| `repeat` | Loop the animation | boolean | `true` | `false` |
| `separator` | Separator between lines | string | `;` | `;;`, `/` |
| `random` | Randomize line order | boolean | `false` | `true` |
| `letterSpacing` | Letter spacing CSS value | string | `normal` | `2px` |

## 🏗️ Architecture

This project follows clean code principles and SOLID design patterns:

### Project Structure

```
markdown-typing-svg/
├── app/                    # Next.js App Router pages
│   ├── (home)/            # Home page group
│   │   ├── layout.tsx     # Home layout with metadata
│   │   └── page.tsx       # Interactive editor page
│   ├── api/svg/           # API endpoint for SVG generation
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── sitemap-images.ts  # Image sitemap
│   ├── not-found.tsx      # 404 page
│   └── error.tsx          # Error page
├── components/              # React components
│   ├── layout/             # Layout components (Navbar, Footer, etc.)
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── contact/            # Contact page components
│   └── svg/                # SVG-related components
├── lib/                    # Core business logic
│   ├── fonts/              # Google Fonts integration
│   ├── svg/                # SVG generation engine
│   ├── seo/                # SEO utilities and metadata
│   ├── validation/         # Input validation
│   └── utils/              # Utility functions
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── config/                  # Configuration files
│   ├── defaults.ts         # Default options
│   ├── seo.ts              # SEO configuration
│   └── site.ts             # Site configuration
├── public/                  # Static assets
│   ├── robots.txt          # Robots.txt for SEO
│   ├── og-image.png        # Open Graph image
│   └── twitter-image.png   # Twitter Card image
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

## 🔧 Development

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

## 🔄 Migration from PHP Version

This is a complete rewrite of the original PHP-based Readme Typing SVG. All features from the PHP version have been implemented:

| Feature | PHP Version | Next.js Version | Status |
|----------|--------------|------------------|--------|
| SVG Generation | ✅ | ✅ | Complete |
| Multiple Lines | ✅ | ✅ | Complete |
| Font Customization | ✅ | ✅ | Complete |
| Google Fonts | ✅ | ✅ | Complete |
| Color Customization | ✅ | ✅ | Complete |
| Alignment Options | ✅ | ✅ | Complete |
| Animation Controls | ✅ | ✅ | Complete |
| Demo Site | ✅ | ✅ | Complete |
| Live Preview | ✅ | ✅ | Complete |
| Code Generation | ✅ | ✅ | Complete |
| Copy to Clipboard | ✅ | ✅ | Complete |
| Dark Mode | ✅ | ✅ | Complete |
| Permalink Sharing | ✅ | ✅ | Complete |
| Border Toggle | ✅ | ✅ | Complete |
| Input Validation | ✅ | ✅ | Complete |
| Error Handling | ✅ | ✅ | Complete |
| Caching | ✅ | ✅ | Complete |
| Responsive Design | ✅ | ✅ | Complete |
| SEO Optimization | ❌ | ✅ | New |
| Legal Pages | ❌ | ✅ | New |
| Contact Page | ❌ | ✅ | New |
| Structured Data | ❌ | ✅ | New |

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

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow existing code style and formatting
- Use TypeScript for all new code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original [Readme Typing SVG](https://github.com/DenverCoder1/readme-typing-svg) by DenverCoder1
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Google Fonts](https://fonts.google.com/) for font support
- [Next.js](https://nextjs.org/) for the React framework

## 📞 Support

- 📧 Open an issue for bug reports or feature requests
- 💬 Join discussions for questions and ideas
- ⭐ Star the repository if you find it useful
- 📖 Check the [Quick Start Guide](QUICK_START.md) for getting started
- 📋 See [Feature Comparison](FEATURE_COMPARISON.md) for PHP vs Next.js comparison
- 🔍 Read [SEO Implementation Summary](SEO_IMPLEMENTATION_SUMMARY.md) for SEO details

## 🌐 Production

- **Live Demo**: https://markdown-typing-svg.netlify.app
- **API Endpoint**: https://markdown-typing-svg.netlify.app/api/svg

---

Made with ❤️ using Next.js 16, React 19, and TypeScript

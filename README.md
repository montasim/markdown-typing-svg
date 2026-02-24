# ⌨️ Markdown Typing SVG

Create beautiful animated typing SVGs for your GitHub README, profiles, and more. This is a modern Next.js implementation of the popular Readme Typing SVG project.

![Markdown Typing SVG](https://github.com/username/markdown-typing-svg/blob/main/.github/example.svg?raw=true)

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

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/username/markdown-typing-svg.git
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

## 📖 Example Usage

### Basic Usage

```markdown
[![Typing SVG](https://your-domain.com/api/svg?lines=Hello+World;Welcome+to+My+Profile)](https://git.io/typing-svg)
```

### With Custom Options

```markdown
[![Typing SVG](https://your-domain.com/api/svg?lines=Full-stack+developer;Open+source+enthusiast&font=Fira+Code&color=36BCF7&center=true&width=380&height=50)](https://git.io/typing-svg)
```

### HTML Usage

```html
<a href="https://git.io/typing-svg">
  <img src="https://your-domain.com/api/svg?lines=Your+Text+Here" alt="Typing SVG" />
</a>
```

## ⚙️ Options

| Parameter | Description | Type | Default | Example |
|-----------|-------------|--------|---------|----------|
| `lines` | Text to display (separated by `;`) | string | - | `Hello;World;Welcome` |
| `font` | Font family from Google Fonts | string | `Fira Code` | `Roboto`, `Open Sans` |
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
│   ├── api/svg/           # API endpoint for SVG generation
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page with interactive editor
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── lib/                    # Core business logic
│   ├── fonts/              # Google Fonts integration
│   ├── svg/                # SVG generation engine
│   ├── validation/          # Input validation
│   └── utils/              # Utility functions
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── config/                  # Configuration files
└── public/                  # Static assets
```

### Key Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Zod** - Runtime type validation
- **Lucide React** - Beautiful icons

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
```

## 📦 Deployment

### Vercel (Recommended)

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

## 📞 Support

- 📧 Open an issue for bug reports or feature requests
- 💬 Join discussions for questions and ideas
- ⭐ Star the repository if you find it useful

---

Made with ❤️ using Next.js and TypeScript

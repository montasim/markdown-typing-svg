# Markdown Typing SVG

> Generate customizable animated typing SVGs for GitHub profiles, README files, and websites.

[![Live generator](https://img.shields.io/badge/Live-Netlify-00C7B7?logo=netlify&logoColor=white)](https://markdown-typing-svg.netlify.app)
[![Support on SupportKori](https://img.shields.io/badge/Support-SupportKori-00B8B5)](https://www.supportkori.com/montasim)

Markdown Typing SVG provides a visual editor and a cacheable `/api/svg` endpoint. Compose multiple lines, adjust typography and animation, preview the result, then copy Markdown, HTML, or a direct image URL.

**[Open the generator](https://markdown-typing-svg.netlify.app) · [Try the SVG endpoint](https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+from+Markdown+Typing+SVG) · [Report an issue](https://github.com/montasim/markdown-typing-svg/issues)**

![Generated typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Build+something+useful;Document+it+clearly&color=36BCF7&size=22&width=500)

> **Project status:** The Netlify generator and SVG endpoint are reachable. The repository has no automated tests, CI workflow, rate-limit documentation, or license file.

## What you can create

- Multiple animated text lines with configurable separators
- Typing, fade, slide, bounce, and wave animation modes
- Google-font name, weight, size, color, alignment, width, and height controls
- Gradient, cursor, border-radius, letter-spacing, shadow, and easing options
- Repeating, random, multiline, and reverse-typing behavior
- Markdown, HTML, and direct-URL embed snippets
- SVG download plus browser-rendered PNG and JPG export
- Shareable editor state in the query string
- Local presets, templates, platform snippets, undo/redo, and JSON import/export

## Fastest path

1. Open the [live generator](https://markdown-typing-svg.netlify.app).
2. Edit the text lines.
3. Adjust typography, colors, effects, and animation.
4. Copy the generated Markdown or direct URL.
5. Paste it into a GitHub profile or repository README.

## Embed directly

```markdown
![Typing SVG](https://markdown-typing-svg.netlify.app/api/svg?lines=Hello+world;Shipping+useful+software&color=36BCF7&size=22&width=500)
```

The `lines` query parameter is required. Separate multiple lines with `;` by default and URL-encode user-controlled text.

## API

`GET /api/svg` returns `image/svg+xml` and caches successful responses for 24 hours. Missing `lines` redirects to the editor; invalid options return an error SVG with HTTP 422.

Common parameters:

| Parameter | Purpose | Default |
| --- | --- | --- |
| `lines` | Required text; multiple entries use `separator` | — |
| `font`, `weight`, `size` | Typography | Fira Code, 400, 20 |
| `color`, `background` | Hex colors without `#` | `36BCF7`, transparent |
| `width`, `height` | Positive SVG dimensions | 435 × 50 |
| `duration`, `pause` | Animation and between-line timing in ms | 5000, 1000 |
| `animationType` | `typing`, `fade`, `slide`, `bounce`, or `wave` | `typing` |
| `repeat`, `random`, `multiline` | Sequence behavior | true, false, false |
| `center`, `vCenter` | Horizontal and vertical centering | false |
| `gradient`, `gradientFrom`, `gradientTo` | Gradient text | disabled |
| `cursor`, `cursorColor`, `cursorStyle` | Cursor behavior | disabled |
| `separator` | Line delimiter | `;` |

The editor exposes additional validated parameters for easing, reverse typing, character pauses, text shadow, border radius, and letter spacing. See [`types/options.ts`](types/options.ts) and [`lib/validation/schema.ts`](lib/validation/schema.ts) for the exact contract.

## Local development

### Prerequisites

- Node.js 20 or newer
- pnpm

```bash
git clone https://github.com/montasim/markdown-typing-svg.git
cd markdown-typing-svg
pnpm install
pnpm dev
```

Open <http://localhost:3000>. No environment variables or external database are required.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start development |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |

## How it works

```text
editor state ──► validated query parameters ──► /api/svg
                                               │
                                               ▼
                                      generated SVG response
                                               │
                              Markdown / HTML / URL / download
```

The editor serializes options into the URL. The route validates the merged values with Zod, generates the SVG server-side, and returns explicit content and cache headers. Saved presets remain in browser storage.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/(home)/` | Visual editor |
| `app/api/svg/route.ts` | SVG HTTP endpoint |
| `lib/svg/` | SVG and animation generation |
| `lib/validation/schema.ts` | Query validation |
| `lib/utils/url.ts` | Query serialization and parsing |
| `config/` | Defaults, templates, presets, and site metadata |
| `types/options.ts` | Public option contract |

## Deployment and operations

The verified deployment is [markdown-typing-svg.netlify.app](https://markdown-typing-svg.netlify.app). Another deployment needs a Next.js-compatible host and `pnpm build`.

The service does not persist generated images. Embeds depend on the deployment remaining available, and the 24-hour cache means a URL may continue serving the same generated response during its cache lifetime.

## Limitations and security

- No explicit request rate limit or abuse-control layer is documented.
- Very large dimensions, many lines, or expensive font requests can increase server and client work.
- PNG/JPG export depends on browser canvas behavior and may not preserve animation.
- Remote README images expose the viewer's normal image request metadata to the hosting service.
- Generated text is escaped before insertion into the SVG, but consumers should still encode query input and review untrusted embed URLs.
- No automated tests or CI workflow currently protect the API contract.
- No dedicated security policy, contribution guide, or code of conduct is present.

## Documentation

- [Quick start](QUICK_START.md)
- [Feature comparison](FEATURE_COMPARISON.md)
- [Implementation summary](IMPLEMENTATION_SUMMARY.md)
- [SEO implementation](SEO_IMPLEMENTATION_SUMMARY.md)

## Contributing

Issues and focused pull requests are welcome. Run `pnpm lint` and `pnpm build` before submitting. Changes to query parsing, validation, or generation should add tests even though no test runner is currently configured.

## Support and security

Use [GitHub Issues](https://github.com/montasim/markdown-typing-svg/issues) for reproducible bugs. Do not include private text or credentials in a public issue.

No private vulnerability-reporting path is documented. Coordinate with the maintainer through the profile below before public disclosure.

## Funding

Support continued maintenance through [SupportKori](https://www.supportkori.com/montasim). Bug reports, templates, accessibility feedback, and code contributions are also useful.

## Author

Built and maintained by [Montasim](https://github.com/montasim).

## License status

No license file is included. Source visibility does not grant permission to copy, modify, or redistribute this project.

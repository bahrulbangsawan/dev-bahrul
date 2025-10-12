# Dev Bahrul - Developer Documentation

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)
[![Deployed on Cloudflare](https://img.shields.io/badge/Deployed%20on-Cloudflare-orange)](https://dev.bahrul.me)

My personal development documentation website - a curated collection of tutorials, guides, and technical references that I've compiled throughout my development journey.

## 🌐 Live Site

**Production:** [https://dev.bahrul.me](https://dev.bahrul.me)  
**Workers Dev:** [https://dev-bahrul.bisa-digital.workers.dev](https://dev-bahrul.bisa-digital.workers.dev)

## 📖 About This Project

This is my digital knowledge base where I document:

- **Tutorials**: Step-by-step guides on various technologies
- **Technical Explanations**: Deep dives into concepts and architectures
- **How-To Guides**: Quick reference materials for common tasks
- **Best Practices**: Patterns and conventions I follow

The site serves as both a learning tool and a quick reference for solutions I've documented.

## 🛠️ Tech Stack

### Framework & Tools
- **[Astro](https://astro.build)** - Static site generator with SSR support
- **[Starlight](https://starlight.astro.build)** - Documentation theme for Astro
- **[Bun](https://bun.sh)** - Fast JavaScript runtime and package manager
- **TypeScript** - Type-safe JavaScript

### Deployment & Hosting
- **[Cloudflare Workers](https://workers.cloudflare.com)** - Edge computing platform
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare CLI for deployment
- **Custom Domain:** [dev.bahrul.me](https://dev.bahrul.me)

### Features
- Server-Side Rendering (SSR)
- Full-text search powered by Pagefind
- Dark/light mode
- Mobile-responsive design
- Custom styling and branding

## 🚀 Project Structure

```
dev-bahrul/
├── src/
│   ├── content/
│   │   └── docs/              # Documentation pages
│   │       ├── index.mdx      # Homepage
│   │       ├── deployment/    # Deployment guides
│   │       │   └── astro-cloudflare.md
│   │       └── guides/        # Tutorial guides
│   │           └── github-cli-guide.md
│   └── styles/
│       └── custom.css         # Custom styling
├── public/                    # Static assets
├── dist/                      # Built files (generated)
├── astro.config.mjs           # Astro configuration
├── wrangler.jsonc             # Cloudflare Workers config
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## 💻 Development

### Prerequisites

- [Bun](https://bun.sh) (or Node.js v18+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (for deployment)
- Cloudflare account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/bahrulbangsawan/dev-bahrul.git
cd dev-bahrul

# Install dependencies
bun install
```

### Commands

All commands are run from the root of the project:

| Command | Action |
|---------|--------|
| `bun install` | Install dependencies |
| `bun run dev` | Start local dev server at `localhost:4321` |
| `bun run build` | Build production site to `./dist/` |
| `bun run preview` | Preview production build locally |
| `bun run deploy` | Build and deploy to Cloudflare Workers |

### Local Development

```bash
# Start development server
bun run dev

# Visit http://localhost:4321
```

## 🚢 Deployment

This site is deployed to Cloudflare Workers with automatic builds.

### Deploy to Cloudflare Workers

```bash
# Build and deploy in one command
bun run deploy
```

Or manually:

```bash
# 1. Build the site
bun run build

# 2. Create .assetsignore (if not exists)
echo "_worker.js" > dist/.assetsignore

# 3. Deploy to Cloudflare
npx wrangler deploy
```

### First Time Setup

1. **Login to Cloudflare:**
   ```bash
   npx wrangler login
   ```

2. **Configure Domain (optional):**
   - Add your custom domain in `wrangler.jsonc`
   - Set up DNS in Cloudflare Dashboard

3. **Deploy:**
   ```bash
   bun run deploy
   ```

For detailed deployment instructions, see [Astro Cloudflare Deployment Guide](https://dev.bahrul.me/deployment/astro-cloudflare/).

## 📝 Adding Content

### Create a New Page

1. Create a Markdown/MDX file in `src/content/docs/`:
   ```bash
   # Example: Create a new guide
   touch src/content/docs/guides/my-new-guide.md
   ```

2. Add frontmatter:
   ```markdown
   ---
   title: My New Guide
   description: A brief description of the guide
   ---

   # My New Guide

   Your content here...
   ```

3. The page will automatically appear in the navigation!

### Directory Structure for Content

- `src/content/docs/` - Root pages
- `src/content/docs/guides/` - Tutorial guides
- `src/content/docs/deployment/` - Deployment guides
- `src/content/docs/reference/` - Reference documentation

## 🎨 Customization

### Custom Styling

Custom styles are in `src/styles/custom.css`. This includes:
- Custom header with tagline
- Typography adjustments
- Color scheme modifications

### Site Configuration

Edit `astro.config.mjs` to customize:
- Site title and description
- Social links
- Sidebar navigation
- Theme settings

## 📚 Documentation Content

Current documentation includes:

- **Deployment Guides**
  - [Astro Cloudflare Deployment](https://dev.bahrul.me/deployment/astro-cloudflare/) - Complete guide to deploy Astro to Cloudflare Workers

- **Guides**
  - [GitHub CLI Guide](https://dev.bahrul.me/guides/github-cli-guide/) - Complete GitHub and Git CLI tutorial

More content is continuously being added!

## 🔗 Links

- **Live Site:** [dev.bahrul.me](https://dev.bahrul.me)
- **Repository:** [github.com/bahrulbangsawan/dev-bahrul](https://github.com/bahrulbangsawan/dev-bahrul)
- **Astro Docs:** [docs.astro.build](https://docs.astro.build)
- **Starlight Docs:** [starlight.astro.build](https://starlight.astro.build)
- **Cloudflare Workers:** [workers.cloudflare.com](https://workers.cloudflare.com)

## 📄 License

This project is open source and available for reference. Feel free to use it as inspiration for your own documentation site!

## 👨‍💻 Author

**Bahrul Bangsawan**

- GitHub: [@bahrulbangsawan](https://github.com/bahrulbangsawan)
- Website: [dev.bahrul.me](https://dev.bahrul.me)

---

Built with ❤️ using Astro, Starlight, and Cloudflare Workers

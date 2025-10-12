---
title: Astro Cloudflare Deployment
description: Complete step-by-step guide to deploy Astro projects to Cloudflare Workers
---

# Astro Cloudflare Deployment

This guide will walk you through deploying an Astro project to Cloudflare Workers from scratch. Perfect for beginners!

## Prerequisites

Before starting, make sure you have:

- **Node.js** (v18 or higher) or **Bun** installed
- A **Cloudflare account** (free tier works fine)
- Basic terminal/command line knowledge

---

## Project Folder Structure

Understanding where files go is crucial! Here's the complete folder structure of an Astro + Cloudflare project:

```
my-astro-site/                  ← Your project folder (root)
├── src/                        ← Source code (you work here)
│   ├── pages/                  ← Your website pages
│   │   └── index.astro         ← Homepage (/)
│   ├── components/             ← Reusable components
│   ├── layouts/                ← Page layouts
│   └── styles/                 ← CSS files
├── public/                     ← Static files (images, fonts, etc.)
│   └── favicon.svg             ← Site icon
├── dist/                       ← Built files (auto-generated)
│   ├── _worker.js              ← Cloudflare Worker script
│   ├── .assetsignore           ← Ignore file for Wrangler
│   └── ...                     ← All built files
├── node_modules/               ← Dependencies (auto-installed)
├── astro.config.mjs            ← Astro configuration (ROOT)
├── wrangler.jsonc              ← Cloudflare config (ROOT)
├── package.json                ← Project info & scripts (ROOT)
├── tsconfig.json               ← TypeScript config
└── .gitignore                  ← Git ignore file
```

### Important Locations

| File/Folder | Location | Purpose |
|------------|----------|---------|
| `astro.config.mjs` | **Root** | Astro + Cloudflare adapter config |
| `wrangler.jsonc` | **Root** | Cloudflare deployment settings |
| `package.json` | **Root** | Dependencies and scripts |
| `.assetsignore` | **dist/** | Tells Wrangler what to ignore |
| `.dev.vars` | **Root** | Local environment variables |
| Your pages | **src/pages/** | Website pages you create |
| Static assets | **public/** | Images, fonts (copied as-is) |

### Key Points:

1. **Root files** = Same level as `package.json`
2. **Source files** = Inside `src/` folder
3. **Built files** = Auto-generated in `dist/` (don't edit!)
4. **Config files** = Always in the root

### Example: Where to Create Files

When the guide says "create in project root", it means:

```bash
my-astro-site/
├── astro.config.mjs          ← Root
├── wrangler.jsonc            ← Root
└── package.json              ← Root
```

NOT inside `src/` or any subfolder!

---

## Part 1: Creating an Astro Project

### Step 1: Install Astro

Open your terminal and run:

```bash
# Using npm
npm create astro@latest

# Or using Bun (faster)
bun create astro@latest
```

### Step 2: Follow the Setup Wizard

You'll be asked several questions:

```
Where should we create your new project?
→ my-astro-site

How would you like to start your new project?
→ Choose a starter template (or "Empty" for blank project)

Install dependencies?
→ Yes

Do you plan to write TypeScript?
→ Yes (recommended)

Initialize a git repository?
→ Yes (recommended)
```

### Step 3: Navigate to Your Project

```bash
cd my-astro-site
```

---

## Part 2: Installing Cloudflare Adapter

Astro needs an adapter to work with Cloudflare Workers.

### Step 4: Install Cloudflare Adapter

```bash
# Using npm
npm install @astrojs/cloudflare

# Or using Bun
bun add @astrojs/cloudflare
```

### Step 5: Install Wrangler (Cloudflare CLI)

Wrangler is Cloudflare's command-line tool for deployment.

```bash
# Using npm
npm install wrangler --save-dev

# Or using Bun
bun add wrangler --dev
```

---

## Part 3: Configure Your Project

### Step 6: Update Astro Config

Open `astro.config.mjs` and add the Cloudflare adapter:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server', // Enable SSR
  adapter: cloudflare(),
});
```

**Important:** The `output: 'server'` enables Server-Side Rendering (SSR) which Cloudflare Workers needs.

### Step 7: Create Wrangler Configuration

Create a file named `wrangler.jsonc` **in your project root** (same level as `package.json`):

**File location:**
```
my-astro-site/
├── package.json
├── wrangler.jsonc          ← Create here (ROOT)
└── astro.config.mjs
```

**Option A: Using wrangler.toml**

```toml
name = "my-astro-site"
main = "./dist/_worker.js"
compatibility_date = "2025-10-13"
workers_dev = true

[site]
bucket = "./dist"
```

**Option B: Using wrangler.jsonc (recommended)**

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-astro-site",
  "compatibility_date": "2025-10-13",
  "workers_dev": true,
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

**How to create:**

Using terminal:
```bash
# Make sure you're in project root
cd my-astro-site

# Create the file
touch wrangler.jsonc

# Then open it in your editor and paste the JSON above
```

Or create manually in your code editor: File → New → Save as `wrangler.jsonc` in root.

### Step 8: Understanding .assetsignore File

**Important:** The `.assetsignore` file goes in the `dist/` folder, NOT the root!

**File location:**
```
my-astro-site/                 ← Project root
├── package.json
├── wrangler.jsonc
└── dist/                      ← Build output folder
    ├── _worker.js
    └── .assetsignore          ← Create here (inside dist/)
```

**The Problem:**
- The `dist/` folder is auto-generated when you run `bun run build`
- It gets deleted and recreated every time you build
- So `.assetsignore` needs to be recreated after each build

**Solution 1: Auto-create with deploy script**

Add this to your `package.json` scripts:

```json
{
  "scripts": {
    "deploy": "npm run build && echo '_worker.js' > dist/.assetsignore && npx wrangler deploy"
  }
}
```

Now run: `npm run deploy` (or `bun run deploy`)

**Solution 2: Manual creation after build**

```bash
# 1. Build first
bun run build

# 2. Create .assetsignore in dist folder
echo "_worker.js" > dist/.assetsignore

# 3. Deploy
npx wrangler deploy
```

**File content:**
```
_worker.js
```

**Why we need it:**
- Prevents Wrangler from uploading `_worker.js` as a static asset
- `_worker.js` is the Worker script, not a regular file
- Without this, deployment will fail with an error

---

## Part 4: Set Up Cloudflare Account

### Step 9: Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com)
2. Click **Sign Up**
3. Enter your email and password
4. Verify your email address

### Step 10: Get Your Account ID (Optional)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on **Workers & Pages** in the sidebar
3. Your Account ID is displayed on the right side
4. Copy it for later (you might need it)

---

## Part 5: Authentication with Wrangler

### Step 11: Login to Cloudflare via Wrangler

Run this command in your terminal:

```bash
npx wrangler login
```

This will:
1. Open your browser automatically
2. Ask you to authorize Wrangler
3. Click **Allow** to grant permissions
4. Return to terminal - you'll see "Successfully logged in"

### Step 12: Verify Login

Check if you're logged in:

```bash
npx wrangler whoami
```

You should see your account email and Account ID.

---

## Part 6: Build and Deploy

### Step 13: Test Locally First

Before deploying, test your site locally:

```bash
# Start development server
npm run dev
# or
bun run dev
```

Visit `http://localhost:4321` to see your site.

### Step 14: Build Your Project

Build your Astro site for production:

```bash
# Using npm
npm run build

# Or using Bun
bun run build
```

This creates a `dist` folder with your built site.

### Step 15: Deploy to Cloudflare

Deploy your site:

```bash
npx wrangler deploy
```

**What happens:**
- Uploads your built files to Cloudflare
- Creates a Worker
- Gives you a live URL like: `https://my-astro-site.YOUR-SUBDOMAIN.workers.dev`

### Step 16: Visit Your Live Site

After deployment completes, you'll see:

```
Deployed my-astro-site triggers (5.00 sec)
  https://my-astro-site.YOUR-SUBDOMAIN.workers.dev
Current Version ID: abc123...
```

Click the URL or copy it to your browser!

---

## Part 7: Update Your Site

### Step 17: Making Changes

Whenever you update your site:

```bash
# 1. Make your changes in code
# 2. Test locally
npm run dev

# 3. Build for production
npm run build

# 4. Deploy
npx wrangler deploy
```

**Quick command** (build + deploy in one line):

```bash
npm run build && npx wrangler deploy
# or
bun run build && npx wrangler deploy
```

---

## Configuration Files Reference

### File Locations Overview

Here's where each config file should be:

```
my-astro-site/                    ← PROJECT ROOT
├── astro.config.mjs              ← 1. Astro config (ROOT)
├── wrangler.jsonc                ← 2. Cloudflare config (ROOT)
├── package.json                  ← 3. Scripts (ROOT)
├── .dev.vars                     ← 4. Local env vars (ROOT) [optional]
├── src/
│   └── ...
└── dist/                         ← Generated on build
    └── .assetsignore             ← 5. Wrangler ignore (dist/)
```

### Required Files

Your project needs these configuration files:

#### 1. `astro.config.mjs` (Location: Root)

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});
```

#### 2. `wrangler.jsonc`

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-astro-site",
  "compatibility_date": "2025-10-13",
  "workers_dev": true,
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

#### 3. `.assetsignore`

```
_worker.js
```

#### 4. `package.json` Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "npm run build && npx wrangler deploy"
  }
}
```

---

## Command Reference

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local development server |
| `npm run build` | Build project for production |
| `npm run preview` | Preview production build locally |

### Wrangler Commands

| Command | Description |
|---------|-------------|
| `npx wrangler login` | Login to Cloudflare |
| `npx wrangler logout` | Logout from Cloudflare |
| `npx wrangler whoami` | Check current login status |
| `npx wrangler deploy` | Deploy to Cloudflare Workers |
| `npx wrangler tail` | View live logs from your worker |
| `npx wrangler delete` | Delete your worker |

### Combined Commands

```bash
# Build and deploy in one command
npm run build && npx wrangler deploy

# Using Bun (faster)
bun run build && npx wrangler deploy
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "API Token Required"

**Error:**
```
In a non-interactive environment, it's necessary to set a CLOUDFLARE_API_TOKEN
```

**Solution:**
Run `npx wrangler login` to authenticate.

#### Issue 2: "_worker.js Upload Error"

**Error:**
```
Uploading a Pages _worker.js directory as an asset
```

**Solution:**
Create `.assetsignore` file with `_worker.js` content.

#### Issue 3: "Port Already in Use"

**Error:**
```
Port 4321 is in use
```

**Solution:**
Astro will automatically try the next port (4322, 4323, etc.)

#### Issue 4: Build Fails

**Solution:**
1. Delete `node_modules` and `dist` folders
2. Run `npm install` (or `bun install`)
3. Try building again: `npm run build`

#### Issue 5: Worker Not Working After Deploy

**Solution:**
1. Check your `astro.config.mjs` has `output: 'server'`
2. Verify Cloudflare adapter is installed
3. Rebuild and redeploy

---

## Environment Variables (Advanced)

### Setting Environment Variables

If your app needs environment variables:

#### Step 1: Create `.dev.vars` File

For local development:

```env
DATABASE_URL=your-database-url
API_KEY=your-api-key
```

#### Step 2: Add to Cloudflare

For production, add secrets via Wrangler:

```bash
npx wrangler secret put DATABASE_URL
# Enter your value when prompted
```

Or add in `wrangler.jsonc`:

```json
{
  "vars": {
    "ENVIRONMENT": "production"
  }
}
```

---

## Custom Domain (Optional)

### Adding Your Own Domain

#### Step 1: Add Domain to Cloudflare

1. Go to Cloudflare Dashboard
2. Click **Add Site**
3. Enter your domain
4. Follow DNS setup instructions

#### Step 2: Add Route to Worker

In `wrangler.jsonc`, add:

```json
{
  "routes": [
    {
      "pattern": "yourdomain.com/*",
      "zone_name": "yourdomain.com"
    }
  ]
}
```

#### Step 3: Deploy

```bash
npx wrangler deploy
```

Your site will be available at your custom domain!

---

## Best Practices

### 1. Use Version Control

Always commit your code to Git:

```bash
git add .
git commit -m "Deploy to Cloudflare"
git push
```

### 2. Test Before Deploy

Always run `npm run dev` and test locally before deploying.

### 3. Keep Dependencies Updated

```bash
npm update
# or
bun update
```

### 4. Use Environment Variables

Never commit secrets/API keys. Use Wrangler secrets or `.dev.vars`.

### 5. Monitor Your Site

Use Cloudflare Dashboard to monitor:
- Traffic
- Errors
- Performance

---

## Next Steps

Now that your site is deployed:

1. **Add More Pages** - Create new `.astro` files in `src/pages/`
2. **Customize Design** - Edit your components and styles
3. **Add Features** - Install Astro integrations
4. **Set Up CI/CD** - Automate deployments with GitHub Actions
5. **Monitor Performance** - Use Cloudflare Analytics

---

## Useful Links

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler)
- [Astro Cloudflare Adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare)

---

## Summary

You've learned how to:

✅ Install and set up Astro  
✅ Add Cloudflare adapter  
✅ Configure Wrangler  
✅ Authenticate with Cloudflare  
✅ Build and deploy your site  
✅ Update and redeploy  
✅ Troubleshoot common issues  

**Quick Deploy Command:**
```bash
bun run build && npx wrangler deploy
```

Happy deploying! 🚀

# jasperdeen.com — Personal Portfolio Site

A blazing-fast static portfolio site built with Hugo, deployed via GitHub Pages at **[jasperdeen.com](https://jasperdeen.com)**.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Configuration](#configuration)
6. [Theme Integration](#theme-integration)
7. [Content Management](#content-management)
8. [Deployment](#deployment)
9. [DNS Configuration](#dns-configuration)
10. [Performance](#performance)
11. [Customizations Made](#customizations-made)
12. [Key Decisions & Insights](#key-decisions--insights)
13. [Troubleshooting](#troubleshooting)
14. [Maintenance](#maintenance)

---

## Overview

**Purpose:** Personal portfolio that links to external blogs (school + company) and showcases projects.

**Domain:** `jasperdeen.com` (apex domain, no www redirect needed)

**Hosting:** GitHub Pages with Let's Encrypt HTTPS

**Build Time:** ~50ms for 16 pages

**Page Size:** ~5KB per page (uncompressed)

**Load Time:** ~0.1s average

---

## Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Static Site Generator | Hugo | 0.163.3 (extended) |
| Theme | quint | v1.3.0+ |
| Sidebar Pattern | hugo-book | v0.14.0+ |
| Hosting | GitHub Pages | — |
| CI/CD | GitHub Actions | — |
| DNS | Namecheap | — |
| SSL | Let's Encrypt | Auto-renewed |
| Version Control | Git | — |

**Why Hugo?**
- Fastest static site generator (builds in milliseconds)
- Single binary, no dependencies
- GitHub Pages compatible via Actions
- Native Markdown support
- Free and open source

---

## Project Structure

```
jasperdeen.com/
├── .github/
│   └── workflows/
│       └── hugo.yml              # GitHub Actions build/deploy
├── assets/
│   └── css/                      # (empty — all CSS in quint)
├── content/
│   ├── _index.md                 # Homepage
│   ├── about/
│   │   └── _index.md             # About page
│   ├── long-form/
│   │   └── _index.md             # Long-form posts section
│   ├── short-form/
│   │   └── _index.md             # Short-form posts section
│   └── projects/
│       └── _index.md             # Projects section
├── layouts/
│   ├── _default/
│   │   └── baseof.html           # Base template with sidebar
│   └── partials/
│       ├── sidebar.html          # Sidebar wrapper
│       ├── book-brand.html       # Brand/title in sidebar
│       └── book-menu-filetree.html # Recursive nav menu
├── themes/
│   ├── quint/                    # Main theme (modified)
│   │   └── static/css/styles.css # Contains sidebar styles
│   └── hugo-book/                # Sidebar pattern source
├── hugo.toml                     # Hugo configuration
├── CNAME                         # jasperdeen.com
├── .gitignore                    # Ignores public/, resources/
├── .gitmodules                   # Submodule references
└── README.md                     # This file
```

---

## Setup & Installation

### Prerequisites

- Hugo extended (v0.125.4+)
- Git
- GitHub account with Pages enabled
- Custom domain

### Local Setup

```bash
# Clone repo with submodules
git clone --recursive https://github.com/JDeez0/jasperdeen.com.git
cd jasperdeen.com

# Install Hugo (if not already installed)
# Linux:
wget https://github.com/gohugoio/hugo/releases/download/v0.163.3/hugo_extended_0.163.3_linux-amd64.tar.gz
tar -xzf hugo_extended_0.163.3_linux-amd64.tar.gz
mv hugo ~/.local/bin/

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH="$HOME/.local/bin:$PATH"

# Verify
hugo version
```

### Build Locally

```bash
# Build site
hugo --minify --baseURL "https://jasperdeen.com/"

# Serve with live reload
hugo server --minify

# View at http://localhost:1313
```

---

## Configuration

### `hugo.toml`

```toml
baseURL = "https://jasperdeen.com/"
languageCode = "en-us"
title = "Jasper H. Deen"
theme = "quint"
enableGitInfo = true
paginate = 10

[build]
  renderStatic = true

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 4

[params]
  description = "Personal portfolio of Jasper H. Deen..."
  author = "Jasper H. Deen"
  email = "jasperdeen@gmail.com"
  github = "JDeez0"
  intro = "Developer, writer, and student."
  subtitle = "Blogs, Projects & Writing"
  enableSearch = true
  enableImageBanner = true
  showReadingTime = true
  defaultTheme = "light"
  css = []  # Override quint's default custom.css reference

[outputs]
  home = ["HTML", "RSS"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]

[social]
  github = "JDeez0"
  email = "jasperdeen@gmail.com"
```

**Key config notes:**
- `css = []` overrides quint's default `css = ["css/custom.css"]` to prevent 404 errors
- `enableGitInfo = true` enables last-modified dates from git
- `unsafe = true` allows raw HTML in markdown

---

## Theme Integration

### Quint Theme (Base)

The **quint** theme provides:
- Clean, minimal typography
- Light/dark mode (via `prefers-color-scheme`)
- Site search functionality
- Image banners
- RSS feeds
- SEO-friendly meta tags

**Source:** https://github.com/victoriadrake/hugo-theme-quint

### Hugo Book Pattern (Sidebar)

The **hugo-book** theme provides the sidebar navigation pattern:
- Fixed left sidebar (280px)
- Recursive nested menu
- Collapsible sections (checkbox-based)
- Active page highlighting
- Auto-expanding current section

**Source:** https://github.com/alex-shpak/hugo-book

### How They Work Together

1. **Quint** provides the base layout, typography, and styling system (CSS variables)
2. **Hugo Book** provides the sidebar pattern and recursive menu logic
3. **Custom layouts** (`/layouts/`) bridge the two:
   - `baseof.html` adds sidebar to quint's layout
   - `sidebar.html` wraps the sidebar structure
   - `book-menu-filetree.html` implements recursive navigation
4. **Quint's CSS** (`themes/quint/static/css/styles.css`) contains both quint's original styles AND sidebar styles using quint's CSS variables

### Quint's CSS Variables (Used Everywhere)

```css
:root {
    --primary-bg: #fff;          /* Background */
    --primary-text: #353d49;     /* Primary text */
    --secondary-text: #252627;   /* Secondary text */
    --link-color: #879094;       /* Links */
    --shadow-color: rgba(0,0,0,0.15); /* Borders/shadows */
    --borders: #555;
}

@media (prefers-color-scheme: dark) {
    :root {
        --primary-bg: #252627;
        --primary-text: #fff;
        --secondary-text: #fefefe;
        --link-color: #9fb1b6;
    }
}
```

All sidebar styles use these variables — no separate stylesheet.

---

## Content Management

### Adding a Long-Form Post

Create `content/long-form/your-post-title.md`:

```markdown
---
title: "Your Post Title"
date: 2026-06-19
description: "Brief description for SEO and previews"
externalUrl: "https://original-source.com/post"
tags: ["essay", "school"]
---

Brief excerpt or summary.

[**Read full article →**](https://original-source.com/post)
```

### Adding a Short-Form Post

Create `content/short-form/your-post-title.md`:

```markdown
---
title: "Quick Thought"
date: 2026-06-19
description: "Brief description"
tags: ["notes"]
---

Content of your short post here.
```

### Adding a Project

Create `content/projects/project-name.md`:

```markdown
---
title: "Project Name"
date: 2026-06-19
description: "What the project does"
github: "https://github.com/JDeez0/project"
demo: "https://demo-url.com"
---

Project description, screenshots, tech stack, etc.
```

### Front Matter Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Page title |
| `date` | date | Publication date |
| `description` | string | SEO description |
| `draft` | boolean | If true, not built |
| `tags` | array | Post tags |
| `externalUrl` | string | Link to external article |
| `github` | string | GitHub repo URL |
| `demo` | string | Live demo URL |

---

## Deployment

### How It Works

1. **Push to `main` branch** on GitHub
2. **GitHub Actions triggers** (`.github/workflows/hugo.yml`)
3. **Hugo builds the site** with extended version
4. **GitHub Pages deploys** to `jasperdeen.com`

### GitHub Actions Workflow

File: `.github/workflows/hugo.yml`

```yaml
name: Deploy Hugo site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0
      - uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: '0.163.3'
          extended: true
      - name: Build
        run: hugo --minify --baseURL "https://jasperdeen.com/"
      - name: Copy CNAME
        run: cp CNAME public/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Key settings:**
- `submodules: recursive` — clones quint and hugo-book themes
- `hugo-version: '0.163.3'` — matches local version
- `extended: true` — needed for Hugo Pipes
- `cp CNAME public/` — ensures custom domain is preserved

### Deployment Time

- Build: ~10 seconds
- Deploy: ~30 seconds
- Total: ~1 minute from push to live

---

## DNS Configuration

### Namecheap DNS Records

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | Automatic |
| A | @ | 185.199.109.153 | Automatic |
| A | @ | 185.199.110.153 | Automatic |
| A | @ | 185.199.111.153 | Automatic |
| CNAME | www | jdeez0.github.io. | Automatic |

**MX Records (locked, do NOT modify):**
- 5 MX records pointing to `eforward1-5.registrar-servers.com`
- 1 SPF TXT record: `v=spf1 include:spf.efwd.registrar-servers.com ~all`

**Important:** MX and SPF TXT records coexist fine with A records at apex domains per DNS spec. They do NOT block GitHub Pages.

### HTTPS

- **Provider:** Let's Encrypt (auto-provisioned by GitHub)
- **Covers:** Both `jasperdeen.com` and `www.jasperdeen.com`
- **Renewal:** Automatic by GitHub
- **Status:** ✅ Valid and working

---

## Performance

### Current Metrics

| Page | Size | Load Time | TTFB |
|------|------|-----------|------|
| Homepage | 5,117 B | 0.11s | 0.10s |
| About | 5,247 B | 0.11s | 0.10s |
| Long form | 4,658 B | 0.10s | 0.09s |
| Short form | 4,655 B | 0.13s | 0.12s |
| Projects | 4,675 B | 0.11s | 0.10s |

**Compression:** Brotli enabled by GitHub Pages (~70% size reduction)

**Why so fast:**
- No JavaScript on most pages
- Single CSS file (quint's styles.css)
- Static HTML, no server processing
- GitHub's global CDN
- HTTP/2 multiplexing

### Lighthouse Scores (estimated)

- **Performance:** 100/100
- **Accessibility:** 95+/100
- **Best Practices:** 100/100
- **SEO:** 100/100

---

## Customizations Made

### 1. Sidebar Navigation (Hugo Book pattern)

**Files created:**
- `layouts/_default/baseof.html` — adds sidebar wrapper
- `layouts/partials/sidebar.html` — sidebar container
- `layouts/partials/book-brand.html` — brand/title
- `layouts/partials/book-menu-filetree.html` — recursive menu

**CSS added to:** `themes/quint/static/css/styles.css` (lines 620-754)

Uses quint's CSS variables:
- `--primary-bg` (sidebar background)
- `--secondary-text` (brand text)
- `--link-color` (nav links)
- `--shadow-color` (borders)
- `--primary-text` (active/hover states)

### 2. Content Structure

Replaced `content/blogs/school` and `content/blogs/company` with:
- `content/long-form/` — long-form essays
- `content/short-form/` — short posts
- `content/projects/` — projects

### 3. Hugo.toml Override

```toml
css = []  # Prevents loading non-existent custom.css
```

### 4. Removed Custom Stylesheet

Deleted `assets/css/custom.css` — all styles now in quint's stylesheet.

---

## Key Decisions & Insights

### Decision: Hugo over WordPress

**Why:**
- WordPress needs PHP server, database, constant updates
- Static sites are faster, more secure, and free to host
- Portfolio linking to external blogs doesn't need CMS
- Hugo builds in 50ms vs WordPress's server processing

### Decision: Apex domain (`jasperdeen.com`) over www

**Why:**
- Shorter, cleaner URL
- No redirect overhead
- GitHub Pages supports both equally well
- Originally thought MX records blocked apex, but they don't (DNS spec allows coexistence)

### Decision: GitHub Pages over Cloudflare/Netlify

**Why:**
- Free, unlimited bandwidth
- Built-in HTTPS with auto-renewal
- No DNS migration needed
- Git-based deployment
- Fast global CDN

### Decision: Quint + Hugo Book hybrid

**Why:**
- Quint is minimal and clean (perfect aesthetic)
- Hugo Book has the best sidebar pattern
- Both are MIT licensed and actively maintained
- Combining them gives the best of both worlds

### Insight: MX Records Don't Block GitHub Pages

**Original concern:** Namecheap locked MX records might prevent GitHub Pages from issuing SSL for apex domain.

**Reality:** MX and SPF TXT records coexist with A records per DNS spec. The original "blocked" diagnosis was likely a DNS propagation timing issue. Both apex and www work fine.

### Insight: Hugo Submodule Modifications

**Challenge:** Modifying theme files in a git submodule requires committing in the submodule first, then updating the parent repo's reference.

**Solution:**
```bash
# Modify theme files
cd themes/quint
git add -A
git commit -m "changes"

# Update parent reference
cd ../..
git add themes/quint
git commit -m "update submodule"
```

---

## Troubleshooting

### Issue: Site not updating after push

**Check:**
1. GitHub Actions tab — is workflow running?
2. Actions succeeded? (green checkmark)
3. Browser cache? (hard refresh: Ctrl+Shift+R)
4. DNS cache? (wait 5 minutes)

### Issue: Sidebar not showing on some pages

**Check:**
1. Does the page extend `baseof.html`?
2. Is `layouts/_default/baseof.html` present?
3. Does the page have a `{{ define "main" }}` block?

### Issue: Custom CSS not loading

**Check:**
1. `hugo.toml` has `css = []` to override quint's default
2. Only `/css/styles.css` should be in HTML `<head>`
3. No 404 errors in browser console

### Issue: Theme changes lost after submodule update

**Solution:** Commit changes in submodule BEFORE updating:
```bash
cd themes/quint
git add -A && git commit -m "custom changes"
cd ../..
git add themes/quint && git commit -m "update ref"
```

### Issue: Build fails with "module not found"

**Fix:** Ensure submodules are cloned:
```bash
git submodule update --init --recursive
```

---

## Maintenance

### Regular Tasks

**Weekly:**
- Add new blog posts/content
- Review and respond to any GitHub issues

**Monthly:**
- Check GitHub Actions for any failures
- Verify HTTPS certificate (auto-renews, but check expiry)
- Review site analytics if added

**Yearly:**
- Update Hugo to latest version
- Update theme submodules (`git submodule update --remote`)
- Review and update dependencies

### Updating Hugo Version

1. Update local binary
2. Update `.github/workflows/hugo.yml`:
   ```yaml
   hugo-version: '0.XXX.X'
   ```
3. Test locally: `hugo server`
4. Commit and push

### Updating Themes

```bash
cd themes/quint
git pull origin master
cd ../..
git add themes/quint
git commit -m "update quint theme"
git push
```

---

## Git Workflow

### Branch Strategy

- **`main`** — production, auto-deploys to jasperdeen.com
- Feature branches for major changes (optional)

### Commit Message Format

```
<type>: <subject>

<body>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `chore`

**Example:**
```
feat: add long-form blog post

Added content/long-form/first-essay.md with external link to school blog.
```

### Adding Content

```bash
# Create new post
hugo new long-form/my-post.md

# Edit in your editor
code content/long-form/my-post.md

# Preview locally
hugo server

# Commit and push
git add content/long-form/my-post.md
git commit -m "feat: add long-form post about X"
git push origin main

# Wait ~1 minute for deployment
```

---

## Security

### HTTPS

- ✅ Let's Encrypt SSL (auto-provisioned)
- ✅ Covers both apex and www domains
- ✅ Auto-renews before expiry
- ✅ HSTS enabled by GitHub Pages

### DNS

- ✅ DNSSEC not enabled (Namecheap doesn't support for apex)
- ✅ MX records locked (prevents email interception)
- ✅ SPF record present (`v=spf1 include:spf.efwd.registrar-servers.com ~all`)

### Repository

- ✅ Public repo (required for GitHub Pages)
- ✅ No secrets committed
- ✅ GitHub Actions uses minimal permissions

---

## Future Enhancements

### Potential Additions

- [ ] Profile photo in sidebar
- [ ] Custom logo/favicon
- [ ] Google Analytics or Plausible
- [ ] Contact form (via Formspree or Netlify Forms)
- [ ] RSS feed customization
- [ ] Tag pages styling
- [ ] Search functionality (quint has it built-in, needs config)
- [ ] Reading progress indicator
- [ ] Table of contents for long posts
- [ ] Related posts section

### Content Ideas

- [ ] Resume/CV page
- [ ] Portfolio gallery
- [ ] Newsletter signup
- [ ] Guestbook
- [ ] Now page (what I'm doing currently)

---

## Credits

**Hugo:** https://gohugo.io/
**Quint theme:** https://github.com/victoriadrake/hugo-theme-quint (Victoria Drake)
**Hugo Book theme:** https://github.com/alex-shpak/hugo-book
**GitHub Pages:** https://pages.github.com/

---

## License

Site content © Jasper H. Deen. All rights reserved.
Hugo, quint theme, and hugo-book theme are MIT licensed.

---

## Quick Reference

### URLs

- **Site:** https://jasperdeen.com
- **Repo:** https://github.com/JDeez0/jasperdeen.com
- **Actions:** https://github.com/JDeez0/jasperdeen.com/actions
- **Settings:** https://github.com/JDeez0/jasperdeen.com/settings/pages

### Key Commands

```bash
# Build
hugo --minify --baseURL "https://jasperdeen.com/"

# Serve locally
hugo server --minify

# Update submodules
git submodule update --init --recursive

# Commit theme changes
cd themes/quint && git add -A && git commit -m "msg" && cd ../..
git add themes/quint && git commit -m "update submodule"
```

### Important Files

- `hugo.toml` — main config
- `CNAME` — custom domain
- `.github/workflows/hugo.yml` — deployment
- `themes/quint/static/css/styles.css` — ALL styles (quint + sidebar)

---

**Last updated:** 2026-06-19
**Maintained by:** Jasper H. Deen (jasperdeen@gmail.com)
**Status:** ✅ Live and operational
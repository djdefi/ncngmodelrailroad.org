# Development Guide

This guide walks you through setting up the site on your own computer so you can preview changes before they go live.

---

## Prerequisites

You need two things installed:

1. **Node.js** (version 18 or newer) — [Download here](https://nodejs.org/)
2. **Git** — [Download here](https://git-scm.com/)

To check if you have them:

```sh
node --version   # should print v18.x.x or higher
git --version    # should print git version 2.x.x
```

---

## Setup (first time only)

### 1. Clone the repository

```sh
git clone https://github.com/djdefi/ncngmodelrailroad.org.git
cd ncngmodelrailroad.org
```

### 2. Install dependencies

```sh
npm install
```

This downloads all the libraries the site needs. It creates a `node_modules/` folder (which is ignored by git — don't commit it).

---

## Day-to-day workflow

### Start the dev server

```sh
npm run dev
```

This starts a local server at **http://localhost:4321/ncngmodelrailroad.org/**. Open that URL in your browser.

The dev server **live-reloads** — when you save a file, the browser updates automatically. No need to restart.

### Build for production

```sh
npm run build
```

This generates the final static site into the `dist/` folder. This is what gets deployed to GitHub Pages.

### Preview the production build

```sh
npm run preview
```

Serves the `dist/` folder locally so you can verify the production build looks right.

---

## How the site is built

### Tech stack

| Technology | Role |
| :--------- | :--- |
| [Astro](https://astro.build/) | Static site generator — turns `.astro` files into HTML |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for styling |
| [astro-icon](https://github.com/natemoo-re/astro-icon) | Icon component using [Iconify Solar](https://icon-sets.iconify.design/solar/) set |
| GitHub Pages | Free static hosting, auto-deploys on push |

### Key concepts

**Pages** (`src/pages/`) — Each `.astro` file becomes a URL. `about.astro` → `/about`.

**Layouts** (`src/layouts/BaseLayout.astro`) — The shared wrapper around every page. Contains the header, navigation, footer, SEO meta tags, and structured data (schema.org).

**Components** (`src/components/`) — Reusable UI pieces like `Button.astro` and `SectionHeader.astro`.

**Config** (`src/config/`) — Centralized data imported across the site:
- `organization.ts` — Org name, address, contact info
- `navigation.ts` — Nav items shared by desktop and mobile menus

**Content** (`src/content/events/`) — Markdown files that Astro processes as a content collection. Each `.md` file has frontmatter (YAML between `---` lines) and body text.

**Styles** (`src/styles/global.css`) — Global CSS with Tailwind imports and custom theme:
- Colors: Primary `#8B0000`, Secondary `#8B4513`, Accent `#2E5A3A`, Gold `#B8860B`
- Fonts: Archivo Black (headings), Montserrat (body)
- Button classes: `.btn-primary`, `.btn-outline`

**Images** (`public/images/`) — Static files served as-is. No processing by Astro. Keep images optimized (800px wide, <200KB for gallery).

### Architecture diagram

```
Browser Request
       ↓
GitHub Pages (static files in dist/)
       ↓
Built by: npm run build
       ↓
Astro reads:
  ├── src/pages/*.astro        → HTML pages
  ├── src/layouts/BaseLayout   → wraps each page
  ├── src/components/*         → reusable UI
  ├── src/config/*             → org data, nav
  ├── src/content/events/*.md  → event pages
  ├── src/styles/global.css    → theme
  └── public/*                 → images, favicon (copied as-is)
```

---

## Deployment

The site deploys automatically via **GitHub Actions**:

1. You push a commit to the `main` branch
2. GitHub Actions runs `npm run build`
3. The `dist/` folder is published to GitHub Pages
4. Live at [ncngmodelrailroad.org](https://ncngmodelrailroad.org/) within ~2 minutes

You don't need to do anything special — just push to `main`.

### Custom Domain

The site uses a custom domain (`ncngmodelrailroad.org`) configured via the `CNAME` file in `public/` and the `site` field in `astro.config.mjs`. Since the site is at the root domain, no `base` path is needed — internal links and images use root-relative paths.

---

## Common tasks

### Add a new page

1. Create `src/pages/my-page.astro`
2. Wrap content in `<BaseLayout title="My Page">`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---

<BaseLayout title="My Page | N.C.N.G. Model Railroad">
  <section class="py-16">
    <div class="container">
      <h1 class="text-4xl font-bold">My New Page</h1>
      <p>Content here.</p>
    </div>
  </section>
</BaseLayout>
```

3. Add it to navigation in `src/config/navigation.ts` if needed

### Use an icon

Icons use the [Solar Bold](https://icon-sets.iconify.design/solar/) set:

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="solar:heart-bold" class="w-6 h-6" />
```

Browse available icons at [icon-sets.iconify.design/solar](https://icon-sets.iconify.design/solar/).

### Add a section with consistent styling

Use the `SectionHeader` component and standard section pattern:

```astro
<section class="py-16 bg-gray-50">
  <div class="container max-w-5xl">
    <SectionHeader eyebrow="Small Label" title="Section Title" />
    <!-- content -->
  </div>
</section>
```

---

## Troubleshooting

**`npm install` fails** — Make sure you have Node.js 18+. Run `node --version` to check.

**Dev server won't start** — Try deleting `node_modules/` and running `npm install` again.

**Images not showing** — Make sure the path starts with `` `${base}/images/` `` and the file exists in `public/images/`.

**Build fails** — Run `npm run build` and read the error. Most common: a typo in an import path or a missing closing tag.

**Changes not showing on live site** — Check that you pushed to `main` and that the GitHub Actions workflow completed successfully.

---

## Next steps

- [Editing Content](editing-content.md) — Quick reference for common content updates
- [Contributing](../CONTRIBUTING.md) — How to submit changes via pull requests

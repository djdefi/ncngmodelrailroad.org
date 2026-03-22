# N.C.N.G. Historical Model Railroad — Website

The official website for the **Nevada County Narrow Gauge Historical Model Railroad**, a 501(c)(3) nonprofit preserving the legacy of the N.C.N.G. Railroad (1876–1942) through a detailed On3 scale model railroad display at the Nevada County Fairgrounds in Grass Valley, California.

**Live site:** [djdefi.github.io/ncngmodelrailroad.org](https://djdefi.github.io/ncngmodelrailroad.org/)

---

## Quick Start

```sh
npm install        # install dependencies (first time only)
npm run dev        # start local dev server at localhost:4321
npm run build      # build for production
```

## Project Structure

```
src/
├── config/           # Centralized org data & navigation
│   ├── organization.ts   # Name, address, contact, social links
│   └── navigation.ts     # Shared nav items for header/mobile
├── content/
│   └── events/       # Event pages (Markdown files, one per event)
├── layouts/
│   └── BaseLayout.astro  # Shared header, footer, SEO, schema.org
├── components/       # Reusable UI pieces (Button, SectionHeader, etc.)
├── pages/            # Each .astro file = one page on the site
│   ├── index.astro       # Homepage
│   ├── about.astro       # History & mission
│   ├── trains.astro      # Engine roster & railroad history
│   ├── gallery.astro     # Photo gallery with lightbox
│   ├── events.astro      # Upcoming events (auto-generated from content/)
│   ├── board-members.astro # Board of directors
│   ├── donate.astro      # Donations (PayPal)
│   ├── volunteer.astro   # Volunteer signup
│   ├── contact.astro     # Contact form
│   ├── links.astro       # External resources
│   └── 404.astro         # Not found page
├── styles/
│   └── global.css    # Tailwind + custom theme (colors, buttons, etc.)
public/
├── images/           # All photos (gallery, board, heroes, etc.)
└── favicon.svg       # Site icon
```

## Documentation

New here? Start with the guide that matches your comfort level:

| Guide | Who it's for |
| :---- | :----------- |
| [Getting Started](docs/getting-started.md) | Board members & anyone who just wants to understand the site |
| [Editing Content](docs/editing-content.md) | Anyone who needs to update events, photos, or board info |
| [Development Guide](docs/development.md) | Developers who want to run the site locally and make changes |
| [Contributing](CONTRIBUTING.md) | Anyone submitting changes via GitHub |

## Tech Stack

- **[Astro](https://astro.build/)** — Static site generator (zero JS shipped by default)
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Iconify Solar](https://icon-sets.iconify.design/solar/)** — Icon set via `astro-icon`
- **Deployed to** GitHub Pages (auto-deploys on push to `main`)

## License

Content and images are property of the N.C.N.G. Historical Model Railroad organization.

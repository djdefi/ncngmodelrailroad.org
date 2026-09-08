# Design system

The site has a small, consistent design system built on Tailwind v4 and a set of
CSS custom properties. This document is the written reference. The live,
rendered reference is the **[`/styleguide`](https://ncngmodelrailroad.org/styleguide)**
page (noindex, not linked from the site), which shows every token and component
as it renders in production.

## Where things live

- **Tokens and base styles:** [`src/styles/global.css`](../src/styles/global.css). This is the source of truth.
- **Components:** [`src/components/`](../src/components) (`Button`, `SectionHeader`, `PhotoCard`).
- **Live reference:** [`src/pages/styleguide.astro`](../src/pages/styleguide.astro), served at `/styleguide`.

## Tokens

Tokens are defined in two layers, both in `global.css`:

1. **`@theme static` block** holds the brand colors and fonts. Tailwind v4 turns
   these into utilities (`bg-primary`, `text-secondary`, `font-display`) and
   emits them as `:root` custom properties. `static` guarantees every token is
   emitted even if no utility happens to use it. Define a brand color here once.
2. **`:root` block** adds the extended semantic tokens (surfaces, text, borders,
   accents, radii, shadows) that the custom CSS builds on.

Use a token, never a raw hex value, in components and pages.

### Color tokens

| Token | Light value | Use |
|---|---|---|
| `--color-primary` | `#8A1F17` | Brand red. Headings, buttons, links. |
| `--color-primary-dark` / `-light` | `#5E130F` / `#B9493E` | Gradients, hovers. |
| `--color-secondary` | `#8B5E34` | Warm earth tone. Dividers, soft borders. |
| `--color-bg` / `--color-bg-alt` | `#FCF8F1` / `#F3EADB` | Page and alternating section backgrounds. |
| `--color-surface` / `--color-surface-soft` | `#FFFDF9` / `#F8F1E7` | Card surfaces. |
| `--color-text` / `--color-text-muted` | `#211A17` / `#6F6259` | Body and secondary text. |
| `--color-border` | `#DFCFBB` | Hairline borders. |
| `--color-accent` | `#2F5D46` | Green accent. |
| `--color-gold` | `#B9821B` | Gold accent. |
| `--color-kicker-text` | `#FCD34D` | Hero kicker label. |

Each color has a matching `*-rgb` triplet (for `rgba()`) and a dark-mode value.

### System tokens

| Token | Value | Use |
|---|---|---|
| `--radius-card` | `1.25rem` | Cards and surfaces. |
| `--radius-pill` | `999px` | Buttons, eyebrows, nav links. |
| `--shadow-card` / `--shadow-soft` | layered | Resting and raised elevation. |
| `--tracking-eyebrow` / `--tracking-kicker` | `0.12em` / `0.25em` | Label letter-spacing. |
| `--focus-ring` | ring | Keyboard focus outline. |
| `--font-display` / `--font-body` | Archivo Black / Libre Franklin Variable | Headings / body. |

## Modes

Color modes follow the operating system. There is no manual theme toggle.

- **Dark mode** (`prefers-color-scheme: dark`) overrides the `:root` tokens.
  Because much of the site uses Tailwind color utilities, `global.css` also
  remaps a set of them in dark mode (for example `.bg-white` becomes
  `--color-bg`, `.text-gray-600` becomes `--color-text-muted`). Keep that in
  mind: **the header is not always white**, so check both modes after a change.
- **High contrast** (`prefers-contrast: more`) raises text and border contrast. It is
  scoped per color scheme, so the light branch pushes text toward black and the
  dark branch pushes it toward white. Note the value is `more`; `prefers-contrast: high`
  is an early draft spelling that no browser matches.
- **Reduced motion** (`prefers-reduced-motion: reduce`) disables animation and
  the hero Ken Burns effect.

## Components

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant` (`primary` \| `outline` \| `outline-inverse` \| `white`), `size` (`sm` \| `md` \| `lg`), `href`, `type`, `external` | Renders an `<a>` when `href` is set, else a `<button>`. |
| `SectionHeader` | `title`, `eyebrow?`, `description?`, `as` (`h1` \| `h2` \| `h3`), `centered?` | Use `as="h1"` once per page for the page title. |
| `PhotoCard` | `src`, `alt`, `caption?`, `aspectRatio` (`video` \| `square` \| `4/3`), `overlay?` | Lazy-loads, lifts on hover, optional caption overlay. |

`BaseLayout` also takes a `noindex` prop to keep a page out of search and the
sitemap (used by `/styleguide`).

Use `outline` on page surfaces and `outline-inverse` on dark or photo backgrounds.
The inverse variant uses white text and borders, then dark text on a white hover
surface in both color schemes. Do not assemble it with competing color utilities.
Both outline variants share their CSS with the matching `.btn-*` classes.
`npm run a11y` checks their hover contrast in both color schemes, along with
short-screen menu access and long-link reflow.

## Utility and component classes

Defined in `global.css`, usable on any element:

- **Layout:** `.page-container`, `.section`, `.section-alt`, `.section-shell`.
- **Buttons:** `.btn-primary`, `.btn-outline`, `.btn-outline-inverse` (the `Button` component is preferred in markup).
- **Cards:** `.card` + `.card-body`, `.clean-card`, `.hover-lift`.
- **Labels:** `.eyebrow`, `.hero-kicker`, `.hero-label`, `.hero-copy`.
- **Nav:** `.nav-link`, `.nav-link-icon`.
- **Color helpers:** `.text-primary`, `.bg-primary`, `.text-secondary`, `.bg-secondary`, `.bg-cream`, `.bg-gold`, `.text-gold`.
- **Decorative:** `.track-divider`, `.grain-overlay`, `.hero-vignette`, `.animate-kenburns`.
- **Content:** `.prose` theming and styled `blockquote` for rich text (event bodies, Learn pages).
- **Accessibility:** `.sr-only`, and a `--focus-ring` applied on `:focus-visible`.

`.page-container` is the page width shell: 76rem max, centered, with a
`clamp(1rem, 4vw, 2rem)` gutter. It is named `page-container` rather than
`container` on purpose. Tailwind ships a `container` utility of its own with
breakpoint max-widths up to 96rem, so sharing the name means one silently
shadows the other. It also lives in `@layer components`, which sits before
`utilities`, so you can narrow a shell with `max-w-4xl` and have it take effect.
An unlayered rule would beat those utilities no matter what, which is how a
batch of `max-w-*` and `px-*` classes came to be dead on this site.

Do not use `container` as a class. Tailwind still emits that utility into the
built stylesheet, so an element carrying it picks up Tailwind's breakpoint
widths instead of this shell. The rules are harmless only because nothing in
the markup uses the class.

`.btn`, `.btn-primary`, `.btn-outline`, and `.btn-outline-inverse` live in `@layer components` for the
same reason. They set `display` and `padding`, so as unlayered rules they beat
any spacing utility placed next to them. Layering means `px-8` on a button now
does what it says. Any class that sets a property a component already sets
belongs in a layer, or it will silently win over the utility an author reaches
for.

## Conventions

- Keep the mobile navigation scrollable within the viewport, including short
  landscape screens. Long text in `.prose` wraps rather than widening the page.
- Navigation underlines the current destination without relying on color alone.
  Exact matches use `aria-current="page"`; nested Learn pages mark the parent
  link with `aria-current="location"`. More is underlined when a child is current.
- The homepage photo scrim is stronger on small screens so descriptive text
  remains readable over the locomotive's pale front.
- Gallery categories and captions stay visible below each image on every device.
  Only the zoom affordance uses hover enhancement.
- The historical map is also an entry point from the layout. Its initial view
  keeps Search, Tours & info, and the model railroad website link in a compact
  toolbar. The introduction, tour picker, and Layers panel start collapsed on
  every screen size. Starting a tour closes the guide; closing a tour returns
  focus to Tours & info.
  Feature popups sit above both basemaps, so the comparison divider never hides
  their text or actions.
  Map-specific styles and disclosure integration live in `src/pages/map/index.astro`
  alongside its markup; the shipped map bundle and its cache revisions stay intact.
- Reach for an existing token, component, or class before adding new CSS.
- Use tokens, not raw hex, so dark and high-contrast modes keep working.
- Add a brand color in the `@theme` block; add a semantic token in `:root`
  (and give it a dark-mode value in the dark `@media` block).
- Use one `SectionHeader` with `as="h1"` per page, and at most one eyebrow per page.
- Internal links and images are root-relative (the site is on a root custom domain).
- After any color or surface change, check the page in light **and** dark mode.

## The content editor is separate

The content editor worker (`worker/`, see `worker/README.md`) ships its own
small, self-contained CSS rather than this Tailwind setup, because it deploys
to Cloudflare Workers independently. It mirrors the brand red and uses the same
light/dark approach, but it does not share these tokens. If you change the brand
color here, update the worker's CSS too if you want them to match.

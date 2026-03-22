# Contributing to the N.C.N.G. Website

Thanks for helping improve the N.C.N.G. Historical Model Railroad website! This guide covers how to submit changes.

---

## Quick changes (GitHub web editor)

For simple edits (fixing a typo, updating a date, changing a bio), you can edit files directly on GitHub:

1. Navigate to the file on [github.com/djdefi/ncngmodelrailroad.org](https://github.com/djdefi/ncngmodelrailroad.org)
2. Click the **pencil icon** (Edit this file)
3. Make your change
4. Scroll down, add a short description of what you changed
5. Click **Commit changes**

For members with write access, this commits directly to `main` and the site updates in ~2 minutes.

---

## Larger changes (branch + pull request)

For bigger changes (new pages, design updates, multiple files), use a branch:

### 1. Create a branch

```sh
git checkout -b my-change-description
```

### 2. Make your changes

Edit files, add images, etc. Test locally with `npm run dev`.

### 3. Commit

```sh
git add -A
git commit -m "Short description of what changed"
```

Write clear commit messages. Examples:
- `Add 2027 event dates`
- `Update board member photos`
- `Fix broken link on contact page`

### 4. Push and open a pull request

```sh
git push origin my-change-description
```

Then go to GitHub and open a **Pull Request**. Describe what you changed and why. The webmaster will review and merge it.

---

## Code conventions

- **Icons**: Use [Iconify Solar](https://icon-sets.iconify.design/solar/) bold variants via `astro-icon`. No emoji in page content.
- **Images**: JPEG format, max 800px wide for gallery, keep under 200KB. Use `loading="lazy"` and `decoding="async"` on all images.
- **Links**: Always use `` `${base}/path` `` for internal links. External links get `target="_blank" rel="noopener noreferrer"`.
- **Styling**: Use Tailwind utility classes. Site colors are defined as CSS variables in `global.css`.
- **Config**: Org info goes in `src/config/organization.ts`, not hardcoded in pages.

---

## Questions?

- Email: info@ncngmodelrailroad.org
- Open a [GitHub Issue](https://github.com/djdefi/ncngmodelrailroad.org/issues) for bugs or feature requests

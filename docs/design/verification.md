# Verification

How the design was checked, and the traps that cost time. Run this after any
change to layout, type, chapters or scenes.

## Commands

```bash
npx tsc --noEmit -p tsconfig.app.json
```

```bash
npx eslint src --max-warnings=20
```

```bash
npm run build
```

```bash
npx vitest run
```

Expected: zero type errors, zero lint errors (eight shadcn fast-refresh warnings
are known), a clean build, tests green.

## Visual checks

Take screenshots at two widths and several scroll positions:

| Width | Positions |
| --- | --- |
| 1280 by 800 | hero; each pinned chapter at 15 percent and 80 percent of its track; a project card; contact |
| 375 by 812 | the same |

At each position confirm: no text overlaps the beat bars, the scene panel fits in
the viewport with the copy above it, headings do not clip at the top, the rail dots
(desktop) sit clear of the content, and the accent colour matches the chapter.

Then enable reduced motion and confirm every scene shows a complete diagram and the
letterbox is skipped.

## Scrolling to a position in a script

The page has `scroll-behavior: smooth`, so a scripted `scrollTo` animates and a
screenshot taken immediately catches it mid-way. Always scroll instantly and wait:

```js
const s = document.getElementById("before");
const top = s.getBoundingClientRect().top + window.scrollY;
window.scrollTo({ top: top + (s.offsetHeight - innerHeight) * 0.8, behavior: "instant" });
await new Promise((r) => setTimeout(r, 2000)); // let useSpring settle
```

For a pinned chapter, progress equals `(scrollY - top) / (offsetHeight - innerHeight)`.
Use that formula, not a fraction of the section height, to land on a given beat.

## Traps met while building

- **Black screenshots.** The in-app Browser pane returns a black frame on its first
  capture after navigation, and every capture while the pane is hidden. Take a
  throwaway shot first, or use Playwright against the dev server when the pane is
  hidden. Playwright saves only inside the repo (`.playwright-mcp/`); delete that
  folder before committing.
- **Vertically centred stages clip on phones.** Use `items-start pt-24` below `lg`.
- **Beat stack height is manual.** If a beat's body grows, the fixed `h-[…]` on the
  stack must grow or the progress bars overlap the last line.
- **Rail labels overlap content at 1024 px.** Labels are `hidden 2xl:inline`; dots only below that.
- **`@import` after `@tailwind` is ignored.** Import extra stylesheets from `main.tsx`.
- **Arbitrary Tailwind durations** (`duration-[1600ms]`) warn; use an inline style.
- **SVG labels near moving things.** The held invoice rose into the "Anomaly model"
  label; the label moved below the scanner. Screenshot mid-loop, not only at rest.
- **`sed` with `&` in a replacement** rewrites the match into the text; use a script.
- **The apex domain redirects.** Poll the live site with `curl -sL` on the `www` host
  and grep for the new asset hash printed by `npm run build`.

## Deploy check

After `git push origin main`, Vercel builds in about 30 s. Confirm with:

```bash
curl -sL https://www.samarthsaraswat.com/ | grep -o 'assets/index-[A-Za-z0-9_-]*\.js'
```

The hash should match the one in the local build output.

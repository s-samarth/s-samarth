# Verification

How the design was checked, and the traps that cost time. Run this after any
change to layout, type, pages or scenes.

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

Expected: zero type errors, zero lint errors (seven shadcn fast-refresh warnings
are known), a clean build, tests green.

## Visual checks

Take screenshots at two widths and several scroll positions:

| Width | Positions |
| --- | --- |
| 1440 by 900 | hero; Who; each project; Writes; Day job; Ticket |
| 375 by 812 | the same, plus the open menu |

At each position confirm: margin page numbers sit in the margin (tablet and up)
or inline (phone), handwritten notes do not cover text, tape sits on the edge of
its object, and `document.documentElement.scrollWidth` equals `innerWidth`.

Then enable reduced motion and confirm every scene shows a complete diagram and
every highlight is fully drawn.

## Testing the ticket form without sending email

Patch `fetch` in the page before submitting, capture the body, and fake a 200.
Check that `template_params.subject` reads `[Priority] #NNNN subject`, the stamp
appears, and the fields clear. Then make `fetch` reject and check the red-pen
error keeps the typed text. Never submit the real form to test it; it emails
the owner.

```js
window.__captured = [];
window.fetch = (url, opts) => { window.__captured.push({ url, body: opts?.body });
  return Promise.resolve(new Response("OK", { status: 200 })); };
```

## Scrolling to a position in a script

The page has `scroll-behavior: smooth`, so a scripted `scrollTo` animates and a
screenshot taken immediately catches it mid-way. Always scroll instantly and wait:

```js
const s = document.getElementById("built");
window.scrollTo({ top: s.offsetTop, behavior: "instant" });
await new Promise((r) => setTimeout(r, 2000)); // let reveals and highlights finish
```

## Traps met while building

- **Lagging screenshots.** The Browser pane sometimes returns the previous frame
  after a scripted scroll, or a blank page while reveals are mid-fade. Take two
  captures in a row, and check state through the DOM (computed styles, text)
  when a picture disagrees with what the code says.
- **Black screenshots.** The in-app Browser pane returns a black frame on its first
  capture after navigation, and every capture while the pane is hidden. Take a
  throwaway shot first, or use Playwright against the dev server when the pane is
  hidden. Playwright saves only inside the repo (`.playwright-mcp/`); delete that
  folder before committing.
- **`@import` after `@tailwind` is ignored.** Import extra stylesheets from `main.tsx`.
- **Arbitrary Tailwind durations** (`duration-[1600ms]`) warn; use an inline style.
- **Double rules.** `.card-ruled` lines plus row borders read as a mess; use one.
- **Radio buttons hidden with `sr-only`** cannot be clicked by coordinates in a
  test; click the label, as a person would.
- **`sed` with `&` in a replacement** rewrites the match into the text; use a script.
- **The apex domain redirects.** Poll the live site with `curl -sL` on the `www` host
  and grep for the new asset hash printed by `npm run build`.

## Deploy check

After `git push origin main`, Vercel builds in about 30 s. Confirm with:

```bash
curl -sL https://www.samarthsaraswat.com/ | grep -o 'assets/index-[A-Za-z0-9_-]*\.js'
```

The hash should match the one in the local build output.

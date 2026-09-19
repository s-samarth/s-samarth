# Notebook kit

The primitives every page is built from. CSS classes live in `src/index.css`;
React pieces live in `src/components/notebook/`. Use these before inventing new
ones, so the notebook stays one material.

## Paper and margin

- **Graph paper** is four `linear-gradient`s on `body`: a 24 px grid at 6 percent
  biro blue and a 120 px grid at 10 percent. A fixed SVG-noise overlay at 6
  percent (`mix-blend-mode: multiply`) gives the paper tooth.
- **`.page-x`** is the page container. On `md` and up it pads 6 rem on the left
  and draws the red margin rule with `::before` at 3.75 rem. Put section padding
  *inside* `.page-x`, never on the `<section>`, or the rule breaks between pages.
- **`PageHead`** (`notebook/PageHead.tsx`) opens a page. The red `p.NN` hangs in
  the margin at `-left-[4.6rem]` on tablets and up, and moves inline before the
  label on phones. `title` is optional; the Who page uses the manifesto instead.

## Ink

| Class | What it is | Rule |
| --- | --- | --- |
| `.headline` | Newsreader 500, tight | one per block; italic `<em>` for emphasis |
| `.lede` | Newsreader, graphite-dim | one short paragraph under a headline |
| `.label` | Plex Mono, uppercase, soft | page names, table keys, metadata |
| `.hand` | Caveat, biro blue | asides only; must be true and skippable |
| `.link-ink` | biro underline | inline links in running text |

## Objects

- **`.card`**: warm white, a two-layer shadow, no radius. Give it a hand-picked
  tilt (`-rotate-[0.6deg]`) and a red rule under its label
  (`border-b-2 border-redpen/50`). `.card-ruled` adds blue lines every 32 px;
  do not combine it with rows that draw their own borders.
- **`.tape`**: a translucent beige strip with slightly skewed ends
  (`clip-path`). Place it absolutely at the top edge, rotated 2 to 6 degrees.
- **`.print`**: a photo print (white border, deep soft shadow). Every dark,
  UI-like animation goes inside one, with a `fig. N` label under it.
- **Sticky notes** (day job): `bg-[#FCE58A]` or `bg-paper-card`, a shadow, tape.

## Actions

- **`.btn-stamp`** is the primary action: graphite block, mono caps, a hard
  3 px marker-amber offset shadow that grows on hover and collapses on press,
  like pushing a rubber stamp. One per view.
- **`.btn-pen`** is secondary: biro mono caps with a 2 px underline.

## Hand-made motion

- **`Highlight`** animates `backgroundSize` from `0% 100%` to `100% 100%` on the
  `.hl` gradient (amber 45 percent, from 42 to 88 percent of the line box).
  `box-decoration-break: clone` gives each wrapped line its own stroke. Stagger
  several with `delay={0.15 * i}` so they read in order.
- **`Scribble`** draws a pen path with framer-motion `pathLength` 0 to 1. Shapes
  share a 100 by 40 viewBox: `arrow-left`, `arrow-up`, `arrow-down`, `underline`,
  `circle`. Arrow heads draw 0.45 s after their shaft. `vectorEffect:
  non-scaling-stroke` keeps the line 2 px however the box is sized.
- **Print settle** (`ProjectCard`): `useScroll` on the print from `start end` to
  `center center` maps rotate from plus or minus 5 to 1.2 degrees and y from 40
  to 0, so the print looks taped down as it arrives.
- **Sticker drop** (hero): the cut-out enters at rotate 9, scale 1.08, y -20 and
  lands at rotate 3.
- **Ticket stamp** (`ContactForm`): on success a red "Received" box springs in
  (stiffness 420, damping 18) from scale 1.8 to 1 and rotate -2 to -12, with
  `mix-blend-mode: multiply` so it looks inked onto the paper.

## The ticket form

`ContactForm.tsx` sends through EmailJS with the same service, template and
public key as before. It adds a random four-digit ticket number and a priority
tick-box, and both are prefixed onto the subject (`[Urgent] #4426 ...`), so the
email template needed no change. On failure the message stays in the fields
and a red-pen line offers the email address instead.

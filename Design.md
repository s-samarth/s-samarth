# Design

How samarthsaraswat.com was designed, why it looks the way it does, and how to
reproduce the approach. Written for a human or an AI agent picking this up cold.

Deep dives (read in this order once you have read this file):

1. [docs/design/notebook-kit.md](docs/design/notebook-kit.md) — the notebook primitives: paper, margin, highlighter, tape, prints, stamps.
2. [docs/design/scene-cookbook.md](docs/design/scene-cookbook.md) — how the project animations were built, with recipes.
3. [docs/design/voice-and-copy.md](docs/design/voice-and-copy.md) — keeping the owner's voice, not polishing it away.
4. [docs/design/verification.md](docs/design/verification.md) — how to check the result, and the traps.

## 1. What this design is

A personal site for an AI engineer who does stand-up comedy, built as **a
working notebook**: graph paper, a red margin rule, page numbers in the margin,
a highlighter over the words that matter, taped-in prints of the projects, blue
biro asides, sticky notes for the day job, and a support ticket to get in touch.

The page has one job: by the bottom, a reader should feel they have met Samarth
and seen what Samarth builds for fun, not skimmed a CV. So the fun parts come first.

| Page | Section id | Job |
| --- | --- | --- |
| p.01 | `top` | Name, "AI builder", a two-line day-job summary, the cut-out photo as a sticker |
| p.02 | `who` | The manifesto, word for word, with highlighter; facts card; skills card |
| p.03 | `built` | Three open-source projects as experiments, each with its looping animation |
| p.04 | `writes` | Substack articles as index cards with the cover taped on |
| p.05 | `day-job` | Two sticky notes: AI Engineer at Tazapay now, Data Scientist at Microsoft before |
| p.06 | `ticket` | Contact links and the "raise a ticket" form (EmailJS) |

Page data lives in `src/content/pages.ts`; the order is set in `src/pages/Index.tsx`.

## 2. How the design was arrived at

Three passes. The first two were rejected; why they failed is the most useful
thing in this document.

**Pass one** was serif on black with tiny mono labels and one amber accent. The
owner called it "vibe coded slop" with poor readability.

**Pass two** was a cinematic dark site: scroll-driven chapters, colour that
re-lit per chapter, two pinned chapters for Tazapay and Microsoft. It was well
made, and the owner liked it at first, but it read as the standard 2025–26 AI
portfolio: dark page, warm glow, big sans headlines, rounded glass panels, pill
tags. Worse, two long chapters on the day job put the "LinkedIn part" above the
projects and writing, which are the parts the owner actually enjoys. The last commit with
that design is `76937de`; its scenes and docs can be recovered from there.

**Pass three** (this design) came from mocking four whole-site directions rooted
in the owner's own world rather than in portfolio templates: a stand-up gig
night, a personal support desk, Indian truck art, and an engineer's lab
notebook. The owner chose the notebook. Research that informed it: Awwwards portfolio
winners, an "AI slop web design" guide (tells: default Inter, one gradient
accent, identical rounded cards, purposeless fades), and a 2026 aesthetics
round-up (texture, collage, "type plus objects", scrapbook).

What the notebook fixes, point by point:

- **Default type** becomes Newsreader (a warm editorial serif) plus Caveat for
  handwriting and IBM Plex Mono for typewritten labels.
- **Dark stage with a glow** becomes paper with a printed grid.
- **Identical rounded cards** become objects with different materials: index
  cards, sticky notes, photo prints, a ticket. Each has zero or near-zero radius.
- **Decorative motion** becomes motion that mimics a hand: highlighter swipes,
  pen strokes drawing themselves, prints settling as they are taped down, a
  rubber stamp landing when a ticket is sent.
- **Structure** encodes something real: page numbers and experiment numbers in
  the margin, figure numbers under the prints.

## 3. The system

**Palette** (`tailwind.config.ts`, `src/index.css`)

| Token | Value | Use |
| --- | --- | --- |
| paper | `#F6F3EA` | page; grid lines are biro blue at 6 and 10 percent |
| paper-card | `#FFFDF7` | index cards, prints, the ticket |
| graphite | `#1D2430` | all body and headline text (ink, not black) |
| graphite-dim / soft | `#4A5263` / `#7A8292` | secondary text / labels |
| biro | `#2B5BA8` | handwriting, secondary links, focus ring |
| redpen | `#C8412B` | margin rule, page numbers, one emphasised phrase per headline |
| marker | `#F2A33A` | highlighter and the stamp-button shadow (the old brand amber) |
| ink, bone, mist | dark stage | only inside project animations |

**Type**

- Headlines: Newsreader 500, `leading 1.02`, `tracking -0.02em` (`.headline`).
  Emphasis is Newsreader italic; one phrase per headline may be red pen.
- Body: Newsreader 17 to 21 px. Ledes use `.lede` in graphite-dim.
- Labels: IBM Plex Mono 11 to 12 px uppercase, `tracking 0.14em` (`.label`).
- Handwriting: Caveat in biro (`.hand`). Asides only, never information a
  reader must have. Everything in handwriting is also true.
- Inter survives only inside the project animations, which depict app UI.

**Layout**

- `.page-x`: max width 1180 px; on `md` and up the left padding is 6 rem and a
  1 px red rule sits at 3.75 rem. Page numbers hang in that margin.
- Each section is one `.page-x` with vertical padding inside it, so the margin
  rule runs unbroken from page to page.
- Objects are tilted by hand-picked angles (-1.4 to 1.2 degrees), never random,
  so screenshots are stable and nothing looks accidental twice.

**Motion principles**

1. Every animation is something a hand does: highlight, draw, tape, stamp.
2. Each plays once, when it first scrolls into view (`once: true`).
3. The resting state is the finished state, so reduced motion loses nothing.
4. The project animations keep their own loops; the notebook never competes
   with them. Only their frame moves (rotate 5 to 1.2 degrees while scrolling in).

**The photo.** The background was removed with macOS Vision subject lifting
(`VNGenerateForegroundInstanceMaskRequest`, a 20-line Swift script, no install),
then compressed with `cwebp` to 45 KB. The white die-cut border is four stacked
CSS `drop-shadow`s, which follow the alpha edge rather than the box.

**Favicon** (`public/favicon.svg` and PNGs). Still the lit "S" monogram from
pass two. It works on light tab strips too; redo it as a notebook mark only if
the owner asks. The method is in git history at `fad6212`.

## 4. The signature

**The highlighter.** The owner's manifesto is kept exactly as written, and
the phrases they emphasised get a marker stroke that swipes across as you read.
It ties the whole page together: the hero's "AI builder." gets the same stroke.

## 5. Reproduction checklist

1. Get the owner's raw words and keep them. Ask which sections are fun and
   which are obligation; order the page by fun.
2. Mock three or four whole-site directions from the owner's own world before
   writing code. Let them pick; build only the chosen one.
3. Set paper, ink and three typefaces first. Check a paragraph at 375 px.
4. Build the primitives (notebook-kit.md), then pages top to bottom.
5. Wrap any dark, UI-like animation in a `.print` so it reads as a photo.
6. Verify at 1440 and 375 px, test the form with the network intercepted (see
   verification.md), and check that nothing scrolls sideways on a phone.

## 6. Constraints that shaped the code

- Source files stay under 200 lines. No new dependencies without asking.
- Framer Motion v12 is the only animation library; CSS keyframes run the loops.
- `MotionConfig reducedMotion="user"` and a CSS media query honour reduced motion.

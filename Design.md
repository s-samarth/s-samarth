# Design

How samarthsaraswat.com was designed, why it looks the way it does, and how to
reproduce the approach. Written for a human or an AI agent picking this up cold.

Deep dives (read in this order once you have read this file):

1. [docs/design/scroll-mechanics.md](docs/design/scroll-mechanics.md) — chapters, atmosphere, pinned sections, beats.
2. [docs/design/scene-cookbook.md](docs/design/scene-cookbook.md) — how every animation was built, with recipes.
3. [docs/design/voice-and-copy.md](docs/design/voice-and-copy.md) — turning the owner's raw words into beats.
4. [docs/design/verification.md](docs/design/verification.md) — how to check the result, and the traps.

## 1. What this design is

A personal site for an AI engineer, built as a **scroll-driven story in chapters**.
The page has one job: by the bottom, a reader should feel they have met Samarth,
not skimmed a CV. Every decision below serves that.

The metaphor is a **film**. The page opens on a portrait with a letterbox, the
lighting changes colour as each chapter takes the screen, some chapters *pin* the
screen while a short sequence plays, and diagrams are called "scenes". It stays
a metaphor: no parallax gimmicks, no scroll-jacking, native scrolling throughout.

The reader meets the person in this order (see `src/pages/Index.tsx`):

| Chapter | Section id | Job | Accent |
| --- | --- | --- | --- |
| Start | `hero` | Portrait, name, "AI Builder", two calls to action | amber |
| Who | `who` | A manifesto that lights up as you read, then facts and skills | amber |
| Now | `now` | Pinned. Tazapay: three beats and a payments-corridor scene | violet |
| Before | `before` | Pinned. Microsoft: two impact beats, two scenes that cross-fade | blue |
| Built | `built` | Three open-source projects, each with a looping scene | green |
| Writes | `writes` | Featured Substack articles | rose |
| Talk | `talk` | Contact links and the "raise a ticket" form | amber |

Chapter data lives in `src/chapters/chapters.ts`. Adding a chapter means one row
there and one `<Chapter id="...">` section. Nothing else needs to know.

## 2. How the design was arrived at

Two full passes were built. The first was rejected; understanding why is the most
useful thing in this document.

**Pass one** used a high-contrast serif (Bodoni), tiny monospace labels, hairline
rules and a single amber accent on black. The owner's verdict: "vibe coded slop",
"readability is shit", "not immersive". Only the hero (photo plus gradient) and the
project animations survived. Lesson: the serif-on-black-with-mono-labels look is
the default an AI reaches for on any "cinematic" brief. It was a default, not a
choice, and it hurt legibility, which the owner cared about most.

**Pass two** (this design) started from three constraints the owner stated:

- Reading must be effortless. Big, heavy, sans headlines; body text at 17 to 20 px.
- Scrolling should feel like an experience, Apple-inspired: content that arrives
  in time with the scroll, not a wall of cards.
- The page should feel like getting to know a person. So the structure is a
  narrative (Who, Now, Before, Built, Writes, Talk), not a resume outline.

Research consulted before building: Awwwards portfolio winners, a 2026 juror's
list of award-winning sites, an "immersive website examples" roundup, and the
Framer Motion scroll documentation. The takeaways applied here: one continuous
background surface instead of sectioned bands, colour that shifts with position,
pinned sequences used sparingly (two of seven chapters), and restraint elsewhere.

## 3. The system

**Palette** (`tailwind.config.ts`, `src/index.css`)

| Token | Value | Use |
| --- | --- | --- |
| ink | `#050506` | page background |
| bone | `#F5F5F7` | primary text |
| mist | `#A1A1A6` | secondary text |
| line | `rgba(245,245,247,0.12)` | borders, rules |
| amber | `#F2A33A` | the owner's brand colour; hero and fallback accent |
| `--accent` | CSS variable | the *current chapter's* colour; eyebrows, `em`, buttons |

Only `--accent` changes with scroll. Everything coloured in the UI reads it, so a
chapter change re-tints labels, emphasised words, buttons and the rail dot at once,
with a 1.2 s CSS colour transition to make the handover feel like lighting, not a swap.

**Type**

- Display: Inter Tight 600, `leading 1.02`, `tracking -0.03em`. Utility class `.display`.
  One emphasised phrase per headline uses `<em>`, which renders upright in the accent.
- Body: Inter, 17 px base, `.lede` at 18 to 20 px in mist for standfirsts.
- Eyebrow: 13 px uppercase sans, `tracking 0.14em`, in the accent. Utility `.eyebrow`.
- Mono (IBM Plex Mono) appears only *inside* scene mockups where it depicts UI.

**Layout**

- `.container-x`: max width 1180 px, side padding 24/40 px.
- Pinned chapters use a two-column grid on `lg`: copy left, scene right (`1fr 1.1fr`).
- `.panel`: rounded 2xl, `line` border, 3.5 percent white fill, slight blur. Used for
  scene frames, fact lists, specs and the form. It is the only "card" style.

**Atmosphere** (`src/components/Atmosphere.tsx`)

Two blurred circles fixed behind the page, each a plain `background-color` with a
90 to 140 px blur, opacity 0.13 to 0.16. Their colours come from the active chapter's
`glow` pair and transition over 1.6 s; they drift by 20 to 30 vh across the full
scroll. A film-grain overlay (`body::after`, 4.5 percent opacity) sits above everything
so flat colour never looks digital.

**Motion principles**

1. Scroll drives the story; time drives the scenes. Chapter transitions, beats and
   reveals are tied to scroll position. Diagrams loop on their own clock.
2. Every scroll-linked value passes through `useSpring` (stiffness 120, damping 28)
   so it never snaps, and easing is `[0.22, 1, 0.36, 1]` everywhere else.
3. Nothing important is only available mid-animation. Scenes' resting state is the
   finished diagram, so reduced-motion users see a complete picture.
4. Two pinned chapters at most. Pinning is expensive attention; spend it on the two
   things the reader most needs to understand (current role, biggest past impact).

**Favicon and touch icon** (`public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`)

The icon is the hero in miniature: the Inter Tight "S" from the headlines, in bone,
on the ink tile, lit by the same cyan (`#2C93B3`) top-left and amber bottom-right
glows. It replaced a serif "S" in orange on a grey box that matched nothing else.

How it was made, so it can be redone for another letter or person:

1. The glyph is the real font outline, not text. Load the 700-weight TTF from
   Google Fonts in a browser with opentype.js (cdnjs) and read
   `font.getPath("S", 0, 0, 1000).toPathData(2)`. No font is embedded, so the SVG
   stays about 2 KB and renders identically everywhere.
2. Scale the path so the cap height is 40 of the 64-unit tile and centre it on
   the glyph's bounding box, not on the em square.
3. The glows are two radial gradients on full-tile rects, not blur filters;
   filters are unreliable in favicon renderers.
4. Judge candidates only at 16 and 32 px on both a light and a dark tab strip.
   Six directions were tried; bone on lit ink was the only one still crisp at
   16 px. Amber-on-amber lost the letter, a flat amber tile lost the brand.
5. Export PNGs by rendering the SVG in a browser and screenshotting the element:
   32 px with rounded corners for the fallback icon, 180 px with square corners
   for `apple-touch-icon` because iOS applies its own corner mask.
6. `theme-color` in `index.html` equals the page background so the browser chrome
   matches the tile.

## 4. The signature

The single memorable device is **chapter-driven light**: as the reader scrolls,
the whole page re-lights (accent, glows, rail) to the chapter they are in, and the
two pinned chapters play a short animated scene beside copy that arrives in beats.
Everything else is deliberately quiet so that device carries the page.

## 5. Reproduction checklist

To build a page like this for someone else, in order:

1. Get the raw material in the owner's own words: what they do now, what they did,
   what they made, how they talk. Keep their phrasing; do not "polish" it into
   marketing copy. See voice-and-copy.md.
2. Decide the chapter order as a story (who, now, before, built, writes, talk) and
   give each chapter one accent and two glow colours. Adjacent chapters should differ
   in hue so the change is visible.
3. Set the type first: a heavy tight sans for headlines, a readable sans for body,
   17 px minimum. Check a paragraph at phone width before doing anything else.
4. Build the shell: ChapterProvider, Atmosphere, Chapter sections, ChapterRail, nav.
5. Build the hero last-but-one and the scenes last. Scenes take the most time; the
   cookbook explains the two recipes (SVG SMIL and CSS keyframes).
6. Verify at 1280 and 375 widths at several scroll positions, then with reduced
   motion on. Fix overlaps before adding anything new.
7. Cut the favicon from the same display face and light it like the hero, so the
   tab and home screen carry the identity too (see "Favicon and touch icon").

## 6. Constraints that shaped the code

- Source files stay under 200 lines. Large components were split (Beats, scenes).
- No new dependencies without asking. No smooth-scroll library: `useSpring` gives
  the same feel on scroll-linked values, and native scroll stays accessible.
- Framer Motion v12 is the only animation library. CSS and SVG SMIL do the loops.
- `MotionConfig reducedMotion="user"` and a CSS media query honour reduced motion.

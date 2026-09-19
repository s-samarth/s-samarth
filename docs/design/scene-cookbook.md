# Scene cookbook

Every project on the site has a "scene": a small, looping, illustrative animation
in bright light colours, taped into the notebook inside a flat `.print`. This file explains how
the scenes were designed and gives two recipes so another agent can make a new one.

> Colours: the live scenes are white app UI on a pastel wash, with graphite
> text and bright accents (biro `#2B5BA8`, teal `#0FA37F`, coral `#E5533D`,
> marigold `#F2A33A`). The dark-stage colour rules below are from pass two.
>
> Status: the three live scenes are the project ones (Survive AI, Desi Dictation,
> Study Hub), built with Recipe B. The Corridor, Copilot and Leakage scenes that
> Recipe A describes were removed with the day-job chapters in the notebook
> redesign. They are kept here as worked examples and can be restored from
> commit `76937de`.

## What a scene is for

A scene is a picture of an *idea*, not a diagram of a real system. It exists so a
reader who never reads the paragraph still gets the gist in three seconds. Rules:

1. One idea per scene. Corridor: payments flow in, most clear, one is held.
   Copilot: a document goes in, agents light up, the deal bar shrinks.
   Leakage: invoices pass a scanner, one is pulled aside with a reason.
2. Label it `illustrative` in the corner. Never imply it is a real screenshot.
3. Resting state equals finished state, so reduced motion shows a complete picture.
4. Use the shared vocabulary: green `#34D399` means cleared or done, amber `#F2A33A`
   means flagged or held, amber or cyan means "the system" (the old `var(--accent)` no longer exists). Grey `#F5F5F7` at
   0.14 to 0.3 opacity is structure (wires, belts, unlit nodes).
5. Inter at 11 px for labels; `#0F0F12` fills for nodes on the panel.
6. Loop length 7 to 14 s. Fade everything out in the last 6 percent of the loop
   so the restart is not a hard cut.

## How the scenes were designed

The method that produced all six, in order:

1. Write one sentence of what happens: "A proposal goes into Copilot, three agents
   light up one by one, approvals come back, and the deal bar shrinks from 15 to 2."
2. Turn nouns into shapes on a 520 by 340 grid: hub circle centre-left, three pills
   right, upload slot far left, timeline along the bottom.
3. Turn verbs into a timeline of keyTimes (fractions of one loop). Write the table
   before touching code. Copilot's table:

   | keyTime | event |
   | --- | --- |
   | 0.03 to 0.14 | document travels from slot to hub |
   | 0.18 to 0.26 | dot hub to Retrieve, pill turns green at 0.28 |
   | 0.30 to 0.38 | dot to Find gaps, green at 0.40 |
   | 0.42 to 0.50 | dot to Approvals, green at 0.52 |
   | 0.50 to 0.58 | "requests sent" under Approvals |
   | 0.60 onward | "all approved" |
   | 0.62 to 0.72 | 2-day bar grows to 53 px (2/15 of the 400 px bar) |
   | 0.94 to 1.0 | everything fades for the restart |

4. Pick a recipe. SVG SMIL when things travel along paths. CSS keyframes when a
   mockup UI (text typing, keys pressing, bars) needs to animate HTML.
5. Screenshot mid-loop at desktop and phone. Move anything that overlaps.

## Recipe A: SVG with SMIL (Corridor, Copilot, Leakage)

Used in `src/components/scenes/*.tsx`. No JavaScript runs; the browser animates.

Skeleton:

```tsx
const W = 520, H = 340;
const loop = { dur: "10s", repeatCount: "indefinite" } as const;

<svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[560px]">
  <defs>
    <radialGradient id="glow">…var(--accent)…</radialGradient>
    <path id="route-1" d="M 56 140 L 224 140" />      // invisible motion path
  </defs>
  <line … stroke="#F5F5F7" strokeOpacity="0.14" />    // visible wire
  <circle r="3.5" fill="var(--accent)">               // the traveller
    <animateMotion {...loop} keyPoints="0;0;1;1" keyTimes="0;0.18;0.26;1" calcMode="linear">
      <mpath href="#route-1" />
    </animateMotion>
    <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.18;0.185;0.26;0.27;1" {...loop} />
  </circle>
</svg>
```

Building blocks:

- **Travel then wait**: `keyPoints="0;0;1;1"` with `keyTimes="0;t0;t1;1"` parks the
  element at the start until `t0`, moves until `t1`, then parks at the end.
- **Stop part-way**: `keyPoints="0;0.55;0.55"` stops at 55 percent of the path
  (the held payment, the held invoice).
- **Hide when parked**: pair every motion with an `opacity` animate whose keyTimes
  bracket the movement by about 0.005.
- **Light a node**: animate `stroke` between two hex colours and `stroke-opacity`
  separately (`0.28` unlit, `1` lit). Add a check-mark path whose opacity follows.
- **Lift something off a line**: nest groups. Inner `<g>` has the `animateMotion`,
  outer `<g>` has `animateTransform type="translate"` so the two do not fight.
- **Colour change on the move**: animate `stroke` on the *group* and let children
  inherit; give children no stroke attribute of their own.
- **Same speed for different durations**: speed is `pathLength / (dur * keyTimeSpan)`.
  Leakage invoices move 580 px in 7 s; the held one has `dur 14s`, so its
  `keyTimes` end at 0.275 to reach 55 percent at the same speed.
- **Stagger a stream**: identical elements with `begin` offsets (0, 1.4, 2.8 … s).
- **Match to the chapter**: hub strokes and glows use `var(--accent)`; SVG reads CSS
  variables, so the scene re-tints with the chapter for free.

Gotcha: SMIL does not honour `prefers-reduced-motion`. These scenes keep moving for
everyone; that was accepted because they never carry information the copy lacks.

## Recipe B: CSS keyframes on HTML mockups (Survive AI, Desi Dictation, Study hub)

Used in `src/components/projects/*Scene.tsx` with `src/styles/scenes.css`.

Principle: the element's *base* CSS is the finished look; keyframes hide and reveal.

```css
.sv-loop { animation-duration: 9s; animation-iteration-count: infinite; animation-fill-mode: both; }
@keyframes sv-type {
  0%, 6%   { clip-path: inset(0 100% 0 0); animation-timing-function: steps(14, end); }
  20%, 100% { clip-path: inset(0 0 0 0); }
}
.sv-type { animation-name: sv-type; }
```

Building blocks:

- **Typing**: `clip-path: inset(0 100% 0 0)` to `inset(0 0 0 0)` with `steps(n, end)`
  where n is roughly the character count. Add a blinking caret element.
- **Sequenced highlights**: one keyframe block per step with a small window
  (`24% dim, 27% lit`), all sharing one `--loop` duration so timing stays aligned.
- **Fan-out with delays**: `animation-delay: calc(var(--i) * -1.7143s)` with `--i`
  set inline per node (Study hub: 7 tracks over 12 s take turns).
- **Loop restart**: a wrapper `*-fade` keyframe fades to 0 over the last 6 percent.
- **Reduced motion**: one media query sets `animation: none !important` on the loop
  classes; because base state is finished state, the mockup shows complete.

## Adding a new scene, step by step

1. Write the one-sentence story and the keyTime table.
2. Copy `SurviveAiScene.tsx` (CSS) as a template, or `CorridorScene.tsx` from
   commit `76937de` for SMIL.
3. Keep constants at the top: `W`, `H`, positions, `LOOP`. Derive paths from them.
4. Use only the shared colours. Put `illustrative` in a corner.
5. Register it in the `scenes` map in `projects/ProjectCard.tsx`; the card puts it
   in a `.print` with `aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/3]`, and add a
   pastel wash for it to the `washes` map.
6. Screenshot at 1280 and 375 at two different moments in the loop.
7. Stay under 200 lines; move sub-shapes into tiny components (`Invoice`).

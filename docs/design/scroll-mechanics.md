# Scroll mechanics

How chapters, the atmosphere, pinned sections and beats work. Every pattern here
is implemented with Framer Motion v12 primitives: `useScroll`, `useTransform`,
`useSpring`, `useInView`. No custom scroll listeners.

## The chapter model

Three small pieces make the whole page aware of "where the reader is":

```
src/chapters/chapters.ts        data: id, label, accent, glow pair
src/chapters/ChapterContext.tsx provider: current id, setCurrent, writes --accent
src/components/Chapter.tsx      section wrapper: reports itself when in view
```

`Chapter` wraps a `<section id>` and calls `useInView(ref, { margin: "-45% 0px -45% 0px" })`.
That margin shrinks the observed viewport to a thin band around its vertical centre,
so the chapter that crosses the middle of the screen is the active one. This works
for both short sections and tall pinned ones.

When `current` changes, the provider runs

```ts
document.documentElement.style.setProperty("--accent", chapterById(current).accent);
```

Everything that should re-tint reads `var(--accent)` in CSS with a `transition: color 1.2s`.
This is the cheapest possible theme switch: one variable, no re-render of children.

Consumers of `useChapter()`:

- `Atmosphere` reads the glow pair and sets `backgroundColor` on two blurred divs.
- `ChapterRail` highlights the active dot and hides itself on the hero.
- `Navigation` marks the active link.

## The atmosphere

Two absolutely positioned circles inside a fixed, full-screen, `pointer-events: none`
layer at `z-0`. Each is `rounded-full`, `blur-[90px]` (140 on desktop), opacity 0.13
to 0.16, and carries `will-change: transform` so the blur is composited once.

Colour changes are plain CSS `transition-colors` at 1600 ms. Position drifts with
page progress:

```ts
const { scrollYProgress } = useScroll();
const yA = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);
const yB = useTransform(scrollYProgress, [0, 1], ["0vh", "20vh"]);
```

Why not gradients: `background-color` interpolates in CSS; gradients do not. Two
solid blurred circles look identical to a moving two-stop gradient at a fraction
of the cost.

## Pinned chapters (Now, Before)

Pattern, in `NowSection.tsx` and `BeforeSection.tsx`:

```tsx
<div ref={ref} className="h-[280vh]">                    // tall track
  <div className="sticky top-0 h-screen overflow-hidden"> // the stage stays put
    ...copy and scene...
  </div>
</div>
```

The outer div is the track: its height decides how long the reader scrolls while
the stage stays. 280 vh with three beats, 220 vh with two, felt right; 300 vh with
four stats "felt long" to the owner and was cut.

Progress through the track:

```ts
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
```

`useSpring` smooths the raw value so wheel ticks do not stutter the beats. Every
derived value below uses `progress`, not `scrollYProgress`.

On phones the stage uses `items-start pt-24`, on `lg` `items-center pt-0`; a
vertically centred stage clips its top on a short viewport.

## Beats (`src/hooks/use-beat.ts`, `src/components/Beats.tsx`)

A beat is a title and a paragraph that fades and rises in at `start`, holds, and
fades out past `end`, all in track-progress units (0 to 1):

```ts
useBeat(progress, start, end, fade = 0.07)
  opacity: [start - fade, start, end, end + fade] -> [0, 1, 1, 0]
  y:       same keys                               -> [28, 0, 0, -28]
```

`Beats` stacks N beats absolutely in the same box and gives beat `i` the slice
`[i/N, (i+1)/N - 0.04]`. The last beat gets `end = 2` so it never fades out; the
chapter should not end on an empty stage. Below the stack, one thin bar per beat
fills across its slice, a quiet "where am I" indicator.

The stack has a fixed height class (for example `h-[270px] sm:h-[200px]`). Set it
to fit the longest beat at phone width, or the bars overlap the text.

`useArrive` is the one-way variant (content arrives and stays). It powered the
old four-stat Microsoft list and remains available.

## Cross-fading scenes inside a pinned chapter

Before has two scenes for two beats. Both sit in one `.panel` with `relative` and
`overflow-hidden`; each scene is an `absolute inset-0` `motion.div`:

```ts
const copilotOpacity = useTransform(progress, [0.42, 0.52], [1, 0]);
const leakageOpacity = useTransform(progress, [0.42, 0.52], [0, 1]);
```

The crossover sits just before the second beat's start (0.5), so the picture
changes a moment before the words do, the way a film cuts on action.

The frame itself also scales in: `scale [0, 0.2] -> [0.94, 1]`, `opacity [0, 0.15] -> [0.4, 1]`.

## The scroll-lit paragraph (`ScrollText.tsx`)

The Who manifesto lights up word by word. The paragraph's own progress uses
`offset: ["start 0.85", "end 0.4"]` (starts when its top reaches 85 percent down the
viewport, done when its bottom reaches 40 percent). Word `i` of `N` maps
`[i/N, (i+1)/N]` to opacity `[0.16, 1]`. Runs wrapped in `*asterisks*` in the source
string get the accent colour. That is the whole component; the effect is the cheapest
way to make reading feel paced.

## Hero exit

`HeroSection` reads page `scrollY` directly: the photo scales `[0, 900] -> [1, 1.12]`
and fades `[0, 700] -> [1, 0]`; the copy rises and fades slightly faster. The reader
"pushes in" past the portrait into the story. A one-time `Letterbox` (two bars that
shrink away on load, skipped under reduced motion) opens the film.

## Reveal

`Reveal` is a plain `whileInView` fade-and-rise, `once: true`, used for intros and
project copy. It is the default for anything not in a pinned chapter. Do not stack
it inside pinned chapters; scroll-linked and time-based entrances fight each other.

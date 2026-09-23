import type { CSSProperties } from "react";

/**
 * Inline style that sets the `.rise` entrance delay (see index.css).
 *
 * Frontend note: a CSS custom property set inline is read by the stylesheet's
 * `var(--d)`, so one class serves every element and only the delay varies.
 * TypeScript doesn't know custom properties, hence the cast.
 */
export const riseDelay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

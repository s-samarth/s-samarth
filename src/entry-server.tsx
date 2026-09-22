import { renderToString } from "react-dom/server";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";
import cutout from "@/assets/samarth-cutout.webp";
import { structuredData } from "./seo/structuredData";
import { llmsTxt } from "./seo/llmsTxt";

/**
 * Build-time entry, never shipped to the browser. scripts/prerender.mjs
 * calls these after `vite build` to bake the page into dist/index.html.
 *
 * Frontend note: this is static prerendering. The same React components run
 * once in Node and produce plain HTML, so crawlers that don't run
 * JavaScript (most AI bots) still read every word. In the browser, React
 * then takes over the page as usual.
 */
export const render = () =>
  renderToString(
    <MotionConfig reducedMotion="user">
      <Index />
    </MotionConfig>,
  );

export const jsonLd = () => JSON.stringify(structuredData(cutout));

export { llmsTxt };

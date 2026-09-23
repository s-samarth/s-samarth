import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, AppRoutes } from "./App";
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
 * then hydrates it (main.tsx): same tree, only the router differs.
 */
export const render = () =>
  renderToString(
    <AppShell>
      <StaticRouter location="/">
        <AppRoutes />
      </StaticRouter>
    </AppShell>,
  );

export const jsonLd = () => JSON.stringify(structuredData(cutout));

export { llmsTxt };

import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { routeKey } from "./seo/routes";
import "./index.css";
import "./styles/scenes.css";
import "./styles/hero.css";

/**
 * Frontend note: prerendered pages (scripts/prerender.mjs) ship their HTML, so
 * React *hydrates* it: it attaches to the HTML that's already on screen
 * instead of replacing it, and entrance animations don't restart. The
 * prerender stamps `data-route` on #root; if it doesn't match this URL (a 404
 * served the home page's HTML), React renders from scratch instead.
 */
const root = document.getElementById("root")!;
if (root.dataset.route === routeKey(window.location.pathname)) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);

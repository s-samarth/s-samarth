import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/scenes.css";
import "./styles/hero.css";

/**
 * Frontend note: the home page ships prerendered (scripts/prerender.mjs), so
 * React *hydrates* it: it attaches to the HTML that's already on screen
 * instead of replacing it, and entrance animations don't restart. Any other
 * path (a 404) was never prerendered, so it renders from scratch.
 */
const root = document.getElementById("root")!;
if (root.hasChildNodes() && window.location.pathname === "/") hydrateRoot(root, <App />);
else createRoot(root).render(<App />);

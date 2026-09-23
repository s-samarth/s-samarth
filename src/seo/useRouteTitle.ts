import { useEffect } from "react";
import { prerenderedRoutes } from "./routes";

/**
 * Sets document.title from the route table. Prerendered HTML already has the
 * right <title>; this keeps dev mode (no prerender) honest too.
 */
export const useRouteTitle = (path: string) => {
  useEffect(() => {
    const meta = prerenderedRoutes.find((r) => r.path === path)?.meta;
    if (meta) document.title = meta.title;
  }, [path]);
};

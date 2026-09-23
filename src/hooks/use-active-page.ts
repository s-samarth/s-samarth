import { useEffect, useState } from "react";

/**
 * Which section sits under the middle of the screen.
 *
 * Frontend note: an IntersectionObserver with a thin band in the middle of
 * the viewport (the rootMargin) fires only when a section crosses that band,
 * so the browser does the work instead of a scroll listener.
 */
export const useActivePage = <T extends string>(ids: readonly T[]) => {
  const [active, setActive] = useState<T | null>(null);
  const key = ids.join(",");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as T)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    key.split(",").forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);
  return active;
};

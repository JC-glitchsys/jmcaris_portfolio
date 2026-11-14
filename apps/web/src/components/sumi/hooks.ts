import { useEffect, useState, useSyncExternalStore } from "react";

export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Heavy parallax is desktop-only. */
export const useDesktop = () => useMedia("(min-width: 768px)");
export const usePrefersReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** Resolves a /public asset against Vite's base (works on GitHub Pages too). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/**
 * Scroll-spy: the section whose top has most recently passed ~35% of the viewport.
 * Returns "home" while above the first section. Order of `ids` does not matter.
 */
export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState("home");
  const key = ids.join("|");

  useEffect(() => {
    if (!key) return;
    const list = key.split("|");
    let raf = 0;

    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = "home";
      let best = -Infinity;
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return active;
}

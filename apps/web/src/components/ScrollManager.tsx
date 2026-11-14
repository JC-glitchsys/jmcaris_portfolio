import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const positions = new Map<string, number>();

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  // wait for the new route to paint before looking for the target
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }),
  );
}

/**
 * Scrolls to the top on real page (route) changes only. Back/Forward restore the saved position,
 * links like /#projects land on their section, and in-page anchors, modals and viewers are untouched.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();
  const keyRef = useRef(key);
  const first = useRef(true);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => positions.set(keyRef.current, window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    keyRef.current = key;
    if (first.current) {
      first.current = false;
      if (hash) scrollToHash(hash);
      return;
    }
    if (navType === "POP") {
      const saved = positions.get(key);
      if (saved !== undefined) {
        requestAnimationFrame(() => window.scrollTo({ top: saved, left: 0, behavior: "instant" }));
      } else if (hash) scrollToHash(hash);
      else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (hash) scrollToHash(hash);
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Only an actual route change should trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

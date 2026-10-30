/*
  One entrance animation for the whole site: a short fade and rise, played once
  when the element scrolls into view. Returns no props (so nothing animates)
  when the visitor prefers reduced motion.

  Usage:  const reduce = useReducedMotion();
          <motion.div {...revealProps(reduce, 0.1)} />
*/
export function revealProps(reduceMotion: boolean | null, delay = 0) {
  if (reduceMotion) return {};

  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay, ease: "easeOut" },
  } as const;
}
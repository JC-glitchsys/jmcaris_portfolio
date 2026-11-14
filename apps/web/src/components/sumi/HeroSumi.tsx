
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ENSO_PATH } from "./Ink";
import { asset, useDesktop, usePrefersReducedMotion } from "./hooks";

const INK = { color: "var(--brush)" } as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Imperfect hand-painted Enso behind the ninja portrait. */
export function HeroEnso({
  className = "",
  play,
}: {
  className?: string;
  play: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 340"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ ...INK, opacity: 0.24 }}
    >
      <motion.path
        d={ENSO_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="23"
        strokeLinecap="round"
        className="sumi-dry"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={{
          duration: 2.4,
          delay: 0.25,
          ease: [0.45, 0, 0.2, 1],
        }}
      />
    </svg>
  );
}

type Layer = {
  src: string;
  /** Resting opacity once revealed. */
  opacity: number;
  /** Distance from the bottom of the hero, as % of its height. */
  bottom: string;
  /** Rendered width: never narrower than `min`, so peaks stay readable on phones. */
  width: string;
  /** Scroll parallax in px over the first 900px of scroll: [y, x]. */
  scroll: [number, number];
  /** Entrance delay in seconds. */
  delay: number;
  /** Optional slow idle float (mist only): [x %, y px, seconds]. */
  float?: [number, number, number];
};

/** Back to front. Far layers barely move and stay pale; near layers move more. */
const LAYERS: Layer[] = [
  { src: "images/hero/mist.webp", opacity: 0.4, bottom: "14%", width: "max(125%, 1100px)", scroll: [30, 10], delay: 0.5, float: [-3.2, 3, 46] },
  { src: "images/hero/mountains-mid.webp", opacity: 0.65, bottom: "4%", width: "max(106%, 980px)", scroll: [48, 14], delay: 0.3 },
  { src: "images/hero/mist.webp", opacity: 0.5, bottom: "0%", width: "max(130%, 1200px)", scroll: [60, -14], delay: 0.8, float: [3.4, -4, 58] },
  { src: "images/hero/mountains-foreground.webp", opacity: 0.8, bottom: "-8%", width: "max(104%, 1000px)", scroll: [84, 8], delay: 0.6 },
];

function ParallaxLayer({
  layer,
  scrollY,
  play,
  strength,
  animate,
}: {
  layer: Layer;
  scrollY: MotionValue<number>;
  play: boolean;
  /** 1 on desktop, lighter on phones, 0 for reduced motion. */
  strength: number;
  animate: boolean;
}) {
  const y = useTransform(scrollY, [0, 900], [0, layer.scroll[0] * strength]);
  const x = useTransform(scrollY, [0, 900], [0, layer.scroll[1] * strength]);
  const [fx, fy, fd] = layer.float ?? [0, 0, 0];

  return (
    <motion.div
      className="absolute inset-x-0"
      style={{ bottom: layer.bottom, x, y, willChange: "transform" }}
    >
      {/* Entrance: fade in and rise a little */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={play ? { opacity: layer.opacity, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ duration: 2, delay: layer.delay, ease: EASE }}
      >
        {/* Idle drift: slow, eased, mist only */}
        <motion.div
          animate={
            animate && layer.float
              ? { x: [`${-fx}%`, `${fx}%`, `${-fx}%`], y: [-fy, fy, -fy] }
              : undefined
          }
          transition={{ duration: fd, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={asset(layer.src)}
            alt=""
            draggable={false}
            decoding="async"
            className="relative left-1/2 block h-auto max-w-none -translate-x-1/2 select-none"
            style={{ width: layer.width }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Ink-wash mountains in layers, drifting mist, and one red sun. */
export default function HeroSumi({ play }: { play: boolean }) {
  const desktop = useDesktop();
  const reduce = usePrefersReducedMotion();

  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, [0, 900], [0, -70]);

  const strength = reduce ? 0 : desktop ? 1 : 0.45;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
    >
      {/* Soft ink wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 34% 52% at 76% 46%, rgba(var(--ink-rgb),0.05), transparent 72%), radial-gradient(ellipse 30% 40% at 18% 70%, rgba(201,169,106,0.08), transparent 72%)",
        }}
      />

      {/* Red sun */}
      <motion.div
        className="absolute right-[10%] top-[7%] md:right-[11%] md:top-[11%]"
        style={{ y: desktop && !reduce ? sunY : 0 }}
      >
        <motion.div
          className="sumi-rough size-12 rounded-full sm:size-16"
          style={{ background: "var(--sun)" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            play
              ? { opacity: 0.9, scale: 1 }
              : { opacity: 0, scale: 0.6 }
          }
          transition={{
            duration: 1.6,
            delay: 0.3,
            ease: EASE,
          }}
        />
      </motion.div>

      {/* Landscape: fades into the washi paper at the bottom edge */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 78%, transparent 100%)",
        }}
      >
        {LAYERS.map((layer, i) => (
          <ParallaxLayer
            key={i}
            layer={layer}
            scrollY={scrollY}
            play={play}
            strength={strength}
            animate={!reduce}
          />
        ))}
      </div>
    </div>
  );
}

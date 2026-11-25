import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

import { asset } from "./hooks";

const HERO_IMAGES = ["images/ninja-body.webp", "images/ninja-hat.webp"];
/** The scene's own artwork: waited for (briefly) so it fades in whole instead of popping in. */
const SCENE = {
  mountains: "images/loader/mountains-paper.webp",
  left: "images/loader/branch-left.webp",
  right: "images/loader/branch-right.webp",
  moon: "images/moon.webp",
  mist: "images/hero/mist.webp",
};
/** The scene plays this long, then the 1-second reveal into the portfolio: six seconds in all. */
const SHOW_MS = 5000;
const REVEAL_S = 1;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MESSAGE = "Please wait...";
/** Optional display face for the message. Drop JapanDaisuke.ttf (or .woff2) into public/fonts/ to enable it. */
const MESSAGE_FONT = "Japan Daisuke";
const MESSAGE_FONT_FILES = ["fonts/JapanDaisuke.woff2", "fonts/JapanDaisuke.ttf"];

/** Loads the message font if the file exists. Absent or blocked, the Zen Old Mincho stack is used instead. */
async function loadMessageFont() {
  if (typeof FontFace === "undefined" || document.fonts.check(`1em "${MESSAGE_FONT}"`)) return;
  for (const file of MESSAGE_FONT_FILES) {
    try {
      const face = new FontFace(MESSAGE_FONT, `url(${asset(file)})`, { display: "swap" });
      document.fonts.add(await face.load());
      return;
    } catch {
      /* try the next file */
    }
  }
}

/*
  The loader is always the warm rice-paper scene, in light and dark mode alike, so its colours
  are fixed here instead of following the theme variables.
*/
const PAPER_TOP = "#f7e7d4";
const PAPER_LOW = "#faedde";
const INK = "#2f2820";

/**
  A slow, never-quite-repeating breeze: three sine waves with unrelated periods, scaled by a
  gust envelope so some moments are calm and others a little livelier.
*/
function wind(t: number) {
  return 0.55 * Math.sin(t * 0.00062) + 0.3 * Math.sin(t * 0.00107 + 1.3) + 0.15 * Math.sin(t * 0.00231 + 0.4);
}
function sway(t: number, lag: number, amplitude: number, speed: number) {
  const s = t * speed - lag;
  const gust = 0.65 + 0.35 * Math.sin(t * 0.00031 + lag);
  const flutter = 0.22 * Math.sign(amplitude) * Math.sin(s * 0.0019 + lag * 0.01);
  return amplitude * gust * wind(s) + flutter;
}

function decodeAll(sources: string[]) {
  return Promise.all(
    sources.map((src) => {
      const image = new Image();
      image.src = asset(src);
      return image.decode().catch(() => undefined);
    }),
  );
}

export default function SumiLoader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const reduce = useReducedMotion();
  const leaving = useRef(false);
  const callbacks = useRef({ onReveal, onDone });
  useEffect(() => {
    callbacks.current = { onReveal, onDone };
  });

  const [sceneReady, setSceneReady] = useState(false);
  const [exiting, setExiting] = useState(false);

  const hole = useMotionValue(-18);
  const rotLeft = useMotionValue(0);
  const rotRight = useMotionValue(0);
  // The reveal opens from the moon, like ink soaking outward through the paper.
  const revealMask = useMotionTemplate`radial-gradient(circle at 50% 33%, transparent ${hole}%, #000 calc(${hole}% + 30%))`;

  const leave = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;
    setExiting(true);
    callbacks.current.onReveal();
    animate(hole, 125, {
      duration: REVEAL_S,
      ease: [0.4, 0, 0.2, 1],
      onComplete: () => callbacks.current.onDone(),
    });
  }, [hole]);

  useEffect(() => {
    let active = true;
    void loadMessageFont();
    // Warm up the hero artwork so it is ready the moment the reveal starts.
    HERO_IMAGES.forEach((src) => {
      const image = new Image();
      image.src = asset(src);
      void image.decode().catch(() => undefined);
    });
    // Show the scene as soon as its artwork has decoded; never hold it back for more than a moment.
    void Promise.race([decodeAll(Object.values(SCENE)), new Promise((r) => window.setTimeout(r, 1400))]).then(() => {
      if (active) setSceneReady(true);
    });
    // Four seconds of scene, then the reveal: five seconds from first paint.
    const timer = window.setTimeout(leave, SHOW_MS);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [leave]);

  useAnimationFrame((t) => {
    // Each branch answers the same breeze a moment apart, in its own direction and strength.
    if (reduce) return;
    rotLeft.set(sway(t, 0, 1.15, 1));
    rotRight.set(sway(t, 420, -1.35, 0.88));
  });

  const seconds = SHOW_MS / 1000;
  const fade = (delay: number, duration = 1.4) => ({
    duration: reduce ? 0.3 : duration,
    delay: reduce ? 0 : delay,
    ease: EASE,
  });

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-100 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${PAPER_TOP} 0%, ${PAPER_LOW} 62%)`,
        color: INK,
        WebkitMaskImage: revealMask,
        maskImage: revealMask,
      }}
    >
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: sceneReady ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* 1. Ink mountains on rice paper, with a very slow push-in */}
        <motion.img
          src={asset(SCENE.mountains)}
          alt=""
          draggable={false}
          className="loader-mountains select-none"
          style={{ transformOrigin: "50% 100%" }}
          initial={{ scale: 1 }}
          animate={{ scale: reduce ? 1 : 1.06 }}
          transition={{ duration: seconds + 1.2, ease: "linear" }}
        />

        {/* 2. Mist from the hero, drifting across the valley */}
        {[
          { bottom: "5%", width: "150vw", opacity: 0.32, from: "-7%", to: "5%" },
          { bottom: "-2%", width: "170vw", opacity: 0.24, from: "6%", to: "-6%" },
        ].map((mist, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute inset-x-0 z-[5]"
            style={{ bottom: mist.bottom, opacity: mist.opacity }}
            initial={{ x: reduce ? mist.to : mist.from }}
            animate={{ x: mist.to }}
            transition={{ duration: seconds + 1.4, ease: "linear" }}
          >
            <img
              src={asset(SCENE.mist)}
              alt=""
              draggable={false}
              className="relative left-1/2 block h-auto max-w-none -translate-x-1/2 select-none"
              style={{ width: mist.width }}
            />
          </motion.div>
        ))}

        {/* 3. The red-orange moon rises slowly into the centre of the sky */}
        <div className="absolute left-1/2 top-[19%] w-[46vw] -translate-x-1/2 sm:w-[30vw] md:top-[13%] md:w-[min(21vw,310px,38vh)]">
          <motion.div
            className="absolute -inset-[28%] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(214,80,46,0.16), rgba(214,80,46,0) 66%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: sceneReady ? 1 : 0 }}
            transition={fade(0.8, 2.4)}
          />
          <motion.img
            src={asset(SCENE.moon)}
            alt=""
            draggable={false}
            className="relative block h-auto w-full select-none"
            initial={{ opacity: 0, y: reduce ? 0 : 34, scale: 0.94 }}
            animate={sceneReady ? { opacity: 0.96, y: 0, scale: 1 } : { opacity: 0, y: reduce ? 0 : 34, scale: 0.94 }}
            transition={fade(0.5, 2.6)}
          />
        </div>

        {/* 4. Cherry blossom branches: separate layers, each pivoting at its own trunk */}
        <motion.div
          className="absolute z-20 w-[64vw] md:w-[min(40vw,80vh)]"
          style={{ left: "-2vw", top: "-2vw" }}
          initial={{ opacity: 0, x: -34 }}
          animate={exiting ? { opacity: 0, x: -46 } : sceneReady ? { opacity: 1, x: reduce ? 0 : 10 } : { opacity: 0, x: -34 }}
          transition={exiting ? { duration: 0.9, ease: "easeIn" } : sceneReady ? { x: { duration: seconds + 1, ease: "linear" }, opacity: fade(0.6, 1.9) } : fade(0.6, 1.9)}
        >
          <motion.img
            src={asset(SCENE.left)}
            alt=""
            draggable={false}
            className="block h-auto w-full select-none"
            style={{ rotate: rotLeft, transformOrigin: "0% 37%" }}
          />
        </motion.div>

        <motion.div
          className="absolute z-20 w-[68vw] md:w-[min(40vw,80vh)]"
          style={{ right: "-2vw", top: "-2vw" }}
          initial={{ opacity: 0, x: 34 }}
          animate={exiting ? { opacity: 0, x: 46 } : sceneReady ? { opacity: 1, x: reduce ? 0 : -10 } : { opacity: 0, x: 34 }}
          transition={exiting ? { duration: 0.9, ease: "easeIn" } : sceneReady ? { x: { duration: seconds + 1, ease: "linear" }, opacity: fade(0.9, 1.9) } : fade(0.9, 1.9)}
        >
          <motion.img
            src={asset(SCENE.right)}
            alt=""
            draggable={false}
            className="block h-auto w-full select-none"
            style={{ rotate: rotRight, transformOrigin: "100% 20%" }}
          />
        </motion.div>

        {/* 5. The message, brushed in letter by letter once the scene has settled */}
        <motion.div
          className="absolute left-1/2 top-[53%] z-10 -translate-x-1/2 md:top-[58%]"
          initial={{ opacity: 1 }}
          animate={exiting ? { opacity: 0 } : reduce ? { opacity: 1 } : { opacity: [1, 0.62, 1] }}
          transition={exiting ? { duration: 0.35 } : { duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 3.8 }}
        >
          <p
            aria-label={MESSAGE}
            className="font-jp whitespace-nowrap pl-[0.32em] text-[clamp(1.1rem,2.4vw,1.55rem)] font-medium tracking-[0.32em]"
            style={{
              color: INK,
              fontFamily: `"${MESSAGE_FONT}", var(--font-jp)`,
              textShadow: `0 0 18px ${PAPER_LOW}, 0 0 6px ${PAPER_LOW}`,
            }}
          >
            {Array.from(MESSAGE).map((char, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={sceneReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(6px)" }}
                transition={{ duration: reduce ? 0.3 : 0.9, delay: reduce ? 0 : 2.1 + i * 0.075, ease: EASE }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

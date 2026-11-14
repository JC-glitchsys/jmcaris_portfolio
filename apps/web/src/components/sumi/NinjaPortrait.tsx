import { useCallback, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { asset, usePrefersReducedMotion } from "./hooks";

/*
  A standalone piece of ink artwork: no card, no frame, transparent background.
  The body and separately cut kasa hat share the same 900 × 984 canvas, so they
  stay perfectly aligned. Keep the hat still to avoid exposing the cut edge.
  Eyelid positions are percentages of the source.

  Idle life (all transform-only, off under reduced motion): float, slow side-to-side sway, breathing,
  blinking, and two loose hair tufts (trailing hair + ribbon, and the strands at her right) that drift
  in a light breeze. The tufts are the SAME body artwork, cut with clip paths: the static body hides
  those regions and a copy swings gently inside them, pivoting where the hair joins the bun/hat.
*/
type Pt = [number, number];
const W = 900;
const H = 984;
const path = (pts: Pt[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${(x / W).toFixed(4)} ${(y / H).toFixed(4)}`).join(" ") + "Z";

// regions the static body gives up (px of the 900 x 984 source)
const HAIR_L: Pt[] = [[0, 320], [232, 320], [232, 440], [330, 470], [345, 770], [0, 770]];
const HAIR_R: Pt[] = [[640, 296], [740, 296], [740, 560], [640, 560]];
// the swinging copies cover slightly more, so no seam shows
const HAIR_L_COVER: Pt[] = [[0, 312], [238, 312], [238, 436], [336, 466], [352, 778], [0, 778]];
const HAIR_R_COVER: Pt[] = [[634, 290], [748, 290], [748, 568], [634, 568]];

const BASE_CLIP = "ninja-clip-base";
const HAIR_L_CLIP = "ninja-clip-hair-l";
const HAIR_R_CLIP = "ninja-clip-hair-r";

const EYES = [
  { left: "52.8%", top: "28.7%", width: "6.5%", height: "2.6%", rotate: 5 },
  { left: "63.7%", top: "29.3%", width: "5.7%", height: "2.75%", rotate: 8 },
];

export default function NinjaPortrait({ play }: { play: boolean }) {
  const reduce = usePrefersReducedMotion();
  const eyeA = useAnimationControls();
  const eyeB = useAnimationControls();

  const blink = useCallback(() => {
    const t = { duration: 0.26, times: [0, 0.5, 1], ease: "easeInOut" as const };
    void eyeA.start({ scaleY: [0, 1, 0], transition: t });
    void eyeB.start({ scaleY: [0, 1, 0], transition: t });
  }, [eyeA, eyeB]);

  useEffect(() => {
    if (reduce || !play) return;
    const id = window.setInterval(blink, 4600);
    return () => window.clearInterval(id);
  }, [reduce, play, blink]);

  return (
    <motion.div
      className="relative mx-auto w-[min(72%,300px)] md:w-[min(100%,420px)] lg:w-[min(100%,490px)]"
      style={{ aspectRatio: "900 / 984" }}
      initial={{ opacity: 0, y: 36 }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 1.3, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onPointerEnter={() => {
        if (!reduce && play) blink();
      }}
    >
      {/* soft ink pool under her feet */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 left-[14%] right-[14%] h-6 rounded-[50%] blur-xl"
        style={{ background: "rgba(var(--ink-rgb), 0.16)" }}
      />

      {!reduce && (
        <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={BASE_CLIP} clipPathUnits="objectBoundingBox">
              <path clipRule="evenodd" d={`M0 0H1V1H0Z ${path(HAIR_L)} ${path(HAIR_R)}`} />
            </clipPath>
            <clipPath id={HAIR_L_CLIP} clipPathUnits="objectBoundingBox">
              <path d={path(HAIR_L_COVER)} />
            </clipPath>
            <clipPath id={HAIR_R_CLIP} clipPathUnits="objectBoundingBox">
              <path d={path(HAIR_R_COVER)} />
            </clipPath>
          </defs>
        </svg>
      )}

      {/* gentle float */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
       {/* slow side-to-side sway, pivoting near her base */}
       <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: "50% 94%" }}
        animate={reduce ? undefined : { rotate: [-0.7, 0.7, -0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
       >
        {/* breathing */}
        <motion.div
          className="absolute inset-0"
          style={{ transformOrigin: "50% 100%" }}
          animate={reduce ? undefined : { scaleY: [1, 1.012, 1], scaleX: [1, 1.004, 1] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        >
        <img
          src={asset("images/ninja-body.webp")}
          alt="Sumi-e ink painting of a ninja girl in a kasa hat and black mask"
          width={900}
          height={984}
          className="absolute inset-0 h-full w-full select-none object-contain"
          style={reduce ? undefined : { clipPath: `url(#${BASE_CLIP})` }}
          draggable={false}
        />
        {!reduce && (
          <>
            {/* trailing hair + gold ribbon */}
            <div className="pointer-events-none absolute inset-0" style={{ clipPath: `url(#${HAIR_L_CLIP})` }} aria-hidden="true">
              <motion.img
                src={asset("images/ninja-body.webp")}
                alt=""
                width={900}
                height={984}
                className="absolute inset-0 h-full w-full select-none object-contain"
                style={{ transformOrigin: "35.6% 47.8%" }}
                animate={{ rotate: [0, -1.7, 0.5, 0], skewX: [0, 0.5, -0.2, 0] }}
                transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", times: [0, 0.42, 0.78, 1] }}
                draggable={false}
              />
            </div>
            {/* loose strands at her right */}
            <div className="pointer-events-none absolute inset-0" style={{ clipPath: `url(#${HAIR_R_CLIP})` }} aria-hidden="true">
              <motion.img
                src={asset("images/ninja-body.webp")}
                alt=""
                width={900}
                height={984}
                className="absolute inset-0 h-full w-full select-none object-contain"
                style={{ transformOrigin: "73.3% 30.5%" }}
                animate={{ rotate: [0, 1.5, -0.4, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.8, 1], delay: 0.8 }}
                draggable={false}
              />
            </div>
          </>
        )}
        <img
          src={asset("images/ninja-hat.webp")}
          alt=""
          aria-hidden="true"
          width={900}
          height={984}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          draggable={false}
        />
        {EYES.map((eye, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute block rounded-[50%]"
            style={{
              left: eye.left,
              top: eye.top,
              width: eye.width,
              height: eye.height,
              rotate: eye.rotate,
              transformOrigin: "top",
              background: "#d5c6b6",
              borderBottom: "1.5px solid #1a1a1a",
            }}
            initial={{ scaleY: 0 }}
            animate={i === 0 ? eyeA : eyeB}
          />
        ))}
        </motion.div>
       </motion.div>
      </motion.div>
    </motion.div>
  );
}

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";

/** One imperfect, hand-drawn enso (viewBox 0 0 400 340). */
export const ENSO_PATH =
  "M262 40 C150 -5 20 70 28 170 C36 270 150 330 250 300 C340 272 372 190 352 120 C338 72 300 44 262 52";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ───────── Thin ink brush divider with a gold centre ───────── */
export function SumiDivider() {
  return (
    <motion.div
      aria-hidden="true"
      className="mx-auto my-2 w-full max-w-5xl"
      style={{ color: "var(--brush)" }}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.5, ease: EASE }}
    >
      <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="block h-5 w-full">
        <path
          className="sumi-dry"
          d="M0 15 C150 13 330 17 560 14 C760 11 980 16 1200 14.5 C980 17.5 780 16 560 16.5 C330 18 150 16.5 0 15Z"
          fill="currentColor"
          opacity="0.32"
        />
        <path d="M470 15.4 C540 13.6 660 17 730 15" stroke="#c9a96a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

/* ───────── Brush stroke that draws left → right (for titles) ───────── */
const strokeVariants: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.9, ease: EASE } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function InkStroke({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      variants={strokeVariants}
      viewBox="0 0 240 14"
      className={`block h-3 w-48 ${className}`}
      style={{ color: "var(--brush)" }}
      aria-hidden="true"
    >
      <path
        className="sumi-dry"
        d="M2 8 C40 4 90 10 130 6 C170 3 205 8 238 6 C205 10 170 9 130 9.5 C90 11 40 9 2 8Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path d="M96 7.4 C112 6.4 132 8 148 7" stroke="#c9a96a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </motion.svg>
  );
}

/** Section title: label → brush stroke draws → title fades in → subtitle. */
export function SectionHeading({
  eyebrow,
  icon,
  children,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  icon?: ReactNode;
  children: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <motion.div
      className={`mb-12 flex flex-col ${center ? "items-center text-center" : "items-start"}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.28 }}
    >
      <motion.div variants={riseVariants} className="mb-6 flex items-center">
        <span className="sumi-pill">
          {icon}
          <span className="sumi-label">{eyebrow}</span>
        </span>
      </motion.div>
      <InkStroke className="mb-6" />
      <motion.h2 variants={riseVariants} className="sumi-h2">
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p variants={riseVariants} className={`sumi-text mt-8 max-w-xl ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

/** Brush stroke draws first, then the title fades in (for titles that live inside a layout column). */
export function InkTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.3 }}
    >
      <InkStroke className="mb-5" />
      <motion.h2 variants={riseVariants} className={`sumi-h2 ${className}`}>
        {children}
      </motion.h2>
    </motion.div>
  );
}

/** Rise + fade, like ink appearing on paper. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ───────── One single bamboo branch; grows bottom → top, then sways very slightly ───────── */
export function Bamboo({
  className = "",
  flip = false,
  opacity = 0.2,
  delay = 0,
  sway = 1,
}: {
  className?: string;
  flip?: boolean;
  opacity?: number;
  /** Seconds to wait before it starts growing. */
  delay?: number;
  /** Sway amount in degrees; 0 turns it off. */
  sway?: number;
}) {
  const reduce = useReducedMotion();
  const nodes = [548, 398, 258, 128];
  const leaf = "M0 0 C34 -14 78 -8 112 14 C80 4 36 6 0 0Z";
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ color: "var(--brush)", opacity, scaleX: flip ? -1 : 1 }}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 2.6, delay, ease: EASE }}
    >
      <motion.div
        className="h-full w-full"
        style={{ transformOrigin: "50% 100%" }}
        animate={reduce || !sway ? undefined : { rotate: [0, sway, 0, -sway * 0.7, 0] }}
        transition={{ duration: 8 + (delay * 7) % 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 150 700" className="h-full w-full">
          <g className="sumi-dry-v" fill="currentColor">
            <path d="M64 700 L62 556 L76 556 L77 700Z" />
            <path d="M62 542 L60 404 L74 404 L75 542Z" />
            <path d="M60 392 L58 264 L71 264 L72 392Z" />
            <path d="M58 252 L57 134 L69 134 L70 252Z" />
            <path d="M57 122 L56 18 L67 18 L68 122Z" />
            {nodes.map((y) => (
              <rect key={y} x="55" y={y - 2} width="24" height="4" rx="1.5" />
            ))}
            <g transform="translate(70 258) rotate(-18)"><path d={leaf} /></g>
            <g transform="translate(60 128) scale(-1 1) rotate(-14)"><path d={leaf} /></g>
            <g transform="translate(68 126) rotate(-30) scale(.8)"><path d={leaf} /></g>
            <g transform="translate(60 398) scale(-1 1) rotate(-22) scale(.75)"><path d={leaf} /></g>
            <g transform="translate(62 20) scale(-1 1) rotate(-8) scale(.7)"><path d={leaf} /></g>
            <g transform="translate(66 22) rotate(-24) scale(.7)"><path d={leaf} /></g>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/**
 * Bamboo growing around the Tools & Technologies section: groves in the lower corners,
 * a thin stalk on each side, and a few short shoots beside the heading.
 * Sits behind the cards (z-0), is decorative only, and the big groves hide on small screens.
 */
export function BambooGrove() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {/* heading side: short shoots */}
      <Bamboo className="absolute right-1 top-12 hidden h-[250px] w-14 md:block lg:right-6" opacity={0.2} />
      <Bamboo className="absolute right-[3.6rem] top-24 hidden h-[170px] w-10 sm:block lg:right-[5.6rem]" opacity={0.13} flip delay={0.5} sway={1.4} />
      <Bamboo className="absolute right-[6.2rem] top-[8.5rem] hidden h-[110px] w-7 sm:block lg:right-[9.2rem]" opacity={0.1} delay={0.9} sway={1.8} />

      {/* lower left grove */}
      <Bamboo className="absolute -left-2 bottom-2 hidden h-[360px] w-[78px] lg:block" opacity={0.17} delay={0.2} />
      <Bamboo className="absolute left-9 bottom-0 hidden h-[260px] w-14 lg:block" opacity={0.12} flip delay={0.7} sway={1.3} />
      <Bamboo className="absolute left-[4.4rem] bottom-1 hidden h-[170px] w-10 xl:block" opacity={0.09} delay={1.1} sway={1.7} />

      {/* lower right grove */}
      <Bamboo className="absolute -right-2 bottom-2 hidden h-[320px] w-[70px] lg:block" opacity={0.16} flip delay={0.4} />
      <Bamboo className="absolute right-10 bottom-0 hidden h-[230px] w-12 lg:block" opacity={0.11} delay={0.9} sway={1.3} />
      <Bamboo className="absolute right-[4.6rem] bottom-1 hidden h-[150px] w-9 xl:block" opacity={0.08} flip delay={1.2} sway={1.7} />

      {/* mid-height stalk on the left edge, so the sides don't feel empty above the groves */}
      <Bamboo className="absolute -left-3 top-[34%] hidden h-[190px] w-10 xl:block" opacity={0.1} flip delay={0.6} sway={1.5} />
    </div>
  );
}

/* ───────── Gold + ink scroll progress ───────── */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70]" aria-hidden="true">
      <motion.div
        className="sumi-dry h-[3px] origin-left"
        style={{ scaleX, background: "var(--brush)", opacity: 0.85 }}
      />
      <motion.div className="h-px origin-left" style={{ scaleX, background: "var(--gold)" }} />
    </div>
  );
}

/** One black ink crow in flight (viewBox 0 0 200 120). Wing pivots match the .crow-wing-* rules in global.css. */
export function Crow({ className = "", flap = true }: { className?: string; flap?: boolean }) {
  return (
    <svg viewBox="0 0 200 120" className={className} style={{ color: "var(--brush)" }} aria-hidden="true" focusable="false">
      <g className="sumi-crow" fill="currentColor">
        <path className={flap ? "crow-wing-up" : undefined} d="M98 53 C100 30 84 12 52 6 C64 20 66 36 70 56Z" />
        <path d="M54 74 L12 86 L22 77 L8 76 L52 69Z" />
        <path d="M52 74 C70 58 100 52 128 54 C140 55 150 52 158 56 L178 61 L158 65 C150 69 140 72 124 76 C104 82 76 84 52 74Z" />
        <path className={flap ? "crow-wing-down" : undefined} d="M94 62 C84 80 66 100 38 108 C56 92 62 78 70 64Z" />
      </g>
      <circle cx="147" cy="57" r="1.6" fill="#c9a96a" />
    </svg>
  );
}

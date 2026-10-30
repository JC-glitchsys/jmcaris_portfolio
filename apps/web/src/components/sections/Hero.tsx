import { useCallback, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Check, Image as ImageIcon, Plus, UserRound } from "lucide-react";

const entrance = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

/*
  ID card on a lanyard. It sways gently on its own, and you can drag it sideways:
  it swings with your pointer and wobbles back to rest when you let go.
*/
function IdCard() {
  const reduceMotion = useReducedMotion();
  const rotate = useMotionValue(0);
  const idle = useRef<ReturnType<typeof animate> | null>(null);
  const spring = useRef<ReturnType<typeof animate> | null>(null);

  const startIdle = useCallback(() => {
    if (reduceMotion) return;
    idle.current?.stop();
    idle.current = animate(rotate, [0, 1.8, 0, -1.8, 0], {
      duration: 7,
      ease: "easeInOut",
      repeat: Infinity,
    });
  }, [reduceMotion, rotate]);

  useEffect(() => {
    startIdle();
    return () => {
      idle.current?.stop();
      spring.current?.stop();
    };
  }, [startIdle]);

  const handlePanStart = () => {
    idle.current?.stop();
    spring.current?.stop();
  };

  const handlePan = (_: PointerEvent, info: PanInfo) => {
    if (reduceMotion) return;
    rotate.set(Math.max(-14, Math.min(14, info.offset.x / 8)));
  };

  const handlePanEnd = (_: PointerEvent, info: PanInfo) => {
    if (reduceMotion) return;
    spring.current = animate(rotate, 0, {
      type: "spring",
      stiffness: 70,
      damping: 4,
      velocity: info.velocity.x / 8,
    });
    spring.current.then(startIdle);
  };

  return (
    <motion.div
      style={{ rotate, transformOrigin: "50% 0%" }}
      onPanStart={handlePanStart}
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      className="relative flex w-[min(340px,100%)] cursor-grab touch-pan-y select-none flex-col items-center active:cursor-grabbing sm:w-[355px]"
    >
      {/* Lanyard strap: its top end tucks under the header so the card hangs from it */}
      <div
        aria-hidden="true"
        className="-mt-[96px] h-[152px] w-7 border-x border-sky-500/40 bg-sky-400 sm:-mt-[112px] sm:h-[200px]"
      >
        <div className="mx-auto h-full w-px bg-white/50" />
      </div>

      {/* Metal clip */}
      <div
        aria-hidden="true"
        className="relative z-10 -mb-5 flex h-10 w-12 items-start justify-center rounded-lg border border-slate-300 bg-gradient-to-b from-slate-100 to-slate-300 pt-2.5"
      >
        <div className="h-2.5 w-7 rounded-full border border-slate-400/60 bg-slate-200" />
      </div>

      {/* ID card */}
      <article className="relative w-full rounded-[28px] border border-slate-200 bg-white p-3 pt-8 sm:p-3.5 sm:pt-9">
        {/* Punched slot */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[22px] h-2 w-16 -translate-x-1/2 rounded-full border border-slate-200 bg-slate-100"
        />

        {/* Portrait */}
        <div className="overflow-hidden rounded-[19px] bg-sky-50">
          <img
            src="/images/creative-blue.jpg"
            alt="Portrait of Jonaidah Caris"
            width={350}
            height={330}
            draggable={false}
            className="h-[300px] w-full object-cover object-top sm:h-[325px]"
          />
        </div>

        {/* Name and role */}
        <div className="px-2.5 pt-5">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-sky-600">Jonaidah Caris</h2>
            <span
              role="img"
              aria-label="Portfolio owner"
              className="flex size-[21px] shrink-0 items-center justify-center rounded-full bg-sky-500 text-white"
            >
              <Check size={13} strokeWidth={3} aria-hidden="true" />
            </span>
          </div>

          <p className="mt-2 text-base leading-7 text-slate-600">
            Frontend developer and creative enthusiast who loves clean interfaces and thoughtful
            design.
          </p>
        </div>

        {/* Card actions */}
        <div className="mt-5 flex items-center justify-between gap-3 px-2 pb-2">
          <div className="flex items-center gap-4 sm:gap-5">
            <a
              href="#projects"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-sky-700"
            >
              <UserRound className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
              Work
            </a>
            <a
              href="#art"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-sky-700"
            >
              <ImageIcon className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
              Art
            </a>
          </div>

          <a
            href="#projects"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sky-200 bg-sky-200 px-4 py-3 text-sm font-semibold text-[#343a40] transition-colors duration-200 hover:border-sky-300 hover:bg-sky-300"
          >
            Explore
            <Plus size={17} aria-hidden="true" />
          </a>
        </div>
      </article>
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="grid items-center gap-12 py-16 sm:py-20 md:min-h-[640px] md:grid-cols-[1fr_0.95fr] md:gap-10 lg:gap-14">
      {/* Introduction */}
      <motion.div
        className="order-2 md:order-1"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entrance}
      >
        {/* Role label */}
        <p className="mb-7 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium tracking-wide text-slate-600">
          <span aria-hidden="true" className="size-2 rounded-full bg-sky-500" />
          UI/UX Designer
          <span aria-hidden="true" className="text-slate-300">|</span>
          Frontend Developer
          <span aria-hidden="true" className="text-slate-300">|</span>
          Layout Artist
        </p>

        {/* Name graphic */}
        <h1 className="max-w-xl">
          <img
            src="/images/jcaris.png"
            alt="Jonaidah Caris"
            decoding="async"
            fetchPriority="high"
            className="block h-auto w-full max-w-[580px] object-contain object-left"
          />
        </h1>

        <p className="mt-6 max-w-[480px] text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          Hi, I'm Jonaidah Caris. I enjoy creating thoughtful digital experiences through frontend
          development, clean interfaces, and visual design.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-200 px-6 py-3.5 text-base font-semibold text-[#343a40] transition-colors duration-200 hover:border-sky-300 hover:bg-sky-300"
          >
            Explore my work
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-medium text-slate-600 transition-colors duration-200 hover:border-sky-200 hover:text-slate-900"
          >
            About me
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>

      {/* ID card on a lanyard */}
      <motion.div
        className="order-1 flex justify-center md:order-2 md:self-start"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...entrance, delay: 0.08 }}
      >
        <IdCard />
      </motion.div>
    </section>
  );
}
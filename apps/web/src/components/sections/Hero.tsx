
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const entranceTransition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <section className="grid items-center gap-12 py-16 sm:py-20 md:min-h-[640px] md:grid-cols-[1fr_0.95fr] md:gap-10 lg:gap-14">

      {/* Introduction */}
      <motion.div
        className="order-2 md:order-1"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={entranceTransition}
      >
        {/* Role label */}
        <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium tracking-wide text-slate-600">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-sky-500"
          />
          UI/UX Designer
          <span className="text-slate-300">|</span>
          Frontend Developer
          <span className="text-slate-300">|</span>
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

        {/* Introduction text */}
        <p className="mt-6 max-w-[460px] text-base leading-8 text-slate-600 sm:text-[17px]">
          Hi, I'm Jonaidah Caris. I enjoy creating thoughtful digital
          experiences through frontend development, clean interfaces,
          and visual design.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-200 px-6 py-3.5 text-sm font-semibold text-[#343a40] transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-300"
          >
            Explore my work
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-sky-200 hover:text-slate-900"
          >
            About me
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>
      </motion.div>

      {/* Portrait card */}
      <motion.div
        className="order-1 flex justify-center md:order-2"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ...entranceTransition,
          delay: 0.08,
        }}
      >
        <article className="w-[min(340px,100%)] rounded-[28px] border border-slate-200 bg-white p-3 sm:w-[355px] sm:p-3.5">

          {/* Portrait */}
          <div className="overflow-hidden rounded-[19px] bg-sky-50">
            <img
              src="/images/creative-blue.jpg"
              alt="Portrait of Jonaidah Caris"
              width={350}
              height={330}
              className="h-[300px] w-full object-cover object-top sm:h-[325px]"
            />
          </div>

          {/* Profile information */}
          <div className="px-2.5 pt-5">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-sky-600">
                Jonaidah Caris
              </h2>

              <span
                role="img"
                aria-label="Portfolio owner"
                className="flex size-[19px] shrink-0 items-center justify-center rounded-full bg-sky-500 text-white"
              >
                <Check size={12} strokeWidth={3} aria-hidden="true" />
              </span>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Frontend developer and creative enthusiast who loves clean
              interfaces and thoughtful design.
            </p>
          </div>

          {/* Card actions */}
          <div className="mt-5 flex items-center justify-between gap-3 px-2 pb-2">
            <div className="flex items-center gap-4 sm:gap-5">

              <a
                href="#projects"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-sky-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="size-[17px]"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.4-4 3-6 7-6s6.6 2 7 6" />
                </svg>
                Work
              </a>

              <a
                href="#art"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-sky-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="size-[17px]"
                  aria-hidden="true"
                >
                  <rect x="4" y="4" width="13" height="13" rx="2" />
                  <path d="M8 20h10a2 2 0 0 0 2-2V8" />
                  <path d="m7 13 3-3 2 2 3-4" />
                </svg>
                Art
              </a>
            </div>

            <a
              href="#projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sky-200 bg-sky-200 px-4 py-3 text-xs font-semibold text-[#343a40] transition-all duration-200 hover:border-sky-300 hover:bg-sky-300"
            >
              Explore
              <Plus size={16} aria-hidden="true" />
            </a>
          </div>
        </article>
      </motion.div>
    </section>
  );
}

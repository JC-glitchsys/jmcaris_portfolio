import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";

/*
  Structure note: the dark theme styles "section#art > div" (see global.css), so the card
  wrapper stays the direct child of the section.
*/
export default function Creative() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="art" aria-labelledby="art-heading" className="scroll-mt-20 py-8 sm:py-12">
      <motion.div
        className="grid gap-8 rounded-[28px] border border-slate-200 bg-white p-6 sm:p-10 md:grid-cols-[1fr_0.85fr] md:items-center"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="py-3">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">
            <Sparkles size={15} className="text-sky-600" aria-hidden="true" />
            Creative Side
          </p>
          <h2
            id="art-heading"
            className="max-w-md text-4xl font-semibold leading-tight tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Not everything is <span className="text-sky-600">just code.</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
            My creative side is where I explore art, visual ideas, publication layouts, and design
            details that inspire the way I build digital experiences.
          </p>
          <a
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-slate-700 underline decoration-sky-200 decoration-2 underline-offset-4 transition-colors hover:text-sky-700 hover:decoration-sky-600"
          >
            Let's create something <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div
          aria-hidden="true"
          className="flex min-h-[260px] items-center justify-center rounded-2xl border border-slate-100 bg-sky-50"
        >
          <div className="flex size-36 -rotate-[7deg] items-center justify-center rounded-[30px] border border-sky-200 bg-white">
            <Sparkles size={64} strokeWidth={1.2} className="text-sky-700" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

/* Sky-blue accent word or full stop inside a heading. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="text-sky-600 group-data-[tone=inverse]/header:text-sky-200">{children}</span>
  );
}

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  icon?: LucideIcon;
  title: ReactNode;
  subtitle?: string;
  /* "inverse" is for headings on a dark or saturated blue background. */
  tone?: "default" | "inverse";
  className?: string;
};

/* Centered section title: pill label, big heading, short subtitle. */
export default function SectionHeader({
  id,
  eyebrow,
  icon: Icon,
  title,
  subtitle,
  tone = "default",
  className = "",
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();
  const inverse = tone === "inverse";

  return (
    <motion.header
      data-tone={tone}
      className={`group/header mx-auto max-w-3xl text-center ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p
        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] ${
          inverse ? "border-white/40 bg-white/15 text-white" : "border-slate-200 bg-white text-slate-600"
        }`}
      >
        {Icon && (
          <Icon size={15} className={inverse ? "text-white" : "text-sky-600"} aria-hidden="true" />
        )}
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl ${
          inverse ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-xl text-base leading-7 sm:text-lg ${
            inverse ? "text-sky-50" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
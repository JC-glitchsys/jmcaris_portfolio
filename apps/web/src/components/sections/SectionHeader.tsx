import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { revealProps } from "@/lib/reveal";

/* Sky-blue accent word or full stop inside a heading. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="not-italic text-sky-600">{children}</em>;
}

export default function SectionHeader({
  id,
  eyebrow,
  icon: Icon,
  title,
  subtitle,
}: {
  id: string;
  eyebrow: string;
  icon?: LucideIcon;
  title: ReactNode;
  subtitle?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header className="text-center" {...revealProps(reduceMotion)}>
      <p className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2.5 text-base font-medium text-slate-700">
        {Icon && <Icon size={18} className="text-sky-600" aria-hidden="true" />}
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-slate-900 sm:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-xl text-slate-600 sm:text-2xl">{subtitle}</p>
      )}
    </motion.header>
  );
}
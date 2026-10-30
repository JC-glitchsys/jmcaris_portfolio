import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-sky-600">{children}</span>
}

type SectionHeaderProps = {
  id: string
  eyebrow: string
  icon?: LucideIcon
  title: ReactNode
  subtitle?: string
  className?: string
}

export default function SectionHeader({
  id,
  eyebrow,
  icon: Icon,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.header
      className={`mx-auto max-w-3xl text-center ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">
        {Icon && <Icon size={15} className="text-sky-600" aria-hidden="true" />}
        {eyebrow}
      </p>
      <h2
        id={id}
        className="text-4xl font-semibold leading-tight tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.header>
  )
}
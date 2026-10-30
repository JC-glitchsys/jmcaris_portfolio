import { Layers3 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import PageStack from "@/components/sections/PageStack";
import SectionHeader, { Accent } from "@/components/sections/SectionHeader";

/*
  Card tones. Soft versions of the Figma blue / green / orange cards so white stays
  dominant on the page. Class names are written out in full so Tailwind can find them.
*/
const tones = {
  sky: {
    card: "bg-sky-200",
    fade: "from-sky-200/0 via-sky-200/90 to-sky-200",
  },
  emerald: {
    card: "bg-emerald-200",
    fade: "from-emerald-200/0 via-emerald-200/90 to-emerald-200",
  },
  orange: {
    card: "bg-orange-200",
    fade: "from-orange-200/0 via-orange-200/90 to-orange-200",
  },
} as const;

type FolderItem = {
  title: string;
  description: string;
  href: string;
  tone: keyof typeof tones;
};

const folders: FolderItem[] = [
  {
    title: "Visual & Editorial",
    description: "Layouts, pubmats, and publication releases.",
    href: "/visual-editorial",
    tone: "sky",
  },
  {
    title: "UI/UX Design",
    description: "Interfaces, prototypes, and design systems.",
    href: "/ui-ux-design",
    tone: "emerald",
  },
  {
    title: "Frontend Projects",
    description: "React websites and interactive experiences.",
    href: "/frontend-projects",
    tone: "orange",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function ThingsImBuilding() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-20 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionHeader
          id="projects-heading"
          icon={Layers3}
          eyebrow="Creative Space"
          title={
            <>
              Things I’m <Accent>Building.</Accent>
            </>
          }
          subtitle="My Projects. Ideas Brought to Life."
        />

        <motion.ul
          className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {folders.map((folder, index) => {
            const tone = tones[folder.tone];
            return (
              <li
                key={folder.href}
                className={
                  index === 2
                    ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                    : undefined
                }
              >
                <motion.a
                  href={folder.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`group relative isolate block h-80 overflow-hidden rounded-[40px] border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${tone.card}`}
                >
                  <PageStack className="left-1/2 top-7 -translate-x-1/2" />

                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b ${tone.fade}`}
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-start justify-between gap-4 p-6 sm:p-7">
                    <div className="min-w-0">
                      <h3 className="text-xl font-medium text-[#343a40]">
                        {folder.title}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </h3>
                      <p className="mt-2 text-sm leading-5 text-[#495057]">{folder.description}</p>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/5 bg-[#ffffff] text-[#343a40] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-300 group-hover:bg-[#343a40] group-hover:text-white motion-reduce:transition-none">
                      <ArrowIcon />
                    </span>
                  </div>
                </motion.a>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
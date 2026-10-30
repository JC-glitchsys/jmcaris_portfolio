import { Layers3 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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

function Bar({ className }: { className: string }) {
  return <div className={`rounded-2xl bg-[#ededed] ${className}`} />;
}

/* One sheet of the fanned stack from the Figma card: a small page made of placeholder bars. */
function Page({
  className,
  bar,
  dot,
}: {
  className: string;
  bar: string;
  dot: string;
}) {
  return (
    <div
      className={`absolute h-60 w-52 overflow-hidden rounded-md border border-black/10 bg-[#ffffff] px-2 pb-3 pt-4 ${className}`}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <Bar className={`w-10 ${bar}`} />
            <Bar className={`flex-1 ${bar}`} />
          </div>
          <Bar className={`w-full ${bar}`} />
          <Bar className={`w-full ${bar}`} />
        </div>
        <div className="flex flex-col gap-1">
          <Bar className={`w-full ${bar}`} />
          <Bar className={`w-full ${bar}`} />
          <Bar className={`w-full ${bar}`} />
        </div>
        <div className="flex items-center gap-1">
          <div className={`size-4 rounded-full ${dot}`} />
          <Bar className={`w-8 ${bar}`} />
        </div>
      </div>
    </div>
  );
}

function PageStack() {
  return (
    <div aria-hidden="true" className="absolute left-1/2 top-7 h-64 w-72 -translate-x-1/2">
      <Page
        bar="h-5"
        dot="bg-[#ea3e83]"
        className="left-0 top-[23px] origin-top-left -rotate-[6.52deg] transition-transform duration-300 motion-safe:group-hover:-rotate-[9deg]"
      />
      <Page
        bar="h-4"
        dot="bg-[#be79f0]"
        className="left-[42px] top-[17px] origin-top-left -rotate-[3.26deg] transition-transform duration-300 motion-safe:group-hover:-rotate-[5deg]"
      />
      <Page bar="h-2.5" dot="bg-emerald-400" className="left-[84px] top-[11px]" />
    </div>
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
      <motion.div
        className="mx-auto max-w-[1440px]"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-center">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            <Layers3 size={16} className="text-sky-600" aria-hidden="true" />
            Creative Space
          </div>
          <h2
            id="projects-heading"
            className="text-4xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Things I’m <span className="text-sky-600">Building.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl lg:text-2xl">
            My Projects. Ideas Brought to Life.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
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
                  <PageStack />

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
        </ul>
      </motion.div>
    </section>
  );
}
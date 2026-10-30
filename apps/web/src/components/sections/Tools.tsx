
import { useState } from "react";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { Sparkles } from "lucide-react";

type Tool = {
  name: string;
  icon: string;
  note: string;
};

const tools: Tool[] = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", note: "Frontend" },
  { name: "Vue.js", icon: "https://cdn.simpleicons.org/vuedotjs/42B883", note: "Frontend" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", note: "Language" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", note: "Styling" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000", note: "React Framework" },
  { name: "shadcn/ui", icon: "https://cdn.simpleicons.org/shadcnui/000000", note: "UI Components" },
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", note: "Markup" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6", note: "Styling" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", note: "Runtime" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/000000", note: "Backend" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28", note: "Backend Services" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", note: "Database" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E", note: "UI/UX Design" },
  { name: "Canva", icon: "https://cdn.simpleicons.org/canva/00C4CC", note: "Graphic Design" },
  { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC", note: "Project Tracking" },
  { name: "Cypress", icon: "https://cdn.simpleicons.org/cypress/69D3A7", note: "Testing" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", note: "Version Control" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717", note: "Code Hosting" },
  { name: "TestRail", icon: "https://cdn.simpleicons.org/testrail/65C179", note: "Test Management" },
];

/* Show the first letter if an external logo fails to load. */
function ToolIcon({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span aria-hidden="true" className="text-sm font-semibold text-slate-500">
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      loading="lazy"
      decoding="async"
      className="size-6 object-contain"
      onError={() => setFailed(true)}
    />
  );
}

export default function Tools() {
  const reduceMotion = useReducedMotion();

  const revealTransition: Transition = {
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1],
  };

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 10 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: revealTransition,
  };

  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="scroll-mt-20 py-14 sm:py-16"
    >
      <motion.div className="mb-8" {...reveal}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">
          <Sparkles size={15} className="text-sky-600" aria-hidden="true" />
          Tools & Technologies
        </div>

        <h2
          id="tools-heading"
          className="text-4xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Tools I <span className="text-sky-600">Use.</span>
        </h2>

        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          The tools I use to design, build, and test.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        {...reveal}
      >
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-sky-200"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white">
              <ToolIcon name={tool.name} src={tool.icon} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {tool.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">{tool.note}</p>
            </div>
          </div>
        ))}

        {/* More soon */}
        <div className="flex min-h-[72px] items-center gap-3 rounded-2xl border border-dashed border-sky-200 bg-sky-50/40 px-4 py-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-5"
              aria-hidden="true"
            >
              <path
                d="M12 5v14M5 12h14"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">More soon</p>
            <p className="mt-1 text-xs text-slate-500">Currently Exploring</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

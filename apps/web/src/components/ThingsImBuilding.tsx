
import {
  ArrowUpRight,
  Search,
  Layers3,
  Palette,
  PanelsTopLeft,
  Code2,
} from "lucide-react";

const categories = [
  {
    number: "01",
    title: "Visual & Editorial",
    label: "VISUAL COMMUNICATION",
    description: "Layouts, pubmats, and publication releases.",
    icon: Palette,
    href: "/visual-editorial",
    preview: "editorial",
  },
  {
    number: "02",
    title: "UI/UX Design",
    label: "INTERFACE DESIGN",
    description: "Interfaces, prototypes, and design systems.",
    icon: PanelsTopLeft,
    href: "/ui-ux-design",
    preview: "interface",
  },
  {
    number: "03",
    title: "Frontend Projects",
    label: "DEVELOPMENT",
    description: "React websites and interactive experiences.",
    icon: Code2,
    href: "/frontend-projects",
    preview: "frontend",
  },
];

function FolderPreview({ type }: { type: string }) {
  return (
    <div className="group relative flex h-[205px] items-center justify-center overflow-hidden sm:h-[220px]">
      {/* Soft blue preview background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/90 via-blue-100/70 to-indigo-100/90 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-indigo-950/50" />

      {/* Dotted texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(59,130,246,0.5) 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-indigo-300/25 blur-3xl" />

      {/* Back sheet */}
      <div className="absolute left-[28%] top-[22%] h-[130px] w-[47%] rotate-[8deg] rounded-2xl border border-white/90 bg-white/65 shadow-[inset_0_2px_5px_rgba(255,255,255,0.95),0_12px_25px_rgba(30,64,175,0.10)] backdrop-blur-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-[12deg]" />

      {/* Main floating sheet */}
      <div className="absolute left-[16%] top-[13%] h-[150px] w-[59%] -rotate-[9deg] rounded-2xl border border-white/95 bg-gradient-to-br from-white/95 via-white/90 to-blue-50/90 p-3.5 shadow-[inset_0_2px_8px_rgba(255,255,255,1),inset_0_-5px_12px_rgba(147,197,253,0.18),0_18px_35px_rgba(30,64,175,0.15)] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:-rotate-[5deg] sm:p-4">
        <div className="mb-2.5 h-2 w-2/3 rounded-full bg-blue-100" />

        {type === "editorial" && (
          <>
            <div className="mb-2 text-[11px] font-bold leading-tight tracking-tight text-slate-800 sm:text-xs">
              BEYOND
              <br />
              THE PAGE
            </div>
            <div className="h-[55px] rounded-lg bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 shadow-[inset_0_2px_8px_rgba(255,255,255,0.65)] sm:h-[60px]" />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-slate-200" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-slate-100" />
          </>
        )}

        {type === "interface" && (
          <>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              <span className="h-2 w-2 rounded-full bg-indigo-300" />
            </div>
            <div className="mt-2.5 h-[62px] rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-[inset_0_2px_8px_rgba(255,255,255,0.75)] sm:h-[68px]" />
            <div className="mt-2 h-2 w-2/3 rounded-full bg-blue-100" />
            <div className="mt-1.5 h-2 w-1/2 rounded-full bg-slate-100" />
          </>
        )}

        {type === "frontend" && (
          <>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              <span className="h-2 w-2 rounded-full bg-indigo-300" />
            </div>
            <div className="mt-2.5 flex gap-2">
              <div className="h-[62px] flex-1 rounded-lg bg-gradient-to-br from-sky-200 to-blue-300 shadow-[inset_0_2px_8px_rgba(255,255,255,0.6)] sm:h-[68px]" />
              <div className="flex-1 space-y-2 pt-1.5">
                <div className="h-2 rounded-full bg-blue-100" />
                <div className="h-2 w-3/4 rounded-full bg-blue-100" />
                <div className="h-6 rounded-md bg-blue-400/70 shadow-[inset_0_1px_4px_rgba(255,255,255,0.35)]" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating mini preview */}
      <div className="absolute right-[10%] top-[28%] h-[108px] w-[33%] rotate-[9deg] rounded-2xl border border-white/95 bg-gradient-to-br from-white/95 to-blue-50/90 p-3 shadow-[inset_0_2px_8px_rgba(255,255,255,1),inset_0_-4px_10px_rgba(147,197,253,0.18),0_15px_30px_rgba(30,64,175,0.15)] backdrop-blur-xl transition-all duration-500 group-hover:translate-y-1 group-hover:rotate-[5deg] sm:h-[118px]">
        <div className="h-2 w-1/2 rounded-full bg-blue-100" />
        <div className="mt-2.5 h-[50px] rounded-lg bg-gradient-to-br from-blue-100 via-sky-200 to-indigo-200 shadow-[inset_0_2px_8px_rgba(255,255,255,0.75)] sm:h-[58px]" />
        <div className="mt-2 h-1.5 w-2/3 rounded-full bg-slate-200" />
      </div>

      {/* Glass folder front */}
      <div className="absolute inset-x-0 bottom-0 h-[62px] rounded-t-[26px] border-t border-white/80 bg-gradient-to-b from-white/45 to-white/25 shadow-[inset_0_3px_12px_rgba(255,255,255,0.8),inset_0_-8px_20px_rgba(96,165,250,0.10),0_-8px_25px_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:h-[70px]" />

      {/* Reflective highlight */}
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

      {/* Bottom glass reflection */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-white/5 to-white/25" />
    </div>
  );
}

export default function ThingsImBuilding() {
  return (
    <section
      id="creative-space"
      className="relative isolate mx-auto my-8 max-w-[1440px] overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#11151d] via-[#151c29] to-[#1c2940] px-5 py-16 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.03] sm:my-10 sm:rounded-[40px] sm:px-8 sm:py-20 lg:px-12"
    >
      {/* Rounded dark background */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-br from-[#11151d] via-[#151c29] to-[#1c2940]" />

      {/* Ambient blue glow */}
      <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-sky-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />

      {/* Decorative flowing lines */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-30"
        viewBox="0 0 1440 1200"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path
          d="M-100 430 C200 200 350 720 650 430 S1100 250 1540 500"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
        <path
          d="M-100 800 C250 550 450 1020 760 750 S1200 650 1540 880"
          stroke="rgba(147,197,253,0.45)"
          strokeWidth="1.5"
        />
        <path
          d="M-100 1050 C250 800 500 1200 800 980 S1200 850 1540 1100"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl">
              <Layers3 size={14} />
              Creative Space
            </div>

         

            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Things I’m{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Building.
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              Designing ideas. Building experiences.
            </p>
          </div>

          
        </div>

        {/* Three folder cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <a
              key={category.number}
              href={category.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Explore ${category.title} in a new tab`}
              className="group relative flex min-h-[350px] flex-col overflow-hidden rounded-[26px] border border-white/20 bg-white/[0.055] shadow-[inset_0_2px_2px_rgba(255,255,255,0.12),inset_0_-12px_28px_rgba(0,0,0,0.16),0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/[0.075] hover:shadow-[inset_0_2px_3px_rgba(255,255,255,0.18),inset_0_-14px_32px_rgba(0,0,0,0.18),0_22px_45px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {/* Shorter folder artwork */}
              <FolderPreview type={category.preview} />

              {/* Glass content area */}
              <div className="relative flex flex-1 flex-col border-t border-white/15 bg-gradient-to-b from-white/[0.055] to-white/[0.025] p-5 shadow-[inset_0_3px_14px_rgba(255,255,255,0.06),inset_0_-10px_20px_rgba(0,0,0,0.10)] backdrop-blur-2xl sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-slate-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),inset_0_-3px_7px_rgba(0,0,0,0.12)] backdrop-blur-xl">
                    <Search size={18} />
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-slate-200 shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-4px_8px_rgba(0,0,0,0.15)] backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-sky-400/50 group-hover:bg-sky-500 group-hover:text-white">
                    <ArrowUpRight size={22} />
                  </span>
                </div>

                <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-sky-300/80">
                  {category.label}
                </p>

                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

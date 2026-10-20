import { Layers3 } from "lucide-react";

type FolderItem = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  artwork: "editorial" | "uiux" | "frontend";
};

const folders: FolderItem[] = [
  {
    number: "01",
    eyebrow: "VISUAL COMMUNICATION",
    title: "Visual & Editorial",
    description: "Layouts, pubmats, and publication releases.",
    href: "/visual-editorial",
    artwork: "editorial",
  },
  {
    number: "02",
    eyebrow: "INTERFACE DESIGN",
    title: "UI/UX Design",
    description: "Interfaces, prototypes, and design systems.",
    href: "/ui-ux-design",
    artwork: "uiux",
  },
  {
    number: "03",
    eyebrow: "WEB DEVELOPMENT",
    title: "Frontend Projects",
    description: "React websites and interactive experiences.",
    href: "/frontend-projects",
    artwork: "frontend",
  },
];


function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-[21px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="10.8" cy="10.8" r="6.6" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function EditorialArtwork() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#DCEBFF] via-[#EEF5FF] to-[#C6DFFF] dark:from-slate-800 dark:via-slate-800 dark:to-slate-700">
      <div className="absolute left-[13%] top-[10%] h-[76%] w-[43%] -rotate-[9deg] rounded-lg border border-white/90 bg-white p-3 shadow-[0_12px_28px_rgba(47,91,151,0.13)] dark:border-white/10 dark:bg-slate-100">
        <div className="text-left text-[clamp(10px,1.7vw,17px)] font-semibold leading-[0.95] tracking-[-0.06em] text-slate-800">BEYOND<br />THE PAGE</div>
        <div className="mt-3 h-[48%] rounded-sm bg-gradient-to-br from-sky-200 via-blue-100 to-slate-200" />
        <div className="mt-2 h-1.5 w-[76%] rounded-full bg-slate-200" />
        <div className="mt-1.5 h-1.5 w-[54%] rounded-full bg-slate-100" />
      </div>
      <div className="absolute right-[13%] top-[20%] h-[62%] w-[32%] rotate-[9deg] rounded-lg border border-white/80 bg-white/90 p-2 shadow-lg dark:border-white/10 dark:bg-slate-200">
        <div className="h-[62%] rounded-md bg-gradient-to-br from-blue-200 to-sky-50" />
        <div className="mt-2 h-1.5 w-[82%] rounded-full bg-slate-200" />
        <div className="mt-1.5 h-1.5 w-[60%] rounded-full bg-slate-100" />
        <div className="mt-2 grid grid-cols-3 gap-1"><i className="h-5 rounded-sm bg-sky-100"/><i className="h-5 rounded-sm bg-blue-200"/><i className="h-5 rounded-sm bg-slate-100"/></div>
      </div>
      <div className="absolute bottom-[7%] left-[36%] h-[38%] w-[34%] rotate-[7deg] rounded-lg border border-white/90 bg-white/95 p-2 shadow-xl dark:border-white/10 dark:bg-slate-200">
        <div className="h-[70%] rounded-md bg-gradient-to-br from-blue-300 via-sky-100 to-indigo-100" />
        <div className="mt-2 h-1.5 w-[80%] rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function UiUxArtwork() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#DCEBFF] via-[#F1F6FF] to-[#D2E2FF] dark:from-slate-800 dark:via-slate-800 dark:to-indigo-950/60">
      <div className="absolute left-[9%] top-[17%] h-[70%] w-[74%] -rotate-[7deg] overflow-hidden rounded-xl border border-white/90 bg-white/90 p-3 shadow-xl dark:border-white/10 dark:bg-slate-200">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2"><i className="size-1.5 rounded-full bg-blue-300"/><i className="size-1.5 rounded-full bg-blue-200"/><i className="size-1.5 rounded-full bg-slate-200"/><div className="ml-2 h-2 flex-1 rounded-full bg-slate-100"/></div>
        <div className="mt-3 grid grid-cols-[0.7fr_1.3fr] gap-2"><div className="space-y-2 pt-1"><div className="h-2 rounded-full bg-blue-100"/><div className="h-2 w-3/4 rounded-full bg-slate-100"/><div className="h-2 rounded-full bg-slate-100"/><div className="mt-3 h-6 w-2/3 rounded-md bg-blue-300"/></div><div className="h-24 rounded-lg bg-gradient-to-br from-blue-200 via-sky-100 to-indigo-100"/></div>
        <div className="mt-3 flex gap-2"><div className="h-7 flex-1 rounded-md bg-slate-100"/><div className="h-7 flex-1 rounded-md bg-blue-100"/><div className="h-7 flex-1 rounded-md bg-slate-100"/></div>
      </div>
      <div className="absolute right-[7%] top-[28%] h-[60%] w-[30%] rotate-[6deg] rounded-[17px] border-2 border-white bg-white/95 p-2 shadow-[0_12px_30px_rgba(54,100,171,0.2)] dark:border-slate-500 dark:bg-slate-100">
        <div className="mx-auto mb-2 h-1 w-7 rounded-full bg-slate-200"/><div className="h-[48%] rounded-xl bg-gradient-to-br from-blue-200 to-indigo-100"/><div className="mt-2 h-2 rounded-full bg-slate-100"/><div className="mt-1.5 h-2 w-2/3 rounded-full bg-slate-100"/><div className="mt-3 flex gap-1"><i className="size-4 rounded-full bg-blue-300"/><i className="size-4 rounded-full bg-indigo-200"/><i className="size-4 rounded-full bg-slate-100"/></div>
      </div>
      <div className="absolute bottom-[8%] left-[27%] h-2 w-[38%] rounded-full bg-white/50 blur-sm" />
    </div>
  );
}

function FrontendArtwork() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#D8E9FF] via-[#EFF6FF] to-[#C6DCFF] dark:from-slate-800 dark:via-slate-800 dark:to-sky-950/60">
      <div className="absolute left-[8%] top-[19%] h-[70%] w-[73%] -rotate-[6deg] overflow-hidden rounded-xl border border-white bg-white shadow-xl dark:border-white/10 dark:bg-slate-200">
        <div className="flex h-7 items-center gap-1.5 border-b border-slate-100 px-3"><i className="size-1.5 rounded-full bg-blue-300"/><i className="size-1.5 rounded-full bg-slate-200"/><i className="size-1.5 rounded-full bg-slate-200"/><div className="ml-2 h-2 flex-1 rounded-full bg-slate-100"/></div>
        <div className="grid h-[calc(100%-28px)] grid-cols-[0.7fr_1.3fr] gap-3 p-3"><div className="space-y-2 pt-2"><div className="h-2 w-4/5 rounded-full bg-blue-200"/><div className="h-2 rounded-full bg-slate-100"/><div className="h-2 w-3/4 rounded-full bg-slate-100"/><div className="mt-4 h-7 w-4/5 rounded-md bg-blue-500"/><div className="h-2 rounded-full bg-slate-100"/><div className="h-2 w-2/3 rounded-full bg-slate-100"/></div><div className="rounded-lg bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-100"><div className="mt-[35%] h-[40%] bg-white/50"/></div></div>
      </div>
      <div className="absolute right-[8%] top-[12%] w-[34%] rounded-xl border border-slate-700/10 bg-slate-900 p-3 shadow-2xl">
        <div className="mb-3 flex gap-1"><i className="size-1.5 rounded-full bg-sky-400"/><i className="size-1.5 rounded-full bg-slate-500"/><i className="size-1.5 rounded-full bg-slate-600"/></div>
        <div className="space-y-2 font-mono text-[7px]"><div className="h-1.5 w-[70%] rounded-full bg-sky-300/90"/><div className="ml-3 h-1.5 w-[65%] rounded-full bg-indigo-300/80"/><div className="ml-3 h-1.5 w-[80%] rounded-full bg-slate-500"/><div className="h-1.5 w-[55%] rounded-full bg-sky-200/70"/><div className="ml-3 h-1.5 w-[72%] rounded-full bg-slate-600"/></div>
      </div>
      <div className="absolute bottom-[8%] right-[12%] grid size-[58px] place-items-center rounded-2xl border border-white/90 bg-white/90 text-blue-500 shadow-lg dark:border-white/10 dark:bg-slate-100">
        <svg viewBox="0 0 24 24" fill="none" className="size-8" stroke="currentColor" strokeWidth="1.6"><ellipse cx="12" cy="12" rx="9.5" ry="3.7"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.7" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>
      </div>
    </div>
  );
}

function FolderArtwork({ type }: { type: FolderItem["artwork"] }) {
  if (type === "editorial") return <EditorialArtwork />;
  if (type === "uiux") return <UiUxArtwork />;
  return <FrontendArtwork />;
}

export default function ThingsImBuilding() {
  return (
    <section id="projects" className="scroll-mt-12 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Creative Space heading — restored to the original format */}
        <div className="mb-8 sm:mb-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/55 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl">
            <Layers3 size={14} className="text-sky-600" />
            Creative Space
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl">
            Things I’m <span className="text-sky-600">Building.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Designing ideas. Building experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          {folders.map((folder) => (
            <a
              key={folder.number}
              href={folder.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${folder.title} in a new tab`}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-white/90 bg-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_32px_rgba(70,112,170,0.08)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:border-sky-100 hover:bg-white/55 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_18px_38px_rgba(70,112,170,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            >
              <div className="relative h-48 overflow-hidden sm:h-52 lg:h-56">
                <FolderArtwork type={folder.artwork} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20" />
              </div>

              <div className="relative flex flex-1 items-start justify-between gap-4 border-t border-white/90 bg-gradient-to-br from-white/85 via-white/65 to-sky-50/70 p-5 backdrop-blur-2xl sm:p-6">
                <div className="min-w-0">
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-sky-700/80">
                    {folder.eyebrow}
                  </p>
                  <h3 className="text-lg font-semibold tracking-[-0.035em] text-slate-900 sm:text-xl">
                    {folder.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {folder.description}
                  </p>
                </div>
                <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/60 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_3px_10px_rgba(70,112,170,0.07)] transition-all duration-300 group-hover:border-sky-200 group-hover:bg-sky-500 group-hover:text-white">
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code2, Palette, Sparkles, ArrowUpRight, ArrowDown, Plus, Check } from "lucide-react";

// Use these paths IF your files are inside src/components/sections/
import ThingsImBuilding from "./components/sections/ThingsImBuilding";
import AboutMe from "./components/sections/AboutMe";
import Testimonials from "./components/sections/Testimonials";


function GlassFloatingCard({
  title,
  subtitle,
  icon,
  position,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  position: "frontend" | "creative";
}) {
  const isFrontend = position === "frontend";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/[0.28] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_18px_42px_rgba(51,75,95,0.18),0_4px_12px_rgba(51,75,95,0.08)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.40] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_22px_48px_rgba(51,75,95,0.22)] ${
        isFrontend
          ? "right-0 top-24 sm:-right-1"
          : "left-0 top-[38%] sm:left-[1%] sm:top-[39%]"
      }`}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/90 bg-white/[0.32] text-lg text-slate-700 shadow-[0_3px_10px_rgba(51,91,125,0.08)] backdrop-blur-xl">
        {icon}
      </span>

      <div>
        <p className="text-xs font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-[10px] text-slate-600">{subtitle}</p>
      </div>
    </motion.div>
  );
}

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".scroll-reveal");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -12px 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main
      id="home"
      className={`portfolio-root relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-[#F1F8FF] to-[#DCEEFF] font-sans text-slate-800 selection:bg-sky-100 selection:text-sky-900 transition-colors duration-300 ${isDarkMode ? "portfolio-dark" : ""}`}
    >
      {/* Soft sky-blue glow + subtle technical grid */}
      <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${isDarkMode ? "dark-background" : ""}`} aria-hidden="true">
        <div className="absolute -right-40 top-10 size-[520px] rounded-full bg-sky-200/45 blur-[115px] dark:hidden" />
        <div className="absolute -left-44 top-[420px] size-[440px] rounded-full bg-blue-100/65 blur-[110px] dark:hidden" />
        <div className="absolute inset-y-0 right-0 hidden w-[56%] opacity-[0.22] md:block dark:hidden" style={{ backgroundImage: "linear-gradient(rgba(100,160,210,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(100,160,210,0.28) 1px, transparent 1px)", backgroundSize: "34px 34px", maskImage: "linear-gradient(to bottom, transparent, black 14%, black 76%, transparent)" }} />
        <div className="absolute -right-28 top-[340px] size-[360px] rounded-full border border-white/60 bg-white/10 blur-[1px] dark:hidden" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Navigation */}
        <header className={`sticky top-3 z-50 mx-auto flex items-center justify-between gap-3 rounded-full border border-white/70 bg-white/[0.48] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_12px_34px_rgba(55,85,115,0.12),0_3px_10px_rgba(55,85,115,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 sm:top-4 sm:px-5 ${isDarkMode ? "border-white/10 bg-slate-900/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_36px_rgba(0,0,0,0.28)]" : ""}`}>
          <a href="#home" className="group flex items-center gap-3">
            <div className="size-10 shrink-0 rounded-full border-[3px] border-sky-500 bg-sky-100 p-[2px] transition-transform duration-300 group-hover:scale-[1.04]">
              <img
                src="/images/profile-brown.jpg"
                alt="JM Caris"
                className="h-full w-full rounded-full border-2 border-white object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-900">
                jmcaris<span className="text-sky-600">.dev</span>
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Developer & Creative
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 lg:gap-7 md:flex">
            {[
              ["Work", "#projects"],
              ["Tools", "#tools"],
              ["About", "#about"],
              ["Creative", "#art"],
              ["Testimonials", "#testimonials"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[13px] text-slate-500 transition hover:text-sky-700"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDarkMode}
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/55 text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white sm:size-10 ${isDarkMode ? "border-white/15 bg-white/10 text-slate-100 hover:bg-white/15" : ""}`}
            >
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-[18px]" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-[18px]" aria-hidden="true">
                  <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />
                </svg>
              )}
            </button>
            <a
              href="#contact"
              className={`whitespace-nowrap rounded-full border border-white/80 bg-white/55 px-3 py-2.5 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-white sm:px-4 sm:text-sm ${isDarkMode ? "border-white/15 bg-white/10 text-slate-100 hover:bg-white/15" : ""}`}
            >
              Contact Me <ArrowUpRight className="ml-1 size-4 text-sky-600" aria-hidden="true" />
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="grid items-center gap-12 py-16 md:min-h-[720px] md:grid-cols-[1fr_0.95fr] md:gap-8 md:py-20 lg:gap-14">
          {/* Introduction */}
          <div className="scroll-reveal relative z-10 order-2 md:order-1">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-sky-100 bg-white/80 px-4 py-2.5 shadow-[0_4px_18px_rgba(100,150,190,0.04)]">
              <span className="size-2 rounded-full bg-sky-500" />
              <span className="text-xs text-slate-500">
                UI/UX Designer | Frontend Developer | Layout Artist
              </span>
            </div>

            <motion.h1
              className="max-w-xl"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <img
                src="/images/jcaris.png"
                alt="Jonaidah Caris"
                className="block h-auto w-full max-w-[620px] object-contain object-left"
              />
            </motion.h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              Hi, I'm Jonaidah Caris. I enjoy creating thoughtful digital
              experiences through frontend development, clean interfaces,
              and visual design.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-full border border-sky-600 bg-sky-600 px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_22px_rgba(100,116,139,0.16)] transition hover:-translate-y-0.5 hover:border-sky-700 hover:bg-sky-700"
              >
                Explore my work <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-6 py-3.5 text-sm text-slate-600 transition hover:border-sky-200 hover:text-sky-800"
              >
                About me <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </div>

            
          </div>

          {/* Creative Space card */}
          <div className="scroll-reveal relative order-1 mx-auto flex min-h-[510px] w-full max-w-lg items-center justify-center md:order-2 md:min-h-[580px]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/50 blur-[75px]" />

            <article className="relative z-10 w-[min(330px,76%)] rounded-[30px] border border-white/75 bg-white/[0.30] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_30px_85px_rgba(72,104,132,0.20),0_8px_24px_rgba(72,104,132,0.08)] backdrop-blur-2xl backdrop-saturate-150 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.40] sm:w-[350px] sm:rounded-[34px] sm:p-4">
             

              <div className="relative overflow-hidden rounded-[18px] border border-white/70 bg-[#DDECF3]/90 shadow-inner">
                <img
                  src="/images/creative-blue.jpg"
                  alt="JM Caris portrait"
                  className="h-[300px] w-full object-cover object-top sm:h-[330px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/5" />
              </div>

              <div className="px-2.5 pt-5">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold tracking-tight text-sky-600">
                    Jonaidah Caris
                  </h2>
                  <span
                    aria-label="Portfolio owner"
                    className="flex size-[19px] items-center justify-center rounded-full bg-sky-500 text-white"
                  >
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-2 text-[13px]  leading-5 text-slate-500">
                  Frontend developer and creative enthusiast who loves clean
                  interfaces and thoughtful design.
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-2 px-2 pb-2">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="flex items-center gap-1.5 text-slate-500">
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
                    <span className="text-xs font-medium">Work</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500">
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
                    <span className="text-xs font-medium">Art</span>
                  </div>
                </div>

                <a
                  href="#projects"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-sky-500 bg-sky-500 px-4 py-3 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(14,165,233,0.24)] transition hover:-translate-y-0.5 hover:border-sky-600 hover:bg-sky-600 hover:shadow-[0_10px_24px_rgba(14,165,233,0.30)]"
                >
                  Explore <Plus size={16} aria-hidden="true" />
                </a>
              </div>
            </article>

            {/* Floating glass cards with stronger shadows */}
            <GlassFloatingCard
              title="Frontend"
              subtitle="Building for the web"
              icon={<Code2 size={19} strokeWidth={1.8} aria-hidden="true" />}
              position="frontend"
            />

            <GlassFloatingCard
              title="Creative Side"
              subtitle="Art · Visual design"
              icon={<Palette size={19} strokeWidth={1.8} aria-hidden="true" />}
              position="creative"
            />
          </div>
        </section>

       
         
          {/* Tech stack & tools */}
          <section
            id="tools"
            className="scroll-mt-12 py-14 sm:py-16"
          >
            <div className="mb-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/55 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl">
                <Sparkles size={15} className="text-sky-600" aria-hidden="true" />
                Tools & Technologies
              </div>
              <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl">
                Tools I <span className="text-sky-600">Use.</span>
              </h2>
              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                The tools I use to design, build, and test.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[
                {
                  name: "React",
                  icon: "https://cdn.simpleicons.org/react/61DAFB",
                  note: "Frontend",
                },
                {
                  name: "Vue.js",
                  icon: "https://cdn.simpleicons.org/vuedotjs/42B883",
                  note: "Frontend",
                },
                {
                  name: "JavaScript",
                  icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
                  note: "Language",
                },
                {
                  name: "Tailwind CSS",
                  icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
                  note: "Styling",
                },
                {
                  name: "Next.js",
                  icon: "https://cdn.simpleicons.org/nextdotjs/000000",
                  note: "React Framework",
                },
                {
                  name: "shadcn/ui",
                  icon: "https://cdn.simpleicons.org/shadcnui/000000",
                  note: "UI Components",
                },
                {
                  name: "HTML5",
                  icon: "https://cdn.simpleicons.org/html5/E34F26",
                  note: "Markup",
                },
                {
                  name: "CSS3",
                  icon: "https://cdn.simpleicons.org/css/1572B6",
                  note: "Styling",
                },
                {
                  name: "Node.js",
                  icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
                  note: "Runtime",
                },
                {
                  name: "Express.js",
                  icon: "https://cdn.simpleicons.org/express/000000",
                  note: "Backend",
                },
                {
                  name: "Firebase",
                  icon: "https://cdn.simpleicons.org/firebase/FFCA28",
                  note: "Backend Services",
                },
                {
                  name: "MySQL",
                  icon: "https://cdn.simpleicons.org/mysql/4479A1",
                  note: "Database",
                },
                {
                  name: "Figma",
                  icon: "https://cdn.simpleicons.org/figma/F24E1E",
                  note: "UI/UX Design",
                },
                {
                  name: "Canva",
                  icon: "https://cdn.simpleicons.org/canva/00C4CC",
                  note: "Graphic Design",
                },
                {
                  name: "Jira",
                  icon: "https://cdn.simpleicons.org/jira/0052CC",
                  note: "Project Tracking",
                },
                {
                  name: "Cypress",
                  icon: "https://cdn.simpleicons.org/cypress/69D3A7",
                  note: "Testing",
                },
                {
                  name: "Git",
                  icon: "https://cdn.simpleicons.org/git/F05032",
                  note: "Version Control",
                },
                {
                  name: "GitHub",
                  icon: "https://cdn.simpleicons.org/github/181717",
                  note: "Code Hosting",
                },
                {
                  name: "TestRail",
                  icon: "https://cdn.simpleicons.org/testrail/65C179",
                  note: "Test Management",
                },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="group flex min-h-[82px] items-center gap-4
                    rounded-2xl border border-white/90
                    bg-white/50 px-4 py-3
                    shadow-[0_4px_18px_rgba(72,104,132,0.05)]
                    backdrop-blur-xl
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:border-sky-200
                    hover:bg-white/80
                    hover:shadow-[0_8px_22px_rgba(72,126,173,0.09)]
                    sm:px-4"
                >
                  {/* Logo */}
                  <div
                    className="flex size-11 shrink-0 items-center justify-center
                      rounded-xl border border-slate-100/90
                      bg-white shadow-sm
                      transition-transform duration-200
                      group-hover:scale-105"
                  >
                    <img
                      src={tool.icon}
                      alt={`${tool.name} logo`}
                      loading="lazy"
                      className="size-6 object-contain"
                    />
                  </div>

                  {/* Tool details */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {tool.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {tool.note}
                    </p>
                  </div>
                </div>
              ))}

              {/* More soon */}
              <div
                className="flex min-h-[82px] items-center gap-4
                  rounded-2xl border border-dashed border-sky-200/90
                  bg-sky-50/30 px-4 py-3
                  transition-colors hover:bg-sky-50/60"
              >
                <div
                  className="flex size-11 shrink-0 items-center justify-center
                    rounded-xl border border-white/90
                    bg-white/80 text-sky-600"
                >
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
                  <p className="text-sm font-medium text-slate-700">
                    More soon
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Currently Exploring
                  </p>
                </div>
              </div>
            </div>
          </section>



        {/* Projects */}
        <ThingsImBuilding />

        {/* About Me component */}
        <AboutMe />

        {/* Swipeable testimonials */}
        <Testimonials />

        {/* Creative section */}
        <section id="art" className="scroll-mt-12 py-8 sm:py-12">
          <div className="scroll-reveal grid gap-8 overflow-hidden rounded-[28px] border border-white/70 bg-white/[0.32] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_22px_60px_rgba(72,104,132,0.12)] backdrop-blur-2xl backdrop-saturate-150 sm:p-10 md:grid-cols-[1fr_0.85fr] md:items-center">
            <div className="py-3">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/55 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl">
                <Sparkles size={15} className="text-sky-600" aria-hidden="true" />
                Creative Side
              </div>
              <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-6xl">
                Not everything is <span className="text-sky-600">just code.</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-600 sm:text-lg">
                My creative side is where I explore art, visual ideas,
                publication layouts, and design details that inspire the way
                I build digital experiences.
              </p>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition hover:text-sky-900"
              >
                Let's create something <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>

            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[20px] border border-white/70 bg-gradient-to-br from-sky-50 via-white/75 to-blue-50">
              <div className="relative flex size-36 rotate-[-7deg] items-center justify-center rounded-[30px] border border-white bg-white/65 shadow-[0_12px_35px_rgba(100,150,190,0.10)] backdrop-blur-xl">
                <Sparkles size={68} strokeWidth={1.2} className="text-sky-700" aria-hidden="true" />
              </div>
              
            </div>
          </div>
        </section>
          

          
        {/* Footer / Contact */}
        <footer
          id="contact"
          className="mt-16 scroll-mt-24 pt-10 pb-10 sm:pt-14 sm:pb-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            {/* Contact intro */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/55 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-xl">
                <svg className="h-3.5 w-3.5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M4 5h16v14H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                Get in touch
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-5xl">
                Let’s make something <span className="text-sky-600">meaningful.</span>
              </h2>

              <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Have a project, collaboration, or just want to say hello? I’d love to hear from you.
              </p>

              <a
                href="https://github.com/JC-glytchsys"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-sky-700"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.02 3.45 1.44.1-.72.4-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
                View GitHub profile <span aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Contact links */}
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:your-email@gmail.com"
                className="group flex items-center gap-3 rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white/80 hover:shadow-[0_12px_32px_rgba(56,189,248,0.09)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50/80 text-sky-700 transition group-hover:bg-sky-100">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-medium text-slate-800">Email / Gmail</span>
                  <span className="mt-1 block text-xs text-slate-500">Send me a message ↗</span>
                </span>
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white/80 hover:shadow-[0_12px_32px_rgba(56,189,248,0.09)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50/80 text-sky-700 transition group-hover:bg-sky-100">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M5.2 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5.1v6.6h-3.4v-5.9c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3v6H9V9Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-medium text-slate-800">LinkedIn</span>
                  <span className="mt-1 block text-xs text-slate-500">Professional profile ↗</span>
                </span>
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white/80 hover:shadow-[0_12px_32px_rgba(56,189,248,0.09)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50/80 text-sky-700 transition group-hover:bg-sky-100">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-medium text-slate-800">Instagram</span>
                  <span className="mt-1 block text-xs text-slate-500">Social / creative work ↗</span>
                </span>
              </a>

              <a
                href="#home"
                className="group flex items-center gap-3 rounded-2xl border border-white/80 bg-white/55 p-4 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white/80 hover:shadow-[0_12px_32px_rgba(56,189,248,0.09)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50/80 text-sky-700 transition group-hover:bg-sky-100">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                </span>
                <span>
                  <span className="block text-sm font-medium text-slate-800">Back to top</span>
                  <span className="mt-1 block text-xs text-slate-500">Explore the portfolio ↑</span>
                </span>
              </a>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-sky-100/70 px-1 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:gap-6">
            <a href="#home" className="text-sm font-semibold tracking-tight text-slate-600 transition hover:text-sky-700">
              jmcaris<span className="text-sky-600">.dev</span>
            </a>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <nav className="flex flex-wrap gap-4 text-xs">
              <a href="#projects" className="transition hover:text-sky-700">Projects</a>
              <a href="#about" className="transition hover:text-sky-700">About</a>
              <a href="#art" className="transition hover:text-sky-700">Creative</a>
              <a href="#testimonials" className="transition hover:text-sky-700">Testimonials</a>
            </nav>
          </div>
        </footer>

            <style>{`

/* Scroll reveal: visible fade + upward slide when each section enters view. */
.scroll-reveal {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
  transition: opacity 800ms ease-out, transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.scroll-reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  will-change: auto;
}
#projects article.scroll-reveal:nth-child(2) { transition-delay: 120ms; }
#projects article.scroll-reveal:nth-child(3) { transition-delay: 220ms; }
#projects article.scroll-reveal:nth-child(4) { transition-delay: 320ms; }
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal,
  .scroll-reveal.is-visible {
    opacity: 1;
    transform: none;
    transition: none;
    will-change: auto;
  }
}

/* Premium glass finish: smoky translucency, soft inner highlights, and layered depth. */
.portfolio-root header {
  backdrop-filter: blur(18px) saturate(145%);
  -webkit-backdrop-filter: blur(18px) saturate(145%);
}
.portfolio-root header button,
.portfolio-root header > div > a {
  box-shadow: inset 0 1px 0 rgba(255,255,255,.72), 0 8px 24px rgba(63,91,113,.08);
  backdrop-filter: blur(22px) saturate(155%);
  -webkit-backdrop-filter: blur(22px) saturate(155%);
}
.portfolio-root article,
.portfolio-root section#art > div,
.portfolio-root #tools > div > div {
  -webkit-backdrop-filter: blur(26px) saturate(155%);
  backdrop-filter: blur(26px) saturate(155%);
}
.portfolio-root article:not(.portfolio-root article article)::before,
.portfolio-root section#art > div::before,
.portfolio-root #tools > div > div::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(145deg, rgba(255,255,255,.22), transparent 38%, rgba(255,255,255,.04));
  opacity: .75;
}
.portfolio-root article:not(.portfolio-root article article),
.portfolio-root section#art > div,
.portfolio-root #tools > div > div { position: relative; isolation: isolate; }

/* Minimal dark mode: quiet charcoal-navy, no blue glow or decorative grid. */
.portfolio-dark {
  background: linear-gradient(135deg, #111318 0%, #171a21 55%, #1b2029 100%) !important;
  color: #e7eaf0 !important;
  color-scheme: dark;
}
.portfolio-dark .text-slate-900,
.portfolio-dark .text-slate-800,
.portfolio-dark .text-slate-700 { color: #eef0f4 !important; }
.portfolio-dark .text-slate-600,
.portfolio-dark .text-slate-500 { color: #b7bdc8 !important; }
.portfolio-dark .text-slate-400 { color: #858d9b !important; }
.portfolio-dark .border-slate-200,
.portfolio-dark .border-slate-200\/60,
.portfolio-dark .border-slate-200\/70,
.portfolio-dark .border-slate-100 { border-color: rgba(210, 218, 230, 0.12) !important; }
.portfolio-dark article:not(.portfolio-dark article article),
.portfolio-dark section#art > div {
  border-color: rgba(210, 218, 230, 0.14) !important;
}
.portfolio-dark article,
.portfolio-dark section#art > div {
  background-color: rgba(38, 43, 52, 0.62) !important;
  border-color: rgba(255,255,255,0.13) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 18px 48px rgba(0,0,0,0.24) !important;
  -webkit-backdrop-filter: blur(28px) saturate(130%) !important;
  backdrop-filter: blur(28px) saturate(130%) !important;
}
.portfolio-dark header a:not(:first-child),
.portfolio-dark footer a { color: #c4cbd6; }
.portfolio-dark header button,
.portfolio-dark header > div > a,
.portfolio-dark #about span,
.portfolio-dark #projects article span.rounded-full,
.portfolio-dark #contact a[href^="mailto"] {
  background-color: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(210, 218, 230, 0.14) !important;
  color: #e5eefb !important;
}
.portfolio-dark .bg-white\/80,
.portfolio-dark .bg-white\/75,
.portfolio-dark .bg-white\/70,
.portfolio-dark .bg-white\/\[0\.42\],
.portfolio-dark .bg-white\/\[0\.32\],
.portfolio-dark .bg-white\/95,
.portfolio-dark .bg-white {
  background-color: rgba(35, 39, 47, 0.9) !important;
}
.portfolio-dark .bg-slate-900 { background-color: #e5e7eb !important; color: #20242b !important; }
.portfolio-dark .bg-slate-900 span { color: #20242b !important; }
.portfolio-dark .bg-sky-50 { background-color: rgba(148, 163, 184, 0.12) !important; }
.portfolio-dark .bg-sky-100\/60,
.portfolio-dark .bg-sky-200\/50 { opacity: 0.10; }
.portfolio-dark .shadow-sm { box-shadow: 0 8px 22px rgba(0,0,0,.2) !important; }
.portfolio-dark #tools > div > div {
  background-color: rgba(35, 39, 47, 0.78) !important;
  border-color: rgba(210, 218, 230, 0.14) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16) !important;
}
.portfolio-dark #tools > div > div > div {
  background-color: rgba(255, 255, 255, 0.07) !important;
  border-color: rgba(210, 218, 230, 0.12) !important;
}
.portfolio-dark #tools > div > div p { color: #d8dde6; }
.portfolio-dark #tools > div > div p:last-child { color: #858d9b; }
`}</style>
      </div>
    </main>
  );
}

export default App;

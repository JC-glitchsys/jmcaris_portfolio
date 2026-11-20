import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";

import ThingsImBuilding from "./components/sections/ThingsImBuilding";
import AboutMe from "./components/sections/AboutMe";
import Testimonials from "./components/sections/Testimonials";
import Navbar from "./components/layout/Navbar";
import GalleryPage from "./components/gallery/GalleryPage";
import ScrollManager from "./components/ScrollManager";

// Sumi-e world
import SumiDefs from "./components/sumi/SumiDefs";
import SumiLoader from "./components/sumi/SumiLoader";
import HeroSumi, { HeroEnso } from "./components/sumi/HeroSumi";
import NinjaPortrait from "./components/sumi/NinjaPortrait";
import MusicToggle from "./components/sumi/MusicToggle";
import { BambooGrove, Reveal, ScrollProgress, SectionHeading, SumiDivider } from "./components/sumi/Ink";

const INTRO_KEY = "sumi-intro-seen";

/** The opening plays once, on the first visit of a browser session (never with reduced motion). */
function shouldShowIntro(): boolean {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return window.sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return true;
  }
}

type Phase = "loading" | "revealing" | "done";

const tools = [
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

const contactCard = "sumi-card group flex items-center gap-4 p-5 hover:-translate-y-1";
const contactIcon =
  "sumi-tile flex size-11 shrink-0 items-center justify-center transition group-hover:bg-[rgba(201,169,106,0.16)]";

export function App() {
  const [phase, setPhase] = useState<Phase>(() => (shouldShowIntro() ? "loading" : "done"));
  const ready = phase !== "loading";

  const revealHero = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage can be unavailable; the intro simply shows again next visit */
    }
    setPhase((p) => (p === "loading" ? "revealing" : p));
  }, []);
  const finishIntro = useCallback(() => setPhase("done"), []);

  // Hold the page still while the intro plays.
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <MotionConfig reducedMotion="user">
      <SumiDefs />
      <ScrollProgress />
      <ScrollManager />
      <MusicToggle />
      {phase !== "done" && <SumiLoader key="sumi-loader" onReveal={revealHero} onDone={finishIntro} />}

      <main
        id="home"
        className="portfolio-root relative min-h-screen overflow-x-clip"
        style={{ background: "transparent", color: "var(--ink)" }}
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <>
          {/* Hero */}
          <section className="relative grid items-center gap-8 py-14 md:min-h-[740px] md:grid-cols-[1fr_0.95fr] md:gap-8 md:py-24 lg:gap-14">
            <HeroSumi play={ready} />

            {/* Introduction */}
            <motion.div
              className="relative z-10 order-2 md:order-1"
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-2.5"
                style={{ borderColor: "var(--gold-line)", background: "rgba(var(--paper-rgb), 0.7)" }}
              >
                <span className="size-1.5 shrink-0 rotate-45" style={{ background: "var(--gold)" }} />
                <span className="sumi-label !text-[0.6rem] !tracking-[0.16em] sm:!text-[0.64rem]">
                  UI/UX Designer | Frontend Developer | Layout Artist
                </span>
              </div>

              <h1 className="sumi-name max-w-xl !text-[clamp(3.5rem,7.2vw,6.1rem)] !font-bold !tracking-[0.03em]">
                <span className="block">Jonaidah</span> <span className="block">Caris</span>
              </h1>

              <p className="sumi-text mt-8 max-w-md !font-medium !text-[1rem] !leading-[1.9] sm:text-[1.05rem]">
                Hi, I'm Jonaidah Caris. I enjoy creating thoughtful digital
                experiences through frontend development, clean interfaces,
                and visual design.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#projects" className="sumi-btn sumi-btn-solid sumi-btn-pill">
                  Explore my work <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>

                <a href="#about" className="sumi-btn sumi-btn-pill sumi-btn-paper">
                  About me <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* The ninja girl: standalone ink artwork, enso behind her */}
            <div className="relative order-1 flex items-center justify-center md:order-2">
              <HeroEnso
                play={ready}
                className="absolute left-1/2 top-1/2 z-0 w-[min(118%,660px)] max-w-none -translate-x-1/2 -translate-y-[52%]"
              />
              <div className="relative z-10 w-full">
                <NinjaPortrait play={ready} />
              </div>
            </div>
          </section>

          <SumiDivider />

          {/* Tech stack & tools */}
          <section id="tools" className="relative scroll-mt-12 py-20 sm:py-24">
            {/* bamboo grows around the section, behind the cards */}
            <BambooGrove />

            <div className="relative z-10">
              <SectionHeading
                eyebrow="Tools & Technologies"
                icon={<Sparkles size={14} style={{ color: "var(--gold-deep)" }} aria-hidden="true" />}
                subtitle="The tools I use to design, build, and test."
              >
                Tools I <span className="sumi-accent">Use.</span>
              </SectionHeading>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {tools.map((tool, i) => (
                  <Reveal key={tool.name} delay={(i % 5) * 0.06} className="h-full">
                    <div className="sumi-card group flex h-full min-h-[92px] items-center gap-4 px-4 py-3.5 hover:-translate-y-0.5">
                      <div
                        className="sumi-tile flex size-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ background: "#eae3d6" }}
                      >
                        <img
                          src={tool.icon}
                          alt={`${tool.name} logo`}
                          width={24}
                          height={24}
                          loading="lazy"
                          className="size-6 object-contain saturate-[0.8] transition duration-300 group-hover:saturate-100"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="f-body truncate !text-[0.85rem] !font-normal" style={{ color: "var(--ink)" }}>
                          {tool.name}
                        </p>
                        <p className="sumi-text-sm mt-0.5 !text-[0.7rem]">{tool.note}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}

                {/* More soon */}
                <Reveal delay={0.2} className="h-full">
                  <div
                    className="flex h-full min-h-[92px] items-center gap-4 rounded-[14px] border border-dashed px-4 py-3.5"
                    style={{ borderColor: "var(--gold-line)" }}
                  >
                    <div
                      className="sumi-tile flex size-12 shrink-0 items-center justify-center"
                      style={{ color: "var(--gold-deep)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="size-5" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </div>

                    <div>
                      <p className="f-body !text-[0.85rem] !font-normal" style={{ color: "var(--ink)" }}>
                        More soon
                      </p>
                      <p className="sumi-text-sm mt-0.5 !text-[0.7rem]">Currently Exploring</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <SumiDivider />

          {/* Creative Space (projects) */}
          <ThingsImBuilding />

          <AboutMe />

          <Testimonials />

          <SumiDivider />

          {/* Footer / Contact */}
          <footer id="contact" className="mt-12 scroll-mt-24 pb-12 pt-12 sm:pb-14">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
              {/* Contact intro */}
              <div className="max-w-xl">
                <SectionHeading
                  eyebrow="Get in touch"
                  icon={
                    <svg className="h-3.5 w-3.5" style={{ color: "var(--gold-deep)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M4 5h16v14H4z" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                  }
                  subtitle="Have a project, collaboration, or just want to say hello? I’d love to hear from you."
                >
                  Let’s make something <span className="sumi-accent">meaningful.</span>
                </SectionHeading>

                <a
                  href="https://github.com/JC-glytchsys"
                  target="_blank"
                  rel="noreferrer"
                  className="sumi-label -mt-4 inline-flex items-center gap-3 transition-colors hover:!text-[color:var(--gold-deep)]"
                  style={{ color: "var(--ink)" }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.02 3.45 1.44.1-.72.4-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                  </svg>
                  View GitHub profile <span aria-hidden="true">↗</span>
                </a>
              </div>

              {/* Contact links */}
              <div className="grid gap-5 sm:grid-cols-2">
                <a href="mailto:your-email@gmail.com" className={contactCard}>
                  <span className={contactIcon} style={{ borderColor: "var(--gold-line)", color: "var(--gold-deep)" }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m4 7 8 6 8-6" />
                    </svg>
                  </span>
                  <span>
                    <span className="sumi-label block" style={{ color: "var(--ink)" }}>Email / Gmail</span>
                    <span className="sumi-text-sm mt-1 block">Send me a message ↗</span>
                  </span>
                </a>

                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className={contactCard}>
                  <span className={contactIcon} style={{ borderColor: "var(--gold-line)", color: "var(--gold-deep)" }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M5.2 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5.1v6.6h-3.4v-5.9c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3v6H9V9Z" />
                    </svg>
                  </span>
                  <span>
                    <span className="sumi-label block" style={{ color: "var(--ink)" }}>LinkedIn</span>
                    <span className="sumi-text-sm mt-1 block">Professional profile ↗</span>
                  </span>
                </a>

                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={contactCard}>
                  <span className={contactIcon} style={{ borderColor: "var(--gold-line)", color: "var(--gold-deep)" }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  <span>
                    <span className="sumi-label block" style={{ color: "var(--ink)" }}>Instagram</span>
                    <span className="sumi-text-sm mt-1 block">Social / creative work ↗</span>
                  </span>
                </a>

                <a href="#home" className={contactCard}>
                  <span className={contactIcon} style={{ borderColor: "var(--gold-line)", color: "var(--gold-deep)" }}>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      <path d="M12 3v18M3 12h18" />
                    </svg>
                  </span>
                  <span>
                    <span className="sumi-label block" style={{ color: "var(--ink)" }}>Back to top</span>
                    <span className="sumi-text-sm mt-1 block">Explore the portfolio ↑</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Quiet Sumi-e landscape: moon, distant mountains, and a small torii */}
            <div className="relative mt-16 h-40 overflow-hidden rounded-[16px] border"
              style={{ borderColor: "var(--gold-line)", background: "linear-gradient(180deg, rgba(234,227,214,0.24), rgba(201,169,106,0.08))" }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 1200 190" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
                <circle cx="950" cy="55" r="30" fill="var(--sun)" opacity="0.72" />
                <path d="M0 145 Q120 92 230 132 T470 128 Q600 70 740 132 T1000 118 Q1110 90 1200 130 L1200 190 L0 190Z" fill="var(--brush)" opacity="0.10" />
                <path d="M0 165 Q150 122 280 154 T560 146 Q700 110 830 152 T1080 145 Q1150 132 1200 150 L1200 190 L0 190Z" fill="var(--brush)" opacity="0.15" />
                <g transform="translate(820 82)" fill="none" stroke="var(--brush)" strokeWidth="5" strokeLinecap="round" opacity="0.56">
                  <path d="M-34 18 H34 M-28 18 V62 M28 18 V62 M-42 7 H42 M-48 0 Q0 -13 48 0 M-38 7 Q0 -2 38 7" />
                  <path d="M-35 31 H35 M-25 31 V62 M25 31 V62" strokeWidth="3" />
                </g>
                <path d="M0 174 Q220 159 420 173 T820 168 T1200 171" fill="none" stroke="var(--gold-deep)" strokeWidth="1.5" opacity="0.45" />
              </svg>
            </div>

            {/* Footer bottom */}
            <div
              className="mt-8 flex flex-col justify-between gap-5 border-t px-1 pt-7 sm:flex-row sm:items-center sm:gap-6"
              style={{ borderColor: "var(--gold-line)" }}
            >
              <a href="#home" className="f-display text-[1.02rem] tracking-[0.12em] transition-colors hover:!text-[color:var(--gold-deep)]" style={{ color: "var(--ink)" }}>
                jmcaris<span className="sumi-accent">.dev</span>
              </a>
              <p className="sumi-text-sm !text-[0.72rem]">© {new Date().getFullYear()} All rights reserved.</p>
              <nav className="flex flex-wrap gap-5">
                {[
                  ["Projects", "#projects"],
                  ["About", "#about"],
                  ["Testimonials", "#testimonials"],
                ].map(([label, href]) => (
                  <a key={label} href={href} className="sumi-label !text-[0.6rem] transition-colors hover:!text-[color:var(--gold-deep)]">
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </footer>
                </>
              }
            />
            <Route path="/visual-editorial" element={<GalleryPage slug="visual-editorial" />} />
            <Route path="/ui-ux-design" element={<GalleryPage slug="ui-ux-design" />} />
            <Route path="/frontend-projects" element={<GalleryPage slug="frontend-projects" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </MotionConfig>
  );
}
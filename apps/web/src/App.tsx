import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

import ThingsImBuilding from "./components/sections/ThingsImBuilding";
import AboutMe from "./components/sections/AboutMe";
import Testimonials from "./components/sections/Testimonials";
import ToolsSection from "./components/sections/ToolsSection";
import Navbar from "./components/layout/Navbar";
import GalleryPage from "./components/gallery/GalleryPage";
import ScrollManager from "./components/ScrollManager";
import NinjaChatbot from "./components/chat/NinjaChatbot";

// Sumi-e world
import SumiDefs from "./components/sumi/SumiDefs";
import SumiLoader from "./components/sumi/SumiLoader";
import HeroSumi, { HeroEnso } from "./components/sumi/HeroSumi";
import NinjaPortrait from "./components/sumi/NinjaPortrait";
import { asset } from "./components/sumi/hooks";
import MusicToggle from "./components/sumi/MusicToggle";
import { ScrollProgress, SectionHeading, SumiDivider } from "./components/sumi/Ink";

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
      {phase === "done" && <NinjaChatbot />}
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

              <h1 className="sr-only">Jonaidah Caris</h1>

              <p className="sumi-text mt-6 max-w-md !font-medium !text-[1rem] !leading-[1.9] sm:text-[1.05rem]">
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
                className="absolute left-1/2 top-1/2 z-0 w-[min(120%,690px)] max-w-none -translate-x-1/2 -translate-y-1/2"
              />
              <div className="relative z-10 w-full">
                <NinjaPortrait play={ready} />
              </div>
            </div>
          </section>

          {/* Creative Space (projects) */}
          <ThingsImBuilding />

          <AboutMe />

          <SumiDivider />

          {/* Tech stack & tools */}
          <ToolsSection />

          <Testimonials />

          <SumiDivider />

          {/* Footer / Contact */}
          <footer id="contact" className="mt-12 scroll-mt-24 pb-12 pt-12 sm:pb-14">
            <div className="grid gap-10">
              {/* Contact intro */}
              <div className="mx-auto flex max-w-2xl flex-col items-center">
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
              <div className="mx-auto grid w-full max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

            {/* Shrine in the mist: the artwork sits on the paper itself, with no frame around it */}
            <div aria-hidden="true" className="footer-shrine mx-auto -mb-6 mt-16 w-full max-w-[920px] sm:-mb-12 sm:mt-20">
              <img
                src={asset("images/footer/torii-shrine.webp")}
                alt=""
                width={1182}
                height={400}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block h-auto w-full select-none"
              />
            </div>

            {/* Footer bottom */}
            <div
              className="-mt-3 flex flex-col justify-between gap-5 border-t px-1 pt-7 sm:flex-row sm:items-center sm:gap-6"
              style={{ borderColor: "var(--gold-line)" }}
            >
              <div className="text-center sm:text-left">
                <a href="#home" className="sumi-signature block transition-colors hover:!text-[color:var(--gold-deep)]">
                  Jonaidah Caris
                </a>
                <a href="#home" className="sumi-brand mt-1 block !text-[1rem] transition-colors hover:!text-[color:var(--gold-deep)]">
                  jmcaris<span className="sumi-accent">.dev</span>
                </a>
              </div>
              <p className="sumi-text-sm !text-[0.72rem]">© {new Date().getFullYear()} All rights reserved.</p>
              <nav className="flex flex-wrap justify-center gap-5 sm:justify-start">
                {[
                  ["Projects", "#projects"],
                  ["About", "#about"],
                  ["Tools", "#tools"],
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

export default App;

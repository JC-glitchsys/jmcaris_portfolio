
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import Hero from "./components/sections/Hero";
import Tools from "./components/sections/Tools";
import ThingsImBuilding from "./components/sections/ThingsImBuilding";
import AboutMe from "./components/sections/AboutMe";
import Testimonials from "./components/sections/Testimonials";
import Creative from "./components/sections/Creative";
import Contact from "./components/sections/Contact";

const navItems = [
  { label: "Tools", href: "#tools" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Creative", href: "#art" },
  { label: "Contact", href: "#contact" },
];

function Header({
  isDarkMode,
  onToggleTheme,
}: {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const headerClass = isDarkMode
    ? "border-white/10 bg-slate-900/80 text-slate-100 shadow-lg backdrop-blur-2xl"
    : "border-slate-200 bg-white/95 text-slate-800 shadow-sm";

  const controlClass = isDarkMode
    ? "border-white/15 bg-white/10 text-slate-100 hover:bg-white/15"
    : "border-slate-200 bg-white text-slate-700 hover:border-sky-200";

  return (
    <div
      className="sticky top-3 z-50 py-2 sm:top-4"
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenuOpen(false);
      }}
    >
      <header
        className={`flex items-center justify-between gap-3 rounded-full border px-3 py-3 transition-colors duration-300 sm:px-5 ${headerClass}`}
      >
        <a href="#home" className="group flex items-center gap-3">
          <div className="size-10 shrink-0 rounded-full border-2 border-sky-200 bg-white p-0.5">
            <img
              src="/images/profile-brown.jpg"
              alt="JM Caris"
              width={40}
              height={40}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight">
              jmcaris<span className="text-sky-600">.dev</span>
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Developer & Creative
            </p>
          </div>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-5 md:flex lg:gap-7"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-slate-500 transition-colors hover:text-sky-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={isDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors sm:size-10 ${controlClass}`}
          >
            {isDarkMode ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-[18px]"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-[18px]"
                aria-hidden="true"
              >
                <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />
              </svg>
            )}
          </button>

          <a
            href="#contact"
            className={`hidden items-center whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-colors sm:inline-flex ${controlClass}`}
          >
            Contact Me
            <ArrowUpRight
              className="ml-1 size-4 text-sky-600"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors md:hidden ${controlClass}`}
          >
            {menuOpen ? (
              <X className="size-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="size-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className={`mt-2 rounded-2xl border p-2 shadow-lg md:hidden ${
            isDarkMode
              ? "border-white/10 bg-slate-900 text-slate-100"
              : "border-slate-200 bg-white text-slate-800"
          }`}
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-slate-500 transition-colors hover:bg-sky-50 hover:text-slate-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <main
      id="home"
      className={`portfolio-root relative min-h-screen font-sans transition-colors duration-300 selection:bg-sky-200 selection:text-[#343a40] ${
        isDarkMode
          ? "portfolio-dark bg-slate-950 text-slate-100"
          : "bg-white text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Header
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((current) => !current)}
        />

        <Hero />
        <Tools />
        <ThingsImBuilding />
        <AboutMe />
        <Testimonials />
        <Creative />
        <Contact />
      </div>
    </main>
  );
}

export default App;

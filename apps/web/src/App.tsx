
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
    ? "border-sky-400/30 bg-sky-600 text-white shadow-[0_10px_35px_rgba(14,165,233,0.25)]"
    : "border-sky-400 bg-sky-500 text-white shadow-[0_10px_35px_rgba(14,165,233,0.30)]";

  return (
    <div
      className="sticky top-3 z-50 py-2 sm:top-4"
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenuOpen(false);
      }}
    >
      <header
        className={`flex items-center justify-between gap-3 rounded-full border px-4 py-3.5 transition-all duration-300 sm:px-6 ${headerClass}`}
      >
        {/* Brand */}
        <a href="#home" className="group flex shrink-0 items-center gap-3">
          <div className="size-11 shrink-0 rounded-full border-2 border-white bg-white p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src="/images/profile-brown.jpg"
              alt="JM Caris"
              width={44}
              height={44}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <div>
            <p className="text-base font-semibold tracking-tight text-white">
              jmcaris<span className="text-sky-100">.dev</span>
            </p>
            <p className="mt-0.5 text-xs font-medium text-white/85">
              Developer & Creative
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex lg:gap-1.5"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[15px] font-medium tracking-[-0.01em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white lg:px-3.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={isDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white transition-all duration-200 hover:scale-105 hover:bg-white/25"
          >
            {isDarkMode ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-[19px]"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l-1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="size-[19px]"
                aria-hidden="true"
              >
                <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />
              </svg>
            )}
          </button>

          {/* White Contact Button */}
          <a
            href="#contact"
            className="hidden items-center whitespace-nowrap rounded-full border border-white bg-white px-5 py-2.5 text-[15px] font-semibold text-sky-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-md sm:inline-flex"
          >
            Contact Me
            <ArrowUpRight
              className="ml-1.5 size-4 text-sky-600"
              aria-hidden="true"
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/15 text-white transition-colors hover:bg-white/25 md:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mt-2 rounded-2xl border border-sky-300 bg-sky-600 p-2 text-white shadow-xl shadow-sky-500/20 md:hidden"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/20"
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

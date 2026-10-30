import { useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const navItems = [
  { label: "Tools", href: "#tools" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Creative", href: "#art" },
  { label: "Contact", href: "#contact" },
];

type HeaderProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

export default function Header({ isDarkMode, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const themeLabel = isDarkMode ? "Switch to light mode" : "Switch to dark mode";
  const ThemeIcon = isDarkMode ? Sun : Moon;

  return (
    <div
      className="sticky top-3 z-50 py-2 sm:top-4"
      onKeyDown={(event) => {
        if (event.key === "Escape") setMenuOpen(false);
      }}
    >
      <header
        className={`flex items-center justify-between gap-3 rounded-full border px-4 py-3.5 text-white shadow-[0_10px_35px_rgba(14,165,233,0.3)] transition-colors duration-300 sm:px-6 ${
          isDarkMode ? "border-sky-400/30 bg-sky-600" : "border-sky-400 bg-sky-500"
        }`}
      >
        {/* Brand */}
        <a href="#home" className="group flex shrink-0 items-center gap-3">
          <div className="size-11 shrink-0 rounded-full border-2 border-white bg-white p-0.5 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
            <img
              src="/images/profile-brown.jpg"
              alt="JM Caris"
              width={44}
              height={44}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight">
              jmcaris<span className="text-sky-100">.dev</span>
            </p>
            <p className="mt-0.5 text-xs font-medium text-white/85">Developer & Creative</p>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex lg:gap-1.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200 hover:bg-white/20 lg:px-3.5"
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
            aria-label={themeLabel}
            aria-pressed={isDarkMode}
            title={themeLabel}
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/15 transition-colors hover:bg-white/25"
          >
            <ThemeIcon className="size-[19px]" strokeWidth={1.8} aria-hidden="true" />
          </button>

          <a
            href="#contact"
            className="hidden items-center whitespace-nowrap rounded-full border border-white bg-white px-5 py-2.5 text-[15px] font-semibold text-sky-700 transition-colors hover:bg-sky-50 sm:inline-flex"
          >
            Contact Me
            <ArrowUpRight className="ml-1.5 size-4 text-sky-600" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/50 bg-white/15 transition-colors hover:bg-white/25 md:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="mt-2 rounded-2xl border border-sky-300 bg-sky-600 p-2 text-white md:hidden"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors hover:bg-white/20"
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
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { asset, useMedia, useScrollSpy } from "@/components/sumi/hooks";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "tools", label: "Tools" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = NAV_ITEMS.map((i) => i.id).filter((id) => id !== "home");

/** Anchor on the home page; a router link back to "/#section" from the gallery pages. */
function NavAnchor({
  id,
  isHome,
  className,
  onClick,
  current,
  children,
}: {
  id: string;
  isHome: boolean;
  className?: string;
  onClick?: () => void;
  current?: boolean;
  children: ReactNode;
}) {
  const href = `#${id}`;
  const ariaCurrent = current ? "true" : undefined;
  if (isHome) {
    return (
      <a href={href} className={className} onClick={onClick} aria-current={ariaCurrent}>
        {children}
      </a>
    );
  }
  return (
    <Link to={{ pathname: "/", hash: href }} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const systemDark = useMedia("(prefers-color-scheme: dark)");
  const isDarkMode = theme === "dark" || (theme === "system" && systemDark);
  const toggleTheme = () => setTheme(isDarkMode ? "light" : "dark");

  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // Active item: the gallery pages belong to "Work"; on the home page it follows the scroll.
  // A click claims the indicator immediately so it slides once instead of hopping through
  // every section it scrolls past.
  const spy = useScrollSpy(isHome ? SECTION_IDS : []);
  const [pending, setPending] = useState<string | null>(null);
  const activeId = !isHome ? "projects" : (pending ?? spy);

  useEffect(() => {
    if (!pending) return;
    // hand control back to the scroll once the jump has landed, or as soon as the visitor scrolls
    const release = () => setPending(null);
    const timer = window.setTimeout(release, 1100);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", release);
    };
  }, [pending]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sumi-nav sticky top-3 z-50 mx-auto flex items-center justify-between gap-3 py-2 pl-2 pr-2 sm:top-4 sm:pl-2.5 sm:pr-3">
      <NavAnchor id="home" isHome={isHome} onClick={() => setPending("home")} className="group flex items-center gap-3">
        <div
          className="size-10 shrink-0 rounded-full border p-[2px] transition-transform duration-300 group-hover:scale-[1.04]"
          style={{ borderColor: "var(--gold)" }}
        >
          <img src={asset("images/ninja-avatar.png")} alt="JM Caris" className="h-full w-full rounded-full object-cover" />
        </div>
        <div className="md:hidden lg:block">
          <p className="sumi-brand text-[1.12rem]">
            jmcaris<span className="sumi-accent">.dev</span>
          </p>
          <p className="sumi-text-sm mt-0.5 hidden !text-[0.62rem] uppercase tracking-[0.2em] lg:block">
            Developer & Creative
          </p>
        </div>
      </NavAnchor>

      <nav className="hidden items-center md:flex" aria-label="Primary">
        {NAV_ITEMS.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <NavAnchor
              key={id}
              id={id}
              isHome={isHome}
              current={active}
              onClick={() => setPending(id)}
              className="sumi-nav-link"
            >
              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="sumi-nav-indicator"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{label}</span>
            </NavAnchor>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to ink night mode"}
          aria-pressed={isDarkMode}
          title={isDarkMode ? "Switch to light mode" : "Switch to ink night mode"}
          className="sumi-tile inline-flex size-10 shrink-0 items-center justify-center !rounded-full transition-colors duration-300 hover:border-[color:var(--gold)] hover:bg-[rgba(201,169,106,0.16)]"
          style={{ color: "var(--ink)", background: "transparent" }}
        >
          {isDarkMode ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-[18px]" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-[18px]" aria-hidden="true">
              <path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.5 8.5 0 1 0 20.9 13Z" />
            </svg>
          )}
        </button>

        {/* wrapper hides it: .sumi-btn sets display, which would beat a `hidden` utility on the link itself */}
        <div className="hidden xl:block">
          <NavAnchor
            id="contact"
            isHome={isHome}
            onClick={() => setPending("contact")}
            className="sumi-btn sumi-btn-gold !rounded-full !px-5 !py-3 whitespace-nowrap"
          >
            Contact Me <ArrowUpRight className="size-4" aria-hidden="true" />
          </NavAnchor>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="sumi-tile inline-flex size-10 shrink-0 items-center justify-center !rounded-full transition hover:bg-[rgba(201,169,106,0.16)] md:hidden"
          style={{ color: "var(--ink)" }}
        >
          {menuOpen ? <X className="size-[18px]" aria-hidden="true" /> : <Menu className="size-[18px]" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu: a second floating sheet under the pill, so the pill silhouette never changes */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="sumi-nav-sheet absolute inset-x-0 top-full mt-2 md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="grid gap-0.5">
              {NAV_ITEMS.map(({ id, label }) => {
                const active = activeId === id;
                return (
                  <li key={id}>
                    <NavAnchor
                      id={id}
                      isHome={isHome}
                      current={active}
                      onClick={() => {
                        setPending(id);
                        setMenuOpen(false);
                      }}
                      className="sumi-label block rounded-full px-4 py-3 transition-colors hover:bg-[rgba(201,169,106,0.14)] aria-[current=true]:bg-[rgba(201,169,106,0.2)] aria-[current=true]:!text-[color:var(--ink)]"
                    >
                      {label}
                    </NavAnchor>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

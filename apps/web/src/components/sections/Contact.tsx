import type { ReactNode } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

import SectionHeader, { Accent } from "@/components/sections/SectionHeader";

type ContactLink = {
  label: string;
  note: string;
  href: string;
  external: boolean;
  icon: ReactNode;
};

/*
  TODO before publishing: these three links are still the original placeholders
  (your-email@gmail.com and the LinkedIn / Instagram home pages).
  Replace them with your real email address and profile URLs.
*/
const contactLinks: ContactLink[] = [
  {
    label: "Email / Gmail",
    note: "Send me a message",
    href: "mailto:your-email@gmail.com",
    external: false,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    note: "Professional profile",
    href: "https://www.linkedin.com/",
    external: true,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.2 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.5 0h3.3v1.6h.1a3.6 3.6 0 0 1 3.2-1.8c3.4 0 4 2.2 4 5.1v6.6h-3.4v-5.9c0-1.4 0-3.1-1.9-3.1s-2.1 1.5-2.1 3v6H9V9Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    note: "Social / creative work",
    href: "https://www.instagram.com/",
    external: true,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="mt-16 scroll-mt-20 pb-10 pt-10 sm:pb-12 sm:pt-14"
    >
      <SectionHeader
        id="contact-heading"
        icon={Mail}
        eyebrow="Get in touch"
        title={
          <>
            Let’s make something <Accent>meaningful.</Accent>
          </>
        }
        subtitle="Have a project, collaboration, or just want to say hello? I’d love to hear from you."
      />

      {/* Contact links */}
      <ul className="mx-auto mt-10 grid max-w-2xl gap-3">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-sky-200"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700 transition-colors group-hover:bg-sky-100">
                {link.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-slate-800">
                  {link.label}
                  {link.external && <span className="sr-only"> (opens in a new tab)</span>}
                </span>
                <span className="mt-1 block text-xs text-slate-500">{link.note}</span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <a
          href="https://github.com/JC-glytchsys"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 underline decoration-sky-200 decoration-2 underline-offset-4 transition-colors hover:text-sky-700 hover:decoration-sky-600"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.02 3.45 1.44.1-.72.4-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
          View GitHub profile
          <span className="sr-only"> (opens in a new tab)</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      {/* Footer bottom */}
      <div className="mt-14 flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-6">
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight text-slate-600 transition-colors hover:text-sky-700"
        >
          jmcaris<span className="text-sky-600">.dev</span>
        </a>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-xs">
          <a href="#projects" className="transition-colors hover:text-sky-700">Projects</a>
          <a href="#about" className="transition-colors hover:text-sky-700">About</a>
          <a href="#art" className="transition-colors hover:text-sky-700">Creative</a>
          <a href="#testimonials" className="transition-colors hover:text-sky-700">Testimonials</a>
          <a href="#home" className="transition-colors hover:text-sky-700">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
import { Download } from "lucide-react";
import { Reveal } from "../sumi/Ink";
import { asset } from "../sumi/hooks";

export default function AboutMe() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "Shadcn/ui",
    "React.js",
    "Vue.js",
    "Tailwind CSS",
    "Firebase",
    "Node.js",
    "Express.js",
    "MySQL",
    "Git/GitHub",
    "Figma",
    "Canva",
    "Jira",
    "TestRail",
    "Cypress",
  ];
  const softSkills = ["Time Management", "Adaptability", "Communication"];

/*
  Structure note: like Creative, the card wrapper stays the direct child of the section
  (the dark theme styles "section > div").
*/
export default function AboutMe() {
  return (
    <section id="about" className="scroll-mt-12 py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <div className="sumi-card overflow-hidden p-7 sm:p-12 lg:p-16">
            {/* Section heading */}
            <div className="mb-10 flex items-center gap-5">
              <span className="sumi-pill shrink-0">
                <span className="sumi-label">About Me</span>
              </span>
            </div>

            <div className="grid items-start gap-10 md:grid-cols-[190px_minmax(0,1fr)] lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
              {/* Profile */}
              <div className="flex flex-col items-center md:sticky md:top-28">
                <div
                  className="size-32 overflow-hidden rounded-full border p-1 shadow-[0_14px_30px_-20px_var(--shadow-ink)] sm:size-36 lg:size-44"
                  style={{ borderColor: "var(--gold)", background: "var(--card-solid)" }}
                >
                  <img
                    src={asset("images/profile-brown.jpg")}
                    alt="Jo's profile"
                    className="h-full w-full rounded-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <span className="sumi-label rounded-full border px-3.5 py-2 !text-[0.58rem]" style={{ borderColor: "var(--gold-line)", background: "rgba(var(--paper-rgb),0.6)" }}>
                    Creative Artist
                  </span>
                  <span className="sumi-label rounded-full border px-3.5 py-2 !text-[0.58rem]" style={{ borderColor: "var(--gold-line)", background: "rgba(var(--paper-rgb),0.6)" }}>
                    Frontend Developer
                  </span>
                </div>
              </div>

              {/* About content */}
              <div className="min-w-0">
                <h2 className="sumi-h2 !text-[clamp(1.9rem,3.6vw,2.7rem)]">
                  Hi, I'm Jonaidah Caris
                  <span className="sumi-accent">.</span>
                </h2>

                <p className="sumi-text mt-8 max-w-[62ch] !leading-[2]">
                  I'm a BS Information Technology student at Mindanao
                  State University, majoring in Database Systems and
                  based in Marawi City. I'm focused on frontend
                  development, with interests in UI/UX and graphic design.
                </p>

                <p className="sumi-text mt-[1.5em] max-w-[62ch] !leading-[2]">
                  I worked as the UI Designer and Frontend Developer
                  for{" "}
                  <span className="!font-normal" style={{ color: "var(--ink)" }}>
                    LAKBAY LANAO
                  </span>
                  , a chatbot-enabled tourist guide platform for Lanao
                  del Sur. I helped build its React and Tailwind CSS
                  interface, integrate Google Maps, and set up the
                  chatbot with ChromaDB.
                </p>

                <p className="sumi-text mt-[1.5em] max-w-[62ch] !leading-[2]">
                  Since February 2025, I've also been a Layout
                  Artist and became Layout Editor for{" "}
                  <span className="!font-normal" style={{ color: "var(--ink)" }}>
                    The Cursor
                  </span>
                  , our college publication. This experience strengthened
                  my eye for composition, typography, and visual hierarchy.
                </p>

                {/* Eligibility */}
                <div
                  className="mt-9 inline-flex items-center gap-3 rounded-[10px] border px-4 py-3"
                  style={{ borderColor: "var(--gold-line)", background: "rgba(var(--paper-rgb),0.6)" }}
                >
                  <span className="size-1.5 shrink-0 rotate-45" style={{ background: "var(--gold)" }} />
                  <span className="sumi-label !text-[0.6rem] !tracking-[0.16em]">
                    CIVIL SERVICE PROFESSIONAL ELIGIBLE | May 2025
                  </span>
                </div>

                {/* Skills */}
                <div className="mt-12">
                  <p className="sumi-label mb-5">Skills</p>

                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="f-body rounded-full px-3.5 py-1.5 text-[0.8rem] transition-colors hover:!text-[color:var(--gold-deep)]"
                        style={{ color: "var(--ink-soft)", background: "var(--parchment)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="sumi-label mb-4 mt-9">Soft Skills</p>

                  <div className="flex flex-wrap gap-2.5">
                    {softSkills.map((skill) => (
                      <span
                        key={skill}
                        className="f-body rounded-full border px-3.5 py-1.5 text-[0.8rem]"
                        style={{ color: "var(--ink-soft)", borderColor: "var(--gold-line)", background: "rgba(var(--paper-rgb),0.6)" }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Resume */}
                <div className="mt-10">
                  <a
                    href={asset("resume/Jonaidah-Caris-Resume.pdf")}
                    download="Jonaidah-Caris-Resume.pdf"
                    className="sumi-btn sumi-btn-solid sumi-btn-pill"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Download Resume / CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
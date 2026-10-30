import SectionHeader, { Accent } from "@/components/sections/SectionHeader";

const roles = ["Creative Artist", "Frontend Developer"];

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

/*
  Structure note: like Creative, the card wrapper stays the direct child of the section
  (the dark theme styles "section > div").
*/
export default function AboutMe() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-8 sm:py-12">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-10">
        <SectionHeader
          id="about-heading"
          eyebrow="About Me"
          title={
            <>
              A little about <Accent>me.</Accent>
            </>
          }
          subtitle="Who I am, what I build, and what I care about."
          className="mb-10"
        />

        <div className="grid items-start gap-8 md:grid-cols-[180px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-12">
          {/* Profile */}
          <div className="flex flex-col items-center md:sticky md:top-28">
            <div className="size-32 overflow-hidden rounded-full border-[3px] border-sky-400 bg-white p-1 sm:size-36 lg:size-40">
              <img
                src="/images/profile-brown.jpg"
                alt="Jo's profile"
                className="h-full w-full rounded-full object-cover object-top"
                loading="lazy"
              />
            </div>

            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-600"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>

          {/* About content */}
          <div className="min-w-0">
            <h3 className="text-3xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-4xl">
              Hi, I'm Jonaidah Caris<span className="text-sky-600">.</span>
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              I'm a BS Information Technology student at Mindanao State University, majoring in
              Database Systems and based in Marawi City. I'm focused on frontend development, with
              interests in UI/UX and graphic design.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              I worked as the UI Designer and Frontend Developer for{" "}
              <span className="font-medium text-slate-900">LAKBAY LANAO</span>, a chatbot-enabled
              tourist guide platform for Lanao del Sur. I helped build its React and Tailwind CSS
              interface, integrate Google Maps, and set up the chatbot with ChromaDB.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Since February 2025, I've also been a Layout Artist and became Layout Editor for{" "}
              <span className="font-medium text-slate-900">The Cursor</span>, our college
              publication. This experience strengthened my eye for composition, typography, and
              visual hierarchy.
            </p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-2 text-xs text-sky-800">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-sky-500" />
              CIVIL SERVICE PROFESSIONAL ELIGIBLE | May 2025
            </p>

            {/* Skills */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                Technical Skills
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
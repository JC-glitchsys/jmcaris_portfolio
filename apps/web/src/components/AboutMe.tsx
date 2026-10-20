
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

  return (
    <section
      id="about"
      className="scroll-mt-12 border-t border-slate-100 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="overflow-hidden rounded-[30px] border border-slate-100 bg-white p-6 shadow-[0_12px_45px_rgba(15,23,42,0.04)] sm:p-9 lg:p-12">
          {/* Section heading */}
          <div className="mb-10 flex items-center gap-4">
            <span className="shrink-0 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
              About Me
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

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

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-600">
                  Creative Artist
                </span>
                <span className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-600">
                  Frontend Developer
                </span>
              </div>
            </div>

            {/* About content */}
            <div className="min-w-0">
              <h2 className="text-3xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-4xl">
                Hi, I'm Jonaidah
                <span className="text-sky-500">.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                I'm a BS Information Technology student at Mindanao
                State University, majoring in Database Systems and
                based in Marawi City. I'm focused on frontend
                development, with interests in UI/UX and graphic design.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                I worked as the UI Designer and Frontend Developer
                for{" "}
                <span className="font-medium text-slate-900">
                  LAKBAY LANAO
                </span>
                , a chatbot-enabled tourist guide platform for Lanao
                del Sur. I helped build its React and Tailwind CSS
                interface, integrate Google Maps, and set up the
                chatbot with ChromaDB.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-500">
                Since February 2025, I've also been a Layout
                Artist and became Layout Editor for{" "}
                <span className="font-medium text-slate-900">
                  The Cursor
                </span>
                , our college publication. This experience strengthened
                my eye for composition, typography, and visual hierarchy.
              </p>

              {/* Eligibility */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/70 px-3.5 py-2 text-xs text-sky-800">
                <span className="size-1.5 rounded-full bg-sky-500" />
                CIVIL SERVICE PROFESSIONAL ELIGIBLE | May 2025
              </div>

              {/* Skills */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Technical Skills
                  </p>
                  <div className="h-px flex-1 bg-slate-100" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";

import { ENSO_PATH, Reveal, SectionHeading } from "../sumi/Ink";

type Tool = { name: string; icon: string; note: string };

type Group = {
  title: string;
  caption: string;
  tools: Tool[];
  /** Adds a quiet "more soon" seal to the ring. */
  soon?: boolean;
  /** Direction of travel; neighbouring orbits turn opposite ways. */
  clockwise: boolean;
};

/** Grouped by how I work. Next.js, shadcn/ui and Cypress were dropped: they are not part of my real stack. */
const GROUPS: Group[] = [
  {
    title: "Frontend",
    caption: "What you see",
    clockwise: true,
    tools: [
      {
        name: "HTML5",
        icon: "https://cdn.simpleicons.org/html5/E34F26",
        note: "Markup",
      },
      {
        name: "CSS3",
        icon: "https://cdn.simpleicons.org/css/1572B6",
        note: "Styling",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
        note: "Language",
      },
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react/61DAFB",
        note: "Frontend",
      },
      {
        name: "Vue.js",
        icon: "https://cdn.simpleicons.org/vuedotjs/42B883",
        note: "Frontend",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        note: "Styling",
      },
    ],
  },
  {
    title: "Backend & Data",
    caption: "What runs it",
    clockwise: false,
    soon: true,
    tools: [
      {
        name: "Node.js",
        icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E",
        note: "Runtime",
      },
      {
        name: "Express.js",
        icon: "https://cdn.simpleicons.org/express/000000",
        note: "Backend",
      },
      {
        name: "Firebase",
        icon: "https://cdn.simpleicons.org/firebase/FFCA28",
        note: "Backend Services",
      },
      {
        name: "MySQL",
        icon: "https://cdn.simpleicons.org/mysql/4479A1",
        note: "Database",
      },
    ],
  },
  {
    title: "Design & Workflow",
    caption: "How it is made",
    clockwise: true,
    tools: [
      {
        name: "Figma",
        icon: "https://cdn.simpleicons.org/figma/F24E1E",
        note: "UI/UX Design",
      },
      {
        name: "Canva",
        icon: "https://cdn.simpleicons.org/canva/00C4CC",
        note: "Graphic Design",
      },
      {
        name: "Git",
        icon: "https://cdn.simpleicons.org/git/F05032",
        note: "Version Control",
      },
      {
        name: "GitHub",
        icon: "https://cdn.simpleicons.org/github/181717",
        note: "Code Hosting",
      },
      {
        name: "Jira",
        icon: "https://cdn.simpleicons.org/jira/0052CC",
        note: "Project Tracking",
      },
      {
        name: "TestRail",
        icon: "https://cdn.simpleicons.org/testrail/65C179",
        note: "Test Management",
      },
    ],
  },
];

type Item = Tool | "soon";

function Orbit({ group }: { group: Group }) {
  const items: Item[] = group.soon
    ? [...group.tools, "soon"]
    : group.tools;

  const style = {
    "--t": "90s",
    "--dir": group.clockwise ? "normal" : "reverse",
    "--dir-back": group.clockwise ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div className="flex flex-col items-center pb-10">
      {/* The orbit is a picture: the list underneath carries the same names for screen readers and touch. */}
      <div className="orbit" aria-hidden="true">
        <div className="orbit-title">
          <div>
            <h3 className="sumi-h3 !leading-tight [font-size:clamp(1.25rem,7cqw,1.85rem)]">
              {group.title}
            </h3>

            <p
              className="sumi-label mt-2 !text-[0.56rem]"
              style={{ color: "var(--gold-deep)" }}
            >
              {group.caption}
            </p>
          </div>
        </div>

        {/* The brush Enso stays still; only the icons travel along it. */}
        <svg
          className="orbit-path"
          viewBox="0 0 400 340"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={ENSO_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            className="sumi-dry"
          />
        </svg>

        <div className="orbit-ring" style={style}>
          {items.map((item, i) => {
            const angle =
              ((-90 + (360 / items.length) * i) * Math.PI) / 180;

            const position = {
              left: `${50 + 50 * Math.cos(angle)}%`,
              top: `${50 + 50 * Math.sin(angle)}%`,
            };

            return (
              <div
                key={item === "soon" ? "soon" : item.name}
                className="orbit-slot"
                style={position}
              >
                <div className="orbit-turn">
                  {item === "soon" ? (
                    <span className="orbit-seal orbit-seal-soon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        className="size-[40%]"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span className="orbit-label">More soon</span>
                    </span>
                  ) : (
                    <span className="orbit-seal">
                      <img
                        src={item.icon}
                        alt=""
                        width={32}
                        height={32}
                        loading="lazy"
                        draggable={false}
                      />

                      <span className="orbit-label">{item.name}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="sr-only">
        {group.tools.map((tool) => (
          <li key={tool.name}>
            {tool.name}: {tool.note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ToolsSection() {
  return (
    <section
      id="tools"
      className="relative scroll-mt-12 py-24 sm:py-28"
    >
      <div className="relative z-10">
        <SectionHeading
          eyebrow="Tools & Technologies"
          icon={
            <Sparkles
              size={14}
              style={{ color: "var(--gold-deep)" }}
              aria-hidden="true"
            />
          }
          subtitle="The tools I use to design, build, and test."
        >
          Tools I <span className="sumi-accent">Use.</span>
        </SectionHeading>

        <div className="grid gap-16 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {GROUPS.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.12}
              className={
                i === 2
                  ? "md:col-span-2 md:mx-auto md:w-1/2 xl:col-span-1 xl:mx-0 xl:w-full"
                  : undefined
              }
            >
              <Orbit group={group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

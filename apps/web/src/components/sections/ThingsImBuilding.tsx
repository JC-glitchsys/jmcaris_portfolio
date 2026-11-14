import { Link } from "react-router-dom";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { Reveal, SectionHeading } from "../sumi/Ink";
import { asset } from "../sumi/hooks";
import { galleryPages, type GalleryPageData } from "../gallery/galleryData";

type Tone = "gray" | "sand" | "blue";

type Project = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  slug: GalleryPageData["slug"];
  href: string;
  cta: string;
  /** Each project has its own ink: light gray, the existing warm sand, and very light blue. */
  tone: Tone;
};

const projects: Project[] = [
  {
    number: "01",
    eyebrow: "VISUAL COMMUNICATION",
    title: "Visual & Editorial",
    description: "Layouts, pubmats, and publication releases.",
    slug: "visual-editorial",
    href: "/visual-editorial",
    cta: "Open the gallery",
    tone: "gray",
  },
  {
    number: "02",
    eyebrow: "INTERFACE DESIGN",
    title: "UI/UX Design",
    description: "Interfaces, prototypes, and design systems.",
    slug: "ui-ux-design",
    href: "/ui-ux-design",
    cta: "See the designs",
    tone: "sand",
  },
  {
    number: "03",
    eyebrow: "WEB DEVELOPMENT",
    title: "Frontend Projects",
    description: "React websites and interactive experiences.",
    slug: "frontend-projects",
    href: "/frontend-projects",
    cta: "Browse the builds",
    tone: "blue",
  },
];

function ProjectCard({ project }: { project: Project }) {
  // The first three real images of each gallery page; empty placeholder slots are skipped.
  const previews = galleryPages[project.slug].items.filter((item) => item.image).slice(0, 3);

  return (
    <Link
      to={project.href}
      aria-label={`${project.title}: ${project.cta}`}
      data-tone={project.tone}
      className="work-card group"
    >
      <span className="work-previews" aria-hidden="true">
        {previews.map((item) => (
          <span key={item.id} className="work-tile">
            <img
              src={asset(item.image!)}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              style={{ objectPosition: item.focus ?? "50% 30%" }}
            />
          </span>
        ))}
      </span>

      <span className="work-body">
        <span className="sumi-label block !text-[0.58rem]" style={{ color: "var(--w-accent)" }}>
          {project.number} <span aria-hidden="true">/</span> {project.eyebrow}
        </span>
        <span className="sumi-h3 mt-2 block">{project.title}</span>
        <span className="sumi-text mt-2 block !text-[0.85rem]">{project.description}</span>

        <span
          className="mt-5 flex items-center justify-between gap-4 border-t pt-4"
          style={{ borderColor: "var(--w-edge)" }}
        >
          <span className="sumi-label !text-[0.58rem]" style={{ color: "var(--ink)" }}>
            {project.cta}
          </span>
          <span className="work-arrow" aria-hidden="true">
            <ArrowUpRight className="size-[18px]" strokeWidth={1.6} />
          </span>
        </span>
      </span>
    </Link>
  );
}

export default function ThingsImBuilding() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="projects" className="scroll-mt-12 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          eyebrow="Creative Space"
          icon={<Layers3 size={14} style={{ color: "var(--gold-deep)" }} aria-hidden="true" />}
          subtitle="Designing ideas. Building experiences. A first look at each collection."
        >
          Things I’m <span className="sumi-accent">Building.</span>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.number} delay={index * 0.12} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
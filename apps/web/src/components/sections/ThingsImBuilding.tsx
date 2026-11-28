import { Link } from "react-router-dom";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { Reveal, SectionHeading } from "../sumi/Ink";
import { asset } from "../sumi/hooks";
import { galleryPages, type GalleryPageData } from "../gallery/galleryData";

type Tone = "gray" | "orange" | "blue";

type Project = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  slug: GalleryPageData["slug"];
  href: string;
  cta: string;
  /** Each project has its own accent color. */
  tone: Tone;
};

type ProjectPreview = { id: string; image: string; focus?: string };

const projects: Project[] = [
  {
    number: "01",
    eyebrow: "VISUAL COMMUNICATION",
    title: "Visual & Editorial",
    description: "Layouts, pubmats, and publication releases.",
    slug: "visual-editorial",
    href: "/visual-editorial",
    cta: "Open the gallery",
    tone: "blue",
  },
  {
    number: "02",
    eyebrow: "INTERFACE DESIGN",
    title: "UI/UX Design",
    description: "Interfaces, prototypes, and design systems.",
    slug: "ui-ux-design",
    href: "/ui-ux-design",
    cta: "See the designs",
    tone: "orange",
  },
  {
    number: "03",
    eyebrow: "WEB DEVELOPMENT",
    title: "Frontend Projects",
    description: "React websites and interactive experiences.",
    slug: "frontend-projects",
    href: "/frontend-projects",
    cta: "Browse the builds",
    tone: "gray",
  },
];

function ProjectCard({ project }: { project: Project }) {
  // Use the requested artwork as the three cover tiles on the main page.
  const previews: ProjectPreview[] = project.slug === "visual-editorial"
    ? ["7.3.png", "11.png", "1.4.png"].map((file) => ({ id: file, image: `gallery/visual-editorial/${file}` }))
    : galleryPages[project.slug].items.flatMap((item) => {
        const image = item.image ?? item.images?.[0]?.image;
        return image ? [{ id: item.id, image, focus: item.focus }] : [];
      }).slice(0, 4);

  return (
    <Link
      to={project.href}
      aria-label={`${project.title}: ${project.cta}`}
      data-tone={project.tone}
      className={`work-card group ${project.slug === "frontend-projects" ? "work-card-frontend" : ""}`}
    >
      <span className={`work-previews ${project.slug === "frontend-projects" ? "work-previews-four" : ""}`} aria-hidden="true">
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
        <span className="sumi-label block text-[0.58rem]!" style={{ color: "var(--w-accent)" }}>
          {project.number} <span aria-hidden="true">/</span> {project.eyebrow}
        </span>
        <span className="sumi-h3 mt-2 block">{project.title}</span>
        <span className="sumi-text mt-2 block text-[0.85rem]!">{project.description}</span>

        <span
          className="mt-5 flex items-center justify-between gap-4 border-t pt-4"
          style={{ borderColor: "var(--w-edge)" }}
        >
          <span className="sumi-label text-[0.58rem]!" style={{ color: "var(--ink)" }}>
            {project.cta}
          </span>
          <span className="work-arrow" aria-hidden="true">
            <ArrowUpRight className="size-4.5" strokeWidth={1.6} />
          </span>
        </span>
      </span>
    </Link>
  );
}

export default function ThingsImBuilding() {
  

  return (
    <section id="projects" className="scroll-mt-12 pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16">
      <div className="mx-auto max-w-360">
        <SectionHeading
          align="center"
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

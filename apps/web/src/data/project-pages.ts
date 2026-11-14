/*
  One entry per card in "Things I'm Building". Each becomes its own page at `href`.

  To add to a gallery: drop the image in public/images/gallery/ and add one line to `items`.
    caption  (optional)  text shown on the tile
    liveUrl  (optional)  adds a "Live view" button on the tile, e.g. liveUrl: "https://your-site.com"
    size     (optional)  "small" (default) | "wide" | "tall" | "large"  -> bento tile size
*/
export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  liveUrl?: string;
  size?: "small" | "wide" | "tall" | "large";
};

export type ProjectPage = {
  href: string;
  title: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  tone: "sky" | "emerald" | "orange";
  items: GalleryItem[];
};

export const projectPages: ProjectPage[] = [
  {
    href: "/visual-editorial",
    title: "Visual & Editorial",
    titleLead: "Visual & ",
    titleAccent: "Editorial.",
    description: "Layouts, pubmats, and publication releases.",
    tone: "sky",
    items: [
      { src: "/images/gallery/visual-1.jpg", alt: "Publication layout", caption: "The Cursor: publication layout", size: "large" },
      { src: "/images/gallery/visual-2.jpg", alt: "Pubmat design", caption: "Pubmat" },
      { src: "/images/gallery/visual-3.jpg", alt: "Feature spread", caption: "Feature spread", size: "tall" },
      { src: "/images/gallery/visual-4.jpg", alt: "Layout detail" },
      { src: "/images/gallery/visual-5.jpg", alt: "Cover design", caption: "Cover design", size: "wide" },
      { src: "/images/gallery/visual-6.jpg", alt: "Poster design" },
      { src: "/images/gallery/visual-7.jpg", alt: "Editorial layout" },
    ],
  },
  {
    href: "/ui-ux-design",
    title: "UI/UX Design",
    titleLead: "UI/UX ",
    titleAccent: "Design.",
    description: "Interfaces, prototypes, and design systems.",
    tone: "emerald",
    items: [
      { src: "/images/gallery/uiux-1.jpg", alt: "LAKBAY LANAO app screens", caption: "LAKBAY LANAO: app screens", size: "large" },
      { src: "/images/gallery/uiux-2.jpg", alt: "Wireframe", caption: "Wireframes" },
      { src: "/images/gallery/uiux-3.jpg", alt: "Mobile prototype", caption: "Mobile prototype", size: "tall" },
      { src: "/images/gallery/uiux-4.jpg", alt: "Component set" },
      { src: "/images/gallery/uiux-5.jpg", alt: "Design system", caption: "Design system", size: "wide" },
      { src: "/images/gallery/uiux-6.jpg", alt: "Dashboard concept" },
      { src: "/images/gallery/uiux-7.jpg", alt: "Landing page concept" },
    ],
  },
  {
    href: "/frontend-projects",
    title: "Frontend Projects",
    titleLead: "Frontend ",
    titleAccent: "Projects.",
    description: "React websites and interactive experiences.",
    tone: "orange",
    items: [
      // Example with a live link: { ..., liveUrl: "https://your-site.com" }
      { src: "/images/gallery/frontend-1.jpg", alt: "LAKBAY LANAO website", caption: "LAKBAY LANAO", size: "large" },
      { src: "/images/gallery/frontend-2.jpg", alt: "Portfolio website", caption: "This portfolio" },
      { src: "/images/gallery/frontend-3.jpg", alt: "Web app screen", caption: "Web app", size: "tall" },
      { src: "/images/gallery/frontend-4.jpg", alt: "Landing page" },
      { src: "/images/gallery/frontend-5.jpg", alt: "Dashboard", caption: "Dashboard", size: "wide" },
      { src: "/images/gallery/frontend-6.jpg", alt: "Interactive component" },
      { src: "/images/gallery/frontend-7.jpg", alt: "Mobile layout" },
    ],
  },
];
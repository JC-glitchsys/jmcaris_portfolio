/*
  Gallery content. Everything here is a clearly marked PLACEHOLDER until you add real material:
    1. Put the screenshot in  public/gallery/<page>/<name>.webp  (or .jpg/.png).
    2. Set `image` to that path, e.g. "gallery/visual-editorial/cursor-issue-12.webp".
    3. Set `title` and `caption`.
    4. Set `liveUrl` ONLY to a real, public https:// deployment. Leave it out otherwise; the
       "See Live View" button is hidden unless the URL is a valid public https link (never localhost).
  Items without an `image` render as a labelled placeholder tile.
*/

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  /** Path under /public, e.g. "gallery/ui-ux-design/dashboard.webp". Omit while it is a placeholder. */
  image?: string;
  alt?: string;
  /** CSS object-position used when the image is cropped into a project-card preview, e.g. "50% 20%". */
  focus?: string;
  /** Real public deployment URL (https only). */
  liveUrl?: string;
};

export type GalleryPageData = {
  slug: "visual-editorial" | "ui-ux-design" | "frontend-projects";
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  items: GalleryItem[];
};

const placeholders = (slug: string, label: string, hint: string, count = 6): GalleryItem[] =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `${slug}-${n}`,
      title: `${label} ${n}`,
      caption: hint,
    };
  });

/** Fills the first slots with real work and leaves the rest as placeholders. */
const withWork = (slots: GalleryItem[], work: Partial<GalleryItem>[]): GalleryItem[] =>
  slots.map((slot, i) => (work[i] ? { ...slot, ...work[i] } : slot));

export const galleryPages: Record<GalleryPageData["slug"], GalleryPageData> = {
  "visual-editorial": {
    slug: "visual-editorial",
    eyebrow: "Visual Communication",
    title: "Visual & ",
    accent: "Editorial.",
    subtitle: "Publication layouts, pubmats, and editorial designs.",
    items: withWork(
      placeholders(
        "visual-editorial",
        "Editorial piece",
        "Placeholder: add a publication layout or pubmat screenshot and its caption in galleryData.ts.",
      ),
      [
        {
          title: "Towards the Limitless",
          caption: "Editorial poster in black and white with layered type and a chess-piece silhouette.",
          alt: "Black and white poster of a chess king casting a long shadow, with small editorial type around it.",
          image: "gallery/visual-editorial/01.webp",
          focus: "50% 58%",
        },
        {
          title: "System, blurred portrait",
          caption: "Grainy blurred portrait poster with a clean text overlay and a small type system.",
          alt: "Grainy grayscale poster of a blurred portrait with a white text bar across the eyes.",
          image: "gallery/visual-editorial/02.webp",
          focus: "50% 42%",
        },
        {
          title: "Asterisk, abstract poster",
          caption: "Abstract poster built from metallic asterisk shapes and oversized type.",
          alt: "Dark abstract poster with large metallic asterisk shapes and faded letterforms.",
          image: "gallery/visual-editorial/03.webp",
          focus: "50% 30%",
        },
      ],
    ),
  },
  "ui-ux-design": {
    slug: "ui-ux-design",
    eyebrow: "Interface Design",
    title: "UI/UX ",
    accent: "Design.",
    subtitle: "Interfaces, prototypes, wireframes, and design systems.",
    items: withWork(
      placeholders(
        "ui-ux-design",
        "Design project",
        "Placeholder: add an interface, wireframe, or prototype screenshot and its caption in galleryData.ts.",
      ),
      [
        {
          title: "Cerydra, profile UI",
          caption: "Character profile interface with a banner, stat chart, skill tiles, and a blue palette.",
          alt: "Blue profile interface for a game character with a banner, a line chart, and skill icon tiles.",
          image: "gallery/ui-ux-design/01.webp",
          focus: "50% 18%",
        },
        {
          title: "Jade, profile UI",
          caption: "Purple profile interface with a hero banner, character card, statistics, and quick actions.",
          alt: "Purple profile interface for a game character with a banner, a character card, and a chart.",
          image: "gallery/ui-ux-design/02.webp",
          focus: "50% 20%",
        },
        {
          title: "Mobile app wireframes",
          caption: "A set of grayscale mobile wireframes covering home, menu, cart, and settings screens.",
          alt: "Grid of grayscale mobile app wireframe screens for a food ordering app.",
          image: "gallery/ui-ux-design/03.webp",
          focus: "50% 12%",
        },
      ],
    ),
  },
  "frontend-projects": {
    slug: "frontend-projects",
    eyebrow: "Web Development",
    title: "Frontend ",
    accent: "Projects.",
    subtitle: "React websites and interactive frontend projects.",
    items: withWork(
      placeholders(
        "frontend-projects",
        "Frontend project",
        "Placeholder: add a project screenshot, caption, and its real deployed https URL in galleryData.ts.",
      ),
      [
        {
          title: "Layla, web concept",
          caption: "Landing page concept with a hero carousel, search, artwork cards, and a lore sidebar.",
          alt: "Web page concept with a blue hero banner, a navigation bar, artwork cards, and a recent search list.",
          image: "gallery/frontend-projects/01.webp",
          focus: "50% 40%",
        },
        {
          title: "Glass mobile screens",
          caption: "Mobile app screens in a soft glass style with light and dark variants.",
          alt: "Grid of mobile app screens in light and dark glassy styles.",
          image: "gallery/frontend-projects/02.webp",
          focus: "50% 30%",
        },
        {
          title: "Destination cards",
          caption: "A row of travel destination cards with photos, details, and an Explore button.",
          alt: "Four travel destination cards for Turkey, Indonesia, Dubai, and Vietnam.",
          image: "gallery/frontend-projects/03.webp",
          focus: "50% 45%",
        },
      ],
    ),
  },
};

/** Only real, public https links count as a live view (no localhost, no private hosts). */
export function isPublicLiveUrl(url?: string): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const h = u.hostname.toLowerCase();
    if (h === "localhost" || h.endsWith(".local") || h.startsWith("127.") || h === "0.0.0.0" || h === "[::1]") return false;
    return h.includes(".");
  } catch {
    return false;
  }
}

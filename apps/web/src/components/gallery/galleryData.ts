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
  /** Multiple images are treated as a group and opened as a manual slider. */
  images?: GallerySlide[];
};

export type GallerySlide = { image: string; caption: string; alt: string };

const visualFiles = [
  "1.png", "1.2.png", "1.3.png", "1.4.png", "2.1.png", "2.2.png", "2.3.png", "2.4.png",
  "3.1.png", "3.2.png", "3.3.png", "4.png", "4.1.png", "4.2.png", "4.3.png", "4.4.png",
  "5.png", "5.1.png", "5.2.png", "5.3.png", "5.4.png", "5.5.png", "5.6.png", "6.png",
  "7.png", "7.1.png", "7.2.png", "7.3.png", "8.png", "8.1.png", "9.png", "9.1.png",
  "9.2.png", "9.3.png", "9.4.png", "9.5.png", "10.png", "10.2.png", "10.3.png", "10.4.png",
  "10.5.png", "10.6.png", "10.7.png", "10.8.png", "10.9.png", "10.10.png", "10.11.png",
  "10.12.png", "10.13.png", "10.14.png", "11.png", "12.png", "12.1.png", "12.2.png",
  "12.3.png", "12.4.png", "13.png", "14.png", "15.png", "15.2.png", "15.3.png", "15.4.png",
  "15.5.png", "16.png", "17.png", "19.png", "20.png", "54.png", "66.png",
];

const groupTitles: Record<string, string> = {
  "1": "SAGAYAN 2026",
  "2": "Batch Rinayag",
  "3": "SIYASAT 2026",
  "4": "SAGAYAN Intramurals",
  "5": "HALALAN 2026",
  "7": "House Baratheon",
  "8": "KASADYA Match Results",
  "9": "Editorial Board",
  "10": "Clickwise Issue 4",
  "12": "5G in Marawi",
  "15": "Esports Summer Cup",
};

const singleTitles: Record<string, string> = {
  "1.png": "SAGAYAN 2026",
  "4.png": "T-Rex Runner-Up",
  "5.png": "HALALAN 2026",
  "6.png": "Learning Modality Survey",
  "7.png": "House Baratheon",
  "8.png": "KASADYA Match Results",
  "9.png": "Editorial Board & Staff",
  "10.png": "Clickwise Issue 4",
  "11.png": "T-Rex Softball Win",
  "12.png": "5G in Marawi",
  "13.png": "Alumni Congratulations",
  "14.png": "Junford Gairanan, Valedictorian",
  "15.png": "Holy Week 2025",
  "16.png": "Join the Editorial Board",
  "17.png": "Join the Editorial Board",
  "19.png": "Congratulations, Prof. Asakil",
  "20.png": "Eid Al-Adha Mubarak",
  "54.png": "Eid Al-Fitr Mubarak",
  "66.png": "Ramadhan Kareem",
};

const visualItems: GalleryItem[] = (() => {
  const numbered = visualFiles.map((file) => ({
    file,
    match: /^(\d+)(?:\.(\d+))?\.(?:png|jpe?g|webp)$/i.exec(file)!,
  }));
  const groups = new Map<string, typeof numbered>();
  numbered.filter(({ match }) => match[2]).forEach((entry) => {
    const group = groups.get(entry.match[1]) ?? [];
    group.push(entry);
    groups.set(entry.match[1], group);
  });
  const emitted = new Set<string>();
  const items: GalleryItem[] = [];
  for (const entry of numbered) {
    const groupId = entry.match[1];
    const group = groups.get(groupId);
    if (entry.match[2] && group && group.length > 1) {
      if (emitted.has(groupId)) continue;
      emitted.add(groupId);
      const slides = group.sort((a, b) => Number(a.match[2]) - Number(b.match[2]));
      items.push({
        id: `visual-editorial-group-${groupId}`,
        title: groupTitles[groupId] ?? `Editorial Collection ${groupId}`,
        caption: `${slides.length} related designs.`,
        images: slides.map(({ file }, i) => ({
          image: `gallery/visual-editorial/${file}`,
          caption: `${groupTitles[groupId] ?? `Editorial Collection ${groupId}`} · Image ${i + 1}`,
          alt: `Visual and editorial design, group ${groupId}, image ${i + 1}`,
        })),
      });
    } else if (!entry.match[2]) {
      items.push({
        id: `visual-editorial-${entry.file}`,
        title: singleTitles[entry.file] ?? `Editorial Design ${entry.match[1]}`,
        caption: "Visual and editorial design.",
        image: `gallery/visual-editorial/${entry.file}`,
        alt: `Visual and editorial design ${entry.match[1]}`,
      });
    }
  }
  return items;
})();

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
    items: visualItems,
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

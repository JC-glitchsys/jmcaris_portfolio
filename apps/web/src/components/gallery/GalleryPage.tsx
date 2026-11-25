import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { Reveal, SectionHeading } from "../sumi/Ink";
import Lightbox, { GalleryImage } from "./Lightbox";
import { galleryPages, isPublicLiveUrl, type GalleryPageData } from "./galleryData";
import { asset } from "../sumi/hooks";

/* Asymmetric bento: literal class strings so Tailwind can see them. */
const SPANS_6 = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-2 row-span-1",
];
const SPANS_8 = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
];

export default function GalleryPage({ slug }: { slug: GalleryPageData["slug"] }) {
  const page = galleryPages[slug];
  const isVisualEditorial = slug === "visual-editorial";
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const opener = useRef<HTMLElement | null>(null);
  const spans = page.items.length > 6 ? SPANS_8 : SPANS_6;

  useEffect(() => {
    const prev = document.title;
    document.title = `${page.title}${page.accent.replace(".", "")} | Jonaidah Caris`;
    return () => {
      document.title = prev;
    };
  }, [page]);

  const open = (i: number) => {
    opener.current = document.activeElement as HTMLElement | null;
    setSlideIndex(0);
    setOpenIndex(i);
  };
  const close = useCallback(() => {
    setOpenIndex(null);
    window.setTimeout(() => opener.current?.focus?.(), 0);
  }, []);

  return (
    <section className="relative py-14 sm:py-20" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-[1240px]">
        <Link
          to={{ pathname: "/", hash: "#projects" }}
          className="sumi-label mb-10 inline-flex items-center gap-2 transition-colors hover:!text-[color:var(--gold-deep)]"
        >
          <span aria-hidden="true">←</span> Back to Things I’m Building
        </Link>

        <div id="gallery-title">
          <SectionHeading eyebrow={page.eyebrow} subtitle={page.subtitle}>
            {page.title}
            <span className="sumi-accent">{page.accent}</span>
          </SectionHeading>
        </div>

        <ul className={`grid gap-x-4 gap-y-8 sm:gap-x-5 lg:gap-x-6 lg:gap-y-10 ${isVisualEditorial ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "auto-rows-[190px] grid-flow-dense grid-cols-2 sm:auto-rows-[240px] lg:auto-rows-[270px] lg:grid-cols-4"}`}>
          {page.items.map((item, i) => {
            const live = isPublicLiveUrl(item.liveUrl);
            return (
              <li key={item.id} className={isVisualEditorial ? "min-w-0" : spans[i % spans.length]}>
                <Reveal delay={(i % 4) * 0.06} className={isVisualEditorial ? "h-auto" : "h-full"}>
                  <button
                    type="button"
                    onClick={() => open(i)}
                    aria-label={`Open ${item.title}, image ${i + 1} of ${page.items.length}`}
                    className={`group flex w-full flex-col text-left ${isVisualEditorial ? "h-auto" : "h-full"}`}
                  >
                    <span className={`relative block min-h-0 overflow-hidden rounded-[12px] ${isVisualEditorial ? "aspect-square w-full" : "flex-1"}`}>
                      {item.images ? <GroupCover item={item} /> : <span className="absolute inset-0 block transition-transform duration-700 ease-out group-hover:scale-[1.03]"><GalleryImage item={item} className={isVisualEditorial ? "object-contain" : "object-cover"} /></span>}
                    </span>
                    <span className="mt-3 block">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="f-body truncate text-[1.1rem] font-semibold tracking-[0.01em]" style={{ color: "var(--ink)" }}>
                          {item.title}
                        </span>
                        {live && (
                          <span className="sumi-label inline-flex shrink-0 items-center gap-1 !text-[0.56rem]" style={{ color: "var(--gold-deep)" }}>
                            Live <ArrowUpRight className="size-3" aria-hidden="true" />
                          </span>
                        )}
                      </span>
                      <span className="sumi-text-sm mt-0.5 line-clamp-2 block !text-[0.74rem] !leading-snug">{item.caption}</span>
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      <Lightbox items={page.items} index={openIndex} slideIndex={slideIndex} onSlideIndexChange={setSlideIndex} onIndexChange={setOpenIndex} onClose={close} />
    </section>
  );
}

function GroupCover({ item }: { item: NonNullable<GalleryPageData["items"][number]> }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || !item.images || item.images.length < 2) return;
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % item.images!.length), 2500);
    return () => window.clearInterval(timer);
  }, [item.images, paused]);
  if (!item.images) return null;
  return <span className="absolute inset-0 bg-[var(--parchment)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>{item.images.map((image, i) => <img key={image.image} src={asset(image.image)} alt="" aria-hidden="true" className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${slide === i ? "opacity-100" : "opacity-0"}`} />)}<span className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5" aria-hidden="true">{item.images.map((image, dot) => <span key={image.image} className={`size-1.5 rounded-full transition-opacity ${dot === slide ? "bg-white" : "bg-white/55"}`} />)}</span></span>;
}

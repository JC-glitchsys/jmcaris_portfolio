import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { Reveal, SectionHeading } from "../sumi/Ink";
import Lightbox, { GalleryImage } from "./Lightbox";
import { galleryPages, isPublicLiveUrl, type GalleryPageData } from "./galleryData";
import { asset, usePrefersReducedMotion } from "../sumi/hooks";
import Footer from "../layout/Footer";

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

  const open = (i: number, initialSlide = 0) => {
    opener.current = document.activeElement as HTMLElement | null;
    setSlideIndex(initialSlide);
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

        {slug === "frontend-projects" ? (
          <FrontendProjectGallery items={page.items} onOpen={open} />
        ) : <ul className={`grid gap-x-4 gap-y-8 sm:gap-x-5 lg:gap-x-6 lg:gap-y-10 ${isVisualEditorial ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "auto-rows-[190px] grid-flow-dense grid-cols-2 sm:auto-rows-[240px] lg:auto-rows-[270px] lg:grid-cols-4"}`}>
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
        </ul>}
      </div>

      <Lightbox items={page.items} index={openIndex} slideIndex={slideIndex} onSlideIndexChange={setSlideIndex} onIndexChange={setOpenIndex} onClose={close} />
      <Footer />
    </section>
  );
}

function FrontendProjectGallery({ items, onOpen }: { items: GalleryPageData["items"]; onOpen: (index: number, slideIndex: number) => void }) {
  const [slides, setSlides] = useState(() => items.map(() => 0));
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setSlides((current) => current.map((slide, i) => {
        const count = items[i].images?.length ?? 1;
        return (slide + 1) % count;
      }));
    }, 4000);
    return () => window.clearInterval(timer);
  }, [items, paused, reducedMotion]);

  const setSlide = (projectIndex: number, slideIndex: number) => {
    setSlides((current) => current.map((slide, i) => i === projectIndex ? slideIndex : slide));
  };

  return (
    <ul className="space-y-14 sm:space-y-20">
      {items.map((item, projectIndex) => {
        const images = item.images ?? [];
        const activeSlide = slides[projectIndex] ?? 0;
        const currentImage = images[activeSlide];
        return (
          <li key={item.id} className="mx-auto max-w-[1080px]">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:mb-7 sm:flex-row sm:items-end">
              <div>
                <h2 className="f-body text-[1.1rem] tracking-[0.01em]" style={{ color: "var(--ink)", fontWeight: 700 }}>{item.title}</h2>
                <p className="sumi-text-sm mt-1 max-w-2xl !text-[0.82rem]" style={{ fontWeight: 500 }}>{item.caption}</p>
              </div>
              {isPublicLiveUrl(item.liveUrl) ? (
                <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="sumi-btn sumi-btn-pill sumi-btn-live inline-flex w-fit items-center gap-2 !px-5 !py-3">
                  Live View <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--gold-line)", background: "var(--card-solid)", boxShadow: "0 6px 20px -15px rgba(var(--ink-rgb), 0.22)" }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}>
              <div className="flex h-11 items-center gap-2 border-b px-4 sm:h-12" style={{ borderColor: "var(--gold-line)", background: "var(--parchment)" }} aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#e68a78]" />
                <span className="size-2.5 rounded-full bg-[#e2c273]" />
                <span className="size-2.5 rounded-full bg-[#8ebd88]" />
                <span className="mx-auto w-[min(52%,480px)] truncate rounded-md border px-3 py-1 text-center font-sans text-[0.62rem] text-slate-500 sm:text-xs" style={{ borderColor: "var(--gold-line)", background: "var(--card-solid)" }}>{item.title.toLowerCase().replaceAll(" ", "-")}.website</span>
              </div>

              <div className="relative" aria-live="polite">
                {currentImage && (
                  <button type="button" onClick={() => onOpen(projectIndex, activeSlide)} aria-label={`Open ${item.title}, screen ${activeSlide + 1}`} className="block w-full cursor-zoom-in bg-white">
                    <img src={asset(currentImage.image)} alt={currentImage.alt} draggable={false} className="block h-auto w-full select-none" />
                  </button>
                )}
                {images.length > 1 && <>
                  <button type="button" onClick={() => setSlide(projectIndex, (activeSlide - 1 + images.length) % images.length)} aria-label={`Previous ${item.title} screenshot`} className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 sm:left-5 sm:size-12"><ChevronLeft className="size-6" aria-hidden="true" /></button>
                  <button type="button" onClick={() => setSlide(projectIndex, (activeSlide + 1) % images.length)} aria-label={`Next ${item.title} screenshot`} className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75 sm:right-5 sm:size-12"><ChevronRight className="size-6" aria-hidden="true" /></button>
                </>}
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="flex max-w-full flex-wrap justify-center gap-2" role="group" aria-label={`${item.title} screenshots`}>
                {images.map((image, i) => <button key={image.image} type="button" onClick={() => setSlide(projectIndex, i)} aria-label={`Show ${item.title} screenshot ${i + 1}`} aria-current={i === activeSlide ? "true" : undefined} className="h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ width: i === activeSlide ? "1.6rem" : ".55rem", background: i === activeSlide ? "var(--gold-deep)" : "var(--gold-line)" }} />)}
              </div>
              <span className="sumi-label !text-[0.58rem]" aria-live="polite">{activeSlide + 1} / {images.length}</span>
            </div>
          </li>
        );
      })}
    </ul>
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

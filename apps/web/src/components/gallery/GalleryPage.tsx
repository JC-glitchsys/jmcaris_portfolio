import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { Reveal, SectionHeading } from "../sumi/Ink";
import Lightbox, { GalleryImage } from "./Lightbox";
import { galleryPages, isPublicLiveUrl, type GalleryPageData } from "./galleryData";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

        <ul className="grid auto-rows-[190px] grid-flow-dense grid-cols-2 gap-x-4 gap-y-8 sm:auto-rows-[240px] sm:gap-x-5 lg:auto-rows-[270px] lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          {page.items.map((item, i) => {
            const live = isPublicLiveUrl(item.liveUrl);
            return (
              <li key={item.id} className={spans[i % spans.length]}>
                <Reveal delay={(i % 4) * 0.06} className="h-full">
                  <button
                    type="button"
                    onClick={() => open(i)}
                    aria-label={`Open ${item.title}, image ${i + 1} of ${page.items.length}`}
                    className="group flex h-full w-full flex-col text-left"
                  >
                    <span className="relative block min-h-0 flex-1 overflow-hidden rounded-[12px]">
                      <span className="absolute inset-0 block transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                        <GalleryImage item={item} />
                      </span>
                    </span>
                    <span className="mt-3 block">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="f-display truncate text-[1.1rem] font-medium tracking-[0.03em]" style={{ color: "var(--ink)" }}>
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

      <Lightbox items={page.items} index={openIndex} onIndexChange={setOpenIndex} onClose={close} />
    </section>
  );
}

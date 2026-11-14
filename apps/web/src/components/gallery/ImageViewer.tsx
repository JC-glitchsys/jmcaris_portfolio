import { useEffect, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import GalleryImage from "@/components/gallery/GalleryImage";
import type { GalleryItem } from "@/data/project-pages";

type ImageViewerProps = {
  items: GalleryItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const navButton =
  "absolute top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 transition-colors hover:bg-white";

/* Full-screen viewer on a native <dialog>: focus trap and Esc come built in. */
export default function ImageViewer({ items, index, onIndexChange, onClose }: ImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const item = items[index];
  const hasMany = items.length > 1;

  const go = (step: number) => onIndexChange((index + step + items.length) % items.length);

  useEffect(() => {
    dialogRef.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Image viewer, ${index + 1} of ${items.length}`}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (!hasMany) return;
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
      className="m-auto max-h-[94vh] w-[min(1100px,94vw)] overflow-visible bg-transparent p-0 backdrop:bg-slate-950/85 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex w-full items-center justify-center">
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-2 top-2 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-slate-800 transition-colors hover:bg-white"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          {hasMany && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${navButton} left-2`}>
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${navButton} right-2`}>
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          )}

          <GalleryImage
            key={item.src}
            src={item.src}
            alt={item.alt}
            className="max-h-[74vh] min-h-[40vh] w-auto min-w-[min(60vw,640px)] max-w-full rounded-2xl object-contain"
          />
        </div>

        <div className="flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-5 py-3">
          <p className="min-w-0 text-sm font-medium text-slate-800">{item.caption ?? item.alt}</p>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-xs text-slate-500">
              {index + 1} / {items.length}
            </span>
            {item.liveUrl && (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-200 px-3 py-1.5 text-xs font-semibold text-[#343a40] transition-colors hover:bg-sky-300"
              >
                Live view
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
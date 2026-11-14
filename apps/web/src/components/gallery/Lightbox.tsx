import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { asset } from "../sumi/hooks";
import { isPublicLiveUrl, type GalleryItem } from "./galleryData";

/** Quiet ink-wash stand-in until a real image is added in galleryData.ts. Not a screenshot. */
export function PlaceholderArt({ large = false }: { large?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-end overflow-hidden" style={{ background: "var(--parchment)" }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full" style={{ color: "var(--brush)" }}>
        <defs>
          <linearGradient id="ph-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.07" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#ph-mist)" />
        <path d="M0 210 Q70 150 140 188 T270 170 Q340 140 400 190 L400 300 L0 300Z" fill="currentColor" opacity="0.06" />
        <path d="M0 245 Q90 205 170 236 T330 226 Q370 218 400 232 L400 300 L0 300Z" fill="currentColor" opacity="0.09" />
      </svg>
      <span className={`sumi-label relative m-4 !tracking-[0.2em] ${large ? "!text-[0.66rem]" : "!text-[0.56rem]"}`} style={{ color: "var(--ink-mute)", opacity: 0.8 }}>
        Image to come
      </span>
    </div>
  );
}

export function GalleryImage({ item, className = "" }: { item: GalleryItem; className?: string }) {
  if (!item.image) return <PlaceholderArt />;
  return (
    <img
      src={asset(item.image)}
      alt={item.alt ?? `${item.title}: ${item.caption}`}
      loading="lazy"
      draggable={false}
      className={`h-full w-full select-none object-cover ${className}`}
    />
  );
}

type Props = {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

export default function Lightbox({ items, index, onIndexChange, onClose }: Props) {
  const open = index !== null;
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = items.length;

  const go = useCallback(
    (step: number) => {
      if (index === null || count < 2) return;
      setDir(step);
      onIndexChange((index + step + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Keyboard + scroll lock + initial focus while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, onClose]);

  const item = index !== null ? items[index] : null;
  const live = item && isPublicLiveUrl(item.liveUrl) ? item.liveUrl : null;

  return (
    <AnimatePresence>
      {open && item && index !== null && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title}, image ${index + 1} of ${count}`}
          className="fixed inset-0 z-[90] flex flex-col"
          style={{ background: "rgba(18, 17, 13, 0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5" onClick={(e) => e.stopPropagation()}>
            <p className="sumi-label !text-[0.7rem] !tracking-[0.22em]" style={{ color: "#eee7d7" }} aria-live="polite">
              {String(index + 1).padStart(2, "0")} <span style={{ color: "#c9a96a" }}>/</span> {String(count).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="inline-flex size-11 items-center justify-center rounded-full border transition-colors hover:bg-[rgba(201,169,106,0.2)]"
              style={{ borderColor: "rgba(201,169,106,0.6)", color: "#eee7d7" }}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onTouchStart={(e) => {
              const t = e.touches[0];
              touch.current = { x: t.clientX, y: t.clientY };
            }}
            onTouchEnd={(e) => {
              const start = touch.current;
              touch.current = null;
              if (!start) return;
              const t = e.changedTouches[0];
              const dx = t.clientX - start.x;
              const dy = t.clientY - start.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1);
            }}
          >
            {count > 1 && (
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-2 z-10 inline-flex size-11 items-center justify-center rounded-full border transition-colors hover:bg-[rgba(201,169,106,0.22)] sm:left-6"
                style={{ borderColor: "rgba(201,169,106,0.6)", color: "#eee7d7", background: "rgba(18,17,13,0.5)" }}
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
            )}

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div
                key={item.id}
                custom={dir}
                className="max-h-full w-full max-w-4xl overflow-hidden rounded-[12px]"
                style={{ background: "#1d1c17" }}
                initial={{ opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {item.image ? (
                  <img
                    src={asset(item.image)}
                    alt={item.alt ?? `${item.title}: ${item.caption}`}
                    draggable={false}
                    className="mx-auto block max-h-[58vh] w-auto max-w-full select-none object-contain"
                  />
                ) : (
                  <div className="aspect-[16/10] max-h-[58vh] w-full">
                    <PlaceholderArt large />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-2 z-10 inline-flex size-11 items-center justify-center rounded-full border transition-colors hover:bg-[rgba(201,169,106,0.22)] sm:right-6"
                style={{ borderColor: "rgba(201,169,106,0.6)", color: "#eee7d7", background: "rgba(18,17,13,0.5)" }}
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="px-5 pb-6 pt-4 text-center sm:pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto max-w-2xl" aria-live="polite">
              <h3 className="f-display text-[1.5rem] font-semibold tracking-[0.04em]" style={{ color: "#f4eedf" }}>
                {item.title}
              </h3>
              <p className="f-body mt-2 text-[0.86rem]" style={{ color: "#cfc7b6" }}>
                {item.caption}
              </p>
            </div>
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="sumi-btn sumi-btn-gold mt-5 !py-3"
              >
                See Live View <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

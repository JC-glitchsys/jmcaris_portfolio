import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import GalleryImage from "@/components/gallery/GalleryImage";
import ImageViewer from "@/components/gallery/ImageViewer";
import type { GalleryItem } from "@/data/project-pages";

const spans = {
  small: "",
  wide: "col-span-2",
  tall: "row-span-2",
  large: "col-span-2 row-span-2",
} as const;

export default function BentoGallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ul className="grid auto-rows-[160px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:auto-rows-[230px] lg:grid-cols-4">
        {items.map((item, index) => (
          <li
            key={item.src}
            className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white ${spans[item.size ?? "small"]}`}
          >
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`View larger: ${item.caption ?? item.alt}`}
              className="absolute inset-0 block size-full cursor-zoom-in"
            >
              <GalleryImage
                src={item.src}
                alt={item.alt}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
            </button>

            {(item.caption || item.liveUrl) && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-slate-950/75 via-slate-950/35 to-transparent p-4 pt-12 text-white">
                {item.caption && <p className="text-sm font-medium leading-5">{item.caption}</p>}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-sky-100"
                  >
                    Live view
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {active !== null && (
        <ImageViewer
          items={items}
          index={active}
          onIndexChange={setActive}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
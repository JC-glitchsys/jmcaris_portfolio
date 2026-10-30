import { useEffect, useRef } from "react";
import { Layers3 } from "lucide-react";

import SectionHeader, { Accent } from "@/components/sections/SectionHeader";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
  initials: string;
};

// Replace these sample quotes with genuine feedback before publishing.
const testimonials: Testimonial[] = [
  {
    name: "Janisah Macarimbang",
    role: "Backend collaboration",
    image: "/images/person1.jpg",
    quote:
      "Jo was easy to work with and always open to sharing ideas. She paid attention to the details and helped keep our project moving in the right direction.",
    rating: 4,
    initials: "JM",
  },
  {
    name: "Design Teammate",
    role: "Project collaboration",
    image: "/images/person3.jpg",
    quote:
      "Jo listened to feedback and made thoughtful changes. The layouts were clear and consistent, and working together made the whole process smoother.",
    rating: 5,
    initials: "DT",
  },
  {
    name: "Somaimah Ampaso",
    role: "Academic project",
    image: "/images/person2.jpg",
    quote:
      "Jo put a lot of care into how the project looked and felt to use. Her attention to the small details helped make the final presentation feel polished.",
    rating: 5,
    initials: "SA",
  },
];

const loopedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stepTimer = 0;
    const start = () => {
      window.clearInterval(stepTimer);
      stepTimer = window.setInterval(() => {
        if (pausedRef.current || !track) return;
        const card = track.querySelector<HTMLElement>("[data-testimonial-card]");
        if (!card) return;
        const styles = window.getComputedStyle(track);
        const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
        const step = card.getBoundingClientRect().width + gap;
        const halfway = track.scrollWidth / 2;

        if (track.scrollLeft >= halfway - step / 2) {
          track.scrollTo({ left: 0, behavior: "auto" });
          requestAnimationFrame(() => track.scrollBy({ left: step, behavior: "smooth" }));
        } else {
          track.scrollBy({ left: step, behavior: "smooth" });
        }
      }, 3000);
    };

    start();
    return () => window.clearInterval(stepTimer);
  }, []);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 border-t border-sky-100/80 py-12 sm:py-16 lg:py-20"
    >
      <div className="scroll-reveal overflow-hidden rounded-[28px] border border-white/70 bg-white/[0.32] px-5 py-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_22px_60px_rgba(72,104,132,0.12)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[32px] sm:px-9 sm:py-12 lg:px-12">
        <SectionHeader
          id="testimonials-heading"
          icon={Layers3}
          eyebrow="Testimonials"
          title={
            <>
              Words from <Accent>others.</Accent>
            </>
          }
          subtitle="A few reflections on collaboration, creativity, and the work we build together."
        />

        <div className="relative mt-8 sm:mt-10">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Testimonials carousel; moves automatically and can be swiped"
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { pausedRef.current = false; }}
            onFocus={() => { pausedRef.current = true; }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) pausedRef.current = false;
            }}
            onTouchStart={() => { pausedRef.current = true; }}
            onTouchEnd={() => { window.setTimeout(() => { pausedRef.current = false; }, 1200); }}
          >
            {loopedTestimonials.map((testimonial, index) => (
              <article
                data-testimonial-card
                key={`${testimonial.name}-${index}`}
                aria-hidden={index >= testimonials.length ? true : undefined}
                className="w-[86%] min-w-[86%] snap-start rounded-[22px] border border-sky-100/90 bg-white/90 p-5 shadow-[0_8px_24px_rgba(74,132,174,0.07)] transition-colors hover:border-sky-200 sm:w-[calc(50%-8px)] sm:min-w-[calc(50%-8px)] sm:p-6 lg:w-[calc(33.333%-11px)] lg:min-w-[calc(33.333%-11px)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex gap-1 text-sky-500" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: Math.floor(testimonial.rating) }, (_, starIndex) => (
                      <span key={starIndex} aria-hidden="true" className="text-lg leading-none sm:text-xl">★</span>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <span aria-hidden="true" className="text-lg leading-none sm:text-xl">½</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-slate-400">{testimonial.rating.toFixed(1)}</span>
                </div>
                <p className="mt-5 min-h-[112px] text-sm leading-7 text-slate-600 sm:min-h-[126px]">
                  “{testimonial.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-sky-100 pt-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-sky-400 bg-sky-50 p-0.5 shadow-[0_0_12px_rgba(56,189,248,0.18)] sm:h-14 sm:w-14">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={`${testimonial.name}'s profile`}
                        className="h-full w-full rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
                        {testimonial.initials}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
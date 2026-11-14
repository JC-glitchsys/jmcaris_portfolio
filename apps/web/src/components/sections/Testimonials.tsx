import { useCallback, useEffect, useRef } from "react";
import type { FocusEvent, KeyboardEvent, PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Layers3 } from "lucide-react";
import { Reveal, SectionHeading } from "../sumi/Ink";
import { asset } from "../sumi/hooks";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
  initials: string;
  /** Fictional placeholder content, shown with a "Sample" tag. */
  sample?: boolean;
};

const testimonials: Testimonial[] = [
  {
    name: "Janisah Macarimbang",
    role: "Backend collaboration",
    image: asset("images/person1.jpg"),
    quote:
      "Jo was easy to work with and always open to sharing ideas. She paid attention to the details and helped keep our project moving in the right direction.",
    rating: 4,
    initials: "JM",
  },
  {
    name: "Design Teammate",
    role: "Project collaboration",
     image: asset("images/person3.jpg"),
    quote:
      "Jo listened to feedback and made thoughtful changes. The layouts were clear and consistent, and working together made the whole process smoother.",
    rating: 5,
    initials: "DT",
  },
  {
    name: "Somaimah Ampaso",
    role: "Academic project",
     image: asset("images/person2.jpg"),
    quote:
      "Jo put a lot of care into how the project looked and felt to use. Her attention to the small details helped make the final presentation feel polished.",
    rating: 5,
    initials: "SA",
  },
  {
    name: "Mika Reyes",
    role: "Sample: project lead",
    quote:
      "Sample feedback: clear communication, tidy component structure, and layouts that held up well on small screens. Handoffs were easy to follow.",
    rating: 5,
    initials: "MR",
    sample: true,
  },
  {
    name: "Daniel Cruz",
    role: "Sample: code reviewer",
    quote:
      "Sample feedback: readable code, sensible naming, and a habit of testing the edge cases before asking for review.",
    rating: 4.5,
    initials: "DC",
    sample: true,
  },
  {
    name: "Lena Okafor",
    role: "Sample: UI critique partner",
    quote:
      "Sample feedback: she turns vague notes into concrete interface changes and keeps spacing and type consistent from screen to screen.",
    rating: 5,
    initials: "LO",
    sample: true,
  },
];

const DRAG_THRESHOLD = 5;
/** Auto-slide speed in px per second: one card takes roughly half a minute. */
const SPEED = 16;
/** After the person touches, scrolls, or uses an arrow, autoplay waits this long. */
const IDLE_RESUME_MS = 3500;
const CARD_GAP = 20;
/*
  Three identical copies sit side by side so the slider can loop in both directions.
  Only copy 1 is real content: copies 0 and 2 are aria-hidden and inert visual duplicates,
  so there are still exactly six testimonials for assistive tech and keyboards.
*/
const COPIES = [0, 1, 2];

function TestimonialCard({ testimonial, copy }: { testimonial: Testimonial; copy: number }) {
  return (
    <article
      data-testimonial-card
      data-copy={copy}
      aria-hidden={copy !== 1 || undefined}
      inert={copy !== 1}
      className="sumi-card slider-card flex flex-col p-7 sm:p-8"
      style={{ background: "var(--card-solid)" }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1" style={{ color: "var(--gold)" }} aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: Math.floor(testimonial.rating) }, (_, starIndex) => (
            <span key={starIndex} aria-hidden="true" className="text-base leading-none">★</span>
          ))}
          {testimonial.rating % 1 !== 0 && (
            <span aria-hidden="true" className="text-base leading-none">½</span>
          )}
        </div>
        {testimonial.sample ? (
          <span className="sumi-label rounded-full border px-2.5 py-1 !text-[0.56rem]" style={{ borderColor: "var(--edge-strong)", color: "var(--ink-mute)" }}>
            Sample
          </span>
        ) : (
          <span className="sumi-label !text-[0.62rem]" style={{ color: "var(--ink-mute)" }}>{testimonial.rating.toFixed(1)}</span>
        )}
      </div>
      <p className="sumi-text mt-6 min-h-[132px] flex-1 !text-[0.9rem] !leading-[1.95]">
        “{testimonial.quote}”
      </p>
      <div className="mt-6 flex items-center gap-4 border-t pt-5" style={{ borderColor: "var(--edge)" }}>
        <div
          className="h-12 w-12 shrink-0 overflow-hidden rounded-full border p-0.5 sm:h-14 sm:w-14"
          style={{ borderColor: "var(--edge-strong)", background: "var(--card-solid)" }}
        >
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={`${testimonial.name}'s profile`}
              draggable={false}
              className="h-full w-full rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="f-display flex h-full w-full items-center justify-center rounded-full text-sm" style={{ color: "var(--gold-deep)" }}>
              {testimonial.initials}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="f-display truncate !text-[1.05rem] tracking-[0.08em]" style={{ color: "var(--ink)" }}>{testimonial.name}</p>
          <p className="sumi-text-sm mt-0.5 !text-[0.72rem]">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const auto = useRef({
    pos: 0,
    lastSet: 0,
    setW: 0,
    hover: false,
    focus: false,
    touching: false,
    snapAfter: false,
    visible: true,
    idleUntil: 0,
  });

  const holdAutoplay = useCallback(() => {
    auto.current.idleUntil = performance.now() + IDLE_RESUME_MS;
  }, []);

  /* Autoplay: one requestAnimationFrame loop; it only writes scrollLeft while nothing is interacting. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const st = auto.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const first = track.querySelector<HTMLElement>('[data-copy="0"]');
      const second = track.querySelector<HTMLElement>('[data-copy="1"]');
      if (first && second) st.setW = second.offsetLeft - first.offsetLeft;
    };
    const jump = (x: number) => track.scrollTo({ left: x, behavior: "instant" });

    /** Keep the view inside the middle copy's neighbourhood; the content is identical, so the jump is invisible. */
    const normalize = () => {
      const w = st.setW;
      if (!w) return;
      const x = track.scrollLeft;
      if (x < w * 0.5) jump(x + w);
      else if (x >= w * 2) jump(x - w);
      st.pos = track.scrollLeft;
      st.lastSet = st.pos;
    };

    measure();
    jump(st.setW);
    st.pos = st.lastSet = track.scrollLeft;

    const ro = new ResizeObserver(() => {
      const before = st.setW;
      measure();
      if (before && st.setW && before !== st.setW) {
        jump(st.setW + ((track.scrollLeft - before) % st.setW));
        st.pos = st.lastSet = track.scrollLeft;
      }
    });
    ro.observe(track);

    const io = new IntersectionObserver(([entry]) => {
      st.visible = entry.isIntersecting;
    });
    io.observe(track);

    /** After a swipe, glide to the nearest card start so cards never rest half-cut. */
    const snapToNearest = () => {
      const trackLeft = track.getBoundingClientRect().left;
      let best: { x: number; d: number } | null = null;
      track.querySelectorAll<HTMLElement>("[data-testimonial-card]").forEach((card) => {
        const x = card.getBoundingClientRect().left - trackLeft + track.scrollLeft;
        const d = Math.abs(x - track.scrollLeft);
        if (!best || d < best.d) best = { x, d };
      });
      const target = best as { x: number; d: number } | null;
      if (target && target.d > 2) track.scrollTo({ left: target.x, behavior: "smooth" });
    };

    let settle = 0;
    const onSettled = () => {
      normalize();
      if (st.snapAfter && !st.touching) {
        st.snapAfter = false;
        snapToNearest();
      }
    };
    const onScroll = () => {
      // Our own writes land within a pixel or two of lastSet; anything else is the person scrolling.
      if (Math.abs(track.scrollLeft - st.lastSet) > 3) {
        holdAutoplay();
        window.clearTimeout(settle);
        settle = window.setTimeout(onSettled, 160);
      }
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      const paused =
        st.hover || st.focus || st.touching || now < st.idleUntil || !st.visible || document.hidden || reduceMotion.matches;
      if (paused) {
        st.pos = track.scrollLeft;
      } else if (st.setW) {
        st.pos += SPEED * dt;
        if (st.pos >= st.setW * 2) st.pos -= st.setW;
        st.lastSet = st.pos;
        track.scrollLeft = st.pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      ro.disconnect();
      io.disconnect();
      track.removeEventListener("scroll", onScroll);
    };
  }, [holdAutoplay]);

  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      const card = track?.querySelector<HTMLElement>("[data-testimonial-card]");
      if (!track || !card) return;
      holdAutoplay();
      track.scrollBy({ left: direction * (card.getBoundingClientRect().width + CARD_GAP), behavior: "smooth" });
    },
    [holdAutoplay],
  );

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;
      if (e.pointerType !== "mouse") {
        // Touch and pen use native scrolling and momentum; autoplay stands still meanwhile.
        auto.current.touching = true;
        auto.current.snapAfter = true;
        return;
      }
      if (e.button !== 0) return;
      drag.current = { active: true, moved: false, startX: e.clientX, startLeft: track.scrollLeft };
    },
    [],
  );

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const d = drag.current;
    if (!track || !d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!d.moved) {
      d.moved = true;
      track.classList.add("is-dragging");
      track.setPointerCapture(e.pointerId);
    }
    track.scrollLeft = d.startLeft - dx;
  }, []);

  const endPointer = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      const d = drag.current;
      if (e.pointerType !== "mouse") {
        auto.current.touching = false;
        holdAutoplay();
      }
      if (!track || !d.active) return;
      d.active = false;
      if (d.moved) {
        if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
        track.classList.remove("is-dragging");
        holdAutoplay();
      }
    },
    [holdAutoplay],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    },
    [step],
  );

  // Pause while the pointer is over the slider or arrows, or while keyboard focus is inside.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(":focus-visible")) auto.current.focus = true;
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) auto.current.focus = false;
  };

  return (
    <section id="testimonials" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="TESTIMONIALS"
          icon={<Layers3 size={14} style={{ color: "var(--gold-deep)" }} aria-hidden="true" />}
          subtitle="A few reflections on collaboration, creativity, and the work we build together. Cards tagged Sample are demo placeholders, not real endorsements."
        >
          Words from <span className="sumi-accent">others.</span>
        </SectionHeading>

        <div
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") auto.current.hover = true;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") {
              auto.current.hover = false;
              holdAutoplay();
            }
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <div
            ref={trackRef}
            className="slider"
            role="region"
            aria-label="Testimonials. They drift slowly and pause when you hover or touch. Swipe, drag, or use the arrow buttons to browse."
            tabIndex={0}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            onKeyDown={onKeyDown}
            onDragStart={(e) => e.preventDefault()}
          >
            {COPIES.map((copy) =>
              testimonials.map((testimonial) => (
                <TestimonialCard key={`${copy}-${testimonial.name}`} testimonial={testimonial} copy={copy} />
              )),
            )}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:justify-end">
            <button type="button" className="slider-arrow" aria-label="Previous testimonial" onClick={() => step(-1)}>
              <ChevronLeft className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
            </button>
            <button type="button" className="slider-arrow" aria-label="Next testimonial" onClick={() => step(1)}>
              <ChevronRight className="size-[18px]" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
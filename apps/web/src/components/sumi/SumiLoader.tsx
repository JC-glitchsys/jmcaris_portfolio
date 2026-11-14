
import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { asset } from "./hooks";
import { Crow } from "./Ink";

const HERO_IMAGES = ["images/ninja-body.webp", "images/ninja-hat.webp"];
const MAX_WAIT = 4500;

function useLoadProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let active = true;

    const tasks: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), {
              once: true,
            });
          }),
      ...HERO_IMAGES.map((src) => {
        const image = new Image();
        image.src = asset(src);
        return image.decode().catch(() => undefined);
      }),
    ];

    let completed = 0;

    tasks.forEach((task) => {
      void Promise.resolve(task).finally(() => {
        completed += 1;
        if (active) {
          setProgress(completed / tasks.length);
        }
      });
    });

    return () => {
      active = false;
    };
  }, []);

  return progress;
}

export default function SumiLoader({
  onReveal,
  onDone,
}: {
  onReveal: () => void;
  onDone: () => void;
}) {
  const loaded = useLoadProgress();
  const loadedRef = useRef(0);
  const startedAt = useRef(0);
  const leaving = useRef(false);

  const [exiting, setExiting] = useState(false);

  const progress = useMotionValue(0);
  const hole = useMotionValue(-18);

  const fillWidth = useTransform(
    progress,
    (value) => `${value * 100}%`
  );

  const revealMask = useMotionTemplate`radial-gradient(circle at 50% 52%, transparent ${hole}%, #000 calc(${hole}% + 22%))`;

  useEffect(() => {
    loadedRef.current = loaded;
  }, [loaded]);

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);

  const leave = useCallback(
    (skip = false) => {
      if (leaving.current) return;

      leaving.current = true;
      setExiting(true);
      onReveal();

      animate(hole, 125, {
        duration: skip ? 0.35 : 0.65,
        ease: [0.4, 0, 0.2, 1],
        onComplete: onDone,
      });
    },
    [hole, onReveal, onDone]
  );

  useAnimationFrame(() => {
    if (leaving.current) return;

    const elapsed = performance.now() - startedAt.current;
    const target = loadedRef.current;

    const current = progress.get();
    const next = current + (target - current) * 0.2;

    progress.set(next);

    if ((target >= 1 && elapsed > 450) || elapsed > MAX_WAIT) {
      progress.set(1);
      leave();
    }
  });

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-100 overflow-hidden"
      style={{
        background: "var(--paper)",
        color: "var(--brush)",
        WebkitMaskImage: revealMask,
        maskImage: revealMask,
      }}
    >
      <div className="sumi-grain" />

      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-[38%] w-[min(68vw,520px)] -translate-x-1/2"
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative flex justify-center">
            <div
              className="absolute top-1/2 h-20 w-64 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background: "rgba(var(--ink-rgb),0.08)",
              }}
            />

            <Crow
              className="relative z-10 w-24 sm:w-32"
              flap={false}
            />
          </div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-[54%] h-px w-[min(42vw,280px)] -translate-x-1/2 origin-left"
          style={{ background: "var(--gold)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.8 }}
          transition={{
            duration: 0.9,
            delay: 0.12,
            ease: "easeOut",
          }}
        />
      </div>

      <div className="absolute bottom-[13%] left-1/2 w-[min(54vw,260px)] -translate-x-1/2">
        <div
          className="h-0.75 overflow-hidden rounded-full"
          style={{
            background: "rgba(var(--ink-rgb),0.12)",
          }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: fillWidth,
              background: "var(--ink)",
            }}
          />
        </div>

        <p
          className="mt-3 text-center font-(--font-body) text-[0.58rem] font-medium uppercase tracking-[0.24em]"
          style={{ color: "var(--ink-mute)" }}
        >
          A little ink, a little imagination
        </p>
      </div>

      {!exiting && (
        <button
          type="button"
          onClick={() => leave(true)}
          className="absolute right-5 top-5 rounded-full border px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition hover:bg-[rgba(201,169,106,0.14)]"
          style={{
            borderColor: "var(--gold-line)",
            color: "var(--ink-mute)",
          }}
        >
          Skip
        </button>
      )}
    </motion.div>
  );
}

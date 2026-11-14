import { useCallback, useEffect, useRef, useState } from "react";

import { asset } from "./hooks";

const MUSIC_SRC = "music/japanese-ambient.mp3";
const MUSIC_VOLUME = 0.1;
const UNLOCK_EVENTS = ["pointerdown", "pointerup", "keydown", "touchend"] as const;

/**
 * Ambient music. One Audio instance for the whole app. It tries to start on load; if the browser blocks
 * that (normal), it starts on the first eligible interaction instead. Autoplay rules are never bypassed:
 * we only call play() and handle the rejection. Once the visitor presses Pause, it stays paused.
 * Volume is fixed at 10%.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const audio = new Audio(asset(MUSIC_SRC));
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = MUSIC_VOLUME;
    audioRef.current = audio;

    let disposed = false;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      setPlaying(false);
      setFailed(true);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    const removeUnlock = () => UNLOCK_EVENTS.forEach((ev) => window.removeEventListener(ev, unlock, true));
    function unlock(e: Event) {
      if (disposed || userPaused.current) return removeUnlock();
      // a press on the music button itself is handled by the button
      if ((e.target as Element | null)?.closest?.(".sumi-music")) return;
      audio.volume = MUSIC_VOLUME;
      audio.play().then(removeUnlock, () => {
        /* not an eligible gesture yet; keep waiting */
      });
    }

    audio.volume = MUSIC_VOLUME;
    audio.play().catch(() => {
      if (disposed || userPaused.current) return;
      UNLOCK_EVENTS.forEach((ev) => window.addEventListener(ev, unlock, true));
    });

    return () => {
      disposed = true;
      removeUnlock();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      userPaused.current = true;
      audio.pause();
      return;
    }
    userPaused.current = false;
    try {
      setFailed(false);
      audio.volume = MUSIC_VOLUME;
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }, []);

  const label = failed ? "Music unavailable" : playing ? "Pause background music" : "Play background music";

  return (
    <button type="button" onClick={toggle} aria-label={label} aria-pressed={playing} title={label} className="sumi-music">
      {playing ? (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
        </svg>
      )}
      <span className="sumi-music-text sumi-label !text-[0.6rem] !tracking-[0.16em]">
        {failed ? "Unavailable" : playing ? "Pause" : "Play"}
      </span>
    </button>
  );
}

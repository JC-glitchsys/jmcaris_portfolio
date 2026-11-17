import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { asset } from "../sumi/hooks";

/**
 * Ninja Girl Assistant: a small floating chat for the portfolio.
 * The browser only talks to our own serverless endpoint (VITE_CHAT_API_URL). The Gemini key
 * and the knowledge base live in that endpoint (see /workers/gemini-chat), never in this bundle.
 *
 * The character is the portfolio's own ninja artwork (ninja-body + ninja-hat share one canvas, exactly as in
 * the hero). She leans on the top edge of the panel, so the panel reads as part of the same ink world.
 */

type Role = "user" | "assistant";
type Message = { id: number; role: Role; text: string; error?: boolean };

const INK = "#1A1A1A";
const PAPER = "#F7F3EA";
const SHEET = "#FFFDF8";
const GOLD = "#C9A96A";
const EDGE = "rgba(122, 106, 82, 0.28)";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GREETING =
  "Kumusta! Ako ang Ninja Girl Assistant ni Jonaidah. Tanungin mo ako tungkol sa skills, projects, o availability niya.";
const LOADING_TEXT = "Nagsusulat ng ink...";
const ERROR_TEXT = "Naubusan ako ng ink, try mo ulit!";
const QUICK_REPLIES = ["Anong skills mo?", "Anong projects mo?", "Available ka ba for work?"];
const MAX_INPUT = 300;
const TIMEOUT_MS = 25_000;

const API_URL: string =
  (import.meta.env.VITE_CHAT_API_URL as string | undefined)?.trim() ||
  (import.meta.env.DEV ? "http://localhost:8787" : "");

/** The portfolio's ninja girl: body and hat are separate layers of one 900 x 984 canvas. */
function NinjaCharacter({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "900 / 984" }} aria-hidden="true">
      <img
        src={asset("images/ninja-body.webp")}
        alt=""
        width={900}
        height={984}
        draggable={false}
        className="absolute inset-0 size-full select-none object-contain"
      />
      <img
        src={asset("images/ninja-hat.webp")}
        alt=""
        width={900}
        height={984}
        draggable={false}
        className="absolute inset-0 size-full select-none object-contain"
      />
    </div>
  );
}

export default function NinjaChatbot() {
  const reduce = useReducedMotion();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: "assistant", text: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const wasOpen = useRef(false);
  const unmounted = useRef(false);

  // keep the newest message in view
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, loading, reduce]);

  // focus moves into the chat when it opens and back to the button when it closes
  useEffect(() => {
    if (open) {
      inputRef.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      buttonRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
      abortRef.current?.abort();
    };
  }, []);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, MAX_INPUT);
      if (!text || loading) return;

      const userMsg: Message = { id: nextId.current++, role: "user", text };
      const history = [...messages, userMsg]
        .filter((m) => m.id !== 0 && !m.error)
        .map((m) => ({ role: m.role, text: m.text }));

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;
      const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        if (!API_URL) throw new Error("Chat endpoint is not configured");
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Chat endpoint returned ${res.status}`);
        const data = (await res.json()) as { reply?: unknown };
        const reply = typeof data.reply === "string" ? data.reply.trim() : "";
        if (!reply) throw new Error("Empty reply");
        setMessages((prev) => [...prev, { id: nextId.current++, role: "assistant", text: reply }]);
      } catch (err) {
        if (unmounted.current) return;
        console.warn("[NinjaChatbot]", err);
        setMessages((prev) => [...prev, { id: nextId.current++, role: "assistant", text: ERROR_TEXT, error: true }]);
      } finally {
        window.clearTimeout(timer);
        setLoading(false);
      }
    },
    [messages, loading],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpen(false);
    }
  };

  const showQuickReplies = messages.length === 1 && !loading;
  const canSend = !loading && input.trim().length > 0;

  const panelHidden = reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 };
  const panelShown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };
  const bubbleIn = reduce ? { opacity: 0 } : { opacity: 0, y: 6 };
  const bubbleShown = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <div
      className="fixed z-[65] flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      onKeyDown={onKeyDown}
    >
      <AnimatePresence>
        {open && (
          <motion.section
            key="panel"
            id={panelId}
            role="dialog"
            aria-label="Ninja Girl Assistant"
            initial={panelHidden}
            animate={panelShown}
            exit={panelHidden}
            transition={{ duration: reduce ? 0.12 : 0.32, ease: EASE }}
            className="relative mt-[62px]"
            style={{
              width: "344px",
              maxWidth: "calc(100vw - 2rem)",
              height: "min(500px, calc(100dvh - 10.5rem))",
              transformOrigin: "bottom right",
            }}
          >
            {/* She leans on the top edge of the panel: only her hat, face and collar show */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-5 z-10 w-[78px] overflow-hidden"
              style={{ bottom: "calc(100% - 1px)", height: "66px" }}
            >
              <NinjaCharacter className="w-full" />
            </div>

            <div
              className="relative flex size-full flex-col overflow-hidden rounded-[20px]"
              style={{
                background: PAPER,
                color: INK,
                border: `1px solid ${GOLD}`,
                boxShadow: "0 24px 44px -22px rgba(26,26,26,0.45), 0 2px 6px rgba(26,26,26,0.06)",
              }}
            >
              {/* header */}
              <header className="relative px-5 pb-3.5 pt-4" style={{ borderBottom: `1px solid ${EDGE}` }}>
                <div className="flex items-start justify-between gap-3 pr-[88px]">
                  <div className="min-w-0">
                    <h2 className="f-display truncate text-[1.28rem] !font-medium leading-tight tracking-[0.02em]">
                      Ninja Girl Assistant
                    </h2>
                    <p className="f-body mt-1 flex items-center gap-1.5 text-[0.68rem] !leading-none tracking-[0.04em]" style={{ color: "#514B43" }}>
                      <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: GOLD }} />
                      Online • Gemini AI
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Isara ang chat"
                  className="absolute right-3 top-3 z-20 flex size-7 items-center justify-center rounded-full text-[0.8rem] transition-colors duration-200 hover:bg-[#EAE3D6] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#8A6B28] motion-reduce:transition-none"
                  style={{ color: INK }}
                >
                  <span aria-hidden="true">✕</span>
                </button>
                {/* a short brush stroke, then a gold hairline */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-px left-5 h-[2px] w-9 rounded-full"
                  style={{ background: INK, opacity: 0.8 }}
                />
              </header>

              {/* messages */}
              <div
                ref={listRef}
                role="log"
                aria-live="polite"
                aria-label="Usapan"
                className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              >
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={m.id === 0 ? false : bubbleIn}
                    animate={bubbleShown}
                    transition={{ duration: reduce ? 0.12 : 0.28, ease: EASE }}
                    className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                  >
                    <p
                      className="f-body max-w-[86%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-[0.82rem] !leading-[1.6]"
                      style={
                        m.role === "user"
                          ? { background: INK, color: "#FFFFFF", borderRadius: "16px 16px 4px 16px" }
                          : {
                              background: SHEET,
                              color: INK,
                              border: `1px solid ${EDGE}`,
                              borderRadius: "16px 16px 16px 4px",
                            }
                      }
                    >
                      {m.text}
                    </p>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    key="typing"
                    initial={bubbleIn}
                    animate={bubbleShown}
                    transition={{ duration: reduce ? 0.12 : 0.22, ease: EASE }}
                    className="flex justify-start"
                  >
                    <p
                      className="f-body flex items-center gap-2 px-3.5 py-2.5 text-[0.78rem] italic !leading-none"
                      style={{ background: SHEET, color: "#514B43", border: `1px solid ${EDGE}`, borderRadius: "16px 16px 16px 4px" }}
                    >
                      {LOADING_TEXT}
                      <span aria-hidden="true" className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="size-1 rounded-full"
                            style={{ background: INK }}
                            animate={reduce ? { opacity: 0.55 } : { opacity: [0.25, 0.8, 0.25] }}
                            transition={reduce ? undefined : { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
                          />
                        ))}
                      </span>
                    </p>
                  </motion.div>
                )}

                {showQuickReplies && (
                  <div className="flex flex-wrap gap-2 pt-1" aria-label="Mabilis na tanong">
                    {QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => void send(q)}
                        className="f-body rounded-full px-3.5 py-1.5 text-[0.74rem] !leading-snug transition-colors duration-200 hover:border-[#8A6B28] hover:bg-[#EFE8D8] active:bg-[#E6DDCA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6B28] motion-reduce:transition-none"
                        style={{ border: `1px solid ${GOLD}`, color: INK, background: "transparent" }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* input */}
              <form onSubmit={onSubmit} className="px-3.5 pb-3.5 pt-1">
                <div
                  className="flex items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_rgba(138,107,40,0.45)] motion-reduce:transition-none"
                  style={{ background: SHEET, border: `1px solid ${EDGE}` }}
                >
                  <label htmlFor={`${panelId}-input`} className="sr-only">
                    Tanong ka
                  </label>
                  <input
                    id={`${panelId}-input`}
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={MAX_INPUT}
                    placeholder="Tanong ka..."
                    autoComplete="off"
                    disabled={loading}
                    className="f-body min-w-0 flex-1 bg-transparent py-1.5 text-[0.82rem] !leading-none outline-none placeholder:text-[#6b645a] disabled:opacity-60"
                    style={{ color: INK }}
                  />
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="f-body rounded-full px-4 py-2 text-[0.74rem] font-semibold !leading-none tracking-[0.06em] transition-[background-color,opacity] duration-200 hover:bg-[#2E2A25] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6B28] disabled:opacity-40 disabled:hover:bg-[#1A1A1A] motion-reduce:transition-none"
                    style={{ background: INK, color: GOLD }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* floating button: her portrait in an ink ring; no bobbing, no scaling, only a calm change of ring and shadow */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Isara ang chat" : "Buksan ang chat with Ninja Girl Assistant"}
        aria-expanded={open}
        aria-controls={panelId}
        className="group relative size-[60px] overflow-hidden rounded-full transition-[box-shadow,border-color] duration-300 ease-out hover:border-[#8A6B28] hover:shadow-[0_12px_26px_-10px_rgba(26,26,26,0.55)] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#C9A96A] motion-reduce:transition-none"
        style={{
          background: PAPER,
          border: `1px solid ${GOLD}`,
          boxShadow: "0 8px 20px -10px rgba(26,26,26,0.5)",
          padding: "3px",
        }}
      >
        <img
          src={asset("images/ninja-avatar.png")}
          alt=""
          width={192}
          height={192}
          draggable={false}
          className="size-full select-none rounded-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-[3px] flex items-center justify-center rounded-full text-[1.1rem] transition-opacity duration-300 motion-reduce:transition-none"
          style={{ background: INK, color: GOLD, opacity: open ? 1 : 0 }}
        >
          ✕
        </span>
      </button>
    </div>
  );
}

import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Ninja Girl Assistant: a small floating chat for the portfolio.
 * The browser only talks to our own serverless endpoint (VITE_CHAT_API_URL). The Gemini key
 * and the knowledge base live in that endpoint (see /workers/gemini-chat), never in this bundle.
 */

type Role = "user" | "assistant";
type Message = { id: number; role: Role; text: string; error?: boolean };

const INK = "#1A1A1A";
const PAPER = "#F5F1E8";
const GOLD = "#C9A96A";

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
  const enter = reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

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
            initial={enter}
            animate={shown}
            exit={enter}
            transition={{ duration: reduce ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: "320px",
              maxWidth: "90vw",
              height: "min(460px, calc(100dvh - 7.5rem))",
              background: PAPER,
              color: INK,
              border: `1px solid ${GOLD}`,
              transformOrigin: "bottom right",
            }}
            className="flex flex-col overflow-hidden rounded-2xl shadow-[0_18px_40px_-14px_rgba(26,26,26,0.45)]"
          >
            {/* header */}
            <header className="flex items-center gap-3 px-4 py-3" style={{ background: INK }}>
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-lg"
                style={{ background: GOLD }}
              >
                🥷
              </span>
              <div className="min-w-0 leading-tight">
                <h2 className="truncate text-[0.95rem] font-semibold" style={{ color: PAPER }}>
                  Ninja Girl Assistant
                </h2>
                <p className="mt-0.5 text-[0.7rem]" style={{ color: GOLD }}>
                  <span aria-hidden="true">● </span>Online • Gemini AI
                </p>
              </div>
            </header>

            {/* messages */}
            <div
              ref={listRef}
              role="log"
              aria-live="polite"
              aria-label="Usapan"
              className="flex-1 space-y-2.5 overflow-y-auto px-3.5 py-3.5"
            >
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <p
                    className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-[0.84rem] leading-relaxed"
                    style={
                      m.role === "user"
                        ? { background: INK, color: "#FFFFFF", borderBottomRightRadius: 6 }
                        : {
                            background: "#FAF8F2",
                            color: INK,
                            border: `1px solid ${GOLD}`,
                            borderBottomLeftRadius: 6,
                          }
                    }
                  >
                    {m.text}
                  </p>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <p
                    className="rounded-2xl px-3.5 py-2 text-[0.84rem] italic"
                    style={{ background: "#FAF8F2", color: "#514B43", border: `1px solid ${GOLD}`, borderBottomLeftRadius: 6 }}
                  >
                    {LOADING_TEXT}
                  </p>
                </div>
              )}

              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 pt-1" aria-label="Mabilis na tanong">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="rounded-full px-3 py-1.5 text-[0.76rem] font-medium transition-colors hover:bg-[#EAE3D6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6B28]"
                      style={{ border: `1px solid ${GOLD}`, color: INK, background: "transparent" }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <form onSubmit={onSubmit} className="flex items-center gap-2 border-t px-3 py-3" style={{ borderColor: GOLD }}>
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
                className="min-w-0 flex-1 rounded-full px-3.5 py-2 text-[0.84rem] outline-none placeholder:text-[#6b645a] focus-visible:ring-2 focus-visible:ring-[#8A6B28] disabled:opacity-60"
                style={{ background: "#FAF8F2", color: INK, border: `1px solid ${GOLD}` }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-full px-4 py-2 text-[0.8rem] font-semibold transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8A6B28] disabled:opacity-50"
                style={{ background: INK, color: GOLD }}
              >
                Send
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      {/* floating button */}
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Isara ang chat" : "Buksan ang chat with Ninja Girl Assistant"}
        aria-expanded={open}
        aria-controls={panelId}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        className="flex size-[60px] items-center justify-center rounded-full text-[1.6rem] shadow-[0_10px_24px_-10px_rgba(26,26,26,0.6)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#C9A96A]"
        style={{ background: INK, border: `1px solid ${GOLD}`, color: GOLD }}
      >
        <span aria-hidden="true" className={open ? "text-[1.25rem] leading-none" : "leading-none"}>
          {open ? "✕" : "🥷"}
        </span>
      </motion.button>
    </div>
  );
}

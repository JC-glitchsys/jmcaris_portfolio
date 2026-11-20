import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Archive, History as HistoryIcon, MoreHorizontal, Trash2 } from "lucide-react";

import { asset } from "../sumi/hooks";

/**
 * Ninja Girl Assistant: a small floating chat for the portfolio.
 * The browser only talks to our own serverless endpoint (VITE_CHAT_API_URL). The Gemini key
 * and the knowledge base live in that endpoint (see /workers/gemini-chat), never in this bundle.
 *
 * The character is the portfolio's own ninja artwork, kept in the floating launcher while the panel stays minimal.
 */

type Role = "user" | "assistant";
type Message = { id: number; role: Role; text: string; error?: boolean };
type ArchivedChat = { id: string; title: string; archivedAt: string; messages: Message[] };

const INK = "#202124";
const PAPER = "#FAFAFA";
const SHEET = "#FFFFFF";
const GOLD = "#D8DADF";
const EDGE = "#E7E8EB";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const GREETING =
  "Kumusta! Ako ang Ninja Girl Assistant ni Jonaidah. Tanungin mo ako tungkol sa skills, projects, o availability niya.";
const LOADING_TEXT = "Nagsusulat ng ink...";
const ERROR_TEXT = "Naubusan ako ng ink, try mo ulit!";
const QUICK_REPLIES = ["Anong skills mo?", "Anong projects mo?", "Available ka ba for work?"];
const MAX_INPUT = 300;
const TIMEOUT_MS = 25_000;
const ARCHIVE_KEY = "ninja-chat-archives";

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
  const [showPrompt, setShowPrompt] = useState(false);
  const [archivedChats, setArchivedChats] = useState<ArchivedChat[]>(() => {
    try {
      const saved = window.localStorage.getItem(ARCHIVE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved) as unknown;
      return Array.isArray(parsed) ? (parsed as ArchivedChat[]) : [];
    } catch {
      return [];
    }
  });
  const [showArchives, setShowArchives] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"archive" | "delete" | null>(null);

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

  useEffect(() => {
    let hideTimer: number | undefined;
    const interval = window.setInterval(() => {
      setShowPrompt(true);
      hideTimer = window.setTimeout(() => setShowPrompt(false), 5_000);
    }, 60_000);
    return () => {
      window.clearInterval(interval);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
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

  const persistArchives = (next: ArchivedChat[]) => {
    setArchivedChats(next);
    try {
      window.localStorage.setItem(ARCHIVE_KEY, JSON.stringify(next));
    } catch (err) {
      console.warn("[NinjaChatbot] Could not save chat archive", err);
    }
  };

  const confirmHistoryAction = () => {
    if (confirmAction === "archive") {
      const conversation = messages.filter((message) => message.id !== 0);
      if (conversation.length) {
        const firstUserMessage = conversation.find((message) => message.role === "user");
        persistArchives([
          {
            id: `${Date.now()}`,
            title: firstUserMessage?.text ?? "Chat with Jonaidah",
            archivedAt: new Date().toISOString(),
            messages: conversation,
          },
          ...archivedChats,
        ]);
      }
      setMessages([{ id: 0, role: "assistant", text: GREETING }]);
      setShowArchives(false);
    } else if (confirmAction === "delete") {
      persistArchives([]);
      setMessages([{ id: 0, role: "assistant", text: GREETING }]);
      setShowArchives(false);
    }
    setConfirmAction(null);
  };

  const panelHidden = reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 };
  const panelShown = reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };
  const bubbleIn = reduce ? { opacity: 0 } : { opacity: 0, y: 6 };
  const bubbleShown = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <div
      className="chatbot-font fixed z-[65] flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      onKeyDown={onKeyDown}
    >
      <AnimatePresence>
        {showPrompt && !open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[72px] right-0 z-10 w-[min(260px,calc(100vw-2rem))]"
          >
            <div className="relative rounded-2xl border border-[#E7E8EB] bg-white px-4 py-3 pr-9 shadow-[0_10px_30px_-14px_rgba(20,24,32,0.3)]">
              <button type="button" onClick={() => { setShowPrompt(false); setOpen(true); }} className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#727780]">
                <span className="block text-xs font-semibold text-[#202124]">Hi! Have a question?</span>
                <span className="mt-1 block text-[0.68rem] leading-relaxed text-[#777B83]">Ask me about Jonaidah’s skills and projects.</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
            className="relative"
            style={{
              width: "344px",
              maxWidth: "calc(100vw - 2rem)",
              height: "min(500px, calc(100dvh - 10.5rem))",
              transformOrigin: "bottom right",
            }}
          >
            <div
              className="relative flex size-full flex-col overflow-hidden rounded-[18px]"
              style={{
                background: PAPER,
                color: INK,
                border: `1px solid ${EDGE}`,
                boxShadow: "0 18px 48px -24px rgba(20,24,32,0.28), 0 2px 8px rgba(20,24,32,0.04)",
              }}
            >
              {/* header */}
              <header className="relative flex items-center justify-between gap-2 px-3.5 py-3" style={{ borderBottom: `1px solid ${EDGE}` }}>
                <div className="flex min-w-0 items-center gap-2.5 pr-28">
                  <div className="relative size-11 shrink-0 rounded-full p-[2px]" style={{ background: "linear-gradient(145deg, #D8DADF, #F1E5C9)" }}>
                    <img
                      src={asset("images/ninja-avatar.png")}
                      alt=""
                      width={192}
                      height={192}
                      draggable={false}
                      className="size-full rounded-full border-2 border-white object-cover"
                    />
                    <span aria-hidden="true" className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white" style={{ background: "#718A72" }} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-[0.94rem] font-semibold leading-tight tracking-[-0.02em]">
                      Jonaidah Caris
                    </h2>
                    <p className="mt-1 truncate text-[0.68rem] leading-tight" style={{ color: "#777B83" }}>
                      Ninja Girl Assistant <span aria-hidden="true">·</span> Portfolio guide
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Isara ang chat"
                  className="absolute right-3 top-1/2 z-20 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[0.8rem] transition-colors duration-200 hover:bg-[#F0F1F3] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#727780] motion-reduce:transition-none"
                  style={{ color: "#777B83" }}
                >
                  <span aria-hidden="true">✕</span>
                </button>
                <div className="absolute right-11 top-1/2 z-20 flex -translate-y-1/2 items-center gap-0.5">
                  <button type="button" onClick={() => setShowArchives((value) => !value)} aria-label={showArchives ? "Return to chat" : "View archived chats"} title="Archived chats" className="flex size-8 items-center justify-center rounded-full text-[#777B83] transition-colors hover:bg-[#F0F1F3] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#727780]">
                    <HistoryIcon size={16} aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => setShowActions((value) => !value)} aria-label="More chat actions" aria-expanded={showActions} title="More actions" className="flex size-8 items-center justify-center rounded-full text-[#777B83] transition-colors hover:bg-[#F0F1F3] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#727780]">
                    <MoreHorizontal size={17} aria-hidden="true" />
                  </button>
                  {showActions && (
                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[#E7E8EB] bg-white p-1.5 shadow-xl">
                      <button type="button" onClick={() => { setShowActions(false); setConfirmAction("archive"); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs text-[#34363B] transition-colors hover:bg-[#F4F5F6]">
                        <Archive size={15} aria-hidden="true" className="text-[#777B83]" /> Archive conversation
                      </button>
                      <button type="button" onClick={() => { setShowActions(false); setConfirmAction("delete"); }} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs text-[#A43C3C] transition-colors hover:bg-[#FBF2F2]">
                        <Trash2 size={15} aria-hidden="true" /> Delete all history
                      </button>
                    </div>
                  )}
                </div>
              </header>

              {/* messages */}
              {showArchives ? (
                <div className="flex-1 overflow-y-auto px-4 py-4" aria-label="Archived conversations">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Archived chats</h3>
                    <button type="button" onClick={() => setShowArchives(false)} className="text-xs text-[#777B83] hover:text-[#202124]">Back to chat</button>
                  </div>
                  {archivedChats.length ? (
                    <ul className="space-y-2">
                      {archivedChats.map((chat) => (
                        <li key={chat.id}>
                          <button type="button" onClick={() => { setMessages(chat.messages); nextId.current = Math.max(0, ...chat.messages.map((message) => message.id)) + 1; setShowArchives(false); }} className="w-full rounded-xl border border-[#E7E8EB] bg-white px-3.5 py-3 text-left transition-colors hover:bg-[#F5F5F5]">
                            <span className="block truncate text-xs font-medium">{chat.title}</span>
                            <span className="mt-1 block text-[0.65rem] text-[#777B83]">{new Date(chat.archivedAt).toLocaleDateString()}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="rounded-xl border border-dashed border-[#D8DADF] px-4 py-6 text-center text-xs text-[#777B83]">No archived chats yet.</p>
                  )}
                </div>
              ) : <div
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
                      className="max-w-[86%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-[0.8rem] leading-[1.6]"
                      style={
                        m.role === "user"
                          ? { background: "#25272B", color: "#FFFFFF", borderRadius: "16px 16px 4px 16px" }
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
                      className="flex items-center gap-2 px-3.5 py-2.5 text-[0.76rem] leading-none"
                      style={{ background: SHEET, color: "#777B83", border: `1px solid ${EDGE}`, borderRadius: "16px 16px 16px 4px" }}
                    >
                      {LOADING_TEXT}
                      <span aria-hidden="true" className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="size-1 rounded-full"
                            style={{ background: "#777B83" }}
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
                        className="rounded-full px-3.5 py-1.5 text-[0.7rem] leading-snug transition-colors duration-200 hover:border-[#B8BBC2] hover:bg-[#F3F4F6] active:bg-[#ECEEF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#727780] motion-reduce:transition-none"
                        style={{ border: `1px solid ${GOLD}`, color: INK, background: "#FFFFFF" }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>}

              {/* input */}
              {!showArchives && <form onSubmit={onSubmit} className="px-3.5 pb-3.5 pt-1">
                <div
                  className="flex items-center gap-2 rounded-full py-1.5 pl-4 pr-1.5 transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_rgba(115,120,130,0.18)] motion-reduce:transition-none"
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
                    className="min-w-0 flex-1 bg-transparent py-1.5 text-[0.8rem] leading-none outline-none placeholder:text-[#8B8F97] disabled:opacity-60"
                    style={{ color: INK }}
                  />
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="rounded-full px-4 py-2 text-[0.72rem] font-medium leading-none transition-[background-color,opacity] duration-200 hover:bg-[#3B3E44] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#727780] disabled:opacity-40 disabled:hover:bg-[#25272B] motion-reduce:transition-none"
                    style={{ background: "#25272B", color: "#FFFFFF" }}
                  >
                    Send
                  </button>
                </div>
              </form>}

              {confirmAction && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmAction(null); }}>
                  <section role="alertdialog" aria-modal="true" aria-labelledby="chat-confirm-title" aria-describedby="chat-confirm-description" className="w-full max-w-[280px] rounded-2xl border border-[#E7E8EB] bg-white p-5 shadow-2xl">
                    <h2 id="chat-confirm-title" className="text-sm font-semibold text-[#202124]">{confirmAction === "archive" ? "Archive this chat?" : "Delete all chat history?"}</h2>
                    <p id="chat-confirm-description" className="mt-2 text-xs leading-relaxed text-[#777B83]">{confirmAction === "archive" ? "This conversation will be saved in Archived chats and a fresh chat will start." : "This removes this conversation and all archived chats from this browser. This cannot be undone."}</p>
                    <div className="mt-5 flex justify-end gap-2">
                      <button type="button" onClick={() => setConfirmAction(null)} className="rounded-full px-3.5 py-2 text-xs font-medium text-[#646870] hover:bg-[#F3F4F6]">Cancel</button>
                      <button type="button" onClick={confirmHistoryAction} className="rounded-full px-3.5 py-2 text-xs font-medium text-white" style={{ background: confirmAction === "delete" ? "#B34242" : "#25272B" }}>{confirmAction === "archive" ? "Archive chat" : "Delete history"}</button>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* floating button: her portrait in an ink ring; no bobbing, no scaling, only a calm change of ring and shadow */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => { setShowPrompt(false); setOpen((v) => !v); }}
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

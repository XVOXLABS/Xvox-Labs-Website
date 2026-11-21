"use client";

import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { vox } from "@/data/agents";
import { askVox, voxChat } from "@/data/site";
import { solutions } from "@/data/solutions";
import { flow, greeting, keymap, questions } from "@/data/vox";
import Dialog from "@/components/ui/Dialog/Dialog";
import useReducedMotion from "@/hooks/useReducedMotion";
import { OPEN_VOX_EVENT } from "@/lib/actions";
import { Confirm, DetailsForm, QuickReplies, Report, Slots } from "./VoxParts";
import styles from "./VoxChat.module.css";

const t = (match) => voxChat.find((b) => b.text === match)?.text;
const STAGES = ["Chat", "Plan", "Details", "Time"].map(t);
const KEYS = keymap.map((k) => [new RegExp(k.pattern, k.flags), k.solution]);
const bySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));

const fresh = () => ({ phase: "chat", mode: "ai", step: 0, answers: {}, transcript: [], who: null, slot: null });

// Prototype localReport: match everything the visitor said against the keymap, up to three solutions.
function localReport(transcript) {
  const all = transcript.filter((m) => m.role === "user").map((m) => m.content).join(" . ");
  let slugs = [];
  KEYS.forEach(([re, slug]) => {
    if (re.test(all) && !slugs.includes(slug)) slugs.push(slug);
  });
  if (!slugs.length) slugs = [flow.report.fallback];
  slugs = slugs.slice(0, flow.report.maxSolutions);
  return {
    summary: flow.report.summary,
    problems: slugs.map((s) => bySlug[s].pain),
    solutions: slugs.map((s) => ({ slug: s, why: bySlug[s].with[0] })),
    automationNote: flow.report.automationNote,
  };
}

// Vox assistant: floating "Ask Vox" launcher (with the one-time scroll nudge) and the guided
// conversation from the prototype: Chat (5 questions) → Plan (report) → Details (form) → Time (slots).
// AI replies are Phase 8: as in the prototype without AI, the first answer switches Vox to guided questions.
// Frontend only: nothing is sent or stored, and the confirmation says so.
export default function VoxChat() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [nudged, setNudged] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [stage, setStage] = useState(0);
  const [guided, setGuided] = useState(false);
  const [inputOn, setInputOn] = useState(true);
  const [placeholder, setPlaceholder] = useState(flow.answerPlaceholder);
  const [draft, setDraft] = useState("");
  const reduce = useReducedMotion();
  const chat = useRef(fresh());
  const timers = useRef([]);
  const nextId = useRef(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const push = (m) => {
    nextId.current += 1;
    const id = nextId.current;
    setMsgs((list) => [...list, { ...m, id }]);
    return id;
  };
  const drop = (id) => setMsgs((list) => list.filter((m) => m.id !== id));
  const patch = (id, p) => setMsgs((list) => list.map((m) => (m.id === id ? { ...m, ...p } : m)));
  const later = (fn, ms) => timers.current.push(window.setTimeout(fn, reduce ? 0 : ms));

  const startChat = () => {
    setStage(0);
    setInputOn(true);
    setPlaceholder(flow.answerPlaceholder);
    setGuided(false);
    push({ kind: "vox", text: greeting });
    push({ kind: "quick", options: questions[0].options, multi: 0 });
  };

  const scriptAsk = () => {
    const q = questions[chat.current.step];
    push({ kind: "vox", text: q.question });
    push({ kind: "quick", options: q.options, multi: q.multi || 0 });
  };

  const switchToScript = () => {
    const c = chat.current;
    c.mode = "script";
    setGuided(true);
    push({ kind: "note", text: flow.switchNote });
    const users = c.transcript.filter((m) => m.role === "user");
    c.step = 0;
    c.answers = {};
    if (users.length) {
      c.answers.biz = users[0].content;
      c.step = 1;
    }
    scriptAsk();
  };

  const makeReport = () => {
    const c = chat.current;
    c.phase = "report";
    setStage(1);
    setInputOn(false);
    setPlaceholder(flow.planPlaceholder);
    const id = push({ kind: "typing", text: flow.building });
    later(() => {
      drop(id);
      push({ kind: "report", report: localReport(c.transcript), booked: false });
    }, flow.delays.report);
  };

  const scriptNext = (text) => {
    const c = chat.current;
    c.answers[questions[c.step].key] = text;
    c.step += 1;
    if (c.step < questions.length) later(scriptAsk, flow.delays.question);
    else {
      push({ kind: "vox", text: flow.enough });
      makeReport();
    }
  };

  const userSays = (text) => {
    const c = chat.current;
    push({ kind: "me", text });
    c.transcript.push({ role: "user", content: text.slice(0, 1500) });
    if (c.phase !== "chat") {
      push({ kind: "vox", text: flow.afterChat });
      return;
    }
    // Phase 8 adds real AI replies here; until then Vox runs the prototype's guided fallback.
    if (c.mode === "script") scriptNext(text);
    else switchToScript();
  };

  const showDetails = (reportId) => {
    patch(reportId, { booked: true });
    chat.current.phase = "details";
    setStage(2);
    push({ kind: "vox", text: flow.details.prompt });
    push({ kind: "details", who: null });
  };

  const showSlots = (formId, who) => {
    chat.current.who = who;
    patch(formId, { who });
    chat.current.phase = "slots";
    setStage(3);
    push({ kind: "vox", text: flow.slots.prompt });
    push({ kind: "slots", picked: null, done: false });
  };

  const pickSlot = (slotsId, label) => {
    const c = chat.current;
    if (c.slot) return;
    c.slot = label;
    patch(slotsId, { picked: label });
    later(() => {
      patch(slotsId, { done: true });
      c.phase = "done";
      push({ kind: "done", who: c.who, slot: c.slot });
      setInputOn(false);
      setPlaceholder("");
    }, flow.delays.slot);
  };

  const reset = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current.length = 0;
    chat.current = fresh();
    setMsgs([]);
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "";
    startChat();
  };

  const openChat = () => {
    setNudged(true);
    setNudge(false);
    setOpen(true);
    if (!msgs.length) startChat();
    window.setTimeout(() => {
      if (inputRef.current && !inputRef.current.disabled) inputRef.current.focus();
    }, 300);
  };
  const close = () => setOpen(false);

  const onOpenEvent = useEffectEvent(openChat);
  useEffect(() => {
    const onOpen = () => onOpenEvent();
    window.addEventListener(OPEN_VOX_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_VOX_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [msgs]);

  // Track whether the site footer is on screen. Only the phone CSS uses this: the floating button
  // steps aside while the footer is visible (the footer has its own Vox entry points).
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return undefined;
    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Prototype: show the nudge once, after scrolling past 900px, if the chat was never opened.
  useEffect(() => {
    if (nudged) return undefined;
    const onScroll = () => {
      if (window.scrollY > askVox.nudgeAfterScrollY) {
        setNudged(true);
        setNudge(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nudged]);

  useEffect(() => {
    if (!nudge) return undefined;
    const id = window.setTimeout(() => setNudge(false), askVox.nudgeDurationMs);
    return () => window.clearTimeout(id);
  }, [nudge]);

  const submit = (e) => {
    e.preventDefault();
    const v = draft.trim();
    if (!inputOn || !v) return;
    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "";
    setMsgs((list) => list.filter((m) => m.kind !== "quick"));
    userSays(v);
  };

  const renderMsg = (m) => {
    switch (m.kind) {
      case "me":
        return <p className={`${styles.message} ${styles.me}`}>{m.text}</p>;
      case "note":
        return <p className={styles.note}>{m.text}</p>;
      case "typing":
        return (
          <p className={styles.message}>
            <span className={styles.typing} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>{" "}
            {m.text}
          </p>
        );
      case "quick":
        return (
          <QuickReplies
            options={m.options}
            multi={m.multi}
            onPick={(text) => {
              drop(m.id);
              userSays(text);
            }}
          />
        );
      case "report":
        return <Report report={m.report} booked={m.booked} onBook={() => showDetails(m.id)} onNavigate={close} />;
      case "details":
        return <DetailsForm who={m.who} onDone={(who) => showSlots(m.id, who)} />;
      case "slots":
        return <Slots picked={m.picked} done={m.done} onPick={(label) => pickSlot(m.id, label)} />;
      case "done":
        return <Confirm who={m.who} slot={m.slot} onClose={close} onNavigate={close} />;
      default:
        return <p className={styles.message}>{m.text}</p>;
    }
  };

  return (
    <>
      {!open ? (
        <button type="button" className={styles.fab} aria-label={askVox.ariaLabel} onClick={openChat} data-footer={footerInView ? "in" : "out"}>
          <Image src={vox.image} alt="" width={28} height={28} className={styles.face} />
          <span className={styles.label}>{askVox.label}</span>
          <span className={styles.dot} aria-hidden="true" />
          {nudge ? <span className={styles.nudge}>{askVox.nudge}</span> : null}
        </button>
      ) : null}

      <Dialog open={open} onClose={close} labelledBy="vox-title" placement="sheet" className={styles.dialog}>
        <div className={styles.head}>
          <Image src={vox.image} alt="" width={36} height={36} className={styles.face} />
          <div className={styles.who}>
            <b id="vox-title">{t("Vox")}</b>
            <small>
              <span className={styles.dot} aria-hidden="true" /> {guided ? flow.guidedLabel : flow.aiLabel}
            </small>
          </div>
          <button type="button" className={styles.icon} aria-label="Start over" title="Start over" onClick={reset}>
            {t("↺")}
          </button>
          <button type="button" className={styles.icon} aria-label="Close assistant" onClick={close}>
            {t("✕")}
          </button>
        </div>

        <ol className={styles.stages} aria-label="Progress">
          {STAGES.map((label, i) => (
            <li key={label} data-active={i <= stage ? "true" : "false"} aria-current={i === stage ? "step" : undefined}>
              {label}
            </li>
          ))}
        </ol>

        <div ref={bodyRef} className={styles.body} aria-live="polite">
          {msgs.map((m) => (
            <div key={m.id} className={styles.row} data-kind={m.kind}>
              {renderMsg(m)}
            </div>
          ))}
        </div>

        <form className={styles.form} onSubmit={submit}>
          <label htmlFor="vox-input" className="sr-only">
            {t("Message Vox")}
          </label>
          <textarea
            ref={inputRef}
            id="vox-input"
            rows={1}
            value={draft}
            placeholder={placeholder}
            className={styles.input}
            disabled={!inputOn}
            onChange={(e) => setDraft(e.target.value)}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = "";
              el.style.height = `${Math.min(120, el.scrollHeight)}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) submit(e);
            }}
          />
          <button type="submit" className={styles.send} disabled={!inputOn}>
            {t("Send")}
          </button>
        </form>
      </Dialog>
    </>
  );
}

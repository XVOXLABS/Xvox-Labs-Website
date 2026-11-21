"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { vox } from "@/data/agents";
import { askVox, voxChat } from "@/data/site";
import { greeting } from "@/data/vox";
import Dialog from "@/components/ui/Dialog/Dialog";
import { OPEN_VOX_EVENT } from "@/lib/actions";
import styles from "./VoxChat.module.css";

const t = (match) => voxChat.find((b) => b.text === match)?.text;
const STAGES = ["Chat", "Plan", "Details", "Time"].map(t);

// Vox assistant shell: floating "Ask Vox" launcher (with the prototype's one-time scroll nudge)
// and the chat dialog with its header, stage indicator and greeting.
// The scripted conversation (questions, plan, details, time) is wired in the next step.
export default function VoxChat() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [nudged, setNudged] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_VOX_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_VOX_EVENT, onOpen);
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

  const openChat = () => {
    setNudged(true);
    setNudge(false);
    setOpen(true);
  };

  return (
    <>
      {!open ? (
        <button type="button" className={styles.fab} aria-label={askVox.ariaLabel} onClick={openChat}>
          <Image src={vox.image} alt="" width={28} height={28} className={styles.face} />
          <span>{askVox.label}</span>
          <span className={styles.dot} aria-hidden="true" />
          {nudge ? <span className={styles.nudge}>{askVox.nudge}</span> : null}
        </button>
      ) : null}

      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="vox-title" placement="sheet" className={styles.dialog}>
        <div className={styles.head}>
          <Image src={vox.image} alt="" width={36} height={36} className={styles.face} />
          <div className={styles.who}>
            <b id="vox-title">{t("Vox")}</b>
            <small>
              <span className={styles.dot} aria-hidden="true" /> {t("AI agent · Xvox Labs")}
            </small>
          </div>
          <button type="button" className={styles.icon} aria-label="Start over" title="Start over">
            {t("↺")}
          </button>
          <button type="button" className={styles.icon} aria-label="Close assistant" onClick={() => setOpen(false)}>
            {t("✕")}
          </button>
        </div>

        <ol className={styles.stages} aria-label="Progress">
          {STAGES.map((stage, i) => (
            <li key={stage} data-active={i === 0 ? "true" : "false"} aria-current={i === 0 ? "step" : undefined}>
              {stage}
            </li>
          ))}
        </ol>

        <div className={styles.body} aria-live="polite">
          <p className={styles.message}>{greeting}</p>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="vox-input" className="sr-only">
            {t("Message Vox")}
          </label>
          <textarea id="vox-input" rows={1} placeholder={voxChat.find((b) => b.tag === "textarea[placeholder]")?.text} className={styles.input} disabled />
          <button type="submit" className={styles.send} disabled>
            {t("Send")}
          </button>
        </form>
      </Dialog>
    </>
  );
}

"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { agents, coreAgentIds } from "@/data/agents";
import { interactive } from "@/data/pages/home";
import { VOX_HREF } from "@/lib/actions";
import { agentImageSize } from "@/lib/agentImages";
import { block, blocksByTag, homeSection } from "@/lib/content";
import AgentPopup from "../../shared/AgentPopup/AgentPopup";
import { DONE_AT, SETTLE, SMOOTHING, START_ROTATION, agentRow, clamp, eio, eout, phase } from "./heroMotion";
import styles from "./HeroSequence.module.css";

const REDUCED = "(prefers-reduced-motion: reduce)";
const team = coreAgentIds.map((id) => agents.find((a) => a.id === id));

// Section 1: the hero sequence (prototype PAGES.home + seqApply). The stage is pinned for 240vh:
// the hero lifts away, the team sentence rises, the five agents fly from a row at the bottom into
// the sentence's slots and its words light up. Clicking an agent opens its popup at any point.
// Reduced motion (decision D1): a still, non-pinned layout with every agent already in its slot.
export default function HeroSequence() {
  const s = homeSection(0);
  const h1 = block(s, "h1").text;
  const comma = h1.indexOf(", ");
  const line1 = h1.slice(0, comma + 1);
  const line2 = h1.slice(comma + 2).split(" ");
  const tags = blocksByTag(s, "button.fly2").map((b) => b.text);
  const ask = block(s, "button.btn");
  const book = block(s, "a.btn");

  const [openId, setOpenId] = useState(null);
  const secRef = useRef(null);
  const stickRef = useRef(null);
  const heroRef = useRef(null);
  const h1Ref = useRef(null);
  const ctaRef = useRef(null);
  const sentRef = useRef(null);
  const bandRef = useRef(null);
  const flyRefs = useRef([]);
  const slotRefs = useRef([]);

  useEffect(() => {
    const sec = secRef.current;
    const stick = stickRef.current;
    const hero = heroRef.current;
    const sent = sentRef.current;
    const words = [...sent.querySelectorAll("[data-word]")];
    const flyers = flyRefs.current;
    const slots = slotRefs.current;
    const mq = window.matchMedia(REDUCED);
    let raf = 0;
    let current = null;

    // Final slot position of agent i, relative to the stage (prototype x1 / y1 / s1).
    const target = (i, size, fh, sr) => {
      const sl = slots[i].getBoundingClientRect();
      const s1 = (sl.height * 1.3) / fh;
      return { x: sl.left - sr.left + (sl.width - size * s1) / 2, y: sl.top - sr.top - sl.height * 0.2, s: s1 };
    };

    // Prototype seqApply(p), final version.
    const apply = (p) => {
      const q = phase(p);
      const W = stick.clientWidth;
      const H = stick.clientHeight;
      const vh = H / 100;
      hero.style.transform = `translateY(${-eio(clamp(q / 0.24)) * 62 * vh}px)`;
      const sy = (1 - eout(clamp((q - 0.05) / 0.22))) * 58 * vh;
      sent.style.transform = `translate(-50%, -50%) translateY(${sy}px)`;
      const sr = stick.getBoundingClientRect();
      bandRef.current.style.transform = `translateY(${-sr.top}px)`;
      const Hv = Math.min(H, window.innerHeight - Math.max(0, sr.top));
      const { narrow, size, gap } = agentRow(W);
      const h1m = h1Ref.current;
      const ctm = ctaRef.current;
      const mobVis = ctm && h1m ? ctm.offsetTop + ctm.offsetHeight - h1m.offsetTop : 300;
      let wallY = 0;
      flyers.forEach((f, i) => {
        f.style.width = `${size}px`;
        const fh = f.offsetHeight || size;
        const mobTop = narrow ? Math.max(16, (Hv - mobVis - fh * 0.8 - 18) / 2) : 0;
        const x0 = W / 2 + (i - 2) * gap - size / 2;
        const y0 = narrow ? mobTop + mobVis + 18 : Hv - fh * 0.58;
        const s0 = i === 2 ? 1 + 0.09 * eout(clamp(q / 0.06)) : 1;
        wallY = Math.max(wallY, fh);
        const t1 = target(i, size, fh, sr);
        const ta = clamp((q - 0.05 - i * 0.045) / 0.2);
        const x = x0 + (t1.x - x0) * eio(ta);
        const y = y0 + (t1.y - y0) * eout(ta);
        const sc = s0 + (t1.s - s0) * eio(ta);
        const rot = START_ROTATION[i] * (1 - eio(ta));
        f.style.transform = `translate(${x}px, ${y}px) scale(${sc}) rotate(${rot}deg)`;
      });
      // Place the hero so its buttons sit just above the peeking agents.
      const vt = h1m ? h1m.offsetTop : 0;
      const vb = ctm ? ctm.offsetTop + ctm.offsetHeight : hero.offsetHeight;
      const head = Hv - wallY * (narrow ? 0.62 : 0.58) + wallY * 0.06;
      const top = narrow ? Math.max(16, (Hv - mobVis - wallY * 0.8 - 18) / 2) - vt : Math.max(20 - vt, ((head - (vb - vt)) / 2) * 0.7 - vt);
      hero.style.top = `${top}px`;
      const lit = Math.round(clamp((q - 0.1) / 0.32) * words.length);
      words.forEach((w, i) => (w.dataset.lit = i < lit ? "true" : "false"));
      sec.dataset.done = p > DONE_AT ? "true" : "false";
      sec.dataset.placed = "true";
    };

    // Reduced motion: still layout (CSS), agents placed in their slots, words lit, tags on.
    const placeStill = () => {
      const sr = stick.getBoundingClientRect();
      const { size } = agentRow(stick.clientWidth);
      flyers.forEach((f, i) => {
        f.style.width = `${size}px`;
        const fh = f.offsetHeight || size;
        const t1 = target(i, size, fh, sr);
        f.style.transform = `translate(${t1.x}px, ${t1.y}px) scale(${t1.s})`;
      });
      words.forEach((w) => (w.dataset.lit = "true"));
      sec.dataset.done = "true";
      sec.dataset.placed = "true";
    };

    // Prototype seqTarget / seqTick: smoothed progress through the pinned section.
    const progress = () => {
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      return total > 0 ? clamp(-r.top / total) : 0;
    };
    const tick = () => {
      raf = 0;
      const t = progress();
      current = current === null ? t : current + (t - current) * SMOOTHING;
      apply(current);
      if (Math.abs(t - current) > SETTLE) raf = window.requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const reset = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
      current = null;
      hero.style.transform = "";
      hero.style.top = "";
      sent.style.transform = "";
      bandRef.current.style.transform = "";
    };
    const run = () => {
      reset();
      if (mq.matches) placeStill();
      else kick();
    };
    const onScroll = () => {
      if (!mq.matches) kick();
    };
    const onResize = () => (mq.matches ? placeStill() : kick());

    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", run);
    document.fonts?.ready.then(onResize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", run);
    };
  }, []);

  // Hover: switch to the animated image (prototype playIn), not with reduced motion.
  const swap = (e, agent, animated) => {
    if (animated && window.matchMedia(REDUCED).matches) return;
    const img = e.currentTarget.querySelector("img");
    if (img) img.src = animated ? agent.animatedImage : agent.image;
  };

  const sentence = interactive.heroSentence;
  return (
    <section ref={secRef} className={styles.seq} data-done="false">
      <div ref={stickRef} className={styles.stick}>
        <div ref={bandRef} className={styles.headerBand} aria-hidden="true" />
        <div ref={heroRef} className={styles.hero}>
          <h1 ref={h1Ref} className={styles.title}>
            {line1}
            <br />
            {line2.slice(0, 2).join(" ")}{" "}
            <span className={styles.tile} aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" fill="#fff" />
              </svg>
            </span>{" "}
            {line2.slice(2).join(" ")}
          </h1>
          <p className={styles.sub}>{block(s, "p.sub").text}</p>
          <div ref={ctaRef} className={styles.cta}>
            <Button href={VOX_HREF}>{ask.text}</Button>
            <Button href={book.href} variant="secondary">
              {book.text}
            </Button>
          </div>
        </div>

        <p ref={sentRef} className={styles.sent}>
          {sentence.map((phrase, i) => (
            <Fragment key={phrase}>
              {i > 0 ? (
                <>
                  <span ref={(el) => (slotRefs.current[i - 1] = el)} className={styles.slot} aria-hidden="true" />{" "}
                </>
              ) : null}
              {phrase.split(" ").map((word, k, all) => (
                <Fragment key={`${word}-${k}`}>
                  <span data-word="" data-lit="false" className={styles.word}>
                    {word}
                  </span>
                  {k < all.length - 1 || i < sentence.length - 1 ? " " : null}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </p>

        {team.map((agent, i) => {
          const [w, h] = agentImageSize[agent.id].still;
          return (
            <button
              key={agent.id}
              ref={(el) => (flyRefs.current[i] = el)}
              type="button"
              className={styles.fly}
              style={{ "--i": i, "--r": `${START_ROTATION[i]}deg`, "--ratio": h / w }}
              aria-label={`${agent.name}, ${agent.role}`}
              onClick={() => setOpenId(agent.id)}
              onPointerEnter={(e) => swap(e, agent, true)}
              onPointerLeave={(e) => swap(e, agent, false)}
            >
              <span className={styles.tag}>{tags[i]}</span>
              <Image src={agent.image} alt="" width={w} height={h} unoptimized draggable={false} className={styles.chr} />
            </button>
          );
        })}
      </div>
      <AgentPopup agentId={openId} onClose={() => setOpenId(null)} />
    </section>
  );
}

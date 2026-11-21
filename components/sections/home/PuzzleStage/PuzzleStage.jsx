"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Category from "@/components/ui/Category/Category";
import Container from "@/components/ui/Container/Container";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { agents, coreAgentIds } from "@/data/agents";
import { interactive } from "@/data/pages/home";
import { agentImageSize } from "@/lib/agentImages";
import { block, blocksByTag, fill, homeSection } from "@/lib/content";
import { clamp } from "../HeroSequence/heroMotion";
import { pieceProgress, pieceTransform, pieceWidth } from "./puzzleMotion";
import styles from "./PuzzleStage.module.css";

const REDUCED = "(prefers-reduced-motion: reduce)";
const PHONE = "(max-width: 600px)";
const team = coreAgentIds.map((id) => agents.find((a) => a.id === id));
const text = interactive.puzzle;

// Section 2: the puzzle stage (prototype puzSection + puzUpdate, Framer dark agent panel).
// Pinned while the visitor scrolls 260vh (220vh at 601-640px, 180vh at 600px and below); the five
// scattered, rotated pieces ease into one row and the texts switch to their solved state. Scrolling
// back reverses it. Pieces are links to the agent profiles. Reduced motion (decision D3): a
// natural-height, non-pinned, already solved layout.
export default function PuzzleStage() {
  const s = homeSection(1);
  const tags = blocksByTag(s, "a.pzp");
  const cta = block(s, "a.btn");

  const [done, setDone] = useState(0);
  const secRef = useRef(null);
  const boardRef = useRef(null);
  const pieceRefs = useRef([]);

  useEffect(() => {
    const sec = secRef.current;
    const board = boardRef.current;
    const pieces = pieceRefs.current;
    const reduced = window.matchMedia(REDUCED);
    const phone = window.matchMedia(PHONE);
    let raf = 0;

    // Prototype puzUpdate: progress straight from the scroll position (no smoothing).
    const apply = () => {
      raf = 0;
      const r = sec.getBoundingClientRect();
      const total = sec.offsetHeight - window.innerHeight;
      const p = reduced.matches ? 1 : total > 0 ? clamp(-r.top / total) : 0;
      const bw = board.clientWidth;
      const bh = board.clientHeight;
      const mob = phone.matches;
      const w = pieceWidth(bw, bh, mob);
      let locked = 0;
      pieces.forEach((el, i) => {
        const t = pieceProgress(p, i);
        if (t >= 1) locked += 1;
        const { x, y, rot } = pieceTransform(i, t, bw, bh, w, mob);
        el.style.width = `${w}px`;
        el.style.marginLeft = `${-w / 2}px`;
        el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      });
      sec.dataset.placed = "true";
      setDone(locked);
    };
    const kick = () => {
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    reduced.addEventListener("change", kick);
    phone.addEventListener("change", kick);
    document.fonts?.ready.then(kick);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      reduced.removeEventListener("change", kick);
      phone.removeEventListener("change", kick);
    };
  }, []);

  // Hover: switch to the animated image (prototype playIn on .pzp), not with reduced motion.
  const swap = (e, agent, animated) => {
    if (animated && window.matchMedia(REDUCED).matches) return;
    const img = e.currentTarget.querySelector("img");
    if (img) img.src = animated ? agent.animatedImage : agent.image;
  };

  const solved = done === team.length;
  const chip = solved ? text.chipSolved : done ? fill(text.chipProgress, { done }) : text.chip;

  return (
    <section ref={secRef} className={styles.puz} aria-labelledby="puzzle-title" data-solved={solved ? "true" : "false"}>
      <div className={styles.stick}>
        <Container className={styles.inner}>
          <SectionHeader
            layout="center"
            level={2}
            size="h2"
            className={styles.head}
            eyebrow={<Category color="var(--color-ink)">{block(s, "span.eyebrow").text}</Category>}
            title={<span id="puzzle-title">{solved ? text.headingSolved : text.heading}</span>}
            lead={solved ? text.leadSolved : text.lead}
          />

          <div className={styles.card}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <span className={styles.hint}>
                  <span className={styles.icon} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
                    </svg>
                  </span>
                  <span>{solved ? text.hintSolved : text.hint}</span>
                </span>
                <Badge className={styles.chip} icon={<span className={styles.dot} />}>
                  {chip}
                </Badge>
              </div>

              <div ref={boardRef} className={styles.board}>
                {team.map((agent, i) => {
                  const [w, h] = agentImageSize[agent.id].still;
                  return (
                    <Link
                      key={agent.id}
                      ref={(el) => (pieceRefs.current[i] = el)}
                      href={tags[i].href}
                      className={styles.piece}
                      style={{ "--i": i, zIndex: i + 1 }}
                      aria-label={agent.name}
                      onPointerEnter={(e) => swap(e, agent, true)}
                      onPointerLeave={(e) => swap(e, agent, false)}
                    >
                      <span className={styles.tag} aria-hidden="true">
                        {tags[i].text}
                      </span>
                      <Image src={agent.image} alt="" width={w} height={h} unoptimized draggable={false} className={styles.chr} />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.strip}>
              <Button href={cta.href} variant="small">
                {cta.text}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import AgentPopup from "@/components/sections/shared/AgentPopup/AgentPopup";
import { agentImageSize } from "@/lib/agentImages";
import { TOAST_EVENT } from "@/lib/cart";
import { fill } from "@/lib/content";
import styles from "./how-it-works.module.css";

export function AgentQuickViews({ children }) {
  const [selection, setSelection] = useState(null);

  function open(event) {
    const trigger = event.target.closest("[data-agent-popup]");
    if (!trigger || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault();
    setSelection({ id: trigger.dataset.agentPopup, tab: trigger.dataset.agentTab });
  }

  return (
    <div onClickCapture={open}>
      {children}
      <AgentPopup agentId={selection?.id} initialTab={selection?.tab} onClose={() => setSelection(null)} />
    </div>
  );
}

export function AgentArt({ agent, className }) {
  const [width, height] = agentImageSize[agent.id]?.still ?? [620, 620];
  const [hover, setHover] = useState(false);

  return (
    <picture className={className} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
      <source media="(prefers-reduced-motion: reduce)" srcSet={agent.image} />
      <Image src={hover && agent.animatedImage ? agent.animatedImage : agent.image} alt="" width={width} height={height} unoptimized />
    </picture>
  );
}

export function ModelSelector({ models, label, toast, note, agents }) {
  const [active, setActive] = useState(0);

  function select(index) {
    setActive(index);
    window.dispatchEvent(new CustomEvent(TOAST_EVENT, {
      detail: { message: fill(toast, { model: models[index].name }), viewCart: false },
    }));
  }

  return (
    <div className={styles.models}>
      <div className={styles.modelStage} aria-hidden="true">
        <div className={styles.sockets}>
          {models.map(({ name }, i) => <span key={name} className={i === active ? styles.socketOn : undefined}><i />{name}</span>)}
        </div>
        <div className={styles.gang}>
          {agents.map((agent) => <AgentArt key={agent.id} agent={agent} className={styles.gangArt} />)}
        </div>
      </div>
      <div className={styles.modelList}>
        <div role="group" aria-label={label}>
          {models.map(({ name, maker }, i) => (
            <button key={name} type="button" className={styles.modelButton} aria-pressed={i === active} onClick={() => select(i)}>
              <span><strong>{name}</strong><small>{maker}</small></span> <span aria-hidden="true">⇄</span>
            </button>
          ))}
        </div>
        <p>{note}</p>
      </div>
    </div>
  );
}

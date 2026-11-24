"use client";

import Image from "next/image";
import { useState } from "react";
import AgentPopup from "@/components/sections/shared/AgentPopup/AgentPopup";
import Button from "@/components/ui/Button/Button";
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

export function ModelSelector({ models, label, toast }) {
  const [active, setActive] = useState(0);

  function select(index) {
    setActive(index);
    window.dispatchEvent(new CustomEvent(TOAST_EVENT, {
      detail: { message: fill(toast, { model: models[index].name }), viewCart: false },
    }));
  }

  return (
    <div>
      <ul className={styles.modelStrip}>
        {models.map(({ name }, i) => <li key={name} className={i === active ? styles.currentModel : undefined}>{name}</li>)}
      </ul>
      <div className={styles.three} role="group" aria-label={label}>
        {models.map(({ name, maker }, i) => (
          <Button key={name} variant="secondary" className={styles.modelButton} aria-pressed={i === active} onClick={() => select(i)}>
            <strong>{name}</strong> <span>{maker}</span> <span aria-hidden="true">⇄</span>
          </Button>
        ))}
      </div>
    </div>
  );
}

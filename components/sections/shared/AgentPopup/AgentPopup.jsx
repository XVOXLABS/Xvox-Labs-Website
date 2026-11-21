"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";
import Category from "@/components/ui/Category/Category";
import Dialog from "@/components/ui/Dialog/Dialog";
import Tabs from "@/components/ui/Tabs/Tabs";
import { agentPopup as t, agents } from "@/data/agents";
import { missions } from "@/data/how-it-works";
import { items } from "@/data/marketplace";
import { pricingDisplay } from "@/data/pricing";
import { solutions } from "@/data/solutions";
import useReducedMotion from "@/hooks/useReducedMotion";
import { openCart } from "@/lib/actions";
import { agentImageSize } from "@/lib/agentImages";
import { addToCart } from "@/lib/cart";
import { fill } from "@/lib/content";
import { savePreference } from "@/lib/preference";
import { priceLabel } from "@/lib/pricing";
import styles from "./AgentPopup.module.css";

const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));

// Agent quick-view popup (prototype agentPop): stage with the agent's quote and image, then
// role, name, line, four tabs and the Buy / Hire / Full profile actions. Built on the Phase 3
// Dialog (native modal: focus kept inside, Esc and backdrop close, focus returns to the opener).
// Opens on the Persona tab every time (prototype POPTAB = 'persona').
export default function AgentPopup({ agentId, onClose }) {
  const agent = agents.find((a) => a.id === agentId);
  return (
    <Dialog open={Boolean(agent)} onClose={onClose} labelledBy="agent-popup-title" placement="center" className={styles.dialog}>
      {agent ? <PopupBody key={agent.id} agent={agent} onClose={onClose} /> : null}
    </Dialog>
  );
}

function PopupBody({ agent, onClose }) {
  const reduced = useReducedMotion();
  const size = agentImageSize[agent.id];
  const [w, h] = reduced ? size.still : size.anim;
  const jobs = missions.flatMap((m) => m.slots.filter((s) => s.agent === agent.id).map((s) => ({ mission: m, slot: s })));
  const agentItems = items.filter((i) => i.agent === agent.id);
  const blueprint = agentItems.find((i) => i.type === "blueprint");
  const price = priceLabel(blueprint);

  const buy = () => {
    addToCart(blueprint.id, { silent: true });
    onClose();
    window.requestAnimationFrame(openCart);
  };
  const hire = () => {
    savePreference(fill(t.hireAbout, { name: agent.name, role: agent.role }), t.hirePath);
    onClose();
  };

  const cell = (title, children, warm) => (
    <div className={`${styles.cell} ${warm ? styles.warm : ""}`.trim()}>
      <h4 className={styles.cellTitle}>{title}</h4>
      {children}
    </div>
  );

  const tabs = [
    {
      id: "persona",
      label: t.tabs[0][1],
      content: (
        <div className={styles.pane}>
          {cell(t.personality, <p>{`${agent.traits.join(", ")}.`}</p>)}
          {cell(t.bestFor, <p>{agent.bestFor}</p>)}
          {cell(t.never, <p>{agent.never}</p>)}
          {cell(t.check, <p>{agent.check}</p>, true)}
        </div>
      ),
    },
    {
      id: "skills",
      label: t.tabs[1][1],
      content: (
        <div className={styles.pane}>
          {cell(
            t.skills,
            <ul className={styles.ticks}>
              {agent.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>,
          )}
          {cell(
            t.systems,
            <div className={styles.chips}>
              {agent.tools.map((tool) => (
                <span key={tool} className={styles.chip}>
                  {tool}
                </span>
              ))}
            </div>,
          )}
        </div>
      ),
    },
    {
      id: "jobs",
      label: t.tabs[2][1],
      content: (
        <div className={styles.links}>
          {jobs.length ? (
            jobs.map(({ mission, slot }) => (
              <Link key={`${mission.id}-${slot.job}`} href={`/build?mission=${mission.id}`} onClick={onClose}>
                <span>
                  <small>{mission.name}</small>
                  {slot.job}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))
          ) : (
            <p className={styles.muted}>{t.noJobs}</p>
          )}
        </div>
      ),
    },
    {
      id: "uses",
      label: t.tabs[3][1],
      content: (
        <div className={styles.links}>
          {agent.solutions.map((slug) => (
            <Link key={slug} href={`/solutions/${slug}`} onClick={onClose}>
              <span>
                <small>{t.useCase}</small>
                {solutionBySlug[slug].pain}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          ))}
          <Link href={`/marketplace?agent=${agent.id}`} onClick={onClose}>
            <span>
              <small>{t.marketplace}</small>
              {fill(t.marketplaceCount, { count: agentItems.length })}
            </span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.pop}>
      <button type="button" className={styles.close} aria-label={t.close} onClick={onClose}>
        ✕
      </button>
      <div className={styles.stage} style={{ background: `var(--tint-${agent.tint})` }}>
        <p className={styles.say}>{`“${agent.quote}”`}</p>
        <Image src={reduced ? agent.image : agent.animatedImage} alt="" width={w} height={h} unoptimized className={styles.figure} />
      </div>
      <div className={styles.body}>
        <Category color={agent.color}>{agent.role}</Category>
        <h2 id="agent-popup-title" className={styles.name}>
          {agent.name}
        </h2>
        <p className={styles.line}>{agent.line}</p>
        <Tabs label={agent.name} items={tabs} defaultId="persona" className={styles.tabs} />
        <div className={styles.actions}>
          {blueprint ? (
            price ? (
              <Button onClick={buy}>{fill(t.buy, { name: blueprint.name, price })}</Button>
            ) : (
              <span className={styles.discuss}>
                <span>{pricingDisplay.placeholderLabel}</span>
                <Button href={pricingDisplay.placeholderCta.href} variant="small" onClick={onClose}>
                  {pricingDisplay.placeholderCta.label}
                </Button>
              </span>
            )
          ) : null}
          <Button href="/book" variant="small" onClick={hire}>
            {fill(t.hire, { name: agent.name })}
          </Button>
          <Button href={`/how-it-works/agents/${agent.id}`} variant="small" onClick={onClose}>
            {t.fullProfile}
          </Button>
        </div>
      </div>
    </div>
  );
}

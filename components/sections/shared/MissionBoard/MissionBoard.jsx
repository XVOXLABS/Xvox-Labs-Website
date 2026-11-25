"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button/Button";
import { agents as allAgents } from "@/data/agents";
import { missions } from "@/data/how-it-works";
import { itemTypes, items } from "@/data/marketplace";
import { missionBoardText as T } from "@/data/missionBoard";
import { solutions } from "@/data/solutions";
import useReducedMotion from "@/hooks/useReducedMotion";
import { VOX_HREF, openCart } from "@/lib/actions";
import { addToCart, TOAST_EVENT } from "@/lib/cart";
import { fill } from "@/lib/content";
import { savePreference } from "@/lib/preference";
import { priceLabel } from "@/lib/pricing";
import AgentPopup from "../AgentPopup/AgentPopup";
import styles from "./MissionBoard.module.css";
import EnquiryButton from "@/components/ui/EnquiryButton/EnquiryButton";
import { PURCHASE_ENABLED } from "@/lib/commerce";

const team = allAgents.filter((a) => a.id !== "vox");
const agentById = Object.fromEntries(allAgents.map((a) => [a.id, a]));
const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));
const itemById = Object.fromEntries(items.map((i) => [i.id, i]));
const REDUCED = "(prefers-reduced-motion: reduce)";
const CONFETTI = ["#EB5A2B", "#FF6B4A", "#FFC83D", "#8A5CF6", "#3D6BFF", "#FF5C8A"];

const toast = (message) => window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: { message, viewCart: false } }));
const presets = (mission) => Object.fromEntries(mission.slots.map((s, k) => [k, s]).filter(([, s]) => s.preset).map(([k, s]) => [k, s.agent]));
const lower = (text) => text.toLowerCase();

// Pure board transitions (prototype placeAgent / resetMission), so the component keeps ordinary state.
function freshState(mission, xp = 0) {
  return { missionId: mission.id, fill: presets(mission), selected: null, xp };
}

function tryPlace(state, mission, k, agentId) {
  const slot = mission.slots[k];
  if (!slot || (state.fill[k] && slot.preset)) return { next: state };
  if (slot.agent !== agentId) return { next: state, wrong: true };
  const before = Object.keys(state.fill).length;
  const fillNext = { ...state.fill, [k]: agentId };
  const completed = Object.keys(fillNext).length === mission.slots.length && before < mission.slots.length;
  return { next: { ...state, fill: fillNext, selected: null, xp: state.xp + T.xpPerSlot + (completed ? T.xpComplete : 0) }, completed };
}

// Mission Board (prototype buildHTML / drawBuild / placeAgent). Pick a mission, then place the right agent
// on each job: drag a piece onto a job, or select a piece and then a job (the keyboard and touch route).
// The blueprint rebuilds as slots fill. Wrong pieces are refused with a toast. State lives for the visit
// only, like the prototype; nothing is stored or sent.
function Board({ initialMission, labels }) {
  const reduced = useReducedMotion();
  const [state, setState] = useState(() => freshState(missions.find((m) => m.id === initialMission) ?? missions.find((m) => m.id === T.defaultMission)));
  const [popup, setPopup] = useState(null);
  const [shake, setShake] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const [announce, setAnnounce] = useState("");
  const timers = useRef([]);
  const autofillRun = useRef(0);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  const later = (fn, ms) => { timers.current.push(window.setTimeout(fn, ms)); };

  const mission = missions.find((m) => m.id === state.missionId);
  const total = mission.slots.length;
  const done = Object.keys(state.fill).length;
  const complete = done === total;
  const needed = mission.slots.map((s, k) => (state.fill[k] ? null : s.agent)).filter(Boolean);
  const used = [...new Set(Object.values(state.fill))];
  const systems = [...new Set(used.flatMap((id) => agentById[id].tools))];

  const selectMission = (id) => {
    autofillRun.current += 1;
    setAnnounce("");
    setConfetti([]);
    setState((s) => freshState(missions.find((m) => m.id === id), s.xp));
  };
  const reset = () => {
    autofillRun.current += 1;
    setAnnounce("");
    setConfetti([]);
    setState((s) => freshState(mission, s.xp));
  };
  const celebrate = () => {
    toast(T.completeToast);
    setAnnounce(T.completeToast);
    if (!reduced) {
      setConfetti(Array.from({ length: 46 }, (_, i) => ({ left: Math.random() * 100, color: CONFETTI[i % CONFETTI.length], delay: Math.random() * 0.4, rotate: Math.random() * 90 })));
      later(() => setConfetti([]), 2200);
    }
  };
  const refuse = (k, agentId) => {
    setShake(k);
    later(() => setShake(null), 450);
    const right = agentById[mission.slots[k].agent];
    toast(fill(T.wrong, { agent: agentById[agentId].name, right: right.name, role: lower(right.role) }));
  };
  const place = (k, agentId) => {
    const result = tryPlace(state, mission, k, agentId);
    if (result.wrong) return refuse(k, agentId);
    setState(result.next);
    if (result.completed) celebrate();
  };
  const autofill = () => {
    const run = (autofillRun.current += 1);
    let current = state;
    const open = mission.slots.map((s, k) => (current.fill[k] ? null : k)).filter((k) => k !== null);
    const step = (i) => {
      if (run !== autofillRun.current || i >= open.length) return;
      const result = tryPlace(current, mission, open[i], mission.slots[open[i]].agent);
      current = result.next;
      setState(result.next);
      if (result.completed) celebrate();
      later(() => step(i + 1), reduced ? 0 : T.autofillDelay);
    };
    step(0);
  };
  const choose = (agentId) => {
    const selected = state.selected === agentId ? null : agentId;
    setState({ ...state, selected });
    setAnnounce(selected ? fill(T.a11y.selected, { name: agentById[agentId].name }) : "");
  };
  const removeFrom = (k) => setState((s) => ({ ...s, fill: Object.fromEntries(Object.entries(s.fill).filter(([key]) => Number(key) !== k)) }));
  const swap = (e, agent, animated) => {
    if (animated && window.matchMedia(REDUCED).matches) return;
    const img = e.currentTarget.querySelector("img");
    if (img) img.src = animated ? agent.animatedImage : agent.image;
  };

  const blueprint = itemById[mission.blueprint];
  const price = priceLabel(blueprint);
  const names = used.map((id) => agentById[id].name).join(", ");
  const remaining = total - done;

  return (
    <div className={styles.board}>
      <div role="group" aria-label={T.a11y.missions} className={styles.missions}>
        {missions.map((m) => (
          <button key={m.id} type="button" aria-pressed={m.id === mission.id} onClick={() => selectMission(m.id)}>
            <i aria-hidden="true">{m.glyph}</i>{m.name}
          </button>
        ))}
      </div>
      <div className={styles.layout}>
        <div className={styles.left}>
          {confetti.length ? (
            <div className={styles.confetti} aria-hidden="true">
              {confetti.map((c, i) => <i key={i} style={{ left: `${c.left}%`, background: c.color, animationDelay: `${c.delay}s`, rotate: `${c.rotate}deg` }} />)}
            </div>
          ) : null}
          <div className={styles.top}>
            <div>
              <b>{mission.name}</b>
              <small>{fill(T.progress, { n: total, open: remaining })}</small>
            </div>
            <div className={styles.xp}>
              <span className={styles.bar} role="progressbar" aria-label={T.a11y.progress} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
                <i style={{ width: `${(done / total) * 100}%` }} />
              </span>
              <b>{done}/{total}</b>
              <span>{fill(T.xp, { xp: state.xp })}</span>
            </div>
          </div>
          <ol className={styles.slots}>
            {mission.slots.map((slot, k) => {
              const placed = state.fill[k];
              const agent = placed ? agentById[placed] : null;
              const need = agentById[slot.agent];
              return (
                <li key={slot.job} className={`${styles.slot} ${placed ? styles.filled : ""} ${!placed && state.selected ? styles.target : ""} ${!placed && needed.length ? styles.need : ""} ${shake === k ? styles.shake : ""}`.trim()}>
                  <span className={styles.job}>{slot.job}</span>
                  {agent ? (
                    <div className={styles.drop}>
                      <span className={styles.art}><Image src={agent.image} alt="" fill sizes="110px" unoptimized draggable={false} /></span>
                    </div>
                  ) : (
                    <button type="button" className={styles.drop} aria-label={fill(T.a11y.slot, { job: slot.job, drop: labels.drop })}
                      onClick={() => state.selected && place(k, state.selected)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const id = e.dataTransfer.getData("text/plain");
                        if (agentById[id]) place(k, id);
                      }}>
                      {labels.drop}
                    </button>
                  )}
                  {agent ? (
                    <span className={styles.who}>
                      <b>{agent.name}</b>
                      {slot.preset ? <span>{labels.lock}</span> : (
                        <button type="button" aria-label={fill(T.a11y.removeFrom, { name: agent.name, job: slot.job })}
                          onClick={() => removeFrom(k)}>{T.remove}</button>
                      )}
                    </span>
                  ) : <span className={styles.rec}>{fill(T.hint, { role: lower(need.role) })}</span>}
                </li>
              );
            })}
          </ol>
          <div className={styles.tray}>
            <h3>{labels.tray}</h3>
            <ul>
              {team.map((agent) => {
                const recommended = needed.includes(agent.id);
                return (
                  <li key={agent.id} className={`${styles.piece} ${recommended ? styles.recommended : ""} ${state.selected === agent.id ? styles.selected : ""}`.trim()}>
                    <button type="button" aria-pressed={state.selected === agent.id} draggable
                      aria-label={`${fill(T.a11y.trayAgent, { name: agent.name, role: agent.role })}${recommended ? `, ${T.a11y.recommended}` : ""}`}
                      onClick={() => choose(agent.id)}
                      onDragStart={(e) => { e.dataTransfer.setData("text/plain", agent.id); e.dataTransfer.effectAllowed = "copy"; }}
                      onPointerEnter={(e) => swap(e, agent, true)} onPointerLeave={(e) => swap(e, agent, false)}>
                      <span className={styles.avatar}><Image src={agent.image} alt="" fill sizes="40px" unoptimized draggable={false} /></span>
                      <span>{agent.name}<small>{agent.role}</small></span>
                    </button>
                    <button type="button" className={styles.info} aria-label={fill(T.info, { name: agent.name })} onClick={() => setPopup(agent.id)}>i</button>
                    <span className={styles.tip}><b>{T.skills}</b> {agent.skills.join(", ")}<br /><b>{T.connects}</b> {agent.tools.join(", ")}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.actions}>
            <Button variant="primary" onClick={autofill}>{labels.fill}</Button>
            <Button variant="secondary" onClick={reset}>{labels.reset}</Button>
            <Button href={VOX_HREF} variant="secondary">{labels.ask}</Button>
          </div>
        </div>
        <div className={styles.right}>
          <span className={styles.eyebrow}>{labels.live}</span>
          <h3>{fill(T.blueprintHeading, { name: lower(mission.name) })}</h3>
          <ol className={styles.steps}>
            {mission.slots.map((slot, k) => {
              const agent = state.fill[k] ? agentById[state.fill[k]] : null;
              return agent ? (
                <li key={slot.job}>
                  <span className={styles.avatar}><Image src={agent.image} alt="" fill sizes="40px" unoptimized draggable={false} /></span>
                  <span>
                    <b>{k + 1}. {agent.name} {slot.does.split(" ")[0]}</b>
                    <span>{agent.name} {slot.does}</span>
                    {slot.check ? <span className={styles.checkpoint}>{fill(T.checkpoint, { check: slot.check })}</span> : null}
                  </span>
                </li>
              ) : (
                <li key={slot.job} className={styles.miss}>
                  <span className={styles.num}>{k + 1}</span>
                  <span><b>{fill(T.missing, { job: lower(slot.job) })}</b><span>{T.missingText}</span></span>
                </li>
              );
            })}
          </ol>
          {systems.length ? (
            <div>
              <h4 className={styles.label}>{labels.systems}</h4>
              <ul className={styles.chips}>{systems.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ) : null}
          {complete ? (
            <div className={styles.win}>
              <span className={styles.chip}>{T.completeChip}</span>
              <b>{T.win}</b>
              <div className={styles.actions}>
                {!PURCHASE_ENABLED ? <EnquiryButton about={blueprint.name} path={itemTypes.blueprint.name} />
                  : price ? <Button onClick={() => { addToCart(mission.blueprint, { silent: true }); openCart(); }}>{fill(T.buy, { price })}</Button> : null}
                <Button href="/book" variant="secondary" onClick={() => savePreference(fill(T.hireAbout, { name: mission.name, agents: names }), T.hirePath)}>{T.hire}</Button>
                <Button href="/book" variant="secondary" onClick={() => savePreference(fill(T.buildAbout, { name: mission.name }), T.buildPath)}>{T.build}</Button>
              </div>
              <ul className={styles.links}>
                {mission.solutions.map((slug) => (
                  <li key={slug}><Link href={`/solutions/${slug}`}><span><small>{T.useCase}</small>{solutionBySlug[slug].pain}</span><span aria-hidden="true">→</span></Link></li>
                ))}
              </ul>
            </div>
          ) : <p className={styles.note}>{fill(T.stepsToGo, { n: remaining, s: remaining === 1 ? "" : "s" })}</p>}
        </div>
      </div>
      <p role="status" className={styles.srOnly}>{announce}</p>
      <AgentPopup agentId={popup} onClose={() => setPopup(null)} initialTab="skills" />
    </div>
  );
}

// /build?mission=<id> selects the mission (the agent popup and agent profiles link here). Unknown ids fall back.
function WithMission(props) {
  const requested = useSearchParams().get("mission");
  const id = missions.some((m) => m.id === requested) ? requested : T.defaultMission;
  return <Board key={id} initialMission={id} {...props} />;
}

export default function MissionBoard({ readParam = false, ...props }) {
  return readParam ? (
    <Suspense fallback={<Board initialMission={T.defaultMission} {...props} />}>
      <WithMission {...props} />
    </Suspense>
  ) : (
    <Board initialMission={T.defaultMission} {...props} />
  );
}

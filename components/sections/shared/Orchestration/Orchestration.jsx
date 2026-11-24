"use client";

import Image from "next/image";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { agents } from "@/data/agents";
import { orchestrations, orchestrationText as T } from "@/data/orchestration";
import { agentImageSize } from "@/lib/agentImages";
import { fill } from "@/lib/content";
import { PAUSE, REDUCED_PAUSE, createClock, decide, edges, memoryIntro, run } from "@/lib/orchestration";
import styles from "./Orchestration.module.css";

const REDUCED = "(prefers-reduced-motion: reduce)";
const WIDE = "(min-width: 1200px)";
const agentById = (id) => agents.find((a) => a.id === id);

function initial(spec) {
  return { status: T.status.ready, nodes: {}, lit: {}, checks: [], log: [], empty: true, mem: memoryIntro(spec), memAct: false, buttons: false };
}

const node = (state, key, change) => ({ ...state, nodes: { ...state.nodes, [key]: { ...state.nodes[key], ...change } } });

function reducer(state, a) {
  switch (a.type) {
    case "reset":
      return { ...state, nodes: {}, lit: {}, checks: [], log: [], empty: false, mem: a.mem, memAct: false, buttons: false };
    case "status":
      return { ...state, status: a.text };
    case "act":
      return node(state, a.key, { act: true, done: false });
    case "fin":
      return node(state, a.key, { act: false, wait: false, done: true });
    case "idle":
      return node(state, a.key, { act: false, wait: false });
    case "wait":
      return node(state, "human", a.on ? { act: true, wait: true } : { wait: false });
    case "warn":
      return node(state, "sage", { warn: a.on });
    case "lit":
      return { ...state, lit: { ...state.lit, [a.key]: true } };
    case "check": {
      const checks = [...state.checks];
      checks[a.i] = a.state;
      return { ...state, checks };
    }
    case "log":
      return { ...state, log: [...state.log, a.entry] };
    case "memory":
      return { ...state, mem: a.text, memAct: true };
    case "memOff":
      return { ...state, memAct: false };
    case "buttons":
      return { ...state, buttons: a.on };
    default:
      return state;
  }
}

// Connection paths between node boxes, relative to the graph (prototype drawOrc).
function paths(grid, spec) {
  const R = grid.getBoundingClientRect();
  const box = (n) => {
    const r = grid.querySelector(`[data-n="${n}"]`).getBoundingClientRect();
    return { l: r.left - R.left, r: r.right - R.left, t: r.top - R.top, b: r.bottom - R.top, cx: (r.left + r.right) / 2 - R.left, cy: (r.top + r.bottom) / 2 - R.top };
  };
  return edges(spec).map(([from, to, kind]) => {
    const a = box(from);
    const b = box(to);
    let d;
    if (kind === "flag") d = `M${a.cx} ${a.b} C${a.cx} ${a.b + 70} ${b.cx} ${b.b + 70} ${b.cx} ${b.b}`;
    else if (kind === "loop") d = `M${a.cx} ${a.t} C${a.cx} ${a.t - 60} ${b.cx} ${b.t - 60} ${b.cx} ${b.t}`;
    else if ((from[0] === "a" && to[0] === "a" && Math.abs(a.cx - b.cx) < 20) || (from === "human" && to === "out")) d = `M${a.cx} ${a.b} L${b.cx} ${b.t}`;
    else {
      const m = (a.r + b.l) / 2;
      d = `M${a.r} ${a.cy} C${m} ${a.cy} ${m} ${b.cy} ${b.l} ${b.cy}`;
    }
    return { key: `${from}-${to}`, kind, d };
  });
}

// One orchestration flow (prototype orcHTML + runtime): controls, the five-column graph with its
// connection lines (1200px and up; stacked below, decision D2), shared memory and the run log.
// Runs once when 35% visible while `active`, again whenever `runSignal` changes (tab switch),
// on "Run it" and when the safety-flag box changes. Only the status chip is announced (D4).
export default function Orchestration({ slug, spec = orchestrations[slug], active = true, runSignal = 0 }) {
  const [state, dispatch] = useReducer(reducer, spec, initial);
  const [flag, setFlag] = useState(false);
  const [lines, setLines] = useState([]);
  const rootRef = useRef(null);
  const gridRef = useRef(null);
  const logRef = useRef(null);
  const tokRef = useRef(null);
  const clockRef = useRef(null);
  const flagRef = useRef(false);
  const startedRef = useRef(false);
  const timersRef = useRef(new Set());

  const context = useCallback(
    (tok) => ({
      spec,
      flagOn: flagRef.current,
      alive: () => tokRef.current === tok,
      sleep: (ms) => new Promise((resolve) => window.setTimeout(resolve, window.matchMedia(REDUCED).matches ? REDUCED_PAUSE : ms)),
      ui: {
        reset: (mem) => {
          clockRef.current = createClock(window.matchMedia(REDUCED).matches);
          dispatch({ type: "reset", mem });
        },
        status: (text) => dispatch({ type: "status", text }),
        act: (key) => dispatch({ type: "act", key }),
        fin: (key) => dispatch({ type: "fin", key }),
        idle: (key) => dispatch({ type: "idle", key }),
        wait: (on) => dispatch({ type: "wait", on }),
        warn: (on) => dispatch({ type: "warn", on }),
        lit: (from, to) => dispatch({ type: "lit", key: `${from}-${to}` }),
        check: (i, s) => dispatch({ type: "check", i, state: s }),
        log: (who, text, kind) => dispatch({ type: "log", entry: { time: clockRef.current(), who, text, kind } }),
        memory: (text) => {
          dispatch({ type: "memory", text: fill(T.labels.memorySaved, { mem: text }) });
          // Prototype memFlash: highlighted for 900ms
          const id = window.setTimeout(() => {
            timersRef.current.delete(id);
            dispatch({ type: "memOff" });
          }, PAUSE.agent);
          timersRef.current.add(id);
        },
        buttons: (on) => dispatch({ type: "buttons", on }),
      },
    }),
    [spec],
  );

  const start = useCallback(() => {
    const tok = {};
    tokRef.current = tok;
    startedRef.current = true;
    run(context(tok));
  }, [context]);

  const choose = (action) => {
    if (!state.buttons) return;
    decide(context(tokRef.current), action);
  };

  // Stop any run when the panel is hidden or removed.
  useEffect(() => {
    if (!active) tokRef.current = null;
  }, [active]);
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      tokRef.current = null;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // First run when 35% visible (prototype orcObs); tab switches run again (prototype twStage click).
  useEffect(() => {
    if (!active || startedRef.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          io.disconnect();
          start();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [active, start]);
  // A tab switch shows a fresh flow (prototype rebuilds the stage): flag box cleared, then it runs.
  useEffect(() => {
    if (!runSignal) return undefined;
    const id = window.setTimeout(() => {
      flagRef.current = false;
      setFlag(false);
      start();
    }, 30);
    return () => window.clearTimeout(id);
  }, [runSignal, start]);

  // Connection lines: measured from the node boxes, redrawn whenever the graph or a node resizes.
  useEffect(() => {
    const grid = gridRef.current;
    const wide = window.matchMedia(WIDE);
    const draw = () => setLines(wide.matches && grid.offsetWidth ? paths(grid, spec) : []);
    const ro = new ResizeObserver(draw);
    ro.observe(grid);
    grid.querySelectorAll("[data-n]").forEach((n) => ro.observe(n));
    wide.addEventListener("change", draw);
    return () => {
      ro.disconnect();
      wide.removeEventListener("change", draw);
    };
  }, [spec]);

  // Keep the newest log line in view (scrolls the list only, never the page).
  useEffect(() => {
    const list = logRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [state.log.length]);

  // Node classes plus a data-state mirror of the prototype's state classes (act, done, wait, warn).
  const STATES = ["act", "done", "wait", "warn"];
  const nodeProps = (key, base) => {
    const n = state.nodes[key] || {};
    const on = STATES.filter((k) => n[k]);
    return { "data-n": key, "data-state": on.join(" ") || undefined, className: [styles.node, base, ...on.map((k) => styles[k])].filter(Boolean).join(" ") };
  };
  const L = T.labels;

  return (
    <div ref={rootRef} className={styles.orc} data-orc={slug}>
      <div className={styles.bar}>
        <Button variant="small" onClick={start}>
          {T.run}
        </Button>
        <label className={styles.flag}>
          <input
            type="checkbox"
            checked={flag}
            onChange={(e) => {
              flagRef.current = e.target.checked;
              setFlag(e.target.checked);
              start();
            }}
          />
          {T.flagToggle}
        </label>
        <span className={styles.statusWrap} role="status" aria-live="polite">
          <Badge className={styles.status}>{state.status}</Badge>
        </span>
      </div>

      <div ref={gridRef} className={styles.grid}>
        <svg className={styles.svg} aria-hidden="true">
          {lines.map((p) => (
            <path key={p.key} d={p.d} className={[styles.ed, p.kind && styles[p.kind], state.lit[p.key] && styles.lit].filter(Boolean).join(" ")} />
          ))}
        </svg>

        <div className={styles.col}>
          <div {...nodeProps("trig")}>
            <span className={styles.olb}>{L.trigger}</span>
            <b>{spec.trig}</b>
          </div>
          <div {...nodeProps("ctx")}>
            <span className={styles.olb}>{L.context}</span>
            <span className={styles.tools}>
              {spec.ctx.map((c) => (
                <span key={c} className={styles.tool}>
                  {c}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className={styles.col}>
          <div {...nodeProps("orch", styles.dark)}>
            <span className={styles.olb}>{L.orchestrator}</span>
            <b>{L.orchestratorTask}</b>
            <p>{spec.plan}</p>
          </div>
        </div>

        <div className={styles.col}>
          {spec.ag.map((g, i) => {
            const a = agentById(g.id);
            const [w, h] = agentImageSize[a.id].still;
            return (
              <div key={g.id} {...nodeProps(`ag${i}`)}>
                <span className={styles.oh}>
                  <span className={styles.av} style={{ background: `var(--tint-${a.tint})` }}>
                    <Image src={a.image} alt="" width={w} height={h} unoptimized />
                  </span>
                  <span className={styles.who}>
                    <span className={styles.olb}>{a.name}</span>
                    <b>{g.t}</b>
                  </span>
                </span>
                <span className={styles.tools}>
                  {g.tools.map((t) => (
                    <span key={t} className={styles.tool}>
                      {t}
                    </span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.col}>
          <div {...nodeProps("sage")}>
            <span className={styles.olb}>{L.sage}</span>
            <ul className={styles.chk}>
              {spec.checks.map((c, i) => (
                <li key={c} className={state.checks[i] ? styles[state.checks[i]] : undefined} data-state={state.checks[i] || undefined}>
                  <i aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.col}>
          <div {...nodeProps("human", styles.human)}>
            <span className={styles.olb}>{fill(L.human, { who: spec.who })}</span>
            <b>{spec.ask}</b>
            <span className={styles.hbtns}>
              <Button variant="small" className={styles.go} disabled={!state.buttons} onClick={() => choose("approve")}>
                {T.actions.approve}
              </Button>
              <Button variant="small" disabled={!state.buttons} onClick={() => choose("edit")}>
                {T.actions.edit}
              </Button>
              <Button variant="small" disabled={!state.buttons} onClick={() => choose("reject")}>
                {T.actions.reject}
              </Button>
            </span>
          </div>
          <div {...nodeProps("out", styles.dark)}>
            <span className={styles.olb}>{L.outcome}</span>
            <b>{spec.out}</b>
          </div>
        </div>

        <div data-n="mem" className={`${styles.mem} ${state.memAct ? styles.memAct : ""}`.trim()}>
          <span className={styles.olb}>{L.memory}</span>
          <span>{state.mem}</span>
        </div>
      </div>

      <div className={styles.log}>
        <span className={styles.olb}>{L.log}</span>
        <ol ref={logRef}>
          {state.empty ? (
            <li className={styles.empty}>{L.logEmpty}</li>
          ) : (
            state.log.map((e, i) => (
              <li key={i} className={e.kind ? styles[`log_${e.kind}`] : undefined}>
                <time>{e.time}</time>
                <b>{e.who}</b> {e.text}
              </li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
}

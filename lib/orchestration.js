import { agents } from "@/data/agents";
import { orchestrationText as T } from "@/data/orchestration";
import { fill } from "@/lib/content";

// Orchestration run engine, ported from the prototype (index.html: orcEdges, runAgents, sageCheck,
// waitHuman, runOrc, orcAct, olog). No DOM access: the component passes a `ui` object of callbacks,
// a `sleep` and an `alive` check (false once a newer run has started), so a run can be cancelled
// at any pause. Used by the homepage Team at Work tabs; solution and department pages reuse it in
// Phase 5. Specs come from data/orchestration.js.

const name = (id) => agents.find((a) => a.id === id).name;
const both = (list) => list.join(T.and);
const deps = (g) => (g.dep === undefined ? [] : [].concat(g.dep));

// Prototype pause lengths (ms); with reduced motion every pause is 60ms (prototype osl).
export const PAUSE = { step: 700, plan: 1000, agent: 900, save: 600, check: 500, flag: 1300, fix: 700, replan: 900, edit: 900, out: 600 };
export const REDUCED_PAUSE = 60;

// Agents grouped into waves: no dependency = wave 0, depends on another = wave 1 (prototype runAgents).
export function waves(spec) {
  const out = [];
  spec.ag.forEach((g, i) => {
    const w = g.dep === undefined ? 0 : Math.max(...deps(g).map((k) => (spec.ag[k].dep === undefined ? 0 : 1) + 1));
    (out[w] = out[w] || []).push(i);
  });
  return out;
}

// Graph connections [from, to, kind?] between node keys (prototype orcEdges).
export function edges(spec) {
  const e = [["trig", "orch"], ["ctx", "orch"]];
  spec.ag.forEach((g, i) => {
    if (g.dep === undefined) e.push(["orch", `ag${i}`]);
    else deps(g).forEach((k) => e.push([`ag${k}`, `ag${i}`]));
  });
  const last = spec.ag.map((_, i) => i).filter((i) => !spec.ag.some((h) => deps(h).includes(i)));
  last.forEach((i) => e.push([`ag${i}`, "sage"]));
  e.push(["sage", "human"], ["human", "out"]);
  e.push(["sage", `ag${last[last.length - 1]}`, "flag"], ["human", "orch", "loop"]);
  return e;
}

// Shared-memory introduction ("Every agent reads and writes here: a · b").
export const memoryIntro = (spec) => fill(T.labels.memoryIntro, { mems: spec.ag.map((g) => g.mem).join(" · ") });

// Run-log clock: starts at 10:42:00 and moves 2-7 seconds per line (1 second with reduced motion).
export function createClock(reduced, random = Math.random) {
  let t = 0;
  return () => {
    const s = 10 * 3600 + 42 * 60 + t;
    t += reduced ? 1 : Math.round(2 + random() * 5);
    return [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map((n) => String(n).padStart(2, "0")).join(":");
  };
}

// Fills a log template [who, text] from data/orchestration.js.
function line(key, values = {}) {
  const [who, text] = T.log[key];
  return [fill(who, values), fill(text, values)];
}

// One wave pass (prototype runAgents); `only` re-runs a single agent after a rejection.
async function runAgents(c, only) {
  const { spec, ui, sleep, alive } = c;
  for (const wave of waves(spec)) {
    if (!wave) continue;
    const list = wave.filter((i) => only === undefined || i === only);
    if (!list.length) continue;
    if (list.length > 1) ui.log(...line("parallel", { names: both(list.map((i) => name(spec.ag[i].id))) }));
    list.forEach((i) => {
      const g = spec.ag[i];
      if (g.dep === undefined) ui.lit("orch", `ag${i}`);
      else deps(g).forEach((k) => ui.lit(`ag${k}`, `ag${i}`));
      ui.act(`ag${i}`);
      ui.log(...line("assign", { agent: name(g.id), task: g.t }));
    });
    await sleep(PAUSE.agent);
    if (!alive()) return false;
    list.forEach((i) => ui.log(...line("uses", { agent: name(spec.ag[i].id), tools: both(spec.ag[i].tools) })));
    await sleep(PAUSE.agent);
    if (!alive()) return false;
    list.forEach((i) => {
      const g = spec.ag[i];
      ui.fin(`ag${i}`);
      ui.log(...line("saves", { agent: name(g.id), mem: g.mem }));
      ui.memory(g.mem);
    });
    await sleep(PAUSE.save);
    if (!alive()) return false;
  }
  return true;
}

// Sage's checks; with the flag on, the flagged check fails, the work goes back and is re-checked.
async function sageCheck(c, flagOn) {
  const { spec, ui, sleep, alive } = c;
  const lastI = spec.ag.length - 1;
  const lastAgent = name(spec.ag[lastI].id);
  edges(spec).forEach(([a, b]) => b === "sage" && ui.lit(a, "sage"));
  ui.act("sage");
  ui.status(T.status.checks);
  for (let i = 0; i < spec.checks.length; i++) {
    await sleep(PAUSE.check);
    if (!alive()) return false;
    if (flagOn && i === spec.flag[0]) {
      ui.check(i, "bad");
      ui.warn(true);
      ui.log(...line("flag", { problem: spec.flag[1] }), "warn");
      ui.lit("sage", `ag${lastI}`);
      ui.act(`ag${lastI}`);
      ui.status(T.status.flagged);
      await sleep(PAUSE.flag);
      if (!alive()) return false;
      ui.log(...line("fix", { agent: lastAgent, fix: spec.flag[2] }));
      ui.fin(`ag${lastI}`);
      await sleep(PAUSE.fix);
      ui.warn(false);
      ui.check(i, "ok");
      ui.log(...line("recheck"));
    } else {
      ui.check(i, "ok");
    }
  }
  ui.log(...line("passed", { count: spec.checks.length }));
  ui.fin("sage");
  return true;
}

function waitHuman(c) {
  const { spec, ui } = c;
  ui.lit("sage", "human");
  ui.wait(true);
  ui.buttons(true);
  ui.status(T.status.yourTurn);
  ui.log(...line("waiting", { who: spec.who, ask: spec.ask }), "you");
}

// A full run (prototype runOrc). c = { spec, ui, sleep, alive, flagOn }.
export async function run(c) {
  const { spec, ui, sleep, alive } = c;
  ui.reset(memoryIntro(spec));
  ui.status(T.status.running);
  ui.act("trig");
  ui.log(...line("trigger", { trig: spec.trig }));
  await sleep(PAUSE.step);
  if (!alive()) return;
  ui.lit("trig", "orch");
  ui.act("ctx");
  ui.log(...line("context", { ctx: both(spec.ctx) }));
  await sleep(PAUSE.step);
  if (!alive()) return;
  ui.lit("ctx", "orch");
  ui.fin("trig");
  ui.fin("ctx");
  ui.act("orch");
  ui.log(...line("plan", { plan: spec.plan }));
  await sleep(PAUSE.plan);
  if (!alive()) return;
  if (!(await runAgents(c))) return;
  ui.fin("orch");
  if (!(await sageCheck(c, c.flagOn))) return;
  waitHuman(c);
}

// The person's decision (prototype orcAct): "approve" | "edit" | "reject".
export async function decide(c, action) {
  const { spec, ui, sleep, alive } = c;
  const lastI = spec.ag.length - 1;
  const lastAgent = name(spec.ag[lastI].id);
  ui.buttons(false);
  if (action === "reject") {
    ui.log(...line("rejected"), "you");
    ui.lit("human", "orch");
    ui.idle("human");
    ui.act("orch");
    ui.status(T.status.replanning);
    await sleep(PAUSE.replan);
    if (!alive()) return;
    ui.log(...line("replan", { agent: lastAgent }));
    if (!(await runAgents(c, lastI))) return;
    ui.fin("orch");
    if (!(await sageCheck(c, false))) return;
    waitHuman(c);
    return;
  }
  if (action === "edit") {
    ui.log(...line("edited"), "you");
    ui.log(...line("applyEdit", { agent: lastAgent }));
    ui.memory(T.log.preference);
    await sleep(PAUSE.edit);
    if (!alive()) return;
  } else {
    ui.log(...line("approved"), "you");
  }
  ui.fin("human");
  ui.lit("human", "out");
  ui.act("out");
  await sleep(PAUSE.out);
  if (!alive()) return;
  ui.fin("out");
  const [who, text] = line("done", { out: spec.out });
  ui.log(who, text + (action === "edit" ? T.log.doneEdited : ""), "ok");
  ui.log(...line("monitoring"));
  ui.status(T.status.done);
}

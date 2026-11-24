import { agents, coreAgentIds } from "./agents.js";
import { departments, otherCategories } from "./departments.js";
import { items } from "./marketplace.js";
import { orchestrations } from "./orchestration.js";
import { prototypeRoutes } from "./reviewRoutes.js";
import { teamAtWork } from "./solutions.js";

const prefix = "/solutions/";
export const solutionsHub = prototypeRoutes.find(({ hash }) => hash === "#solutions");
export const solutionsDetails = prototypeRoutes.filter(({ href }) => href.startsWith(prefix));
export const solutionsBySlug = new Map(solutionsDetails.map((entry) => [entry.href.slice(prefix.length), entry]));
const solutionEntries = solutionsDetails.filter(({ hash }) => hash.startsWith("#solution-"));

// TEAMBOX and the generic flow are from sol(), flowFor() and orcFor() in prototype v5.
const marketingTeam = {
  category: "growth",
  pain: "We need a whole marketing team",
  agentIds: coreAgentIds,
  without: ["Nobody owns marketing", "Content, search and follow-up happen in bursts", "Results are hard to read"],
  with: ["Five agents share one brief", "A weekly rhythm of content, search work and follow-up", "A person on our team checks in with you"],
};

export const solutionsText = {
  timeline: "{timeline}: audit, build and test, then live with approvals.",
  liveIn: "Live in {timeline}",
  departmentWorkflow: "{name}, step by step.",
  moreIn: "More in {name}.",
  related: "Related",
  groupAbout: "Not sure yet",
  bookAbout: "Implement",
  browseBlueprints: "Browse blueprints ›",
  sampleCatalogue: "Sample catalogue",
};

export function solutionInfo(entry) {
  const isBundle = entry.record.slug === "marketing-team";
  const record = isBundle ? { ...entry.record, ...marketingTeam } : entry.record;
  const category = [...departments, ...otherCategories].find(({ id }) => id === record.category);
  const group = departments.find(({ id }) => id === category.id);
  const workflow = record.workflow ?? {
    trigger: "The problem shows up",
    steps: record.agentIds.map((id) => ({ agent: id, does: agents.find((agent) => agent.id === id).line })),
    outcome: record.with[0],
    timeline: "4–6 weeks",
  };
  return {
    ...record,
    workflow,
    category,
    group,
    href: entry.href,
    isBundle,
    label: teamAtWork[record.slug] ?? record.title,
  };
}

const solutions = solutionEntries.map(solutionInfo);
export const departmentSolutions = solutions.filter(({ group, isBundle }) => group && !isBundle);

export function solutionMarketplace(solution) {
  const slugs = solution.isBundle
    ? departmentSolutions.filter(({ category }) => category.id === solution.category.id).map(({ slug }) => slug)
    : [solution.slug];
  return items.filter((item) => item.solutions.some((slug) => slugs.includes(slug)));
}

export function solutionOrchestration({ slug, workflow }) {
  if (orchestrations[slug]) return orchestrations[slug];
  const assigned = workflow.steps.filter(({ agent }) => agent !== "sage" && agent !== "you");
  const steps = assigned.length ? assigned : [{ agent: "beacon", does: "Tests the AI with real and tricky inputs" }];
  const team = steps.map(({ agent, does }, index) => ({
    id: agent,
    t: does,
    tools: agents.find(({ id }) => id === agent).tools.slice(0, 2),
    mem: `Results of step ${index + 1}`,
    ...(index ? { dep: index - 1 } : {}),
  }));
  return {
    trig: workflow.trigger,
    ctx: [team[0].tools[0], "Your rules and templates"],
    plan: "Split the job, run the agents, check, get approval",
    ag: team,
    checks: ["Facts match sources", "Follows your rules", "No personal data exposed", "Safe to send or publish"],
    flag: [1, "One output breaks a rule you set", "The agent fixes it and resubmits"],
    who: "You",
    ask: "Approve the result?",
    out: workflow.outcome,
  };
}

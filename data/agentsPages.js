// Approved change (owner, Nov 26, 2026; CLAUDE.md REF-9): unverified delivery durations, speed claims, result
// figures and agent quotes are removed or reworded. Records that held only such text are empty strings.
import { missions } from "./how-it-works.js";
import { items } from "./marketplace.js";
import { prototypeActions, prototypeRoutes } from "./reviewRoutes.js";
import { solutionInfo, solutionOrchestration, solutionsBySlug } from "./solutionsPages.js";

export const agentsHub = prototypeRoutes.find(({ hash }) => hash === "#how");
export const agentProfiles = prototypeRoutes.filter(({ hash }) => hash.startsWith("#agent-"));
export const agentById = new Map(agentProfiles.map((entry) => [entry.record.id, entry]));
export const agentHireSection = prototypeActions["#hire"].withinPage.slice(1);

export function sectionBlocks(entry, index) {
  return entry.sections.find((section) => section.index === index).blocks;
}

export function profileCollections({ id, solutions }) {
  const catalogue = items.filter(({ agent }) => agent === id);
  return {
    catalogue,
    blueprint: catalogue.find(({ type }) => type === "blueprint"),
    related: solutions.map((slug) => solutionInfo(solutionsBySlug.get(slug))),
    jobs: missions.flatMap(({ id: mission, name, slots }) => slots.filter(({ agent }) => agent === id).map(({ job }) => ({ mission, name, job }))),
  };
}

// Final PAGES.how in prototype v5 uses these four tabs with twStage's orchestration footer.
const workflowSlugs = ["leads-go-cold", "reporting", "client-updates", "design-intake"];
const workflowLabels = sectionBlocks(agentsHub, 2).filter(({ tag }) => tag === "button");
export const agentWorkflows = workflowSlugs.map((slug, i) => {
  const solution = solutionInfo(solutionsBySlug.get(slug));
  return { slug, label: workflowLabels[i].text, href: solution.href, spec: solutionOrchestration(solution),
    footer: `${solution.title}` };
});

// Banner positions and alt text are part of the prototype, independent of the directory order.
export const teamBanner = {
  image: "/images/banner.webp",
  alt: "The Xvox agents working together: Scout reads a chart, Beacon lights up search, Relay takes a call, Sage guards with a shield, Reel films, Quill writes, and Vox guides from above",
  hotspots: [["scout", 17, 74], ["beacon", 17, 30], ["relay", 36, 55], ["vox", 50, 22], ["sage", 63, 52], ["reel", 79, 40], ["quill", 82, 76]],
};

export const agentPageText = {
  modelToast: "All agents now running on {model} (demo)",
  voxRole: "Your guide",
  sampleCatalogue: "Sample catalogue",
};

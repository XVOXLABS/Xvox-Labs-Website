import { agents } from "./agents.js";
import { departments, otherCategories } from "./departments.js";
import { itemTypes, items } from "./marketplace.js";
import { prototypeRoutes } from "./reviewRoutes.js";
import { solutions } from "./solutions.js";

// Marketplace routes (/marketplace, /marketplace/[id]) built from the extracted prototype v5 pages
// (data/pages/marketplace.js, data/pages/marketplace-item.js) and the item data. Server-side only:
// it imports the review manifest. The client browser receives the slim values computed here.

export const marketHub = prototypeRoutes.find(({ hash }) => hash === "#market");
export const itemEntries = prototypeRoutes.filter(({ hash }) => hash.startsWith("#item-"));
export const itemById = new Map(itemEntries.map((entry) => [entry.record.id, entry]));

export function sectionBlocks(entry, index) {
  return entry.sections.find((section) => section.index === index).blocks;
}

// Prototype JS strings that are not part of the extracted page blocks (mGrid, drawMarket, PAGES.item).
export const marketplaceText = {
  countOne: "item",
  countMany: "items",
  empty: "Nothing matches yet.",
  inCart: "In your cart ✓",
  installBody: "We can set up {name} in your own tools, or host it for you.",
  agentLabel: "Agent",
  useCaseLabel: "Use case",
  forAgent: "for",
  hubInstallPath: "We implement it",
  hubInstallAbout: "Marketplace",
  samplePrices: "Sample prices",
  sampleUnits: { "one-time": "one-time", "/month": "/ month" },
};

export const categories = [...departments, ...otherCategories];
const solutionCategory = new Map(solutions.map(({ slug, category }) => [slug, category]));

export function itemCategories(item) {
  return [...new Set(item.solutions.map((slug) => solutionCategory.get(slug)))];
}

// Prototype PAGES.item: same agent or a shared use case, catalogue order, first four.
export function relatedItems(item) {
  return items
    .filter((other) => other.id !== item.id && (other.agent === item.agent || other.solutions.some((slug) => item.solutions.includes(slug))))
    .slice(0, 4);
}

// Filter lists come from the prototype's button blocks (label text, original order). Values are matched
// by name; counts are computed over the whole catalogue like the prototype (independent of other filters).
function facet(blocks, heading, valueFor, countFor) {
  const start = blocks.findIndex(({ tag, text }) => tag === "h5" && text === heading);
  const rest = blocks.slice(start + 1);
  const end = rest.findIndex(({ tag }) => tag === "h5");
  const buttons = rest.slice(0, end === -1 ? undefined : end).filter(({ tag }) => tag === "button");
  return {
    label: heading,
    options: buttons.map(({ text }, index) => {
      const label = text.replace(/\s+\d+$/, "");
      const value = index === 0 ? "all" : valueFor(label);
      if (!value) throw new Error(`Marketplace filter "${label}" has no matching value`);
      return { value, label, count: index === 0 ? items.length : countFor(value) };
    }),
  };
}

const hubFilters = sectionBlocks(marketHub, 1);
const typeByLabel = new Map(Object.entries(itemTypes).map(([key, { name }]) => [`${name}s`, key]));
const agentByLabel = new Map(agents.map(({ id, name }) => [name, id]));
const categoryByLabel = new Map(categories.map(({ id, name }) => [name, id]));

export const marketFilters = {
  type: facet(hubFilters, "Type", (label) => typeByLabel.get(label), (value) => items.filter(({ type }) => type === value).length),
  agent: facet(hubFilters, "Agent", (label) => agentByLabel.get(label), (value) => items.filter(({ agent }) => agent === value).length),
  cat: facet(hubFilters, "Use case category", (label) => categoryByLabel.get(label),
    (value) => items.filter((item) => itemCategories(item).includes(value)).length),
};

const sortOptions = hubFilters.filter(({ tag }) => tag === "option").map(({ text }) => text);
export const marketSort = ["featured", "low", "high", "name"].map((value, index) => ({ value, label: sortOptions[index] }));

// Per-item search text and categories for the client browser (prototype name + description + tools).
export const marketIndex = Object.fromEntries(items.map((item) => [item.id, {
  categories: itemCategories(item),
  text: `${item.name} ${item.description} ${item.tools.join(" ")}`.toLowerCase(),
}]));

// Hidden prototype placeholder notes, shown only inside a labelled disclosure (team-review rule).
export function sampleNote(blocks) {
  const note = blocks.find(({ tag, hidden }) => tag === "p.note" && hidden);
  const [label, ...body] = note.text.split(/\s(?=(?:Prototype|Names)\b)/);
  return { label, body: body.join(" ") };
}

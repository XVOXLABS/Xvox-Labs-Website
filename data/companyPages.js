import { prototypeRoutes } from "./reviewRoutes.js";

// Company and conversion pages (Phase 2.5), built from the extracted prototype v5 page records.
// Server-side only: it imports the review manifest.

const byHash = (hash) => prototypeRoutes.find((entry) => entry.hash === hash);

export const companyPages = {
  pricing: byHash("#pricing"),
  book: byHash("#book"),
  trust: byHash("#trust"),
  about: byHash("#about"),
  careers: byHash("#careers"),
  blog: byHash("#blog"),
  results: byHash("#results"),
  privacy: byHash("#privacy"),
  studio: byHash("#studio"),
  talent: byHash("#talent"),
  inbox: byHash("#inbox"),
  notfound: byHash("#notfound"),
};

export function sectionBlocks(entry, index) {
  return entry.sections.find((section) => section.index === index).blocks;
}

// Prototype JS strings and routes that are not blocks of the extracted pages.
export const companyText = {
  pricingLadderAbout: "Pricing page", // prototype ladderHTML('Pricing page')
  trustTopic: ["Trust and data", "Not sure yet"], // prototype data-pref on "Ask for our DPA"
  invalidEmail: "Add a valid email.", // prototype waitlist validation
  aboutLinks: ["/careers", "/blog", "/studio"], // prototype #careers, #blog, #studio cards
  tableScroll: "Compare Download, Implement, Hire and Custom",
};

// Hidden prototype placeholder notes shown only inside a labelled disclosure (team-review rule).
export function placeholderNote(blocks, firstWordOfBody) {
  const note = blocks.find(({ tag, hidden }) => /^p\.note$/.test(tag) && hidden);
  if (!note) return null;
  const at = note.text.indexOf(` ${firstWordOfBody}`);
  return { label: note.text.slice(0, at), body: note.text.slice(at + 1) };
}

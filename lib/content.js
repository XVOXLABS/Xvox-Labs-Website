import { page as home } from "@/data/pages/home";

// Read-only helpers for the extracted homepage content (data/pages/home.js).
// Sections and blocks keep the prototype order; components pick blocks by tag, never retype text.

export function homeSection(index) {
  const section = home.sections.find((s) => s.index === index);
  if (!section) throw new Error(`Homepage section ${index} not found in data/pages/home.js`);
  return section.blocks;
}

// Blocks with this tag, in order (hidden blocks excluded unless asked for).
export function blocksByTag(blocks, tag, { includeHidden = false } = {}) {
  return blocks.filter((b) => b.tag === tag && (includeHidden || !b.hidden));
}

// The nth block with this tag (0-based); throws so missing content is caught at build time.
export function block(blocks, tag, n = 0) {
  const found = blocksByTag(blocks, tag)[n];
  if (!found) throw new Error(`Block "${tag}" #${n} not found`);
  return found;
}

// Text to display: approved replacement wording when one is recorded, otherwise the prototype text.
export function display(b) {
  return b.approvedText ?? b.text;
}

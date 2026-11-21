// Navigation model, composed from the prototype content in data/ (no copy is written here
// except where noted as verbatim prototype markup). Order follows data/navigation.js.
import { departments } from "@/data/departments";
import { footer, header, mobileMenu, servicesMenu, solutionsMenu } from "@/data/navigation";
import { servicePillars, services } from "@/data/services";
import { solutions } from "@/data/solutions";

const bySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));
const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));
const clean = (b) => b.display ?? b.text;
const visible = (blocks) => blocks.filter((b) => !b.hidden);

// The self-check item in the Services menu is <b>title</b><span>description</span> in the
// prototype markup (megaSvc); data/ stores the combined text, so it is split here.
const SELF_CHECK = { title: "Free self-check", description: "Ten questions, instant score" };

function linkOf(block) {
  return { label: clean(block), href: block.href, ...(block.pending ? { pending: block.pending } : {}) };
}

export function getHeaderNav() {
  const nl = header.filter((b) => b.tag.startsWith("a.nl") || b.tag.startsWith("button.nl"));
  const links = nl.map((b) => {
    const label = b.text.replace(/\s*▾$/, "");
    const menu = label === "Solutions" ? "solutions" : label === "Services" ? "services" : null;
    return { label, href: b.href ?? (menu ? `/${menu}` : undefined), menu };
  });
  const cart = header.find((b) => b.tag.startsWith("button.cartbtn"));
  const plan = header.find((b) => b.tag === "button.btn");
  const book = header.find((b) => b.tag === "a.btn");
  return {
    links,
    cartLabel: cart.text.replace(/\s*\d+$/, ""),
    plan: { label: plan.text, href: "#vox" },
    book: { label: book.text, href: book.href },
  };
}

export function getSolutionsMenu() {
  const columns = [];
  for (const b of solutionsMenu) {
    if (b.tag === "a.mg-h") {
      const dept = departments.find((d) => b.href.endsWith(`/${d.id}`));
      columns.push({ heading: b.text, href: b.href, color: dept?.color, items: [] });
    } else if (b.href && b.href.startsWith("/solutions/") && columns.length && !b.text.endsWith("→")) {
      const s = bySlug[b.href.split("/").pop()];
      columns[columns.length - 1].items.push({ title: s.title, description: s.description, href: b.href });
    }
  }
  const ask = solutionsMenu.find((b) => b.tag === "button.linkbtn");
  const all = solutionsMenu.find((b) => b.text.endsWith("→") && b.href === "/solutions");
  return { columns, footer: [{ label: ask.text, href: "#vox", dot: true }, { label: all.text, href: all.href }] };
}

export function getServicesMenu() {
  const columns = [];
  for (const b of servicesMenu) {
    if (b.tag === "a.mg-h") {
      const pillar = servicePillars.find((p) => b.href.endsWith(`/${p.id}`));
      columns.push({ heading: pillar.name, href: b.href, color: pillar.color, items: [] });
    } else if (b.href === "/safe-ai/self-check") {
      columns[columns.length - 1].items.push({ ...SELF_CHECK, href: b.href });
    } else if (b.href && b.href.split("/").length === 4 && b.href.startsWith("/services/")) {
      const s = serviceById[b.href.split("/").pop()];
      columns[columns.length - 1].items.push({ title: s.title, href: b.href });
    }
  }
  const studio = servicesMenu.find((b) => b.href === "/studio");
  const all = servicesMenu.find((b) => b.href === "/services");
  return { columns, footer: [linkOf(studio), linkOf(all)] };
}

export function getMobileMenu() {
  const groups = [];
  for (const b of mobileMenu) {
    if (b.tag === "h5") groups.push({ heading: b.text, links: [] });
    else if (b.href) groups[groups.length - 1].links.push(linkOf(b));
  }
  return groups;
}

export function getFooter() {
  const blocks = visible(footer);
  const columns = [];
  let intro = null;
  const actions = [];
  let copyright = null;
  for (const b of blocks) {
    if (b.tag === "p.muted") intro = b.text;
    else if (b.tag === "button.btn") actions.push({ label: b.text.replace(/\s*→$/, ""), href: "#vox", arrow: true });
    else if (b.tag === "a.btn") actions.push({ label: b.text, href: b.href });
    else if (b.tag === "h5") columns.push({ heading: b.text, links: [] });
    else if (b.tag === "a" && columns.length) columns[columns.length - 1].links.push(linkOf(b));
    else if (b.tag === "span" && b.display) copyright = b.display;
  }
  return { intro, actions, columns, copyright };
}

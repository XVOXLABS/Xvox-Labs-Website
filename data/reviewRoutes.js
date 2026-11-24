import { agents } from "./agents.js";
import { departments } from "./departments.js";
import { items } from "./marketplace.js";
import { servicePillars, services as serviceRecords } from "./services.js";
import { bundles, solutions as solutionRecords } from "./solutions.js";
import { page as home } from "./pages/home.js";
import { page as howItWorks } from "./pages/how-it-works.js";
import { page as build } from "./pages/build.js";
import { page as solutions } from "./pages/solutions.js";
import { page as services } from "./pages/services.js";
import { page as selfCheck } from "./pages/self-check.js";
import { page as marketplace } from "./pages/marketplace.js";
import { page as checkout } from "./pages/checkout.js";
import { page as pricing } from "./pages/pricing.js";
import { page as book } from "./pages/book.js";
import { page as trust } from "./pages/trust.js";
import { page as about } from "./pages/about.js";
import { page as careers } from "./pages/careers.js";
import { page as blog } from "./pages/blog.js";
import { page as results } from "./pages/results.js";
import { page as privacy } from "./pages/privacy.js";
import { page as studio } from "./pages/studio.js";
import { page as talent } from "./pages/talent.js";
import { page as inbox } from "./pages/inbox.js";
import { page as notFound } from "./pages/not-found.js";
import { template as departmentTemplate, computedText as departmentText } from "./pages/department.js";
import { template as solutionTemplate, computedText as solutionText } from "./pages/solution.js";
import { template as servicePillarTemplate, computedText as servicePillarText } from "./pages/service-pillar.js";
import { template as serviceTemplate, computedText as serviceText } from "./pages/service.js";
import { template as agentTemplate, computedText as agentText } from "./pages/agent.js";
import { template as marketplaceItemTemplate, computedText as marketplaceItemText } from "./pages/marketplace-item.js";

// The approved App Router paths are distinct from the prototype's hash IDs.
function standalone(page, source) {
  return {
    kind: "standalone",
    hash: page.prototypeRoute,
    href: page.route,
    title: page.sections.flatMap(({ blocks }) => blocks).find(({ tag }) => /^h1(?:[.#]|$)/.test(tag)).text,
    source: `data/pages/${source}.js`,
    sections: page.sections,
  };
}

function detail(hash, href, title, parentHref, source, template, textByHash, record) {
  return {
    kind: "detail",
    hash,
    href,
    title,
    parentHref,
    source: `data/pages/${source}.js`,
    sections: template.sections,
    computedText: textByHash[hash.slice(1)],
    record,
  };
}

const departmentHrefs = new Map(departments.map(({ id }) => [id, `/solutions/${id}`]));
const solutionParents = new Map([["design", "/services/design"], ["rai", "/services/safe"]]);

export const reviewGroups = [
  {
    id: "overview",
    title: "Overview",
    entries: [standalone(home, "home"), standalone(howItWorks, "how-it-works"), standalone(build, "build")],
  },
  {
    id: "solutions",
    title: "Solutions and departments",
    entries: [
      standalone(solutions, "solutions"),
      ...departments.map((record) => detail(
        `#dept-${record.id}`, departmentHrefs.get(record.id), record.name, "/solutions",
        "department", departmentTemplate, departmentText, record,
      )),
      ...[...solutionRecords, ...bundles].map((record) => detail(
        `#solution-${record.slug}`, `/solutions/${record.slug}`, record.title,
        departmentHrefs.get(record.category) ?? solutionParents.get(record.category) ?? "/solutions",
        "solution", solutionTemplate, solutionText, record,
      )),
    ],
  },
  {
    id: "services",
    title: "Services and Safe AI",
    entries: [
      standalone(services, "services"),
      ...servicePillars.flatMap((pillar) => {
        const href = `/services/${pillar.id}`;
        return [
          detail(`#svc-${pillar.id}`, href, pillar.name, "/services", "service-pillar", servicePillarTemplate, servicePillarText, pillar),
          ...serviceRecords.filter((record) => record.pillar === pillar.id).map((record) => detail(
            `#service-${record.id}`, `${href}/${record.id}`, record.title, href,
            "service", serviceTemplate, serviceText, record,
          )),
        ];
      }),
      standalone(selfCheck, "self-check"),
    ],
  },
  {
    id: "agents",
    title: "Agent profiles",
    entries: agents.map((record) => detail(
      `#agent-${record.id}`, `/how-it-works/agents/${record.id}`, record.name, "/how-it-works",
      "agent", agentTemplate, agentText, record,
    )),
  },
  {
    id: "marketplace",
    title: "Marketplace and checkout",
    entries: [
      standalone(marketplace, "marketplace"),
      ...items.map((record) => detail(
        `#item-${record.id}`, `/marketplace/${record.id}`, record.name, "/marketplace",
        "marketplace-item", marketplaceItemTemplate, marketplaceItemText, record,
      )),
      standalone(checkout, "checkout"),
    ],
  },
  {
    id: "company",
    title: "Company, pricing and contact",
    entries: [
      standalone(pricing, "pricing"),
      standalone(book, "book"),
      standalone(trust, "trust"),
      standalone(about, "about"),
      standalone(careers, "careers"),
      standalone(blog, "blog"),
      standalone(results, "results"),
      standalone(privacy, "privacy"),
      standalone(studio, "studio"),
      standalone(talent, "talent"),
      standalone(inbox, "inbox"),
      standalone(notFound, "not-found"),
    ],
  },
];

export const prototypeRoutes = reviewGroups.flatMap(({ entries }) => entries);

export const prototypeAliases = {
  "#agents": "#how",
  "#marketplace": "#market",
  "#design": "#svc-design",
  "#responsible-ai": "#svc-safe",
};

export const prototypeActions = {
  "#guide": { type: "vox", href: "#vox" },
  "#hire": { type: "hire", withinPage: "#hire-sec", href: "/pricing#hire", reviewTarget: "#pricing" },
};

// Phase 2.5 company and conversion pages.
const companyPaths = ["/pricing", "/book", "/trust", "/about", "/careers", "/blog", "/results", "/privacy", "/studio", "/talent", "/inbox", "/notfound"];

// Add paths here when their native pages are implemented.
export const implementedPrototypePaths = prototypeRoutes.filter(({ href }) =>
  href === "/" || href === "/solutions" || href.startsWith("/solutions/") || href === "/services" || href.startsWith("/services/") ||
  href === "/how-it-works" || href.startsWith("/how-it-works/agents/") || href === "/marketplace" || href.startsWith("/marketplace/") ||
  companyPaths.includes(href),
).map(({ href }) => href);

export function reviewAnchor(hash) {
  return `review-${hash.slice(1)}`;
}

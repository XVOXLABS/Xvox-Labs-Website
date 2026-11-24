import { items } from "./marketplace.js";
import { prototypeRoutes } from "./reviewRoutes.js";
import { servicePillars } from "./services.js";
import { solutionInfo, solutionsBySlug } from "./solutionsPages.js";

export const servicesHub = prototypeRoutes.find(({ hash }) => hash === "#services");
export const serviceAreas = prototypeRoutes.filter(({ hash }) => hash.startsWith("#svc-"));
export const serviceDetails = prototypeRoutes.filter(({ hash }) => hash.startsWith("#service-"));
export const serviceAreaById = new Map(serviceAreas.map((entry) => [entry.record.id, entry]));
const detailsByHref = new Map(serviceDetails.map((entry) => [entry.href, entry]));

export function serviceDetail(area, id) {
  return detailsByHref.get(`/services/${area}/${id}`);
}

export function servicesForArea(area) {
  return serviceAreaById.get(area).record.serviceIds.map((id) => serviceDetail(area, id));
}

export function serviceRelated(entry) {
  const { solutions } = entry.record;
  return {
    solutions: solutions.map((slug) => solutionsBySlug.get(slug)).filter(Boolean).map(solutionInfo),
    items: items.filter((item) => item.solutions.some((slug) => solutions.includes(slug))).slice(0, 4),
    services: servicesForArea(entry.record.pillar).filter(({ hash }) => hash !== entry.hash).slice(0, 4),
  };
}

export const servicesText = {
  areaCard: "Service",
  explore: "Explore {name}",
  more: "+{count} more",
  sisterCompany: "Sister company",
  timeline: "Timeline",
  bookPath: "Not sure yet",
  priceNote: "Fixed after a 30-minute call.",
  draftPriceTitle: "Set by the team before launch",
  related: "Related solutions",
  relatedTitle: "Pair it with automation.",
  marketplace: "In the marketplace",
  marketplaceTitle: "Ready-made pieces.",
  sampleCatalogue: "Sample catalogue",
  moreIn: "More in {name}",
  otherServices: "Other services.",
  liveIn: "Live in {timeline}",
  packagedAutomation: {
    title: "Packaged automation",
    summary: "Ready solutions by department, staffed by agents.",
    timeline: "2–6 weeks",
    href: "/solutions",
  },
};

// The report, package paths and FAQ are the structured version of safeReview() in prototype v5.
// The review manifest keeps the original flat extraction as well.
export const safeReview = {
  serviceName: "Safe AI Review",
  selfCheckHref: "/safe-ai/self-check",
  initialPath: "Full Review",
  builders: ["Lovable", "Bolt", "Cursor", "n8n", "Custom GPTs", "Claude projects", "Your own code"],
  packages: [
    { name: "Free self-check", text: "Ten questions, instant score.", price: "Free", cta: "Start now →" },
    { name: "Quick Scan", text: "Automated checks plus an expert pass. 3–5 days.", path: "Quick Scan", cta: "Book a Quick Scan →" },
    { name: "Full Review", text: "Hands-on testing, report and walkthrough call. 1–2 weeks.", path: "Full Review", cta: "Book a Full Review →", highlight: true },
    { name: "Fix Sprint", text: "We fix what the review found.", path: "Fix Sprint", cta: "Book a Fix Sprint →" },
    { name: "Ongoing", text: "A review before each major release.", path: "Ongoing reviews", cta: "Talk to us →", draftUnit: "/ month" },
  ],
  report: {
    verdict: "Ship with fixes",
    scores: [62, 74, 81, 58, 70],
    findings: [
      { severity: "High", text: "API key visible in the browser bundle" },
      { severity: "High", text: "Users can read other users’ chat history" },
      { severity: "Medium", text: "No spending limit on model calls" },
      { severity: "Medium", text: "No message telling users they are talking to AI" },
      { severity: "Low", text: "Error states give no next step" },
    ],
  },
  faq: [
    { question: "How long does it take?", answer: "A Quick Scan takes 3 to 5 days. A Full Review takes 1 to 2 weeks." },
    { question: "What do you need from us?", answer: "Access to a test environment, a short walkthrough, and the code or workflow export if you have one." },
    { question: "Do you fix the issues?", answer: "If you want. The Fix Sprint is a separate step, priced from the report." },
    { question: "Is this a certification?", answer: "No. It is an expert review of what we tested, at the time we tested it." },
  ],
};

export const areasInOrder = servicePillars.map(({ id }) => serviceAreaById.get(id));

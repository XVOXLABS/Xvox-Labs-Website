// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// Decision (Nov 21, 2026): $1,500 (blueprint) and "Free" are published; every other price is internal only.

export const pricingDisplay = {
  "rule": "Only published prices are shown. Placeholder or unset prices show the label and CTA below. Original values stay in data for internal reference.",
  "placeholderLabel": "Contact Us to Discuss Pricing",
  "placeholderCta": {
    "label": "Discuss Pricing",
    "href": "/book"
  },
  "consultationCta": {
    "label": "Book a call",
    "href": "/book"
  },
  "prototypePriceToSetLabel": "Price to set"
};

export const ladder = [
  {
    "title": "Free AI plan",
    "text": "Vox maps your problem in about two minutes.",
    "price": "Free",
    "priceStatus": "published",
    "cta": "Get your AI plan",
    "action": "ask",
    "highlight": false
  },
  {
    "title": "Paid audit",
    "text": "A week mapping your process, tools and approvals. Credited to the build.",
    "price": null,
    "priceStatus": "to-set",
    "cta": "Book an audit",
    "action": "book",
    "highlight": false
  },
  {
    "title": "Download",
    "text": "Take the blueprint. You run it.",
    "price": "$1,500",
    "priceStatus": "published",
    "cta": "Browse blueprints",
    "action": "market",
    "highlight": false
  },
  {
    "title": "Implement",
    "text": "We build it inside your tools or cloud.",
    "price": null,
    "priceStatus": "to-set",
    "cta": "Book a call",
    "action": "book",
    "highlight": true
  },
  {
    "title": "Hire",
    "text": "We host, run and maintain it for you.",
    "price": null,
    "priceStatus": "to-set",
    "cta": "Book a call",
    "action": "book",
    "highlight": false
  },
  {
    "title": "Custom",
    "text": "More agents, your rules, built around you.",
    "price": null,
    "priceStatus": "to-set",
    "cta": "Book a call",
    "action": "book",
    "highlight": false
  }
];

export const waysToBuy = [
  {
    "name": "Download",
    "summary": "Take the blueprint. You run it.",
    "price": "$1,500",
    "priceStatus": "published",
    "note": " one-time",
    "cta": "Buy the blueprint",
    "action": "buy",
    "highlight": false,
    "listHeading": "What is included:",
    "includes": [
      "System design and setup guide",
      "n8n, Zapier, Claude and OpenAI packs",
      "Vibe-coding pack for custom screens",
      "Yours to keep, no subscription"
    ]
  },
  {
    "name": "Implement",
    "summary": "We build it inside your tools or cloud.",
    "price": null,
    "priceStatus": "to-set",
    "cta": "Book a call",
    "highlight": true,
    "listHeading": "Everything in Download, plus:",
    "includes": [
      "Set up in your own systems",
      "Runs in your environment",
      "Team training and handover",
      "Fully yours once live"
    ]
  },
  {
    "name": "Hire",
    "summary": "We host, run and maintain it for you.",
    "price": null,
    "priceStatus": "to-set",
    "cta": "Book a call",
    "highlight": false,
    "listHeading": "Everything in Download, plus:",
    "includes": [
      "Runs in our managed setup",
      "Monitoring and fixes included",
      "Monthly report on what it did",
      "Move to Implement any time"
    ]
  },
  {
    "name": "Custom",
    "summary": "More agents, your rules, built around you.",
    "price": null,
    "priceStatus": "to-set",
    "cta": "Book a call",
    "highlight": false,
    "listHeading": "Everything in Implement, plus:",
    "includes": [
      "Different tools, steps and rules",
      "More agents where you need them",
      "Hosted by us or in your systems",
      "Safe AI review built in"
    ]
  }
];

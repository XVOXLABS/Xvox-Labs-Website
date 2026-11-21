// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).

export const askVox = {
  "label": "Ask Vox",
  "ariaLabel": "Open the Vox assistant",
  "nudge": "Not sure where to start? I can map it out in two minutes.",
  "nudgeAfterScrollY": 900,
  "nudgeDurationMs": 7000
};

export const cartFilled = {
  "remove": "Remove",
  "upsellTitle": "Need it installed?",
  "upsellText": "We can set any of these up in your tools.",
  "upsellLink": {
    "label": "Book a call",
    "href": "/book",
    "prototypeHref": "#book"
  },
  "oneTime": "One-time",
  "monthly": "Monthly",
  "perMonth": "/ month",
  "checkout": {
    "label": "Checkout →",
    "href": "/checkout",
    "prototypeHref": "#checkout"
  },
  "toastAdded": "Added: ",
  "toastDefault": "Added to cart",
  "toastViewCart": "View cart"
};

export const site = {
  "name": "Xvox Labs",
  "logoText": "xvox labs",
  "logoMark": "X"
};

export const pending = {
  "xvoxStudioUrl": "Not available yet. Do not invent one; Studio links stay on the internal /studio page.",
  "legalPages": [
    {
      "name": "Terms of Service",
      "status": "pending: no approved legal content"
    },
    {
      "name": "Cookie Policy",
      "status": "pending: no approved legal content"
    },
    {
      "name": "Marketplace Terms",
      "status": "pending: no approved legal content"
    }
  ],
  "legalRule": "Do not publish placeholder legal text or invent legal terms."
};

export const cartDrawer = [
  {
    "tag": "b",
    "text": "Your cart"
  },
  {
    "tag": "button",
    "text": "✕"
  },
  {
    "tag": "div.empty",
    "text": "Your cart is empty. Browse the marketplace"
  },
  {
    "tag": "a.btn",
    "text": "Browse the marketplace",
    "href": "/marketplace",
    "prototypeHref": "#market"
  },
  {
    "tag": "p.note",
    "text": "Want something built for you instead? Book a call"
  },
  {
    "tag": "a",
    "text": "Book a call",
    "href": "/book",
    "prototypeHref": "#book"
  }
];

export const voxChat = [
  {
    "tag": "b",
    "text": "Vox"
  },
  {
    "tag": "span",
    "text": "AI agent · Xvox Labs"
  },
  {
    "tag": "button",
    "text": "↺"
  },
  {
    "tag": "button",
    "text": "✕"
  },
  {
    "tag": "span",
    "text": "Chat"
  },
  {
    "tag": "span",
    "text": "Plan"
  },
  {
    "tag": "span",
    "text": "Details"
  },
  {
    "tag": "span",
    "text": "Time"
  },
  {
    "tag": "label",
    "text": "Message Vox"
  },
  {
    "tag": "button",
    "text": "Send"
  },
  {
    "tag": "textarea[placeholder]",
    "text": "Type your answer…"
  }
];

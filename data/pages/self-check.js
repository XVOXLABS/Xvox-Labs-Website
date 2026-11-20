// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// Every text block of this page in order. fromData = the same text also lives in a data/ list.
// hidden + reason "placeholder" = not shown publicly (decision Nov 21, 2026); text kept for reference.

export const page = {
  "prototypeRoute": "#selfcheck",
  "route": "/safe-ai/self-check",
  "sections": [
    {
      "index": 0,
      "blocks": [
        {
          "tag": "a",
          "text": "Services",
          "href": "/services",
          "prototypeHref": "#services"
        },
        {
          "tag": "span",
          "text": "/"
        },
        {
          "tag": "a",
          "text": "Safe AI",
          "href": "/services/safe",
          "prototypeHref": "#svc-safe",
          "fromData": true
        },
        {
          "tag": "span",
          "text": "/"
        },
        {
          "tag": "b",
          "text": "Self-check"
        },
        {
          "tag": "span.eyebrow",
          "text": "Safe AI self-check"
        },
        {
          "tag": "h1",
          "text": "Ten questions. An honest score."
        },
        {
          "tag": "p.lead",
          "text": "For anyone who has built an agent, an automation or a vibe-coded app. Free, about two minutes, nothing stored unless you ask."
        }
      ]
    },
    {
      "index": 1,
      "blocks": [
        {
          "tag": "span",
          "text": "Question 1 of 10 · Security"
        },
        {
          "tag": "h3",
          "text": "Are all API keys and secrets kept out of the code and the browser?",
          "fromData": true
        },
        {
          "tag": "button.btn",
          "text": "Yes"
        },
        {
          "tag": "button.btn",
          "text": "Not sure",
          "fromData": true
        },
        {
          "tag": "button.btn",
          "text": "No"
        }
      ]
    }
  ]
};

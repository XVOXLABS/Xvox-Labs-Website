// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// template: text identical on every page of this type.
// computedText: per-page text built by the prototype from data (e.g. counts, names in sentences);
// kept verbatim so templates can be rebuilt and checked against it.

export const template = {
  "prototypeRoutes": [
    "#svc-design",
    "#svc-ai",
    "#svc-brand",
    "#svc-safe"
  ],
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
          "tag": "a.btn",
          "text": "Book a call ↗",
          "href": "/book",
          "prototypeHref": "#book"
        }
      ]
    },
    {
      "index": 2,
      "blocks": [
        {
          "tag": "span.eyebrow",
          "text": "How we work"
        },
        {
          "tag": "h2.big",
          "text": "Four steps, every project."
        },
        {
          "tag": "b",
          "text": "1"
        },
        {
          "tag": "strong",
          "text": "Call"
        },
        {
          "tag": "span",
          "text": "Call 30 minutes on your goals, users and constraints."
        },
        {
          "tag": "b",
          "text": "2"
        },
        {
          "tag": "strong",
          "text": "Scope"
        },
        {
          "tag": "span",
          "text": "Scope A fixed scope, timeline and price within two days."
        },
        {
          "tag": "b",
          "text": "3"
        },
        {
          "tag": "strong",
          "text": "Make"
        },
        {
          "tag": "span",
          "text": "Make Weekly reviews. You see work in progress, not just the end."
        },
        {
          "tag": "b",
          "text": "4"
        },
        {
          "tag": "strong",
          "text": "Hand over"
        },
        {
          "tag": "span",
          "text": "Hand over Files, documentation and training. You own it."
        }
      ]
    },
    {
      "index": 3,
      "blocks": [
        {
          "tag": "a.chip",
          "text": "Xvox Studio ↗",
          "href": "/studio",
          "prototypeHref": "#studio",
          "pending": "external Xvox Studio URL not available yet: link stays on the internal /studio page"
        }
      ]
    },
    {
      "index": 4,
      "blocks": [
        {
          "tag": "h2",
          "text": "Start with a two-minute plan."
        },
        {
          "tag": "p.lead",
          "text": "Tell Vox what is slowing you down. You get a plan, and a person from our team follows up within a day."
        },
        {
          "tag": "button.btn",
          "text": "Get your AI plan →"
        },
        {
          "tag": "a.btn",
          "text": "Book a call ↗",
          "href": "/book",
          "prototypeHref": "#book"
        }
      ]
    }
  ]
};

export const computedText = {
  "svc-design": [
    "Human-led projects with clear scope. Agents help where they save time; people lead.",
    "Ask Vox →",
    "AI-driven UX research Interviews, surveys and analytics, synthesised fast with AI and checked by researchers. Timeline 2–4 weeks ›",
    "UX, performance and accessibility audit A ranked list of what blocks your users, with the fix for each. Timeline 1–2 weeks ›",
    "Product and UX design Flows and screens designed around the tasks people come to do. Timeline 4–8 weeks ›",
    "UI and visual design Interfaces that look finished and stay consistent. Timeline 3–6 weeks ›",
    "Website design and build Sites structured around what visitors need, set up for search and AI answers. Timeline 4–8 weeks ›",
    "Design systems and DesignOps Tokens, components and the workflow that keeps them used. Timeline 4–10 weeks ›",
    "Nano tools and MVPs Small tools built around one problem, shipped fast. Some are already in the marketplace. Timeline 2–6 weeks ›",
    "White-label support for agencies Design and AI capacity under your agency’s name. Timeline Ongoing ›",
    "AI Automation →",
    "Brand & Marketing →",
    "Safe AI →"
  ],
  "svc-ai": [
    "Human-led projects with clear scope. For ready-made automation, see Solutions.",
    "Solutions",
    "Ask Vox →",
    "Custom agents and workflows Agents built around your process, your tools and your approval rules. Timeline 4–8 weeks ›",
    "AI workspace setup Claude, ChatGPT, Grok or Muse set up properly for your team: projects, skills, connectors and permissions. Timeline 1–3 weeks ›",
    "Multi-tool AI orchestration Make the AI tools you already pay for work together, end to end. Timeline 3–6 weeks ›",
    "Team enablement and training Hands-on sessions so your team uses AI well, and safely. Timeline 1–2 weeks ›",
    "Packaged automation",
    "Packaged automation Ready solutions by department, staffed by agents. Timeline 2–6 weeks ›",
    "Design & Product →",
    "Brand & Marketing →",
    "Safe AI →"
  ],
  "svc-brand": [
    "Human-led projects with clear scope. Agents help where they save time; people lead.",
    "Ask Vox →",
    "SEO and AEO Get found on Google and quoted in AI answers from ChatGPT, Perplexity, Gemini and Claude. Timeline 4–6 weeks, then monthly ›",
    "Brand identity Positioning, logo, colour and type that hold together. Timeline 4–6 weeks ›",
    "Brand assets and guidelines Templates and rules so every teammate and every agent stays on brand. Timeline 2–4 weeks ›",
    "Launch asset kits Everything a product launch needs, designed as one set. Timeline 2–3 weeks ›",
    "Social media creatives On-brand posts and carousels on a steady rhythm. Timeline Monthly ›",
    "Content systems A content engine your team runs, with Quill and Scout doing the heavy lifting. Timeline 3–4 weeks ›",
    "Design & Product →",
    "AI Automation →",
    "Safe AI →"
  ],
  "svc-safe": [
    "Human-led projects with clear scope. Start with the free self-check if you are not sure.",
    "Free self-check ↗",
    "Safe AI Review Is your AI ready to ship? We check it and give a clear verdict. Timeline 3 days to 2 weeks ›",
    "AI usage policy and guardrails Clear rules for how your team and your agents use AI. Timeline 1–2 weeks ›",
    "Release-by-release reviews A Safe AI check before every major release. Timeline Monthly ›",
    "Design & Product →",
    "AI Automation →",
    "Brand & Marketing →"
  ]
};

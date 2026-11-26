// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// Approved change (owner, Nov 26, 2026; CLAUDE.md REF-8): the prototype's service "timeline" values were
// removed because the durations are not verified.
// Approved change (owner, Nov 26, 2026; CLAUDE.md REF-9): unverified delivery durations, speed claims, result
// figures and agent quotes are removed or reworded. Records that held only such text are empty strings.

export const servicePillars = [
  {
    "id": "design",
    "name": "Design & Product",
    "color": "#3D6BFF",
    "tint": "p4",
    "agent": "beacon",
    "line": "Research, UX, UI, websites, design systems and small tools people can actually use.",
    "serviceIds": [
      "ux-research",
      "ux-audit",
      "product-design",
      "ui-design",
      "web",
      "design-system",
      "nano-tools",
      "white-label"
    ]
  },
  {
    "id": "ai",
    "name": "AI Automation",
    "color": "#3DDBA4",
    "tint": "p3",
    "agent": "relay",
    "line": "Custom agents, AI workspace setup and orchestration across the AI tools you already pay for.",
    "serviceIds": [
      "custom-agents",
      "ai-setup",
      "orchestration",
      "training"
    ]
  },
  {
    "id": "brand",
    "name": "Brand & Marketing",
    "color": "#FF6B4A",
    "tint": "p2",
    "agent": "quill",
    "line": "SEO and AEO, identity, launch assets and social creatives that stay on brand everywhere.",
    "serviceIds": [
      "seo-aeo",
      "brand-identity",
      "brand-assets",
      "launch-kit",
      "social-creatives",
      "content-systems"
    ]
  },
  {
    "id": "safe",
    "name": "Safe AI",
    "color": "#111",
    "tint": "p1",
    "agent": "sage",
    "line": "Independent reviews of AI agents and vibe-coded apps, and the guardrails to keep them safe.",
    "serviceIds": [
      "safe-review",
      "ai-policy",
      "release-reviews"
    ]
  }
];

export const services = [
  {
    "id": "ux-research",
    "pillar": "design",
    "title": "AI-driven UX research",
    "summary": "Interviews, surveys and analytics, synthesised with AI and checked by researchers.",
    "deliverables": [
      "Research plan and recruiting",
      "Interview and survey synthesis",
      "Personas and journey maps"
    ],
    "solutions": []
  },
  {
    "id": "ux-audit",
    "pillar": "design",
    "title": "UX, performance and accessibility audit",
    "summary": "A ranked list of what blocks your users, with the fix for each.",
    "deliverables": [
      "Heuristic and accessibility review",
      "Speed and Core Web Vitals check",
      "Prioritised fix list"
    ],
    "solutions": [
      "confusing-site"
    ]
  },
  {
    "id": "product-design",
    "pillar": "design",
    "title": "Product and UX design",
    "summary": "Flows and screens designed around the tasks people come to do.",
    "deliverables": [
      "User flows",
      "Wireframes and prototypes",
      "Usability testing"
    ],
    "solutions": []
  },
  {
    "id": "ui-design",
    "pillar": "design",
    "title": "UI and visual design",
    "summary": "Interfaces that look finished and stay consistent.",
    "deliverables": [
      "Visual direction",
      "High-fidelity screens",
      "Component specs"
    ],
    "solutions": []
  },
  {
    "id": "web",
    "pillar": "design",
    "title": "Website design and build",
    "summary": "Sites structured around what visitors need, set up for search and AI answers.",
    "deliverables": [
      "Sitemap and content plan",
      "Design and build in Framer, Webflow or code",
      "SEO and AEO setup"
    ],
    "solutions": [
      "confusing-site"
    ]
  },
  {
    "id": "design-system",
    "pillar": "design",
    "title": "Design systems and DesignOps",
    "summary": "Tokens, components and the workflow that keeps them used.",
    "deliverables": [
      "Tokens and component library",
      "Documentation",
      "DesignOps workflow"
    ],
    "solutions": [
      "inconsistent-brand",
      "design-intake"
    ]
  },
  {
    "id": "nano-tools",
    "pillar": "design",
    "title": "Nano tools and MVPs",
    "summary": "Small tools built around one problem. Some are already in the marketplace.",
    "deliverables": [
      "Problem framing",
      "A working tool",
      "Handover or hosting"
    ],
    "solutions": []
  },
  {
    "id": "white-label",
    "pillar": "design",
    "title": "White-label support for agencies",
    "summary": "Design and AI capacity under your agency’s name.",
    "deliverables": [
      "Dedicated designers",
      "Your process and brand",
      "Flexible monthly capacity"
    ],
    "solutions": []
  },
  {
    "id": "custom-agents",
    "pillar": "ai",
    "title": "Custom agents and workflows",
    "summary": "Agents built around your process, your tools and your approval rules.",
    "deliverables": [
      "Process mapping",
      "Agent and workflow build",
      "Human checkpoints and Sage checks"
    ],
    "solutions": [
      "admin-overload"
    ]
  },
  {
    "id": "ai-setup",
    "pillar": "ai",
    "title": "AI workspace setup",
    "summary": "Claude, ChatGPT, Grok or Muse set up properly for your team: projects, skills, connectors and permissions.",
    "deliverables": [
      "Workspace and permissions",
      "Skills and custom instructions",
      "Connectors to your tools"
    ],
    "solutions": []
  },
  {
    "id": "orchestration",
    "pillar": "ai",
    "title": "Multi-tool AI orchestration",
    "summary": "Make the AI tools you already pay for work together, end to end.",
    "deliverables": [
      "Tool audit",
      "Orchestration design",
      "Build, test and hand over"
    ],
    "solutions": [
      "tools-dont-talk"
    ]
  },
  {
    "id": "training",
    "pillar": "ai",
    "title": "Team enablement and training",
    "summary": "Hands-on sessions so your team uses AI well, and safely.",
    "deliverables": [
      "Role-based workshops",
      "Prompt and skill libraries",
      "Usage policy walkthrough"
    ],
    "solutions": []
  },
  {
    "id": "seo-aeo",
    "pillar": "brand",
    "title": "SEO and AEO",
    "summary": "Get found on Google and quoted in AI answers from ChatGPT, Perplexity, Gemini and Claude.",
    "deliverables": [
      "Technical SEO audit and fixes",
      "Answer-ready pages and structured data",
      "Monthly search and AI citation tracking"
    ],
    "solutions": [
      "found-online"
    ]
  },
  {
    "id": "brand-identity",
    "pillar": "brand",
    "title": "Brand identity",
    "summary": "Positioning, logo, colour and type that hold together.",
    "deliverables": [
      "Brand strategy",
      "Identity system",
      "Brand guidelines"
    ],
    "solutions": [
      "inconsistent-brand"
    ]
  },
  {
    "id": "brand-assets",
    "pillar": "brand",
    "title": "Brand assets and guidelines",
    "summary": "Templates and rules so every teammate and every agent stays on brand.",
    "deliverables": [
      "Template library",
      "Voice and tone guide",
      "Organised asset library"
    ],
    "solutions": [
      "inconsistent-brand"
    ]
  },
  {
    "id": "launch-kit",
    "pillar": "brand",
    "title": "Launch asset kits",
    "summary": "Everything a product launch needs, designed as one set.",
    "deliverables": [
      "Launch visuals",
      "Landing page assets",
      "Email and ad creatives"
    ],
    "solutions": [
      "asset-variants"
    ]
  },
  {
    "id": "social-creatives",
    "pillar": "brand",
    "title": "Social media creatives",
    "summary": "On-brand posts and carousels on a steady rhythm.",
    "deliverables": [
      "Monthly creative set",
      "Templates for your team",
      "Approval workflow"
    ],
    "solutions": [
      "consistent-posting"
    ]
  },
  {
    "id": "content-systems",
    "pillar": "brand",
    "title": "Content systems",
    "summary": "A content engine your team runs, with Quill and Scout doing the heavy lifting.",
    "deliverables": [
      "Content strategy",
      "Calendar and workflow",
      "Agent setup"
    ],
    "solutions": [
      "consistent-posting",
      "found-online"
    ]
  },
  {
    "id": "safe-review",
    "pillar": "safe",
    "title": "Safe AI Review",
    "summary": "Is your AI ready to ship? We check it and give a clear verdict.",
    "deliverables": [
      "Verdict: ship, fix or don’t ship",
      "Scores across five areas",
      "Ranked findings and a fix plan"
    ],
    "solutions": [
      "is-it-safe",
      "review-my-agent"
    ]
  },
  {
    "id": "ai-policy",
    "pillar": "safe",
    "title": "AI usage policy and guardrails",
    "summary": "Clear rules for how your team and your agents use AI.",
    "deliverables": [
      "Policy document",
      "Staff one-pager",
      "Guardrail settings"
    ],
    "solutions": [
      "is-it-safe"
    ]
  },
  {
    "id": "release-reviews",
    "pillar": "safe",
    "title": "Release-by-release reviews",
    "summary": "A Safe AI check before every major release.",
    "deliverables": [
      "A review per release",
      "Regression checks",
      "Trend report"
    ],
    "solutions": [
      "review-my-agent"
    ]
  }
];

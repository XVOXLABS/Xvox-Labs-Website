// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// Approved change (owner, Nov 26, 2026; CLAUDE.md REF-9): unverified delivery durations, speed claims, result
// figures and agent quotes are removed or reworded. Records that held only such text are empty strings.

export const itemTypes = {
  "blueprint": {
    "name": "Blueprint",
    "glyph": "▦",
    "tint": "p1"
  },
  "skill": {
    "name": "Claude skill",
    "glyph": "✦",
    "tint": "p2"
  },
  "auto": {
    "name": "Automation pack",
    "glyph": "⇄",
    "tint": "p3"
  },
  "tool": {
    "name": "Micro tool",
    "glyph": "◧",
    "tint": "p4"
  },
  "tpl": {
    "name": "Template",
    "glyph": "▤",
    "tint": "p2"
  }
};

export const items = [
  {
    "id": "bp-consistent-posting",
    "type": "blueprint",
    "name": "Social media content blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "quill",
    "solutions": [
      "consistent-posting"
    ],
    "tools": [
      "Meta Business Suite",
      "Canva",
      "Google Drive"
    ],
    "description": "The complete system for social media content: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-found-online",
    "type": "blueprint",
    "name": "SEO and AI search visibility blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "beacon",
    "solutions": [
      "found-online"
    ],
    "tools": [
      "Google Search Console",
      "Google Analytics",
      "WordPress"
    ],
    "description": "The complete system for seo and ai search visibility: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-leads-go-cold",
    "type": "blueprint",
    "name": "Inbound lead response blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "scout",
    "solutions": [
      "leads-go-cold"
    ],
    "tools": [
      "Google Search",
      "Meta Ad Library",
      "LinkedIn"
    ],
    "description": "The complete system for inbound lead response: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-prospecting",
    "type": "blueprint",
    "name": "Lead research and outreach blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "scout",
    "solutions": [
      "prospecting"
    ],
    "tools": [
      "Google Search",
      "Meta Ad Library",
      "LinkedIn"
    ],
    "description": "The complete system for lead research and outreach: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-admin-overload",
    "type": "blueprint",
    "name": "Admin and data entry blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "relay",
    "solutions": [
      "admin-overload"
    ],
    "tools": [
      "Zoho CRM",
      "Gmail",
      "Calendly"
    ],
    "description": "The complete system for admin and data entry: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-tools-dont-talk",
    "type": "blueprint",
    "name": "Tool integrations blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "sage",
    "solutions": [
      "tools-dont-talk"
    ],
    "tools": [
      "Your agents",
      "Zoho One",
      "monday.com"
    ],
    "description": "The complete system for tool integrations: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-slow-replies",
    "type": "blueprint",
    "name": "AI chat and voice support blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "beacon",
    "solutions": [
      "slow-replies"
    ],
    "tools": [
      "Google Search Console",
      "Google Analytics",
      "WordPress"
    ],
    "description": "The complete system for ai chat and voice support: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-manual-onboarding",
    "type": "blueprint",
    "name": "Client onboarding blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "relay",
    "solutions": [
      "manual-onboarding"
    ],
    "tools": [
      "Zoho CRM",
      "Gmail",
      "Calendly"
    ],
    "description": "The complete system for client onboarding: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-confusing-site",
    "type": "blueprint",
    "name": "Website redesign blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "beacon",
    "solutions": [
      "confusing-site"
    ],
    "tools": [
      "Google Search Console",
      "Google Analytics",
      "WordPress"
    ],
    "description": "The complete system for website redesign: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-inconsistent-brand",
    "type": "blueprint",
    "name": "Brand consistency kit blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "quill",
    "solutions": [
      "inconsistent-brand"
    ],
    "tools": [
      "Meta Business Suite",
      "Canva",
      "Google Drive"
    ],
    "description": "The complete system for brand consistency kit: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-video-content",
    "type": "blueprint",
    "name": "Short-form video blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "reel",
    "solutions": [
      "video-content"
    ],
    "tools": [
      "CapCut",
      "Premiere Pro",
      "Descript"
    ],
    "description": "The complete system for short-form video: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-is-it-safe",
    "type": "blueprint",
    "name": "AI safety check blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "sage",
    "solutions": [
      "is-it-safe"
    ],
    "tools": [
      "Your agents",
      "Zoho One",
      "monday.com"
    ],
    "description": "The complete system for ai safety check: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-review-my-agent",
    "type": "blueprint",
    "name": "AI agent review blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "sage",
    "solutions": [
      "review-my-agent"
    ],
    "tools": [
      "Your agents",
      "Zoho One",
      "monday.com"
    ],
    "description": "The complete system for ai agent review: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-client-updates",
    "type": "blueprint",
    "name": "Client progress updates blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "quill",
    "solutions": [
      "client-updates"
    ],
    "tools": [
      "Meta Business Suite",
      "Canva",
      "Google Drive"
    ],
    "description": "The complete system for client progress updates: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-proposals",
    "type": "blueprint",
    "name": "Proposals and quotes blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "scout",
    "solutions": [
      "proposals"
    ],
    "tools": [
      "Google Search",
      "Meta Ad Library",
      "LinkedIn"
    ],
    "description": "The complete system for proposals and quotes: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-reporting",
    "type": "blueprint",
    "name": "Reporting and dashboards blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "scout",
    "solutions": [
      "reporting"
    ],
    "tools": [
      "Google Search",
      "Meta Ad Library",
      "LinkedIn"
    ],
    "description": "The complete system for reporting and dashboards: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-invoice-chase",
    "type": "blueprint",
    "name": "Invoice reminders blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "relay",
    "solutions": [
      "invoice-chase"
    ],
    "tools": [
      "Zoho CRM",
      "Gmail",
      "Calendly"
    ],
    "description": "The complete system for invoice reminders: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-call-assistant",
    "type": "blueprint",
    "name": "Automated phone calls blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "relay",
    "solutions": [
      "call-assistant"
    ],
    "tools": [
      "Zoho CRM",
      "Gmail",
      "Calendly"
    ],
    "description": "The complete system for automated phone calls: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-meeting-notes",
    "type": "blueprint",
    "name": "Meeting notes and follow-ups blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "quill",
    "solutions": [
      "meeting-notes"
    ],
    "tools": [
      "Meta Business Suite",
      "Canva",
      "Google Drive"
    ],
    "description": "The complete system for meeting notes and follow-ups: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-design-intake",
    "type": "blueprint",
    "name": "Design request intake blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "scout",
    "solutions": [
      "design-intake"
    ],
    "tools": [
      "Google Search",
      "Meta Ad Library",
      "LinkedIn"
    ],
    "description": "The complete system for design request intake: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-asset-variants",
    "type": "blueprint",
    "name": "Asset resizing and variants blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "reel",
    "solutions": [
      "asset-variants"
    ],
    "tools": [
      "CapCut",
      "Premiere Pro",
      "Descript"
    ],
    "description": "The complete system for asset resizing and variants: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "bp-design-qa",
    "type": "blueprint",
    "name": "Design QA and handoff blueprint",
    "price": 1500,
    "unit": "one-time",
    "priceStatus": "published",
    "agent": "beacon",
    "solutions": [
      "design-qa"
    ],
    "tools": [
      "Google Search Console",
      "Google Analytics",
      "WordPress"
    ],
    "description": "The complete system for design qa and handoff: agents, workflows, approval steps and setup packs.",
    "includes": [
      "System design and flow diagrams",
      "Step-by-step setup guide",
      "n8n and Zapier packs",
      "Claude skills and OpenAI prompts",
      "Vibe-coding pack for custom screens"
    ]
  },
  {
    "id": "sk-brand-voice",
    "type": "skill",
    "name": "Brand voice writer",
    "price": 79,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "quill",
    "solutions": [
      "consistent-posting",
      "inconsistent-brand"
    ],
    "tools": [
      "Claude"
    ],
    "description": "Teaches Claude your tone from five examples, then writes posts and emails that sound like you.",
    "includes": [
      "Claude skill file",
      "Voice worksheet",
      "10 example prompts"
    ]
  },
  {
    "id": "sk-competitor-brief",
    "type": "skill",
    "name": "Competitor weekly brief",
    "price": 49,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "scout",
    "solutions": [
      "prospecting",
      "consistent-posting"
    ],
    "tools": [
      "Claude",
      "Google Sheets"
    ],
    "description": "A one-page weekly brief on what competitors changed, with three things worth acting on.",
    "includes": [
      "Claude skill file",
      "Brief template",
      "Competitor tracking sheet"
    ]
  },
  {
    "id": "sk-aeo-audit",
    "type": "skill",
    "name": "AI answer visibility audit",
    "price": 99,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "beacon",
    "solutions": [
      "found-online",
      "confusing-site"
    ],
    "tools": [
      "Claude",
      "Google Search Console"
    ],
    "description": "Checks how your business shows up in AI assistant answers and drafts fixes.",
    "includes": [
      "Claude skill file",
      "Audit checklist",
      "Answer-section templates"
    ]
  },
  {
    "id": "sk-lead-qualifier",
    "type": "skill",
    "name": "Lead qualifier",
    "price": 69,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "relay",
    "solutions": [
      "leads-go-cold",
      "prospecting"
    ],
    "tools": [
      "Claude",
      "Zoho CRM"
    ],
    "description": "Scores new leads against your best clients and writes the first reply.",
    "includes": [
      "Claude skill file",
      "Scoring rubric",
      "Reply templates"
    ]
  },
  {
    "id": "sk-safety-checklist",
    "type": "skill",
    "name": "Agent safety checklist",
    "price": 59,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "sage",
    "solutions": [
      "is-it-safe",
      "review-my-agent"
    ],
    "tools": [
      "Claude"
    ],
    "description": "Runs an agent through privacy, safety and human-in-the-loop checks and writes a plain report.",
    "includes": [
      "Claude skill file",
      "40-point checklist",
      "Report template"
    ]
  },
  {
    "id": "sk-proposal-writer",
    "type": "skill",
    "name": "Proposal writer",
    "price": 89,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "quill",
    "solutions": [
      "leads-go-cold",
      "manual-onboarding"
    ],
    "tools": [
      "Claude",
      "Google Docs"
    ],
    "description": "Turns call notes into a clean proposal in your format.",
    "includes": [
      "Claude skill file",
      "Proposal template",
      "Pricing table block"
    ]
  },
  {
    "id": "sk-weekly-report",
    "type": "skill",
    "name": "Weekly ops report",
    "price": 49,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "relay",
    "solutions": [
      "admin-overload"
    ],
    "tools": [
      "Claude",
      "Google Sheets"
    ],
    "description": "Pulls numbers from your sheets and writes a short Monday report.",
    "includes": [
      "Claude skill file",
      "Report layout",
      "Sheet connector guide"
    ]
  },
  {
    "id": "au-lead-router",
    "type": "auto",
    "name": "Lead router",
    "price": 249,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "relay",
    "solutions": [
      "leads-go-cold"
    ],
    "tools": [
      "n8n",
      "Zoho CRM",
      "Gmail"
    ],
    "description": "Catches every enquiry, logs it in the CRM and sends the first reply.",
    "includes": [
      "n8n workflow",
      "Zapier version",
      "Setup video"
    ]
  },
  {
    "id": "au-invoice-reminders",
    "type": "auto",
    "name": "Invoice reminders",
    "price": 199,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "relay",
    "solutions": [
      "admin-overload"
    ],
    "tools": [
      "Zapier",
      "Zoho Books",
      "Gmail"
    ],
    "description": "Polite reminders before and after due dates, and a weekly list of what is late. No AI needed.",
    "includes": [
      "Zapier workflow",
      "Email templates",
      "Setup guide"
    ]
  },
  {
    "id": "au-crm-sync",
    "type": "auto",
    "name": "CRM and projects sync",
    "price": 299,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "sage",
    "solutions": [
      "tools-dont-talk"
    ],
    "tools": [
      "n8n",
      "Zoho CRM",
      "monday.com"
    ],
    "description": "Keeps clients and projects in step between your CRM and monday.com. Plain automation.",
    "includes": [
      "n8n workflow",
      "Field mapping sheet",
      "Error alerts"
    ]
  },
  {
    "id": "au-social-scheduler",
    "type": "auto",
    "name": "Social scheduler",
    "price": 199,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "quill",
    "solutions": [
      "consistent-posting"
    ],
    "tools": [
      "Zapier",
      "Meta Business Suite",
      "Notion"
    ],
    "description": "Moves approved posts from your content calendar to Facebook and Instagram on schedule.",
    "includes": [
      "Zapier workflow",
      "Notion calendar",
      "Setup guide"
    ]
  },
  {
    "id": "au-ticket-triage",
    "type": "auto",
    "name": "Ticket triage",
    "price": 249,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "relay",
    "solutions": [
      "slow-replies"
    ],
    "tools": [
      "n8n",
      "Gmail",
      "Slack"
    ],
    "description": "Sorts incoming questions by urgency and sends the urgent ones to Slack.",
    "includes": [
      "n8n workflow",
      "Urgency rules",
      "Slack alerts"
    ]
  },
  {
    "id": "tl-lead-inbox",
    "type": "tool",
    "name": "Lead inbox",
    "price": 29,
    "unit": "/month",
    "priceStatus": "placeholder",
    "agent": "relay",
    "solutions": [
      "leads-go-cold",
      "prospecting"
    ],
    "tools": [
      "Web app"
    ],
    "description": "One screen for every lead, its status and what Relay did. Built for small teams.",
    "includes": [
      "Hosted web app",
      "Up to 5 users",
      "Email support"
    ]
  },
  {
    "id": "tl-brand-kit",
    "type": "tool",
    "name": "Brand kit studio",
    "price": 19,
    "unit": "/month",
    "priceStatus": "placeholder",
    "agent": "quill",
    "solutions": [
      "inconsistent-brand",
      "consistent-posting"
    ],
    "tools": [
      "Web app"
    ],
    "description": "Stores your colors, fonts and voice so every agent and teammate stays on brand.",
    "includes": [
      "Hosted web app",
      "Asset library",
      "Voice profile"
    ]
  },
  {
    "id": "tl-agent-monitor",
    "type": "tool",
    "name": "Agent monitor",
    "price": 49,
    "unit": "/month",
    "priceStatus": "placeholder",
    "agent": "sage",
    "solutions": [
      "is-it-safe",
      "review-my-agent"
    ],
    "tools": [
      "Web app"
    ],
    "description": "Shows what each agent did, what it could see and anything Sage flagged.",
    "includes": [
      "Hosted web app",
      "Weekly safety report",
      "Alert rules"
    ]
  },
  {
    "id": "sk-video-script",
    "type": "skill",
    "name": "Short video scriptwriter",
    "price": 59,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "quill",
    "solutions": [
      "video-content"
    ],
    "tools": [
      "Claude"
    ],
    "description": "Writes hooks and 30-second scripts from one idea or a blog post.",
    "includes": [
      "Claude skill file",
      "Hook formulas",
      "Script template"
    ]
  },
  {
    "id": "au-clip-cutter",
    "type": "auto",
    "name": "Long-to-short clip cutter",
    "price": 249,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "reel",
    "solutions": [
      "video-content"
    ],
    "tools": [
      "n8n",
      "Descript",
      "Google Drive"
    ],
    "description": "Drops long recordings into a folder and gets back short clips ready for review.",
    "includes": [
      "n8n workflow",
      "Descript setup",
      "Review checklist"
    ]
  },
  {
    "id": "tl-caption-studio",
    "type": "tool",
    "name": "Caption studio",
    "price": 25,
    "unit": "/month",
    "priceStatus": "placeholder",
    "agent": "reel",
    "solutions": [
      "video-content"
    ],
    "tools": [
      "Web app"
    ],
    "description": "Brand-styled captions and every aspect ratio from one upload.",
    "includes": [
      "Hosted web app",
      "Caption styles",
      "Export presets"
    ]
  },
  {
    "id": "tp-content-calendar",
    "type": "tpl",
    "name": "Content calendar",
    "price": 29,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "quill",
    "solutions": [
      "consistent-posting"
    ],
    "tools": [
      "Notion",
      "Google Sheets"
    ],
    "description": "A 12-week calendar with post types, approvals and a weekly rhythm.",
    "includes": [
      "Notion template",
      "Sheets version",
      "Posting guide"
    ]
  },
  {
    "id": "tp-onboarding-portal",
    "type": "tpl",
    "name": "Client onboarding portal",
    "price": 99,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "relay",
    "solutions": [
      "manual-onboarding"
    ],
    "tools": [
      "Notion",
      "Typeform"
    ],
    "description": "A client-facing checklist with forms, documents and progress in one place.",
    "includes": [
      "Notion portal",
      "Intake form",
      "Welcome emails"
    ]
  },
  {
    "id": "tp-design-system",
    "type": "tpl",
    "name": "Design system starter",
    "price": 99,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "beacon",
    "solutions": [
      "confusing-site",
      "inconsistent-brand"
    ],
    "tools": [
      "Figma",
      "Webflow"
    ],
    "description": "Colors, type, spacing and core components to rebuild your site on.",
    "includes": [
      "Figma library",
      "Webflow style guide",
      "Usage notes"
    ]
  },
  {
    "id": "tp-ai-policy",
    "type": "tpl",
    "name": "AI use policy",
    "price": 49,
    "unit": "one-time",
    "priceStatus": "placeholder",
    "agent": "sage",
    "solutions": [
      "is-it-safe"
    ],
    "tools": [
      "Google Docs"
    ],
    "description": "A plain-language policy for how your team and your agents use AI.",
    "includes": [
      "Policy document",
      "Staff one-pager",
      "Review checklist"
    ]
  }
];

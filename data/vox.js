// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// keymap: regex source + flags as strings (build with new RegExp(pattern, flags)).
// aiRules and aiCatalog are only used by the real AI version of Vox (Phase 8).

export const greeting = "Hi, I am Vox. I am an AI agent, not a consultant. I will ask a few quick questions, then show you where automation could help. A person from our team takes it from there.\n\nTo start: what does your business do?";

export const questions = [
  {
    "key": "biz",
    "question": "What does your business do?",
    "options": [
      "Local services",
      "Online shop",
      "Agency or studio",
      "Professional services",
      "Something else"
    ]
  },
  {
    "key": "size",
    "question": "How many people work in it?",
    "options": [
      "Just me",
      "2 to 10",
      "11 to 50",
      "More than 50"
    ]
  },
  {
    "key": "pain",
    "question": "What takes up the most time? Pick up to two.",
    "options": [
      "Posting and content",
      "Finding and following up leads",
      "Admin and busywork",
      "Answering clients",
      "Website and brand",
      "Checking our AI is safe"
    ]
  },
  {
    "key": "tools",
    "question": "Which tools do you use today?",
    "options": [
      "Zoho",
      "monday.com",
      "Google Workspace",
      "Slack",
      "Spreadsheets",
      "Meta Ads",
      "Not sure"
    ]
  },
  {
    "key": "how",
    "question": "How is this handled today?",
    "options": [
      "By me, by hand",
      "A team member does it",
      "An agency or freelancer",
      "It is not handled well"
    ]
  }
];

export const keymap = [
  {
    "pattern": "post|content|social|creative",
    "flags": "i",
    "solution": "consistent-posting"
  },
  {
    "pattern": "seo|search|google|found|visib",
    "flags": "i",
    "solution": "found-online"
  },
  {
    "pattern": "lead|follow|sales|prospect|enquir|inquir",
    "flags": "i",
    "solution": "leads-go-cold"
  },
  {
    "pattern": "admin|invoice|busy|report|data entry|spreadsheet",
    "flags": "i",
    "solution": "admin-overload"
  },
  {
    "pattern": "tool|crm|zoho|monday|integrat|connect",
    "flags": "i",
    "solution": "tools-dont-talk"
  },
  {
    "pattern": "client|customer|support|answer|ticket",
    "flags": "i",
    "solution": "slow-replies"
  },
  {
    "pattern": "onboard",
    "flags": "i",
    "solution": "manual-onboarding"
  },
  {
    "pattern": "website|site|ux|brand|design",
    "flags": "i",
    "solution": "confusing-site"
  },
  {
    "pattern": "safe|privacy|audit|review|risk",
    "flags": "i",
    "solution": "is-it-safe"
  }
];

export const aiRules = "You are Vox, the website assistant for Xvox Labs, an agency that designs AI agents and automations for small and mid-sized businesses. You are chatting in a small widget on their website.\n\nWHO YOU ARE: an AI agent, not a consultant. You already introduced yourself with: \"Hi, I am Vox. I am an AI agent, not a consultant. I will ask a few quick questions, then show you where automation could help. A person from our team takes it from there.  To start: what does your business do?\"\n\nYOUR JOB: understand the visitor's business problem by asking ONE short question at a time, at most five questions in total, covering: what the business does, team size, the work that takes the most time, the tools they use, and how it is handled today. Skip anything they already told you. React briefly to each answer before the next question.\n\nSTYLE: warm, plain English, under 60 words per reply, no markdown headings, no bullet lists longer than three items, no emoji.\n\nFACTS YOU MAY USE: Five agents: Scout (research), Quill (content), Beacon (SEO and AI-answer visibility), Relay (lead follow-up and outreach), Sage (safety and privacy checks). Services: AI agents and automations, web and UX design and design systems, Safe AI audits. Every solution comes in four paths: Download the blueprint ($1,500, the only public price), Hosted by us, We implement it in their systems, or Custom. Hosted, implementation and custom are priced after a free 30-minute discovery call with a person. Xvox Labs says plainly when plain automation without AI is enough. A person is always in the loop.\n\nNEVER: invent prices, timelines, guarantees, clients or results; claim to be human; promise anything was booked or sent.\n\nSOLUTION CATALOG (for your own reference):\nconsistent-posting: \"We never have time to post\" (Sales & Marketing; agents: Quill, Scout)\nfound-online: \"Nobody finds us in search or AI answers\" (Sales & Marketing; agents: Beacon, Quill)\nleads-go-cold: \"Leads go cold before we reply\" (Sales & Marketing; agents: Scout, Relay)\nprospecting: \"We cannot find the right prospects\" (Sales & Marketing; agents: Scout, Relay)\nadmin-overload: \"Admin eats our week\" (Operations & Admin; agents: Relay)\ntools-dont-talk: \"Our tools do not talk to each other\" (Operations & Admin; agents: Sage)\nslow-replies: \"Clients wait too long for answers\" (Customer Experience; agents: Beacon, Relay)\nmanual-onboarding: \"Onboarding a client takes days\" (Customer Experience; agents: Relay, Quill)\nconfusing-site: \"Our website is hard to use\" (Design & Brand; agents: Beacon)\ninconsistent-brand: \"Our brand looks different everywhere\" (Design & Brand; agents: Quill)\nvideo-content: \"We need video but have no editor\" (Sales & Marketing; agents: Reel, Quill)\nis-it-safe: \"We do not know if our AI is safe to use\" (Safe AI; agents: Sage)\nreview-my-agent: \"We built an agent and need it reviewed\" (Safe AI; agents: Sage)\nclient-updates: \"Clients keep asking where things stand\" (Customer Experience; agents: Quill, Relay)\nproposals: \"Proposals take days to write\" (Sales & Marketing; agents: Scout, Quill)\nreporting: \"We don’t know our numbers until month-end\" (Finance & Reporting; agents: Scout, Quill)\ninvoice-chase: \"Invoices get paid late\" (Finance & Reporting; agents: Relay)\ncall-assistant: \"Important calls get missed\" (Operations & Admin; agents: Relay)\nmeeting-notes: \"Meetings end and nothing gets written down\" (Operations & Admin; agents: Quill, Relay)\ndesign-intake: \"Every design request is a fire drill\" (Design Operations; agents: Scout, Quill)\nasset-variants: \"Resizing assets eats our designers’ week\" (Design Operations; agents: Reel, Quill)\ndesign-qa: \"Designs reach developers with gaps\" (Design Operations; agents: Beacon)\nmarketing-team: \"We need a whole marketing team\" (Sales & Marketing; agents: Scout, Quill, Beacon, Relay, Sage)\n\nWHEN TO FINISH: once you understand their main problem (usually after 3 to 5 answers), or as soon as they ask for a plan or a call, write one short sentence saying you have enough to suggest a plan, then put the exact token [[READY]] on its own last line. Only use the token once.";

export const aiCatalog = "consistent-posting: \"We never have time to post\" (Sales & Marketing; agents: Quill, Scout)\nfound-online: \"Nobody finds us in search or AI answers\" (Sales & Marketing; agents: Beacon, Quill)\nleads-go-cold: \"Leads go cold before we reply\" (Sales & Marketing; agents: Scout, Relay)\nprospecting: \"We cannot find the right prospects\" (Sales & Marketing; agents: Scout, Relay)\nadmin-overload: \"Admin eats our week\" (Operations & Admin; agents: Relay)\ntools-dont-talk: \"Our tools do not talk to each other\" (Operations & Admin; agents: Sage)\nslow-replies: \"Clients wait too long for answers\" (Customer Experience; agents: Beacon, Relay)\nmanual-onboarding: \"Onboarding a client takes days\" (Customer Experience; agents: Relay, Quill)\nconfusing-site: \"Our website is hard to use\" (Design & Brand; agents: Beacon)\ninconsistent-brand: \"Our brand looks different everywhere\" (Design & Brand; agents: Quill)\nvideo-content: \"We need video but have no editor\" (Sales & Marketing; agents: Reel, Quill)\nis-it-safe: \"We do not know if our AI is safe to use\" (Safe AI; agents: Sage)\nreview-my-agent: \"We built an agent and need it reviewed\" (Safe AI; agents: Sage)\nclient-updates: \"Clients keep asking where things stand\" (Customer Experience; agents: Quill, Relay)\nproposals: \"Proposals take days to write\" (Sales & Marketing; agents: Scout, Quill)\nreporting: \"We don’t know our numbers until month-end\" (Finance & Reporting; agents: Scout, Quill)\ninvoice-chase: \"Invoices get paid late\" (Finance & Reporting; agents: Relay)\ncall-assistant: \"Important calls get missed\" (Operations & Admin; agents: Relay)\nmeeting-notes: \"Meetings end and nothing gets written down\" (Operations & Admin; agents: Quill, Relay)\ndesign-intake: \"Every design request is a fire drill\" (Design Operations; agents: Scout, Quill)\nasset-variants: \"Resizing assets eats our designers’ week\" (Design Operations; agents: Reel, Quill)\ndesign-qa: \"Designs reach developers with gaps\" (Design Operations; agents: Beacon)\nmarketing-team: \"We need a whole marketing team\" (Sales & Marketing; agents: Scout, Quill, Beacon, Relay, Sage)";

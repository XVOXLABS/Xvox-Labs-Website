// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// SKILLS and RES from the prototype are already merged into each agent (skills, result).
// Approved change (owner, Nov 26, 2026; CLAUDE.md REF-9): unverified delivery durations, speed claims, result
// figures and agent quotes are removed or reworded. Records that held only such text are empty strings.

export const agents = [
  {
    "id": "scout",
    "name": "Scout",
    "role": "Research agent",
    "color": "#FF6B4A",
    "tint": "p2",
    "line": "Watches competitors and markets so you do not have to.",
    "traits": [
      "Curious",
      "Thorough",
      "A little nosy"
    ],
    "quote": "",
    "bestFor": "Owners who keep meaning to look at competitors and never find the hour.",
    "never": "Contacts anyone or publishes anything. Scout only reads and reports.",
    "check": "You choose which competitors and markets Scout watches, and you read the weekly brief.",
    "tools": [
      "Google Search",
      "Meta Ad Library",
      "LinkedIn",
      "Google Sheets"
    ],
    "day": [
      {
        "time": "Mon 08:00",
        "task": "Scans five competitors for new pages, prices and ads",
        "by": "scout"
      },
      {
        "time": "Mon 09:00",
        "task": "Sends you a one-page brief with three things worth acting on",
        "by": "scout"
      },
      {
        "time": "Mon 09:30",
        "task": "You mark the ideas worth chasing",
        "by": "you"
      },
      {
        "time": "Wed 14:00",
        "task": "Builds a list of 20 prospects that match your best clients",
        "by": "scout"
      }
    ],
    "solutions": [
      "prospecting",
      "consistent-posting",
      "found-online"
    ],
    "skills": [
      "Competitor tracking",
      "Market and trend research",
      "Prospect list building",
      "Weekly briefs"
    ],
    "result": "Weekly brief",
    "image": "/images/agents/scout.webp",
    "animatedImage": "/images/agents/anim-scout.webp"
  },
  {
    "id": "quill",
    "name": "Quill",
    "role": "Content agent",
    "color": "#FFC83D",
    "tint": "p2",
    "line": "Drafts posts, emails and creatives in your brand voice.",
    "traits": [
      "Chatty",
      "On-brand",
      "Never misses a deadline"
    ],
    "quote": "",
    "bestFor": "Teams who know what to say but never have time to write it.",
    "never": "Posts without approval. Every draft waits for a person.",
    "check": "You approve each week’s plan and every post before it goes out.",
    "tools": [
      "Meta Business Suite",
      "Canva",
      "Google Drive",
      "Notion"
    ],
    "day": [
      {
        "time": "Mon 10:00",
        "task": "Turns Scout’s brief into a week of post ideas",
        "by": "quill"
      },
      {
        "time": "Mon 11:00",
        "task": "Writes drafts in your saved brand voice",
        "by": "quill"
      },
      {
        "time": "Mon 15:00",
        "task": "You approve, edit or skip each one",
        "by": "you"
      },
      {
        "time": "Tue–Fri",
        "task": "Schedules approved posts at the best times",
        "by": "quill"
      }
    ],
    "solutions": [
      "consistent-posting",
      "inconsistent-brand",
      "manual-onboarding"
    ],
    "skills": [
      "Brand-voice writing",
      "Social posts and captions",
      "Emails and proposals",
      "Scripts"
    ],
    "result": "A week of posts, drafted",
    "image": "/images/agents/quill.webp",
    "animatedImage": "/images/agents/anim-quill.webp"
  },
  {
    "id": "beacon",
    "name": "Beacon",
    "role": "Search agent",
    "color": "#3DDBA4",
    "tint": "p3",
    "line": "Keeps you visible in search and in AI answers.",
    "traits": [
      "Calm",
      "Patient",
      "Data-minded"
    ],
    "quote": "",
    "bestFor": "Businesses that customers should find but don’t, on Google or in AI assistants.",
    "never": "Changes your live site on its own. It proposes fixes for a person to apply.",
    "check": "You or your developer approve each page change.",
    "tools": [
      "Google Search Console",
      "Google Analytics",
      "WordPress",
      "Webflow"
    ],
    "day": [
      {
        "time": "Tue 08:00",
        "task": "Checks how you show up in search and AI answers",
        "by": "beacon"
      },
      {
        "time": "Tue 09:00",
        "task": "Finds the three pages losing the most visitors",
        "by": "beacon"
      },
      {
        "time": "Tue 10:00",
        "task": "Drafts fixes and new answer sections",
        "by": "beacon"
      },
      {
        "time": "Tue 16:00",
        "task": "You approve the changes to publish",
        "by": "you"
      }
    ],
    "solutions": [
      "found-online",
      "confusing-site"
    ],
    "skills": [
      "SEO audits",
      "AI answer visibility (AEO)",
      "Page fixes and structure",
      "Search reports"
    ],
    "result": "Found in search and AI answers",
    "image": "/images/agents/beacon.webp",
    "animatedImage": "/images/agents/anim-beacon.webp"
  },
  {
    "id": "relay",
    "name": "Relay",
    "role": "Outreach agent",
    "color": "#8A5CF6",
    "tint": "p1",
    "line": "Follows up on every lead by email and call.",
    "traits": [
      "Energetic",
      "Persistent",
      "Always polite"
    ],
    "quote": "",
    "bestFor": "Teams losing deals because nobody replied fast enough.",
    "never": "Pressures people or messages anyone who opted out.",
    "check": "A person takes over as soon as a lead is ready to talk.",
    "tools": [
      "Zoho CRM",
      "Gmail",
      "Calendly",
      "WhatsApp Business"
    ],
    "day": [
      {
        "time": "Any time",
        "task": "Replies to new enquiries in your voice",
        "by": "relay"
      },
      {
        "time": "Daily 09:00",
        "task": "Follows up with leads who went quiet",
        "by": "relay"
      },
      {
        "time": "Daily 09:15",
        "task": "Hands warm leads to you with notes",
        "by": "you"
      },
      {
        "time": "Fri 17:00",
        "task": "Sends a summary of every lead and its status",
        "by": "relay"
      }
    ],
    "solutions": [
      "leads-go-cold",
      "prospecting",
      "slow-replies",
      "manual-onboarding",
      "admin-overload"
    ],
    "skills": [
      "Speed-to-lead replies",
      "Follow-up sequences",
      "Call booking",
      "CRM updates"
    ],
    "result": "Replies to leads",
    "image": "/images/agents/relay.webp",
    "animatedImage": "/images/agents/anim-relay.webp"
  },
  {
    "id": "sage",
    "name": "Sage",
    "role": "Safety agent",
    "color": "#3D6BFF",
    "tint": "p4",
    "line": "Checks every agent for safety, privacy and a human in the loop.",
    "traits": [
      "Careful",
      "Honest",
      "The one who says “wait”"
    ],
    "quote": "",
    "bestFor": "Anyone putting AI in front of customers or customer data.",
    "never": "Approves anything on its own. Sage flags; a person decides.",
    "check": "Every finding goes to a named person on your team.",
    "tools": [
      "Your agents",
      "Zoho One",
      "monday.com",
      "Audit logs"
    ],
    "day": [
      {
        "time": "Daily 07:00",
        "task": "Checks what each agent can see and do",
        "by": "sage"
      },
      {
        "time": "Daily 07:30",
        "task": "Flags anything that touches private data",
        "by": "sage"
      },
      {
        "time": "Weekly",
        "task": "Runs test conversations against your rules",
        "by": "sage"
      },
      {
        "time": "Weekly",
        "task": "You review the safety report",
        "by": "you"
      }
    ],
    "solutions": [
      "is-it-safe",
      "review-my-agent",
      "tools-dont-talk"
    ],
    "skills": [
      "Privacy and data-access checks",
      "Conversation testing",
      "Human-in-the-loop rules",
      "Safety reports"
    ],
    "result": "Checks every output first",
    "image": "/images/agents/sage.webp",
    "animatedImage": "/images/agents/anim-sage.webp"
  },
  {
    "id": "reel",
    "name": "Reel",
    "role": "Video agent",
    "color": "#FF5C8A",
    "tint": "p2",
    "line": "Cuts, captions and formats your videos for every channel.",
    "traits": [
      "Playful",
      "Fast",
      "Has an eye for a hook"
    ],
    "quote": "",
    "bestFor": "Teams with footage and ideas but no editor.",
    "never": "Publishes a video without a person watching it first.",
    "check": "You approve every cut before it goes out.",
    "tools": [
      "CapCut",
      "Premiere Pro",
      "Descript",
      "YouTube"
    ],
    "day": [
      {
        "time": "Mon 10:00",
        "task": "Finds the best moments in last week’s footage",
        "by": "reel"
      },
      {
        "time": "Mon 13:00",
        "task": "Cuts short clips in 9:16, 1:1 and 16:9",
        "by": "reel"
      },
      {
        "time": "Mon 16:00",
        "task": "You watch and approve the cuts",
        "by": "you"
      },
      {
        "time": "Tue–Fri",
        "task": "Adds captions and schedules each clip",
        "by": "reel"
      }
    ],
    "solutions": [
      "video-content",
      "consistent-posting"
    ],
    "skills": [
      "Clip finding",
      "Multi-format cutting",
      "Captions and subtitles",
      "Scheduling video posts"
    ],
    "result": "Long videos into short clips",
    "image": "/images/agents/reel.webp",
    "animatedImage": "/images/agents/anim-reel.webp"
  }
];

export const vox = {
  "id": "vox",
  "color": "#3D6BFF",
  "image": "/images/agents/vox.webp",
  "animatedImage": "/images/agents/anim-vox.webp"
};

export const coreAgentIds = [
  "scout",
  "quill",
  "beacon",
  "relay",
  "sage"
];

// Agent popup (prototype agentPop): opened from the homepage hero and puzzle agents, later from
// the How it works and agent pages. Extracted verbatim (Phase 4, step 1).
// Price is never written here: the Buy button shows the price of the agent's first blueprint
// from data/marketplace.js through the approved pricing rule (decision U2).
export const agentPopup = {
  "tabs": [
    ["persona", "Persona"],
    ["skills", "Skills and systems"],
    ["jobs", "Jobs"],
    ["uses", "Use cases"]
  ],
  "personality": "Personality",
  "bestFor": "Best for",
  "never": "Never does",
  "check": "Human checkpoint",
  "skills": "Skills",
  "systems": "Systems it connects",
  "noJobs": "Joins custom missions.",
  "useCase": "Use case",
  "marketplace": "Marketplace",
  "marketplaceCount": "{count} skills, blueprints and tools",
  "buy": "Buy {name} · {price}",
  "hire": "Hire {name} ↗",
  "hirePath": "Hosted by us",
  "hireAbout": "{name} ({role})",
  "fullProfile": "Full profile ↗",
  "close": "Close"
};

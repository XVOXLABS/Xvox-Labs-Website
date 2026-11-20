// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).

export const models = [
  {
    "name": "Claude",
    "maker": "Anthropic"
  },
  {
    "name": "GPT",
    "maker": "OpenAI"
  },
  {
    "name": "Gemini",
    "maker": "Google"
  },
  {
    "name": "Grok",
    "maker": "xAI"
  },
  {
    "name": "Llama",
    "maker": "Meta, open weights"
  },
  {
    "name": "Your own model",
    "maker": "Private or on-premise"
  }
];

export const missions = [
  {
    "id": "marketing",
    "name": "Marketing on autopilot",
    "glyph": "✦",
    "solutions": [
      "consistent-posting",
      "found-online"
    ],
    "blueprint": "bp-consistent-posting",
    "slots": [
      {
        "job": "Research the market",
        "agent": "scout",
        "does": "checks competitors and trends every Monday and sends a one-page brief."
      },
      {
        "job": "Write posts and emails",
        "agent": "quill",
        "does": "turns the brief into a week of posts in your brand voice.",
        "check": "You approve every post."
      },
      {
        "job": "Get found in search and AI",
        "agent": "beacon",
        "does": "fixes the pages and answers that lose you visitors.",
        "check": "You approve page changes."
      },
      {
        "job": "Follow up on new leads",
        "agent": "relay",
        "does": "replies to everyone who responds, within minutes."
      },
      {
        "job": "Keep it safe",
        "agent": "sage",
        "does": "checks what every agent can see and flags anything risky.",
        "check": "A person reads the weekly safety report."
      }
    ]
  },
  {
    "id": "sales",
    "name": "Never miss a lead",
    "glyph": "◎",
    "solutions": [
      "leads-go-cold",
      "prospecting"
    ],
    "blueprint": "bp-leads-go-cold",
    "slots": [
      {
        "job": "Find the right prospects",
        "agent": "scout",
        "does": "builds a weekly list of companies that match your best clients."
      },
      {
        "job": "Reply in minutes",
        "agent": "relay",
        "does": "answers every new enquiry in your voice, day or night."
      },
      {
        "job": "Write proposals",
        "agent": "quill",
        "does": "turns call notes into a clean proposal.",
        "check": "You approve each proposal."
      },
      {
        "job": "Keep it safe",
        "agent": "sage",
        "does": "makes sure no one is contacted after opting out."
      }
    ]
  },
  {
    "id": "video",
    "name": "Video content engine",
    "glyph": "▶",
    "solutions": [
      "video-content"
    ],
    "blueprint": "bp-video-content",
    "slots": [
      {
        "job": "Spot what is trending",
        "agent": "scout",
        "does": "finds topics and formats your audience is watching."
      },
      {
        "job": "Write the scripts",
        "agent": "quill",
        "does": "writes hooks and 30-second scripts.",
        "check": "You pick the scripts to film."
      },
      {
        "job": "Edit and cut the video",
        "agent": "reel",
        "does": "cuts long footage into short clips for every format.",
        "check": "You watch each cut before it goes out."
      },
      {
        "job": "Captions and posting",
        "agent": "reel",
        "does": "adds captions and schedules every clip."
      },
      {
        "job": "Keep it safe",
        "agent": "sage",
        "does": "checks music rights, faces and claims before posting."
      }
    ]
  },
  {
    "id": "support",
    "name": "Support that never sleeps",
    "glyph": "◐",
    "solutions": [
      "slow-replies",
      "manual-onboarding"
    ],
    "blueprint": "bp-slow-replies",
    "slots": [
      {
        "job": "Answer common questions",
        "agent": "relay",
        "does": "answers by chat or email in seconds and hands hard cases to a person."
      },
      {
        "job": "Write help articles",
        "agent": "quill",
        "does": "turns repeat questions into help pages.",
        "check": "You approve each article."
      },
      {
        "job": "Onboard new clients",
        "agent": "relay",
        "does": "sends forms, collects documents and tracks progress."
      },
      {
        "job": "Keep it safe",
        "agent": "sage",
        "does": "keeps private client data out of replies."
      }
    ]
  },
  {
    "id": "safety",
    "name": "Safe AI rollout",
    "glyph": "⛨",
    "solutions": [
      "is-it-safe",
      "review-my-agent"
    ],
    "blueprint": "bp-is-it-safe",
    "slots": [
      {
        "job": "Check data access",
        "agent": "sage",
        "does": "maps what each agent can see and do."
      },
      {
        "job": "Test real conversations",
        "agent": "sage",
        "does": "runs test chats against your rules and finds the gaps."
      },
      {
        "job": "Write the AI policy",
        "agent": "quill",
        "does": "drafts a plain-language AI policy for your team.",
        "check": "Your team signs off the policy."
      },
      {
        "job": "Make it easy to find help",
        "agent": "beacon",
        "does": "makes sure people can find a human and the right answers fast."
      }
    ]
  }
];

export const defaultTeam = [
  "scout",
  "quill"
];

// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// title = prototype S.bp (identical to COPY[slug][0]); summary = COPY[slug][1]; workflow = FLOW[slug].
// agentNames is omitted when it equals the names of agentIds (exact duplicate).
// Approved change (owner, Nov 26, 2026; CLAUDE.md REF-9): unverified delivery durations, speed claims, result
// figures and agent quotes are removed or reworded. Records that held only such text are empty strings.

export const solutions = [
  {
    "slug": "consistent-posting",
    "title": "Social media content",
    "category": "growth",
    "pain": "We never have time to post",
    "summary": "Plan, write and schedule a week of posts in your brand voice.",
    "agentIds": [
      "quill",
      "scout"
    ],
    "without": [
      "Posting happens when someone remembers",
      "Ideas come from scrolling competitors",
      "Every post is written from a blank page"
    ],
    "with": [
      "A weekly plan drafted for you to approve",
      "Competitor and trend notes feed each post",
      "Posts keep your brand voice, and a person approves them"
    ],
    "description": "Plan, write and schedule a week of posts in your brand voice.",
    "workflow": {
      "trigger": "Every Monday, a fresh week",
      "steps": [
        {
          "agent": "scout",
          "does": "Pulls competitor and trend notes"
        },
        {
          "agent": "quill",
          "does": "Drafts a week of posts in your voice"
        }
      ],
      "outcome": "Posts scheduled after you approve",
    }
  },
  {
    "slug": "found-online",
    "title": "SEO and AI search visibility",
    "category": "growth",
    "pain": "Nobody finds us in search or AI answers",
    "summary": "Get found on Google and in ChatGPT, Perplexity and Gemini answers.",
    "agentIds": [
      "beacon",
      "quill"
    ],
    "without": [
      "Pages are written without keyword research",
      "You do not appear in AI assistant answers",
      "SEO is a one-off audit that goes stale"
    ],
    "with": [
      "Pages and answers structured for search and AI",
      "Gaps found and fixed on a steady rhythm",
      "Plain reports on what moved and why"
    ],
    "description": "Get found on Google and in ChatGPT, Perplexity and Gemini answers.",
    "workflow": {
      "trigger": "Monthly visibility check",
      "steps": [
        {
          "agent": "beacon",
          "does": "Checks how you show up in search and AI answers"
        },
        {
          "agent": "quill",
          "does": "Drafts page fixes and answer sections"
        }
      ],
      "outcome": "Pages updated, visibility tracked",
    }
  },
  {
    "slug": "leads-go-cold",
    "title": "Inbound lead response",
    "category": "growth",
    "pain": "Leads go cold before we reply",
    "summary": "Reply to every new lead, day or night.",
    "agentIds": [
      "scout",
      "relay"
    ],
    "without": [
      "Enquiries sit in an inbox for hours",
      "Follow-up depends on who is free",
      "Nobody knows which leads were missed"
    ],
    "with": [
      "First reply goes out in your voice",
      "Follow-ups continue until the lead answers",
      "A person steps in when a lead is ready to talk"
    ],
    "description": "Reply to every new lead, day or night.",
    "workflow": {
      "trigger": "A new enquiry arrives",
      "steps": [
        {
          "agent": "scout",
          "does": "Looks up the company"
        },
        {
          "agent": "relay",
          "does": "Writes a first reply in your voice"
        }
      ],
      "outcome": "First reply logged in your CRM",
    }
  },
  {
    "slug": "prospecting",
    "title": "Lead research and outreach",
    "category": "growth",
    "pain": "We cannot find the right prospects",
    "summary": "Find companies like your best clients and start the conversation.",
    "agentIds": [
      "scout",
      "relay"
    ],
    "without": [
      "Lists are built by hand from search results",
      "Outreach is generic",
      "Research stops when it gets busy"
    ],
    "with": [
      "Prospects researched against your ideal client",
      "Outreach written around what each company does",
      "Replies routed to the right person"
    ],
    "description": "Find companies like your best clients and start the conversation.",
    "workflow": {
      "trigger": "Your ideal-client profile",
      "steps": [
        {
          "agent": "scout",
          "does": "Researches companies like your best clients"
        },
        {
          "agent": "relay",
          "does": "Writes outreach around what each one does"
        }
      ],
      "outcome": "Replies routed to the right person",
    }
  },
  {
    "slug": "admin-overload",
    "title": "Admin and data entry",
    "category": "admin",
    "pain": "Admin eats our week",
    "summary": "Stop copying data between tools and chasing routine tasks.",
    "agentIds": [
      "relay"
    ],
    "without": [
      "Data is copied between tools by hand",
      "Invoices and reminders go out late",
      "Reports are rebuilt every month"
    ],
    "with": [
      "Routine steps run on their own, day and night",
      "Reminders and reports go out on schedule",
      "People review exceptions, not everything"
    ],
    "description": "Stop copying data between tools and chasing routine tasks.",
    "workflow": {
      "trigger": "Routine work comes due",
      "steps": [
        {
          "agent": "relay",
          "does": "Moves data, sends reminders, builds reports"
        }
      ],
      "outcome": "Admin done on schedule; people review exceptions",
    }
  },
  {
    "slug": "tools-dont-talk",
    "title": "Tool integrations",
    "category": "admin",
    "pain": "Our tools do not talk to each other",
    "summary": "Connect your CRM, billing and project tools so data stays in sync.",
    "agentIds": [
      "sage"
    ],
    "without": [
      "CRM, billing and projects are separate islands",
      "Staff keep spreadsheets to bridge them",
      "Nobody trusts the numbers"
    ],
    "with": [
      "Your tools connected through clean API links",
      "One source of truth for each record",
      "No AI added where plain automation does the job"
    ],
    "description": "Connect your CRM, billing and project tools so data stays in sync.",
    "workflow": {
      "trigger": "A record changes in one tool",
      "steps": [
        {
          "agent": "relay",
          "does": "Syncs it to every other tool"
        }
      ],
      "outcome": "One source of truth across your tools",
    }
  },
  {
    "slug": "slow-replies",
    "title": "AI chat and voice support",
    "category": "cx",
    "pain": "Clients wait too long for answers",
    "summary": "Answer common questions. A person handles the rest.",
    "agentIds": [
      "beacon",
      "relay"
    ],
    "without": [
      "Questions queue up after hours",
      "Common answers are typed again and again",
      "Tickets are sorted by whoever sees them first"
    ],
    "with": [
      "Answers to common questions by chat or voice",
      "Hard cases handed to a person with context",
      "Tickets sorted by urgency"
    ],
    "description": "Answer common questions. A person handles the rest.",
    "workflow": {
      "trigger": "A message or call comes in",
      "steps": [
        {
          "agent": "beacon",
          "does": "Finds the answer in your docs"
        },
        {
          "agent": "relay",
          "does": "Replies by chat or voice"
        }
      ],
      "outcome": "Common questions answered; hard cases go to a person",
    }
  },
  {
    "slug": "manual-onboarding",
    "title": "Client onboarding",
    "category": "cx",
    "pain": "Onboarding a client takes days",
    "summary": "Collect forms, contracts and setup details automatically.",
    "agentIds": [
      "relay",
      "quill"
    ],
    "without": [
      "Forms, contracts and welcome emails sent by hand",
      "Clients ask where things stand",
      "Setup steps get missed"
    ],
    "with": [
      "One flow collects what you need and sets up accounts",
      "Clients see progress without asking",
      "Every step is logged"
    ],
    "description": "Collect forms, contracts and setup details automatically.",
    "workflow": {
      "trigger": "A client signs",
      "steps": [
        {
          "agent": "relay",
          "does": "Sends forms, contracts and welcome emails"
        },
        {
          "agent": "quill",
          "does": "Writes the welcome pack"
        }
      ],
      "outcome": "Client set up, every step logged",
    }
  },
  {
    "slug": "confusing-site",
    "title": "Website redesign",
    "category": "design",
    "pain": "Our website is hard to use",
    "summary": "A clear, fast website structured around what visitors need.",
    "agentIds": [
      "beacon"
    ],
    "without": [
      "Visitors leave without finding what they need",
      "Pages, SEO settings and structure grew by accident",
      "Updates need a developer"
    ],
    "with": [
      "A site structure built around visitor tasks",
      "Pages, SEO and AEO set up properly",
      "A design system your team can reuse"
    ],
    "description": "A clear, fast website structured around what visitors need."
  },
  {
    "slug": "inconsistent-brand",
    "title": "Brand consistency kit",
    "category": "design",
    "pain": "Our brand looks different everywhere",
    "summary": "Templates and rules that keep every channel on brand.",
    "agentIds": [
      "quill"
    ],
    "without": [
      "Every post and page looks a bit different",
      "Assets live in many folders",
      "AI images drift off brand"
    ],
    "with": [
      "A design system with colors, type and components",
      "Assets organized and ready to reuse",
      "AI creative that stays on brand"
    ],
    "description": "Templates and rules that keep every channel on brand."
  },
  {
    "slug": "video-content",
    "title": "Short-form video",
    "category": "growth",
    "pain": "We need video but have no editor",
    "summary": "Turn long videos into ready-to-post clips with captions.",
    "agentIds": [
      "reel",
      "quill"
    ],
    "without": [
      "Footage sits unused on phones and drives",
      "Every clip takes an evening to edit",
      "Formats never fit every channel"
    ],
    "with": [
      "Best moments found and cut for you",
      "Captions and every format handled",
      "A person approves each clip before it goes out"
    ],
    "description": "Turn long videos into ready-to-post clips with captions.",
    "workflow": {
      "trigger": "A long video lands in a folder",
      "steps": [
        {
          "agent": "reel",
          "does": "Finds the best moments and cuts clips"
        },
        {
          "agent": "quill",
          "does": "Writes captions and hooks"
        }
      ],
      "outcome": "Clips in every format, ready to post",
    }
  },
  {
    "slug": "is-it-safe",
    "title": "AI safety check",
    "category": "rai",
    "pain": "We do not know if our AI is safe to use",
    "summary": "Check what your AI can see, say and do before you launch.",
    "agentIds": [
      "sage"
    ],
    "without": [
      "No one has checked what the AI can see or say",
      "Privacy questions go unanswered",
      "No human is clearly responsible"
    ],
    "with": [
      "Safety and privacy checks before launch",
      "Clear rules for when a person steps in",
      "A plain-language report your team can act on"
    ],
    "description": "Check what your AI can see, say and do before you launch."
  },
  {
    "slug": "review-my-agent",
    "title": "AI agent review",
    "category": "rai",
    "pain": "We built an agent and need it reviewed",
    "summary": "An expert review of an agent you or a vendor built.",
    "agentIds": [
      "sage"
    ],
    "without": [
      "The agent works in demos but nobody trusts it live",
      "Users find it confusing",
      "Quality is judged by feel"
    ],
    "with": [
      "A human-AI experience and quality review",
      "Safe AI findings ranked by risk",
      "A report your builders can fix from"
    ],
    "description": "An expert review of an agent you or a vendor built."
  },
  {
    "slug": "client-updates",
    "title": "Client progress updates",
    "category": "cx",
    "pain": "Clients keep asking where things stand",
    "summary": "Send clients a clear weekly update without writing it yourself.",
    "agentIds": [
      "quill",
      "relay"
    ],
    "without": [
      "Status lives in people’s heads",
      "Clients chase you by email",
      "Updates are written late on Friday"
    ],
    "with": [
      "A plain weekly update drafted for you",
      "Simple questions answered straight away",
      "A person approves before it is sent"
    ],
    "description": "Send clients a clear weekly update without writing it yourself.",
    "workflow": {
      "trigger": "Every Friday",
      "steps": [
        {
          "agent": "quill",
          "does": "Writes a plain progress update"
        },
        {
          "agent": "relay",
          "does": "Sends it and answers simple questions"
        }
      ],
      "outcome": "Clients stop asking where things stand",
    }
  },
  {
    "slug": "proposals",
    "title": "Proposals and quotes",
    "category": "growth",
    "pain": "Proposals take days to write",
    "summary": "Turn a sales call into a ready-to-send proposal.",
    "agentIds": [
      "scout",
      "quill"
    ],
    "without": [
      "Every proposal starts from a blank page",
      "Pricing is copied from old documents",
      "Deals cool while the proposal waits"
    ],
    "with": [
      "A draft proposal from the call",
      "Your template, your pricing rules",
      "You approve before it goes out"
    ],
    "description": "Turn a sales call into a ready-to-send proposal.",
    "workflow": {
      "trigger": "A sales call ends",
      "steps": [
        {
          "agent": "scout",
          "does": "Pulls call notes and client details"
        },
        {
          "agent": "quill",
          "does": "Writes the proposal from your template"
        }
      ],
      "outcome": "Proposal ready to send",
    }
  },
  {
    "slug": "reporting",
    "title": "Reporting and dashboards",
    "category": "bizops",
    "pain": "We don’t know our numbers until month-end",
    "summary": "Get your key numbers every Monday, pulled from your tools.",
    "agentIds": [
      "scout",
      "quill"
    ],
    "without": [
      "Reports are rebuilt by hand every month",
      "Numbers live in five tools",
      "Problems show up too late"
    ],
    "with": [
      "A short report every Monday",
      "Numbers pulled from your tools automatically",
      "What changed, in plain words"
    ],
    "description": "Get your key numbers every Monday, pulled from your tools.",
    "workflow": {
      "trigger": "Every Monday morning",
      "steps": [
        {
          "agent": "scout",
          "does": "Pulls numbers from your tools"
        },
        {
          "agent": "quill",
          "does": "Writes a short report on what changed"
        }
      ],
      "outcome": "Numbers weekly, not at month-end",
    }
  },
  {
    "slug": "invoice-chase",
    "title": "Invoice reminders",
    "category": "bizops",
    "pain": "Invoices get paid late",
    "summary": "Follow up on unpaid invoices automatically and politely.",
    "agentIds": [
      "relay"
    ],
    "without": [
      "Reminders depend on someone remembering",
      "Awkward chasing emails",
      "No clear view of what is late"
    ],
    "with": [
      "Polite reminders before and after due dates",
      "Replies logged against each invoice",
      "A weekly list of what is late"
    ],
    "description": "Follow up on unpaid invoices automatically and politely.",
    "workflow": {
      "trigger": "An invoice nears its due date",
      "steps": [
        {
          "agent": "relay",
          "does": "Sends polite reminders and logs replies"
        }
      ],
      "outcome": "A weekly list of late invoices",
    }
  },
  {
    "slug": "call-assistant",
    "title": "Automated phone calls",
    "category": "admin",
    "pain": "Important calls get missed",
    "summary": "Call customers automatically about bookings, delays and renewals.",
    "agentIds": [
      "relay"
    ],
    "without": [
      "Calls depend on who is free",
      "Outcomes are not written down",
      "Sensitive cases are handled ad hoc"
    ],
    "with": [
      "Calls placed or answered when a business event happens",
      "Approved information only, outcome recorded",
      "Sensitive cases escalated to a person"
    ],
    "description": "Call customers automatically about bookings, delays and renewals.",
    "workflow": {
      "trigger": "A business event (booking, delay, renewal)",
      "steps": [
        {
          "agent": "relay",
          "does": "Places or takes the call with approved information"
        }
      ],
      "outcome": "Outcome recorded; people handle exceptions",
    }
  },
  {
    "slug": "meeting-notes",
    "title": "Meeting notes and follow-ups",
    "category": "admin",
    "pain": "Meetings end and nothing gets written down",
    "summary": "Get notes, action items and follow-ups after every meeting.",
    "agentIds": [
      "quill",
      "relay"
    ],
    "without": [
      "Notes are patchy or missing",
      "Action items get lost",
      "Follow-ups are booked days later"
    ],
    "with": [
      "Notes and action items after the call",
      "Follow-ups booked and reminders sent",
      "Everything filed where your team looks"
    ],
    "description": "Get notes, action items and follow-ups after every meeting.",
    "workflow": {
      "trigger": "A meeting ends",
      "steps": [
        {
          "agent": "quill",
          "does": "Writes notes and action items"
        },
        {
          "agent": "relay",
          "does": "Books follow-ups and sends reminders"
        }
      ],
      "outcome": "Notes and next steps",
    }
  },
  {
    "slug": "design-intake",
    "title": "Design request intake",
    "category": "designops",
    "pain": "Every design request is a fire drill",
    "summary": "Every design request arrives with a brief, assets and a deadline.",
    "agentIds": [
      "scout",
      "quill"
    ],
    "without": [
      "Requests arrive in chat with no brief",
      "Designers chase assets and deadlines",
      "Urgent beats important"
    ],
    "with": [
      "Every request arrives with brief, assets and deadline",
      "Clear tickets, prioritised for the team",
      "Designers spend time designing"
    ],
    "description": "Every design request arrives with a brief, assets and a deadline.",
    "workflow": {
      "trigger": "Someone asks for a design",
      "steps": [
        {
          "agent": "scout",
          "does": "Collects the brief, assets and deadline"
        },
        {
          "agent": "quill",
          "does": "Writes a clear ticket for the designer"
        }
      ],
      "outcome": "Requests arrive complete and prioritised",
    }
  },
  {
    "slug": "asset-variants",
    "title": "Asset resizing and variants",
    "category": "designops",
    "pain": "Resizing assets eats our designers’ week",
    "summary": "Create every size and format from one approved design.",
    "agentIds": [
      "reel",
      "quill"
    ],
    "without": [
      "Every channel needs its own size",
      "Copy is rewritten for each placement",
      "Designers lose days to production work"
    ],
    "with": [
      "Every size and format made from one master",
      "Copy adapted per placement",
      "A designer approves the set"
    ],
    "description": "Create every size and format from one approved design.",
    "workflow": {
      "trigger": "A master design is approved",
      "steps": [
        {
          "agent": "reel",
          "does": "Creates every size and format"
        },
        {
          "agent": "quill",
          "does": "Adapts the copy for each placement"
        }
      ],
      "outcome": "Every variant ready for review",
    }
  },
  {
    "slug": "design-qa",
    "title": "Design QA and handoff",
    "category": "designops",
    "pain": "Designs reach developers with gaps",
    "summary": "Check specs and accessibility before designs reach developers.",
    "agentIds": [
      "beacon"
    ],
    "without": [
      "Missing states and specs found in build",
      "Accessibility checked too late",
      "Back-and-forth between design and dev"
    ],
    "with": [
      "Specs, states and accessibility checked before handoff",
      "Gaps flagged with the fix",
      "Developers get complete designs"
    ],
    "description": "Check specs and accessibility before designs reach developers.",
    "workflow": {
      "trigger": "A design is marked ready",
      "steps": [
        {
          "agent": "beacon",
          "does": "Checks specs, states and accessibility"
        }
      ],
      "outcome": "Developers get complete, checked designs",
    }
  }
];

export const bundles = [
  {
    "slug": "marketing-team",
    "title": "Marketing team in a box",
    "summary": "Content, search and follow-up handled by one coordinated team."
  }
];

export const teamAtWorkSlugs = [
  "leads-go-cold",
  "consistent-posting",
  "slow-replies",
  "proposals"
];

export const teamAtWork = {
  "leads-go-cold": "Lead response",
  "consistent-posting": "Social content",
  "slow-replies": "Customer support",
  "proposals": "Proposals"
};

// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// template: text identical on every page of this type.
// computedText: per-page text built by the prototype from data (e.g. counts, names in sentences);
// kept verbatim so templates can be rebuilt and checked against it.
// Approved text change (owner, Nov 26, 2026; CLAUDE.md REF-6 and REF-7): the first computedText line of
// each of the five departments ends its first sentence with one full stop; the prototype has two.
// Approved change (owner, Nov 26, 2026; CLAUDE.md REF-9): unverified delivery durations, speed claims, result
// figures and agent quotes are removed or reworded. Records that held only such text are empty strings.

export const template = {
  "prototypeRoutes": [
    "#dept-growth",
    "#dept-cx",
    "#dept-bizops",
    "#dept-admin",
    "#dept-designops"
  ],
  "sections": [
    {
      "index": 0,
      "blocks": [
        {
          "tag": "a",
          "text": "Solutions",
          "href": "/solutions",
          "prototypeHref": "#solutions"
        },
        {
          "tag": "span",
          "text": "/"
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
    },
    {
      "index": 2,
      "blocks": [
        {
          "tag": "span.eyebrow",
          "text": "See the team at work"
        },
        {
          "tag": "button.btn",
          "text": "Run it ▶"
        },
        {
          "tag": "label.orc-flag",
          "text": "Simulate a safety flag"
        },
        {
          "tag": "span.orc-st",
          "text": "Ready"
        },
        {
          "tag": "span.olb",
          "text": "Trigger"
        },
        {
          "tag": "span.olb",
          "text": "Context it reads"
        },
        {
          "tag": "span.olb",
          "text": "Orchestrator"
        },
        {
          "tag": "b",
          "text": "Plans the work and assigns agents"
        },
        {
          "tag": "span.olb",
          "text": "Safety checks · Sage"
        },
        {
          "tag": "button.btn",
          "text": "Approve"
        },
        {
          "tag": "button.btn",
          "text": "Edit"
        },
        {
          "tag": "button.btn",
          "text": "Reject"
        },
        {
          "tag": "span.olb",
          "text": "Outcome"
        },
        {
          "tag": "span.olb",
          "text": "Shared memory"
        },
        {
          "tag": "span.olb",
          "text": "Run log"
        },
        {
          "tag": "li.muted",
          "text": "Press “Run it” to watch the agents work."
        },
        {
          "tag": "a.btn",
          "text": "See this solution →",
          "href": "/solutions/consistent-posting",
          "prototypeHref": "#solution-consistent-posting"
        }
      ]
    },
    {
      "index": 3,
      "blocks": [
        {
          "tag": "span.eyebrow",
          "text": "Ways to buy"
        },
        {
          "tag": "h2.big",
          "text": "Choose how much you hand over."
        },
        {
          "tag": "span.ln",
          "text": "Step 0"
        },
        {
          "tag": "h4",
          "text": "Free AI plan"
        },
        {
          "tag": "p",
          "text": "Vox maps your problem in about two minutes."
        },
        {
          "tag": "div.lp",
          "text": "Free"
        },
        {
          "tag": "button.btn",
          "text": "Get your AI plan →"
        },
        {
          "tag": "span.ln",
          "text": "Step 1"
        },
        {
          "tag": "h4",
          "text": "Paid audit"
        },
        {
          "tag": "p",
          "text": "Mapping your process, tools and approvals. Credited to the build."
        },
        {
          "tag": "span.tbs",
          "text": "Price to set",
          "priceStatus": "to-set"
        },
        {
          "tag": "a.btn",
          "text": "Book an audit →",
          "href": "/book",
          "prototypeHref": "#book"
        },
        {
          "tag": "span.ln",
          "text": "Step 2"
        },
        {
          "tag": "h4",
          "text": "Download"
        },
        {
          "tag": "p",
          "text": "Take the blueprint. You run it."
        },
        {
          "tag": "div.lp",
          "text": "$1,500"
        },
        {
          "tag": "a.btn",
          "text": "Browse blueprints →",
          "href": "/marketplace",
          "prototypeHref": "#market"
        },
        {
          "tag": "span.ln",
          "text": "Step 3"
        },
        {
          "tag": "h4",
          "text": "Implement"
        },
        {
          "tag": "p",
          "text": "We build it inside your tools or cloud."
        },
        {
          "tag": "span.tbs",
          "text": "Price to set",
          "priceStatus": "to-set"
        },
        {
          "tag": "a.btn",
          "text": "Book a call →",
          "href": "/book",
          "prototypeHref": "#book"
        },
        {
          "tag": "span.ln",
          "text": "Step 4"
        },
        {
          "tag": "h4",
          "text": "Hire"
        },
        {
          "tag": "p",
          "text": "We host, run and maintain it for you."
        },
        {
          "tag": "span.tbs",
          "text": "Price to set",
          "priceStatus": "to-set"
        },
        {
          "tag": "small",
          "text": "/ month"
        },
        {
          "tag": "a.btn",
          "text": "Book a call →",
          "href": "/book",
          "prototypeHref": "#book"
        },
        {
          "tag": "span.ln",
          "text": "Step 5"
        },
        {
          "tag": "h4",
          "text": "Custom"
        },
        {
          "tag": "p",
          "text": "More agents, your rules, built around you."
        },
        {
          "tag": "span.tbs",
          "text": "Price to set",
          "priceStatus": "to-set"
        },
        {
          "tag": "a.btn",
          "text": "Book a call →",
          "href": "/book",
          "prototypeHref": "#book"
        },
        {
          "tag": "p.note",
          "text": "Download means you run it. Hire means we run it. Prices marked “to set” are decided by the team before launch. See pricing →"
        },
        {
          "tag": "a",
          "text": "See pricing →",
          "href": "/pricing",
          "prototypeHref": "#pricing"
        }
      ]
    },
    {
      "index": 5,
      "blocks": [
        {
          "tag": "h2",
          "text": "Start with a two-minute plan."
        },
        {
          "tag": "p.lead",
          "text": "Tell Vox what is slowing you down. You get a plan, and a person from our team follows up."
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
  "dept-growth": [
    "Social content, search visibility, lead follow-up and proposals. Pick a solution to see how it works and how to buy it.",
    "Sales & Marketing Social media content Plan, write and schedule a week of posts in your brand voice. →",
    "Sales & Marketing SEO and AI search visibility Get found on Google and in ChatGPT, Perplexity and Gemini answers. →",
    "Sales & Marketing Inbound lead response Reply to every new lead, day or night. →",
    "Sales & Marketing Lead research and outreach Find companies like your best clients and start the conversation. →",
    "Sales & Marketing Short-form video Turn long videos into ready-to-post clips with captions. →",
    "Sales & Marketing Proposals and quotes Turn a sales call into a ready-to-send proposal. →",
    "Sales & Marketing, step by step.",
    "Monday 8:00, weekly content run",
    "Brand voice guide",
    "Last week’s results",
    "Find topics and trends in parallel, then draft the week",
    "Finds what buyers search for and ask AI",
    "Search Console",
    "AI answer tracker",
    "Collects competitor and trend notes",
    "Web search",
    "Drafts five posts and one blog",
    "Claims have sources",
    "Matches brand voice",
    "No copyrighted images",
    "Right sizes for each channel",
    "Human in the loop · Marketing lead",
    "Approve this week’s posts?",
    "Posts scheduled for the week, results tracked",
    "Every agent reads and writes here: Topic list · Trend notes · Week of drafts",
    "Social media content",
    "Customer Experience →",
    "Finance & Reporting →",
    "Operations & Admin →",
    "Design Operations →"
  ],
  "dept-cx": [
    "Customer support, onboarding and progress updates. Pick a solution to see how it works and how to buy it.",
    "Customer Experience AI chat and voice support Answer common questions. A person handles the rest. →",
    "Customer Experience Client onboarding Collect forms, contracts and setup details automatically. →",
    "Customer Experience Client progress updates Send clients a clear weekly update without writing it yourself. →",
    "Customer Experience, step by step.",
    "A customer asks “Where is my order?”",
    "Help centre",
    "Order system",
    "Find the answer, check the order, reply",
    "Finds the answer in your help centre",
    "Checks the order and drafts a reply",
    "Shopify",
    "Intercom",
    "Answer matches your docs",
    "No other customer’s data",
    "Refund rules followed",
    "Clear, polite tone",
    "Human in the loop · Support agent",
    "Approve this reply?",
    "Answered, ticket logged",
    "Every agent reads and writes here: Matching article · Draft reply",
    "AI chat and voice support",
    "Sales & Marketing →",
    "Finance & Reporting →",
    "Operations & Admin →",
    "Design Operations →"
  ],
  "dept-bizops": [
    "Weekly reporting and invoice follow-up. Pick a solution to see how it works and how to buy it.",
    "Finance & Reporting Reporting and dashboards Get your key numbers every Monday, pulled from your tools. →",
    "Finance & Reporting Invoice reminders Follow up on unpaid invoices automatically and politely. →",
    "Finance & Reporting, step by step.",
    "Your rules and templates",
    "Split the job, run the agents, check, get approval",
    "Facts match sources",
    "Follows your rules",
    "No personal data exposed",
    "Safe to send or publish",
    "Human in the loop · You",
    "Approve the result?",
    "Every agent reads and writes here: Results of step 1 · Results of step 2",
    "Reporting and dashboards",
    "Sales & Marketing →",
    "Customer Experience →",
    "Operations & Admin →",
    "Design Operations →"
  ],
  "dept-admin": [
    "Data entry, tool integrations, phone calls and meeting notes. Pick a solution to see how it works and how to buy it.",
    "Operations & Admin Admin and data entry Stop copying data between tools and chasing routine tasks. →",
    "Operations & Admin Tool integrations Connect your CRM, billing and project tools so data stays in sync. →",
    "Operations & Admin Automated phone calls Call customers automatically about bookings, delays and renewals. →",
    "Operations & Admin Meeting notes and follow-ups Get notes, action items and follow-ups after every meeting. →",
    "Operations & Admin, step by step.",
    "Your rules and templates",
    "Split the job, run the agents, check, get approval",
    "Facts match sources",
    "Follows your rules",
    "No personal data exposed",
    "Safe to send or publish",
    "Human in the loop · You",
    "Approve the result?",
    "Every agent reads and writes here: Results of step 1",
    "Admin and data entry",
    "Sales & Marketing →",
    "Customer Experience →",
    "Finance & Reporting →",
    "Design Operations →"
  ],
  "dept-designops": [
    "Request intake, asset resizing and design QA. Pick a solution to see how it works and how to buy it.",
    "Design Operations Design request intake Every design request arrives with a brief, assets and a deadline. →",
    "Design Operations Asset resizing and variants Create every size and format from one approved design. →",
    "Design Operations Design QA and handoff Check specs and accessibility before designs reach developers. →",
    "Design Operations, step by step.",
    "Your rules and templates",
    "Split the job, run the agents, check, get approval",
    "Facts match sources",
    "Follows your rules",
    "No personal data exposed",
    "Safe to send or publish",
    "Human in the loop · You",
    "Approve the result?",
    "Every agent reads and writes here: Results of step 1 · Results of step 2",
    "Design request intake",
    "Sales & Marketing →",
    "Customer Experience →",
    "Finance & Reporting →",
    "Operations & Admin →"
  ]
};

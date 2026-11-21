// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html): ORC, orcHTML, runOrc,
// runAgents, sageCheck, waitHuman, orcAct, memFlash, twStage.
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).
// Used by the homepage "See the team at work" tabs (Phase 4) and later by solution and department pages.
//
// Spec fields (prototype names kept): trig = trigger, ctx = context it reads, plan = orchestrator plan,
// ag = agents in order ({ id, t: task, tools, mem: what it saves, dep: index or indexes it waits for }),
// checks = Sage checks, flag = [index of the check that fails, what went wrong, how it is fixed],
// who = the person who approves, ask = the approval question, out = the outcome.
// Strings with {placeholders} are templates; the text around each placeholder is verbatim.

export const orchestrations = {
  "leads-go-cold": {
    "trig": "New enquiry from your website form",
    "ctx": ["HubSpot contact", "Past emails"],
    "plan": "Research the company, draft a reply, check it, get approval",
    "ag": [
      { "id": "scout", "t": "Researches Acme Ltd", "tools": ["Web search", "LinkedIn"], "mem": "Company profile" },
      { "id": "relay", "t": "Drafts a personal reply", "tools": ["Gmail", "HubSpot"], "mem": "Draft reply", "dep": 0 }
    ],
    "checks": ["Facts match sources", "On-brand tone", "No personal data exposed", "No unapproved promises"],
    "flag": [3, "The reply offers a 20% discount you haven’t approved", "Relay removes the discount"],
    "who": "Sales lead",
    "ask": "Send this reply to Acme Ltd?",
    "out": "Reply sent in 4 minutes, logged in HubSpot"
  },
  "consistent-posting": {
    "trig": "Monday 8:00, weekly content run",
    "ctx": ["Brand voice guide", "Last week’s results"],
    "plan": "Find topics and trends in parallel, then draft the week",
    "ag": [
      { "id": "beacon", "t": "Finds what buyers search for and ask AI", "tools": ["Search Console", "AI answer tracker"], "mem": "Topic list" },
      { "id": "scout", "t": "Collects competitor and trend notes", "tools": ["Web search", "Meta Ad Library"], "mem": "Trend notes" },
      { "id": "quill", "t": "Drafts five posts and one blog", "tools": ["Notion", "Canva"], "mem": "Week of drafts", "dep": [0, 1] }
    ],
    "checks": ["Claims have sources", "Matches brand voice", "No copyrighted images", "Right sizes for each channel"],
    "flag": [0, "A statistic in post 3 has no source", "Quill swaps in a sourced figure"],
    "who": "Marketing lead",
    "ask": "Approve this week’s posts?",
    "out": "Posts scheduled for the week, results tracked"
  },
  "slow-replies": {
    "trig": "A customer asks “Where is my order?”",
    "ctx": ["Help centre", "Order system"],
    "plan": "Find the answer, check the order, reply",
    "ag": [
      { "id": "beacon", "t": "Finds the answer in your help centre", "tools": ["Help centre", "Notion"], "mem": "Matching article" },
      { "id": "relay", "t": "Checks the order and drafts a reply", "tools": ["Shopify", "Intercom"], "mem": "Draft reply", "dep": 0 }
    ],
    "checks": ["Answer matches your docs", "No other customer’s data", "Refund rules followed", "Clear, polite tone"],
    "flag": [2, "The customer wants a refund above your limit", "Routed to a person instead of auto-sending"],
    "who": "Support agent",
    "ask": "Approve this reply?",
    "out": "Answered in 40 seconds, ticket logged"
  },
  "proposals": {
    "trig": "Sales call with Acme Ltd ends",
    "ctx": ["Call transcript", "Price list"],
    "plan": "Pull call notes, write the proposal, check pricing",
    "ag": [
      { "id": "scout", "t": "Pulls call notes and client details", "tools": ["Zoom", "HubSpot"], "mem": "Call summary" },
      { "id": "quill", "t": "Writes the proposal from your template", "tools": ["Google Docs", "Price list"], "mem": "Draft proposal", "dep": 0 }
    ],
    "checks": ["Prices match your price list", "Scope matches the call", "Your standard terms used", "Client details correct"],
    "flag": [0, "One line item is priced below your floor", "Quill corrects the price"],
    "who": "Account owner",
    "ask": "Send this proposal for signature?",
    "out": "Proposal sent for e-signature the same day"
  }
};

// Panel labels, status lines and run-log messages.
export const orchestrationText = {
  "run": "Run it ▶",
  "flagToggle": "Simulate a safety flag",
  "labels": {
    "trigger": "Trigger",
    "context": "Context it reads",
    "orchestrator": "Orchestrator",
    "orchestratorTask": "Plans the work and assigns agents",
    "sage": "Safety checks · Sage",
    "human": "Human in the loop · {who}",
    "outcome": "Outcome",
    "memory": "Shared memory",
    "memoryIntro": "Every agent reads and writes here: {mems}",
    "memorySaved": "Saved: {mem}",
    "log": "Run log",
    "logEmpty": "Press “Run it” to watch the agents work."
  },
  "actions": { "approve": "Approve", "edit": "Edit", "reject": "Reject" },
  "status": {
    "ready": "Ready",
    "running": "Running",
    "checks": "Safety checks running",
    "flagged": "Flag raised: sent back",
    "yourTurn": "Your turn: approve, edit or reject",
    "replanning": "Re-planning with your note",
    "done": "Done. Run it again or try a safety flag."
  },
  // Run log: [who, text]. The log clock starts at 10:42:00 and moves 2-7 seconds per line
  // (1 second with reduced motion), as in the prototype.
  "log": {
    "trigger": ["Trigger", "{trig}"],
    "context": ["Context", "Reads {ctx}"],
    "plan": ["Orchestrator", "Plan: {plan}"],
    "parallel": ["Orchestrator", "Runs {names} in parallel"],
    "assign": ["Orchestrator → {agent}", "{task}"],
    "uses": ["{agent}", "Uses {tools}"],
    "saves": ["{agent}", "Saves “{mem}” to shared memory"],
    "flag": ["Sage ⚠", "{problem}"],
    "fix": ["{agent}", "{fix}"],
    "recheck": ["Sage", "Re-checked: passes now"],
    "passed": ["Sage", "All {count} checks passed"],
    "waiting": ["Waiting for {who}", "{ask}"],
    "rejected": ["You", "Rejected with a note: “Make it shorter”"],
    "replan": ["Orchestrator", "Re-plans and sends it back to {agent}"],
    "edited": ["You", "Edited the draft"],
    "applyEdit": ["{agent}", "Applies your edit and remembers the preference"],
    "preference": "Your preference",
    "approved": ["You", "Approved"],
    "done": ["Done", "{out}"],
    "doneEdited": " (with your edits)",
    "monitoring": ["Monitoring", "Logged for audit. Results reviewed in your monthly check-in."]
  },
  // Joins lists inside messages ("Web search and LinkedIn", "Scout and Beacon").
  "and": " and ",
  // Tab footer: "{blueprint title} · typically live in {timeline}" + link to the solution.
  "footer": "{blueprint} · typically live in {timeline}",
  "seeSolution": "See this solution"
};

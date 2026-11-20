// Extracted verbatim from the Xvox Labs HTML prototype v5 (index.html).
// Do not reword, shorten or remove content without approval (see BUILD_PLAN.md).

export const checks = [
  {
    "name": "Security",
    "text": "Exposed keys, login and access, open database rules, agent permissions, prompt injection."
  },
  {
    "name": "Reliability",
    "text": "Wrong answers, missing guardrails, failure handling, runaway loops and costs."
  },
  {
    "name": "Responsible AI",
    "text": "Privacy, consent, AI disclosure, bias, data retention, GDPR and EU AI Act risk."
  },
  {
    "name": "Usability",
    "text": "Can real people use it? Onboarding, error states, accessibility, trust signals."
  },
  {
    "name": "Readiness",
    "text": "Logging, monitoring, cost per run and behaviour at scale."
  }
];

export const selfCheckQuestions = [
  {
    "check": 0,
    "question": "Are all API keys and secrets kept out of the code and the browser?"
  },
  {
    "check": 0,
    "question": "Can each user only see their own data?"
  },
  {
    "check": 1,
    "question": "Do you test what happens when the AI gives a wrong answer?"
  },
  {
    "check": 1,
    "question": "Is there a spending or rate limit on AI calls?"
  },
  {
    "check": 2,
    "question": "Do users know they are talking to an AI?"
  },
  {
    "check": 2,
    "question": "Do you know what personal data the AI can see?"
  },
  {
    "check": 3,
    "question": "Have at least five real users tried it without help?"
  },
  {
    "check": 3,
    "question": "Does it tell people what to do when something fails?"
  },
  {
    "check": 4,
    "question": "Do you log what the AI did and why?"
  },
  {
    "check": 4,
    "question": "Would you know within an hour if it broke?"
  }
];

// Runtime text of the Safe AI self-check, extracted verbatim from the Xvox Labs HTML prototype v5
// (index.html: SCQ, drawSC and the self-check handlers). These strings are built by the prototype's
// JavaScript, so they are not part of the extracted page blocks in data/pages/self-check.js.
// The questions and the five check areas live in data/safe-ai.js.
// Demo mode (decision D3): the prototype's "Result saved" / "emailed" confirmation is not used; the page
// shows the site's demo note instead (data/site.js leadForm.done.demoNote).

export const selfCheckText = {
  answers: [
    { label: "Yes", value: 2 },
    { label: "Not sure", value: 1 },
    { label: "No", value: 0 },
  ],
  maxPerArea: 4,
  maxTotal: 20,
  progress: "Question {n} of {total} · {area}",
  answerGroup: "Answer",
  back: "← Back",
  retake: "Retake the check ↻",
  result: "Your result · {score} / 20",
  verdictLabel: "Verdict:",
  note: "A self-check is a starting point, not a review.",
  next: "Recommended next step",
  book: "Book a {package} →",
  bookAbout: "Safe AI Review",
  bookPath: "{package} (self-check {score}/20)",
  emailLabel: "Email me this result",
  emailPlaceholder: "you@company.com",
  emailSubmit: "Send",
  invalidEmail: "Add a valid email.",
  // Verdict bands (prototype: tot >= 16, tot >= 10, otherwise). `tint` is a design token name.
  verdicts: [
    { min: 16, label: "Close to ready", tint: "p3", package: "Quick Scan", text: "A Quick Scan confirms it and catches what a self-check can’t.", packageText: "Automated checks plus an expert pass. 3–5 days." },
    { min: 10, label: "Ship with fixes", tint: "p2", package: "Full Review", text: "A Full Review finds the gaps and gives you a fix plan.", packageText: "Hands-on testing, report and walkthrough call. 1–2 weeks." },
    { min: 0, label: "Not ready yet", tint: "p1", package: "Full Review", text: "A Full Review, then a Fix Sprint, is the safest path.", packageText: "Hands-on testing, report and walkthrough call. 1–2 weeks." },
  ],
};

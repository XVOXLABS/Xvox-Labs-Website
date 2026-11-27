# AGENTS.md — Xvox Labs Website: rules for every coding agent

Read this file before any task. Then read [`CLAUDE.md`](CLAUDE.md) (project knowledge, progress, decisions, next action) and [`BUILD_PLAN.md`](BUILD_PLAN.md) (roadmap, design system, URL map, acceptance criteria). These rules apply to every AI coding agent (Claude Code, Codex, Cursor, Copilot and others).

## A. Project identity

- **Project:** the official Xvox Labs company website. Xvox Labs builds AI agents, automation and software for businesses (agents, services and a marketplace of ready-made blueprints, skills, automation packs, tools and templates).
- **Repository:** `XVOXLABS/Xvox-Labs-Website` (GitHub, remote `origin`).
- **Framework:** Next.js App Router (file-based routing, multi-page).
- **Language:** JavaScript only (`.js` / `.jsx`), React components.
- **Styling:** CSS Modules per component + `app/globals.css` for foundations and design tokens.
- **Direction:** premium, modern, professional and corporate.

## B. Non-negotiable rules

**Technology**
- No TypeScript. No Tailwind, Bootstrap or React Router. No Python or Java.
- Do not install, remove or upgrade any package without explicit approval. No animation library (approved): motion uses CSS and small React hooks.

**Safety**
- Never touch `.env`, secrets or credentials files without asking.
- Never discard, reset, clean, stash-drop or overwrite existing uncommitted work. Review existing work before changing it.
- Never delete files outside the current task's scope.
- No `git push --force` without explicit confirmation.
- No commit, push, merge, branch change, remote change or change to `main` without explicit approval for that action.
- No deployment, redeploy, promotion, new Vercel project or repository, or change to Vercel settings without explicit approval for that action. The owner performs deployments and promotions in the Vercel dashboard; current deployment status lives in `CLAUDE.md` §12, not here.

**Contact form and email**
- Never claim an email was sent unless the server confirms success. The server's confirmation means the provider accepted the message; call delivery verified only after a real message is confirmed in the inbox.
- Never expose Resend API keys or other secrets in browser code, logs, Git commits or documentation. Keep email credentials and sending code on the server.
- Never log form message contents, personal details, request bodies or any other submitted data. A log line may hold only a status code, a fixed description or an error name, never a provider or exception message.
- When changing the contact API, preserve its validation and security protections: server validation and sanitising, HTML escaping, hidden trap field, minimum fill time, same-origin and content-type checks, size limit, rate limit, duplicate-send protection and generic error responses.
- Never change environment variables, DNS or email configuration (provider, sender, recipient, sending switch) without explicit approval.
- Keep the contact form in demo mode unless both `RESEND_API_KEY` and `CONTACT_FORM_ENABLED=true` are configured.
- Never enable live email sending (Preview or Production) before the domain is verified in Resend and the privacy notice is approved. A delivery test on a local machine that the owner asks for (for example with the temporary test sender) is not live sending.
- The final sender and recipient are `hello@xvoxlabs.com` (`data/contact.js`). `CONTACT_FORM_FROM` and `CONTACT_FORM_TO` are temporary test overrides: set them only on a local machine, never in Vercel and never in a committed file.
- Never commit `.env.local` or any other env file (`.gitignore` excludes `.env*`).

**Content and design**
- Never invent business information, pricing, claims or functionality. If something is missing, ask.
- Do not change approved designs, content, wording, prices or behaviour without approval.
- Content lives in `data/` (copied verbatim from the prototype); never type content inside components. Approved removals and rewordings are noted at the top of the changed files.
- Design values live as tokens in `app/globals.css`; components use tokens, not new raw values, unless the value is documented.
- Demo mode: where there is no approved backend, forms, the quiz, the cart and the checkout never claim that something was sent, saved, emailed, ordered or paid. Use the demo wording (“Demo mode: nothing was stored in this view.”). The contact form (approved backend) may say a message was sent only after the server confirms that the email provider accepted it; while sending is switched off it stays in demo mode. API keys are read only on the server from environment variables; never hardcode them. Never store visitor submissions without approval, and never log them. See `CLAUDE.md` §8.
- Logo: use the owner-supplied file `public/brand/xvox-logo.png` exactly as it is (no recolouring, redrawing, cropping or re-saving). It appears in the header only; the footer keeps the text “Xvox Labs” unless the owner approves otherwise.
- Purchase UI is switched off (FINAL-1, executed Nov 25, 2026): `PURCHASE_ENABLED = false` in `lib/commerce.js`. New or changed pages show no money amounts, cart, buy or payment UI; purchase actions are **“Contact Our Team”** linking to `/book`. The Pricing page, its route and its navigation links stay: only its amounts and purchase actions are replaced. Never remove a page to hide pricing. Keep the cart, checkout and price code, add no online payment, leave unrelated CTAs unchanged, and turn the switch on only with explicit approval. See `CLAUDE.md` §8.
- While the purchase UI is off, show no published or sample prices (descriptive copy such as “Free” stays). The earlier pricing rule (only **Free** and **$1,500**, otherwise **“Contact Us to Discuss Pricing”**) applies again if the switch is turned on. Original prices stay in `data/`. See `CLAUDE.md` §8.

**Core behaviour**
1. Don't assume. Don't hide confusion. Surface trade-offs.
2. Minimum code that solves the problem. Nothing speculative.
3. Touch only what you must. Clean up only your own mess.
4. Define success criteria. Loop until verified.

**How the owner works**
- Claude and Codex work sequentially, with one active agent at a time. At every switch, the outgoing agent records completed work, changed files, test results and pending tasks in `CLAUDE.md` and provides a handover summary. The incoming agent reads the project documents, checks Git status and recent commits, and continues from the existing work.
- Keep `CLAUDE.md` and this file synchronized with completed work, pending tasks, bugs, decisions and GitHub changes. Start from the “Current status” section of `CLAUDE.md`, and do not repeat completed work without a reason.
- Never modify the existing Framer website without explicit approval.
- Plan before build: confirm the approach in chat before generating files.
- Execution-ready output, not outlines or scaffolds.
- When iterating, make targeted corrections; don't rewrite the whole thing.
- Ask before assuming scope on ambiguous requests. If a task needs more than ~3 file changes, outline the plan first. Flag uncertainty instead of picking silently.

## C. Source of truth

| Source | Decides | Notes |
| --- | --- | --- |
| **User-approved decisions** | Overrides everything below | Recorded in `CLAUDE.md` §8 and `BUILD_PLAN.md`. Never change one silently |
| **Artifacts reference** (HTML prototype v5: `reference/index.html`, the git-ignored read-only copy of `D:\Downloads\Xvox Labs — Website prototype v5 (1)\`) | **What** the site contains and **how** it looks, moves and responds: content, copy, sections and order, pages, navigation, features, behaviour, layout, typography, spacing, colours, components, motion, responsive behaviour | **The only design reference.** Read-only: never modify its files. Approved exceptions are listed below |
| **Business blueprint** (`D:\Downloads\Xvox Labs — What we sell & how people buy.pdf`) | Later business decisions (B1–B13 in `BUILD_PLAN.md`) | Does not override the prototype without approval |
| **`BUILD_PLAN.md`** | Roadmap, phases, design system tables, section mapping, URL map, SEO/AEO, acceptance | Detailed plan; not edited without separate approval |
| **`CLAUDE.md`** | Project knowledge: progress, decisions, risks, next action | Updated when an approved task finishes |
| **`AGENTS.md`** | Universal workflow and rules (this file) | Changed only when rules or workflow change |
| **Actual code + Git history** | What really exists and its status | If a document says something is done but the code does not show it, the code wins: report the mismatch |

**Conflicts:** if two sources disagree (for example the prototype and the blueprint, or a plan and the code), stop and ask. Do not resolve it yourself, and never "fix" an approved decision you think is wrong: propose the change and wait.

### Design reference rules (REF-1, Nov 26, 2026)

For every design task:

1. Inspect the section in the Artifacts reference, then the matching section of the website, and compare them.
2. Separate approved, intentional differences from accidental ones. Change only confirmed accidental differences; leave what already matches. Preserve functionality, routes, content and animations; do not redesign a section to correct one element.
3. **Stop and ask** before changing anything with a conflicting or earlier approved decision, missing reference content, unclear behaviour or assets, a placeholder, or any difference that is uncertain or intentional.
4. Compare the result with the reference again, test responsive layouts and functionality, and report changed files, matches, changes and remaining differences.

Framer is **not** a design reference: do not use it unless the owner asks for it on a particular task, never mix its design decisions with the reference, and never copy the Framer site or its template.

**Approved exceptions to the reference** (keep them; details in `CLAUDE.md` §8, REF-2):

1. Font: Inter (the reference uses Geist).
2. Colour tokens: accent `#FF6038` and black `#000`.
3. Brand: the supplied Xvox Labs logo in the header; text only in the footer.
4. Prices and cart stay hidden; purchase actions are “Contact Our Team”.
5. Placeholder content and prototype-only notes stay hidden.
6. The working contact form and its email sending stay.
7. Approved accessibility and mobile usability improvements stay.
8. Every other section is compared one at a time; ask before changing any uncertain or intentional difference.
9. Unverified claims are not published, even where the reference shows them: delivery and response durations, product speed claims, example result figures and agent quotes (REF-8, REF-9). Visitor time estimates (for example the two-minute plan or the 30-minute discovery call) stay. Never restore a removed claim or invent a replacement.
10. Button colours and hover states (REF-10): primary buttons are `#0F0F0F` with white text, `#FF6038` on hover; secondary buttons are `#F0F0F0` with dark text, `#0F0F0F` on hover; the homepage hero icon is black, orange on hover. Cards, tabs, filters, text links and icon controls are not affected. Buttons on dark panels carry a thin light edge (REF-12).
11. The second homepage card’s picture is full width (FORK-1).
12. No decorative icon or dot appears before section headings: the reference’s label tiles, squares and dots are removed; the label text and its spacing stay (REF-14). Coloured dots on card labels stay.

The prototype wins on every page and section for design and layout (REF-11). Do not add visual treatments of your own; where an approved exception causes a problem, report it and ask.

## D. Mandatory workflow

1. Understand the requested task.
2. Read the relevant documentation and inspect the existing code.
3. Check `git status` and the branch; protect any uncommitted changes.
4. Identify the phase and step the task belongs to (`CLAUDE.md` §5–7).
5. Prepare a short plan.
6. List the files to be created or modified.
7. Identify dependencies and possible regressions.
8. Wait for approval when required (anything beyond a trivial fix, any decision, any commit or push).
9. Implement only the approved scope.
10. Run the relevant checks, `npm run lint` and `npm run build`.
11. Review the final diff.
12. Report results, test evidence and remaining issues honestly (failures and skipped checks included).
13. Update project documentation and progress status (section G).

## E. Section-by-section development

- Work on one approved section or step at a time. Do not start the next one automatically.
- Preserve the existing design system and reusable components; keep shared components reusable (pass content in, don't hard-code page content).
- Compare each section with the Artifacts reference (content, behaviour, look and motion) and follow the design reference rules in section C.
- Test desktop, tablet and mobile: 390, 810, 1024, 1200 and 1440 px (plus 320 px as a safety check). Breakpoints: desktop ≥ 1200, tablet 810–1199, phone < 810.
- Respect `prefers-reduced-motion`; keep content in the server HTML; keyboard and screen-reader access for every control.
- Avoid unnecessary refactoring. Do not modify completed sections or Phase 3 shared components unless required, explained and approved.

## F. Git safety

- Use the existing repository; never initialise another. Do not change remotes.
- **Branch per phase** (`phase-2-content`, `phase-3-design-system`, `phase-4-homepage`). Do not switch or create branches without approval.
- **Commits:** one reviewed commit per approved step, staging only that step's files (`git add <files>`, never `git add -A` blindly). Clear messages with prefixes `feat:`, `fix:`, `style:`, `docs:`, `chore:`. Commit only after the owner approves the diff and the message.
- **Pushes:** only when explicitly asked, normal push to the same branch name (`git push origin <branch>`). Never force push.
- **`main`:** protected. Merges go through review and require the owner's approval of the phase and explicit approval for the merge.
- Do not commit secrets, `.env*`, `node_modules/`, `.next/`, or the git-ignored `reference/` folder.

## G. Documentation sync

- When an approved task is **finished and verified**, update the progress, decisions and next action in `CLAUDE.md`, and propose matching updates to `BUILD_PLAN.md` (it is edited only with approval).
- Update `AGENTS.md` only when universal rules or the workflow change.
- When reporting changed files, list every file (expand untracked directories) and state the count, so manifests and counts agree.
- Never mark planned, partial or untested work as complete. Use "in progress" and list what is left.
- The latest verified test results, known failures and test script locations are in `CLAUDE.md` “Current status” (Nov 27, 2026, with REF-14: 16,930 of 16,990 checks; 46 outdated expectations, 10 known defects, 4 fade-in flags). A copy of the scripts and logs is in `D:\Xvox Labs\Xvox-Labs-testing\`. When a test expects a superseded design, report it separately from defects; never delete or overwrite the original script, and never change unrelated components only to make a test pass.
- Record every new approved decision (with its ID and date) in `CLAUDE.md` §8.
- Keep the three files consistent; link to details instead of copying them.

`next.config.mjs` sets `agentRules: false` so `next dev` does not write its own block into this file. Keep it.

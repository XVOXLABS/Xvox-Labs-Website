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

**Content and design**
- Never invent business information, pricing, claims or functionality. If something is missing, ask.
- Do not change approved designs, content, wording, prices or behaviour without approval.
- Content lives in `data/` (copied verbatim from the prototype); never type content inside components.
- Design values live as tokens in `app/globals.css`; components use tokens, not new raw values, unless the value is documented.
- Demo mode: while the site is frontend-only, forms, the quiz, the cart and the checkout never claim that something was sent, saved, emailed, ordered or paid. Use the demo wording ("Demo mode: nothing was stored in this view.") until a backend is approved (Phase 8). See `CLAUDE.md` §8 (D3).
- Purchase actions: the Add to Cart / Pay / Buy to Contact Us change (FINAL-1) is implemented only after all planned phases and final QA are complete. Keep the cart code, add no online payment and leave unrelated CTAs unchanged. See `CLAUDE.md` §8.
- For published pricing, show only **Free** (AI plan) and **$1,500** (published blueprints). Use **"Contact Us to Discuss Pricing"** for other offers. Preserve the original prototype sample prices and draft pricing notes as labeled, approved team-review content. See `CLAUDE.md` §8.

**Core behaviour**
1. Don't assume. Don't hide confusion. Surface trade-offs.
2. Minimum code that solves the problem. Nothing speculative.
3. Touch only what you must. Clean up only your own mess.
4. Define success criteria. Loop until verified.

**How the owner works**
- Claude and Codex work sequentially, with one active agent at a time. At every switch, the outgoing agent records completed work, changed files, test results and pending tasks in `CLAUDE.md` and provides a handover summary. The incoming agent reads the project documents, checks Git status and recent commits, and continues from the existing work.
- Plan before build: confirm the approach in chat before generating files.
- Execution-ready output, not outlines or scaffolds.
- When iterating, make targeted corrections; don't rewrite the whole thing.
- Ask before assuming scope on ambiguous requests. If a task needs more than ~3 file changes, outline the plan first. Flag uncertainty instead of picking silently.

## C. Source of truth

| Source | Decides | Notes |
| --- | --- | --- |
| **User-approved decisions** | Overrides everything below | Recorded in `CLAUDE.md` §8 and `BUILD_PLAN.md`. Never change one silently |
| **HTML prototype v5** (`D:\Downloads\Xvox Labs — Website prototype v5 (1)\`, read-only copy in git-ignored `reference/index.html`) | **What** the site contains: content, copy, sections and order, pages, navigation, features, behaviour | Read-only. Never modify its files |
| **Framer reference** (https://rational-happen-962580.framer.app/) | **How** it looks and moves: visual theme, typography, spacing, components, motion, responsive behaviour | Inspiration only. Never copy its content, branding, assets, template source or structure |
| **Business blueprint** (`D:\Downloads\Xvox Labs — What we sell & how people buy.pdf`) | Later business decisions (B1–B13 in `BUILD_PLAN.md`) | Does not override the prototype without approval |
| **`BUILD_PLAN.md`** | Roadmap, phases, design system tables, section mapping, URL map, SEO/AEO, acceptance | Detailed plan; not edited without separate approval |
| **`CLAUDE.md`** | Project knowledge: progress, decisions, risks, next action | Updated when an approved task finishes |
| **`AGENTS.md`** | Universal workflow and rules (this file) | Changed only when rules or workflow change |
| **Actual code + Git history** | What really exists and its status | If a document says something is done but the code does not show it, the code wins: report the mismatch |

**Conflicts:** if two sources disagree (for example the prototype and the blueprint, or a plan and the code), stop and ask. Do not resolve it yourself, and never "fix" an approved decision you think is wrong: propose the change and wait.

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
- Compare each section with the prototype (content, behaviour) and the Framer reference (look, motion).
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
- Record every new approved decision (with its ID and date) in `CLAUDE.md` §8.
- Keep the three files consistent; link to details instead of copying them.

`next.config.mjs` sets `agentRules: false` so `next dev` does not write its own block into this file. Keep it.

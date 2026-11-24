@AGENTS.md

# CLAUDE.md — Xvox Labs Website: project knowledge

`AGENTS.md` (imported above) holds the rules and workflow every agent must follow. This file holds what the project is, what is done, what is approved and what comes next. Detailed design tables, the section mapping, the URL map and the roadmap live in [`BUILD_PLAN.md`](BUILD_PLAN.md); this file links to them instead of copying them.

Last verified against the code and Git: **Nov 24, 2026**, branch `phase-4-homepage`, HEAD `5f5cd06`.

## 1. Project overview

- **Xvox Labs:** AI automation and software development company. It sells AI agent teams for business problems (sales, support, finance, operations, design ops), expert services, and a marketplace of ready-made blueprints, Claude skills, automation packs, micro tools and templates. Six named agents: Scout (research), Quill (content), Beacon (search), Relay (outreach), Sage (safety), Reel (video); Vox is the planning chat assistant.
- **Goal:** rebuild the approved HTML prototype v5 as the official multi-page website, premium, modern, professional and corporate, in the visual language of the earlier Framer site.
- **Stack (verified in `package.json`):** Next.js 16.4.6 (App Router, Turbopack), React 19.3.0, ESLint 9 + `eslint-config-next`. JavaScript only, `jsconfig.json` `@/*` alias. CSS Modules + `app/globals.css`. Inter via `next/font/google`. No other dependencies.
- **Scripts:** `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.

## 2. Design system and brand

All tokens are in `app/globals.css` (measured from Framer, see `BUILD_PLAN.md` "Framer design system").

| Area | Approved value |
| --- | --- |
| Colours | Background `#FAFAFA`, surface `#FFFFFF`, frame `#EDEDED`, ink `#0F0F0F`, muted ink `rgba(15,15,15,.6)`, dark `#121212`, black `#000`, on-dark `#FAFAFA`, **accent `#FF6038`**. Agent tints: p1 `#ECE9F7`, p2 `#F6ECE6`, p3 `#E7F1E3`, p4 `#E5EBF6` |
| Typography | **Inter** for everything (SIL OFL 1.1, `next/font/google`). Switzer and Geist are not used. Stepped scale (desktop / tablet / phone): display 104 / 72 / 37, h1 60 / 48 / 38, h2 44 / 36 / 30, h3 32 / 28 / 24, lead 20/28 → 18/25.2. System monospace (`ui-monospace, Menlo, monospace`) only for Vox labels and the orchestration run log |
| Layout | Breakpoints: desktop ≥ 1200, tablet 810–1199, phone < 810. Content width 1136 px. Side gutter 32 / 24 / 20. Section spacing 110 / 96 / 56. Header 72 px + 10 px offset |
| Shape | Radii: frame 32 (24 on phone), card 24, panel 20, row 16, pill 14, badge 12, button 10, small button 8, tab 9, tag 5 |
| Pattern | White cards inside light-grey frames; dark agent stage panels; pill tabs (active `#111`, inactive `#F0F0F0`) |
| Logo | **Option C** (orange striped sphere + XVOX wordmark), used exactly as supplied. **File not yet provided:** slot in `lib/brand.js` (`src: null`), file goes in `public/brand/` (does not exist yet). Until then the header shows the accessible name "Xvox Labs" only. Never substitute, recolour or redraw it |
| Footer wordmark | `XVOX LABS`, accent gradient, 17.2cqw |
| Motion | CSS transitions/keyframes, `position: sticky`, `IntersectionObserver` and one `requestAnimationFrame` scroll loop per effect; animate only `transform`/`opacity`; `prefers-reduced-motion` respected (global rule in `globals.css`); H1 never hidden (LCP) |
| Responsive | Checked at 390, 810, 1024, 1200, 1440 (+320). No horizontal overflow; no `100vw` full-bleed |
| References | Prototype = content and behaviour; Framer = look and motion only (inspiration, never copied) |

All approved Phase 3 visual corrections are listed in `BUILD_PLAN.md` ("Visual corrections after the side-by-side Framer review").

## 3. Architecture (actual repository)

```text
app/            layout.js (Inter, header/footer shell, metadata), page.js (homepage), globals.css (tokens),
                style-guide/ (noindex component gallery). Only routes today: / and /style-guide
components/
  layout/       Header, MegaMenu, MobileMenu, Footer, Logo, CartDrawer, Toast, VoxChat  (Phase 3, shared)
  ui/           Accordion, Badge, Button, Card, Category, Container, Dialog, Frame, IconButton, Price,
                Section, SectionHeader, Tabs, Tag                                        (Phase 3, shared)
  motion/       Appear, CountUp, Marquee, StickyStage                                     (Phase 3)
  sections/home/    one folder per homepage section (Name.jsx + Name.module.css)
  sections/shared/  sections reused by later pages: AgentPopup, ClosingCta, Orchestration, RevealWords,
                    SectionHead (+ BuyingLadder, ItemCard, MarketplaceFeatured: Step 6, uncommitted)
hooks/          useInView, useReducedMotion, useScrollProgress
lib/            actions (open Vox / cart events), agentImages (image sizes), brand (logo slot), cart
                (localStorage cart + toast events), content (homeSection/block/fill helpers), navigation,
                orchestration (Step 5 run engine), preference (saved /book topic), pricing (price rule)
data/           verbatim prototype content: agents, departments, solutions, services, pricing, marketplace,
                faq, navigation, site, safe-ai, vox, how-it-works, orchestration; pages/ (26 page files)
public/images/  25 prototype images (agents/ holds 14 agent stills + animations)
docs/CONTENT_INVENTORY.md   internal inventory, internal-only prices, route map
reference/      git-ignored: prototype copy and visual-review screenshots (local only)
```

- **Components:** `Name.jsx` + `Name.module.css`; `"use client"` only when state, events or motion are needed. Shared `ui/` components hold no business content.
- **State:** no state library. Cart in `localStorage` (`xvox-cart`) via `useSyncExternalStore`; saved booking topic in `sessionStorage` (`xvox-topic`); cross-component actions via window events (`xvox:toast`, `xvox:open-cart`, `xvox:open-vox`, `xvox:topic`).
- **Routing:** planned routes are in `BUILD_PLAN.md` "URLs"; links in `data/` already use them (`href` + original `prototypeHref`). Pages other than `/` are Phase 5, so many links 404 today (accepted).

## 4. Homepage sections (prototype order)

Data source: `data/pages/home.js` (section `index` in brackets). "Done" = committed and reviewed.

| # | Section | Component | Status |
| --- | --- | --- | --- |
| 1 | Hero sequence "Your business, run by AI agents." + agent popup [0] | `home/HeroSequence`, `shared/AgentPopup` | Done (Step 3, `27f36ac`) |
| 2 | Puzzle "Each agent is one piece of the puzzle." [1] | `home/PuzzleStage` | Done (Step 4, `73f81fc`) |
| 3 | Tools strip "Works inside the tools you already use" [2–3] | `home/ToolsStrip` | Done (Step 2, `77056b7`) |
| 4 | "What's getting in your way?" department tiles [4] | `home/ProblemTiles` | Done (Step 2) |
| 5 | "I need a team." / "I need one thing." [5] | `home/ForkCards` | Done (Step 2) |
| 6 | "Real orchestration. Watch it run." [6] | `home/TeamAtWork`, `shared/Orchestration`, `lib/orchestration.js` | Done (Step 5, `5f5cd06`) |
| 7 | "Audit, build, live. Then we stay on." [7] | `home/HowSteps` | Done (Step 2) |
| 8 | "Expert work, when you need people too." [8] | `home/ServicePillars` | Done (Step 2) |
| 9 | "Same business. More breathing room." [9] | `home/WeekCompare` | Done (Step 2) |
| 10 | "Your data, your rules, your approval." [10] | `home/SafeAiBox` | Done (Step 2) |
| 11 | Proof "See the work before you buy." [11] | — | **Hidden** (Phase 2 decision; content kept in data) |
| 12 | Ways to buy "From a free plan to fully run for you." [12] | `shared/BuyingLadder` + `home/WaysToBuy` | **In progress (Step 6)** |
| 13 | Marketplace "Or take the ready-made version." [13] | `shared/ItemCard`, `shared/MarketplaceFeatured` + `home/MarketplacePreview` | **In progress (Step 6)** |
| 14 | FAQ "Questions technical buyers ask." [14] | — | Not started (Step 7) |
| 15 | Contact "Tell us what you are fixing." [15] | — | Not started (Step 7) |
| 16 | Closing CTA "Start with a two-minute plan." [16] | `shared/ClosingCta` | Done (Step 2) |

Design pattern per section: `BUILD_PLAN.md` "Homepage" table. Detailed specs for Steps 6–7 are in §6 and §7 below.

## 5. Completed work (verified in code and Git)

| Phase / step | Commit(s) | Content |
| --- | --- | --- |
| 1. Setup | `9ab7d7e` (Nov 20) | Next.js app, docs. On `main` |
| 2. Content | `855ea2e`, `932401b`, `33b673f` (Nov 21) | All prototype content in `data/` verbatim (9,261 text blocks verified), 25 images, `docs/CONTENT_INVENTORY.md`, route map |
| 3. Design system + layout | `c3063eb`, `4bb628d`, `45c0df1`, `3f5f248`, `0f9e96d`, `3ff0c49`, `960cb01`, `785cb55`, `c0ed4a7` (Nov 21) | Tokens, motion hooks/wrappers, UI components + `/style-guide`, header + mega menus + mobile menu, footer, cart drawer, toast, Vox guided chat (frontend only), Framer visual corrections, Inter. Open: logo file |
| 4.1 Interactive text extracted | `2e8ec90` | Puzzle states, orchestration specs (`data/orchestration.js`), popup labels, form text |
| 4.2 Shell + static sections | `77056b7` | Sections 3, 4, 5, 7, 8, 9, 10, 16; Vox widget on phones (compact button, nudge off, hidden while the footer is visible) |
| 4.3 Hero + agent popup | `27f36ac` | Pinned 240vh hero, agents fly into the sentence; popup (tabs, Buy silent add, Hire saved topic); desktop header band; `Dialog` `center` placement; `addToCart(id, { silent })` |
| 4.4 Puzzle stage | `73f81fc` | Dark panel, pinned 260 / 220 / 180vh, prototype maths, reduced-motion still layout |
| 4.5 Team at Work + Orchestration | `5f5cd06` (Nov 24) | 4 flows, waves, Sage flag, Approve/Edit/Reject, run log; log text identical to the prototype for all flows |

Phase 3 work lives on `phase-4-homepage` (branched from `phase-3-design-system` at `c0ed4a7`).

## 6. Current work — Phase 4 Step 6: Buying Ladder & Marketplace

**Status: approved for implementation, IN PROGRESS, not complete, not tested, not committed.** (Same record in `BUILD_PLAN.md` "Phase 4 — homepage steps".)

Done so far (uncommitted, unverified): `lib/cart.js` and `components/layout/Toast/Toast.jsx` (D1), `components/sections/shared/BuyingLadder/*`, `components/sections/shared/ItemCard/*`, `components/sections/shared/MarketplaceFeatured/*`.
Still to do: `components/sections/home/WaysToBuy/WaysToBuy.jsx`, `components/sections/home/MarketplacePreview/MarketplacePreview.jsx`, `app/page.js` (replace the Step 6 comment), then lint, build, every check below, screenshots and review. Do not mark it done before that.

**Section 12 ladder** (`data/pricing.js` `ladder`, footnote from home section 12):

| Step | Title | Price shown | Button |
| --- | --- | --- | --- |
| 0 | Free AI plan | Free | "Get your AI plan →" opens Vox |
| 1 | Paid audit | Contact Us to Discuss Pricing | "Book an audit →" → `/book`, saves About "Home page" / Path "Paid audit" |
| 2 | Download | $1,500 | "Browse blueprints →" → `/marketplace` |
| 3 | Implement (highlighted) | Contact Us to Discuss Pricing | "Book a call →" → `/book` + topic |
| 4 | Hire | Contact Us to Discuss Pricing (no "/ month") | "Book a call →" → `/book` + topic |
| 5 | Custom | Contact Us to Discuss Pricing | "Book a call →" → `/book` + topic |

Footnote: "**Download** means you run it. **Hire** means we run it." + "See pricing →" (`/pricing`); the "Prices marked 'to set'…" sentence stays hidden.

**Section 13 marketplace:** lead "Blueprints, Claude skills, automation packs, nano tools and templates."; tabs Featured (fixed 8: `interactive.featuredItems`), Blueprints, Claude skills, Automation packs, Micro tools, Templates (first 8 of each type in data order); cards: tinted tile (type chip, glyph, agent image), name, description, price, + / ✓ cart toggle, link `/marketplace/<id>`; "Open the marketplace ↗" → `/marketplace`; "Sample catalogue" note hidden.

**Approved decisions:** D1 "Removed from cart" toast without View cart, via `removeFromCart(id, { toast: true })`; existing calls unchanged · D2 placeholder prices show the label only (no extra Discuss Pricing button in ladder cards) · D3 ladder 6 columns ≥ 1200, 3 at 621–1199, 1 ≤ 620 · D4 stretched card link + separate controls, nothing nested · D5 shared `Tabs`, wrapping, keyboard · D6 Framer tier cards, no checklists · D7 no "/ month" without a published price · Q1 placeholder cards: "Contact Us to Discuss Pricing" is its own text link → `/book` · Q2 saved topic About = item name, Path = item type · Q3 + / ✓ toggle on every item; cart drawer keeps showing the label and "Discuss Pricing" → `/book` for unpriced items.

**Validation required:** price allow-list (only "Free" and "$1,500") and deny-list (no other `$` amounts, "/ month", "one-time", "Price to set", "TBS", "from $") on rendered text, accessible names, `title` attributes and served HTML at 5 widths; every placeholder shows the label; `/book` topics saved correctly; cart/Toast compatibility (Node test old vs new `lib/cart.js` + browser: add toast with View cart, card remove toast without it, drawer remove silent, popup Buy still silent); no nested interactive elements; tabs by keyboard; column counts incl. 620/621; no overflow or console errors; screenshots vs prototype in `reference/visual-review/phase4/step6/`; Steps 1–5 regression; lint and build.

## 7. Remaining work (in order)

**Phase 4 (homepage)**
1. Finish **Step 6** (above), review, commit on approval.
2. **Step 7 — FAQ and Contact** (sections 14–15): FAQ two columns, 7 questions from `data/faq.js` in order, all closed, independent toggles via the shared `Accordion` (`defaultOpen={-1}`, no group name), no numbering (U3), "Ask Vox →". Contact: K1–K4 applied, "Start a project" form (8 fields, options from data, prototype validation message), demo confirmation "Thanks, {name}." + "Demo mode: nothing was stored in this view." (no "Sending…", no email promise), saved-topic chip from `/book` preference.
3. **Step 8 — whole-page check:** side-by-side review page (Framer / prototype / build) at 5 widths, performance and accessibility pass, final report. Raise the deferred pointer tilt (`--mx`) and U4 here.
4. Phase 4 approval, then merge to `main` only with approval.

**Later phases** (`BUILD_PLAN.md` "Phase overview"): 5. Other pages (all prototype pages and routes) · 6. SEO & AEO (metadata, JSON-LD, sitemap, robots, `llms.txt`) · 7. Test & deploy · 8. Backend (real Vox AI, form storage, checkout; separate approval).

## 8. Approved decisions (do not change without approval)

**Phase 2 (Nov 21):** prices: only $1,500 (blueprints) and Free (AI plan) published; everything else "Contact Us to Discuss Pricing" (originals kept in `data/` `priceStatus` and the inventory) · placeholder blocks hidden (`hidden: true`), incl. homepage proof section and footer note · Studio links stay on internal `/studio` (external URL pending) · no legal placeholder text (Terms, Cookies, Marketplace Terms pending) · flat solution URLs · URL map approved.

**Phase 3 (Nov 21):** Inter replaces Switzer/Geist · accent `#FF6038` · logo Option C exactly as supplied (file pending) · footer design with `XVOX LABS` wordmark · Framer mobile navbar · no animation library · Framer/Kaviyan template = inspiration only · cart total only when every item is published · Vox guided chat frontend only, never claims a lead was sent or saved (real AI = Phase 8) · visual corrections list in `BUILD_PLAN.md`.

**Phase 4 plan (Nov 21):**
- A1 work on `phase-4-homepage`, one step per commit, approval before each commit and step.
- A2 contact confirmation "Thanks, {name}." + "Demo mode: nothing was stored in this view."
- A3 ladder footnote: "to set" sentence hidden, "Download means… Hire means… See pricing →" kept.
- A4 pinned lengths: hero 240vh; puzzle 260vh, 220vh at 601–640px, 180vh ≤ 600px.
- A5 links use planned routes even before Phase 5 pages exist; no temporary pages.
- A6 FAQ and contact = full prototype sections.
- K1 hide both contact chat bubbles · K2 hide "1 day / Reply target" (keep "30 min / Discovery call") · K3 form note → "Demo mode: this form doesn't send or store anything yet." · K4 closing CTA lead → "Tell Vox what is slowing you down. You get a plan."
- U2 popup Buy price comes from the blueprint data via the price rule · U3 FAQ not numbered · U4 Vox "a person from our team…" wording: deferred (review after Phase 4).
- L1–L3: $1,500 only on the Download step, published blueprints and the popup Buy button.

**Step 3 (hero):** D1 reduced motion = still non-pinned layout · D2 accent tile · D3 `/build?mission=`, `/marketplace?agent=` · D4 silent add option · D5 tags on hover and keyboard focus · popup tabs wrap · desktop header band · `Dialog` gained `placement="center"`.
**Step 4 (puzzle):** Framer panel layout (hint left, chip right, CTA strip) · tags shown > 640px · reduced motion non-pinned solved layout · centred below the 82px header · own scroll loop (no `StickyStage`) · phone layout at viewport ≤ 600px · centred eyebrow and board side inset `max(8px, 2%)`.
**Step 5 (orchestration):** dark stage with light cards · 5 columns ≥ 1200, stacked below · tabs wrap · only the status chip is announced · memory text reset each run · reduced motion keeps the run with 60ms pauses · shared engine with the 4 homepage flows only (generic fallback deferred to Phase 5) · agent name above its task · `data-state` test attributes · flag box clears on tab switch.
**Step 6:** see §6.

## 9. Known issues and risks (verified)

- Logo file not supplied (`public/brand/` missing; `lib/brand.js` `src: null`).
- `metadataBase` is the placeholder `https://example.com` (live domain pending, B12).
- Only `/` and `/style-guide` exist; links to Phase 5 routes return 404 until then (accepted, A5).
- Internal placeholder prices are in the client JavaScript (the cart imports `data/marketplace.js`); never displayed. Removing them from the bundle would be a separate approved data change.
- `BUILD_PLAN.md` was synced with this status on Nov 24, 2026 (rev. 6). Keep the three documents consistent after each step.
- Business content differences prototype vs blueprint (B1–B13 in `BUILD_PLAN.md`) are still pending.
- Deferred: U4 Vox wording; prototype pointer tilt on agent images (`--mx`), to raise at Step 8.
- There is no automated test suite in the repo; browser checks so far were run with ad-hoc headless-Chrome scripts outside the repository (not preserved).

## 10. Assets and references

- Images: `public/images/` (11 files: `banner`, `team`, `x-5`…`x-13`) and `public/images/agents/` (14: stills + `anim-*` for scout, quill, beacon, relay, sage, reel, vox), byte-identical to the prototype.
- Logo: pending (see §9). Fonts: Inter via `next/font/google`.
- Prototype: `D:\Downloads\Xvox Labs — Website prototype v5 (1)\index.html` (+ `img/`); local copy `reference/index.html` (git-ignored, no images).
- Framer: https://rational-happen-962580.framer.app/ (inspiration only).
- Business blueprint PDF: `D:\Downloads\Xvox Labs — What we sell & how people buy.pdf`.
- Visual-review screenshots per step: `reference/visual-review/phase4/stepN/` (git-ignored, local only).

## 11. Testing and QA (per step)

- `npm run lint` and `npm run build` clean.
- Browser checks at 390, 810, 1024, 1200, 1440 (+320): content matches `data/` word for word, links, interactions, keyboard, focus ring, ARIA, reduced motion, no horizontal overflow, no console errors.
- Comparison with the prototype (behaviour, text) and Framer (look) with screenshots on a review page.
- Regression of all completed steps after each step.
- Pricing allow/deny-list checks wherever prices appear.

## 12. Git and deployment status (verified Nov 24, 2026)

- Branch `phase-4-homepage`, HEAD `5f5cd06`, tracking `origin/phase-4-homepage` (0 ahead, 0 behind).
- Uncommitted: Step 6 work in progress (see §6).
- `main` = `origin/main` = `9ab7d7e` (Phase 1 only). Nothing merged.
- Remote branches: `main`, `phase-2-content` (`932401b`), `phase-4-homepage`. Local only: `phase-3-design-system` (`c0ed4a7`, contained in `phase-4-homepage`).
- Deployment: none. No hosting configured.

## 13. Next action

Finish **Phase 4 Step 6** exactly as approved in §6: create `WaysToBuy` and `MarketplacePreview`, update `app/page.js`, then run all Step 6 validation and regression checks, lint and build, capture the screenshots, and report for review. Commit only after the owner approves. Do not start Step 7 without approval.

@AGENTS.md

# CLAUDE.md — Xvox Labs Website: project knowledge

`AGENTS.md` (imported above) holds the rules and workflow every agent must follow. This file holds what the project is, what is done, what is approved and what comes next. Detailed design tables, the section mapping, the URL map and the roadmap live in [`BUILD_PLAN.md`](BUILD_PLAN.md); this file links to them instead of copying them.

Last verified against the code and Git: **Nov 24, 2026**, on `phase-4-homepage` at the pushed commit `5478e7a7d0c26b89b74eb0c0913db6af2d1c4560` (the Hero lifecycle fix on top of checkpoint `8c7d2b66f3c7d24655702700434c5e1e60c0c61d`), with Services, Agents and the pending UI fixes in the working tree.

## 1. Project overview

- **Xvox Labs:** AI automation and software development company. It sells AI agent teams for business problems (sales, support, finance, operations, design ops), expert services, and a marketplace of ready-made blueprints, Claude skills, automation packs, micro tools and templates. Six named agents: Scout (research), Quill (content), Beacon (search), Relay (outreach), Sage (safety), Reel (video); Vox is the planning chat assistant.
- **Goal:** rebuild the approved HTML prototype v5 as the official multi-page website, premium, modern, professional and corporate, in the visual language of the earlier Framer site.
- **Stack (verified in `package.json`):** Next.js 16.4.6 (App Router, Turbopack), React 19.3.0, ESLint 9 + `eslint-config-next`. JavaScript only, `jsconfig.json` `@/*` alias. CSS Modules + `app/globals.css`. Inter via `next/font/google`. No other dependencies.
- **Scripts:** `npm run dev` serves the site at the domain root. `npm run build` builds the native Next.js app, `npm run start` serves that production build locally, and `npm run lint` checks the source.

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
                style-guide/ (noindex component gallery), review/ (prototype source index),
                solutions/ (hub, five departments and 23 details),
                services/ (hub, four areas and 21 details),
                how-it-works/ (hub and six agent profiles).
components/
  layout/       Header, MegaMenu, MobileMenu, Footer, Logo, CartDrawer, Toast, VoxChat  (Phase 3, shared)
  ui/           Accordion, Badge, Button, Card, Category, Container, Dialog, Frame, IconButton, Price,
                Section, SectionHeader, Tabs, Tag                                        (Phase 3, shared)
  motion/       Appear, CountUp, Marquee, StickyStage                                     (Phase 3)
  sections/home/    one folder per homepage section (Name.jsx + Name.module.css)
  sections/shared/  sections reused by later pages: AgentPopup, ClosingCta, Orchestration, RevealWords,
                    SectionHead, BuyingLadder, ItemCard, MarketplaceFeatured
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
- **Routing.** `BUILD_PLAN.md` lists the approved URLs. Links in `data/` preserve both `href` and the original `prototypeHref`. The homepage, style guide, review index, Solutions, local Services, and local Agent routes exist. Links to pending native routes can still return 404 (A5).

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
| 12 | Ways to buy "From a free plan to fully run for you." [12] | `shared/BuyingLadder` + `home/WaysToBuy` | Done (Step 6) |
| 13 | Marketplace "Or take the ready-made version." [13] | `shared/ItemCard`, `shared/MarketplaceFeatured` + `home/MarketplacePreview` | Done (Step 6) |
| 14 | FAQ "Questions technical buyers ask." [14] | `home/Faq` | Done (Step 7) |
| 15 | Contact "Tell us what you are fixing." [15] | `home/Contact` | Done (Step 7) |
| 16 | Closing CTA "Start with a two-minute plan." [16] | `shared/ClosingCta` | Done (Step 2) |

Design pattern per section: `BUILD_PLAN.md` "Homepage" table. See §6 for Steps 6–7.

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
| Hero phone spacing follow-up | `033d29a` (Nov 24) | Phone agent gap ratio set to 0.7. Review in `reference/visual-review/hero-phone/` |
| 4.6 Buying Ladder + Marketplace | `13c67e5` (Nov 24) | Sections 12–13 and opt-in cart removal toast. See §6 for review and testing |
| 4.7 FAQ + Contact | `f14ac35` (Nov 24) | Sections 14–15 and the demo contact form. See §6 for review and testing |
| Hero lifecycle fix | `5478e7a` (Nov 24) | Guards the Hero animation callbacks (frame, scroll, resize, font load) against running after navigation detaches the section's refs. One file: `HeroSequence.jsx` |

Phase 3 work lives on `phase-4-homepage` (branched from `phase-3-design-system` at `c0ed4a7`).

## 6. Phase 4 Steps 6–7

### Step 6 — Buying Ladder & Marketplace

**Implementation and testing complete.** The owner approved the visual review and Step 6 commit on Nov 24, 2026. See `BUILD_PLAN.md` under “Phase 4 — homepage steps”.

The 11 source files match the saved review diff (`step6-full.diff`, 595 insertions and 13 deletions). `app/page.js` renders `WaysToBuy` and `MarketplacePreview` in prototype order. The sections use the shared `BuyingLadder`, `ItemCard`, and `MarketplaceFeatured` components. The cart and Toast changes implement D1.

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

**Recorded results (Nov 24, 2026).** The saved review reports passing lint, production build, cart compatibility (19/19), and Steps 1–5 regressions. The browser report records zero failures, console errors, or horizontal overflow at 390, 810, 1024, 1200, and 1440 px. It covers pricing, all six tabs (8/8/8/6/4/4 cards), booking topics, cart and Toast, and keyboard and ARIA checks. Ladder boundaries were checked at 620/621 and 1199/1200 px, and reduced motion at 390 and 1440 px. Evidence is in the [review page](reference/visual-review/phase4/step6/index.html), `step6check.json`, and the 46 screenshots in `shots/`.

The handover review used the saved suite results and ran a targeted Chrome check at 390 px against the existing production build. All eight Blueprint cards became visible when scrolled into view. In the saved mobile Blueprints comparison, only the first two cards had completed their entrance animation at capture time.

**Final pre-commit checks (Nov 24, 2026).** `npm run lint` and `npm run build` passed. The build passed outside the sandbox after the sandbox blocked worker creation.

### Step 7 — FAQ and Contact

Implementation and testing are complete. The owner approved the visual review and Step 7 commit `f14ac35` on Nov 24, 2026. `app/page.js` renders `home/Faq` and `home/Contact` after Marketplace and before the closing CTA. The FAQ reuses the shared `Accordion` for seven initially closed, independent, unnumbered rows. Contact adds the eight-field demo form, saved-topic display and Clear action, K1–K3 display rules, and the A2 confirmation. Section copy and option metadata are in `data/pages/home.js`. The original visitor Budget ranges are approved in K5.

**Verification (Nov 24, 2026).** Lint and production build passed. Headless Chrome passed all 15 check groups, covering server HTML, content and option parity, 12 responsive widths, keyboard and reduced motion, both Vox buttons, topic persistence and clearing, validation, confirmation accessibility, and zero submission requests or form-data writes. Steps 1–6 passed source parity and smoke checks. Browser logs showed the expected Phase 5 route 404s and zero unexpected errors. Review the 24 screenshots and test evidence in the [Step 7 review](reference/visual-review/phase4/step7/index.html).

**Final pre-commit checks (Nov 24, 2026).** `npm run lint` and `npm run build` passed. The build passed outside the sandbox after the sandbox blocked worker creation.

## 7. Completed review work and remaining phases

**Phase 4 Step 8.** The whole-page audit and the three major and five minor fixes are complete. The owner approved the visual review, and the fixes are included in the checkpoint in §12. Prototype pointer tilt and the separate “Who should our team reply to?” copy change remain deferred. Phase 4 sign-off and a merge to `main` still require explicit owner approval.

**Step 8 verification (Nov 24, 2026).** Hero CSS and scroll motion use stable layout origins. Cold-load CLS fell from 0.5545 to 0.0000 on three throttled 390 px Chrome runs and from 0.5629 to 0.0000 at 1440 px. The mobile scroll inset keeps the focused orchestration controls below the header. The Safe AI button, footer labels, and unlit Hero words meet 4.5:1 text contrast. Cards show at full opacity on keyboard focus, and settled axe scans at 390 and 1440 px report zero text contrast violations. Lint, production build, all 15 browser regression groups at 12 widths, and normal Hero scroll assembly at the five review widths passed. The [before/after review](reference/visual-review/phase4/step8/major-fixes/index.html) contains seven screenshot pairs.

**Step 8 minor-fix verification (Nov 24, 2026).** The phone Vox launcher steps aside when it overlaps Hero or Puzzle agent controls and restores when clear. It retains visible keyboard focus and keeps the existing footer behaviour. Phone Puzzle paths preserve selectable agent centres in scatter, assembly, reverse scroll, and reduced motion. Chrome touch taps reached Hero Sage and the correct Puzzle Relay and Sage links. Cart, Ask Vox, and all five Puzzle links have matching accessible names. The compact header controls, phone Hero CTAs, and phone orchestration tabs meet 44 px without increasing the header height. U4 removes one sentence from the greeting. The first question, reset, and complete guided demo passed.

Lint, production build, and all 15 Steps 1–7 regression groups passed. The major-fix rerun measured CLS of 0.0000 in all three throttled 390 px runs and at 1440 px. The orchestration controls stayed below the sticky header. Settled axe scans at 390 and 1440 px reported zero text-contrast and name-mismatch violations. Hero forward and reverse scroll passed at the five review widths. See the [nine before/after screenshot pairs](reference/visual-review/phase4/step8/minor-fixes/index.html).

**Later phases** (`BUILD_PLAN.md` "Phase overview"): 5. Other pages (all prototype pages and routes) · 6. SEO & AEO (metadata, JSON-LD, sitemap, robots, `llms.txt`) · 7. Test & deploy · 8. Backend (real Vox AI, form storage, checkout; separate approval).

**Team review Phase 1 (Nov 24, 2026).** Complete and included in the checkpoint in §12. `/review` indexes all 123 destinations from `data/reviewRoutes.js`. It opens the extracted source records, including unfiltered hidden blocks, computed detail copy, example conversations, proof copy and sample prices. The four legacy aliases and Vox/Hire actions work in the index. Implemented records link to the native routes, and unbuilt records display their approved paths.

**Team review Phase 2.1 (Nov 24, 2026).** Complete and included in the checkpoint in §12. The Solutions hub, five department pages and 23 solution details are implemented at the domain root. The hub filters the prototype’s 18 department solutions. The review index links to all 23 details, including four cross-category solutions and the marketing bundle. Department tabs and solution details reuse the orchestration engine with the original fallback. Proof placeholders, original draft pricing notes and marketplace sample amounts are reviewable on their pages. Consultation prices still use the approved pricing label. Other native pages are tracked in `BUILD_PLAN.md` under “Complete team review”.

**Team review Phase 2.2 (Nov 24, 2026).** Reviewed and accepted by the owner with known pending dependencies: Self-check, Marketplace and the other pending pages remain separate work, so those links keep their approved paths. The work is verified locally and is included in the team-review checkpoint commit. The Services hub, four area pages and 21 details are implemented at the domain root. The review manifest links to all 26 native routes. Booking actions retain the original context, and related cards follow the prototype’s order. The dedicated Safe AI Review includes the five checks, five packages, scored sample report and four FAQs. Draft prices and example amounts remain available alongside the approved consultation label. Self-check and other unbuilt destinations retain their approved paths.

**Team review Phase 2.3 (Nov 24, 2026).** Approved by the owner. Implemented and verified; included in the team-review checkpoint commit. `/how-it-works` and six profiles under `/how-it-works/agents/[id]` use the seven existing review records. The hub preserves the final prototype's 11 sections, including the four workflows, six-agent directory, Vox, seven banner hotspots, delivery chart, model demo and FAQ. Profiles preserve the original Persona, Skills, jobs, example week, related Solutions, marketplace item order and samples, four buying paths and teammate quick views. The manifest reports all seven routes as implemented while keeping all 123 records.

**Agent preview mobile UI fix (Nov 24, 2026).** Implemented locally and verified, awaiting owner review; not staged or committed. The popup in `components/sections/shared/AgentPopup/` now has real section headings (h3 under the agent name), a Close button that stays visible while the tall modal scrolls on phones, a visible focus ring when focus lands on the modal itself, and no focusable tabpanel around link-only Jobs and Use cases panes (`Tabs` gained an opt-in `panelFocusable: false` item flag; default behaviour is unchanged). Agent colours, copy, prices, routes and actions are unchanged. Chrome check at 320, 338, 390, 407, 810 and 1024 px for all six agents and all four tabs: 36/36 pass with no overflow or clipped text, 44 px minimum targets, scoped axe-core with zero violations, lowest measured text contrast 8.14:1, focus ring 18.36:1, Escape restores focus, and Hire, Buy, Full profile, Vox and Cart work. Reduced motion passed at 390 and 1024 px. Evidence is in the Git-ignored `reference/visual-review/agent-preview/`.

**Team review Phase 2.4 — Marketplace.** Not part of the team-review checkpoint. A local implementation of the native `/marketplace` hub and 44 `/marketplace/<id>` routes exists but awaits owner review and stays uncommitted (`app/marketplace/`, `data/marketplacePages.js` and a path rule in `data/reviewRoutes.js`). Checkout and payment are out of scope.

## 8. Approved decisions (do not change without approval)

**Phase 2 (Nov 21):** prices: only $1,500 (blueprints) and Free (AI plan) published; everything else "Contact Us to Discuss Pricing" (originals kept in `data/` `priceStatus` and the inventory) · placeholder blocks hidden (`hidden: true`), incl. homepage proof section and footer note · Studio links stay on internal `/studio` (external URL pending) · no legal placeholder text (Terms, Cookies, Marketplace Terms pending) · flat solution URLs · URL map approved.

**Team-review pricing.** Original prototype sample prices and draft pricing notes are approved review content. Preserve their original values and identify them as sample or draft where they appear in review. The published pricing rule above still applies, including “Contact Us to Discuss Pricing” for Services and Solutions. The five optional visitor Budget ranges remain as approved in K5.

**Phase 3 (Nov 21):** Inter replaces Switzer/Geist · accent `#FF6038` · logo Option C exactly as supplied (file pending) · footer design with `XVOX LABS` wordmark · Framer mobile navbar · no animation library · Framer/Kaviyan template = inspiration only · cart total only when every item is published · Vox guided chat frontend only, never claims a lead was sent or saved (real AI = Phase 8) · visual corrections list in `BUILD_PLAN.md`.

**Phase 4 plan (Nov 21):**
- A1 work on `phase-4-homepage`, one step per commit, approval before each commit and step.
- A2 contact confirmation "Thanks, {name}." + "Demo mode: nothing was stored in this view."
- A3 ladder footnote: "to set" sentence hidden, "Download means… Hire means… See pricing →" kept.
- A4 pinned lengths: hero 240vh; puzzle 260vh, 220vh at 601–640px, 180vh ≤ 600px.
- A5 links use planned routes even before Phase 5 pages exist; no temporary pages.
- A6 FAQ and contact = full prototype sections.
- K1 hide both contact chat bubbles · K2 hide "1 day / Reply target" (keep "30 min / Discovery call") · K3 form note → "Demo mode: this form doesn't send or store anything yet." · K4 closing CTA lead → "Tell Vox what is slowing you down. You get a plan."
- K5 (Nov 24, 2026) retain the optional visitor Budget field and its five original ranges in prototype order. These capture a visitor's estimated project budget. Services and Solutions use "Contact Us to Discuss Pricing" wherever pricing appears. Blueprints are the only category that can display actual product prices.
- U2 popup Buy price comes from the blueprint data via the price rule · U3 FAQ not numbered · U4 (Nov 24, 2026) remove only “A person from our team takes it from there.” from the Vox greeting.
- L1–L3: $1,500 only on the Download step, published blueprints and the popup Buy button.

**Step 3 (hero):** D1 reduced motion = still non-pinned layout · D2 accent tile · D3 `/build?mission=`, `/marketplace?agent=` · D4 silent add option · D5 tags on hover and keyboard focus · popup tabs wrap · desktop header band · `Dialog` gained `placement="center"`.
**Step 4 (puzzle):** Framer panel layout (hint left, chip right, CTA strip) · tags shown > 640px · reduced motion non-pinned solved layout · centred below the 82px header · own scroll loop (no `StickyStage`) · phone layout at viewport ≤ 600px · centred eyebrow and board side inset `max(8px, 2%)`.
**Step 5 (orchestration):** dark stage with light cards · 5 columns ≥ 1200, stacked below · tabs wrap · only the status chip is announced · memory text reset each run · reduced motion keeps the run with 60ms pauses · shared engine with the 4 homepage flows only (generic fallback deferred to Phase 5) · agent name above its task · `data-state` test attributes · flag box clears on tab switch.
**Step 6:** see §6.
**Step 8 (Nov 24, 2026):** S8-1 stabilize the Hero on first load with CLS below 0.10 on mobile and desktop · S8-2 keep mobile keyboard focus below the sticky header · S8-3 bring the identified normal-text contrast failures to at least 4.5:1. The owner approved these three fixes for implementation and review.

**Step 8 minor scope (Nov 24, 2026):** S8-4 phone launcher clearance for Hero and Puzzle agent controls · S8-5 distinguish phone Puzzle tap targets during scatter and assembly · S8-6 accessible names for Cart, Ask Vox, and Puzzle links · S8-7 44 px target minimum for the specified mobile controls · U4 greeting sentence removal.

**Team-review Phase 2.3 approval (Nov 24, 2026).** Keep the Mission Board's starting state and blueprint preview browsable in the original hub position. Full board interaction and `/build` remain planned. Preserve the original follow-up promise for final review and retain future URLs and booking context. Vox opens chat, and unknown profile IDs return 404.

**PAGES-1 (Nov 24, 2026, superseded by VERCEL-1):** prepare a temporary GitHub Pages team-review export under `/Xvox-Labs-Website`.

**VERCEL-1 (Nov 24, 2026):** use native Next.js deployment on Vercel for team review. Keep the existing GitHub repository and `phase-4-homepage` branch. Approve the repository connection, first deployment, and any Git operation separately.

## 9. Known issues and risks (verified)

- Logo file not supplied (`public/brand/` missing; `lib/brand.js` `src: null`).
- `metadataBase` uses Vercel's `VERCEL_URL` when available, with a localhost fallback. The app still requests no indexing for review. The production domain is pending (B12).
- Existing App Router pages are `/`, `/style-guide`, `/review`, the 29 Solutions routes, the 26 Services routes and the seven Agent routes. Outside the review index, links to unbuilt Phase 5 routes still return 404 (accepted, A5). Agent handoffs to `/build`, `/book`, `/marketplace`, product pages, `/pricing`, `/trust` and `/checkout` retain their planned URLs and applicable context.
- The review index exposes prototype sample prices and original copy for team review. The approved homepage applies the existing pricing rules.
- `BUILD_PLAN.md` records the checkpoint, local Services and Agent routes, and remaining team-review phases.
- Business content differences prototype vs blueprint (B1–B13 in `BUILD_PLAN.md`) are still pending.
- Deferred: prototype pointer tilt on agent images (`--mx`) and the separate Vox details prompt “Who should our team reply to?”.
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

- Branch `phase-4-homepage` tracks `origin/phase-4-homepage` at `8c7d2b66f3c7d24655702700434c5e1e60c0c61d`, the pushed checkpoint containing Step 8, the Vercel migration, Phase 1 (review index and manifest), and Phase 2.1 (Solutions). Services, Agents and the review UI refinements are in the team-review checkpoint commit (the latest commit on the branch).
- Commit `5478e7a7d0c26b89b74eb0c0913db6af2d1c4560` (Hero animation lifecycle fix, one file) is pushed on top of that checkpoint; `origin/phase-4-homepage` points to it.
- Step 8 major fixes and five minor fixes passed owner visual review and are included in the checkpoint.
- `main` = `origin/main` = `9ab7d7e` (Phase 1 only). Nothing merged.
- Remote branches: `main`, `phase-2-content` (`932401b`), `phase-4-homepage`. Local only: `phase-3-design-system` (`c0ed4a7`, contained in `phase-4-homepage`).
- **Vercel configuration.** The native Next.js setup is configured for root-domain routing and verified locally. Pages-specific config and asset wrappers were removed. The former workflow and helper are preserved byte-for-byte in the Git-ignored `reference/deployment/github-pages/` archive. The previous `out/` folder is a historical Pages artifact.
- **Vercel deployment status.** No deployment is recorded. The Vercel project connection, live preview URL, deployed revision and access settings are unverified.
- **Historical Pages verification (Nov 24, 2026).** Lint, static export and the local Chrome suite passed for the former prefixed preview. Browser coverage included six widths, Puzzle states and reduced motion, image swaps, mobile navigation, Vox, the style guide, and Cart.
- **Vercel migration verification (Nov 24, 2026).** Lint and native production build passed. The build ran outside the sandbox after it blocked worker creation. Local Chrome checked `/` and `/style-guide`, native trailing-slash handling, all 25 public images, the image optimizer, favicon and Inter. Homepage layout and Puzzle scatter, assembly and reverse scroll passed at 320, 390, 810, 1024, 1200 and 1440 px. Reduced-motion Puzzle, Hero/Puzzle/marketplace image swaps, mobile menu, guided Vox, style-guide reload and navigation home, and Cart persistence and removal passed. Unbuilt Phase 5 routes returned the expected 404s.
- **Review index verification (Nov 24, 2026).** Lint and native production build passed. The production browser check passed at 320, 390, 810, 1024, 1200 and 1440 px, including direct `/review/`, all four aliases, local and fallback Hire, Vox, and navigation home. A separate check compared all 123 paths with the final prototype router and verified rendered source copy for all indexed blocks and computed records. `git diff --check` passed.
- **Solutions verification (Nov 24, 2026).** Lint and production build passed. All 29 root-domain Solutions URLs loaded directly and on refresh in local Chrome. The hub, department, Safe AI detail and marketing bundle passed responsive checks at 320, 390, 810, 1024, 1200 and 1440 px. Chrome verified all hub filters, department workflow tabs, path navigation, Sage flag, Reject/Edit/Approve, disclosure, Blueprint cart action, Vox, booking topic and review links. An independent comparison verified all 23 orchestration specs, five department lists, related marketplace sets, rendered proof placeholders and sample amounts against the prototype.
- **Services verification (Nov 24, 2026).** Lint and production build passed. All 26 URLs loaded directly and on refresh in local Chrome. Responsive checks passed at 320, 390, 810, 1024, 1200 and 1440 px on the hub, area, standard detail and Safe AI Review. Checked invalid route pairs, cross-links with Solutions and the review index, related item cart, Vox, FAQ, report scores and the saved booking context. The original prototype and build matched for service records, area lists, related sets, draft prices and Safe AI sample copy.
- **Agents verification (Nov 24, 2026).** Lint and production build passed. All seven URLs loaded directly and on refresh, with unknown IDs returning 404. Chrome checked all seven routes at 320, 390, 810, 1024, 1200 and 1440 px. Tests covered the six profiles, 39 product placements, sample prices, Cart, saved booking context, workflow runs, seven banner actions, quick-view defaults, keyboard focus restoration, reduced-motion imagery, model feedback, FAQ, Vox and the Mission Board starting state. Fourteen axe-core scans at 390 and 1440 px reported zero violations in the tested rules. The homepage regression, all 29 Solutions and 26 Services direct-load and refresh checks, and the 123-record manifest passed.
- **Preview limits.** Contact and Vox remain demos. Live email, AI, form storage and payments require a backend. Full native prototype routes and the runtime-only review states are pending.

## 13. Next action

Await owner review of the local, uncommitted Phase 2.4 Marketplace implementation, which is excluded from the team-review checkpoint. Phase 2.2 Services and Phase 2.3 Agents are committed in that checkpoint with the known dependencies in §7. Phase 3 requires explicit approval before implementation. Commit, push, merge, Vercel repository connection and deployment each require separate explicit owner approval. Before connecting the repository, confirm the initial deployment target and access settings. Vercel treats the first deployment of a new project as production.

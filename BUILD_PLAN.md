# Xvox Labs Website — Build Plan

> **For Claude Code:** This is the build plan for the Xvox Labs website. Read it together with `CLAUDE.md` and `AGENTS.md` before any task. **What the site contains comes from the HTML prototype. How it looks and behaves comes from the Framer reference.** Always plan first and wait for approval before writing code. Anything marked **Pending approval** is not decided: ask, don't assume. Proposed folders and files are not created until a task approves them.

Version: Nov 24, 2026 (rev. 16 records Phase 3 as completed, committed and pushed in `746344f`). Rev. 15 recorded the review status of Phases 2.2 to 2.4. Rev. 14 recorded the Agent routes and the boundary of Mission Board work. Rev. 13 reconciled checkpoint, handover and deployment status. Rev. 12 (Nov 24) recorded Services. Rev. 11 (Nov 24) recorded Solutions. Rev. 10 (Nov 24) recorded the review index and route manifest. Rev. 9 (Nov 24) recorded the move to Vercel. Rev. 8 (Nov 24) recorded Step 7 implementation, visual approval, and test results. Rev. 7 (Nov 24) recorded Step 6 implementation and test results. Rev. 6 (Nov 24) synced Phase 3 and Phase 4 Steps 1–5 and recorded the approved step decisions. Rev. 5 (Nov 21) recorded the remaining Phase 3 decisions and implementation approval.

## Project references

| # | Reference | Location | Role |
| --- | --- | --- | --- |
| 1 | **HTML prototype v5** | `D:\Downloads\Xvox Labs — Website prototype v5 (1)\` (`index.html` + `img/`) | **WHAT the site contains**: all content and copy, sections and their order, pages, navigation structure, business information, features, assets and functionality. Read-only: never modify or delete its files |
| 2 | **Framer site** | https://rational-happen-962580.framer.app/ | **HOW the site looks and behaves**: visual theme, typography, colours, backgrounds, layouts, spacing, alignment, section presentation, navbar, buttons, cards, UI components, hover effects, scroll animations, transitions, interactions and responsive behaviour |
| 3 | **Business blueprint** | `D:\Downloads\Xvox Labs — What we sell & how people buy.pdf` | Business reference for later content decisions (B1–B13). It does not override the prototype's content without your approval |

**Rules**

- Never copy Framer's content, copy, branding, business information, client logos, images or page structure. Only its design language and behaviour.
- Never invent new sections or replace prototype content without approval. A Framer pattern is used only where a prototype section exists to carry it.
- Framer platform elements ("Made in Framer" badge, edit button) are not part of the design.
- The prototype's "Prototype: sitemap" developer panel is not part of the public website (decided).

**Notes on the references**

- The Framer site is the earlier Xvox Labs site, built on the commercial "Kaviyan" Framer template (its tab title still says so). The template is marked **Limited**. **Approved use (Nov 21, 2026): inspiration only.** Use its visual theme (colours, typography, spacing, visual styling, UI feel, responsive approach, animation inspiration). Do **not** copy or extract the Framer template, its source files, components, assets, content, page structure or proprietary implementation. The Xvox Labs design is implemented independently in Next.js with the prototype's content and functionality.
- Both references already share the same agent characters (Scout, Quill, Beacon, Relay, Sage and the pink video agent Reel), a `#FAFAFA` background, `#0F0F0F` text, large regular-weight headings with tight letter-spacing, and white cards inside light-grey frames. The redesign is a shift in typeface, accent, component styling and motion, not a different world.

## Confirmed technology stack

- Next.js with the **App Router** and built-in file-based routing (multi-page)
- **JavaScript only** (`.js` / `.jsx`), React components
- Traditional CSS: **CSS Modules** for components, **`app/globals.css`** for shared foundations and design tokens
- Each major component has its own JSX + CSS Module, e.g. `components/sections/home/Hero/Hero.jsx` + `Hero.module.css`

**Not used:** TypeScript, Tailwind CSS, Bootstrap, React Router, Python, Java.

**Dependencies:** do not install, remove or upgrade any package without approval. **No animation library** (approved): motion uses CSS animations and lightweight React hooks.

## Current project status

Verified against code and Git on Nov 24, 2026. Branch tip `b03a4c8` (`b03a4c81edcb2ed1b49eb02dd1ca33f0f9e67b0e`, documentation checkpoint on the Phase 3 checkpoint `746344f`); local and remote are in sync. Vercel Production serves this commit at https://xvox-labs-team-preview.vercel.app (project `xvox-labs-team-preview`, promoted by the owner, publicly accessible). The pushed `phase-4-homepage` checkpoint `8c7d2b66f3c7d24655702700434c5e1e60c0c61d` includes the Step 8 fixes, Vercel migration, Phase 1 review index and manifest, and Phase 2.1 Solutions. The Hero animation lifecycle fix (`5478e7a`) is pushed on top of it. Phase 2.2 Services is reviewed and accepted with known dependencies, and Phase 2.3 Agents is approved. Both are committed in the team-review checkpoint `58b3761`. Phase 2.4 Marketplace and the 12 Phase 2.5 company pages are committed and pushed in `4861d6a` (`4861d6a84a469007f8e9cbf6af635cb9a3e87acd`), reviewed by the owner before Phase 3 started. See `CLAUDE.md` §5–§8 and §12.

| Item | Status |
| --- | --- |
| Next.js 16.4.6, React 19.3.0, ESLint 9 | Installed; JavaScript only, `jsconfig.json` `@/*` alias; no TypeScript, Tailwind, Bootstrap or React Router |
| `next.config.mjs` | Native Next.js routing and image optimization for Vercel at the domain root. `agentRules: false` |
| `app/layout.js` | Inter via `next/font/google`, `lang="en"`, header/footer shell, review `noindex` metadata, deployment origin from `VERCEL_URL` with a localhost fallback, title template `%s \| Xvox Labs`. Production domain pending (B12). |
| `app/globals.css` | **Phase 3:** reset, design tokens (Framer measurements + approved corrections), base typography, focus and reduced-motion rules |
| Routes | `/`, `/style-guide`, `/review`, 29 Solutions routes, 26 Services routes and seven Agent routes. Remaining native prototype routes are pending. |
| `components/` | **Phase 3:** `ui/` (14 components), `layout/` (header, menus, footer, logo slot, cart drawer, toast, Vox chat), `motion/` (Appear, CountUp, Marquee, StickyStage). **Phase 4:** `sections/home/` and `sections/shared/` |
| `hooks/`, `lib/` | `useInView`, `useReducedMotion`, `useScrollProgress`; `actions`, `agentImages`, `brand`, `cart`, `content`, `navigation`, `orchestration`, `preference`, `pricing` |
| `data/` | **Phase 2:** all prototype content, extracted verbatim (12 content files + `data/pages/` with 20 pages and 6 page templates). **Phase 4 Step 1:** `data/orchestration.js` and the interactive text in `data/pages/home.js`, `data/agents.js`, `data/site.js` |
| `public/images/` | **Phase 2:** the 25 prototype images, byte-identical (`agents/` holds the 14 agent files) |
| Logo | Slot in `lib/brand.js` (`src: null`); `public/brand/` not created yet: **file pending** |
| `docs/CONTENT_INVENTORY.md` | **Phase 2:** internal inventory: counts, internal-only prices, hidden placeholders, open items, route map |
| `reference/` | Git-ignored: read-only copy of the prototype (`index.html`) and local visual-review screenshots |
| Deployment | Live. The existing Vercel project `xvox-labs-team-preview` is connected to `XVOXLABS/Xvox-Labs-Website` and builds every push of `phase-4-homepage`. The owner promoted the latest deployment (`b03a4c8`) to Production: https://xvox-labs-team-preview.vercel.app, Ready / Current, publicly accessible, `noindex, nofollow`; `/`, `/build`, `/checkout`, `/safe-ai/self-check`, `/marketplace`, `/services`, `/how-it-works`, `/pricing` and `/book` verified 200 and an unknown path 404 on Nov 24, 2026. Preview deployments of other pushes are protected by Vercel Authentication, and production changes only when the owner promotes again. No new project, repository, code or configuration change was needed. `main` holds Phase 1 setup only (`9ab7d7e`). Details in `CLAUDE.md` §12. |

## Framer design system (measured from the live site)

Values below were read from the rendered Framer site (computed styles and screenshots at 390, 810, 1024, 1200 and 1440px). Approved decisions are marked **Approved**.

| Area | Framer reference | Prototype today | Plan |
| --- | --- | --- | --- |
| Primary font | Switzer 400 / 500 / 600 (Fontshare) | Geist | **Approved (Nov 21, 2026): Inter** (SIL Open Font License 1.1) for all text, via `next/font/google` (official files, self-hosted at build time, no npm package). Switzer is not used. |
| Secondary font | Inter (11px UI text) | Geist Mono | Inter (the same primary font); category labels keep their Inter styling |
| Page background | `#FAFAFA` | `#FAFAFA` | Same |
| Text | `#0F0F0F`; muted `rgba(15,15,15,.6)` | `#0F0F0F`; muted `#6E6E6E` | Framer values |
| Accent | `#FF6038` (active and hovered nav link, hero icon tile, form labels, send button, footer wordmark) | `#EB5A2B` | **Approved:** `#FF6038` |
| Frames / panels | Light grey `#F0F0F0` / `#EDEDED` holding white cards | `#F0F0F0` frame | Framer values |
| Dark surfaces | `#121212` / `#111111` (agent stage, buttons) | `#111111` | Framer values |
| Agent tints | Pastel cards (`#F6ECE6` peach, lavender, mint, sky) | `#ECE9F7`, `#F6ECE6`, `#E7F1E3`, `#E5EBF6` | Same family; keep prototype tints matched to agents |
| Type scale | Stepped (not fluid), see the table below | `clamp` sizes | Framer scale |
| Radii | 28px frames, 24/20px cards, 9–10px buttons, 5–8px tags, 50% icons | 28 / 20 / 9 / 8px | Framer values (already close) |
| Card frame pattern | White cards (radius ~20–24px) inside a light-grey frame (radius 28px, ~8–10px padding) | Same idea (`.frame`) | Framer spacing and radii |
| Content width | ~1136px content (152–1288px at 1440) | 1100px | Framer width |

**Type scale (measured on Framer, which uses Switzer; applied with Inter; weight 400 unless noted; display sizes letter-spacing −3%)**

| Role | ≥ 1200px | 810–1199px | < 810px |
| --- | --- | --- | --- |
| H1 (display) | 104 / 104 | 72 / 72 | 37 / 37 |
| Section heading, large | 60 / 60 | 48 / 48 | 38 / 38 |
| Heading | 44 | 36 | 30 |
| Subheading | 32 | 28 | 24 |
| Card title | 24 | 22 | 20 |
| Small title | 20 | 18 | 18 |
| Lead | 20 / 28 | 18 / 25.2 | 18 / 25.2 |
| Body | 16 / 24, 14 / 21, 13 / 19.5 | same | same |
| UI label | 15 / 15, weight 500 | same | same |
| Micro | 11 / 15.4 (Switzer), 11 / 15.95 (Inter) | same | 12 / 18 |

**Breakpoints (Framer):** desktop ≥ 1200px, tablet 810–1199px, phone < 810px. The burger navigation replaces the desktop nav below 1200px. Margins, section spacing, shadows and component sizes per breakpoint are measured from Framer at the start of Phase 3 (not guessed).

## Framer components and patterns (observed)

| Pattern | What it looks like |
| --- | --- |
| **Header (desktop)** | Logo left; centred **floating white pill** (radius ~12px, soft shadow) holding the links, active link in accent orange; **black button** right ("Contact Us"). Sticky, stays floating over content |
| **Header (mobile)** | White bar with logo left and a **black square burger button** right (turns into ×) |
| **Mobile menu** | Full-width white panel dropping under the header: rows divided by hairlines, an accordion row with chevron (Services), full-width black CTA button at the bottom |
| **Desktop dropdown** | Opens on hover. Full-width white panel under the header, soft shadow, 4 columns separated by hairlines; grey column headings; items are a title plus a muted description; a bottom row with a CTA text and accent ↗. Verified Nov 21, 2026 |
| **Buttons** | Primary: black, white text, ~10px radius. Secondary: light grey with small arrow (→). Form submit: accent orange with paper-plane icon. Square icon buttons: black (+/−) or white with arrow (→) |
| **Section header A** | Big heading left (H2), muted lead text + grey arrow button right, aligned on a two-column grid |
| **Section header B** | Centred H2, muted subline, grey button (FAQ style) |
| **Frame + cards** | Light-grey rounded frame containing a grid of white rounded cards |
| **Stat cards** | Large number (with count-up), uppercase label, muted description |
| **Agent cards** | Pastel tinted card: small uppercase role, name, white uppercase trait tags, large character image, white square arrow button top-right; opens a popup |
| **Dark agent stage** | Dark rounded panel with a header row (icon chip + text, small "6 Agents" badge) and a row of characters; hover shows a dark tooltip with name + role; white status strip below ("All 6 agents are ready to work.") |
| **Timeline cards** | "01. Discovery" title + week badge (calendar icon pill), hairline divider, muted text; two staggered columns inside a grey frame, accent-dot captions |
| **Use-case cards** | White card: coloured dot + uppercase category, title, small agent images, count text + white square arrow button |
| **Filter tabs + item cards** | Pill tabs (black active, grey inactive); item cards with a tinted image area, white type tag, icon, small agent image, title, muted text, + button, price |
| **Pricing tier cards** | White top card (title, text, price or "Priced after a discovery call", full-width black button) above an "Everything in …" checklist on the grey frame |
| **FAQ** | Numbered rows in white cards inside a grey frame; black square +/− button; open row shows muted answer |
| **Contact** | Grey frame: left side has a dark label chip, big heading, text; right side a white form card with uppercase field labels (OPTIONAL in accent), grey filled inputs, orange send button |
| **Footer** | White card inside a grey frame: logo + short text left; columns with grey labels right; divider; copyright row; huge accent **gradient wordmark** at the bottom fading out |
| **Logo strip** | Small muted label, row of bordered white tiles (2-column grid on mobile) |

## Motion and interaction (Framer reference)

| Effect | Where on Framer | Evidence |
| --- | --- | --- |
| **Sticky hero stage** | Hero pins for ~1800px of scroll: headline + agents row → agents fan out → statement sentence assembles | Verified (scroll screenshots, `Hero Stage` / `Fan` layers) |
| **Word-by-word statement** | Large sentence whose words and inline agent images animate in while scrolling | Verified (mid-animation screenshot) |
| **Agent hover tooltip** | Dark stage: hovering a character shows a dark name/role tooltip | Verified |
| **Agent card popup** | Agent directory cards open a popup on click | Inferred (`card popup trigger` layers) |
| **Count-up stats** | Numbers count from 0 to the value when visible | Verified (raw HTML says "0+", rendered "50+") |
| **Appear animations** | 10 elements with Framer appear effects (fade / rise on load or on view) | Verified (`data-framer-appear-id`) |
| **Moving logo strip** | Logo tiles move (partial tiles caught mid-motion) | Inferred |
| **Timeline deck** | Timeline cards stacked in a "deck" that likely moves on scroll | Inferred (`Timeline Deck` layer) |
| **FAQ accordion** | +/− toggle, one answer open | Verified |
| **Mobile menu** | Panel drops down; burger turns into × (below 1200px) | Verified |
| **Desktop dropdown** | Opens on hover | Verified |
| **Nav link hover** | Link colour changes to accent `#FF6038` | Verified (computed style) |
| **Button / card hovers** | No computed change detected | **Unverified** |
| **Timings and easing** | Not measurable from outside | **Unverified** |

**Motion approach (Approved):** reproduce these with plain CSS (transitions, keyframes, `position: sticky`) and small client hooks (`IntersectionObserver`, one `requestAnimationFrame` scroll handler). No animation library. Animate only `transform` and `opacity`. Respect `prefers-reduced-motion` (content simply appears). The hero H1 is visible immediately, never hidden behind an animation, to protect LCP. If any effect cannot be matched without a library, it comes back to you as a question.

**Prototype interactions that stay (functionality):** Solutions/Services menus, mobile menu, cart + drawer + checkout (browser storage), scripted Vox chat with local plan, Safe AI self-check quiz, mission board, marketplace filters and search, team-at-work tabs, FAQ, forms. They are restyled and animated the Framer way; their behaviour stays.

## Section mapping: prototype content → Framer design

### Global

| Prototype element | Framer pattern | Responsive behaviour (Framer) | Notes |
| --- | --- | --- | --- |
| Header: logo, 6 links (Solutions ▾, Services ▾, How it works, Marketplace, Pricing, About), Cart, "Get your AI plan", "Book a call" | Floating white link pill (hover and active links in accent) + right-side buttons ("Book a call" black, "Get your AI plan" grey secondary, Cart as small grey button) | Below 1200px: logo + black square burger | Prototype has more links/buttons than Framer's pill; fit checked at 1200px first and reported if it doesn't fit (nothing is dropped). **Logo: Option C (orange striped sphere + XVOX wordmark), used exactly as supplied in `public/brand/`; file not yet provided** |
| Solutions / Services mega menus | Framer dropdown panel (verified): full width, column hairlines, grey column headings, title items | Below 1200px: accordion rows | Opens on hover like Framer, and also on click, tap and keyboard. Prototype items have no descriptions or bottom CTA row; only prototype content is shown |
| Mobile menu (4 groups, scroll-% pill) | Framer full-width drop panel with hairline rows, accordions for Solutions and Services, black CTA at bottom | — | **Approved:** Framer mobile navbar (hamburger, accordion, CTA) replaces the scroll-% pill; cart stays reachable |
| Cart drawer | Framer card styling (white, radius 24px, grey frame), slide-in | Full-width on mobile | — |
| Ask Vox floating button + chat | Black pill button, white chat card with Framer type and inputs | Full-screen sheet on mobile | — |
| Closing CTA "Start with a two-minute plan." | Section header B (centred) + buttons | Stacked | — |
| Footer (logo, description, 2 buttons, Solutions / Services / Explore / Company columns, "© 2026 Xvox Labs.") | **Approved:** Framer footer design with original XVOX branding: white card in a grey frame, grey column labels, divider, copyright row, large accent gradient wordmark | Columns become 2×2 on phone | Wordmark text: `XVOX LABS` (decided) |

### Homepage (prototype order kept)

| # | Prototype section (content) | Framer pattern | Motion | Mobile / tablet |
| --- | --- | --- | --- | --- |
| 1 | Hero: "Your business, run by AI agents." + inline icon tile, sub-line, 2 buttons, agents row, team sentence ("Your team: Scout researches, …") | Framer hero: centred 104px H1 with inline **accent** icon tile, muted sub-line, agents row at the bottom; then the **statement panel** with inline agent images | Sticky hero stage: agents fan → team sentence assembles word by word (Framer's statement effect fits the prototype's sentence with agent slots) | H1 ~36px; agents row scaled; sequence shortened |
| 2 | Puzzle: "Each agent is one piece of the puzzle." (scroll assembly) | Dark agent stage panel (header chip, character row, status strip) | Keep the prototype's puzzle assembly on scroll, restyled; hover tooltips on characters | Characters wrap / scale |
| 3 | "Works with the tools you already use" strip | Logo strip (label + bordered tiles) | Moving strip | 2-column tile grid |
| 4 | "What's getting in your way?" department tiles | Use-case cards in a grey frame | Appear on view | 1 column (mobile), 2 (tablet) |
| 5 | "I need a team." / "I need one thing." | Section header A + two white cards in a frame | Appear on view | Stacked |
| 6 | "Real orchestration. Watch it run." team-at-work tabs | Pill filter tabs + dark agent stage for the flow | Prototype flow playback, Framer easing; tooltips | ~~Tabs scroll horizontally~~ **Decided (Step 5, D3): tabs wrap so all four stay visible**; graph stacks below 1200px |
| 7 | "Audit, build, live. Then we stay on." | Timeline cards (3 cards: number + title + week badge) | Timeline deck motion | 1 column |
| 8 | "Expert work, when you need people too." (4 service areas) | Agent-card style tinted cards with arrow button | Hover lift | 1–2 columns |
| 9 | "Same business. More breathing room." (before / after) | Two white cards in a frame (stat-card typography) | Appear on view | Stacked |
| 10 | "Your data, your rules, your approval." (Safe AI) | Principles-style tinted cards | Appear on view | Stacked |
| 11 | "See the work before you buy." sample cards | Item cards with tinted image area | Hover | 1 column |
| 12 | "From a free plan to fully run for you." ladder (Step 0–5) | Pricing tier cards (top white card + checklist) — **decided (Step 6, D6): no checklists** (the prototype ladder has none) | Appear on view | **Decided (Step 6, D3): stacked**: 6 columns ≥ 1200px, 3 at 621–1199px, 1 ≤ 620px |
| 13 | "Or take the ready-made version." marketplace | Filter tabs + item cards | Tab crossfade | 1–2 columns |
| 14 | FAQ "Questions technical buyers ask." | Framer FAQ (centred header, numbered rows, black +/−) | Accordion | Full width |
| 15 | Contact "Tell us what you are fixing." | Framer contact (grey frame, dark chip, form card, orange send button) | — | Stacked |
| 16 | "Start with a two-minute plan." | Section header B | — | Stacked |

### Other pages (same patterns, prototype content)

| Prototype page | Framer patterns used |
| --- | --- |
| Page heroes (`.ph1`) on every inner page | Section header A (big heading left, lead + button right) |
| Solutions hub, department pages | Use-case cards in grey frames |
| Solution detail (8 sections) | Header A; "Your team for this" → agent cards + timeline cards; ways to buy → tier cards; marketplace → item cards; related → use-case cards; FAQ → Framer FAQ |
| Services hub, area and service pages, Safe AI review | Tinted cards, timeline cards for the review steps, tier cards for packages |
| How it works, agents, agent pages | Agent directory cards with popup; dark agent stage; timeline cards; mission board restyled |
| Marketplace hub and item pages | Filter tabs + item cards; item page uses tier-card styling for price and buy |
| Pricing | Tier cards, compare table restyled with Framer type, FAQ |
| About, Careers, Blog, Results, Trust, Privacy | Header A, white cards in frames, FAQ |
| Book a call, Checkout, Talent waitlist, Self-check | Framer contact form styling |
| Studio, Inbox, 404 | Header A + cards |

## Responsive behaviour

- Framer breakpoints (measured): **desktop ≥ 1200px, tablet 810–1199px, phone < 810px**. Checked at 390, 810, 1024, 1200 and 1440px, plus a 320px safety check.
- Phone (measured): logo + black burger; full-width drop menu; H1 37px; agent and use-case cards one column; logo strip two columns; footer columns 2×2; wordmark scaled to width.
- Tablet (measured at 810 and 1024px): burger navigation; H1 72px; agent cards two columns; stat cards three columns.
- Fixes found in the prototype audit still apply: no horizontal overflow at 320px (the prototype header overflows there), and no `100vw` full-bleed offset on desktops with scrollbars.

## Pending decisions

### Design and experience

**Approved (Nov 21, 2026)**

- [x] ~~Switzer font (replaces Geist)~~ Replaced by Inter (see below)
- [x] Accent `#FF6038` (replaces `#EB5A2B`)
- [x] Original XVOX logo, used exactly as selected: no substitute variant, recolouring, redrawing or recreating
- [x] Framer footer design with original XVOX branding
- [x] Framer mobile navbar: hamburger, accordion, CTA
- [x] Reproduce the Framer visual experience and the prototype's functionality, with no omissions or invented additions
- [x] Motion with CSS animations and lightweight React hooks; no animation libraries

**Decided (Nov 21, 2026)**

- [x] **Logo:** Option C, the original orange striped sphere + XVOX wordmark. Preserved exactly (design and colour); no other variant, recolouring or recreation. You will place the exact image file in `public/brand/`.
- [x] **Footer wordmark text:** `XVOX LABS`.
- [x] **Primary font: Inter** (approved Nov 21, 2026; replaces Switzer). Official Inter under the SIL Open Font License 1.1, loaded with the existing `next/font/google` setup (no new package or dependency). Used for headings, body, navigation, buttons and components; category labels keep their Inter styling. All approved sizes, weights, spacing and breakpoints unchanged. Switzer is not downloaded or used, and its licence review is no longer needed.
- [x] **Unverifiable motion** (button/card hovers, timings, easing): match the observed behaviour; you review it side by side with Framer before it is final.
- [x] **"Prototype: sitemap" panel:** left out of the public website.

- [x] **Kaviyan / Framer reference:** inspiration only (visual theme, typography, colours, spacing, UI feel, responsive approach, animation inspiration). No copying or extraction of the template, its source, components, assets, content, page structure or implementation. Our design is implemented independently.
- [x] **Phase 3 implementation approved** (Nov 21, 2026).
- [x] **Cart totals:** a total shows only when every item has a published price; otherwise "Contact Us to Discuss Pricing" with the "Discuss Pricing" CTA.
- [x] **Vox guided conversation** (Phase 3): the prototype's guided flow, frontend only. The confirmation never claims a lead was sent or saved. Real AI replies are Phase 8.

**Visual corrections after the side-by-side Framer review (approved Nov 21, 2026)**

- [x] Section spacing 110 / 96 / 56 px (desktop / tablet / phone).
- [x] Tablet (810–1199px) side gutter for sections and footer: 24px. The header keeps 32px.
- [x] Lead text: main font (Inter), 20/28 desktop, 18/25.2 tablet and phone, 60% ink. The Inter lead is dropped; Inter stays for category labels.
- [x] Desktop nav pill: tighter spacing (side padding 12, link gap 2, link padding 10/7 for Inter) and an equal-column grid. It is exactly centred wherever both sides fit (from about 1440px) and as close to centre as space allows on narrower desktops. No link, Cart or action is hidden or removed.
- [x] Desktop header right inset 64px (logo stays at 58px).
- [x] Footer wordmark: weight 600, letter-spacing −0.06em, solid accent faded into the frame colour (110 / 76 / 36 px), bottom cropped by the frame (about 20% desktop, 25% tablet, none on phone). Size 17.2cqw with Inter, so the letters span about 90% of the frame like Framer's.
- [x] Tablet footer: outer padding 8 / 24 / 24, card padding 32.
- [x] Dropdown: titles 15/15, descriptions 12/18. Dropdown triggers stay dark when open or hovered; only the chevron turns.
- [x] Tabs: radius 9, active #111, inactive #F0F0F0, gap 6.
- [x] Light icon button (card arrow): 40 × 30, radius 10, #FCFCFD, shadow rgba(30,20,40,.07) 0 2px 3px. The dark FAQ toggle is unchanged.
- [x] Hover transitions 0.2s (easing unchanged).
- [x] Phone header background #FDFDFF. Mobile menu panel without shadow.
- [x] Smallest heading (h5 size) weight 500.
- [x] Vox chat restored to the prototype styling: dark header, 3px stage bars (past and current stages in accent `#FF6038`), monospace uppercase labels using the system monospace (`ui-monospace, Menlo, monospace`; no Geist Mono or other new font), 420 × 660 panel, black Send button when disabled. Phones keep the full-screen chat.

**Open items during Phase 3 (no assumptions)**

- [ ] **Logo file:** the exact Option C image goes in `public/brand/`. Until then a logo slot is built and nothing is substituted, redrawn or recoloured.

### Content decisions (approved Nov 21, 2026)

- **Prices:** only **$1,500** (blueprint) and **Free** (AI plan) are published. Every other price and every "Price to set" shows **"Contact Us to Discuss Pricing"** with a **"Discuss Pricing"** button to `/book`; consultation-based services use **"Book a call"**. Applies to the homepage, pricing, solutions, services and marketplace. Original values stay in `data/` (`priceStatus`) and in `docs/CONTENT_INVENTORY.md`.
- **Team-review content.** Original prototype sample prices and draft pricing notes are approved for review. Preserve their values and label their review status. Published pricing rules still apply, including the consultation label for Services and Solutions. The optional visitor Budget ranges follow K5.
- **Placeholders:** fully placeholder blocks are hidden (`hidden: true` in `data/`), with their text kept for reference. Where only part of a block is placeholder, `text` keeps the original and `display` holds what the site shows.
  - **Footer:** shows only "© 2026 Xvox Labs." (the prototype note is not shown).
  - **Careers:** shows only "Until then, send a note through the contact form with “Careers” in the message."
  - **Homepage proof section** ("See the work before you buy.") and its three placeholder cards are hidden until real samples exist; the section and its content stay in `data/pages/home.js`.
- **Pending (do not invent):**
  - **Xvox Studio external URL:** not available; Studio links stay on the internal `/studio` page (marked `pending` in `data/`).
  - **Terms of Service, Cookie Policy, Marketplace Terms:** no approved legal content; no placeholder legal text is published (recorded in `data/site.js` → `pending`).
- **Content never shown in the prototype** (old SERVICES list, superseded page versions) is not migrated.
- **Exact duplicates** are stored once, with no wording changes.
- **"Hire" link on agent pages** points to `/pricing#hire` (it was broken in the prototype).
- **Solution URLs** are flat: `/solutions/[slug]`.
- **Images:** `public/images/agents/` for agent files, `public/images/` for the rest, original names.

### Business content (prototype vs blueprint): Pending approval

The prototype's content is used as-is. These blueprint differences are resolved later, one by one, only with your approval.

| # | Topic | Prototype v5 | Blueprint |
| --- | --- | --- | --- |
| B1 | Department names | Sales & Marketing, Customer Experience, Finance & Reporting, Operations & Admin, Design Operations | Growth, Customer Experience, Business Ops, Admin Ops, Design Ops |
| B2 | Solution list | 19 problem-named solutions, incl. design / brand / Safe AI / video items | 19 draft solutions; design, brand and Safe AI are Services |
| B3 | Agent framing | "Meet the team you can hire" | Agents are the team, not the menu; avoid "Hire Scout" |
| B4 | Video agent (Reel) | Present | Open decision: here or Studio |
| B5 | Ways to buy naming | "Hosted by us" and "Hire" both present | Ladder Step 0–5 |
| B6 | Prices | Blueprint $1,500, marketplace prices, others "TBS" | Audit / implement / hire "from [$__]" |
| B7 | Marketplace categories | Blueprints, Claude skills, automation packs, micro / nano tools, templates | Blueprints, skills, plugins, nano tools, templates |
| B8 | Safe AI naming | Mixed ("responsible-ai") | "Safe AI" only; "review", never "certification" |
| B9 | Extra pages | Cart, checkout, talent, inbox, build, results, studio, design | Not in the sitemap |
| B10 | Homepage | 16 sections (listed above), including Problems, Safe AI and Contact | 12 sections |
| B11 | Vox AI plan | Scripted chat; real AI only inside the Claude runtime | "Free AI plan" always visible |
| B12 | Live domain | — | Needed for `metadataBase`, canonicals, sitemap |
| B13 | Proof | Placeholders | Collect 2–3 case studies |

### URLs (approved Nov 21, 2026)

| Prototype | Route |
| --- | --- |
| `#home` | `/` |
| `#solutions`, `#dept-<id>` (5), `#solution-<slug>` (23) | `/solutions`, `/solutions/<id>`, `/solutions/<slug>` (one dynamic segment; department ids and solution slugs never collide) |
| `#services`, `#svc-<area>` (4), `#service-<id>` (21) | `/services`, `/services/<area>`, `/services/<area>/<id>` |
| `#how` = `#agents`, `#agent-<id>` (6) | `/how-it-works`, `/how-it-works/agents/<id>` |
| `#market` = `#marketplace`, `#item-<id>` (44) | `/marketplace`, `/marketplace/<id>` |
| `#design`, `#responsible-ai` | `/services/design`, `/services/safe` |
| `#selfcheck` | `/safe-ai/self-check` |
| `#hire` | `/pricing#hire` |
| `#pricing`, `#about`, `#careers`, `#blog`, `#results`, `#trust`, `#privacy`, `#book`, `#checkout`, `#build`, `#studio`, `#talent`, `#inbox` | Same names as routes |
| `#guide` | Opens the Vox chat (no page) |

Every link in `data/` carries both `href` (new route) and `prototypeHref` (original).

## Complete team review

These phases track the team-review deliverable. The website roadmap below retains its existing phase numbers.

| Team-review phase | Scope | Status |
| --- | --- | --- |
| 1. Review index and manifest | `/review`, 20 standalone and 103 data-driven source records, four legacy aliases, Vox and Hire actions | Complete and included in the pushed checkpoint. All source records have working links within the index. |
| 2. Native route templates | Solutions and departments, services, agent profiles, marketplace and the remaining standalone views | Phase 2.1 Solutions is in the checkpoint. All 26 Phase 2.2 Services routes were reviewed and accepted with known dependencies. The seven Phase 2.3 Agent routes were approved by the owner and are in the team-review checkpoint. Phase 2.4 Marketplace and Phase 2.5 company pages are committed in `4861d6a` (checkpoint 2) and reviewed by the owner before Phase 3 started. `/build`, `/self-check` and `/checkout` were left for Phase 3 and are implemented (row 3). |
| 3. Prototype interaction parity | Cross-route flows, orchestration fallbacks, Mission Board, cart and checkout, self-check, booking, waitlist, and reviewable runtime-only states | In progress. Global not-found, self-check, the Mission Board with `/build`, and the demo checkout are completed, fully tested (lint, 128-page build, 183, 188 and 279 checks), and committed and pushed in `746344f`. Booking and waitlist were delivered as demo forms in Phase 2.5. Orchestration fallbacks, cross-route flows and other runtime-only states remain and need an audit. |
| 4. Full review and release | Browse and verify all routes and states, regression checks, then approved Vercel handoff | Pending |

The index renders original extracted blocks and computed destination text, including previously hidden blocks. Draft, sample, placeholder and prototype-only labels are separate from the source copy. `data/reviewRoutes.js` records canonical URLs, parents and source files. While a native page is pending, its index link opens its source record. Within `/review`, legacy hashes open the corresponding record, `#guide` opens Vox and `#hire` opens the current agent’s buying section when available or the pricing review record. The approved canonical pricing destination remains `/pricing#hire`.

### Phase 2.1 — Solutions

The hub, five departments and 23 details use the final prototype content and approved navigation paths. The hub lists 18 department solutions, and the review index also links to the four cross-category details and the marketing bundle. `generateStaticParams()` uses the manifest for all 28 detail paths. Related-item links retain their planned URLs while those destinations are pending. See `CLAUDE.md` for verification.

### Phase 2.2 — Services

The Services hub, four area pages and 21 service details use the review manifest at `/services`, `/services/[area]` and `/services/[area]/[id]`. The native detail paths are generated from valid area and service pairs. The dedicated Safe AI Review preserves the five packages, sample report and FAQ. Booking topic, related links, draft pricing notes and sample product amounts are preserved. Self-check, Marketplace and the other pending pages remain separate work. See `CLAUDE.md` for verification.

**Status:** reviewed and accepted by the owner with known pending dependencies (the pages named above). Its files are in the team-review checkpoint.

### Phase 2.3 — Agents

The hub at `/how-it-works` and profiles for Scout, Quill, Beacon, Relay, Sage and Reel use the seven approved manifest records. The hub keeps the workflow demos, agent directory and banner quick views, Safe AI content, delivery timeline, model demo, FAQ and original closing CTA. Profiles keep their original order, content, related work, pricing and booking context. Vox opens chat, and unknown agent IDs return 404.

The inline Mission Board retains the original starting state in place and is fully interactive since Phase 3, together with the full-screen `/build` route. Native routes and local interaction checks passed, with details in `CLAUDE.md` §12.

**Status:** approved by the owner; committed in the team-review checkpoint.

**Agent preview mobile UI fix (Nov 24, 2026).** The quick-view popup (`AgentPopup`) was fixed for phones and tablets: real heading levels, a Close button that stays visible while the modal scrolls, a visible focus ring on the modal itself, and no tab stop on link-only Jobs and Use cases panels (`Tabs` opt-in `panelFocusable`). Agent colours, copy, prices and routes are unchanged. Validated for all six agents and four tabs at 320, 338, 390, 407, 810 and 1024 px: 36/36 pass, zero scoped axe violations, lowest text contrast 8.14:1, 44 px minimum targets, Escape focus restore, Hire, Buy, Full profile, Vox and Cart, and reduced motion.

### Phase 2.4 — Marketplace

**Status:** implemented and verified (Nov 24, 2026); committed and pushed in `4861d6a` and reviewed by the owner before Phase 3 started. `/marketplace` (search, Type, Agent and Use case category filters, sort, count) and 44 `/marketplace/<id>` pages follow the prototype, reuse `ItemCard` and the cart, apply the pricing rule (original sample prices only in labelled disclosures) and keep agent, solution and checkout context. Checkout and payment are out of scope. Validation: lint, build (125 pages), `git diff --check`, a 188-check Chrome suite at six widths, scoped axe-core with zero violations, and regression of Homepage, Solutions, Services and Agents routes. See `CLAUDE.md` §7.

### Phase 2.5 — Company and conversion pages

**Scope (owner choice, Nov 24, 2026):** the 12 standalone views `/pricing`, `/book`, `/trust`, `/about`, `/careers`, `/blog`, `/results`, `/privacy`, `/studio`, `/talent`, `/inbox` and `/notfound` from the extracted prototype pages. **Out of scope:** `/build`, `/self-check` and `/checkout` (Phase 3), real form handling, legal text, a global `not-found` page, and the final cart-to-Contact-Us change (FINAL-1, implemented last).

**Acceptance criteria:** every visible source block rendered verbatim; hidden placeholders hidden or in labelled disclosures; pricing rule applied (only "Free" and "$1,500"); forms in demo mode with no request or storage; routes work directly and on refresh; no overflow at 320–1440 px; 44 px page-owned controls; keyboard and reduced motion; zero scoped axe violations; earlier routes unaffected.

**Status:** implemented and verified (279-check Chrome suite, lint, build with 125 pages, `git diff --check`); committed and pushed in `4861d6a` and reviewed by the owner before Phase 3 started. Owner decisions P1–P4 (Nov 24, 2026): keep the hidden pricing note, the comparison-table price row and the Book demo behaviour as implemented; no sitemap promise on `/notfound`, with the global not-found page handled in Phase 3. Three deferred accessibility findings in shared components from earlier steps stay listed for final QA (not fixed during feature phases): (1) the Team-at-Work flag checkbox is 18 px, below the 24 px WCAG 2.2 target size; (2) the Team-at-Work run log is a scrollable region with no focusable content, so it is not keyboard-focusable (axe `scrollable-region-focusable`); (3) the + toggle on `ItemCard` is 34 px (homepage Marketplace preview and Marketplace pages). See `CLAUDE.md` §9. Dependencies: Self-check is implemented in Phase 3 and Marketplace is committed in `4861d6a`; links to both resolve.

### Phase 3 — Prototype interaction parity (first part)

**Scope (owner decisions D1–D5, Nov 24, 2026):** global `not-found`; `/safe-ai/self-check`; the Mission Board on the How it works hub and `/build` (full-screen button hidden on `/build`); `/checkout` as a replaceable demo module with no payment; demo-mode messages only; the older "Build your own team" builder excluded; all prototype runtime text added to `data/` (`selfCheck.js`, `missionBoard.js`, `checkout.js`). **Out of scope:** real payments, real form handling, the final Contact Us change (FINAL-1), and the remaining Phase 3 items (orchestration fallbacks, cross-route flows, other runtime-only states).

**Acceptance criteria:** prototype behaviour and text preserved (scoring bands, missions, XP, drag and tap placement, toasts, booking topics); pricing rule applied (only "Free" and "$1,500"); no saved, emailed or order-placed claims; real 404 status; routes work directly and on refresh; no overflow at 320 to 1440 px; 44 px controls; keyboard, focus management and reduced motion; zero scoped axe violations; earlier routes unaffected.

**Status:** completed, fully tested, and committed and pushed in `746344f` (`746344fd4261aa9c1be2153e38279cf01ae2759e`, "feat: complete phase 3 interactive pages", 22 files, +1,932 / −60, branch `phase-4-homepage`, local and remote in sync, working tree clean after the push; not yet deployed at that point, deployed afterwards, see the Deployment row). Results: lint exit 0; production build 128 pages; `git diff --check` clean; Phase 3 suite 183/183; Marketplace suite 188/188; company pages suite 279/279 (route counts raised to 123), which also load every Phase 1 and Phase 2 route. Exact manifest of the commit (22 files: the 21 tested files plus `AGENTS.md`): 5 modified tracked files (`BUILD_PLAN.md`, `CLAUDE.md`, `app/how-it-works/HowItWorksSections.jsx`, `data/how-it-works.js`, `data/reviewRoutes.js`) and 16 new files (`app/build/` 2: `build.module.css`, `page.js`; `app/checkout/` 3: `CheckoutDemo.jsx`, `checkout.module.css`, `page.js`; `app/not-found.js`; `app/safe-ai/self-check/` 3: `SelfCheck.jsx`, `page.js`, `selfcheck.module.css`; `components/sections/shared/MissionBoard/` 3: `MissionBoard.jsx`, `MissionBoard.module.css`, `MissionBoardSection.jsx`; `data/` 4: `checkout.js`, `missionBoard.js`, `phase3Pages.js`, `selfCheck.js`). The three deferred accessibility findings (Team-at-Work flag checkbox 18 px; Team-at-Work run log not keyboard-focusable; `ItemCard` + toggle 34 px) stay listed for final QA, see `CLAUDE.md` §9. Data note: the prototype's `preset: true` flags on the four "Keep it safe" slots were restored in `data/how-it-works.js`. See `CLAUDE.md` §7.

### Phase 3.2 — remaining interaction parity (audit complete, awaiting approval)

Read-only audit of Nov 24, 2026 against `reference/index.html`. **Orchestration fallbacks:** no work needed (the generic fallback matches the prototype for all 22 solutions). **Findings:** F1 Marketplace filters not kept after item then back (Low–Medium); F2 Mission Board state not kept across navigation (Low); F3 header highlight for the self-check and Studio (Services), checkout (Marketplace), Trust and Careers (About) (Low); F4 cart drawer and Vox stay open after browser Back (Low–Medium); F5 `/#guide` and `/#vox` deep link (Low); F6 cart-count bump and F7 pointer effects (cosmetic, F7 deferred); F8 link crawl, 0 broken of 123 targets. **Backend-only states** (inbox lead list, saved confirmations, AI chat mode) stay for Phase 8. **Plan:** 3.2-A correct the stale Step 5 note in `CLAUDE.md`; 3.2-B header highlight; 3.2-C close the cart drawer on navigation and Vox on narrow screens only; 3.2-D persist Marketplace filters and Mission Board state; 3.2-E optional cosmetics; 3.2-F optional `/review` guide to runtime-only states. **Acceptance criteria:** lint, build and `git diff --check` pass; the 183, 188 and 279 suites pass with updated expectations; new checks at 390 and 1440 px for keyboard, reduced motion and scoped axe; earlier routes unaffected. **Pending owner decisions:** URL parameters or session storage for F1, F5, F6 and the review guide. FINAL-1 stays the final project phase.

## Phase overview

| Phase | Goal | Output | Approval gate | Status |
| --- | --- | --- | --- | --- |
| 1. Setup | Next.js running locally | Clean app | Site loads | **Done** (`9ab7d7e`) |
| 2. References & content | Extract prototype content into `data/`; copy prototype images | `data/` files, `public/images/`, `docs/CONTENT_INVENTORY.md` | You approve decisions and URL map | **Approved** (commits `855ea2e`, `932401b`; branch `phase-2-content` pushed) |
| 3. Design system + shared layout | Global design system, reusable UI components, desktop and mobile navbar, dropdown menus, footer, shared layout shell, motion and animation system | `globals.css`, fonts, logo, `components/ui`, `components/layout`, `components/motion`, `hooks/`, `/style-guide` | You compare `/style-guide`, header and footer with Framer at 390 / 810 / 1024 / 1200 / 1440px | **Done** (commits `c3063eb` … `c0ed4a7`, Nov 21; branch `phase-3-design-system` is local only and is contained in `phase-4-homepage`); still open: logo file |
| 4. Homepage | The 16 homepage sections, one at a time | Section components | Side-by-side review vs Framer (look) and prototype (content) | Steps 1–8 complete on `phase-4-homepage`, including the Step 8 fixes in the checkpoint. Phase sign-off and merge require owner approval. |
| 5. Other pages | All prototype pages in the Framer style | Routes | Every link works, content matches prototype | In progress. See “Complete team review” for current routes and approval gates. |
| 6. SEO & AEO | Metadata, schema, sitemap | `sitemap.js`, `robots.js`, JSON-LD, `llms.txt` | Lighthouse + Rich Results | — |
| 7. Test & deploy | Production build, hosting | Live site | Checklist signed off | Team-review deployment is live: Production serves `b03a4c8` at https://xvox-labs-team-preview.vercel.app (see the Deployment row). The release checklist, final production domain (B12), SEO and AEO remain pending. |
| 8. Backend (later) | Real Vox AI, form storage, checkout | APIs, database, payments | Separate approval | — |

## Phase 4 — homepage steps

Approved Nov 21, 2026. One reviewed local commit per step on `phase-4-homepage`; each step and each commit needs approval. After every step: lint, build, browser checks at 390 / 810 / 1024 / 1200 / 1440 (no overflow, no console errors), screenshots, report.

| Step | Work | Status | Commit |
| --- | --- | --- | --- |
| 0 | Create branch `phase-4-homepage` from `c0ed4a7` | Done | — |
| 1 | Extract the interactive text into `data/` (puzzle states, orchestration specs and run-log text, popup labels, form text), checked word for word against the prototype | Done | `2e8ec90` |
| 2 | Page shell and static sections 3, 4, 5, 7, 8, 9, 10, 16; Vox widget on phones (compact button, nudge off, hidden while the footer is visible) | Done | `77056b7` |
| 3 | Section 1 hero sequence + shared agent popup | Done | `27f36ac` |
| 4 | Section 2 puzzle stage | Done | `73f81fc` |
| 5 | Section 6 Team at Work + shared orchestration engine (4 flows) | Done (pushed Nov 24) | `5f5cd06` |
| 6 | Sections 12 (buying ladder) and 13 (marketplace) | Done (visual review approved Nov 24) | `13c67e5` |
| 7 | Sections 14 (FAQ) and 15 (contact) | Done (visual review approved Nov 24) | `f14ac35` |
| 8 | Whole-page audit, three major fixes and five minor fixes | Done (visual review approved) | `8c7d2b6` |

Section 11 (proof) stays hidden (Phase 2 decision).

**Phase 4 plan decisions (Nov 21):** A1 branch and per-step commits · A2 contact confirmation "Thanks, {name}." + "Demo mode: nothing was stored in this view." (no "Sending…", no email promise) · A3 ladder footnote: the "Prices marked 'to set'…" sentence is hidden, "Download means you run it. Hire means we run it. See pricing →" stays · A4 pinned lengths: hero 240vh; puzzle 260vh, 220vh at 601–640px, 180vh ≤ 600px · A5 links use the planned routes before Phase 5 pages exist (no temporary pages) · A6 FAQ and contact are the full prototype sections · K1 hide both contact chat bubbles · K2 hide "1 day / Reply target", keep "30 min / Discovery call" · K3 form note "Demo mode: this form doesn't send or store anything yet." · K4 closing CTA lead "Tell Vox what is slowing you down. You get a plan." · U2 popup Buy price from the blueprint data via the price rule · U3 FAQ not numbered · U4 approved in Step 8 removes only “A person from our team takes it from there.” from the Vox greeting. Step 3–5 decisions: `CLAUDE.md` §8.

### Step 6 — Buying ladder and marketplace (implemented and tested)

`app/page.js` renders `WaysToBuy` (section 12) and `MarketplacePreview` (section 13). The shared components are `BuyingLadder`, `MarketplaceFeatured`, and `ItemCard`. The opt-in removal toast is implemented in `lib/cart.js` and `components/layout/Toast/Toast.jsx` (D1).

The saved review reports passing lint, production build, browser checks at all five review widths, cart compatibility (19/19), and Steps 1–5 regressions. The handover also verified all eight Blueprint cards appear as they scroll into view at 390 px. Final pre-commit lint and production build passed. See `CLAUDE.md` §6 for the test record and the [local comparison page](reference/visual-review/phase4/step6/index.html) for the screenshots.

**Pricing rule (approved, final):**

| Item | Shown | Route |
| --- | --- | --- |
| Free AI plan (ladder step 0) | **Free** | "Get your AI plan →" opens Vox |
| Published blueprints (22 cards) and ladder step 2 "Download" | **$1,500** only (no "one-time", no "/ month") | Cards: + / ✓ cart toggle. Step 2: "Browse blueprints →" → `/marketplace` |
| Paid audit, Implement, Hire, Custom (steps 1, 3, 4, 5) | **Contact Us to Discuss Pricing** | The step's own button saves About "Home page" / Path = step title → `/book` |
| Claude skills, Automation packs, Micro tools, Templates | **Contact Us to Discuss Pricing**, as its own text link | Saves About = item name / Path = item type → `/book` |
| Cart drawer (unchanged) | Unpriced items show the label; total hidden unless every item is published | "Discuss Pricing →" → `/book` |

No other numerical, monthly, estimated or invented price may appear in these sections, in accessible names, `title` attributes or the served HTML. Internal values stay in `data/` only.

**Decisions:** D1 "Removed from cart" toast without View cart, backward-compatible · D2 placeholder prices show the label only (no extra Discuss Pricing button in ladder cards) · D3 ladder stacked: 6 columns ≥ 1200, 3 at 621–1199, 1 ≤ 620 · D4 stretched card links with separate controls, no nested interactive elements · D5 shared `Tabs`, wrapping, keyboard · D6 Framer tier cards without checklists · D7 no "/ month" until a published price exists · Q1 placeholder "Contact Us to Discuss Pricing" is a separate text link to `/book` · Q2 topic About = item name, Path = type · Q3 + / ✓ toggle on every item.

**Content:** ladder from `data/pricing.js` (6 steps, Implement highlighted); marketplace heading, lead and tab labels from `data/pages/home.js` section 13; Featured = `interactive.featuredItems` (8, prototype order); type tabs = first 8 items of each type in data order (Blueprints 8 of 22, Claude skills 8, Automation packs 6, Micro tools 4, Templates 4); "Sample catalogue" note hidden.

**Validation:** price allow-list ("Free", "$1,500") and deny-list (other `$` amounts, "/ month", "/month", "per month", "/mo", "one-time", "Price to set", "TBS", "from $") on text, accessible names, `title` attributes and served HTML at 5 widths · every placeholder shows the label · `/book` topics saved (ladder steps; one card per type) · cart/Toast compatibility: Node test old vs new `lib/cart.js`; browser: add toast with View cart, card remove toast without it, drawer remove silent, popup Buy still silent · no nested interactive elements · tabs by keyboard · ladder columns incl. 620/621 · no overflow or console errors · screenshots vs prototype · Steps 1–5 regression · lint and build.

### Step 7 — FAQ and contact (implemented and tested)

- **FAQ:** two columns; left: eyebrow "FAQ", heading, lead "Still unsure? Vox answers questions too.", "Ask Vox →" (opens Vox); right: the 7 questions from `data/faq.js` in order in a grey frame. All closed at first, each toggles on its own, +/− icon, keyboard accessible. Uses the shared `Accordion` with its existing settings (no group name, `defaultOpen={-1}`); no numbering (U3).
- **Contact:** eyebrow "Contact", heading, lead; K1–K3 applied; "30 min / Discovery call"; "Ask Vox instead →". "Start a project" form card: 8 fields in prototype order with their options and the prototype validation message; saved-topic chip ("About: …", "Path: …", "Clear ✕") from the `/book` preference; demo confirmation per A2.
- **Budget and pricing (K5, Nov 24):** the optional visitor Budget field keeps the five original prototype ranges in order. Services and Solutions show "Contact Us to Discuss Pricing" wherever pricing appears. Blueprints are the only category eligible to display actual product prices.

The owner approved the visual review on Nov 24. Final lint and production build passed. The saved Chrome review passed 15 check groups at 12 viewport widths, including the FAQ, field options, keyboard and reduced motion, booking topics, demo submission, and Steps 1–6 regression smoke checks. The review contains 24 screenshots. See `CLAUDE.md` §6 and the [local comparison page](reference/visual-review/phase4/step7/index.html).

### Step 8 — Whole-page check

The audit and approved fixes are complete and included in the checkpoint. The major fixes address Hero layout shift, mobile sticky-header focus and normal-text contrast. The minor fixes address Vox launcher clearance, Puzzle tap targets, accessible names, mobile touch target sizes and the single U4 greeting sentence. Prototype pointer tilt (`--mx`) and the separate “Who should our team reply to?” copy change remain deferred. See `CLAUDE.md` §7 for verification and screenshots.

## How to use this plan

1. **Ask for a plan first.** "Plan only, do not write code yet."
2. **Read the plan.** Check the files it creates or changes.
3. **Approve.** "Approved, implement."
4. **Run it.** `npm run dev`, open `http://localhost:3000`, check 375 / 810 / 1024 / 1440px.
5. **Compare.** Look against Framer (design and motion) and the prototype (content).
6. **Commit after explicit owner approval.** Review `git status` and the diff, stage only the approved files, and use the approved commit message.
7. **If something breaks,** paste the exact error.

**Golden rules**

- One feature per prompt.
- Content lives in `data/`, copied from the prototype; never typed inside components, never invented.
- Design values live as tokens in `globals.css`, measured from Framer; never raw hex in components.
- Keep `CLAUDE.md` updated with every decision.
- Follow `AGENTS.md` for branch changes and obtain explicit owner approval for each commit, push and merge.

## Folder structure

**Exists (Nov 24, 2026):** `app/` (`layout.js`, `page.js`, `globals.css`, `favicon.ico`, `style-guide/`, `review/`, `solutions/` with 29 routes, `services/` with 26 local routes, and `how-it-works/` with seven local routes), `components/ui/`, `components/layout/`, `components/motion/` (Phase 3), `components/sections/home/` and `components/sections/shared/` (Phase 4), `hooks/`, `lib/`, `data/` and `data/pages/` (Phase 2), `public/images/` and `public/images/agents/` (Phase 2), `docs/CONTENT_INVENTORY.md`, git-ignored `reference/`, config files. Not yet: `public/brand/` (logo file pending), remaining native prototype routes (Phase 5), `lib/seo.js` and `lib/schema.js` (Phase 6). Actual tree: `CLAUDE.md` §3.

**Planned structure (original proposal; parts above now exist):**

```text
app/                         Routes, layouts, metadata
  layout.js  page.js  globals.css  not-found.js
  solutions/  services/  how-it-works/  marketplace/  pricing/  about/  …   (URL map above)
  api/                       Phase 8 only
components/
  layout/                    Header, NavPill, MegaMenu, MobileMenu, Footer, CartDrawer, VoxChat
  ui/                        Button, IconButton, Frame, Card, Tag, Badge, Tabs, Accordion, SectionHeader, StatCard, Tooltip, Field
  sections/home/             One folder per homepage section (Hero/Hero.jsx + Hero.module.css, …)
  sections/shared/           Sections reused by inner pages (PageHeader, WaysToBuy, FaqBlock, ClosingCta, …)
  motion/                    Small client wrappers for approved effects (Appear, CountUp, StickyStage, Marquee)
hooks/                       useInView, useScrollProgress, useReducedMotion
data/                        Prototype content: agents, departments, solutions, services, ladder, marketplace, faq, navigation, site
lib/                         Helpers: seo.js, schema.js, cart.js; later API clients
public/
  brand/                     The selected original XVOX logo, unchanged
  images/                    Prototype images, unchanged
```

- `app/`: routing, composition, metadata. Pages assemble sections and read `data/`.
- `components/layout/`: chrome shared by every page.
- `components/ui/`: small, reusable Framer-style building blocks with no business content.
- `components/sections/`: page sections; content passed in from `data/`.
- `components/motion/` + `hooks/`: the only place animation logic lives, so every effect respects reduced motion in one place.
- `data/`: the single source of content (from the prototype).
- `lib/`: pure helpers, ready for backend work later.
- `public/`: fonts, images, icons, `llms.txt`.

Every component: `Name.jsx` + `Name.module.css`. `"use client"` only when the component needs state, events or motion.

## SEO plan

- `metadata` / `generateMetadata()` on every route; title template `'%s | Xvox Labs'`; unique 140–160 character descriptions; `alternates.canonical`; `metadataBase` = live domain (B12).
- One H1 per page, then H2 → H3 in order; semantic `header`, `nav`, `main`, `section`, `footer`.
- Real alt text on every image (the prototype already has most).
- Phase 6: `app/sitemap.js`, `app/robots.js`, `app/not-found.js`, `app/manifest.js` + icons.
- JSON-LD: Organization + WebSite (home), Service (solutions, services), Product + Offer (marketplace, approved prices only), FAQPage, BreadcrumbList.
- Scroll animations never hide text from crawlers: content is in the server HTML and only visually animated.

## AEO plan

| Practice | How |
| --- | --- |
| Answer first | Solution, service and pricing pages open with a short answer block (from prototype content) |
| Question headings and FAQ | `<details>` / accordion markup + FAQPage schema |
| Content in the HTML | Tabs, accordions and animated text rendered on the server |
| One consistent entity | Always "Xvox Labs"; Organization schema with `sameAs` |
| `public/llms.txt` | Short plain-text map of key pages |
| AI crawler access | **Pending approval** |

## Accessibility and performance

Target: Lighthouse 90+ on mobile; LCP < 2.5s, CLS < 0.1, INP < 200ms.

- [ ] Contrast ≥ 4.5:1 (check muted `rgba(15,15,15,.6)` and orange-on-light text)
- [ ] Keyboard: Tab, Enter, Esc; visible focus ring; skip link
- [ ] Menus, tabs, accordions, tooltips and popups with correct ARIA; hover content also reachable by focus and tap
- [ ] Tap targets ≥ 44px
- [ ] `prefers-reduced-motion` turns off all scroll and hover motion
- [ ] Sticky scroll stages don't trap keyboard or screen-reader users
- [x] `<html lang="en">`
- [ ] Fonts via `next/font` (self-hosted, no layout shift)
- [ ] Images via `next/image`; animated agent `.webp` files (0.8–1.7 MB) loaded only on hover / desktop
- [ ] Animation code client-only and small; static pages where possible

## Phase 7 — Testing, Git and deployment

**Team-review hosting (VERCEL-1, Nov 24, 2026).** Use Vercel's Next.js preset with the existing GitHub repository and `phase-4-homepage` branch. Build from the repository root and use the preset's output. Use `npm run build` and `npm run start` to verify locally. Public assets use domain-root URLs. The review index, Solutions, Services and Agent pages are available locally. Status (Nov 24, 2026): deployed to the existing project and promoted to Production by the owner, see the Deployment row.

Approve repository connection and the first deployment separately. Vercel treats a new project's first deployment as production. Confirm the intended Git revision, production branch and review access before import. Use the approved preview branch for later review deployments.

The native Next.js configuration and production build were verified locally. No Vercel deployment is recorded. The project connection, live preview URL, deployed revision and access settings are unverified.

**Git approvals.** Keep the approved `phase-4-homepage` branch for team review. Obtain explicit owner approval for each commit, push and merge. Stage only approved files, use a normal push to the approved branch on `origin`, and review changes before an approved merge into `main`. Commit prefixes include `feat:`, `fix:`, `style:`, `docs:` and `chore:`.

**Pre-launch checklist**

- [ ] `npm run build` and `npm run lint` clean
- [ ] Every prototype page and link works in the new routes
- [ ] Side-by-side check vs Framer at 375 / 810 / 1024 / 1440px
- [ ] Content check vs prototype: nothing added, removed or reworded without approval
- [ ] Chrome, Safari / iPhone, Firefox, Edge
- [ ] Lighthouse mobile 90+ in all four
- [ ] No Framer copy, client logos or branding; no placeholder or invented claims
- [ ] Domain, HTTPS, `metadataBase`, sitemap submitted

## Claude Code prompts

Each prompt asks for a plan first. Prompts that depend on pending decisions wait for them.

**Prompt 0 — Update project memory**

```text
Read CLAUDE.md, AGENTS.md and BUILD_PLAN.md. Add a short "Build plan" section to CLAUDE.md: content comes from the HTML prototype (read-only); look and behaviour come from the Framer reference (never its content, branding or assets); stack is Next.js App Router, JavaScript, CSS Modules + globals.css; no TypeScript/Tailwind/Bootstrap/React Router; no dependency changes without approval; content in data/; design tokens from Framer measurements. Show me the diff before saving.
```

**Prompt 1 — Extract prototype content (Phase 2)**

```text
Extract the prototype's content (agents, departments, solutions, services, ladder, marketplace, FAQ, navigation, page copy) from D:\Downloads\Xvox Labs — Website prototype v5 (1)\index.html into data/ files, unchanged. Do not reword, merge or drop anything. List every file and what it holds. Plan first.
```

**Prompt 2 — Design tokens and style guide (Phase 3)**

```text
Using the "Framer design system" section of BUILD_PLAN.md and the approved decisions, write app/globals.css (reset, tokens, base typography, focus styles, reduced-motion rule), set up the approved fonts, and create a noindex /style-guide page showing every token and base component. Plan first.
```

**Prompt 3 — UI components**

```text
Create components/ui (Button, IconButton, Frame, Card, Tag, Badge, Tabs, Accordion, SectionHeader, StatCard, Tooltip, Field) matching the Framer patterns table in BUILD_PLAN.md. Each has Name.jsx + Name.module.css and uses only tokens. Add them to /style-guide. Plan first.
```

**Prompt 4 — Motion hooks**

```text
Create the approved motion utilities (useInView, useScrollProgress, useReducedMotion, and components/motion Appear, CountUp, StickyStage, Marquee) with no animation library. Everything must respect prefers-reduced-motion and keep content in the server HTML. Demo each on /style-guide. Plan first.
```

**Prompt 5 — Header, menus, footer (Phase 3)**

```text
Build the header (Framer floating nav pill, prototype links and buttons), Solutions/Services menus, mobile menu, cart drawer and footer, following the Global rows of the section mapping in BUILD_PLAN.md. Content from data/navigation.js. Keyboard and screen-reader accessible. Plan first.
```

**Prompt 6 — One homepage section (repeat per row of the homepage mapping)**

```text
Build homepage section [#] from the "Homepage" mapping table in BUILD_PLAN.md as components/sections/home/[Name]/[Name].jsx + .module.css. Content from data/ (prototype, unchanged); design, motion and responsive behaviour from the Framer pattern named in the table. Do not add or remove content. Plan first.
```

**Prompt 7 — Page template**

```text
Build the [solution detail] page at the route in the URL map, using the Framer patterns listed for it in BUILD_PLAN.md and content from data/. generateStaticParams + generateMetadata; unknown slug returns notFound(). Plan first.
```

**Prompt 8 — Check a finished page**

```text
Review [page] against BUILD_PLAN.md: content matches the prototype exactly; look and motion match Framer at 375/810/1024/1440; one H1 and heading order; metadata; alt text; keyboard; contrast; reduced motion. Report problems as a list before changing anything.
```

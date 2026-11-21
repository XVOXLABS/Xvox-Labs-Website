# Xvox Labs Website — Build Plan

> **For Claude Code:** This is the build plan for the Xvox Labs website. Read it together with `CLAUDE.md` and `AGENTS.md` before any task. **What the site contains comes from the HTML prototype. How it looks and behaves comes from the Framer reference.** Always plan first and wait for approval before writing code. Anything marked **Pending approval** is not decided: ask, don't assume. Proposed folders and files are not created until a task approves them.

Version: Nov 21, 2026 (rev. 5: remaining Phase 3 decisions recorded; Framer/Kaviyan used as inspiration only; Phase 3 implementation approved)

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

| Item | Status |
| --- | --- |
| Next.js 16.4.6, React 19.3.0, ESLint 9 | Installed; JavaScript only, `jsconfig.json` `@/*` alias; no TypeScript, Tailwind, Bootstrap or React Router |
| `next.config.mjs` | `agentRules: false` |
| `app/layout.js` | Inter (variable font) via `next/font/google` as the primary font, `lang="en"`, placeholder `metadataBase` (TODO), title template `%s \| Xvox Labs` |
| `app/page.js`, `app/globals.css` | Minimal page; empty globals |
| `data/` | **Phase 2:** all prototype content, extracted verbatim (12 content files + `data/pages/` with 20 pages and 6 page templates) |
| `public/images/` | **Phase 2:** the 25 prototype images, byte-identical (`agents/` holds the 14 agent files) |
| `docs/CONTENT_INVENTORY.md` | **Phase 2:** internal inventory: counts, internal-only prices, hidden placeholders, open items, route map |
| `reference/index.html` | Read-only copy of the prototype, git-ignored |

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
| 6 | "Real orchestration. Watch it run." team-at-work tabs | Pill filter tabs + dark agent stage for the flow | Prototype flow playback, Framer easing; tooltips | Tabs scroll horizontally |
| 7 | "Audit, build, live. Then we stay on." | Timeline cards (3 cards: number + title + week badge) | Timeline deck motion | 1 column |
| 8 | "Expert work, when you need people too." (4 service areas) | Agent-card style tinted cards with arrow button | Hover lift | 1–2 columns |
| 9 | "Same business. More breathing room." (before / after) | Two white cards in a frame (stat-card typography) | Appear on view | Stacked |
| 10 | "Your data, your rules, your approval." (Safe AI) | Principles-style tinted cards | Appear on view | Stacked |
| 11 | "See the work before you buy." sample cards | Item cards with tinted image area | Hover | 1 column |
| 12 | "From a free plan to fully run for you." ladder (Step 0–5) | Pricing tier cards (top white card + checklist) | Appear on view | Horizontal scroll or stacked (decide at build) |
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

## Phase overview

| Phase | Goal | Output | Approval gate | Status |
| --- | --- | --- | --- | --- |
| 1. Setup | Next.js running locally | Clean app | Site loads | **Done** (`9ab7d7e`) |
| 2. References & content | Extract prototype content into `data/`; copy prototype images | `data/` files, `public/images/`, `docs/CONTENT_INVENTORY.md` | You approve decisions and URL map | **Approved** (commits `855ea2e`, `932401b`; branch `phase-2-content` pushed) |
| 3. Design system + shared layout | Global design system, reusable UI components, desktop and mobile navbar, dropdown menus, footer, shared layout shell, motion and animation system | `globals.css`, fonts, logo, `components/ui`, `components/layout`, `components/motion`, `hooks/`, `/style-guide` | You compare `/style-guide`, header and footer with Framer at 390 / 810 / 1024 / 1200 / 1440px | **In progress** (branch `phase-3-design-system`); open: logo file |
| 4. Homepage | The 16 homepage sections, one at a time | Section components | Side-by-side review vs Framer (look) and prototype (content) | — |
| 5. Other pages | All prototype pages in the Framer style | Routes | Every link works, content matches prototype | — |
| 6. SEO & AEO | Metadata, schema, sitemap | `sitemap.js`, `robots.js`, JSON-LD, `llms.txt` | Lighthouse + Rich Results | — |
| 7. Test & deploy | Production build, hosting | Live site | Checklist signed off | — |
| 8. Backend (later) | Real Vox AI, form storage, checkout | APIs, database, payments | Separate approval | — |

## How to use this plan

1. **Ask for a plan first.** "Plan only, do not write code yet."
2. **Read the plan.** Check the files it creates or changes.
3. **Approve.** "Approved, implement."
4. **Run it.** `npm run dev`, open `http://localhost:3000`, check 375 / 810 / 1024 / 1440px.
5. **Compare.** Look against Framer (design and motion) and the prototype (content).
6. **Commit.** Review `git status`, `git add` the feature's files, commit. One commit per working feature.
7. **If something breaks,** paste the exact error.

**Golden rules**

- One feature per prompt.
- Content lives in `data/`, copied from the prototype; never typed inside components, never invented.
- Design values live as tokens in `globals.css`, measured from Framer; never raw hex in components.
- Keep `CLAUDE.md` updated with every decision.
- Branch per phase, merge to `main` when it works.

## Folder structure

**Exists:** `app/` (`layout.js`, `page.js`, `globals.css`, `favicon.ico`), `data/` and `data/pages/` (Phase 2), `public/images/` and `public/images/agents/` (Phase 2), `docs/CONTENT_INVENTORY.md`, git-ignored `reference/index.html`, config files.

**Proposed (not created):**

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

**Git habits:** branch per phase (`phase-2-content`), commit each working feature with specific files, push daily, PR to `main` when a phase is approved. Prefixes: `feat:`, `fix:`, `style:`, `docs:`, `chore:`.

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

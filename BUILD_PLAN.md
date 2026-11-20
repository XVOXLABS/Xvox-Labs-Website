# Xvox Labs Website — Build Plan

> **For Claude Code:** This is the approved build plan for the Xvox Labs website. Read it together with `CLAUDE.md` and `AGENTS.md` before any task. Follow the phase order, the folder structure, the design tokens and the SEO/AEO rules below. Always plan first and wait for approval before writing code. Items marked "needs approval" are not decided yet: ask, don't assume.

Version: Nov 20, 2026

## How to use this plan

Build the site one small, approved task at a time with Claude Code in VS Code, and commit after every working step. The v5 prototype is your content and design reference; it is rebuilt in Next.js, not copied in.

**The vibe-coding loop (repeat for every task):**

1. **Ask for a plan first.** Paste the task prompt (see the last section) and add: "Plan only, do not write code yet."
2. **Read the plan.** Check which files it will create or change. More than three files → make sure each one makes sense.
3. **Approve.** Reply "Approved, implement."
4. **Run it.** `npm run dev`, open `http://localhost:3000`, check desktop and mobile width (browser DevTools → device toolbar).
5. **Check the terminal and browser console.** No red errors.
6. **Commit.** `git add .` → `git commit -m "feat: navbar"`. One commit per working feature.
7. **If something breaks,** paste the exact error to Claude Code. Don't say "it's broken".

**Golden rules**

- One feature per prompt. "Build the Hero section" works; "build the homepage" does not.
- Never accept a change you don't understand. Ask "explain this file in simple Tanglish".
- Content lives in `data/` files, never typed inside components. Prices and claims stay as `null` until you approve them.
- Keep `CLAUDE.md` updated with every new decision, so every new Claude session knows the rules.
- Work on a branch per phase (`phase-3-design-system`), merge to `main` only when it works.

## Phase overview

Eight phases, each ending with a check you approve before the next one starts. SEO and accessibility are built into every phase, not saved for the end.

| Phase | Goal | Output | Approval gate |
| --- | --- | --- | --- |
| 1. Setup | Next.js project running locally | Empty app, Git clean, first commit | Site loads at localhost:3000 |
| 2. Content & sitemap | Lock routes and page content | `data/` files, final sitemap | You approve URLs and copy |
| 3. Design system | Tokens and base components | `globals.css`, Button, Container, SectionHeading, Card | You approve a style preview page |
| 4. Homepage | All 12 sections | `app/page.js` + 12 section components | Desktop + mobile review |
| 5. Other pages | Solutions, Services, How it works, Marketplace, Pricing, About, utility | All routes with real content | Every link works, no placeholders |
| 6. SEO & AEO | Metadata, schema, sitemap, answer blocks | `sitemap.js`, `robots.js`, JSON-LD, `llms.txt` | Rich Results + Lighthouse checks pass |
| 7. Test & deploy | Production build, hosting | Live site on your domain | Full checklist signed off |
| 8. Backend (later) | Forms, Vox AI plan, checkout | APIs, database, payments | Separate approval |

## Decisions to settle first

These change the folder structure or the design, so answer them before Phase 3. Business decisions (prices, final solution list, proof) can wait until Phase 5; until then those spots show "Book a call" or stay hidden.

| Decision | Recommendation (needs approval) | Why |
| --- | --- | --- |
| Solution and service URLs | `/solutions/growth/inbound-lead-response` and `/services/design-product/ux-audits` | Avoids the clash between department pages and solution pages; good for breadcrumbs and SEO |
| Blog and Careers URLs | `/blog`, `/blog/[slug]`, `/careers` (linked from About) | Short URLs rank and share better; About still links to both |
| Extra pages from prototype | Add `/safe-ai/self-check`, `/results`, `/how-it-works/agents/[slug]` | The self-check is the Safe AI lead magnet; Results holds proof once approved |
| Cart and checkout | Leave out until Phase 8; "Buy" goes to `/contact?item=...` | No payment backend yet; avoids a fake checkout |
| Fonts | Geist + Geist Mono through `next/font` (built into Next.js, no install) | Already in the prototype; self-hosted fonts load faster and avoid layout shift |
| Colours | Keep the prototype palette (see Design system) | Needs your yes, plus the logo files |
| Agent characters | Reuse the prototype `.webp` images and SVG faces | Already designed; check you own the rights |
| Video agent (Reel) | Hide until you decide | Open business decision |

- [ ] Approve URL structure
- [ ] Approve extra pages
- [ ] Send logo files (SVG preferred)
- [ ] Confirm colours and fonts

## Phase 1 — Setup

Goal: a clean Next.js app running inside your existing repo, without losing `CLAUDE.md` or `AGENTS.md`. Run these in the VS Code terminal (PowerShell), inside the `Xvox-Labs-Website` folder.

**Step 1 — Check tools.** Node must be version 20 or newer (22 LTS is best).

```powershell
node -v; npm -v; git --version
git status
```

**Step 2 — Move your docs aside.** Next.js won't install into a folder that already has files it doesn't recognise.

```powershell
New-Item -ItemType Directory -Path ..\xvox-docs-backup -Force
Move-Item CLAUDE.md, AGENTS.md, BUILD_PLAN.md ..\xvox-docs-backup\
```

**Step 3 — Create the Next.js app in this folder** (the `.` means "here").

```powershell
npx create-next-app@latest . --js --app --eslint --no-tailwind --no-src-dir --import-alias "@/*" --use-npm
```

If it asks about Turbopack, say Yes. If it asks about the React Compiler or anything else, say No.

**Step 4 — Put your docs back** (this replaces any `AGENTS.md` / `CLAUDE.md` that Next.js created).

```powershell
Move-Item ..\xvox-docs-backup\CLAUDE.md, ..\xvox-docs-backup\AGENTS.md, ..\xvox-docs-backup\BUILD_PLAN.md . -Force
```

**Step 5 — Run it.**

```powershell
npm run dev
```

Open `http://localhost:3000`. You should see the Next.js starter page. Press `Ctrl + C` to stop.

**Step 6 — Clean the starter and commit.** Ask Claude Code to remove the starter content (Prompt 1 at the end), then:

```powershell
git add .
git commit -m "chore: set up Next.js app"
git push
```

**Also in Phase 1:** copy the prototype images into `public/images/agents/` and save the prototype `index.html` in a `reference/` folder that is listed in `.gitignore`, so Claude Code can read it without it going live.

## Folder structure and routing

Each folder in `app/` becomes a URL. Detail pages use one template file (`[slug]`) that reads its content from `data/`, so 20 solutions don't mean 20 page files.

```text
app/
  layout.js                 Navbar + Footer + fonts + default metadata
  page.js                   Home
  globals.css               Reset, tokens, typography
  not-found.js              Custom 404
  sitemap.js  robots.js     SEO files (Phase 6)
  solutions/
    page.js                 Hub: all departments
    [department]/page.js    e.g. /solutions/growth
    [department]/[solution]/page.js
  services/
    page.js
    [pillar]/page.js        e.g. /services/safe-ai
    [pillar]/[service]/page.js
  how-it-works/
    page.js
    agents/[agent]/page.js
  marketplace/
    page.js                 with category filter
    [item]/page.js
  pricing/  about/  careers/  blog/  results/
  safe-ai/self-check/
  contact/  ai-plan/  trust-data/  privacy/  terms/
components/
  layout/    Navbar, MegaMenu, MobileMenu, Footer
  common/    Button, Container, SectionHeading, Card, Badge, Tabs, Accordion, Breadcrumbs, Reveal
  sections/  Hero, Problems, TeamAtWork, HowItWorks, ... (one folder each)
  seo/       JsonLd
data/        site.js, navigation.js, solutions.js, services.js, agents.js, marketplace.js, faq.js, pricing.js
lib/         seo.js (metadata helper), schema.js (JSON-LD builders)
hooks/       useInView.js, useReducedMotion.js
public/      images/, icons/, logo.svg, llms.txt
```

**Rules for every component folder:** `Name.jsx` + `Name.module.css`. Only add `"use client"` when the component needs clicks, state or scroll effects (Navbar, Tabs, Accordion, Reveal). Everything else stays a server component: faster pages and better SEO.

**Data example** (`data/solutions.js`): each solution has `slug`, `department`, `title`, `summary`, `problem`, `outcome`, `agents`, `steps`, `timeline`, `priceFrom` (`null` until approved), `faq`, `seoTitle`, `seoDescription`. Pages and the sitemap both read from this one file.

## Phase 3 — Design system

All colours, sizes and spacing live as CSS variables in `app/globals.css`; components only use the variables, never raw hex codes. Values below come from the v5 prototype and need your approval.

```css
:root {
  /* Colour — base */
  --color-bg: #FAFAFA;        --color-surface: #FFFFFF;
  --color-frame: #F0F0F0;     --color-line: #E7E7E7;
  --color-ink: #0F0F0F;       --color-muted: #6E6E6E;   /* 4.9:1 on bg, passes AA */
  --color-dark: #111111;
  /* Colour — action */
  --color-accent: #EB5A2B;    /* large text, icons, highlights */
  --color-accent-strong: #C2410C; /* button fill with white 16px text: 5.2:1 */
  /* Colour — department / category */
  --color-coral: #FF6B4A; --color-sun: #FFC83D; --color-mint: #3DDBA4;
  --color-plum: #8A5CF6;  --color-blue: #3D6BFF;
  --tint-1: #ECE9F7; --tint-2: #F6ECE6; --tint-3: #E7F1E3; --tint-4: #E5EBF6;

  /* Type (fluid: grows smoothly from mobile to desktop) */
  --font-sans: var(--font-geist), 'Helvetica Neue', Arial, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, Menlo, monospace;
  --text-xs: 0.8125rem;  --text-sm: 0.9375rem;  --text-base: 1.0625rem;
  --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
  --text-h3: clamp(1.375rem, 1.1rem + 1vw, 1.75rem);
  --text-h2: clamp(2rem, 1.4rem + 2.4vw, 3.25rem);
  --text-h1: clamp(2.5rem, 1.6rem + 4vw, 4.75rem);
  --leading-tight: 1.05; --leading-body: 1.6;

  /* Spacing (4px steps) */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --section-y: clamp(64px, 8vw, 128px);

  /* Shape and depth */
  --radius-sm: 10px; --radius: 20px; --radius-pill: 999px;
  --shadow-card: 0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px rgb(0 0 0 / 0.06);

  /* Layout */
  --container: 1200px; --gutter: clamp(16px, 4vw, 32px);

  /* Motion */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 150ms; --dur: 300ms; --dur-slow: 600ms;
}
```

**Breakpoints (mobile-first, `min-width`):** 640px small tablet · 768px tablet · 1024px laptop · 1280px desktop. CSS variables can't be used inside media queries, so write these numbers directly.

**Contrast note:** white 16px text on `#EB5A2B` is only 3.5:1, below the 4.5:1 accessibility minimum. That's why buttons use the darker `--color-accent-strong`. Approve or pick another shade.

**Deliverable for this phase:** a hidden `/style-guide` page showing every colour, heading size, button and card, so you can approve the look before any real section is built. Remove it (or block it from search) before launch.

## Component library

Build the shared pieces first (Phase 3), then sections only combine them. If a pattern appears on two pages, it becomes a component.

| Component | Group | Job | Client? | Key details |
| --- | --- | --- | --- | --- |
| Navbar | layout | Logo, menu, two CTA buttons | Yes | Sticky; shrinks on scroll; menus open on click/tap, not hover only |
| MegaMenu | layout | Solutions by department, Services by pillar | Yes | Opens with button, closes on Esc and outside click; `aria-expanded` |
| MobileMenu | layout | Full-screen menu under 1024px | Yes | Accordions for Solutions/Services; CTA buttons pinned at bottom |
| Footer | layout | Sitemap links, Xvox Studio ↗, legal | No | Same links every page = strong internal linking |
| Container | common | Max width + side padding | No | Uses `--container`, `--gutter` |
| Section | common | Vertical spacing + optional tint background | No | `as` prop for semantic tag |
| SectionHeading | common | Eyebrow, H2, lead text | No | `level` prop keeps heading order correct |
| Button | common | Primary, secondary, ghost; link or button | No | Renders `Link` for internal URLs; 44px min tap size |
| Card | common | Base card for solutions, services, products | No | Whole card clickable via one link, not nested links |
| Badge / Chip | common | Department tag, "Price to set", category | No | Colour from department token |
| Tabs | common | Team-at-work, marketplace categories | Yes | Arrow-key support, `role="tablist"` |
| Accordion | common | FAQ | Yes | Built on `<details>`/`<summary>`: works without JavaScript and is crawlable |
| Breadcrumbs | common | Detail pages | No | Also outputs BreadcrumbList schema |
| AgentAvatar | common | Agent image + name | No | `next/image`, real alt text |
| Reveal | common | Fade/slide in on scroll | Yes | Wraps any block; respects reduced motion |
| ContactForm | common | Short form | Yes | Frontend only until Phase 8; validation messages |
| JsonLd | seo | Prints structured data | No | One script tag per page |

**Section components (homepage + reused on inner pages):** Hero, LogoStrip, Problems, TeamAtWork, HowItWorks, ServicesGrid, SafeAI, Proof, WaysToBuy, MarketplaceFeatured, FAQ, ContactCTA. Inner pages add: PageHero, SolutionDetail, AgentTeam ("Your team for this"), BuyOptions, Timeline, ComparisonTable.

## Animation plan

All motion is plain CSS plus one small `useInView` hook, with no animation library. That keeps pages fast and keeps the code yours. Motion should explain (show agents handing work to each other), never just decorate.

**Rules**

- Animate only `transform` and `opacity`. These are smooth on phones and don't move the layout.
- Durations: 150ms for hovers, 300ms for menus and tabs, 600ms for scroll reveals. One easing for everything (`--ease-out`).
- Nothing important is hidden until animation runs. If JavaScript fails, content still shows.
- `@media (prefers-reduced-motion: reduce)` turns off movement: content just appears.
- Content above the fold (hero headline) appears immediately. Animating it delays Largest Contentful Paint, an SEO speed score.

| Pattern | Where | How |
| --- | --- | --- |
| Scroll reveal | Section headings, card grids | `Reveal` adds a class when 15% visible; fade + 16px rise |
| Stagger | Card grids, problem tiles | Each child gets `style={{'--i': index}}`; `transition-delay: calc(var(--i) * 60ms)` |
| Hero entrance | Hero sub-line, buttons, tools line | CSS keyframes on load, 100ms apart; headline stays static |
| Card hover | All cards | Lift 4px + shadow; arrow slides 4px. Desktop only via `@media (hover: hover)` |
| Menu open | MegaMenu, MobileMenu | Fade + 8px slide; focus moves into menu |
| Tab switch | TeamAtWork, Marketplace | Crossfade panels; active indicator slides under tab |
| Agent handoff | TeamAtWork | Steps light up in order (Problem → agents → Sage → Outcome), each ~700ms, while the section is visible; pauses off-screen |
| Sticky process | How it works | Left column sticks; right steps reveal while scrolling. Desktop only; a simple list on mobile |
| Agent eyes | Agent avatars | Pupils follow the cursor (from the prototype). Desktop pointer only; off for reduced motion |
| Accordion | FAQ | Height animation with `grid-template-rows: 0fr → 1fr` |

**Later, optional:** page-to-page transitions with the browser's View Transitions API. Add it only after launch, if you want it.

## Phases 4–5 — Page-by-page build

Build the homepage one section per prompt, top to bottom, checking each on mobile before the next. Then build one template per page type and fill it from `data/`.

**Homepage order (Phase 4)**

| # | Section | Content source | Blocked by |
| --- | --- | --- | --- |
| 1 | Hero: outcome headline (the only H1), 2 buttons, "works with" tools line | `data/site.js` | Integrations list to claim |
| 2 | LogoStrip: "Businesses running on Xvox" | Approved logos only | Hidden until approved |
| 3 | Problems: "What's slowing you down?", 5 department tiles | `data/solutions.js` | — |
| 4 | TeamAtWork: 4 tabs, agent handoff | `data/agents.js` | Video agent decision |
| 5 | HowItWorks: Audit → Build → Live, "usually 4–6 weeks, depends on scope" | `data/process.js` | — |
| 6 | ServicesGrid: 4 pillars, one line each | `data/services.js` | — |
| 7 | SafeAI: Sage, approvals, data handling | `data/trust.js` | Safe AI wording |
| 8 | Proof: case studies or sample outputs | Approved only | Hidden until approved |
| 9 | WaysToBuy: ladder Step 0–5 | `data/pricing.js` | Prices (show "Book a call" until set) |
| 10 | MarketplaceFeatured: 3 items | `data/marketplace.js` | Final items |
| 11 | FAQ: hosting, ownership, models, costs, data, integrations, approvals | `data/faq.js` | Your answers |
| 12 | ContactCTA: short form + Vox AI plan button | — | — |

**Page templates (Phase 5), in this order**

1. **Solution detail** (most important for sales and SEO): problem → outcome → "Your team for this" (agents + Sage) → how it runs → timeline → BuyOptions (Download / Implement / Hire / Custom) → FAQ → related solutions.
2. **Department page:** intro, list of its solutions, shared FAQ.
3. **Solutions hub:** all departments with their solutions; links to every detail page.
4. **Service pillar + service detail:** what you get, deliverables, timeline, process, FAQ, CTA. Safe AI pillar includes the review journey and the "Ship / Ship with fixes / Don't ship" verdicts, always called a review.
5. **How it works:** approach, meet the team, Sage and safety, delivery timeline; agent detail pages.
6. **Marketplace hub + item page:** category tabs; item page with preview/sample, what's included, price (or "Price to set"), FAQ.
7. **Pricing:** ways to buy, paid audit, care plans, pricing FAQ.
8. **About, Careers, Blog, Results.**
9. **Utility:** Contact, AI plan (frontend form only), Trust & data, Privacy, Terms, 404.

**Content rule:** every page needs real text before it ships. Where a fact is missing, the page says "Book a call" or hides the block. It never shows invented numbers.

## SEO plan

SEO is built in from Phase 3: every page is born with its title, description, canonical URL, one H1 and schema. Phase 6 adds the sitewide files and checks. Everything uses built-in Next.js features, so nothing extra to install.

**Per page (every route)**

- `export const metadata` (fixed pages) or `generateMetadata()` (detail pages reading `data/`).
- Title pattern: `Inbound Lead Response Automation | Xvox Labs`, 50–60 characters. Set once in `layout.js` as `title.template: '%s | Xvox Labs'`.
- Description: 140–160 characters, says the problem and the outcome, unique per page.
- `alternates.canonical` on every page; `metadataBase` set in `layout.js` to your live domain.
- Open Graph and Twitter card: title, description, image. Generate share images with Next's built-in `opengraph-image.js`.
- One H1, then H2 → H3 in order. Semantic tags: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Every image has real alt text ("Scout agent researching a lead"), not "image1".

**Sitewide files (Phase 6)**

| File | What it does |
| --- | --- |
| `app/sitemap.js` | Builds the XML sitemap from `data/`, so new solutions appear automatically |
| `app/robots.js` | Allows crawling, points to the sitemap; blocks `/style-guide` |
| `app/not-found.js` | Helpful 404 with links back into the site |
| `app/manifest.js` + icons | Favicon and app icons |

**Structured data (JSON-LD)**

| Schema | Pages |
| --- | --- |
| Organization + WebSite | Home (logo, name, social links, contact) |
| Service | Each solution and service page |
| Product + Offer | Marketplace items, only once a price is approved |
| FAQPage | Pages with an FAQ block |
| BreadcrumbList | All detail pages |
| Article | Blog posts |

Google now shows FAQ rich results mainly for government and health sites, but FAQPage markup still helps AI engines read your answers.

**Internal linking:** each solution links to its department, related solutions, the agents used and Pricing. Each service links to related solutions. The footer links to every hub. Use descriptive link text ("See inbound lead response"), not "click here".

**After launch:** verify the site in Google Search Console and Bing Webmaster Tools, submit the sitemap and check for crawl errors monthly. Bing matters because several AI assistants use its index.

- [ ] Confirm the live domain (needed for canonical URLs and the sitemap)
- [ ] Pick 1 main search phrase per solution and service page

## AEO plan (AI answer engines)

AI assistants (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews) quote pages that answer one question clearly, in plain HTML, from a source they can identify. Each item below is built into the page templates, so every new page gets it automatically.

| Practice | How we build it |
| --- | --- |
| Answer first | Every solution, service and pricing page opens with a 40–60 word answer block: what it is, who it's for, the outcome. Stored as `summary` in `data/` |
| Question headings | H2s phrased like buyer questions: "How long does setup take?", "Who owns the agents?", "What data do the agents see?" |
| FAQ on every key page | 4–8 real questions, `<details>` markup + FAQPage schema |
| Content in the HTML | Tab and accordion text is rendered on the server and only visually hidden, so crawlers read all of it |
| Tables for comparisons | Download vs Implement vs Hire; Quick Scan vs Full Review. AI engines lift tables well |
| One consistent entity | Always "Xvox Labs", the same one-line description on every page, Organization schema with `sameAs` links (LinkedIn, X, GitHub) |
| Clear separation from Studio | Xvox Studio named only as a separate company link, so engines don't merge the two |
| Trust signals | Team page with real people, Trust & data page, last-updated date on key pages |
| `public/llms.txt` | A short plain-text map of the site and key pages for AI crawlers (a newer convention, cheap to add) |
| AI crawler access | `robots.js` allows GPTBot, ClaudeBot, PerplexityBot and Google-Extended, unless you decide otherwise |
| Precise claims only | No invented stats; "usually 4–6 weeks, depends on scope". Engines and buyers both trust specific, honest wording |

**Measure it after launch:** build a list of 20–25 buyer prompts ("best AI lead response service for small business", "how to check an AI agent before launch"), ask them in each AI engine monthly, and log whether Xvox Labs is cited.

- [ ] Decide whether AI crawlers may use the site content

## Accessibility and performance

Target: Lighthouse 90+ in all four scores on mobile, and Core Web Vitals in the green: LCP under 2.5s, CLS under 0.1, INP under 200ms. Check every finished page against this list.

**Accessibility**

- [ ] Text contrast at least 4.5:1 (3:1 for large text)
- [ ] Every action works by keyboard: Tab, Enter, Esc; visible focus ring
- [ ] "Skip to content" link at the top of every page
- [ ] Menus, tabs and accordions use the right ARIA roles and `aria-expanded`
- [ ] Tap targets at least 44 × 44px; nothing works only on hover
- [ ] Form fields have labels and clear error messages
- [ ] Reduced-motion setting respected
- [ ] Page language set: `<html lang="en">`

**Performance**

- [ ] Fonts through `next/font` (no flash, no layout shift)
- [ ] Images through `next/image` with width and height; hero image `priority`
- [ ] Prototype `.webp` images resized to the size they're shown at
- [ ] Most components are server components; `"use client"` only where needed
- [ ] No animation library, no unused CSS
- [ ] Pages are static (built once), which is the fastest option for a marketing site
- [ ] Run `npm run build` and check the size report for large pages

## Phase 7 — Testing, Git and deployment

Test each page as it's built, then do one full pass before launch. Hosting is chosen together in Phase 7; Vercel (made by the Next.js team) is the simplest fit, with Netlify as the main alternative.

**Git habits**

| When | Command | Why |
| --- | --- | --- |
| Start a phase | `git checkout -b phase-4-homepage` | Keeps `main` always working |
| After each working feature | `git add .` then `git commit -m "feat: hero section"` | Easy to undo one step |
| End of day | `git push -u origin phase-4-homepage` | Backup on GitHub |
| Phase approved | Open a pull request on GitHub → merge to `main` | Clean history |
| Something broke | `git restore <file>` or `git log` + ask Claude Code | Go back safely |

Commit prefixes: `feat:` new feature, `fix:` bug, `style:` CSS only, `docs:` documentation, `chore:` setup.

**Pre-launch checklist**

- [ ] `npm run build` finishes with no errors or warnings
- [ ] `npm run lint` is clean
- [ ] Every route opens; every nav, footer and CTA link goes to the right page
- [ ] Tested at 375px, 768px, 1024px and 1440px wide
- [ ] Tested in Chrome, Safari (or iPhone), Firefox and Edge
- [ ] Browser console has no errors
- [ ] Lighthouse mobile: Performance, Accessibility, Best Practices, SEO all 90+
- [ ] Google Rich Results Test passes on Home, one solution and one marketplace item
- [ ] No placeholder text, invented prices, fake logos or "certification" wording
- [ ] Privacy and Terms pages reviewed by you
- [ ] Domain connected, HTTPS on, `metadataBase` set to the real domain
- [ ] Sitemap submitted to Google Search Console and Bing Webmaster Tools

## Claude Code prompts

Copy one prompt at a time into Claude Code in VS Code. Each one asks for a plan first, so nothing is written until you approve.

**Prompt 0 — Update project memory (once, after Phase 1)**

```text
Read CLAUDE.md, AGENTS.md and BUILD_PLAN.md. Add a short "Build plan" section to CLAUDE.md that says: follow BUILD_PLAN.md for phases, folder structure, design tokens, components, animation, SEO and AEO; Next.js App Router, JavaScript only, CSS Modules + globals.css, no Tailwind/TypeScript/animation libraries; content in data/ files; prices null until approved; URL structure /solutions/[department]/[solution] and /services/[pillar]/[service] once I approve it. Show me the diff before saving.
```

**Prompt 1 — Clean starter**

```text
Remove the Next.js starter content from app/page.js and app/page.module.css and empty globals.css. Set up Geist and Geist Mono with next/font in layout.js, exposed as CSS variables --font-geist and --font-geist-mono. Set lang="en", metadataBase (placeholder https://example.com, marked TODO) and a title template '%s | Xvox Labs'. Plan first, list files, wait for my approval.
```

**Prompt 2 — Design tokens + style guide**

```text
Using the "Phase 3 — Design system" section of BUILD_PLAN.md, write globals.css: a modern CSS reset, all :root tokens, base typography for h1-h4, p, a, focus-visible styles, and a prefers-reduced-motion rule. Then create app/style-guide/page.js showing every colour, heading size and spacing step. Mark the page noindex. Plan first.
```

**Prompt 3 — Shared components**

```text
Create components/common: Container, Section, SectionHeading, Button (primary/secondary/ghost, renders next/link for internal hrefs, 44px min height), Card, Badge. Each has Name.jsx + Name.module.css, uses only CSS variables, and is a server component. Add them to /style-guide. Follow the "Component library" section of BUILD_PLAN.md. Plan first.
```

**Prompt 4 — Navbar and footer**

```text
Build components/layout Navbar, MegaMenu, MobileMenu and Footer, following the navigation in CLAUDE.md and the "Component library" section of BUILD_PLAN.md. Menus open on click/tap, close on Esc and outside click, use aria-expanded, and move focus correctly. Mobile menu under 1024px with accordions and the two CTA buttons pinned at the bottom. Read menu items from data/navigation.js. Look at reference/index.html for the visual style only. Plan first.
```

**Prompt 5 — One homepage section (repeat for each of the 12)**

```text
Build the [Hero] section as components/sections/[Hero]/[Hero].jsx + .module.css. Content from data/[site].js. Match the style of reference/index.html but use our tokens and components. Mobile-first. Follow the "Animation plan" in BUILD_PLAN.md; respect reduced motion. Do not invent numbers, logos or testimonials: leave unapproved content as null and hide the block. Plan first.
```

**Prompt 6 — Detail page template**

```text
Create app/solutions/[department]/[solution]/page.js. Use generateStaticParams and generateMetadata from data/solutions.js. Layout: Breadcrumbs, answer-first summary (40-60 words), problem, outcome, AgentTeam, timeline, BuyOptions, FAQ (details/summary), related solutions. Add JSON-LD for Service, FAQPage and BreadcrumbList. Unknown slug returns notFound(). Follow the SEO and AEO sections of BUILD_PLAN.md. Plan first.
```

**Prompt 7 — SEO files**

```text
Add app/sitemap.js (built from all data/ files), app/robots.js (allow all, block /style-guide, sitemap URL), Organization + WebSite JSON-LD on the home page, public/llms.txt, and an opengraph-image.js for the site. Then list every page with its title and description length so I can check them. Plan first.
```

**Prompt 8 — Check a finished page**

```text
Review [page] against the checklists in BUILD_PLAN.md: one H1 and correct heading order, unique title/description, canonical, alt text, keyboard access, contrast, reduced motion, server vs client components, no invented claims. Report problems as a list before changing anything.
```

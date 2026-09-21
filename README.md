## Purpose
This repository operates the public site for **Samm Simon Charity & Community Initiatives** at
https://sammsimon.ca (GitHub Pages, custom domain via `CNAME`).

The site began as the campaign page for Samm's 251 km epic run for cancer (Stratford, Ontario to
the Tobermory pier, completed May 17, 2026, over $35,000 raised). The run is complete and the site
is now the permanent home for that story **and** for every charity and community initiative that
follows it. One run started it; the mission continues.

## Mission
- Keep the 251 km run visible as the foundational story and flagship achievement.
- Document every initiative with the same transparency: cause, goal, beneficiary, mechanism,
  amount raised, date, outcome.
- Maintain a respectful, privacy-first tone in all copy.
- Drive supporters to key action channels:
  - View the GoFundMe fundraiser (donations paused as of September 21, 2026)
  - Follow updates via Home Renovation Reviews (https://home.renovation.reviews)
  - Share campaign links and community content

## Site map (do not rename any of these URLs)
| URL | Purpose |
| --- | --- |
| `/` (`index.html`) | Home: hero, Shirtlab, **Impact**, **Initiatives** timeline, run story, care focus, route, gallery, Home Renovation Reviews, GoFundMe, email, sponsors, FAQ, forum thread |
| `/initiatives/251-km-charity-run.html` | Case-study write-up for the flagship run |
| `/initiatives/african-crypto-charity.html` | Write-up for the African crypto charity initiative |
| `/initiatives/shirtlab-canadians-in-need.html` | Third chapter: Shirtlab purchases support Canadians in need |
| `/policy.html` | Privacy policy |
| `/unsubscribe.html` | Unsubscribe page (noindex) |
| `/sitemap.xml`, `/robots.txt` | Crawl hints |
| `public/` | Styles, scripts, gallery images |

Section anchors on the home page that other sites may link to: `#community`, `#gofundme`,
`#email`, `#story`, `#care`, `#route`, `#gallery`, `#follow`, `#sponsors`, `#faq`, `#discussion`,
plus `#impact`, `#initiatives`, and `#shirtlab`. Never remove an anchor.

## Adding a new initiative
Each initiative gets one simple write-up page plus a card and a row on the home page. No build
step, no template engine, and no filler: nothing goes on the site until it is actually happening.

1. Copy `initiatives/african-crypto-charity.html` to `initiatives/<slug>.html` (lowercase,
   hyphenated). Update `<title>`, meta description, canonical, Open Graph, the JSON-LD `Article`
   and `BreadcrumbList`, then write the page in plain words.
2. In `index.html` `#impact`, copy one `<article class="impact-card">` and write it the same way:
   what it was for, what happened, where the money went, one or two links. No badges, no stat
   chips, no fact sheets.
3. In `index.html` `#initiatives`, add a timeline row in chapter order. Use `is-current` for the latest active project. Do not add placeholder rows.
4. Add the new URL to `sitemap.xml`.

## Voice
Write like a person telling a friend what happened. Short sentences, real numbers, contractions
are fine. Avoid slogans, "X, not Y" constructions, lists of three with bold lead-ins, corporate
words ("initiative" is the category name; use "run", "work", "project" in prose), uppercase
eyebrow labels, and placeholder cards for things that don't exist yet. Say what is known, link to
what can be checked, and leave the rest out rather than showing a blank.

## Facts policy
- Never invent donors, beneficiaries, organizations, totals, dates, media coverage or partners.
- Verified figures on the site today: 251 km; completed May 17, 2026; initial GoFundMe goal
  $4,500; over $35,000 historical milestone; intended equal allocation between London Health Sciences Centre – Cancer
  Program, Stratford General Hospital (ER) and Wellspring Stratford Cancer Centre. The African crypto
  charity initiative raised **almost $25,000** for people in Africa using $RENO coin (a Solana meme
  coin, the community reward token of home.renovation.reviews) and was made possible by the
  Psionic Dream IT team; it is ONGOING (Samm and the team help those in need daily). Its start
  date and named beneficiaries have never been published, so the site describes the cause and
  status and links to what IS public ($RENO on Solscan, the $RENO Payment Ledger, the
  build23w/renovation.reviews repo) instead of showing blanks. Never show "To be confirmed"
  placeholders on a live page; describe what is known and link to what is verifiable. Its social
  image is `public/gallery/samm-africa-charity-og.jpg` (generated from the existing ribbon
  portrait; keep 1200x630).
- The site is not a registered charity and does not collect donations or issue tax receipts; the
  copy says so plainly.

- Shirtlab is Samm’s third charity project, now underway. Every purchase at https://shirtlab.lol
  donates **$1 to Canadians in need**. Do not imply that the whole purchase price is donated,
  name recipients, or publish a cumulative total without a verified update. The featured video is
  https://www.youtube.com/shorts/0BDrN6emptU. Purchases happen on Shirtlab, separately from the
  run’s GoFundMe. The write-up publication date is not the project’s launch date.

## Operating Principles
- Dignity first: no sensationalized medical storytelling.
- Accuracy first: dates, milestones, fundraising totals, and charity details must stay current.
- Accessibility first: content should remain readable, navigable, and mobile friendly.
- Trust first: messaging should be transparent and community-centered.

## SEO rules
- Existing URLs, anchors, asset paths, canonical tags, Open Graph tags and the `Event` JSON-LD are
  established and indexed. Change them only with a demonstrable reason, never for tidiness.
- The `<title>` keeps its original campaign terms first ("Samm Simon Epic Run for Cancer - 251 KM
  Charity Run") with the broader positioning appended.
- Link to Home Renovation Reviews with descriptive, varied anchor text; never "click here".

## Content Operations
When updating copy, prioritize these checks:
1. Run status is accurate (completed event language).
2. Fundraising totals are current and consistent across hero chips, trust marquee, impact card,
   fact sheets, story cards, FAQ, footer, meta description and structured data.
3. Home Renovation Reviews calls-to-action are visible and clear.
4. Charity beneficiary information remains unchanged unless officially updated.
5. Calls-to-action (Donate, Follow, Share) remain prominent.

## Technical Operations
- Static-first architecture: plain HTML, one CSS file, one small script, no build step.
- Preview locally with any static server from the repo root, e.g. `python -m http.server 4173`,
  then open http://localhost:4173/ (root-relative image paths in the CSS need a server, not `file://`).
- Deploys happen automatically from `main` via GitHub Pages. Stage work on a branch and review it
  locally before merging; merging to `main` is the deploy.
- Keep third-party embeds (GoFundMe, YouTube, CTV, Discourse forum thread) functional and
  performance-conscious.

- Video buttons use `data-video-load="frameId"`; the target frame supplies `data-youtube`
  and `data-video-title`. Players load only after a click, with a direct YouTube link for the Short.
- Shared styles and scripts use a dated query version in every HTML page; bump it when these
  assets change so returning visitors receive the update.
- Reveals leave content visible by default and respect reduced motion. Keep motion subtle;
  avoid adding marquee loops, animated counters, or scroll-driven parallax.

## Definition of Done for Site Updates
A content or UX update is considered complete when:
1. Messaging is factually accurate and consistent across visible sections and metadata.
2. Key CTAs (Donate and Home Renovation Reviews) are intact and tested.
3. Every internal anchor and every new link resolves; no broken links or visual regressions.
4. Privacy-respectful tone is preserved throughout.
5. `sitemap.xml` lists every indexable page.


## Sourced factual correction — September 21, 2026

Run dates: May 11–17, 2026. LHSF documents the start; StratfordToday reports the finish. Earlier May 11 completion references were incorrect. GoFundMe displays CAD $38,660 with donations paused as of September 21, 2026; this does not establish funds disbursed. Preserve historical $35,000 milestones. Preserve the #countdown compatibility anchor used by regional news backlinks. The archived event has no invented EventCompleted status or ticket offer.

The additive reference pages are `/about.html`, `/projects.html` and `/media.html`. Keep their identity references aligned with `https://sammsimon.ca/#samm`; preserve the existing run and initiative URLs.

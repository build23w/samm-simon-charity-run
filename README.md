## Purpose
This repository operates the public campaign site for Samm Simon's cancer-care fundraiser.
The run itself is complete (251 km, completed May 11, 2026), and the site now serves as an ongoing fundraising, update, and community hub.

## Mission
- Keep attention on local cancer-care support and community impact.
- Maintain a respectful, privacy-first tone in all copy.
- Drive supporters to key action channels:
  - Donate via GoFundMe
  - Follow updates via Home Renovation Reviews
  - Share campaign links and community content

## Primary Outcomes
- Sustain and grow total fundraising beyond the current 35k+ raised.
- Keep supporters informed with clear post-run updates.
- Encourage deeper community participation through Home Renovation Reviews.

## Operating Principles
- Dignity first: no sensationalized medical storytelling.
- Accuracy first: dates, milestones, fundraising totals, and charity details must stay current.
- Accessibility first: content should remain readable, navigable, and mobile friendly.
- Trust first: messaging should be transparent and community-centered.

## Repo Scope
- `index.html`: Main campaign landing page and core campaign messaging.
- `policy.html`: Privacy policy page.
- `unsubscribe.html`: Unsubscribe information page.
- `public/`: Frontend assets (styles, scripts, media/gallery).
- `scripts/`: Build and tooling scripts.
- `server/`: Server-side code and runtime support.

## Content Operations
When updating campaign copy, prioritize these checks:
1. Run status is accurate (completed event language).
2. Fundraising totals are current and consistent across page sections and metadata.
3. Home Renovation Reviews call-to-action is visible and clear.
4. Charity beneficiary information remains unchanged unless officially updated.
5. Calls-to-action (Donate, Follow, Share) remain prominent.

## Technical Operations
- Static-first architecture with a lightweight frontend.
- Build pipeline and startup scripts live in `scripts/` and `start.sh`.
- Deployment may run in containerized environments (`Dockerfile`).
- Keep third-party embeds (GoFundMe, social, media) functional and performance-conscious.

## Definition of Done for Site Updates
A content or UX update is considered complete when:
1. Messaging is factually accurate and consistent across visible sections and metadata.
2. Key CTAs (Donate and Home Renovation Reviews) are intact and tested.
3. No broken links or obvious visual regressions are introduced.
4. Privacy-respectful tone is preserved throughout.

## Maintainer Notes
If campaign milestones change, update all related references in a single pass:
- Hero and trust indicators
- Story and FAQ sections
- Footer stats
- SEO/meta and structured data

This prevents stale or conflicting campaign information from appearing on the public site.

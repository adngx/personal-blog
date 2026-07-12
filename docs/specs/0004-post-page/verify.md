# Verify: Post page · spec 0004 · updated 2026-07-12

_Steps derived from spec 0004 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual

- [ ] Visit a post page → title displays as h1 with design system typography → AC-1
- [ ] Visit a post page → publication date displays as "Month Day, Year" format → AC-2
- [ ] Visit a post page with updatedDate → "Updated: Month Day, Year" displays below publication date → AC-3
- [ ] Visit a post page without updatedDate → updated date section is hidden → AC-3
- [ ] Visit a post page with tags → tags display as Badge components → AC-4
- [ ] Visit a post page without tags → tags section is hidden → AC-4
- [ ] Visit a post page → markdown body renders with prose styling → AC-5
- [ ] Visit a post page in dark mode → prose styling adapts to dark theme → AC-5
- [ ] Inspect page source → og:title, og:description, og:type, og:url meta tags present → AC-6
- [ ] Inspect page source → twitter:card, twitter:title, twitter:description meta tags present → AC-6
- [ ] Visit a post page → footer contains "Back to home" link (plain text, no arrow icon) → AC-7
- [ ] Resize browser window from 320px to 1280px → long titles wrap correctly without horizontal overflow → AC-8
- [ ] Visit a post page with empty body → "No content available." fallback message displays → AC-9

## Commands

- [ ] `npm run build` → build succeeds without errors → AC-1 through AC-9
- [ ] `npm run typecheck` → TypeScript type checking passes → AC-1 through AC-9

## Acceptance-criteria coverage

- AC-1 … covered by step 1
- AC-2 … covered by step 2
- AC-3 … covered by steps 3, 4
- AC-4 … covered by steps 5, 6
- AC-5 … covered by steps 7, 8
- AC-6 … covered by steps 9, 10
- AC-7 … covered by step 11
- AC-8 … covered by step 12
- AC-9 … covered by step 13

# Verify: Homepage · spec 0005 · updated 2026-07-13

_Steps derived from spec 0005 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual

- [x] Visit homepage → hero section displays with blog title, tagline, and CTA button → AC-1
- [x] Visit homepage → CTA button links to the latest published post → AC-1
- [x] Visit homepage → hero section uses `<header>` landmark → AC-5
- [x] Visit homepage → featured post section displays with title, date, description, and tags → AC-2
- [x] Visit homepage → featured post shows the most recently published non-draft post → AC-2
- [x] Visit homepage → tags display as Badge components in featured post → AC-9
- [x] Visit homepage → post feed displays all published posts except the featured post → AC-3
- [x] Visit homepage → each post in feed shows title, date, and description → AC-3
- [ ] Visit homepage with no posts → friendly "No posts yet" message displays → AC-4
- [x] Inspect page source → JSON-LD structured data for WebSite schema present → AC-6
- [x] Inspect page source → JSON-LD structured data for Blog schema present → AC-6
- [x] Inspect page source → custom meta description present (not the default) → AC-7
- [ ] Resize browser window from 320px to 1280px → sections stack vertically on mobile → AC-8
- [ ] Visit homepage in dark mode → all sections adapt to dark theme → AC-8

## Commands

- [x] `npm run build` → build succeeds without errors → AC-1 through AC-9
- [x] `npm run typecheck` → TypeScript type checking passes → AC-1 through AC-9

## Acceptance-criteria coverage

- AC-1 … covered by steps 1, 2
- AC-2 … covered by steps 3, 4
- AC-3 … covered by steps 5, 6
- AC-4 … covered by step 7
- AC-5 … covered by step 3
- AC-6 … covered by steps 8, 9
- AC-7 … covered by step 10
- AC-8 … covered by steps 11, 12
- AC-9 … covered by step 5

## Verify run notes (2026-07-13)

- Dev server started at `http://localhost:4321/`
- Homepage HTML fetched and inspected via `curl`
- Steps 7, 11, 12 remain unchecked: no browser tool available for responsive resize, dark mode rendering, or empty state exercise (requires removing all posts)
- All other steps verified from rendered HTML output

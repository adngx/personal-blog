# Verify: Site footer · spec 0010 · updated 2026-07-13

_Steps derived from spec 0010 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual

- [ ] Visit any page (e.g. /) → footer renders at bottom with social links, nav, copyright, Astro badge → AC-1, AC-2, AC-3, AC-4, AC-5
- [ ] Click social links (GitHub, X, Email) → each navigates to correct URL → AC-2
- [ ] Click footer nav links (Blog, About) → each navigates to correct page → AC-3
- [ ] Verify copyright shows current year and "Personal Blog" → AC-4
- [ ] Verify Astro badge links to astro.build with rel="noopener" → AC-5, AC-9
- [ ] Resize browser to mobile width → footer stacks vertically; at desktop width → horizontal row → AC-6
- [ ] Toggle dark mode → footer uses design tokens, readable in both themes → AC-7
- [ ] Inspect HTML → uses `<footer>`, `<nav>`, `<ul>` with aria-labels → AC-8

## Commands

- [ ] `npm run build` → builds successfully with footer component → AC-1
- [ ] `npm run test -- src/components/site-footer.test.ts` → 9 tests pass → AC-2, AC-4, AC-9

## Acceptance-criteria coverage

- AC-1 … covered by UI step 1, Command step 1
- AC-2 … covered by UI steps 1, 2; Command step 2
- AC-3 … covered by UI steps 1, 3
- AC-4 … covered by UI steps 1, 4; Command step 2
- AC-5 … covered by UI steps 1, 5
- AC-6 … covered by UI step 6
- AC-7 … covered by UI step 7
- AC-8 … covered by UI step 8
- AC-9 … covered by UI step 5; Command step 2

# Verify: Design system · spec 0002 · updated 2026-07-12

_Steps derived from spec 0002 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual

- [ ] Visit the homepage → body text renders at 16px with Inter font and 1.7 line height → AC-1
- [ ] Visit the homepage → page has white background with black text in light mode → AC-2
- [ ] Toggle dark mode from header → page switches to near-black background with white text → AC-2
- [ ] Toggle dark mode from header → preference persists after page reload → AC-3
- [ ] Open site in a fresh browser (no localStorage) with OS set to dark mode → dark mode applies automatically → AC-3
- [ ] Disable JavaScript → site renders in system's preferred color scheme via CSS media query → AC-3
- [ ] Visit a blog post → prose content is constrained to ~680px width, centered → AC-4
- [ ] Visit the homepage → listing content is constrained to ~680px width, centered → AC-4
- [ ] Inspect links on homepage → links use muted gray-blue accent color, not default blue → AC-2
- [ ] Toggle dark mode → links switch to lighter gray-blue accent → AC-2
- [ ] Inspect shadcn Button component → renders correctly in both light and dark modes with no visual artifacts → AC-5
- [ ] Inspect shadcn Card component → background and text use correct token colors in both modes → AC-5
- [ ] Toggle dark mode → no flash of wrong theme on page load (inline head script prevents it) → AC-3
- [ ] Tab through header navigation → focus ring visible on all interactive elements → AC-3
- [ ] Screen reader announces theme toggle button with current mode label → AC-3

## Commands

- [ ] `npm run typecheck` → passes with no errors → AC-1, AC-2, AC-4, AC-5
- [ ] `npm run build` → completes successfully with no warnings → AC-1, AC-2, AC-4, AC-5

## Acceptance-criteria coverage

- AC-1 (Inter font, 16px base, readable line height): covered by steps 1, 16, 17
- AC-2 (light/dark color palette, gray-blue accent): covered by steps 2, 3, 10, 11, 16, 17
- AC-3 (system preference detection, toggle, localStorage, CSS fallback): covered by steps 4, 5, 6, 13, 14, 15
- AC-4 (prose 680px, wide 1100px containers): covered by steps 7, 8, 16, 17
- AC-5 (shadcn components in both modes): covered by steps 12, 13, 16, 17

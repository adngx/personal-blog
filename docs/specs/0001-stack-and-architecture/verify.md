# Verify: Stack & architecture · spec 0001 · updated 2026-07-12

_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## Commands

- [x] `npm run dev` → serves at `http://localhost:4321/` without errors → AC-1
- [x] Visit `http://localhost:4321/posts/hello-world/` → shows title "Hello World", date "July 12, 2026", and body content → AC-2
- [x] `npm run build` → completes without errors, `dist/` contains static HTML files → AC-3
- [x] Dev server startup < 5 seconds (measured 619ms) → AC-4
- [x] `npx tsc --noEmit` → passes with zero errors (strict mode active) → AC-5

## Acceptance criteria coverage

- AC-1 → covered by `npm run dev` check
- AC-2 → covered by post page visit check
- AC-3 → covered by `npm run build` check
- AC-4 → covered by startup time check
- AC-5 → covered by `tsc --noEmit` check

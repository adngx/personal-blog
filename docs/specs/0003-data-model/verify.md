# Verify: Data model · spec 0003 · updated 2026-07-12

_Steps derived from spec 0003 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## Commands

- [ ] Open `src/content.config.ts` → schema has `tags` field defined as `z.array(z.string()).optional().default([])` → AC-1
- [ ] Open `src/content.config.ts` → schema has `draft` field defined as `z.boolean().optional().default(false)` → AC-2
- [ ] Open `src/content/posts/hello-world.md` → frontmatter includes `tags: ["intro"]` and no `draft` field (defaults to false) → AC-3
- [ ] `npm run build` → completes without errors, hello-world post appears in build output → AC-3
- [ ] `npm run dev` → homepage at `http://localhost:4321/` does not show any post with `draft: true` in the listing → AC-4
- [ ] Create a test post with `draft: true` → `npm run build` → test post does not appear in `dist/posts/` directory → AC-5
- [ ] Create a test post with `draft: true` → `npm run dev` → test post is visible at its URL for author preview → AC-5

## Acceptance criteria coverage

- AC-1 (tags field, string array, defaults to empty): covered by step 1
- AC-2 (draft field, boolean, defaults to false): covered by step 2
- AC-3 (hello-world.md passes validation): covered by steps 3, 4
- AC-4 (drafts excluded from homepage listing): covered by step 5
- AC-5 (drafts not built in production, visible in dev): covered by steps 6, 7

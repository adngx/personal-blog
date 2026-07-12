# 0003. Data model

**Date**: 2026-07-12
**Status**: In Progress

## Summary

This decision extends the Astro content collection schema for blog posts with two new optional fields: `tags` (an array of freeform strings for categorizing posts) and `draft` (a boolean that hides posts from listings when true). The existing fields (title, description, pubDate, updatedDate) remain unchanged. Draft posts are excluded from the homepage listing at query time.

## Context

The blog needs a way to categorize posts by topic and to work on posts without publishing them. The existing schema in `src/content.config.ts` has four fields: title, description, pubDate, and updatedDate. There is no mechanism for tagging posts by topic, and no way to hide work in progress from the live site.

Tags enable future features like tag based filtering, tag pages, and SEO structured data. Draft support lets the author write posts incrementally without them appearing to readers. Both fields are foundational to the content pipeline: every later feature that queries or displays posts (homepage, post page, SEO, RSS) will depend on this schema.

The project uses Astro content collections with Zod validation (decided in spec 0001). The schema lives in `src/content.config.ts`. The build approach is Skateboard: ship the thinnest usable whole first.

## Requirements

**User stories**:

- As the author, I want to tag posts with topics so that readers can find related content.
- As the author, I want to mark a post as a draft so that I can work on it without it appearing on the live site.
- As a reader, I want to only see published posts so that I do not encounter incomplete content.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: The content collection schema accepts an optional `tags` field (array of strings) that defaults to an empty array when omitted from frontmatter.
- **AC-2**: The content collection schema accepts an optional `draft` field (boolean) that defaults to false when omitted from frontmatter.
- **AC-3**: The sample post `hello-world.md` passes frontmatter validation with the expanded schema, including the new fields.
- **AC-4**: Posts with `draft: true` are excluded from the homepage listing.
- **AC-5**: Posts with `draft: true` are not built as static pages in production. They remain visible during local development (`npm run dev`) for author preview.

## Options considered

### Option 1: Extend the existing Astro content collection schema with Zod

Add `tags` and `draft` as optional Zod fields in the existing `src/content.config.ts` schema. Astro's built in validation handles frontmatter parsing and type checking at build time.

**Pros**:

- Reuses the existing validation infrastructure, no new tools or dependencies
- Minimal change: two optional fields added to an existing schema
- Astro validates frontmatter automatically at build time, catching errors early

**Cons**:

- Tags are freeform strings with no central list; inconsistent tagging is possible (e.g. "web-dev" vs "webdev")
- Draft filtering must be applied explicitly at every query site (homepage, future listing pages)

### Option 2: Custom remark plugin for frontmatter processing

Write a remark plugin that processes frontmatter before Astro's content collection validation. The plugin could normalize tags, enforce a predefined tag list, or apply draft logic at the transformer level.

**Pros**:

- Could enforce tag normalization and consistency automatically
- Centralizes draft logic in one place rather than per query site

**Cons**:

- Adds complexity: a custom plugin to maintain for a problem that does not yet exist
- Duplicates what Zod already handles (validation, defaults, type coercion)
- Does not align with the Skateboard approach (build the minimum, grow later)

## Decision

**Chosen option**: Option 1: Extend the existing Astro content collection schema with Zod

The schema already uses Zod for validation in `src/content.config.ts`. Adding `tags` and `draft` as optional Zod fields is the simplest path: no new dependencies, no custom processing, and Astro's built in validation handles everything at build time. Option 2 would add complexity without benefit for a static blog with a handful of posts.

## Rationale

The decision prioritizes simplicity, consistent with the project's Skateboard build approach. The existing Zod schema is the right place for these fields because:

1. Astro content collections already validate frontmatter at build time using the Zod schema. Adding optional fields is a one line change per field.
2. Freeform tags (no predefined list) match the current scale: a handful of posts by a single author. A central tag list adds governance overhead that is not justified yet.
3. Draft filtering at query time is straightforward for a static site with one listing page (the homepage). Centralizing it in a utility can wait until more listing pages exist.

The main tradeoff is that freeform tags may lead to inconsistencies ("Web Dev" vs "webdev"). This is acceptable for a personal blog with a single author. Tag normalization (lowercase, trim) is noted as a follow up for when it becomes a real problem.

## Feature design

**Data model sketch**:

Post (Astro content collection, `src/content/posts/`):

| Field       | Type     | Required | Default | Notes                            |
| ----------- | -------- | -------- | ------- | -------------------------------- |
| title       | string   | yes      |         | Already exists                   |
| description | string   | yes      |         | Already exists                   |
| pubDate     | date     | yes      |         | Already exists, coerced          |
| updatedDate | date     | no       |         | Already exists, manual, optional |
| tags        | string[] | no       | []      | Freeform, any author typed value |
| draft       | boolean  | no       | false   | true = hidden from listings      |

No foreign keys, no relationships. Each post is a standalone Markdown file with frontmatter.

**State transitions**:

draft: false (published) to true (draft) and back. Binary toggle, no intermediate states. The author sets it in frontmatter; Astro reads it at build time.

**Tag rendering**: Tags are stored in frontmatter but not rendered on any page in this spec. Rendering (e.g. on the post page, tag based filtering, tag pages) is deferred to a future feature. This spec only defines the schema and validation.

**API surface**: Not applicable. Astro content collections are queried at build time, not through server endpoints.

**Key invariants**:

- Posts with `draft: true` must never appear in the homepage listing or be built as static pages in production
- Draft posts remain visible during local development (`npm run dev`) so the author can preview them; filtering uses `import.meta.env.PROD` to distinguish environments
- Tags must be an array of strings (no nested objects, no non string values)
- The schema must reject invalid frontmatter at build time via Zod validation
- Existing posts without `tags` or `draft` in frontmatter must continue to work (both fields have defaults)

**Security model**: Not applicable. The blog is a static site with no user authentication or authorization. All content is public once built and deployed.

**Configuration required**: None. No new environment variables or third party credentials.

**Critical test scenarios** (each maps to an acceptance criterion in Requirements):

- Happy path: author creates a post with `tags: ["astro", "web-dev"]` and `draft: false`, post appears in listing with correct metadata, verifies **AC-1**, **AC-3**
- Draft exclusion: author sets `draft: true`, post is excluded from the homepage listing and not built as a static page in production, verifies **AC-2**, **AC-4**, **AC-5**
- Dev preview: author sets `draft: true`, post is visible during `npm run dev` for preview but excluded from `npm run build` output, verifies **AC-5**
- Defaults: existing post with no `tags` or `draft` in frontmatter renders correctly with empty tags and draft false, verifies **AC-1**, **AC-2**, **AC-3**
- Validation: post with invalid frontmatter (e.g. `tags: "not-an-array"`) fails build with a clear Zod error message, verifies **AC-1**

## Build plan

1. [x] Update the Zod schema in `src/content.config.ts` to add `tags` as `z.array(z.string()).optional().default([])` and `draft` as `z.boolean().optional().default(false)`, satisfies **AC-1**, **AC-2**
2. [x] Update `src/content/posts/hello-world.md` with sample frontmatter: `tags: ["intro"]` and omit `draft` (defaults to false), satisfying **AC-3**
3. [x] Update `src/pages/index.astro` to filter out posts where `draft` is true using `import.meta.env.PROD` (drafts visible in dev, hidden in production build), satisfies **AC-4**
4. [x] Update `src/pages/posts/[id].astro` to exclude draft posts from `getStaticPaths` using the same `import.meta.env.PROD` filter, so drafts are not built as static pages in production, satisfies **AC-5**

## Consequences

**Positive**:

- Authors can categorize posts by topic using tags, enabling future tag based features
- Authors can work on drafts without them appearing on the live site
- Schema validation catches invalid frontmatter at build time, not at runtime
- Minimal change: two optional fields added to existing schema, no new dependencies

**Negative / tradeoffs**:

- Freeform tags may lead to inconsistencies across posts (e.g. "web-dev" vs "webdev", "JS" vs "javascript")
- Draft filtering happens at query time; every future listing page must filter explicitly unless a utility is extracted

**Neutral**:

- Both new fields are optional with sensible defaults; existing posts without tags or draft continue to work unchanged
- Future features (tag pages, tag based filtering, tag normalization) will need additional implementation beyond this spec

## Follow-up

- [ ] Consider adding tag normalization (lowercase, trim) to prevent duplicate tags with different casing
- [ ] Draft filtering is now duplicated in `index.astro` and `[id].astro`; extract a shared utility function when more listing pages are added

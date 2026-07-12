# Scope: Personal Blog

A personal blog for a high school student going into computer science. Weekly learn-in-public posts targeting both students and senior engineers. Complements a social media presence, not replaces it.

**Build approach:** Skateboard (ship the thinnest usable whole, then grow it).
**Weight profile:** SEO and comments are full (cross cutting risk, compliance); everything else lean or medium.

## At a glance

| #   | Feature                    | Phase      | Status  |
| --- | -------------------------- | ---------- | ------- |
| 1   | Stack & architecture       | Foundation | done    |
| 2   | Coding standards & tooling | Foundation | done    |
| 3   | Design system              | Foundation | done    |
| 4   | Data model                 | Foundation | done    |
| 5   | Walking skeleton           | Release 1  | planned |
| 6   | Post page                  | Release 1  | planned |
| 7   | Homepage                   | Release 1  | planned |
| 8   | About page                 | Release 1  | planned |
| 9   | SEO enhancements           | Release 2  | planned |
| 10  | Privacy policy page        | Release 2  | planned |
| 11  | Page view counter          | Release 2  | planned |
| 12  | Newsletter signup          | Release 3  | planned |

## Foundation

### 1. Stack & architecture

Decide the full stack and scaffold a runnable project so every later feature builds on real structure.
**Done when:** the stack is recorded in a spec, and the empty scaffold boots locally and passes build.
**Spec**: [0001](../specs/0001-stack-and-architecture/index.md)

- [x] Decide the stack (spec): `/architect stack & architecture`
- [x] Scaffold from the decision: `/develop stack & architecture`
- [x] Smoke check it runs: `/test`

### 2. Coding standards & tooling

Capture conventions and install lint, format, pre-commit, and CI from the real scaffolded project. /audit already captured the conventions in AGENTS.md; /develop tooling installs them.
**Done when:** root AGENTS.md reflects the real stack, and lint, format, typecheck, and CI run clean.

- [x] Capture conventions and tooling choices: `/audit`
- [x] Install the tooling: `/develop tooling`
- [x] Check it runs clean: `/test`

### 3. Design system

Visual language, layout primitives, base components, and dark mode toggle so the blog feels cohesive and accessible.
**Done when:** a design spec covers type, color, spacing, components, and the dark mode toggle works with system preference detection.
**Spec**: [0002](../specs/0002-design-system/index.md)

- [x] Design it (spec): `/architect design system`
- [x] Build it: `/develop design system`
  - [x] Define design tokens and configure Tailwind theme in `src/styles/global.css` (AC-1, AC-2, AC-4)
  - [x] Swap Geist to self-hosted Inter via `@fontsource-variable/inter` (AC-1)
  - [x] Create layout containers and site header with dark mode toggle (AC-3, AC-4)
  - [x] Verify shadcn/ui component theming in both modes (AC-5)
  - [x] Replace hardcoded colors in existing pages with design tokens (AC-1, AC-2, AC-4, AC-5)
- [x] Verify it: `/check verify design system`
- [x] Test it: `/test design system`

### 4. Data model

Content collections schema for blog posts: title, date, description, tags, published status, draft flag. The foundation every content feature depends on.
**Done when:** the schema is defined in a spec and a sample post passes frontmatter validation.
**Spec**: [0003](../specs/0003-data-model/index.md)

- [x] Design it (spec): `/architect data model`
- [x] Build it: `/develop data model`
  - [x] Update Zod schema with tags and draft fields (AC-1, AC-2)
  - [x] Update sample post frontmatter (AC-3)
  - [x] Filter drafts from homepage listing (AC-4)
  - [x] Filter drafts from post detail page in production (AC-5)
- [x] Verify it: `/check verify data model`
- [x] Test it: `/test data model`

## Release 1: Smallest Usable Whole

The thinnest blog a reader would actually use: read a post, browse the listing, learn about the author.

### 5. Walking skeleton

One sample post renders through the full stack with minimal styling. Proves content collections, markdown processing, and page rendering all connect end to end.
**Done when:** a sample post appears at a URL with correct title, date, and body content.

- [ ] Build it: `/develop walking skeleton`
- [ ] Verify it: `/check verify walking skeleton`

### 6. Post page · needs a decision

Full post template with metadata (title, date, tags), reading experience, and social card preview. The core deliverable of the blog.
**Done when:** a post page renders with all frontmatter metadata, readable typography, and a social card preview.

- [ ] Design it (spec): `/architect post page`
- [ ] Build it: `/develop post page`
- [ ] Verify it: `/check verify post page`
- [ ] Test it: `/test post page`

### 7. Homepage · needs a decision

Post listing with excerpts, navigation to posts and about page. The entry point readers land on.
**Done when:** the homepage lists all published posts with title, date, and excerpt, and links to each post and the about page.

- [ ] Design it (spec): `/architect homepage`
- [ ] Build it: `/develop homepage`
- [ ] Verify it: `/check verify homepage`
- [ ] Test it: `/test homepage`

### 8. About page

Personal introduction, goals, and links. A static page with no dynamic behavior.
**Done when:** the about page exists, is linked from navigation, and has real content.

- [ ] Build it: `/develop about page`
- [ ] Verify it: `/check verify about page`

## Release 2: SEO & Legal

Make the blog discoverable and compliant before promoting it.

### 9. SEO enhancements · needs a decision · full

Structured data (JSON-LD), canonical URLs, Open Graph meta tags, social cards per post, sitemap.xml, and robots.txt. Full SEO so posts rank and share well.
**Done when:** every page has valid structured data, Open Graph tags, canonical URLs, and the sitemap includes all published posts.

- [ ] Design it (spec): `/architect SEO enhancements`
- [ ] Build it: `/develop SEO enhancements`
- [ ] Verify it: `/check verify SEO enhancements`
- [ ] Test it: `/test SEO enhancements`

### 10. Privacy policy page

A simple static page stating: no cookies, no tracking, no data collection. Good habit, minimal effort.
**Done when:** the privacy policy page exists and is linked from the site footer or navigation.

- [ ] Build it: `/develop privacy policy page`
- [ ] Verify it: `/check verify privacy policy page`

### 11. Page view counter · needs a decision

A privacy friendly hit counter on each blog post. No cookies, no personal data. Reference approach: hits.seeyoufarm.com SVG badge (third party, no database needed).
**Done when:** each post page shows a view count that updates over time, with graceful fallback on error.

- [ ] Design it (spec): `/architect page view counter`
- [ ] Build it: `/develop page view counter`
- [ ] Verify it: `/check verify page view counter`
- [ ] Test it: `/test page view counter`

## Release 3: Newsletter

### 12. Newsletter signup · needs a decision

Resend integration for collecting email subscribers. A form on the site that sends confirmation emails and stores subscribers.
**Done when:** a reader can enter their email, receive a confirmation, and be added to the subscriber list.

- [ ] Design it (spec): `/architect newsletter signup`
- [ ] Build it: `/develop newsletter signup`
- [ ] Verify it: `/check verify newsletter signup`
- [ ] Test it: `/test newsletter signup`

## Deferred

Out of scope for the current build pass, kept so the plan stays honest.

- **Comments section**: Supabase database, Cloudflare Turnstile spam protection, moderation tools. Full weight, needs spec.
- **Pagination**: defer until the blog has 10 or more posts. Lean weight, no spec needed.
- **RSS feed**: Astro native support, low priority. Lean weight, no spec needed.

## Legend

**The decision box.** Every feature carries exactly one, the sub-task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State                        | Set by                           | The feature shows                                                                                                                                                               |
| ---------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `planned` · needs a decision | `/scope`                         | one box: `Design it (spec): /architect <feature>`                                                                                                                               |
| `in-progress` (designed)     | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones rolled up from the spec**; `Verify it` + `Test it` boxes; any surfaced follow-up enrolled |
| `in-progress` (building)     | `/develop`                       | milestone sub-boxes tick one by one; code pointer filled                                                                                                                        |
| `in-progress` (verified)     | `/check verify`                  | `Build it` + milestones ticked; `Verify it` ticked                                                                                                                              |
| `done`                       | `/test`, then `/sync`            | all boxes ticked; `/sync` captures the slice's conventions into `AGENTS.md`                                                                                                     |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre-workflow) and `dropped` (de-scoped, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Weight tag** `· full` = a fresh-model `/check review` warranted; `lean`/`medium` get no tag.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.

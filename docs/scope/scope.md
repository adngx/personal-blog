# Scope: Personal Blog

A personal blog for a high school student going into software development. Weekly learn-in-public posts targeting both students and senior engineers. Complements a social media presence, not replaces it.

**Build approach:** Skateboard (ship the thinnest usable whole, then grow it).
**Weight profile:** SEO and comments are full (cross cutting risk, compliance); everything else lean or medium.

## At a glance

| #   | Feature                    | Phase      | Status      |
| --- | -------------------------- | ---------- | ----------- |
| 1   | Stack & architecture       | Foundation | done        |
| 2   | Coding standards & tooling | Foundation | done        |
| 3   | Design system              | Foundation | done        |
| 4   | Data model                 | Foundation | done        |
| 5   | Walking skeleton           | Release 1  | done        |
| 6   | Post page                  | Release 1  | done        |
| 7   | Homepage                   | Release 1  | done        |
| 8   | About page                 | Release 1  | done        |
| 9   | SEO enhancements           | Release 2  | done        |
| 10  | Site footer                | Release 2  | done        |
| 11  | Privacy policy page        | Release 2  | done        |
| 12  | Newsletter signup          | Release 3  | planned     |
| 13  | 404 page                   | Quick wins | done        |
| 14  | Reading time               | Quick wins | done        |
| 15  | Security headers           | Quick wins | done        |
| 16  | llms.txt                   | Quick wins | done        |
| 17  | RSS feed                   | Quick wins | done        |
| 18  | Per-post OG images         | Quick wins | done        |
| 19  | Comments section           | Release 3  | in-progress |

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

- [x] Build it: `/develop walking skeleton`
- [x] Verify it: `/check verify walking skeleton`

### 6. Post page · done · spec [0004](../specs/0004-post-page/index.md)

Full post template with metadata (title, date, tags), reading experience, and social card preview. The core deliverable of the blog.
**Done when:** a post page renders with all frontmatter metadata, readable typography, and a social card preview.

- [x] Design it (spec): `/architect post page`
- [x] Build it: `/develop post page`
  - [x] Install @tailwindcss/typography and shadcn Badge components (AC-4, AC-5)
  - [x] Update Layout.astro with OG and Twitter card meta tags (AC-6)
  - [x] Update post page template with all metadata display (AC-1, AC-2, AC-3, AC-4, AC-8)
  - [x] Update footer and add empty body fallback (AC-7, AC-9)
- [x] Verify it: `/check verify post page`
- [x] Test it: `/test post page`

### 7. Homepage · done · spec [0005](../specs/0005-homepage/index.md) · code in `src/pages/index.astro`

Post listing with excerpts, navigation to posts and about page. The entry point readers land on.
**Done when:** the homepage lists all published posts with title, date, and excerpt, and links to each post and the about page.

- [x] Design it (spec): `/architect homepage`
- [x] Build it: `/develop homepage`
  - [x] Update homepage layout with hero section (AC-1, AC-5, AC-8)
  - [x] Add featured post section (AC-2, AC-9)
  - [x] Update post feed to show all posts (AC-3)
  - [x] Add empty state handling (AC-4)
  - [x] Add JSON-LD structured data (AC-6)
  - [x] Update meta description (AC-7)
- [x] Verify it: `/check verify homepage`
- [x] Test it: `/test homepage`

### 8. About page · done · code in `src/pages/about.astro`

Personal introduction, goals, and links. A static page with no dynamic behavior.
**Done when:** the about page exists, is linked from navigation, and has real content.

- [x] Build it: `/develop about page`
- [x] Verify it: `/check verify about page`
- [x] Test it: `/test about page`

## Release 2: SEO & Legal

Make the blog discoverable and compliant before promoting it.

### 9. SEO enhancements · done · full · spec [0009](../specs/0009-seo-enhancements.md)

Structured data (JSON-LD), canonical URLs, Open Graph meta tags, social cards per post, sitemap.xml, and robots.txt. Full SEO so posts rank and share well.
**Done when:** every page has valid structured data, Open Graph tags, canonical URLs, and the sitemap includes all published posts.

- [x] Design it (spec): `/architect SEO enhancements`
- [x] Build it: `/develop SEO enhancements`
  - [x] Add env vars to Zod schema and configure Astro site (AC-10, AC-11, AC-1)
  - [x] Update Layout.astro with canonical URL, complete OG/Twitter tags, title format (AC-1, AC-2, AC-3, AC-4)
  - [x] Add JSON-LD to post and about pages (AC-5, AC-6, AC-7)
  - [x] Generate OG image PNG fallback (AC-12)
  - [x] Install @astrojs/sitemap and create robots.txt (AC-8, AC-9)
  - [x] Write tests for SEO logic
- [x] Verify it: `/check verify SEO enhancements`
- [x] Test it: `/test SEO enhancements`

### 10. Site footer · done · spec [0010](../specs/0010-site-footer/index.md)

Site wide footer component with social links, navigation, copyright, and "Built with Astro" badge. Renders on every page via Layout.astro.
**Done when:** the footer displays social links, nav links, copyright, and the Astro badge on every page, with responsive layout and accessible markup.

- [x] Design it (spec): `/architect site footer`
- [x] Build it: `/develop site footer`
  - [x] Create site-footer.astro with social links, nav, copyright, and Astro badge (AC-2, AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9)
  - [x] Add SiteFooter to Layout.astro (AC-1)
- [x] Verify it: `/check verify site footer`
- [x] Test it: `/test site footer`

### 11. Privacy policy page · done · code in `src/pages/privacy-policy.astro`

A simple static page stating: no cookies, no tracking, no data collection. Good habit, minimal effort.
**Done when:** the privacy policy page exists and is linked from the site footer or navigation.

- [x] Build it: `/develop privacy policy page` · code in `src/pages/privacy-policy.astro`
- [x] Verify it: `/check verify privacy policy page`

## Release 3: Newsletter

### 12. Newsletter signup · needs a decision

Resend integration for collecting email subscribers. A form on the site that sends confirmation emails and stores subscribers.
**Done when:** a reader can enter their email, receive a confirmation, and be added to the subscriber list.

- [ ] Design it (spec): `/architect newsletter signup`
- [ ] Build it: `/develop newsletter signup`
- [ ] Verify it: `/check verify newsletter signup`
- [ ] Test it: `/test newsletter signup`

### 19. Comments section · in-progress

Giscus integration for reader comments on blog posts. Uses GitHub Discussions as the backend. Readers authenticate with their GitHub account to comment.
**Done when:** comments render on every post page, load lazily, and follow the site's theme.

- [x] Design it (spec): `/architect comments section`
- [ ] Build it: `/develop comments section`
  - [ ] Install @giscus/react and create component (AC-1, AC-3, AC-4, AC-5, AC-6, AC-7)
  - [ ] Integrate into post page (AC-1, AC-2)
- [ ] Verify it: `/check verify comments section`
- [ ] Test it: `/test comments section`
      Spec [0012](../specs/0012-comments-section.md)

## Quick Wins

### 13. 404 page · done · spec [0011](../specs/0011-404-page.md) · code in `src/pages/404.astro`

Custom 404 page for unmatched routes. Uses existing Layout, centered message with link home.

- [x] Build it: `/develop 404 page`
- [x] Verify it: `/check verify 404 page`

### 14. Reading time · done · code in `src/lib/reading-time.ts`

Estimated reading time on each post page. Pure utility that counts words and divides by 230 wpm.

- [x] Build it: `/develop reading time`
- [x] Verify it: `/check verify reading time`
- [x] Test it: `/test reading time`

### 15. Security headers · done · code in `public/_headers`

HTTP security headers for Cloudflare Pages: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP.

- [x] Build it: `/develop security headers`

### 16. llms.txt · done · code in `src/pages/llms.txt.ts` and `src/pages/llms-full.txt.ts`

LLM-friendly site overview files. llms.txt has page/post links with descriptions. llms-full.txt includes full post content.

- [x] Build it: `/develop llms.txt`
- [x] Verify it: `/check verify llms.txt`

### 17. RSS feed · done · code in `src/pages/rss.xml.ts`

Standard RSS feed at /rss.xml with auto-discovery link in Layout head. Uses @astrojs/rss.

- [x] Build it: `/develop RSS feed`
- [x] Verify it: `/check verify RSS feed`

### 18. Per-post OG images · done · code in `scripts/generate-og.mjs`

Dynamic social preview images with each post's title baked in. Generated at build time from SVG template.

- [x] Build it: `/develop per-post OG images`
- [x] Verify it: `/check verify per-post OG images`

## Deferred

Out of scope for the current build pass, kept so the plan stays honest.

- **Pagination**: defer until the blog has 10 or more posts. Lean weight, no spec needed.

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

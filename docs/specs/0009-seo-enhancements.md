# 0009. SEO Enhancements

**Date**: 2026-07-13
**Status**: Accepted

## Summary

Add complete SEO coverage to every page: structured data (JSON-LD), canonical URLs, Open Graph and Twitter card tags, a sitemap, and a robots file. The blog already has partial OG tags and homepage JSON-LD. This enhancement fills the gaps so posts rank in search results and share well on social media. The work is additive; no existing behavior changes.

## Context

The blog has basic SEO from the post page feature (spec 0004) and homepage feature (spec 0005). Posts get `og:title`, `og:description`, and `og:type`. The homepage gets WebSite and Blog JSON-LD schemas. But several critical pieces are missing:

- No canonical URLs anywhere. Search engines may index duplicate content.
- No `og:image` on any page. Social shares show text only previews.
- Incomplete Twitter card tags (missing `twitter:image`, `twitter:site`, `twitter:creator`).
- No JSON-LD on individual posts or the about page.
- No sitemap.xml. Search engines have no index of published posts.
- No robots.txt file. Crawlers have no guidance.
- Page titles are bare (no site name suffix). Less brand context in search results.
- The `site` property is not set in `astro.config.mjs`. `Astro.site` falls back to `https://example.com`.

The scope feature (row 9) calls for "full SEO so posts rank and share well." Done when: every page has valid structured data, Open Graph tags, canonical URLs, and the sitemap includes all published posts.

## Requirements

**User stories**:

- As a search engine, I want structured data and a sitemap so I can index and rank blog posts correctly.
- As a social media user, I want rich preview cards (image, title, description) when someone shares a blog post.
- As the blog owner, I want SEO configured via environment variables so I can deploy to different domains without code changes.

**Acceptance criteria**:

- **AC-1**: Every page has a `<link rel="canonical">` tag pointing to its canonical URL using the configured domain.
- **AC-2**: Every page has complete Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:image:width`, `og:image:height`, `og:image:type`, `og:site_name`. The `og:site_name` value comes from a `SITE_NAME` constant (default: "Personal Blog").
- **AC-3**: Every page has complete Twitter card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`, `twitter:creator`. Post pages use `summary_large_image` card type; other pages use `summary`.
- **AC-4**: Every page has a `<title>` in "Title | Site Name" format.
- **AC-5**: Homepage JSON-LD includes WebSite and Blog schemas (verify existing implementation).
- **AC-6**: Each post page has a BlogPosting JSON-LD schema with `headline`, `datePublished`, `dateModified` (mapped from `updatedDate` frontmatter), `author`, `description`, `image`, and `url`.
- **AC-7**: About page has a Person JSON-LD schema with `name`, `url`, and `sameAs` (social links).
- **AC-8**: A sitemap.xml is generated at build time and includes all published posts and static pages.
- **AC-9**: A robots.txt file exists at the root, allows all crawlers, and links to the sitemap.
- **AC-10**: The site URL is configured via a `SITE_URL` environment variable, validated with Zod at startup.
- **AC-11**: The Twitter handle is configured via a `TWITTER_HANDLE` environment variable, validated with Zod at startup.
- **AC-12**: When no `og:image` is provided for a page, a fallback PNG is generated at build time (1200x630, white background, dark text, post title centered). Generated via an Astro component that renders to a static PNG file in the build output. Note: some social platforms (Facebook, LinkedIn) do not render SVG images, so PNG is required for reliable social previews.

## Options considered

### Option 1: Fix in place (incremental additions)

Add the missing SEO pieces one by one to the existing Layout and page files. No architectural changes; just fill in the gaps.

**Pros**:

- Minimal code change. Each addition is small and isolated.
- No new dependencies beyond `@astrojs/sitemap`.
- Easy to review and verify each AC independently.

**Cons**:

- Layout.astro grows larger as it handles more meta tag logic.
- OG image SVG generation adds some complexity to the build.

### Option 2: Extract SEO component

Create a dedicated `SEOHead` component that encapsulates all meta tag, JSON-LD, and OG logic. Pages pass structured props.

**Pros**:

- Cleaner separation of concerns. SEO logic in one place.
- Easier to test SEO output independently.

**Cons**:

- More refactoring upfront. Existing pages need prop changes.
- Overkill for a small blog with 3 posts.
- Adds indirection without proportional benefit yet.

### Option 3: Use an Astro SEO integration

Install a third party Astro SEO integration (like `astro-seo`).

**Pros**:

- Battle tested SEO patterns.
- Less custom code to maintain.

**Cons**:

- Adds a dependency for something Astro handles natively with meta tags.
- May not support Astro content collections well.
- Another thing to keep updated.

## Decision

**Chosen option**: Option 1: Fix in place

Add the missing SEO pieces incrementally to the existing files. This aligns with the Skateboard build approach: ship the smallest useful change, then grow. The blog has 3 posts and a few pages; a dedicated component or integration is premature.

**Implementation skills**: `astro-mcp` (Astro docs search for sitemap and meta tag patterns)

## Rationale

The blog is small (3 posts, 2 static pages). The existing Layout.astro already handles OG tags and title; extending it is natural. Each AC maps to a small, testable addition:

- Layout.astro gets canonical URL, complete OG/Twitter tags, and title format.
- Post page gets BlogPosting JSON-LD.
- About page gets Person JSON-LD.
- `astro.config.mjs` gets `site` from env var.
- `src/env.ts` (Zod schema) gets `SITE_URL` and `TWITTER_HANDLE`.
- `public/robots.txt` is a static file.
- `@astrojs/sitemap` handles sitemap generation.

The SVG fallback for og:image is the right tradeoff: it works without external assets, generates at build time, and can be replaced with a real image later. A static image file would require the engineer to create one; skipping og:image means poor social previews.

Option 2 (SEO component) is the right move if the blog grows to 50+ posts with varied metadata needs. Option 3 (third party integration) adds dependency risk for minimal gain over Astro's native meta tag support.

## Feature design

**Data model sketch**: No new entities. Uses existing `posts` and `pages` content collections.

**API surface**: Not applicable. Static site generation only.

**Configuration required**:

- `SITE_URL`: The canonical site URL (e.g., `https://personal-blog.pages.dev`). Validated with Zod at build time. Required in production (build fails with clear error if missing); optional in development (defaults to `http://localhost:4321`).
- `TWITTER_HANDLE`: The Twitter/X username (e.g., `@yourhandle`). Validated with Zod. Optional; when empty, `twitter:site` and `twitter:creator` tags are omitted.
- `SITE_NAME`: A constant (not env var) defaulting to "Personal Blog". Used for `og:site_name` and title suffix.

**Key invariants**:

- Every page must have at least `og:title`, `og:description`, `og:type`, `og:url`, `og:image`.
- Canonical URLs must be absolute (include protocol and domain).
- JSON-LD must be valid JSON (no trailing commas, proper escaping).

**Critical test scenarios** (each maps to an acceptance criterion):

- Happy path: post page has all meta tags, JSON-LD, and canonical URL, verifies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-6**
- Edge case: post with no explicit description uses frontmatter description, verifies **AC-2**, **AC-6**
- Edge case: about page renders Person JSON-LD with social links, verifies **AC-7**
- Config validation: missing SITE_URL in production fails fast, verifies **AC-10**

## Build plan

1. **Add environment variables to Zod schema** (`src/env.ts`), satisfies **AC-10**, **AC-11**
2. **Configure `site` in astro.config.mjs** using `SITE_URL` env var (makes `Astro.site` available for URL construction)
3. **Update Layout.astro with canonical URL, complete OG/Twitter tags, and title format**, satisfies **AC-1**, **AC-2**, **AC-3**, **AC-4** (this step actually injects the `<link rel="canonical">` tag)
4. **Add BlogPosting JSON-LD to post page** (`src/pages/posts/[id].astro`), satisfies **AC-6**
5. **Add Person JSON-LD to about page** (`src/pages/about.astro`), satisfies **AC-7**
6. **Verify homepage JSON-LD** (existing WebSite + Blog schemas), satisfies **AC-5**
7. **Create OG image SVG fallback** (generate inline SVG with title text), satisfies **AC-12**
8. **Install and configure @astrojs/sitemap** (exclude draft posts in production, exclude 404 page), satisfies **AC-8**
9. **Create robots.txt** (`public/robots.txt`), satisfies **AC-9**
10. **Write tests for SEO logic** (meta tag generation, JSON-LD construction, image generation) using Vitest. Test that: Layout renders correct meta tags for different page types; post page JSON-LD matches BlogPosting schema; about page JSON-LD matches Person schema; missing SITE_URL in production throws build error.

## Consequences

**Positive**:

- Every page has complete, valid SEO metadata.
- Social media shares show rich preview cards with images.
- Search engines can discover and index all content via sitemap.
- SEO configuration is environment driven, deployable anywhere.

**Negative / tradeoffs**:

- Layout.astro grows larger with more meta tag logic.
- SVG fallback images are text only; real images would look better.
- Two new env vars to manage across environments.

**Neutral**:

- `@astrojs/sitemap` adds a build dependency (standard Astro integration).
- OG image SVG generation adds a small build step.

## Follow-up

- [ ] Consider a dedicated `SEOHead` component if the blog grows beyond 20 posts.
- [ ] Replace PNG fallback with a real default OG image when a brand image is created.

## References

**Project sources**:

- `AGENTS.md` (stack, build approach, rules)
- Spec 0004 (post page, OG tag follow-ups deferred to this feature)
- Spec 0005 (homepage, existing JSON-LD implementation)
- `src/layouts/Layout.astro` (current meta tag implementation)
- `src/pages/posts/[id].astro` (post page structure)
- `src/pages/about.astro` (about page structure)

**Practices & standards**:

- Schema.org structured data (JSON-LD)
- Open Graph Protocol
- Twitter Cards
- Astro sitemap integration

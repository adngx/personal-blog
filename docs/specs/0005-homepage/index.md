# 0005. Homepage

**Date**: 2026-07-13
**Status**: Accepted

## Summary

The homepage is the entry point readers land on. It displays a hero section with the blog title, tagline, and a call to action button linking to the latest post. Below that, the latest post is highlighted in a featured section with title, date, description, and tags. The rest of the published posts appear in a feed with title, date, and description. The page uses the existing design system and components, is responsive on mobile, and includes structured data for SEO.

## Requirements

**User stories**:

- As a reader, I want to see a welcoming homepage with a clear introduction so that I understand what this blog is about.
- As a reader, I want to see the latest post highlighted so that I can quickly find new content.
- As a reader, I want to browse all published posts so that I can explore the blog's content.
- As a reader, I want the homepage to work well on mobile so that I can read on any device.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: Homepage displays a hero section with blog title, tagline, and a CTA button linking to the latest post.
- **AC-2**: Homepage displays the latest post in a featured section with title, date, description, and tags.
- **AC-3**: Homepage displays all published posts in a feed with title, date, and description.
- **AC-4**: Homepage shows a friendly "No posts yet" message when no posts exist.
- **AC-5**: Homepage uses semantic HTML with a `<header>` landmark for the hero section.
- **AC-6**: Homepage includes JSON-LD structured data for WebSite and Blog schemas.
- **AC-7**: Homepage has a custom meta description for SEO.
- **AC-8**: Homepage is responsive, stacking sections vertically on mobile.
- **AC-9**: Homepage reuses existing Badge and Button components from shadcn/ui.

## Decision

**Chosen option**: Option 1: Enhanced homepage with hero, featured post, and feed

The homepage will be enhanced from its current state (basic hero with title and tagline, post listing) to include a CTA button, featured post section, and improved post feed. This follows the skateboard approach by building on what already works while adding the most impactful improvements first.

**Implementation skills**: `shadcn` (`JavaScript-Mastery-Pro/skills`, `.agents/skills/shadcn/`)

## Feature design

**Data model sketch**:
No new data model changes. The homepage reads from the existing `posts` content collection defined in `src/content.config.ts`. The schema includes:

- `title`: required string
- `description`: required string
- `pubDate`: required date
- `updatedDate`: optional date
- `tags`: optional string array (defaults to `[]`)
- `draft`: optional boolean (defaults to `false`)

**State transitions**:
Not applicable. The homepage is a read-only view of published posts.

**API surface**:
Not applicable. The homepage is a static page generated at build time.

**Key invariants**:

- The featured post must be the most recently published non-draft post.
- The post feed must exclude the featured post to avoid duplication.
- All posts must be sorted by publication date in descending order.

**Security model**:
Not applicable. The homepage is a public page with no authentication or authorization requirements.

**Configuration required**:
No new environment variables or credentials needed.

**Critical test scenarios** (each maps to an acceptance criterion in Requirements):

- Happy path: Homepage loads with hero, featured post, and post feed, verifies AC-1, AC-2, AC-3.
- Empty state: Homepage shows friendly message when no posts exist, verifies AC-4.
- Mobile view: Homepage stacks sections vertically on small screens, verifies AC-8.

## Build plan

- [x] 1. Update homepage layout with hero section using `<header>` landmark, title, tagline, and CTA button, satisfies **AC-1**, **AC-5**, **AC-8**.
- [x] 2. Add featured post section displaying the latest post with title, date, description, and tags using Badge component, satisfies **AC-2**, **AC-9**.
- [x] 3. Update post feed to display all published posts except the featured post, satisfies **AC-3**.
- [x] 4. Add empty state handling with friendly message when no posts exist, satisfies **AC-4**.
- [x] 5. Add JSON-LD structured data for WebSite and Blog schemas, satisfies **AC-6**.
- [x] 6. Pass a custom meta description from the homepage to Layout (Layout already accepts the prop), satisfies **AC-7**.
- [x] 7. Ensure responsive design with proper mobile stacking, satisfies **AC-8**.

## Consequences

**Positive**:

- Improved first impression for new visitors with clear blog introduction.
- Better content discoverability with featured post highlighting.
- Enhanced SEO with structured data and custom meta description.
- Consistent design using existing components and design tokens.

**Negative / tradeoffs**:

- Slightly more complex homepage layout to maintain.
- Featured post logic adds a small amount of conditional rendering.
- JSON-LD structured data requires maintenance if schema changes.

**Neutral**:

- Reuses existing Badge component (established pattern from post page) and Button component (available in design system), no new dependencies.
- Follows established patterns from post page implementation.

## Follow-up

- [ ] Consider adding a "View all posts" link at the bottom of the feed if the list grows long.
- [ ] Monitor performance with many posts and add pagination if needed (deferred feature #12).

## Rationale

Reasoning and options: see [rationale.md](rationale.md).

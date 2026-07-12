# 0004. Post page

**Date**: 2026-07-12
**Status**: Accepted

## Summary

The post page is the core deliverable of the blog. It displays a single blog post with all frontmatter metadata (title, publication date, optional updated date, tags), renders the markdown body with readable typography, and includes basic Open Graph meta tags for social sharing. The page uses a linear layout with the existing design system and adds two new components: the Tailwind Typography plugin for article prose and a shadcn Badge component for tag display.

## Context

The blog currently has a basic post page that renders title, date, and markdown body, but it is missing several features the scope requires: tags are not displayed, updated date is not shown, the Tailwind Typography plugin is not installed (so the prose classes do nothing), and there are no Open Graph meta tags for social sharing. The post page is the primary way readers consume content, so it must display all metadata clearly and provide a good reading experience. Without these features, the blog feels incomplete and posts do not render well when shared on social media.

## Requirements

**User stories**:

- As a reader, I want to see all post metadata (title, date, tags) so that I understand when the post was written and what topics it covers.
- As a reader, I want the article body to be easy to read with proper typography so that I can focus on the content.
- As a reader, I want to navigate back to the homepage easily so that I can browse other posts.
- As someone sharing a post, I want social media previews to show the post title and description so that others know what the post is about.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: Display post title as h1 with design system typography
- **AC-2**: Display publication date formatted as "Month Day, Year" (e.g., "July 12, 2026")
- **AC-3**: Display updated date (if present) as "Updated: Month Day, Year"; hide if not present
- **AC-4**: Display tags as shadcn Badge components; hide section if tags array is empty
- **AC-5**: Render markdown body with @tailwindcss/typography prose styling
- **AC-6**: Add OG meta tags (og:title, og:description, og:type, og:url) and Twitter card tags (twitter:card, twitter:title, twitter:description) to page head
- **AC-7**: Footer with "Back to home" link (plain text, no arrow icon)
- **AC-8**: Long titles wrap correctly at all viewport widths (320px to 1280px) without horizontal overflow
- **AC-9**: Show fallback message ("No content available.") when post body has no rendered content (empty markdown or whitespace only)

## Options considered

### Option 1: Tailwind Typography + shadcn Badge

Use @tailwindcss/typography plugin for article prose styling and add a shadcn Badge component for tag display. This approach reuses the existing Tailwind v4 and shadcn/ui stack, requires minimal new code, and provides battle-tested typography defaults.

**Pros**:

- Reuses existing Tailwind and shadcn stack, no new paradigm to learn
- @tailwindcss/typography provides well-tested prose styling out of the box
- shadcn Badge is consistent with the existing design system

**Cons**:

- @tailwindcss/typography adds a dependency and some CSS bundle size
- Less control over typography than custom CSS

### Option 2: Custom prose CSS

Write custom CSS for article typography without the Tailwind Typography plugin. Style tags with plain spans.

**Pros**:

- Full control over typography styling
- No additional dependency

**Cons**:

- More work to implement and maintain
- Risk of missing edge cases (lists, blockquotes, code blocks) that the plugin handles

## Decision

**Chosen option**: Option 1: Tailwind Typography + shadcn Badge

Use @tailwindcss/typography plugin for article prose styling and add a shadcn Badge component for tag display. This approach reuses the existing Tailwind v4 and shadcn/ui stack, requires minimal new code, and provides battle-tested typography defaults.

## Rationale

The project already uses Tailwind CSS v4 and shadcn/ui, so choosing tools that fit this stack minimizes friction. @tailwindcss/typography is the standard solution for markdown prose styling in Tailwind projects and handles edge cases (lists, blockquotes, code blocks, tables) that custom CSS would need to cover manually. The shadcn Badge component follows the same pattern as the existing Button component (cva variants, base-ui primitives), so it integrates naturally. Custom prose CSS was considered but rejected because it would require significant effort to match the plugin's coverage and would be harder to maintain. The tradeoff is accepting the typography plugin's design choices over full custom control, which is acceptable for a personal blog where content readability matters more than pixel-perfect typography customization.

## Feature design

**Data model sketch**:
The existing content collection schema is complete. No changes needed.

| Field       | Type     | Required | Default |
| ----------- | -------- | -------- | ------- |
| title       | string   | yes      |         |
| description | string   | yes      |         |
| pubDate     | date     | yes      |         |
| updatedDate | date     | no       |         |
| tags        | string[] | no       | []      |
| draft       | boolean  | no       | false   |

**State transitions**: Not applicable (static content, no state machine).

**API surface**: Not applicable (static site generation, no API endpoints).

**Key invariants**:

- Tags section must be hidden when tags array is empty (not rendered as empty space)
- Updated date must be hidden when not present in frontmatter
- Post body fallback message must appear only when body has no rendered content (empty markdown or whitespace only)
- Prose styling must work in both light and dark modes (override prose-gray defaults with CSS custom properties from the design system)

**Security model**: Not applicable (public blog, no authentication, no sensitive data).

**Configuration required**:

- No new environment variables needed. OG tags use the post's frontmatter data and the site URL from Astro config.

**Critical test scenarios** (each maps to an acceptance criterion in Requirements):

- Happy path: Post with all metadata renders correctly with title, date, tags, and prose body, verifies AC-1, AC-2, AC-4, AC-5
- Edge case: Post with no tags and no updated date hides those sections cleanly, verifies AC-3, AC-4
- Edge case: Post with empty body shows fallback message, verifies AC-9
- Social sharing: Page head contains og:title, og:description, og:type meta tags, verifies AC-6

## Build plan

1. Install @tailwindcss/typography plugin and configure in global.css, satisfies **AC-5**
2. Add shadcn Badge component via CLI, satisfies **AC-4**
3. Update Layout.astro to accept and render OG and Twitter card meta tags, satisfies **AC-6**
4. Update post page template to display all metadata (title, date, updatedDate, tags), satisfies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-8**
5. Update post page footer with plain "Back to home" link, satisfies **AC-7**
6. Add empty body fallback message, satisfies **AC-9**
7. Update sample post with updatedDate to test rendering, satisfies **AC-3**
8. Verify all acceptance criteria with manual testing, satisfies **AC-1** through **AC-9**

## Consequences

**Positive**:

- Post page displays all frontmatter metadata, making posts feel complete
- Readable typography improves the reading experience
- OG tags enable social media previews when posts are shared
- Reuses existing Tailwind and shadcn stack, no new dependencies beyond typography plugin

**Negative / tradeoffs**:

- @tailwindcss/typography adds a dependency and some CSS bundle size
- OG tags without og:image will show text-only previews (image generation deferred to future feature)
- shadcn Badge component adds one more UI component to maintain

**Neutral**:

- The post page template becomes more complex with conditional rendering for optional fields
- Future features (reading time, prev/next navigation) will add more complexity to this template

## Follow-up

- [ ] og:image generation is deferred. Consider adding a default site-wide OG image as a fallback until dynamic images are implemented.
- [ ] Reading time estimate is not in scope. Can be added later if desired.
- [ ] Previous/next post navigation is not in scope. Can be added when there are more posts.
- [ ] Canonical URLs (`<link rel="canonical">`) are not in scope. Should be added in feature #9 (SEO enhancements).
- [ ] Code syntax highlighting is not configured. Consider adding Shiki or Prism for code blocks in a future feature.

# 0012. Comments Section

**Date**: 2026-07-16
**Status**: Proposed

## Summary

Add a comments section to every blog post using Giscus, a lightweight system backed by GitHub Discussions. Readers authenticate with their GitHub account to comment. The component loads lazily when scrolled into view and follows the user's operating system color scheme. No database or backend code is needed; GitHub Discussions stores all data.

## Context

The blog currently has no way for readers to leave feedback or ask questions. A comments section encourages discussion, builds community, and gives the author direct signal on what resonates. The original scope considered a Supabase backed custom solution, but that approach requires a database schema, authentication flow, spam protection, and moderation tools. For a technical blog with a small audience, that complexity is not justified.

Giscus is a third party service that embeds a comment widget backed by GitHub Discussions. It requires a public GitHub repository with Discussions enabled and the Giscus app installed. Readers sign in with their GitHub account to comment, which naturally filters for the technical audience this blog targets. The widget renders as an iframe, so it cannot conflict with the site's styles or scripts.

The site uses Astro with React islands. The theme toggle component switches between light and dark mode by toggling a class on the document element. Giscus supports dynamic theme switching through post messages, but the simpler approach is to follow the operating system preference automatically. This avoids coupling the comment widget to the site's theme state.

## Requirements

**User stories**:

- As a reader, I want to leave a comment on a blog post so I can ask a question or share my thoughts.
- As a reader, I want to see existing comments on a post so I can learn from the discussion.
- As the blog owner, I want comments to load only when needed so the page stays fast.

**Acceptance criteria**:

- **AC-1**: Comments section renders on every blog post page below the article footer.
- **AC-2**: Comments load lazily using client visible hydration. No JavaScript ships until the user scrolls to the comments area.
- **AC-3**: Comments follow the user's operating system color scheme preference (light or dark) automatically.
- **AC-4**: Emoji reactions are enabled on the main post.
- **AC-5**: Comments section has a visible heading for accessibility and navigation.
- **AC-6**: The Giscus component uses the pathname mapping strategy so each post URL maps to one discussion.
- **AC-7**: The discussion category is set to Announcements so only maintainers and the Giscus bot can create new discussions.

## Options considered

### Option 1: Giscus (GitHub Discussions)

Embed the Giscus comment widget as a React island. GitHub Discussions stores all comments. Readers authenticate with their GitHub account.

**Pros**:

- Zero backend code, no database, no authentication to maintain
- Built in spam protection through GitHub's account system
- Familiar to technical audiences who already use GitHub
- Free and open source

**Cons**:

- Requires a public GitHub repository
- Only GitHub users can comment (excludes non technical readers)
- Comments live on GitHub, not in the blog's own data store
- Dependent on a third party service

### Option 2: Supabase backed custom comments

Build a custom comment system using Supabase for storage and authentication, with Cloudflare Turnstile for spam protection.

**Pros**:

- Full control over the comment data and presentation
- Can support any authentication method
- Comments stored in the blog's own database

**Cons**:

- Requires database schema, RLS policies, authentication flow, and spam protection
- Significant development and maintenance effort
- Supabase free tier pauses after 7 days of inactivity
- Over engineered for a personal blog

### Option 3: No comments

Keep the blog without comments. Use social media or email for reader feedback.

**Pros**:

- Zero implementation effort
- No third party dependencies
- No moderation burden

**Cons**:

- Misses the opportunity for on site discussion
- Readers must leave the blog to give feedback

## Decision

**Chosen option**: Option 1: Giscus (GitHub Discussions)

Giscus is the right choice for a technical blog. It requires no backend code, naturally filters for a technical audience through GitHub authentication, and the Announcements category prevents spam discussion creation. The dependency on a public repository is acceptable because the blog is already intended to be public.

**Implementation skills**: none (no community skills needed; uses the existing React island pattern from the theme toggle component)

## Rationale

The blog targets a technical audience, most of whom have GitHub accounts. Giscus leverages this by using GitHub Discussions as the backend, which eliminates the need for a custom database, authentication, and spam protection. The Supabase approach is not justified for a personal blog with a small audience. The "no comments" option misses the opportunity for on site discussion that builds community.

The pathname mapping strategy is the standard choice for blogs. Each post URL maps to exactly one discussion, and Giscus creates the discussion automatically when someone first comments. The Announcements category ensures only maintainers and the Giscus bot can create discussions, which prevents spam.

Using preferred color scheme for the theme is simpler than syncing with the site's theme toggle. It avoids coupling the comment widget to the site's internal state and works correctly for most users. The client visible loading strategy defers the iframe until the user scrolls to it, which keeps the initial page load fast.

## Feature design

**Data model sketch**: No new entities. Comments are stored in GitHub Discussions. The Giscus widget maps each post URL to a discussion using the pathname strategy.

**State transitions**: Not applicable. Comments are managed by GitHub Discussions.

**API surface**: Not applicable. The Giscus widget communicates directly with the GitHub API through an iframe.

**Key invariants**:

- The GitHub repository must be public for visitors to view discussions.
- The Giscus GitHub app must be installed on the repository.
- Discussions must be enabled in the repository settings.
- An Announcements category must exist in Discussions.

**Security model**: Comments are public. Readers authenticate with their GitHub account to comment. The Announcements category restricts discussion creation to maintainers and the Giscus bot. Moderation happens through GitHub's discussion moderation tools.

**Configuration required**:

- `GISCUS_REPO`: the repository in owner/name format (hardcoded in the component, not an environment variable)
- `GISCUS_REPO_ID`: the repository's GraphQL ID (obtained from giscus.app)
- `GISCUS_CATEGORY`: the discussion category name (Announcements)
- `GISCUS_CATEGORY_ID`: the category's GraphQL ID (obtained from giscus.app)

These are public identifiers, not secrets. They are hardcoded in the component.

**Critical test scenarios**:

- Happy path: comments section renders below the article footer with a heading and the Giscus widget, verifies AC-1, AC-5
- Lazy loading: comments section does not load JavaScript until scrolled into view, verifies AC-2
- Theme: comments widget follows the operating system color scheme, verifies AC-3
- Reactions: emoji reactions are enabled on the main post, verifies AC-4
- Mapping: each post URL maps to one discussion using pathname strategy, verifies AC-6
- Category: discussions are created in the Announcements category, verifies AC-7

## Build plan

1. **Install @giscus/react dependency**, satisfies AC-1
2. **Create src/components/comments/giscus comments.tsx** React island component with Giscus configuration, satisfies AC-1, AC-3, AC-4, AC-5, AC-6, AC-7
3. **Add comments component to src/pages/posts/[id].astro** after the article footer, satisfies AC-1, AC-2
4. **Write tests** to verify all acceptance criteria

## Consequences

**Positive**:

- Readers can discuss posts directly on the site.
- No backend code, database, or authentication to maintain.
- Comments are moderated through GitHub's existing tools.
- The component loads lazily, so page performance is not affected.

**Negative / tradeoffs**:

- Only GitHub users can comment, which excludes non technical readers.
- The blog depends on a third party service (Giscus and GitHub Discussions).
- The repository must be public.
- Comments live on GitHub, not in the blog's own data store.

**Neutral**:

- The Giscus widget renders as an iframe, which cannot conflict with the site's styles.
- Moderation happens through GitHub's discussion tools, not a custom interface.

## Follow-up

- [ ] Obtain Giscus configuration values (repo, repoId, category, categoryId) from giscus.app after enabling Discussions and installing the Giscus app.

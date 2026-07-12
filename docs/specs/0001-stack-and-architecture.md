# 0001. Stack and architecture

**Date**: 2026-07-11
**Status**: Proposed

## Summary

This decision establishes the full technical stack for a personal blog targeting a high school student going into computer science. The stack prioritizes simplicity, near zero cost, and fast iteration over scale or advanced features. Astro with static site generation forms the foundation, paired with Tailwind CSS for styling, shadcn/ui for components, and Cloudflare Pages for hosting. Dynamic features like comments and newsletter are deferred to later phases, using Supabase and Resend when needed.

## Context

A high school student wants to build a personal blog to document their computer science journey. The blog will host weekly learn in public posts, complementing a social media presence. The project must be near zero cost (free tier services only), simple enough to build and maintain alone, and fast to iterate on. The student has limited time between schoolwork and other commitments, so the stack must minimize operational overhead and debugging complexity.

The blog will start as a static site with mostly read only content. Dynamic features (comments, newsletter signup) are planned for later phases but should not complicate the initial architecture. SEO is important for discoverability, but advanced analytics can wait. The domain is already purchased on Cloudflare Registrar, making Cloudflare Pages the natural hosting choice.

## Requirements

**User stories**:
- As a reader, I want to read blog posts with good typography and fast loading so that I can focus on the content.
- As the author, I want to write posts in Markdown with frontmatter metadata so that I can publish quickly without fighting a CMS.
- As the author, I want the blog to be discoverable via search engines so that readers can find my posts.
- As the author, I want to deploy changes by pushing to Git so that publishing is simple and reliable.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):
- **AC-1**: The blog boots locally with `npm run dev` and serves content without errors.
- **AC-2**: A sample post renders with correct title, date, and body content at a URL.
- **AC-3**: The build passes with `npm run build` and produces static HTML files.
- **AC-4**: The dev server starts in under 5 seconds on a typical laptop.
- **AC-5**: TypeScript strict mode is enabled and catches type errors at compile time.

## Options considered

### Option 1: Astro with SSG only

Static site generation with Astro. All pages built at deploy time, served as static files from Cloudflare Pages. No server runtime needed.

**Pros**:
- Fastest possible page loads (no server processing)
- Cheapest hosting (static files are free on Cloudflare Pages)
- Simplest deployment (push to Git, Cloudflare builds and deploys)
- Best SEO (pre rendered HTML is fully crawlable)

**Cons**:
- Dynamic features require client side JavaScript or separate services
- Comments and newsletter signup need external services (Supabase, Resend)
- No real time features without significant complexity

### Option 2: Astro with SSG plus SSR islands

Static base with selective server rendering for dynamic features. Some pages rendered on request.

**Pros**:
- Enables dynamic features without client side JavaScript
- Better integration for comments and newsletter forms
- More flexibility for future features

**Cons**:
- Requires a server runtime (Cloudflare Workers or similar)
- Higher complexity and cost than pure SSG
- More moving parts to debug and maintain

### Option 3: Next.js with SSR

Full server side rendering with Next.js. Every page rendered on request.

**Pros**:
- Most flexible for complex applications
- Built in API routes and server components
- Large ecosystem and community

**Cons**:
- Requires a server runtime (not free on Cloudflare)
- More complex than needed for a simple blog
- Higher operational overhead for a solo developer

## Decision

**Chosen option**: Option 1: Astro with SSG only

The blog is primarily static content with minimal dynamic features. SSG provides the best performance, lowest cost, and simplest operation. Dynamic features like comments and newsletter signup can be added later as separate services without changing the core architecture.

**Implementation skills**: `supabase` (`supabase/agent-skills`, `.agents/skills/supabase/`) · `shadcn` (`shadcn/ui`, `.agents/skills/shadcn/`) · `resend` (`resend/resend-skills`, `.agents/skills/resend/`)

## Rationale

The decision prioritizes simplicity and cost over flexibility. A high school student building their first blog needs a stack that works reliably with minimal debugging. SSG eliminates server runtime complexity, reduces hosting costs to zero, and provides the best performance for readers. The tradeoff is that dynamic features require external services, but this is acceptable because:
1. Comments and newsletter are deferred to later phases
2. Supabase and Resend provide free tiers that cover initial needs
3. The blog's core value is content, not interactivity

The choice of Astro over other SSG frameworks (Next.js, Gatsby, 11ty) is driven by its focus on content sites, excellent Markdown support, and island architecture that allows adding interactive components later without full client side rendering.

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Language | TypeScript (strict) | Type safety catches bugs at compile time, already decided in AGENTS.md |
| Framework | Astro (latest) | Purpose built for content sites, excellent Markdown support, island architecture |
| Styling | Tailwind CSS | Utility first CSS, fast development, great with shadcn/ui |
| Component library | shadcn/ui | Pre built accessible components, customizable, works with Tailwind |
| Image optimization | Astro built in | Automatic optimization, lazy loading, no extra dependencies |
| Form handling | Astro actions | Type safe server side handling, no extra dependencies |
| SEO | Astro built in plus manual structured data | Simple, no extra dependencies, full control over structured data |
| Testing | Vitest | Fast, Vite native, great TypeScript support, already in AGENTS.md |
| Linting | ESLint plus Prettier | Industry standard, wide ecosystem, great TypeScript support |
| Primary DB | Supabase (deferred) | Free tier, PostgreSQL, real time subscriptions, already decided |
| Newsletter | Resend (deferred) | Free tier, simple API, already decided |
| Hosting | Cloudflare Pages | Free, fast, already have domain on Cloudflare Registrar |
| Package manager | npm | Already decided in AGENTS.md |

## Consequences

**Positive**:
- Near zero hosting costs (static files on Cloudflare Pages free tier)
- Fast page loads (pre rendered HTML, no server processing)
- Simple deployment (push to Git, automatic builds)
- Excellent SEO (pre rendered HTML is fully crawlable)
- Easy to maintain (no server runtime to debug)

**Negative / tradeoffs**:
- Dynamic features require external services (Supabase for comments, Resend for newsletter)
- No real time features without significant complexity
- Comments and newsletter signup need separate implementation phases

**Neutral**:
- Learning curve for Astro, Tailwind, and shadcn/ui (but these are modern, well documented tools)
- Need to manage multiple services (Supabase, Resend) for dynamic features
- Static site regeneration required for content updates (but this is fast with Astro)

## Follow-up

- [ ] Resend skill conventions not yet in root AGENTS.md `## Rules`; these apply to every file in the project and belong at root level
- [ ] Astro MCP (`mcp__astro-mcp__search_astro_docs`) is available in the environment but not yet noted in AGENTS.md under agent skills; add it after confirming it works with the scaffolded project
- [ ] Consider installing the `astro` community skill for Astro framework conventions; this will improve implementation guidance for this feature

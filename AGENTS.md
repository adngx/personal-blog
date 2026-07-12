# Personal Blog

## Stack

- **Language / Runtime**: TypeScript (strict), Node
- **Framework**: Astro (latest)
- **Key dependencies**: Supabase (comments DB), shadcn/ui (UI components), Resend (newsletter)
- **Package manager**: npm
- **Hosting**: Cloudflare Pages (domain is also bought on cloudflare registrar FYI)

## Build approach

**Skateboard**: ship the thinnest usable whole, then grow it. Start with posts and an about page, then layer on comments, newsletter, and RSS.

## Commands

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Test
npm run test
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md` (or `docs/specs/NNNN-title/index.md` when verify.md is present).

## Rules

- Functional and immutable by default. Pure functions, `const`, no mutation. Side effects pushed to edges.
- Strict TypeScript. No `any`. Exhaustive types.
- Organize by feature: `components/comments/`, `components/newsletter/`, etc.
- PascalCase for components, camelCase for functions and variables, kebab case for files.
- WCAG AA accessibility: semantic HTML, keyboard navigation, ARIA labels, color contrast.
- Conventional commits: `type(scope): description`.
- Validate env vars at startup with Zod.
- Astro islands do not share React context. Build each interactive widget as one self contained React island.
- Use Astro content collections for blog posts (`src/content/posts/`).
- Supabase free tier auto pauses after 7 days. Keep it alive with a weekly GitHub Action ping.

## Agent skills

- [architect](.agents/skills/architect/): `JavaScript-Mastery-Pro/skills`, runs structured discovery and writes build specs
- [audit](.agents/skills/audit/): `JavaScript-Mastery-Pro/skills`, bootstraps AGENTS.md context files
- [check](.agents/skills/check/): `JavaScript-Mastery-Pro/skills`, verify runtime behavior and fresh model code review
- [debug](.agents/skills/debug/): `JavaScript-Mastery-Pro/skills`, structured root cause investigation
- [develop](.agents/skills/develop/): `JavaScript-Mastery-Pro/skills`, turns specs into working code
- [document](.agents/skills/document/): `JavaScript-Mastery-Pro/skills`, generates PR descriptions, changelogs, release notes
- [scope](.agents/skills/scope/): `JavaScript-Mastery-Pro/skills`, turns product ideas into ordered feature plans
- [shadcn](.agents/skills/shadcn/): `shadcn/ui`, manages shadcn/ui components and styling
- [supabase](.agents/skills/supabase/): `supabase/agent-skills`, Supabase database, auth, and edge functions
- [supabase-postgres-best-practices](.agents/skills/supabase-postgres-best-practices/): `supabase/agent-skills`, Postgres performance and RLS best practices
- [sync](.agents/skills/sync/): `JavaScript-Mastery-Pro/skills`, reconciles AGENTS.md and scope after changes
- [test](.agents/skills/test/): `JavaScript-Mastery-Pro/skills`, writes test suites for built or changed code
- [resend](.agents/skills/resend/): `resend/resend-skills`, email sending and API integration
- [resend-cli](.agents/skills/resend-cli/): `resend/resend-skills`, Resend CLI management

### MCP servers (connected)

- Astro MCP (`mcp__astro-mcp__search_astro_docs`): live Astro docs search

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._

# 0010. Site Footer

**Date**: 2026-07-13
**Status**: Accepted

## Summary

Add a site wide footer component to the blog. The footer displays social links, navigation, copyright, and a "Built with Astro" badge. It renders on every page through the shared Layout. The footer follows the existing design system: minimalist black and white, Tailwind tokens, accessible markup.

## Requirements

**User stories**:

- As a reader, I want to see social links and navigation in the footer so I can connect with the author and navigate the site from any page.
- As the blog owner, I want a consistent footer on every page so the site feels complete and professional.

**Acceptance criteria**:

- **AC-1**: Footer renders on every page via `Layout.astro`.
- **AC-2**: Footer displays social links imported from `src/data/social-links.ts`.
- **AC-3**: Footer displays navigation links (Blog, About).
- **AC-4**: Footer displays copyright in "Copyright {year} {site name}" format, where year is computed at build time.
- **AC-5**: Footer displays the official "Built with Astro" badge (https://astro.badg.es/v2/built-with-astro/tiny.svg).
- **AC-6**: Footer is responsive: stacks vertically on mobile, horizontal row on desktop using `md:` breakpoint.
- **AC-7**: Footer uses design tokens from `global.css` (no hardcoded colors).
- **AC-8**: Footer uses semantic HTML (`<footer>`, `<nav>`, `<ul>`) and ARIA labels for accessibility.
- **AC-9**: External links (Astro badge) include `rel="noopener"` and appropriate `alt` text.

## Decision

**Chosen option**: Option 1: Single Astro component

Create `src/components/site-footer.astro` as a single component. It imports social links, computes the current year at build time, renders all sections, and gets added to Layout.astro after the slot. This follows the same pattern as the site header and aligns with the Skateboard approach: ship the thinnest usable whole.

**Implementation skills**: none (no community skills needed; uses existing Astro and Tailwind patterns)

## Rationale

Reasoning and options: see [rationale.md](rationale.md)

## Feature design

**Data model sketch**: No new entities. Uses existing `SocialLink` interface from `src/data/social-links.ts`.

**API surface**: Not applicable. Static Astro component, no endpoints.

**Key invariants**:

- Footer must render even if `socialLinks` is empty (graceful degradation).
- Copyright year is computed at build time, not client side.
- Nav links in footer match the header nav links (hardcoded, same as header).
- Astro badge SVG is served from external URL with fallback alt text for accessibility.

**Configuration required**: None. Uses existing `SITE_NAME` from `src/env.ts`.

**Critical test scenarios**:

- Happy path: footer renders with social links, nav, copyright, and Astro badge, verifies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**
- Edge case: empty social links array, footer still renders without errors, verifies **AC-2**
- Accessibility: footer uses semantic HTML and ARIA labels, verifies **AC-8**
- Responsive: footer stacks vertically on mobile (`md:` breakpoint), horizontal on desktop, verifies **AC-6**
- External link: Astro badge has `rel="noopener"` and alt text, verifies **AC-9**
- Dark mode: footer uses design tokens and renders correctly in both themes, verifies **AC-7**

## Build plan

1. **Create `src/components/site-footer.astro`** with social links, nav, copyright, and Astro badge. Uses Tailwind tokens and responsive classes. Satisfies **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-6**, **AC-7**, **AC-8**, **AC-9**
2. **Add SiteFooter to `src/layouts/Layout.astro`** after the slot. Satisfies **AC-1**
3. **Write tests in `src/components/site-footer.test.ts`** to verify all ACs.

## Consequences

**Positive**:

- Every page has a consistent footer with social links and navigation.
- The site feels more complete and professional.
- Footer links to the privacy policy page when it is built (feature 11).

**Negative / tradeoffs**:

- Layout.astro imports one more component (negligible impact).
- Social links are duplicated between the footer and the about page's "Connect" section (acceptable for a small blog).

**Neutral**:

- The "Built with Astro" badge links to astro.build, which is an external link.

## Follow-up

- [ ] When the privacy policy page (feature 11) is built, add a link to it in the footer.

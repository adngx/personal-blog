# 0010. Site Footer · Rationale

## Context

The blog has no site wide footer. The only footer is a minimal "Back to home" link on the post page (spec 0004, AC-7). The scope references a footer in the privacy policy feature (row 10): "linked from the site footer or navigation." A footer is a standard part of any website and provides consistent navigation and branding across all pages.

The site header (`src/components/site-header.astro`) already establishes the pattern: a sticky top bar with site name, navigation links, and a theme toggle. The footer should follow a similar structure at the bottom of every page.

Social links are already defined in `src/data/social-links.ts` and used on the about page. The footer will reuse this same data source.

## Options considered

### Option 1: Single Astro component

Create one `site-footer.astro` component that imports social links, renders all sections, and gets added to Layout.astro.

**Pros**:

- Simple. One file, no abstraction.
- Follows the same pattern as `site-header.astro`.
- Easy to test and maintain.

**Cons**:

- Layout.astro grows slightly larger with the import.

### Option 2: Separate footer sections as subcomponents

Split the footer into smaller components: `footer-social.astro`, `footer-nav.astro`, `footer-credits.astro`.

**Pros**:

- Each section is independently testable.
- More granular reuse if sections appear elsewhere.

**Cons**:

- Overkill for a simple footer. Three files for what is essentially a single layout element.
- Adds indirection without proportional benefit for a small blog.

### Option 3: React island for dynamic year

Use a React component to render the copyright year client side.

**Pros**:

- Year updates automatically without rebuilds.

**Cons**:

- Unnecessary JavaScript for a static value. Astro can compute the year at build time.
- Inconsistent with the Astro first approach.

## Rationale

The footer is a simple layout element with no dynamic behavior. A single Astro component matches the site header pattern and keeps the codebase flat. Option 2 (subcomponents) adds files without proportional benefit for three small sections. Option 3 (React island) introduces client side JavaScript for a value that Astro computes at build time.

The "Built with Astro" badge uses the official SVG from astro.badg.es, as specified by the Astro project. The copyright year uses `new Date().getFullYear()` in the Astro frontmatter, which runs at build time.

## References

**Project sources**:

- `AGENTS.md` (stack, build approach, rules)
- Spec 0004 (post page, existing footer pattern)
- `src/components/site-header.astro` (header pattern to match)
- `src/data/social-links.ts` (social links data)
- `src/env.ts` (SITE_NAME constant)
- `design.md` (design system, tokens)

**Practices & standards**:

- WCAG AA accessibility (semantic HTML, ARIA labels)
- Astro static site generation (build time computation)

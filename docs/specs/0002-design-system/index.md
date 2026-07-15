# 0002. Design system

**Date**: 2026-07-12
**Status**: Accepted

## Summary

This decision establishes the design system for the personal blog: a minimalist black and white visual language with clean whitespace, Inter font for body and headings, and a muted gray-blue accent for links and interactive elements. Tailwind CSS dark mode (class strategy) combined with shadcn/ui's CSS variable theming provides light and dark mode support, toggled from the header and defaulting to the user's system preference. The layout constrains prose to 680px for readability and uses 1100px for listings, both centered.

## Context

The blog is for a high school student going into software development. It needs a visual identity that feels clean, minimal, and content focused, not corporate or overly "developer" themed. The reference aesthetic is Expo's blog, but more muted: pure black and white base, no monospace fonts, no vibrant colors. WCAG AA accessibility is a project rule, so color contrast and semantic structure are requirements, not nice to haves.

The project already uses Tailwind CSS and shadcn/ui (decided in spec 0001). The current stylesheet is `src/styles/global.css`, which defines a full shadcn token set in oklch using Tailwind v4's CSS-first `@theme inline` configuration (no `tailwind.config.*` file). The project currently self-hosts Geist font via `@fontsource-variable/geist`. The design system must build on these tools and conventions, not introduce a separate styling framework. Both light and dark modes are needed from the start because the toggle is a core part of the blog's identity and accessibility story.

## Requirements

**User stories**:

- As a reader, I want comfortable typography and readable layout so that I can focus on blog content.
- As the reader, I want the blog to respect my system's color scheme preference so that it feels native to my device.
- As the author, I want a consistent visual language so that every page feels cohesive without manual styling per post.
- As the reader, I want to toggle between light and dark mode so that I can read in my preferred contrast.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

- **AC-1**: The blog uses Inter as its primary font, self-hosted via `@fontsource-variable/inter` (same pattern as the existing Geist import), with a clean sans-serif fallback stack. Body text renders at a readable size (16px base) with appropriate line height.
- **AC-2**: A complete light and dark color palette is defined as CSS custom properties and applied across all pages. Light mode uses a white background with black text; dark mode uses a black background with white text. A muted gray-blue accent is used for links and interactive elements in both modes, using a dedicated `--link` token that does not conflict with shadcn's existing `--accent` semantic token.
- **AC-3**: On first visit, the blog detects the user's operating system color scheme preference and applies the matching theme. The user can toggle between light and dark mode from the header. The chosen preference persists in `localStorage` and applies on subsequent visits and page navigations. When JavaScript is disabled, the blog renders correctly in the system's preferred color scheme via a CSS `prefers-color-scheme` fallback.
- **AC-4**: The blog has two layout widths: a narrow prose container (max-width 680px) for blog post content, and a wider container (max-width 1100px) for listings and general page content. Both are centered with consistent horizontal padding.
- **AC-5**: shadcn/ui components (Button, Card, Separator, Badge, Input, Form) render correctly in both light and dark modes with no visual artifacts, correct contrast, and consistent styling.

## Options considered

### Option 1: Tailwind dark mode (class strategy) with CSS custom properties and shadcn/ui theming

Configure Tailwind to use the `dark` class strategy. Extend the existing shadcn token set in `src/styles/global.css` (which uses Tailwind v4's `@theme inline` and oklch values). Add a dedicated `--link` token for the accent color. Use shadcn/ui's built-in CSS variable theming, which already follows this pattern.

**Pros**:

- Reuses the existing stack (Tailwind + shadcn/ui), no new tools or dependencies
- shadcn/ui components are already designed for this theming approach, minimal override work
- Class based toggle is simple to implement (add/remove `dark` on `<html>`)
- CSS custom properties make the token system visible and maintainable

**Cons**:

- Requires discipline: every new component must use tokens, not hardcoded colors
- Dark mode class must be managed in JavaScript for the toggle to work (not pure CSS)

### Option 2: Manual CSS media queries with custom stylesheet

Write all color and layout rules manually in a global CSS file. Use `prefers-color-scheme: dark` media queries for automatic dark mode. Override with a class for the manual toggle.

**Pros**:

- Full control over every style rule
- No dependency on Tailwind's dark mode implementation

**Cons**:

- Significant manual work to style every shadcn/ui component for both modes
- Duplicates what Tailwind and shadcn/ui already provide out of the box
- Harder to maintain as components are added
- Does not align with the existing stack decisions

## Decision

**Chosen option**: Option 1: Tailwind dark mode (class strategy) with CSS custom properties and shadcn/ui theming

This option extends the existing shadcn token set in `src/styles/global.css` rather than replacing it. The current token definitions (in oklch) are preserved. The design system adds a `--link` / `--link-foreground` token pair for the muted gray-blue accent, overrides `--background`, `--foreground`, `--muted-foreground`, `--border`, `--card`, and `--card-foreground` to match the black and white palette, and swaps the font from Geist to Inter. All other shadcn tokens (`--primary`, `--secondary`, `--destructive`, `--input`, `--ring`, `--popover`, `--radius`, etc.) remain as defined by shadcn/ui defaults unless the palette requires adjustment.

**Implementation skills**: `shadcn` (`shadcn/ui`, `.agents/skills/shadcn/`)

## Rationale

The decision prioritizes reuse over custom work. Tailwind CSS and shadcn/ui are already in the project (spec 0001). Both are designed around CSS custom properties for theming, which means dark mode support is a configuration task, not a build from scratch task. Option 2 would duplicate this work manually and create a maintenance burden as components are added.

The muted gray-blue accent was chosen over pure black and white (no accent) because links and interactive elements need to be visually distinguishable from body text for usability. A single muted accent keeps the minimalist feel while ensuring interactive elements are discoverable. The accent is intentionally restrained to stay closer to the black and white aesthetic the engineer prefers.

Inter was chosen over the existing Geist font because it is the most widely used font for clean, minimal web design, with excellent readability at body sizes and a full weight range for headings. Geist is already installed and working (via `@fontsource-variable/geist`), so the swap requires explicitly removing the Geist import and mapping, then adding Inter via the same `@fontsource-variable` pattern. The visual identity benefit of Inter over Geist is small, but the engineer expressed a clear preference for Inter. Self-hosting via `@fontsource-variable/inter` avoids any external CDN dependency, matching the pattern Geist already uses.

## Feature design

**Design tokens**:

The design system extends the existing shadcn token set in `src/styles/global.css`. All tokens use oklch for consistency. The full set below shows which tokens are overridden (marked with ✏️) and which remain at shadcn defaults (marked with ➖).

Light mode (`:root`):

| Token                    | Value                     | Status | Usage                                         |
| ------------------------ | ------------------------- | ------ | --------------------------------------------- |
| `--background`           | oklch(1 0 0)              | ✏️     | Page background (white)                       |
| `--foreground`           | oklch(0.145 0 0)          | ✏️     | Primary text (near-black)                     |
| `--card`                 | oklch(1 0 0)              | ✏️     | Card background (white)                       |
| `--card-foreground`      | oklch(0.145 0 0)          | ✏️     | Card text                                     |
| `--popover`              | oklch(1 0 0)              | ➖     | Popover background                            |
| `--popover-foreground`   | oklch(0.145 0 0)          | ➖     | Popover text                                  |
| `--primary`              | oklch(0.145 0 0)          | ➖     | Primary buttons, emphasis                     |
| `--primary-foreground`   | oklch(0.985 0 0)          | ➖     | Text on primary                               |
| `--secondary`            | oklch(0.96 0 0)           | ➖     | Secondary buttons                             |
| `--secondary-foreground` | oklch(0.205 0 0)          | ➖     | Text on secondary                             |
| `--muted`                | oklch(0.96 0 0)           | ➖     | Muted backgrounds (light gray)                |
| `--muted-foreground`     | oklch(0.48 0 0)           | ✏️     | Muted text (mid gray, metadata)               |
| `--accent`               | oklch(0.96 0 0)           | ➖     | Subtle hover/ghost highlights                 |
| `--accent-foreground`    | oklch(0.205 0 0)          | ➖     | Text on accent                                |
| `--destructive`          | oklch(0.577 0.245 27.325) | ➖     | Error/danger states                           |
| `--border`               | oklch(0.90 0 0)           | ✏️     | Borders, separators                           |
| `--input`                | oklch(0.90 0 0)           | ➖     | Input borders                                 |
| `--ring`                 | oklch(0.708 0 0)          | ➖     | Focus rings                                   |
| `--radius`               | 0.625rem                  | ➖     | Border radius                                 |
| `--link`                 | oklch(0.48 0.06 250)      | ✏️ NEW | Links, interactive elements (muted gray-blue) |
| `--link-foreground`      | oklch(0.985 0 0)          | ✏️ NEW | Text on link background                       |

Dark mode (`.dark`):

| Token                    | Value                     | Status | Usage                                           |
| ------------------------ | ------------------------- | ------ | ----------------------------------------------- |
| `--background`           | oklch(0.145 0 0)          | ✏️     | Page background (near-black)                    |
| `--foreground`           | oklch(0.985 0 0)          | ✏️     | Primary text (near-white)                       |
| `--card`                 | oklch(0.205 0 0)          | ✏️     | Card background (dark gray)                     |
| `--card-foreground`      | oklch(0.985 0 0)          | ✏️     | Card text                                       |
| `--popover`              | oklch(0.205 0 0)          | ➖     | Popover background                              |
| `--popover-foreground`   | oklch(0.985 0 0)          | ➖     | Popover text                                    |
| `--primary`              | oklch(0.985 0 0)          | ➖     | Primary buttons, emphasis                       |
| `--primary-foreground`   | oklch(0.145 0 0)          | ➖     | Text on primary                                 |
| `--secondary`            | oklch(0.269 0 0)          | ➖     | Secondary buttons                               |
| `--secondary-foreground` | oklch(0.985 0 0)          | ➖     | Text on secondary                               |
| `--muted`                | oklch(0.269 0 0)          | ➖     | Muted backgrounds (dark gray)                   |
| `--muted-foreground`     | oklch(0.63 0 0)           | ✏️     | Muted text (lighter gray in dark mode)          |
| `--accent`               | oklch(0.269 0 0)          | ➖     | Subtle hover/ghost highlights                   |
| `--accent-foreground`    | oklch(0.985 0 0)          | ➖     | Text on accent                                  |
| `--destructive`          | oklch(0.577 0.245 27.325) | ➖     | Error/danger states                             |
| `--border`               | oklch(0.30 0 0)           | ✏️     | Borders, separators (subtle)                    |
| `--input`                | oklch(0.30 0 0)           | ➖     | Input borders                                   |
| `--ring`                 | oklch(0.439 0 0)          | ➖     | Focus rings                                     |
| `--link`                 | oklch(0.65 0.06 250)      | ✏️ NEW | Links, interactive elements (lighter gray-blue) |
| `--link-foreground`      | oklch(0.145 0 0)          | ✏️ NEW | Text on link background                         |

Key distinction: `--accent` remains shadcn's subtle hover/ghost highlight (near-white in light, dark gray in dark). The blog's link color uses the new `--link` token, avoiding any conflict with shadcn's component semantics.

Typography:

| Property        | Value                          |
| --------------- | ------------------------------ |
| Font family     | `"Inter Variable", sans-serif` |
| Base size       | 16px                           |
| Line height     | 1.7 (body), 1.3 (headings)     |
| Weight body     | 400 (normal)                   |
| Weight headings | 700 (bold)                     |
| Weight metadata | 500 (medium)                   |

Font swap: remove the `@fontsource-variable/geist` import from `src/styles/global.css`, replace it with `@fontsource-variable/inter`, remove the `--font-sans` and `--font-heading` Geist mappings in `@theme inline`, and set `--font-sans` to `"Inter Variable", sans-serif`. No Google Fonts CDN needed; Inter is self-hosted just like Geist was.

Layout:

| Container | Max width                       | Usage                       |
| --------- | ------------------------------- | --------------------------- |
| Prose     | 680px                           | Blog post body content      |
| Wide      | 1100px                          | Post listings, page layouts |
| Padding   | 1.5rem (mobile), 2rem (desktop) | Horizontal gutter           |

These widths do not map to standard Tailwind `max-w-*` values. Define custom properties `--container-prose` (680px) and `--container-wide` (1100px) in the `@theme inline` block. The current pages use `max-w-2xl` (672px), which is close to 680px but should be updated to use the new prose container.

**State transitions** (dark mode toggle):
`system preference detected` → `theme applied (light or dark)` → `user toggles` → `new theme applied` → `localStorage updated` → `preference persists on next visit`

**API surface**: Not applicable. The design system is a configuration and styling concern with no server endpoints.

**Key invariants**:

- All color values reference CSS custom properties, never hardcoded hex values in component code
- Dark mode is toggled by adding or removing the `dark` class on the root `<html>` element, giving the user explicit control. A CSS `prefers-color-scheme` media query provides the default theme before JavaScript loads, so the blog renders correctly without JS. An inline script in `<head>` reads `localStorage` and applies the stored preference (or system default) before the first paint, preventing flash of wrong theme
- Font Inter is self-hosted via `@fontsource-variable/inter` in `src/styles/global.css`, with `--font-sans` set to `"Inter Variable", sans-serif` in `@theme inline`
- Prose content containers never exceed 680px max width
- The dark mode toggle state persists in `localStorage` under the key `theme` and restores on page load before the first paint
- System preference detection runs via `window.matchMedia('(prefers-color-scheme: dark)')` only when no `localStorage` value exists
- shadcn/ui components use the project's CSS variable theme in `src/styles/global.css`, not hardcoded colors
- Existing pages with hardcoded Tailwind color utilities (e.g. `bg-white`, `text-gray-900`, `text-gray-600`, `text-blue-600`, `prose prose-gray` in `Layout.astro`, `index.astro`, `[id].astro`) must be replaced with token-based equivalents during implementation

**Security model**: Not applicable. The design system has no authentication, authorization, or data handling. The `localStorage` key `theme` stores only a string value (`light` or `dark`), no sensitive data.

**Configuration required**: None. No new environment variables or third party credentials. Inter is self-hosted via `@fontsource-variable/inter`. The toggle stores its preference client-side in `localStorage`.

**Critical test scenarios** (each maps to an acceptance criterion in Requirements):

- Happy path: reader visits the blog, toggles dark mode from the header, sees the color palette switch, navigates to another page, theme persists, verifies **AC-2**, **AC-3**
- Failure case: reader has JavaScript disabled, the blog still renders correctly in the system's preferred color scheme. The CSS `prefers-color-scheme` media query applies the default theme. When JS is available, the inline `<head>` script reads `localStorage` and overrides the class before paint. These two mechanisms are compatible: the media query sets the default, the class overrides it, verifies **AC-2**, **AC-3**
- System preference: reader's OS is set to dark mode, visits the blog for the first time, dark mode is applied automatically without manual toggle, verifies **AC-3**

## Build plan

1. Extend the `@theme inline` block in `src/styles/global.css` with the design tokens (oklch values for `--link`, `--link-foreground`, and overrides for `--background`, `--foreground`, `--muted-foreground`, `--border`, `--card`, `--card-foreground` in both light and dark modes). Define `--container-prose` and `--container-wide` custom properties. All other shadcn tokens remain at their defaults, satisfies **AC-2**, **AC-4**
2. Remove the `@fontsource-variable/geist` import from `src/styles/global.css`. Add `@fontsource-variable/inter` in its place. Update `--font-sans` in `@theme inline` to `"Inter Variable", sans-serif` and remove the `--font-heading` Geist mapping, satisfies **AC-1**
3. Create layout container utility classes or components (prose at 680px using `--container-prose`, wide at 1100px using `--container-wide`) with responsive padding, satisfies **AC-4**
4. Build the site header with navigation links (Blog, About) and a dark mode toggle button. The toggle detects system preference on load, toggles the `dark` class on `<html>`, and persists the choice in `localStorage`. An inline `<head>` script restores the stored preference before first paint to prevent flash of wrong theme, satisfies **AC-3**
5. Verify shadcn/ui component theming (Button, Card, Separator, Badge, Input, Form) for both light and dark modes using the extended token set. Ensure `--accent` (shadcn ghost hover) and `--link` (blog accent) remain distinct, satisfies **AC-5**
6. Apply design system styles to existing pages (`Layout.astro`, `index.astro`, `src/pages/posts/[id].astro`): replace hardcoded Tailwind color utilities (`bg-white`, `text-gray-900`, `text-gray-600`, `text-blue-600`, `prose prose-gray`) with token-based equivalents, update `max-w-2xl` to the prose container, satisfies **AC-1**, **AC-2**, **AC-4**, **AC-5**

## Consequences

**Positive**:

- Cohesive visual foundation that every future page and component builds on
- Dark mode support is built in from the start, not retrofitted later
- CSS custom properties make the token system explicit and easy to adjust
- Reuses the existing Tailwind and shadcn/ui stack with zero new dependencies
- WCAG AA contrast is enforced by the token choices, not left to individual developers
- The `--link` token cleanly separates the blog's accent from shadcn's `--accent`, avoiding component conflicts

**Negative / tradeoffs**:

- Every new component must use design tokens for colors, not hardcoded values; this requires discipline
- The muted gray-blue accent may need contrast verification against both light and dark backgrounds to ensure WCAG AA compliance
- Swapping from Geist (already installed, self-hosted) to Inter (also self-hosted via `@fontsource-variable/inter`) changes the font's visual character slightly but introduces no external dependency

**Neutral**:

- The `dark` class on `<html>` is a convention that all future interactive components must follow
- CSS custom properties are not supported in very old browsers (IE11), but this is acceptable for a modern blog

## Follow-up

- [ ] `shadcn` conventions not yet in root AGENTS.md `## Rules`; these apply to every component in the project and belong at root level
- [ ] Verify WCAG AA contrast ratios for the muted gray-blue accent (oklch(0.48 0.06 250) on white, oklch(0.65 0.06 250) on near-black) using a contrast checker tool

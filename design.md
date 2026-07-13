# Design System

**Source**: Extracted from codebase (spec 0002 design system, `src/styles/global.css`)

## Character

Minimalist black and white. Clean whitespace. Content focused, not corporate or overly "developer" themed. The reference aesthetic is Expo's blog, but more muted: pure black and white base, no monospace fonts, no vibrant colors. A muted gray-blue accent for links and interactive elements.

## Build mandate

- Every new component must use design tokens for colors, not hardcoded values
- Dark mode is toggled by adding/removing the `dark` class on `<html>`
- Font Inter is self-hosted via `@fontsource-variable/inter`
- Prose content containers never exceed 680px max width
- WCAG AA accessibility: semantic HTML, keyboard navigation, ARIA labels, color contrast

## Typography

| Property        | Value                          |
| --------------- | ------------------------------ |
| Font family     | `"Inter Variable", sans-serif` |
| Base size       | 16px                           |
| Line height     | 1.7 (body), 1.3 (headings)     |
| Weight body     | 400 (normal)                   |
| Weight headings | 700 (bold)                     |
| Weight metadata | 500 (medium)                   |

## Layout

| Container | Max width                       | Usage                       |
| --------- | ------------------------------- | --------------------------- |
| Prose     | 680px                           | Blog post body content      |
| Wide      | 1100px                          | Post listings, page layouts |
| Padding   | 1.5rem (mobile), 2rem (desktop) | Horizontal gutter           |

## Components

- **Buttons**: shadcn/ui Button with variants (default, outline, secondary, ghost, destructive, link)
- **Badges**: shadcn/ui Badge for tags
- **Cards**: shadcn/ui Card for content containers
- **Theme toggle**: Moon/Sun icon button in header

## Dark mode strategy

`darkMode: 'class'` via Tailwind CSS. Toggle adds/removes `dark` class on `<html>`. Inline script in `<head>` restores stored preference before first paint to prevent flash of wrong theme.

## Icon library

`lucide-react` for Moon/Sun icons in theme toggle.

## Token file

`src/styles/global.css` — all design tokens defined as CSS custom properties in oklch.

# 0005. Homepage - Rationale

## Context

The homepage is the entry point readers land on. The current implementation from the walking skeleton phase has a basic hero with title and tagline, and lists posts with title, date, and description, linking to each post. While functional, it lacks visual hierarchy and doesn't effectively guide readers to the most important content.

The blog targets both students and senior engineers with weekly learn-in-public posts. The homepage needs to make a strong first impression, highlight fresh content, and provide easy navigation to all posts. It must also be SEO-friendly with structured data and proper meta tags.

The build approach is Skateboard: ship the thinnest usable whole, then grow it. This means enhancing the existing homepage with the most impactful improvements first, rather than building from scratch.

## Options considered

### Option 1: Enhanced homepage with hero, featured post, and feed

Add a hero section with blog title, tagline, and CTA button. Highlight the latest post in a featured section with larger visual treatment. Keep the post feed for all other posts. Reuse existing design system components.

**Pros**:

- Clear visual hierarchy guiding readers to latest content.
- Strong first impression with blog introduction.
- Reuses existing components, minimal new code.
- Follows skateboard approach by building on what works.

**Cons**:

- Slightly more complex layout to maintain.
- Featured post logic adds conditional rendering.

### Option 2: Keep current layout with basic hero and post feed

Keep the current layout with basic hero (title and tagline) and post listing. No CTA button, no featured post highlighting.

**Pros**:

- Simplest implementation, already exists.
- Fast to build, no new components needed.
- Easy to maintain.

**Cons**:

- Missed opportunity to make a strong first impression.
- No visual hierarchy for latest content.
- Doesn't effectively guide readers to fresh posts.

### Option 3: Hero section with featured post carousel

Add a hero section with a carousel of multiple featured posts. More visual, but significantly more complex.

**Pros**:

- Can highlight multiple posts at once.
- More dynamic and engaging.

**Cons**:

- Adds JavaScript for carousel functionality.
- More complex to implement and maintain.
- Overkill for a new blog with few posts.

## Rationale

Option 1 is the best fit for this project. It enhances the homepage with clear visual hierarchy and strong first impression while staying true to the skateboard approach. The hero section is enhanced with a CTA button, the featured post highlights fresh content, and the post feed provides easy access to all posts.

The existing design system and components (Badge, Button) are reused, minimizing new code and maintaining consistency. The implementation follows established patterns from the post page, reducing learning curve and potential bugs.

Option 2 is too minimal and misses the opportunity to engage new visitors. Option 3 adds unnecessary complexity for a new blog with few posts. Option 1 strikes the right balance between impact and effort.

The featured post is automatically determined by publication date, avoiding the need for manual curation or new frontmatter fields. This keeps the content model simple while providing the desired visual hierarchy.

## References

**Project sources**:

- AGENTS.md: build approach (Skateboard), design system conventions, component patterns.
- Spec 0002 (design system): design tokens, component library, dark mode support.
- Spec 0003 (data model): content collections schema for posts.
- Spec 0004 (post page): patterns for metadata display, Badge usage, responsive design.

**Practices & standards**:

- Skateboard approach: ship thinnest usable whole, then grow.
- WCAG AA accessibility: semantic HTML, keyboard navigation, ARIA labels.
- SEO best practices: structured data, meta descriptions, Open Graph tags.

const WORDS_PER_MINUTE = 230;

/**
 * Estimate reading time for a markdown string.
 * Strips markdown syntax before counting words.
 * Returns a human readable string like "3 min read".
 */
export function readingTime(markdown: string): string {
  const text = markdown
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, "")
    // Remove inline code
    .replace(/`[^`]*`/g, "")
    // Remove images
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    // Remove links but keep text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    // Remove heading markers
    .replace(/#{1,6}\s/g, "")
    // Remove bold/italic markers
    .replace(/[*_]{1,3}/g, "")
    // Remove blockquotes
    .replace(/^\s*>\s/gm, "")
    // Remove horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, "")
    // Remove HTML tags
    .replace(/<[^>]*>/g, "")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();

  if (!text) {
    return "1 min read";
  }

  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);

  return `${minutes} min read`;
}

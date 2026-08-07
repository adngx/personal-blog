const WORDS_PER_MINUTE = 230;

/**
 * Strip markdown syntax before counting words.
 * Returns the plain text of a markdown string.
 */
function toPlainText(markdown: string): string {
  return (
    markdown
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
      .trim()
  );
}

export interface ReadingStats {
  readonly words: number;
  readonly minutes: number;
}

/**
 * Count words and estimate reading minutes for a markdown string.
 * Empty content counts as 1 minute (a floor, not zero).
 */
export function readingStats(markdown: string): ReadingStats {
  const text = toPlainText(markdown);

  if (!text) {
    return { words: 0, minutes: 1 };
  }

  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return { words, minutes };
}

/**
 * Estimate reading time for a markdown string.
 * Returns a human readable string like "3 min read".
 */
export function readingTime(markdown: string): string {
  return `${readingStats(markdown).minutes} min read`;
}

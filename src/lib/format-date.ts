/**
 * Format a Date as "Month Day, Year" in US English locale.
 * Example: "July 12, 2026"
 */
export const formatDate = (date: Date): string =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

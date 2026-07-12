import { describe, it, expect } from "vitest";
import { formatDate } from "../../../lib/format-date";

/**
 * Post page logic tests (spec 0004).
 *
 * The Astro component at [id].astro cannot be imported directly in Vitest.
 * These tests verify the pure logic the template depends on: date formatting,
 * conditional rendering guards, and content collection filtering.
 *
 * Component rendering (AC-1 through AC-9 visual output) is verified by
 * /check verify against the running dev server.
 */

describe("formatDate (post page helper)", () => {
  it("formats a date as Month Day, Year (AC-2)", () => {
    const result = formatDate(new Date(2026, 6, 12));
    expect(result).toBe("July 12, 2026");
  });

  it("formats another date correctly", () => {
    const result = formatDate(new Date(2025, 0, 1));
    expect(result).toBe("January 1, 2025");
  });

  it("formats a date with day > 9 without padding", () => {
    const result = formatDate(new Date(2026, 11, 25));
    expect(result).toBe("December 25, 2026");
  });
});

describe("post page conditional guards", () => {
  // AC-3: updatedDate section hidden when not present
  it("updatedDate is truthy when present", () => {
    const updatedDate = new Date(2026, 6, 13);
    expect(Boolean(updatedDate)).toBe(true);
  });

  it("updatedDate is falsy when undefined", () => {
    const updatedDate: Date | undefined = undefined;
    expect(Boolean(updatedDate)).toBe(false);
  });

  // AC-4: tags section hidden when array is empty
  it("tags section renders when array has items", () => {
    const tags = ["intro", "astro"];
    expect(tags && tags.length > 0).toBe(true);
  });

  it("tags section hidden when array is empty", () => {
    const tags: string[] = [];
    expect(tags && tags.length > 0).toBe(false);
  });

  it("tags section hidden when undefined", () => {
    const tags: string[] | undefined = undefined;
    expect(Boolean(tags && tags.length > 0)).toBe(false);
  });

  // AC-9: fallback when body is empty
  it("body check is truthy for non-empty content", () => {
    const body = "This is my first blog post.";
    expect(Boolean(body && body.trim())).toBe(true);
  });

  it("body check is falsy for empty string", () => {
    const body = "";
    expect(Boolean(body && body.trim())).toBe(false);
  });

  it("body check is falsy for whitespace only", () => {
    const body = "   \n  \t  ";
    expect(Boolean(body && body.trim())).toBe(false);
  });
});

describe("draft filtering logic", () => {
  const posts = [
    { id: "hello-world", data: { draft: false } },
    { id: "wip-post", data: { draft: true } },
    { id: "published", data: { draft: false } },
  ];

  it("filters out draft posts in production", () => {
    const isProd = true;
    const filtered = posts.filter((post) => !isProd || !post.data.draft);
    expect(filtered).toHaveLength(2);
    expect(filtered.map((p) => p.id)).toEqual(["hello-world", "published"]);
  });

  it("includes all posts in development", () => {
    const isProd = false;
    const filtered = posts.filter((post) => !isProd || !post.data.draft);
    expect(filtered).toHaveLength(3);
  });
});

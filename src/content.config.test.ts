import { describe, it, expect } from "vitest";
import { z } from "astro/zod";

// Reconstruct the schema for testing (matches src/content.config.ts)
const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  summary: z.string(),
  takeaways: z.array(z.string()).max(3).optional().default([]),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
});

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
});

/** Minimal valid post fixture; override fields per test. */
const makePost = (overrides: Record<string, unknown> = {}) => ({
  title: "Test",
  description: "Desc",
  summary: "Direct answer",
  pubDate: "2026-07-12",
  ...overrides,
});

describe("post schema", () => {
  describe("tags field (AC-1)", () => {
    it("accepts an array of strings", () => {
      const result = postSchema.parse(makePost({ tags: ["astro", "web-dev"] }));
      expect(result.tags).toEqual(["astro", "web-dev"]);
    });

    it("defaults to empty array when omitted", () => {
      const result = postSchema.parse(makePost());
      expect(result.tags).toEqual([]);
    });

    it("accepts an empty array", () => {
      const result = postSchema.parse(makePost({ tags: [] }));
      expect(result.tags).toEqual([]);
    });

    it("accepts a single tag", () => {
      const result = postSchema.parse(makePost({ tags: ["intro"] }));
      expect(result.tags).toEqual(["intro"]);
    });

    it("rejects non-string array values", () => {
      expect(() =>
        postSchema.parse(makePost({ tags: "not-an-array" })),
      ).toThrow();
    });

    it("rejects arrays with non-string elements", () => {
      expect(() => postSchema.parse(makePost({ tags: [123, true] }))).toThrow();
    });
  });

  describe("draft field (AC-2)", () => {
    it("accepts true", () => {
      const result = postSchema.parse(makePost({ draft: true }));
      expect(result.draft).toBe(true);
    });

    it("accepts false", () => {
      const result = postSchema.parse(makePost({ draft: false }));
      expect(result.draft).toBe(false);
    });

    it("defaults to false when omitted", () => {
      const result = postSchema.parse(makePost());
      expect(result.draft).toBe(false);
    });

    it("rejects non-boolean values", () => {
      expect(() => postSchema.parse(makePost({ draft: "yes" }))).toThrow();
    });

    it("rejects numeric values", () => {
      expect(() => postSchema.parse(makePost({ draft: 1 }))).toThrow();
    });
  });

  describe("summary field (AI-6)", () => {
    it("accepts a summary string", () => {
      const result = postSchema.parse(
        makePost({ summary: "The direct answer." }),
      );
      expect(result.summary).toBe("The direct answer.");
    });

    it("requires summary", () => {
      const { summary: _summary, ...withoutSummary } = makePost();
      expect(() => postSchema.parse(withoutSummary)).toThrow();
    });
  });

  describe("takeaways field (AI-6)", () => {
    it("accepts up to 3 takeaways", () => {
      const result = postSchema.parse(
        makePost({ takeaways: ["one", "two", "three"] }),
      );
      expect(result.takeaways).toEqual(["one", "two", "three"]);
    });

    it("defaults to empty array when omitted", () => {
      const result = postSchema.parse(makePost());
      expect(result.takeaways).toEqual([]);
    });

    it("rejects more than 3 takeaways", () => {
      expect(() =>
        postSchema.parse(
          makePost({ takeaways: ["one", "two", "three", "four"] }),
        ),
      ).toThrow();
    });
  });

  describe("existing fields unchanged", () => {
    it("requires title", () => {
      const { title: _title, ...withoutTitle } = makePost();
      expect(() => postSchema.parse(withoutTitle)).toThrow();
    });

    it("requires description", () => {
      const { description: _description, ...withoutDescription } = makePost();
      expect(() => postSchema.parse(withoutDescription)).toThrow();
    });

    it("requires pubDate", () => {
      const { pubDate: _pubDate, ...withoutPubDate } = makePost();
      expect(() => postSchema.parse(withoutPubDate)).toThrow();
    });

    it("makes updatedDate optional", () => {
      const result = postSchema.parse(makePost());
      expect(result.updatedDate).toBeUndefined();
    });
  });

  describe("full post with all fields (AC-3)", () => {
    it("parses a complete post with tags and draft", () => {
      const result = postSchema.parse(
        makePost({
          title: "Hello World",
          description: "My first blog post",
          tags: ["intro"],
          draft: false,
        }),
      );
      expect(result.title).toBe("Hello World");
      expect(result.tags).toEqual(["intro"]);
      expect(result.draft).toBe(false);
    });

    it("parses a draft post with multiple tags", () => {
      const result = postSchema.parse(
        makePost({
          title: "Work in Progress",
          description: "Not ready yet",
          tags: ["wip", "draft"],
          draft: true,
        }),
      );
      expect(result.draft).toBe(true);
      expect(result.tags).toEqual(["wip", "draft"]);
    });
  });
});

describe("page schema", () => {
  describe("title field", () => {
    it("accepts a valid title", () => {
      const result = pageSchema.parse({
        title: "About Me",
        description: "A high school student learning cybersecurity in public.",
      });
      expect(result.title).toBe("About Me");
    });

    it("requires title", () => {
      expect(() =>
        pageSchema.parse({
          description: "A description",
        }),
      ).toThrow();
    });

    it("rejects non-string title", () => {
      expect(() =>
        pageSchema.parse({
          title: 123,
          description: "A description",
        }),
      ).toThrow();
    });
  });

  describe("description field", () => {
    it("accepts a valid description", () => {
      const result = pageSchema.parse({
        title: "About Me",
        description: "A high school student learning cybersecurity in public.",
      });
      expect(result.description).toBe(
        "A high school student learning cybersecurity in public.",
      );
    });

    it("requires description", () => {
      expect(() =>
        pageSchema.parse({
          title: "About Me",
        }),
      ).toThrow();
    });

    it("rejects non-string description", () => {
      expect(() =>
        pageSchema.parse({
          title: "About Me",
          description: 42,
        }),
      ).toThrow();
    });
  });

  describe("full page with all fields", () => {
    it("parses a complete page", () => {
      const result = pageSchema.parse({
        title: "About Me",
        description:
          "A high school student learning cybersecurity in public. Posts about security fundamentals and the journey.",
      });
      expect(result.title).toBe("About Me");
      expect(result.description).toContain("high school student");
    });
  });
});

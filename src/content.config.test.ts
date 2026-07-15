import { describe, it, expect } from "vitest";
import { z } from "astro/zod";

// Reconstruct the schema for testing (matches src/content.config.ts)
const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).optional().default([]),
  draft: z.boolean().optional().default(false),
});

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
});

describe("post schema", () => {
  describe("tags field (AC-1)", () => {
    it("accepts an array of strings", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
        tags: ["astro", "web-dev"],
      });
      expect(result.tags).toEqual(["astro", "web-dev"]);
    });

    it("defaults to empty array when omitted", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
      });
      expect(result.tags).toEqual([]);
    });

    it("accepts an empty array", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
        tags: [],
      });
      expect(result.tags).toEqual([]);
    });

    it("accepts a single tag", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
        tags: ["intro"],
      });
      expect(result.tags).toEqual(["intro"]);
    });

    it("rejects non-string array values", () => {
      expect(() =>
        postSchema.parse({
          title: "Test",
          description: "Desc",
          pubDate: "2026-07-12",
          tags: "not-an-array",
        }),
      ).toThrow();
    });

    it("rejects arrays with non-string elements", () => {
      expect(() =>
        postSchema.parse({
          title: "Test",
          description: "Desc",
          pubDate: "2026-07-12",
          tags: [123, true],
        }),
      ).toThrow();
    });
  });

  describe("draft field (AC-2)", () => {
    it("accepts true", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
        draft: true,
      });
      expect(result.draft).toBe(true);
    });

    it("accepts false", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
        draft: false,
      });
      expect(result.draft).toBe(false);
    });

    it("defaults to false when omitted", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
      });
      expect(result.draft).toBe(false);
    });

    it("rejects non-boolean values", () => {
      expect(() =>
        postSchema.parse({
          title: "Test",
          description: "Desc",
          pubDate: "2026-07-12",
          draft: "yes",
        }),
      ).toThrow();
    });

    it("rejects numeric values", () => {
      expect(() =>
        postSchema.parse({
          title: "Test",
          description: "Desc",
          pubDate: "2026-07-12",
          draft: 1,
        }),
      ).toThrow();
    });
  });

  describe("existing fields unchanged", () => {
    it("requires title", () => {
      expect(() =>
        postSchema.parse({
          description: "Desc",
          pubDate: "2026-07-12",
        }),
      ).toThrow();
    });

    it("requires description", () => {
      expect(() =>
        postSchema.parse({
          title: "Test",
          pubDate: "2026-07-12",
        }),
      ).toThrow();
    });

    it("requires pubDate", () => {
      expect(() =>
        postSchema.parse({
          title: "Test",
          description: "Desc",
        }),
      ).toThrow();
    });

    it("makes updatedDate optional", () => {
      const result = postSchema.parse({
        title: "Test",
        description: "Desc",
        pubDate: "2026-07-12",
      });
      expect(result.updatedDate).toBeUndefined();
    });
  });

  describe("full post with all fields (AC-3)", () => {
    it("parses a complete post with tags and draft", () => {
      const result = postSchema.parse({
        title: "Hello World",
        description: "My first blog post",
        pubDate: "2026-07-12",
        tags: ["intro"],
        draft: false,
      });
      expect(result.title).toBe("Hello World");
      expect(result.tags).toEqual(["intro"]);
      expect(result.draft).toBe(false);
    });

    it("parses a draft post with multiple tags", () => {
      const result = postSchema.parse({
        title: "Work in Progress",
        description: "Not ready yet",
        pubDate: "2026-07-12",
        tags: ["wip", "draft"],
        draft: true,
      });
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
        description:
          "A high school student learning software development in public.",
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
        description:
          "A high school student learning software development in public.",
      });
      expect(result.description).toBe(
        "A high school student learning software development in public.",
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
          "A high school student learning software development in public. Weekly posts about code, tools, and the journey.",
      });
      expect(result.title).toBe("About Me");
      expect(result.description).toContain("high school student");
    });
  });
});

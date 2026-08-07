import { describe, it, expect } from "vitest";
import { readingTime, readingStats } from "./reading-time";

describe("readingTime", () => {
  it("returns '1 min read' for empty content", () => {
    expect(readingTime("")).toBe("1 min read");
  });

  it("returns '1 min read' for very short content", () => {
    expect(readingTime("Hello world")).toBe("1 min read");
  });

  it("calculates reading time for plain text", () => {
    const words = Array(230).fill("word").join(" ");
    expect(readingTime(words)).toBe("1 min read");
  });

  it("calculates reading time for longer content", () => {
    const words = Array(460).fill("word").join(" ");
    expect(readingTime(words)).toBe("2 min read");
  });

  it("rounds up to the nearest minute", () => {
    const words = Array(231).fill("word").join(" ");
    expect(readingTime(words)).toBe("2 min read");
  });

  it("strips code blocks before counting", () => {
    const markdown =
      "```\nconst x = 1;\n```\n\n" + Array(230).fill("word").join(" ");
    expect(readingTime(markdown)).toBe("1 min read");
  });

  it("strips inline code before counting", () => {
    const markdown = "`const x = 1`\n\n" + Array(230).fill("word").join(" ");
    expect(readingTime(markdown)).toBe("1 min read");
  });

  it("strips images before counting", () => {
    const markdown =
      "![alt text](image.png)\n\n" + Array(230).fill("word").join(" ");
    expect(readingTime(markdown)).toBe("1 min read");
  });

  it("keeps link text but removes URL", () => {
    const markdown =
      "[click here](https://example.com)\n\n" +
      Array(230).fill("word").join(" ");
    expect(readingTime(markdown)).toBe("2 min read");
  });

  it("strips heading markers but keeps heading text", () => {
    const markdown =
      "# Title\n\n## Subtitle\n\n" + Array(230).fill("word").join(" ");
    expect(readingTime(markdown)).toBe("2 min read");
  });
});

describe("readingStats", () => {
  it("counts words and minutes for plain text", () => {
    const words = Array(230).fill("word").join(" ");
    expect(readingStats(words)).toEqual({ words: 230, minutes: 1 });
  });

  it("rounds minutes up to the nearest minute", () => {
    const words = Array(231).fill("word").join(" ");
    expect(readingStats(words).minutes).toBe(2);
  });

  it("floors empty content at 1 minute with 0 words", () => {
    expect(readingStats("")).toEqual({ words: 0, minutes: 1 });
  });

  it("strips markdown before counting words", () => {
    const markdown =
      "```\nconst x = 1;\n```\n\n" +
      "![alt text](image.png)\n\n" +
      "[click here](https://example.com)\n\n" +
      "# Title\n\n" +
      Array(230).fill("word").join(" ");
    expect(readingStats(markdown).words).toBe(233);
    expect(readingStats(markdown).minutes).toBe(2);
  });
});

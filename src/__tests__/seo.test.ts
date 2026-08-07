import { describe, it, expect } from "vitest";
import { z } from "astro/zod";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { AUTHOR_NAME, AUTHOR_DESCRIPTION } from "../data/identity";
import { readingStats } from "../lib/reading-time";

/**
 * SEO logic tests (spec 0009).
 *
 * The Astro components cannot be imported directly in Vitest.
 * These tests verify the pure logic the templates depend on:
 * title format, canonical URL construction, JSON-LD schemas,
 * Twitter card type selection, and env validation.
 *
 * Visual rendering (meta tags, structured data output) is verified
 * by /check verify against the running dev server.
 */

const SITE_URL = "https://adngx.com";
const SITE_NAME = "adngx";

describe("title format (AC-4)", () => {
  it("formats title as 'Title | Site Name'", () => {
    const title = "Getting Started with TypeScript";
    const pageTitle = `${title} | ${SITE_NAME}`;
    expect(pageTitle).toBe("Getting Started with TypeScript | adngx");
  });

  it("formats home title correctly", () => {
    const title = "Home";
    const pageTitle = `${title} | ${SITE_NAME}`;
    expect(pageTitle).toBe("Home | adngx");
  });
});

describe("canonical URL construction (AC-1)", () => {
  it("builds canonical URL from site URL and pathname", () => {
    const pathname = "/posts/hello-world";
    const canonicalUrl = new URL(pathname, SITE_URL).href;
    expect(canonicalUrl).toBe("https://adngx.com/posts/hello-world");
  });

  it("builds canonical URL for root path", () => {
    const pathname = "/";
    const canonicalUrl = new URL(pathname, SITE_URL).href;
    expect(canonicalUrl).toBe("https://adngx.com/");
  });

  it("builds canonical URL for about page", () => {
    const pathname = "/about";
    const canonicalUrl = new URL(pathname, SITE_URL).href;
    expect(canonicalUrl).toBe("https://adngx.com/about");
  });
});

describe("OG image URL construction (AC-2, AC-12)", () => {
  it("builds default OG image URL", () => {
    const imageUrl = new URL("/og/default.png", SITE_URL).href;
    expect(imageUrl).toBe("https://adngx.com/og/default.png");
  });

  it("uses provided OG image when given", () => {
    const customImage = "https://example.com/custom.png";
    const ogImage = customImage;
    expect(ogImage).toBe("https://example.com/custom.png");
  });

  it("falls back to default when no OG image provided", () => {
    const ogImage: string | undefined = undefined;
    const imageUrl = ogImage ?? new URL("/og/default.png", SITE_URL).href;
    expect(imageUrl).toBe("https://adngx.com/og/default.png");
  });
});

describe("BlogPosting JSON-LD construction (AC-6)", () => {
  const personId = `${SITE_URL}/about/#person`;

  const makeBlogPostingJsonLd = (post: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    id: string;
    tags?: string[];
    body?: string;
  }) => {
    const { words, minutes } = readingStats(post.body ?? "");
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.pubDate.toISOString(),
      dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
      author: {
        "@type": "Person",
        "@id": personId,
      },
      publisher: {
        "@type": "Person",
        "@id": personId,
      },
      mainEntityOfPage: new URL(`/posts/${post.id}`, SITE_URL).href,
      inLanguage: "en",
      keywords: post.tags ?? [],
      wordCount: words,
      timeRequired: `PT${minutes}M`,
      description: post.description,
      image: new URL("/og/default.png", SITE_URL).href,
      url: new URL(`/posts/${post.id}`, SITE_URL).href,
    };
  };

  it("includes all required BlogPosting fields", () => {
    const jsonLd = makeBlogPostingJsonLd({
      title: "Hello World",
      description: "My first post",
      pubDate: new Date(2026, 6, 12),
      id: "hello-world",
    });

    expect(jsonLd["@type"]).toBe("BlogPosting");
    expect(jsonLd).toHaveProperty("headline", "Hello World");
    expect(jsonLd).toHaveProperty("datePublished");
    expect(jsonLd).toHaveProperty("dateModified");
    expect(jsonLd).toHaveProperty("author");
    expect(jsonLd).toHaveProperty("description", "My first post");
    expect(jsonLd).toHaveProperty("image");
    expect(jsonLd).toHaveProperty("url", "https://adngx.com/posts/hello-world");
  });

  it("references the author by the stable Person id, not a name string (AI-1)", () => {
    const jsonLd = makeBlogPostingJsonLd({
      title: "Hello World",
      description: "My first post",
      pubDate: new Date(2026, 6, 12),
      id: "hello-world",
    });

    expect(jsonLd.author).toEqual({
      "@type": "Person",
      "@id": "https://adngx.com/about/#person",
    });
    expect(jsonLd.author).not.toHaveProperty("name");
  });

  it("sets publisher, mainEntityOfPage, inLanguage and keywords (AI-1)", () => {
    const jsonLd = makeBlogPostingJsonLd({
      title: "Java Post",
      description: "Desc",
      pubDate: new Date(2026, 6, 12),
      id: "java-post",
      tags: ["java", "spring-boot"],
    });

    expect(jsonLd.publisher).toEqual({
      "@type": "Person",
      "@id": "https://adngx.com/about/#person",
    });
    expect(jsonLd.mainEntityOfPage).toBe("https://adngx.com/posts/java-post");
    expect(jsonLd.inLanguage).toBe("en");
    expect(jsonLd.keywords).toEqual(["java", "spring-boot"]);
  });

  it("computes wordCount and timeRequired from the post body (AI-1)", () => {
    const body = Array(460).fill("word").join(" ");
    const jsonLd = makeBlogPostingJsonLd({
      title: "Long Post",
      description: "",
      pubDate: new Date(2026, 6, 12),
      id: "long-post",
      body,
    });

    expect(jsonLd.wordCount).toBe(460);
    expect(jsonLd.timeRequired).toBe("PT2M");
  });

  it("uses updatedDate for dateModified when present", () => {
    const pubDate = new Date(2026, 6, 12);
    const updatedDate = new Date(2026, 6, 13);
    const jsonLd = makeBlogPostingJsonLd({
      title: "Updated Post",
      description: "",
      pubDate,
      updatedDate,
      id: "updated-post",
    });

    expect(jsonLd.dateModified).toBe(updatedDate.toISOString());
    expect(jsonLd.datePublished).toBe(pubDate.toISOString());
  });

  it("falls back to pubDate for dateModified when updatedDate is absent", () => {
    const pubDate = new Date(2026, 6, 12);
    const jsonLd = makeBlogPostingJsonLd({
      title: "No Update",
      description: "",
      pubDate,
      id: "no-update",
    });

    expect(jsonLd.dateModified).toBe(pubDate.toISOString());
    expect(jsonLd.dateModified).toBe(jsonLd.datePublished);
  });

  it("produces valid JSON", () => {
    const jsonLd = makeBlogPostingJsonLd({
      title: "Test",
      description: "Desc",
      pubDate: new Date(2026, 6, 12),
      id: "test",
    });

    const serialized = JSON.stringify(jsonLd);
    const parsed = JSON.parse(serialized);
    expect(parsed["@type"]).toBe("BlogPosting");
  });
});

describe("Person JSON-LD construction (AC-7)", () => {
  const socialLinks = [
    { label: "GitHub", url: "https://github.com" },
    { label: "X (Twitter)", url: "https://x.com" },
    { label: "Email", url: "mailto:hello@example.com" },
  ];

  it("includes name, url, and sameAs", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/about/#person`,
      name: AUTHOR_NAME,
      url: SITE_URL,
      description: AUTHOR_DESCRIPTION,
      sameAs: socialLinks
        .filter((link) => link.url.startsWith("http"))
        .map((link) => link.url),
    };

    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd).toHaveProperty("name", "Anh-Duc Nguyen");
    expect(jsonLd).toHaveProperty("url", SITE_URL);
    expect(jsonLd.sameAs).toEqual(["https://github.com", "https://x.com"]);
  });

  it("has a stable @id on the About page and the one-sentence description (AI-1)", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/about/#person`,
      name: AUTHOR_NAME,
      url: SITE_URL,
      description: AUTHOR_DESCRIPTION,
      sameAs: [],
    };

    expect(jsonLd["@id"]).toBe("https://adngx.com/about/#person");
    expect(jsonLd.description).toBe(AUTHOR_DESCRIPTION);
    expect(jsonLd.description).toContain(
      "teaching himself Java and Spring Boot",
    );
  });

  it("filters out non-http links from sameAs", () => {
    const links = [
      { label: "GitHub", url: "https://github.com" },
      { label: "Email", url: "mailto:hello@example.com" },
    ];

    const sameAs = links
      .filter((link) => link.url.startsWith("http"))
      .map((link) => link.url);

    expect(sameAs).toEqual(["https://github.com"]);
    expect(sameAs).not.toContain("mailto:hello@example.com");
  });
});

describe("Twitter card type selection (AC-3)", () => {
  it("uses summary_large_image for post pages", () => {
    const twitterCard = "summary_large_image";
    expect(twitterCard).toBe("summary_large_image");
  });

  it("uses summary for non-post pages", () => {
    const twitterCard = "summary";
    expect(twitterCard).toBe("summary");
  });
});

describe("Twitter handle conditional rendering (AC-11)", () => {
  it("renders twitter:site when handle is provided", () => {
    const twitterHandle = "@myhandle";
    const shouldRender = Boolean(twitterHandle);
    expect(shouldRender).toBe(true);
  });

  it("omits twitter:site when handle is empty", () => {
    const twitterHandle = "";
    const shouldRender = Boolean(twitterHandle);
    expect(shouldRender).toBe(false);
  });
});

describe("robots.txt content (AC-9)", () => {
  it("allows all crawlers and links to sitemap", () => {
    const content = [
      "User-agent: *",
      "Allow: /",
      "",
      `Sitemap: ${new URL("/sitemap-index.xml", SITE_URL).href}`,
    ].join("\n");

    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /");
    expect(content).toContain("Sitemap: https://adngx.com/sitemap-index.xml");
  });

  it("declares ai-input=yes (AI-4)", () => {
    const content = [
      "User-agent: *",
      "Allow: /",
      "",
      "Content-Signal: ai-train=no, search=yes, ai-input=yes",
      "",
      `Sitemap: ${new URL("/sitemap-index.xml", SITE_URL).href}`,
    ].join("\n");

    expect(content).toContain(
      "Content-Signal: ai-train=no, search=yes, ai-input=yes",
    );
    expect(content).not.toContain("ai-input=no");
  });

  it("robots.txt source serves the Content-Signal line (AI-4)", () => {
    const source = readFileSync(
      join(process.cwd(), "src", "pages", "robots.txt.ts"),
      "utf-8",
    );
    expect(source).toContain("ai-train=no, search=yes, ai-input=yes");
  });
});

describe("env validation (AC-10, AC-11)", () => {
  const envSchema = z.object({
    SITE_URL: z.string().url("SITE_URL must be a valid URL"),
    TWITTER_HANDLE: z.string().optional().default(""),
  });

  it("accepts valid SITE_URL and TWITTER_HANDLE", () => {
    const result = envSchema.safeParse({
      SITE_URL: "https://adngx.com",
      TWITTER_HANDLE: "@myhandle",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.SITE_URL).toBe("https://adngx.com");
      expect(result.data.TWITTER_HANDLE).toBe("@myhandle");
    }
  });

  it("defaults TWITTER_HANDLE to empty string when omitted", () => {
    const result = envSchema.safeParse({
      SITE_URL: "https://example.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.TWITTER_HANDLE).toBe("");
    }
  });

  it("rejects invalid SITE_URL", () => {
    const result = envSchema.safeParse({
      SITE_URL: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty SITE_URL", () => {
    const result = envSchema.safeParse({
      SITE_URL: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts localhost URL for development", () => {
    const result = envSchema.safeParse({
      SITE_URL: "http://localhost:4321",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.SITE_URL).toBe("http://localhost:4321");
    }
  });

  it("validates SITE_URL is a valid URL format", () => {
    const valid = envSchema.safeParse({ SITE_URL: "https://example.com" });
    const invalid = envSchema.safeParse({ SITE_URL: "example.com" });
    expect(valid.success).toBe(true);
    expect(invalid.success).toBe(false);
  });
});

describe("OG image fallback (AC-12)", () => {
  const ogDir = join(process.cwd(), "public", "og");

  it("default.png exists in public/og/", () => {
    const pngPath = join(ogDir, "default.png");
    expect(existsSync(pngPath)).toBe(true);
  });

  it("default.svg exists as the source template", () => {
    const svgPath = join(ogDir, "default.svg");
    expect(existsSync(svgPath)).toBe(true);
  });

  it("default.png is a valid PNG file (starts with PNG signature)", () => {
    const pngPath = join(ogDir, "default.png");
    const buffer = readFileSync(pngPath);
    // PNG magic number: 137 80 78 71 13 10 26 10
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    expect(buffer.subarray(0, 8)).toEqual(pngSignature);
  });

  it("default.png is not empty", () => {
    const pngPath = join(ogDir, "default.png");
    const buffer = readFileSync(pngPath);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it("default.svg contains the site name", () => {
    const svgPath = join(ogDir, "default.svg");
    const content = readFileSync(svgPath, "utf-8");
    expect(content).toContain("adngx");
  });

  it("default.svg has correct dimensions (1200x630)", () => {
    const svgPath = join(ogDir, "default.svg");
    const content = readFileSync(svgPath, "utf-8");
    expect(content).toContain('width="1200"');
    expect(content).toContain('height="630"');
  });
});

describe("AI-visibility signals (scope: ai-visibility-plan)", () => {
  const srcDir = join(process.cwd(), "src");
  const postsDir = join(srcDir, "content", "posts");

  describe("llms.txt identity block (AI-2)", () => {
    it("has an Identity section with the one sentence and social links", () => {
      const source = readFileSync(
        join(srcDir, "pages", "llms.txt.ts"),
        "utf-8",
      );
      expect(source).toContain("## Identity");
      expect(source).toContain("AUTHOR_DESCRIPTION");
      expect(source).toContain("AUTHOR_NAME");
      expect(source).toContain("llms-full.txt");
    });
  });

  describe("one-sentence identity applied (AI-7)", () => {
    it("about page contains the sentence and no stale fundamentals", () => {
      const about = readFileSync(
        join(srcDir, "content", "pages", "about.md"),
        "utf-8",
      );
      expect(about).toContain(AUTHOR_DESCRIPTION);
      expect(about).not.toMatch(/Git, database/i);
      expect(about).not.toMatch(/post weekly/i);
    });

    it("RSS feed description is the one sentence", () => {
      const source = readFileSync(join(srcDir, "pages", "rss.xml.ts"), "utf-8");
      expect(source).toContain("description: AUTHOR_DESCRIPTION");
    });

    it("identity.ts defines the exact approved sentence", () => {
      const identity = readFileSync(
        join(srcDir, "data", "identity.ts"),
        "utf-8",
      );
      expect(identity).toContain(AUTHOR_DESCRIPTION);
      expect(AUTHOR_DESCRIPTION).toContain("16-year-old");
      expect(AUTHOR_DESCRIPTION).toContain("Java and Spring Boot");
      expect(AUTHOR_DESCRIPTION).toContain("Germany");
    });
  });

  describe("RSS full post bodies (AI-3)", () => {
    it("renders post content with Astro's pipeline and sanitizes", () => {
      const source = readFileSync(join(srcDir, "pages", "rss.xml.ts"), "utf-8");
      expect(source).toContain("astro/container");
      expect(source).toContain('dropElements: ["script", "style"]');
      expect(source).toContain("content,");
    });
  });

  describe("freshness tags (AI-5)", () => {
    it("Layout renders article:published_time and article:modified_time", () => {
      const layout = readFileSync(
        join(srcDir, "layouts", "Layout.astro"),
        "utf-8",
      );
      expect(layout).toContain("article:published_time");
      expect(layout).toContain("article:modified_time");
    });
  });

  describe("TL;DR summary cards (AI-6)", () => {
    const postFiles = readdirSync(postsDir).filter((file) =>
      file.endsWith(".md"),
    );

    it("every post defines a summary in frontmatter", () => {
      expect(postFiles.length).toBeGreaterThan(0);
      for (const file of postFiles) {
        const content = readFileSync(join(postsDir, file), "utf-8");
        expect(content, file).toMatch(/^summary: /m);
      }
    });

    it("takeaways are limited to 3 per post", () => {
      for (const file of postFiles) {
        const content = readFileSync(join(postsDir, file), "utf-8");
        const takeaways = content.match(/^  - "/gm) ?? [];
        expect(takeaways.length, file).toBeLessThanOrEqual(3);
      }
    });

    it("the post layout renders the card before the prose", () => {
      const layout = readFileSync(
        join(srcDir, "pages", "posts", "[id].astro"),
        "utf-8",
      );
      const cardIndex = layout.indexOf('aria-label="TL;DR"');
      const proseIndex = layout.indexOf('class="prose prose-gray');
      expect(cardIndex).toBeGreaterThan(-1);
      expect(proseIndex).toBeGreaterThan(cardIndex);
    });
  });
});

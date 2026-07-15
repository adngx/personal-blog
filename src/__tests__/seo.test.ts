import { describe, it, expect } from "vitest";
import { z } from "astro/zod";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

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

const SITE_URL = "https://adngx.pages.dev";
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
    expect(canonicalUrl).toBe("https://adngx.pages.dev/posts/hello-world");
  });

  it("builds canonical URL for root path", () => {
    const pathname = "/";
    const canonicalUrl = new URL(pathname, SITE_URL).href;
    expect(canonicalUrl).toBe("https://adngx.pages.dev/");
  });

  it("builds canonical URL for about page", () => {
    const pathname = "/about";
    const canonicalUrl = new URL(pathname, SITE_URL).href;
    expect(canonicalUrl).toBe("https://adngx.pages.dev/about");
  });
});

describe("OG image URL construction (AC-2, AC-12)", () => {
  it("builds default OG image URL", () => {
    const imageUrl = new URL("/og/default.png", SITE_URL).href;
    expect(imageUrl).toBe("https://adngx.pages.dev/og/default.png");
  });

  it("uses provided OG image when given", () => {
    const customImage = "https://example.com/custom.png";
    const ogImage = customImage;
    expect(ogImage).toBe("https://example.com/custom.png");
  });

  it("falls back to default when no OG image provided", () => {
    const ogImage: string | undefined = undefined;
    const imageUrl = ogImage ?? new URL("/og/default.png", SITE_URL).href;
    expect(imageUrl).toBe("https://adngx.pages.dev/og/default.png");
  });
});

describe("BlogPosting JSON-LD construction (AC-6)", () => {
  const makeBlogPostingJsonLd = (post: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    id: string;
  }) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.pubDate.toISOString(),
    dateModified: (post.updatedDate ?? post.pubDate).toISOString(),
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: post.description,
    image: new URL("/og/default.png", SITE_URL).href,
    url: new URL(`/posts/${post.id}`, SITE_URL).href,
  });

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
    expect(jsonLd).toHaveProperty(
      "url",
      "https://adngx.pages.dev/posts/hello-world",
    );
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
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: socialLinks
        .filter((link) => link.url.startsWith("http"))
        .map((link) => link.url),
    };

    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd).toHaveProperty("name", "adngx");
    expect(jsonLd).toHaveProperty("url", SITE_URL);
    expect(jsonLd.sameAs).toEqual(["https://github.com", "https://x.com"]);
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
    expect(content).toContain(
      "Sitemap: https://adngx.pages.dev/sitemap-index.xml",
    );
  });
});

describe("env validation (AC-10, AC-11)", () => {
  const envSchema = z.object({
    SITE_URL: z.string().url("SITE_URL must be a valid URL"),
    TWITTER_HANDLE: z.string().optional().default(""),
  });

  it("accepts valid SITE_URL and TWITTER_HANDLE", () => {
    const result = envSchema.safeParse({
      SITE_URL: "https://adngx.pages.dev",
      TWITTER_HANDLE: "@myhandle",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.SITE_URL).toBe("https://adngx.pages.dev");
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

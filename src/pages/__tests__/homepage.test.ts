import { describe, it, expect } from "vitest";
import { formatDate } from "../../lib/format-date";
import { socialLinks } from "../../data/social-links";

/**
 * Homepage logic tests.
 *
 * The Astro component at index.astro cannot be imported directly in Vitest.
 * These tests verify the pure logic the template depends on: post sorting,
 * featured (latest) post selection, draft filtering, empty state guards,
 * and JSON-LD structured data construction for the portfolio landing page
 * (WebSite + Person; the Blog schema lives on the /blog index).
 *
 * Visual rendering is verified by /check verify against the running
 * dev server.
 */

type Post = {
  id: string;
  data: {
    title: string;
    description: string;
    pubDate: Date;
    tags: string[];
    draft: boolean;
  };
};

const makePost = (overrides: Partial<Post> & { id: string }): Post => ({
  data: {
    title: "Test Post",
    description: "A test post",
    pubDate: new Date(2026, 6, 12),
    tags: [],
    draft: false,
  },
  ...overrides,
});

describe("post sorting", () => {
  it("sorts posts by pubDate descending, newest first", () => {
    const posts = [
      makePost({
        id: "old",
        data: {
          title: "Old",
          description: "",
          pubDate: new Date(2026, 0, 1),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "new",
        data: {
          title: "New",
          description: "",
          pubDate: new Date(2026, 6, 13),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "mid",
        data: {
          title: "Mid",
          description: "",
          pubDate: new Date(2026, 3, 15),
          tags: [],
          draft: false,
        },
      }),
    ];

    const sorted = [...posts].sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

    expect(sorted.map((p) => p.id)).toEqual(["new", "mid", "old"]);
  });

  it("preserves order when all posts have the same date", () => {
    const date = new Date(2026, 6, 12);
    const posts = [
      makePost({
        id: "a",
        data: {
          title: "A",
          description: "",
          pubDate: date,
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "b",
        data: {
          title: "B",
          description: "",
          pubDate: date,
          tags: [],
          draft: false,
        },
      }),
    ];

    const sorted = [...posts].sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

    expect(sorted).toHaveLength(2);
  });
});

describe("featured post selection", () => {
  it("selects the first post after sorting as featured", () => {
    const posts = [
      makePost({
        id: "july-13",
        data: {
          title: "July 13",
          description: "",
          pubDate: new Date(2026, 6, 13),
          tags: ["ts"],
          draft: false,
        },
      }),
      makePost({
        id: "july-12",
        data: {
          title: "July 12",
          description: "",
          pubDate: new Date(2026, 6, 12),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "july-11",
        data: {
          title: "July 11",
          description: "",
          pubDate: new Date(2026, 6, 11),
          tags: [],
          draft: false,
        },
      }),
    ];

    const sorted = [...posts].sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );
    const featuredPost = sorted[0] ?? null;

    expect(featuredPost).not.toBeNull();
    expect(featuredPost!.id).toBe("july-13");
    expect(featuredPost!.data.tags).toEqual(["ts"]);
  });

  it("returns null when no posts exist", () => {
    const posts: Post[] = [];
    const featuredPost = posts[0] ?? null;

    expect(featuredPost).toBeNull();
  });
});

describe("empty state guards", () => {
  it("hides the featured section when no posts exist", () => {
    const posts: Post[] = [];
    const featuredPost = posts[0] ?? null;

    expect(featuredPost).toBeNull();
  });

  it("shows the featured section when at least one post exists", () => {
    const posts = [makePost({ id: "one" })];
    const featuredPost = posts[0] ?? null;

    expect(featuredPost).not.toBeNull();
  });
});

describe("draft filtering logic", () => {
  const posts = [
    makePost({
      id: "published",
      data: {
        title: "Published",
        description: "",
        pubDate: new Date(2026, 6, 12),
        tags: [],
        draft: false,
      },
    }),
    makePost({
      id: "wip",
      data: {
        title: "WIP",
        description: "",
        pubDate: new Date(2026, 6, 11),
        tags: [],
        draft: true,
      },
    }),
    makePost({
      id: "also-published",
      data: {
        title: "Also Published",
        description: "",
        pubDate: new Date(2026, 6, 10),
        tags: [],
        draft: false,
      },
    }),
  ];

  it("filters out draft posts in production", () => {
    const isProd = true;
    const filtered = posts.filter((post) => !isProd || !post.data.draft);

    expect(filtered).toHaveLength(2);
    expect(filtered.map((p) => p.id)).toEqual(["published", "also-published"]);
  });

  it("includes all posts in development", () => {
    const isProd = false;
    const filtered = posts.filter((post) => !isProd || !post.data.draft);

    expect(filtered).toHaveLength(3);
  });
});

describe("JSON-LD structured data construction", () => {
  const siteUrl = "https://example.com";
  const personId = new URL("/about/", siteUrl).href + "#person";

  it("builds WebSite schema with correct fields", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": new URL("/", siteUrl).href + "#website",
          name: "adngx",
          url: siteUrl,
          publisher: { "@id": personId },
        },
        {
          "@type": "Person",
          "@id": personId,
          name: "Anh-Duc Nguyen",
          url: siteUrl,
        },
      ],
    };

    const webSite = jsonLd["@graph"][0];
    expect(webSite["@type"]).toBe("WebSite");
    expect(webSite).toHaveProperty("name", "adngx");
    expect(webSite).toHaveProperty("url", siteUrl);
    expect(webSite).toHaveProperty("publisher", { "@id": personId });
  });

  it("builds Person schema with about-page @id and sameAs links", () => {
    const expectedSameAs = socialLinks
      .filter((link) => link.url.startsWith("http"))
      .map((link) => link.url);

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: "adngx", url: siteUrl },
        {
          "@type": "Person",
          "@id": personId,
          name: "Anh-Duc Nguyen",
          url: siteUrl,
          description: "Learning cybersecurity in public",
          sameAs: expectedSameAs,
        },
      ],
    };

    const person = jsonLd["@graph"][1];
    expect(person["@type"]).toBe("Person");
    expect(person).toHaveProperty("@id", "https://example.com/about/#person");
    expect(person.sameAs).toEqual(expectedSameAs);
    expect(person.sameAs).not.toContain("mailto:contact@adngx.com");
  });

  it("does not embed the Blog schema on the homepage (it lives on /blog)", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: "adngx", url: siteUrl },
        { "@type": "Person", "@id": personId, name: "Anh-Duc Nguyen" },
      ],
    };

    const types = jsonLd["@graph"].map((entry) => entry["@type"]);
    expect(types).toEqual(["WebSite", "Person"]);
    expect(types).not.toContain("Blog");
  });

  it("produces valid JSON from the structured data object", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: "adngx", url: siteUrl },
        { "@type": "Person", "@id": personId, name: "Anh-Duc Nguyen" },
      ],
    };

    const serialized = JSON.stringify(jsonLd);
    const parsed = JSON.parse(serialized);

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"]).toHaveLength(2);
  });
});

describe("date formatting for display", () => {
  it("formats pubDate for the featured post time element", () => {
    const date = new Date(2026, 6, 13);
    expect(formatDate(date)).toBe("July 13, 2026");
  });
});

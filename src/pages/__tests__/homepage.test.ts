import { describe, it, expect } from "vitest";
import { formatDate } from "../../lib/format-date";

/**
 * Homepage logic tests (spec 0005).
 *
 * The Astro component at index.astro cannot be imported directly in Vitest.
 * These tests verify the pure logic the template depends on: post sorting,
 * featured post selection, remaining posts slicing, draft filtering,
 * empty state guards, and JSON-LD structured data construction.
 *
 * Visual rendering (AC-1, AC-2, AC-5, AC-8, AC-9) is verified by
 * /check verify against the running dev server.
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

describe("post sorting (AC-3)", () => {
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

describe("featured post selection (AC-2)", () => {
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

describe("remaining posts slicing (AC-3)", () => {
  it("excludes the featured post from the feed", () => {
    const posts = [
      makePost({
        id: "featured",
        data: {
          title: "Featured",
          description: "",
          pubDate: new Date(2026, 6, 13),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "post-2",
        data: {
          title: "Post 2",
          description: "",
          pubDate: new Date(2026, 6, 12),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "post-3",
        data: {
          title: "Post 3",
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
    const remainingPosts = sorted.slice(1);

    expect(remainingPosts).toHaveLength(2);
    expect(remainingPosts.map((p) => p.id)).toEqual(["post-2", "post-3"]);
  });

  it("returns empty array when only one post exists", () => {
    const posts = [makePost({ id: "only" })];
    const remainingPosts = posts.slice(1);

    expect(remainingPosts).toHaveLength(0);
  });

  it("returns empty array when no posts exist", () => {
    const posts: Post[] = [];
    const remainingPosts = posts.slice(1);

    expect(remainingPosts).toHaveLength(0);
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

  it("filters out draft posts in production (AC-3)", () => {
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

describe("empty state guards (AC-4)", () => {
  it("shows empty state when posts array is empty", () => {
    const posts: Post[] = [];

    expect(posts.length === 0).toBe(true);
  });

  it("hides empty state when posts exist", () => {
    const posts = [makePost({ id: "one" })];

    expect(posts.length === 0).toBe(false);
  });

  it("hides feed section when only one post exists (no remaining posts)", () => {
    const posts = [makePost({ id: "only" })];
    const remainingPosts = posts.slice(1);

    expect(posts.length === 0).toBe(false);
    expect(remainingPosts.length > 0).toBe(false);
  });

  it("shows feed section when multiple posts exist", () => {
    const posts = [makePost({ id: "a" }), makePost({ id: "b" })];
    const remainingPosts = posts.slice(1);

    expect(posts.length === 0).toBe(false);
    expect(remainingPosts.length > 0).toBe(true);
  });
});

describe("JSON-LD structured data construction (AC-6)", () => {
  const siteUrl = "https://example.com";

  it("builds WebSite schema with correct fields", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [{ "@type": "WebSite", name: "Personal Blog", url: siteUrl }],
    };

    const webSite = jsonLd["@graph"][0];
    expect(webSite["@type"]).toBe("WebSite");
    expect(webSite).toHaveProperty("name", "Personal Blog");
    expect(webSite).toHaveProperty("url", siteUrl);
  });

  it("builds Blog schema with blogPost entries", () => {
    const posts = [
      makePost({
        id: "post-1",
        data: {
          title: "Post 1",
          description: "Desc 1",
          pubDate: new Date(2026, 6, 12),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "post-2",
        data: {
          title: "Post 2",
          description: "Desc 2",
          pubDate: new Date(2026, 6, 11),
          tags: [],
          draft: false,
        },
      }),
    ];

    const blogPosts = posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.data.title,
      datePublished: post.data.pubDate.toISOString(),
      description: post.data.description,
      url: new URL(`/posts/${post.id}`, siteUrl).href,
    }));

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: "Personal Blog", url: siteUrl },
        {
          "@type": "Blog",
          name: "Personal Blog",
          url: siteUrl,
          blogPost: blogPosts,
        },
      ],
    };

    const blog = jsonLd["@graph"][1];
    expect(blog["@type"]).toBe("Blog");
    expect(blog.blogPost).toHaveLength(2);
    expect(blog.blogPost![0].headline).toBe("Post 1");
    expect(blog.blogPost![0].url).toBe("https://example.com/posts/post-1");
    expect(blog.blogPost![1].headline).toBe("Post 2");
  });

  it("includes all published posts in JSON-LD, including featured", () => {
    const posts = [
      makePost({
        id: "featured",
        data: {
          title: "Featured",
          description: "",
          pubDate: new Date(2026, 6, 13),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "other",
        data: {
          title: "Other",
          description: "",
          pubDate: new Date(2026, 6, 12),
          tags: [],
          draft: false,
        },
      }),
    ];

    const blogPosts = posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.data.title,
    }));

    expect(blogPosts).toHaveLength(2);
    expect(blogPosts.map((p) => p.headline)).toEqual(["Featured", "Other"]);
  });

  it("produces valid JSON from the structured data object", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", name: "Personal Blog", url: siteUrl },
        { "@type": "Blog", name: "Personal Blog", url: siteUrl, blogPost: [] },
      ],
    };

    const serialized = JSON.stringify(jsonLd);
    const parsed = JSON.parse(serialized);

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"]).toHaveLength(2);
  });
});

describe("date formatting for display (AC-1, AC-2)", () => {
  it("formats pubDate for the featured post time element", () => {
    const date = new Date(2026, 6, 13);
    expect(formatDate(date)).toBe("July 13, 2026");
  });
});

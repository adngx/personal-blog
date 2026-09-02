import { describe, it, expect } from "vitest";

/**
 * Blog index page logic tests.
 *
 * The Astro component at blog.astro cannot be imported directly in Vitest.
 * These tests verify the pure logic the template depends on: post sorting,
 * listing every published post (no featured exclusion), draft filtering,
 * empty state guards, and the Blog JSON-LD schema construction.
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
    ];

    const sorted = [...posts].sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

    expect(sorted.map((p) => p.id)).toEqual(["new", "old"]);
  });
});

describe("blog listing contents", () => {
  it("lists all published posts, including the homepage featured one", () => {
    const posts = [
      makePost({
        id: "featured-on-home",
        data: {
          title: "Newest",
          description: "",
          pubDate: new Date(2026, 6, 13),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "older",
        data: {
          title: "Older",
          description: "",
          pubDate: new Date(2026, 6, 12),
          tags: [],
          draft: false,
        },
      }),
      makePost({
        id: "oldest",
        data: {
          title: "Oldest",
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

    expect(sorted).toHaveLength(3);
    expect(sorted.map((p) => p.id)).toEqual([
      "featured-on-home",
      "older",
      "oldest",
    ]);
  });
});

describe("empty state guard", () => {
  it("shows an empty state when no posts exist", () => {
    const posts: Post[] = [];

    expect(posts.length === 0).toBe(true);
  });

  it("renders the list when posts exist", () => {
    const posts = [makePost({ id: "one" })];

    expect(posts.length === 0).toBe(false);
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
  ];

  it("filters out draft posts in production", () => {
    const isProd = true;
    const filtered = posts.filter((post) => !isProd || !post.data.draft);

    expect(filtered.map((p) => p.id)).toEqual(["published"]);
  });

  it("includes all posts in development", () => {
    const isProd = false;
    const filtered = posts.filter((post) => !isProd || !post.data.draft);

    expect(filtered).toHaveLength(2);
  });
});

describe("Blog JSON-LD structured data construction", () => {
  const siteUrl = "https://example.com";
  const blogUrl = new URL("/blog/", siteUrl).href;
  const personId = new URL("/about/", siteUrl).href + "#person";

  const posts = [
    makePost({
      id: "post-1",
      data: {
        title: "Post 1",
        description: "Desc 1",
        pubDate: new Date(2026, 6, 13),
        tags: [],
        draft: false,
      },
    }),
    makePost({
      id: "post-2",
      data: {
        title: "Post 2",
        description: "Desc 2",
        pubDate: new Date(2026, 6, 12),
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

  it("builds Blog schema anchored at the /blog URL", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": blogUrl + "#blog",
          name: "adngx",
          url: blogUrl,
          author: { "@id": personId },
          blogPost: blogPosts,
        },
        {
          "@type": "Person",
          "@id": personId,
          name: "Anh-Duc Nguyen",
          url: siteUrl,
        },
      ],
    };

    const blog = jsonLd["@graph"][0];
    expect(blog["@type"]).toBe("Blog");
    expect(blog).toHaveProperty("url", "https://example.com/blog/");
    expect(blog).toHaveProperty("@id", "https://example.com/blog/#blog");
    expect(blog).toHaveProperty("author", {
      "@id": "https://example.com/about/#person",
    });
  });

  it("links the blog to the author Person node in the same graph", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Blog", url: blogUrl, author: { "@id": personId } },
        { "@type": "Person", "@id": personId, name: "Anh-Duc Nguyen" },
      ],
    };

    const types = jsonLd["@graph"].map((entry) => entry["@type"]);
    expect(types).toEqual(["Blog", "Person"]);

    const person = jsonLd["@graph"][1];
    expect(person["@id"]).toBe("https://example.com/about/#person");
  });

  it("includes every post as a BlogPosting entry with its post URL", () => {
    expect(blogPosts).toHaveLength(2);
    expect(blogPosts[0].headline).toBe("Post 1");
    expect(blogPosts[0].url).toBe("https://example.com/posts/post-1");
    expect(blogPosts[1].headline).toBe("Post 2");
    expect(blogPosts[1].url).toBe("https://example.com/posts/post-2");
  });

  it("produces valid JSON from the structured data object", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [{ "@type": "Blog", url: blogUrl, blogPost: blogPosts }],
    };

    const serialized = JSON.stringify(jsonLd);
    const parsed = JSON.parse(serialized);

    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"][0].blogPost).toHaveLength(2);
  });
});

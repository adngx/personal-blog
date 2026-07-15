import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL, SITE_NAME } from "../env";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("posts"))
    .filter((post) => !import.meta.env.PROD || !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const sections: string[] = [
    `# ${SITE_NAME}`,
    "",
    "> A personal blog about software development. Learning in public as a high school student.",
    "",
    "---",
    "",
  ];

  for (const post of posts) {
    const url = `${SITE_URL}/posts/${post.id}`;
    sections.push(`## ${post.data.title}`);
    sections.push("");
    sections.push(`URL: ${url}`);
    sections.push(`Date: ${post.data.pubDate.toISOString().split("T")[0]}`);
    if (post.data.tags && post.data.tags.length > 0) {
      sections.push(`Tags: ${post.data.tags.join(", ")}`);
    }
    sections.push("");
    sections.push(post.data.description);
    sections.push("");
    if (post.body && post.body.trim()) {
      sections.push(post.body.trim());
    }
    sections.push("");
    sections.push("---");
    sections.push("");
  }

  return new Response(sections.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

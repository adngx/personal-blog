import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_URL, SITE_NAME } from "../env";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("posts"))
    .filter((post) => !import.meta.env.PROD || !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> A personal blog about software development. Learning in public as a high school student.",
    "",
    "## Pages",
    "",
    `- [Blog](${SITE_URL}/) — Post listing`,
    `- [About](${SITE_URL}/about) — About the author`,
    `- [Privacy Policy](${SITE_URL}/privacy-policy) — Privacy policy`,
    "",
    "## Posts",
    "",
  ];

  for (const post of posts) {
    const url = `${SITE_URL}/posts/${post.id}`;
    lines.push(`- [${post.data.title}](${url}) — ${post.data.description}`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

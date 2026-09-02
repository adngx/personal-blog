import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { socialLinks } from "../data/social-links";
import { AUTHOR_NAME, AUTHOR_DESCRIPTION } from "../data/identity";
import { SITE_URL, SITE_NAME } from "../env";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("posts"))
    .filter((post) => !import.meta.env.PROD || !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> A personal blog about learning cybersecurity in public. Learning in public as a high school student.",
    "",
    "## Identity",
    "",
    AUTHOR_DESCRIPTION,
    "",
    `- Name: ${AUTHOR_NAME}`,
    ...socialLinks
      .filter((link) => link.url.startsWith("http"))
      .map((link) => `- ${link.label}: ${link.url}`),
    `- Email: contact@adngx.com`,
    `- Full post bodies: [llms-full.txt](${SITE_URL}/llms-full.txt)`,
    "",
    "## Pages",
    "",
    `- [Blog](${SITE_URL}/blog) — Post listing`,
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

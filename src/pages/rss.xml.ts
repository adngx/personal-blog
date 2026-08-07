import rss, { type RSSFeedItem } from "@astrojs/rss";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getCollection, render } from "astro:content";
import { transform, walk } from "ultrahtml";
import sanitize from "ultrahtml/transformers/sanitize";
import { SITE_URL, SITE_NAME } from "../env";
import { AUTHOR_DESCRIPTION } from "../data/identity";

export async function GET() {
  // Normalize the base URL for absolute link/image rewriting (no trailing slash).
  const baseUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;

  const posts = (await getCollection("posts"))
    .filter((post) => !import.meta.env.PROD || !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const container = await AstroContainer.create();

  const items: RSSFeedItem[] = [];
  for (const post of posts) {
    // Render the post body with Astro's own pipeline so markdown output
    // matches the pages (images, code blocks, links) instead of a
    // second markdown parser.
    const { Content } = await render(post);
    const rawContent = await container.renderToString(Content);

    const content = await transform(
      rawContent.replace(/^<!DOCTYPE html>/, ""),
      [
        async (node) => {
          await walk(node, (node) => {
            if (node.name === "a" && node.attributes.href?.startsWith("/")) {
              node.attributes.href = baseUrl + node.attributes.href;
            }
            if (node.name === "img" && node.attributes.src?.startsWith("/")) {
              node.attributes.src = baseUrl + node.attributes.src;
            }
          });
          return node;
        },
        sanitize({ dropElements: ["script", "style"] }),
      ],
    );

    items.push({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
      content,
    });
  }

  return rss({
    title: SITE_NAME,
    description: AUTHOR_DESCRIPTION,
    site: baseUrl,
    items,
    customData: "<language>en-us</language>",
  });
}

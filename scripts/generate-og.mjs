import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, basename } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Generate default OG image
const defaultSvgPath = join(__dirname, "../public/og/default.svg");
const defaultPngPath = join(__dirname, "../public/og/default.png");

const defaultSvg = readFileSync(defaultSvgPath, "utf-8");
const defaultResvg = new Resvg(defaultSvg, {
  fitTo: { mode: "width", value: 1200 },
});
writeFileSync(defaultPngPath, defaultResvg.render().asPng());
console.log(`Generated ${defaultPngPath}`);

// Generate per-post OG images
const postSvgPath = join(__dirname, "../public/og/post.svg");
const postSvgTemplate = readFileSync(postSvgPath, "utf-8");
const postsDir = join(__dirname, "../src/content/posts");
const outputDir = join(__dirname, "../public/og/posts");

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const postFiles = readdirSync(postsDir).filter((f) => f.endsWith(".md"));

for (const file of postFiles) {
  const content = readFileSync(join(postsDir, file), "utf-8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) continue;

  const frontmatter = match[1];
  const titleMatch = frontmatter.match(/^title:\s*["']?(.*?)["']?\s*$/m);
  if (!titleMatch) continue;

  const title = titleMatch[1];
  const slug = basename(file, ".md");

  // Truncate long titles to fit the OG image
  const displayTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;

  const svg = postSvgTemplate.replace("{{TITLE}}", displayTitle);
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const pngPath = join(outputDir, `${slug}.png`);

  writeFileSync(pngPath, resvg.render().asPng());
  console.log(`Generated ${pngPath}`);
}

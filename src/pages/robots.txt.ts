import { SITE_URL } from "../env";

export function GET() {
  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    "Content-Signal: ai-train=no, search=yes, ai-input=no",
    "",
    `Sitemap: ${new URL("/sitemap-index.xml", SITE_URL).href}`,
  ].join("\n");

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

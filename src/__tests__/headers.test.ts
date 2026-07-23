import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * CSP header validation tests.
 *
 * The Cloudflare Pages `_headers` format does not support comments,
 * so this test doubles as living documentation of which external
 * domains are required and why. When adding a new external dependency
 * (iframe, image CDN, font host, etc.), add an entry to
 * REQUIRED_CSP_EXCEPTIONS and update `public/_headers` to match.
 */

const HEADERS_PATH = join(process.cwd(), "public", "_headers");

/**
 * Each entry: [domain, directive, reason].
 *
 * - domain:    full origin (https://example.com)
 * - directive: the CSP directive it must appear in
 * - reason:    why this domain is needed (for documentation)
 */
const REQUIRED_CSP_EXCEPTIONS: ReadonlyArray<
  readonly [string, string, string]
> = [
  [
    "https://astro.badg.es",
    "img-src",
    "Built with Astro badge SVG in site footer",
  ],
  [
    "https://giscus.app",
    "frame-src",
    "Giscus comments iframe for blog post discussions",
  ],
] as const;

/**
 * Parse the CSP header value into a Map of directive → raw value string.
 * Returns null if the CSP header is not found.
 */
function parseCspDirectives(headersContent: string): Map<string, string> {
  const cspLine = headersContent
    .split("\n")
    .find((line) => line.trim().startsWith("Content-Security-Policy:"));

  if (!cspLine) {
    return new Map();
  }

  const value = cspLine.split("Content-Security-Policy:")[1].trim();
  const directives = new Map<string, string>();

  for (const part of value.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const spaceIndex = trimmed.indexOf(" ");
    if (spaceIndex === -1) {
      directives.set(trimmed, "");
    } else {
      directives.set(
        trimmed.slice(0, spaceIndex),
        trimmed.slice(spaceIndex + 1),
      );
    }
  }

  return directives;
}

describe("CSP headers", () => {
  const headersContent = readFileSync(HEADERS_PATH, "utf-8");
  const directives = parseCspDirectives(headersContent);

  it("contains a Content-Security-Policy header", () => {
    expect(directives.size).toBeGreaterThan(0);
  });

  it("has a default-src directive", () => {
    expect(directives.has("default-src")).toBe(true);
  });

  it("has a frame-ancestors directive", () => {
    expect(directives.has("frame-ancestors")).toBe(true);
  });

  for (const [domain, directive, reason] of REQUIRED_CSP_EXCEPTIONS) {
    it(`${directive} includes ${domain} (${reason})`, () => {
      const directiveValue = directives.get(directive);
      expect(
        directiveValue,
        `CSP ${directive} must include ${domain} (${reason})`,
      ).toBeDefined();
      expect(
        directiveValue,
        `CSP ${directive} must include ${domain} (${reason})`,
      ).toContain(domain);
    });
  }
});

import { describe, it, expect } from "vitest";
import { socialLinks, type SocialLink } from "./social-links";

describe("social links data", () => {
  describe("structure", () => {
    it("exports an array", () => {
      expect(Array.isArray(socialLinks)).toBe(true);
    });

    it("is not empty", () => {
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it("is typed as readonly array", () => {
      // as const provides compile-time immutability
      const assignable: readonly SocialLink[] = socialLinks;
      expect(assignable).toBe(socialLinks);
    });
  });

  describe("each link has required fields", () => {
    socialLinks.forEach((link, index) => {
      describe(`link ${index}: ${link.label}`, () => {
        it("has a label string", () => {
          expect(typeof link.label).toBe("string");
          expect(link.label.length).toBeGreaterThan(0);
        });

        it("has a url string", () => {
          expect(typeof link.url).toBe("string");
          expect(link.url.length).toBeGreaterThan(0);
        });

        it("has a valid url", () => {
          expect(() => new URL(link.url)).not.toThrow();
        });
      });
    });
  });

  describe("contains expected social platforms", () => {
    it("includes GitHub", () => {
      const github = socialLinks.find((l) => l.label === "GitHub");
      expect(github).toBeDefined();
      expect(github!.url).toContain("github.com");
    });

    it("includes X (Twitter)", () => {
      const x = socialLinks.find((l) => l.label === "X (Twitter)");
      expect(x).toBeDefined();
      expect(x!.url).toContain("x.com");
    });

    it("includes Email", () => {
      const email = socialLinks.find((l) => l.label === "Email");
      expect(email).toBeDefined();
      expect(email!.url).toContain("mailto:");
    });
  });

  describe("SocialLink type", () => {
    it("matches the shape of each link", () => {
      socialLinks.forEach((link) => {
        const typed: SocialLink = link;
        expect(typed).toHaveProperty("label");
        expect(typed).toHaveProperty("url");
      });
    });
  });
});

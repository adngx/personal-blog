import { z } from "astro/zod";

const envSchema = z.object({
  SITE_URL: z.string().url("SITE_URL must be a valid URL"),
  TWITTER_HANDLE: z.string().optional().default(""),
});

const rawEnv = {
  SITE_URL:
    process.env.SITE_URL ?? process.env.CF_PAGES_URL ?? "http://localhost:4321",
  TWITTER_HANDLE: process.env.TWITTER_HANDLE ?? "",
};

const parsed = envSchema.safeParse(rawEnv);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  for (const issue of parsed.error.issues) {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  }
  throw new Error("Environment validation failed");
}

export const SITE_URL = parsed.data.SITE_URL;
export const TWITTER_HANDLE = parsed.data.TWITTER_HANDLE;
export const SITE_NAME = "Personal Blog";

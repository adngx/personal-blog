# AI-8 — Crawler-Access Verification Report

_Date: 2026-08-07 · Scope task AI-8 from `docs/scope/ai-visibility-plan.md`_

## Method

`curl -A <user-agent>` against 4 paths with the 5 AI crawler user agents from
the plan (M-4's allowlist). Two runs:

1. **Local production build** — `SITE_URL=https://adngx.com npm run build`, served
   via `astro preview` (this is the exact output that will deploy).
2. **Live production** — `https://adngx.com` (current deployed state, baseline).

Paths: `/robots.txt`, `/llms.txt`, `/sitemap-index.xml`,
`/posts/why-im-learning-java-in-2026/`.

## Results

| Run                               | ClaudeBot | anthropic-ai | GPTBot | PerplexityBot | Google-Extended |
| --------------------------------- | --------- | ------------ | ------ | ------------- | --------------- |
| Local build (20 requests)         | 200 ×4    | 200 ×4       | 200 ×4 | 200 ×4        | 200 ×4          |
| Production baseline (20 requests) | 200 ×4    | 200 ×4       | 200 ×4 | 200 ×4        | 200 ×4          |

**All 40 requests returned 200.** No Cloudflare-side blocking of known AI
crawlers. M-4 (bot settings) needs no changes based on this evidence.

## Content checks (local production build)

- `/robots.txt` serves `Content-Signal: ai-train=no, search=yes, ai-input=yes`
  and the sitemap URL with the production domain.
- `/llms.txt` opens with the Identity section: the one approved sentence,
  author name, GitHub/X/email links, llms-full.txt pointer.
- `/sitemap-index.xml` resolves to `/sitemap-0.xml` listing all 6 pages.
- Post page returns 200 with full HTML (TL;DR card, JSON-LD, article meta).

## Caveat / follow-up

- The **local build** reflects the new code; **production** currently runs the
  previous deploy (no identity block, old robots.txt). After the push to main
  deploys, re-run the production column to confirm — expected: still all 200.
- Then re-run M-1 (Claude audit): the `ai-input=yes` fix should make Claude's
  web fetch read the site normally.

## Re-run command

```bash
for ua in ClaudeBot anthropic-ai GPTBot PerplexityBot Google-Extended; do
  for p in /robots.txt /llms.txt /sitemap-index.xml /posts/why-im-learning-java-in-2026/; do
    curl -s -o /dev/null -w "$ua $p -> %{http_code}\n" -A "$ua" "https://adngx.com$p"
  done
done
```

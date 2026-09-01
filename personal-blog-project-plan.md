# Personal Blog / Learning-in-Public Project Plan

## Purpose

I am a high school student going to study IT-Sicherheit (cybersecurity) in Germany. After university I want to be a security engineer — cloud security in the long run — and build my startup on the side.

Right now I don't have shareable, valuable skills other than self-studying and making decisions on my own — so I'll mainly write about what I'm learning and what strategies I'm using, in a weekly-update format.

**Purpose of the blog:**

- Get more audience long term
- Practice content writing skills
- Useful groundwork for my own startup later
- Complements social media — doesn't replace it (I plan to also build a presence there)

> **Note:** This strategy has real precedent. Senior engineers who built careers this way (e.g. swyx / "Learn in Public") frame the point as: the biggest beneficiary of writing publicly is usually _future-you_, not the audience. Hiring managers on Hacker News have also said a blog with even a couple of articles is a real edge in resume screening. SEO/audience compounding realistically takes 6–12 months before it "clicks," which matches your own "slow but reliable" framing — the main risk isn't that the strategy is wrong, it's quitting in month 3 before compounding starts. You have a multi-year runway before college hiring/startup time, which is exactly the resource this strategy needs most.

---

## Core Features

- **About myself**
- **Posts** (weekly updates)
- **Comments section** — implemented from scratch with Supabase
  - ⚠️ _Note:_ Public comment forms attract spam bots almost immediately. Add **Cloudflare Turnstile** (free, no CAPTCHA puzzles) since you're already on Cloudflare — it drops right into a Supabase-backed form.
  - ⚠️ _Note:_ Astro islands don't share React context with each other. Build the comments widget as **one self-contained React component/island**, not scattered shadcn calls split across the page.
- **Newsletter** — Resend
  - ⚠️ _Note:_ Clarify which Resend product you're using. _Transactional_ email is free up to 3,000 emails/month (100/day cap). _Marketing/Broadcasts_ (what an actual newsletter blast uses) is free up to **1,000 contacts**, with unlimited sends to that list. The real free-tier ceiling for a newsletter is subscriber count, not email count — plan around that.
- **RSS feed** _(added)_ — low priority for growth (mostly read by developers/aggregators, not casual readers), but Astro supports it natively and it costs nothing, so worth including anyway.

---

## Tech Stack

- **Astro**
- **Supabase** (for comments section)
  - ⚠️ _Note:_ Free-tier projects **auto-pause after 7 days of no API activity** — comments silently stop working until manually resumed from the dashboard. Fix: a scheduled GitHub Action that pings the Supabase API weekly.
  - ⚠️ _Note:_ No automated backups on the free tier. Worth a simple periodic export script (e.g., dump the comments table to a private repo).
- **shadcn/ui**
  - ✅ Confirmed officially supported for Astro via the shadcn CLI (`npx astro add react tailwind` + shadcn init).
- **Resend** (for newsletter)

---

## Deployment

- **Domain:** Cloudflare Registrar
  - ✅ Confirmed at-cost pricing — a `.com` runs ~$10.44/yr at registration _and_ renewal, no bait-and-switch renewal hike. WHOIS privacy + DNSSEC included free.
  - ⚠️ _Note:_ Requires using Cloudflare's own nameservers — not an issue since you're deploying on Cloudflare Pages anyway.
  - ⚠️ _Note:_ Domain purchases and billing accounts generally assume you're entering a contract as an adult. Worth having a parent's card/account as a fallback if you hit friction at checkout.
- **Hosting:** Cloudflare Pages
  - ✅ Confirmed free tier: unlimited bandwidth, 500 builds/month, up to 20,000 files/site, 25 MiB max file size — comfortably more than a blog needs.

---

## Costs

| Item                        | Cost           | Status                                                                                  |
| --------------------------- | -------------- | --------------------------------------------------------------------------------------- |
| Domain name                 | $10–20/yr      | ✅ Confirmed accurate (Cloudflare Registrar, at-cost)                                   |
| Hosting (Cloudflare Pages)  | $0             | ✅ Confirmed, generous free tier                                                        |
| Dev                         | $0             | ✅ True if self-built                                                                   |
| Comments section (Supabase) | $0             | ✅ True, but watch the 7-day auto-pause + no backups                                    |
| Newsletter (Resend)         | $0 until limit | ⚠️ Real ceiling is 1,000 subscribers (marketing/broadcast tier), not 3,000 emails/month |

---

## Other things worth adding

- **Privacy policy / basic legal note** — once you're collecting emails (newsletter) and storing comments (names/content), a short privacy policy page is worth having, even for a personal project.
- **Spam moderation** for comments — Cloudflare Turnstile, as noted above.
- **Backup plan** for Supabase data — as noted above.

---

## Strategic rationale (why a blog, and not just social media or pure skill-building)

- **swyx's "Learn in Public"** — real senior engineer/DevRel career built substantially on this; the framing is that writing publicly mainly benefits future-you, and eventually it matters to own your domain and mailing list rather than just posting on rented platforms (Medium, Dev.to, social).
- **Hiring signal** — a Hacker News hiring manager noted that even a sparse blog is a meaningful edge over candidates with nothing like it, directly relevant to your security-engineering goal.
- **SEO/audience timeline** — indie hacker consensus: months 1–2 look like nothing is happening, months 3–6 traffic starts trickling in, months 7–12+ is where compounding kicks in. Quitting early is the actual failure mode, not the strategy itself.
- **Blog vs. social media** — the consistent advice across founder communities is to run both in parallel: social media surfaces content, the blog gives it a permanent, ownable home. Nobody serious argues it's either/or.
- **Your advantage** — you're not doing product SEO (which needs market validation first); you're doing personal-brand SEO, which has no such prerequisite and can start on day one. Combined with a multi-year runway before college/job-hunting, you're well positioned for a strategy that specifically rewards time.

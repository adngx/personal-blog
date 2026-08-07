# GEO / AI Visibility Plan for adngx.com

_Status: research complete + refined against the personal wiki (`C:\my-second-brain`) — nothing implemented yet. Source session: 2026 — user asked to investigate (no changes), then to save the plan, the request, and the podcast transcript, then to combine the plan with the wiki profile and refine it in place. **Work from §6 — the complete final action plan, split by who does the work (AI-executable `AI-x` vs manual `M-x`)**. §3 is the original report, kept verbatim for context only; where they differ, §6 wins._

---

## 1. User request

> Use the content of the podcast to investigate how can I make my blog more visible to AI (both through coding and non-coding actions). Research thoroughly using the search api turbo mode if needed. Report back to me. Don't change anything yet.

_(Follow-up: "save this plan (and my request + the podcast transcript) somewhere")_

---

## 2. Source podcast transcript

Video: Marina Mogilko (Silicon Valley Girl) — GEO / Generative Engine Optimization walkthrough. Unverified claims in this transcript are the speaker's, not research findings.

> The biggest threat to you and your business right now isn't AI replacing you. It's AI ignoring you. Let me share a story that just happened. So, [music] a chatbot almost cost Ryan Serhant, real estate agent in New York, a $50 million penthouse deal. What happened is that the buyer asked ChatGPT, [music] "Is 50 million too much?" And ChatGPT said yes, so the broker called to pull out. At the same time, the seller asked the same ChatGPT, and it told them to hold out for more. Both sides [music] almost walked over one chatbot answer. And this is happening with your customers every single day. Before they ever reach your website, your blog, whatever you're promoting, they're asking ChatGPT, Claude, or Perplexity, "What should I buy? Who should I hire? Which company sells [music] this? Who's the best creator in this niche?" The AI doesn't hand them 10 links anymore. It hands them [music] three names, maybe five, but if you're not one of them, the sale is over before it starts. And the data shows that 35% of people [music] in the US now start shopping inside an AI assistant instead of a search word. This is crazy. The conversion is up 693% [music] in a year, and just listen to this number, because we actually saw it in my newsletter. People coming from ChatGPT convert at 15.9% when people coming from organic Google convert at 1.76%. [music] It wasn't like that 2 years ago. It wasn't like that a year ago. It is happening right now, and you have to pay attention. So, as you know, I run this podcast, Silicon Valley Girl. I interview CEOs and leaders, and we had some pretty darn amazing guests. We had the CEO of LinkedIn, we had the founder of LinkedIn twice. We had the CEO of GitHub, founder of Perplexity, Mustafa Suleyman from Microsoft. Like, pretty good roster, right? And even though we had famous names, and all of them are related to AI, when we asked ChatGPT for the best AI podcast to listen to, or like just give me a few AI podcasts. We were never ever on the list, and knowing how people convert when chat GPT recommends them something, and we decided to run a full GEO So, GEO stands for generative engine optimization. Some people call it AEO. It's basically the same. Optimizing whatever you are producing online, your content, your website for those chatbots. And uh we've run this experiment for a few months, and based on our queries, we became the fifth most visible of the 11 podcast brands the models track, and our AI visibility doubled. So, of course, I have to share everything with you in this video. I'll show you exactly what we changed, which tools we used, and what happened to our visibility. I'm going to describe everything step-by-step, so you can copy. I'm going to go in the exact order we did it, so that you take the system and make your own business or podcast or whatever you're working on show up in the AI age. And the real opportunity is that most businesses are not doing this yet, so you have this first-mover advantage. 92% of marketers say they plan to optimize for AI search. Only 40% are actually doing that. The gap is your head start. And if you want to build this system with me, subscribe, because I share everything I try myself, what worked, what didn't, and the actual numbers. So, step number one, find out if AI can even read you. A few months ago, I was testing something simple. Ask a few chatbots to recommend Silicon Valley podcasts. And my show didn't come up, despite the name Silicon Valley Girl. Like, come on. Not on Perplexity, not on ChatGPT, not on Gemini. After 50-plus SEO interviews, and the models acted like the show did not exist. Isn't that wild? All that content was completely invisible. So, I did one thing that started this one-month-long rebuild, and it's the first thing I want you to do. My team sent our website URL to Claude with one question. How visible are we in AI search and why aren't we showing up? Claude came back with a very specific list. The HTML was missing the parameters AI crawlers need to read a page. The transcripts of our podcasts were hidden behind JavaScript, so the crawlers just saw an empty shell. By the way, by the site, I mean we just have a website where I host all the information about all my social media. Of course, we have YouTube, but we can't really do a lot around its infrastructure. Uh but we we're going to talk about YouTube as well. But basically, the website I have, marinamegilgo.com, looked totally fine to human. To an AI reading the source code, we're basically blank page. So before you watch the rest of this video, put this on pause, take your URL, paste it into whatever chatbot you're using, and ask it how visible you are in AI search, and what's stopping you from showing up. You'll get back a list of fixes specific to your site. And again, any insights on this, uh I'm waiting to read your comments because we're still working on this problem. >> If you run a newsletter, a community, or a client list, you're already paying for an email platform, probably more than you need to. Omnisend can cut that bill by up to 35%, and the migration takes about 5 days. They handle the move. You show up when it's done. Every flow, every list, every template comes with you. Same automations running, same sequences live on a platform that doesn't charge extra for features you already expect. Their average customer gets $79 back for every $1 spent. 150,000 businesses run on it. 24/7 support, no added cost. The process is simple. Fill out a form, Omnisend's team handles the setup in 3 to 5 days, store connection, contact import, SMS transfer, workflows. You test everything while keeping your old platform running, then switch when it's ready. Support guides you through it all. Check out the link in the description and use code SB Girl 30 to get 30% off your first 3 months. So, this list is basically your road map. Your step number two, you build a home the crawlers can read. So, level one was giving the crawlers something they could actually read. We didn't even have a real podcast site. So, we live coded one from scratch. Again, super easy these days. We use Claude code. You describe what you want in plain English and it writes the actual code for you. Then, that site has to live somewhere on the internet, so we put it on Vercel. Vercel is the host. It's the place your website actually sits. Back end is basically the part nobody sees. RS keeps all of raw episode data in one place. Every transcript, every guest name, every summary. Railway is where that engine runs. So, when we add a new episode, its page builds itself from that data instead of me copying and pasting the same layout into 85 different pages by hand. So, now we have this site, podcast.marinamogilko.co, where every single episode has its own crawlable URL with a full episode transcript, summary, and guest profile. Google indexed that homepage within 4 weeks. So, it's a long-term task. It's not going to happen overnight. Then, we of course made every page machine readable and this is the part most people skip. Every page is fully built and just sitting there. All the text already on it before anyone opens it. Nothing has to load or assemble first. So, when the AI crawlers come by, the little bots that ChatGPT, Perplexity, and Claude send out to read the web, the whole page is right there for them instantly. Nothing to wait for, nothing to click. We built 85 plus episode pages this week. The same setup is used by Huberman Lab and Lex Fridman. Again, it's very important that the full transcript sits right there in plain text without you having to click to open anything. That move adds 8,000 to 15,000 words per episode the AI can now read and quote back with our name on it. And honestly, if you do nothing else from this video, do that part. There is a real signal behind it. And now step number three. You got to fix your identity in the machine. So the models don't really decide what your business is or what your social media persona is just by reading your home page. They read a few structured databases that label you and then they trust the label. Get the label wrong and you get filed in the wrong. So number one, Wikidata. The machine-readable record that tells AI what kind of thing or person you are. So this is something that moved everything the most. Wikidata sits behind Google's knowledge panel and feeds Gemini. Every entity has a field called instance of, which is just what type of thing it is. Mine said vlogger and a YouTuber because that's what I was 10 years ago and 12 years ago when I when I started. Gemini read that field and called Silicon Valley Girl a vlog and a vlog never gets pulled into a podcast answer. So we changed the occupation to podcast host, entrepreneur and angel investor, added the podcast as its own entry and translated it into 11 languages so the same fact holds no matter which language the model replies in. Uh it took us a few hours. You have to do it as well. This is where the models actually read your category, not just where people listen. This part is for creators who are present on podcast but also for founders. You know, podcasting is a big part of your marketing strategy. So when we pulled the sources of the models cited in a category, Apple was about half of them. Half. So we rewrote the show description and the category fields to say the exact phrase we want to repeat it back." AI, tech, and career growth interviews with CEOs. Same words we would put into the Wikidata occupation. Spotify, same description, second source for cross-checking. By the way, the GEO mistake I was making is that I was writing a fresh bio on every platform because it just felt nicer. That was actually a mistake. So, now we rewrote my Spotify bio to match Apple and Wikidata word for word on the phrases that matter. When the sources disagree, the models play safe and name someone else. When all three say the same sentence, it repeats your sentence back. The principle under all of it, whatever the AI thinks you are, go to every place that reads your site, Wikidata, Apple, Spotify, and make them say one identical accurate sentence. This is the cheapest step on the list and also one of the strongest. Now, step number four is plumbing. The way search and AI tools find you is that they don't magically know your page exists. A crawler has to discover each page, read it, and add it to an index. If a page never makes it to that index, no search engine and no AI can ever recommend it. It's invisible by default. So, we really needed to get those pages into the indexes. So, here is how you can do it. First, Google Search Console. This is like a direct line to Google. You hand it a sitemap, which is one file that lists every page on your site, so Google doesn't have to stumble onto one of them at a time. Then it tells you exactly which pages Google found, which ones it couldn't read, and what's broken. We submitted our sitemap, and Google discovered 91 pages it hadn't indexed before. The result from this boring hour work, about 700 clicks a month on the main site that simply weren't there before. Plus 91 pages the engines can now find, end quote. The lesson here is that before anyone can recommend you, a machine has to find your page and file it away. Then next step, of course you have to measure it. If you don't have the numbers, if you don't know how things are moving, you can't really steer your airplane. We track all of our work through an app called Peak AI, p e e c a i. It tracks the three engines we have turned on, Google, Google AI overview, ChatGPT and Perplexity, and it tells me for every question whether we show up and who's beating us. By the way, we did our research. We looked at different AI tools. Uh Peak covered the most engines at the entry price, so we stayed. And also Peak has this tactic that's worth the whole subscription in my opinion. It shows you the exact keywords models searches for internally while it's answering questions. So we just started writing those exact phrases into our episode titles. Yes, that straightforward. The first time we confirmed it was our Reid Hoffman X LinkedIn CEO episode. We titled it to match what models search is for, the LinkedIn CEO podcast, and we started winning that answer. Isn't that nice? It's now a repeatable pattern across five different guest questions. Check every title against what people are actually typing into AI. And by the way, this is a long-term work that never stops, so this is not final, but let me show you before and after. I think uh it's just going to inspire you to continue this work. When we started, we showed up in about seven of 48 tracked questions. Masters of Scale, Reid Hoffman's podcast, was in 21, All-In, of course, 19, Diary of a CEO in 15. We were nowhere near them. As of last week, Silicon Valley Girl is the fifth most visible by AI visibility of 11 podcast brands we track, ahead of TVPN, Gary V, and Mel Robbins. Of course, full disclaimer, we're only tracking a few keywords that we think matter to us. We're going to add more very soon, and we're going to go low in rankings again, but we are now just seeing how we're rising in the ones that we're tracking, which means there are a few more that we're not tracking, and our overall AI search visibility doubled over the time we worked on all of this. There are some specific questions that we actually own, so and by the way, of course, every answer is personalized. But, I don't know. If you ask AI for podcast with Yo Ass and Matthias, we come up 34% of the time, often as the only show it names as head of Google research, which is amazing, right? Also, try best podcast for women interested in AI and startups. 19% is us. Perplexity CEO podcast, 31%, although Aravind just did another podcast with 20VC. I wonder if that messes up the results. But, as I said, it's an evolving, ever-changing game, but I love playing it. I also want to be honest about where we still lose. The really broad ones, like, of course, best AI podcast to 2026, we don't win them. Those get answered from big listicles where competitors get mentioned way more often than we do, and we haven't been cited much. We did get named in a Forbes listicle in April, and that's kind of a thing that moves the broad questions. So, the work is still ongoing. I think my next step, well, first of all, stepping up my game, asking better questions, getting more views, getting more relevant, but also, I think I will start working with a publicist. I don't know if you follow me on LinkedIn, but I shared my PR nightmare story that happened a year ago, where it didn't pay off at all, but now I have a person who I trust. So, maybe we'll try that. Anyways, the work is still going. I'll share If this video does well, I'll do another video on GEO, and I will definitely keep sharing about our GEO AEO journey in my newsletter called future proof. It's free. The link is in the description. So here's your clear roadmap the same order we did it. One, you ask AI to read your site and tell you why you're invisible. Do it right now. Two, give the crawlers something they can actually read. Static HTML, real transcripts in the source. We were invisible for one boring technical reason and fixing it was the single highest leverage thing we did. Three, fix your identity everywhere so it says the same accurate thing from Wikidata to your platform bios to your to your social media anywhere you show up. Four, match your titles and headlines to the questions people actually ask the AI. Because it's the biggest mistake the way we try to formulate thoughts and the way people actually think. And five, pick one tracker and watch it weekly and read the trend over weeks not days. Don't rush it because a single week doesn't really make a difference as I said to Google four weeks to identify us. And here's the honest truth as well why I mentioned PR and and a publicist. 82% of what AI sites is earned media. Earned media means other people talking about you not you talking about yourself. An article that mentions you, a podcast listical you got named in or like top entrepreneurs, a journalist who quoted you, a Reddit thread about you. You don't pay for it and you didn't post it. Someone else did and that's what the AI trusts the most because anyone can say they're the best on their own website. If you're like, "Okay Marina, that was great. Can I have this plan and do it later?" Yes, you can. It's in my future proof newsletter. The link is in the description. Subscribe and you'll get the 30-day plan that we've created for ourselves and for you for free. I hope this video was useful and if it was, please thumbs up because uh I haven't done these tutorials in a while. I want to see if you're liking them and if they're most important if they're useful and if you're applying them. So, please let me know down the comments if it's useful. Please give this a thumbs up and if you can talk about this podcast on your social media, I'll be so so grateful. Thank you so much, guys, and I hope this information and video was useful. Bye.

---

## 3. Investigation report (delivered to user, unchanged)

### TL;DR

The blog is already **far ahead of where the podcast started**. Hard technical foundations are done: static HTML (Astro `output: "static"`), sitemap, RSS, `robots.txt` with AI Content-Signal, `llms.txt`/`llms-full.txt` with full post bodies, and JSON-LD on every page. **Verified live on adngx.com** — everything serves correctly.

Remaining wins, in rough order of impact:

1. **Entity depth** — JSON-LD says the author is "adngx" (a brand), not a person; **no Wikidata entry at all** (verified — empty search). "Fix your identity in the machine" is the single biggest untapped lever.
2. **Indexing/distribution** — Google Search Console + Bing Webmaster Tools sitemap submission (feeds Google AI Overviews and Copilot/ChatGPT search).
3. **Content tactics** — direct answers at the top of posts (research: 55% of AI Overview citations come from the first 30% of a page), titles matched to how people phrase AI queries.
4. **Measurement + earned media** — one AI-visibility tracker watched weekly; get other people talking about you (~82% of what AI cites is earned media, per the podcast).

### What already exists (verified live)

| Asset                                                                        | Status                                      | Location                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------- | --------------------------------------------------- |
| Static HTML, no JS-rendered content                                          | ✅                                          | `astro.config.mjs` (`output: "static"`)             |
| Sitemap                                                                      | ✅ live at `/sitemap-index.xml`             | `@astrojs/sitemap` in `astro.config.mjs:18`         |
| RSS feed                                                                     | ✅ live (description-only — gap, see below) | `src/pages/rss.xml.ts`                              |
| `robots.txt` + Content-Signal (`search=yes`)                                 | ✅ live                                     | `src/pages/robots.txt.ts`                           |
| `llms.txt` + `llms-full.txt` (full post bodies)                              | ✅ live                                     | `src/pages/llms.txt.ts`, `llms-full.txt.ts`         |
| JSON-LD: WebSite/Blog (home), BlogPosting (posts), Person + `sameAs` (about) | ✅                                          | `index.astro:13`, `[id].astro:27`, `about.astro:13` |
| Canonical, description, OG, Twitter cards, per-post OG images                | ✅                                          | `layouts/Layout.astro`                              |
| SEO logic tests as a quality gate                                            | ✅                                          | `src/__tests__/seo.test.ts`                         |

### Coding actions (by priority)

#### P1 — Strengthen the entity layer (highest leverage)

**1a. Fix the author in BlogPosting JSON-LD (`src/pages/posts/[id].astro:33-37`).**
Today the author is `{"@type": "Person", "name": "adngx", "url": SITE_URL}` — a brand pointing at the homepage. That's the exact mistake the podcast describes: the machine files you as the wrong _kind of thing_. Change it to the human (Anh-Duc Nguyen), with `@id` pointing at the Person node from the About page, plus `sameAs` (social profiles — already in `src/data/social-links.ts`).

**1b. Add `@id` linking across the graph.** Give the About `Person` a stable `@id` (e.g. `https://adngx.com/about#person`), then have home (`WebSite`/`Blog`) and posts (`BlogPosting`) reference it. Schema.org identity resolution is how models connect "this post" → "this person" → "this brand" instead of guessing.

**1c. Enrich BlogPosting fields** (cheap, data already exists): `publisher`, `mainEntityOfPage`, `inLanguage: "en"`, `keywords` (from `post.data.tags`), `wordCount`, `timeRequired` (reading time already computed in `src/lib/reading-time.ts`).

**1d. Strengthen `llms.txt` (`src/pages/llms.txt.ts`)** — good, but only names the brand. Add an identity section: who you are (one sentence), author, social links, note that `llms-full.txt` contains full post bodies. Keep `llms-full.txt` as-is.

#### P2 — Feed more machine-readable content

**2a. Full content in RSS (`src/pages/rss.xml.ts`).** Items currently ship only `description`. `@astrojs/rss` supports a `content` field — render the post body into the feed. Same principle as the podcast's full transcripts.

**2b. Review `Content-Signal: ai-input=no` (`src/pages/robots.txt.ts:8`).** Per the [Content Signals spec](https://contentsignals.org/), `search=yes` (citations — present) and `ai-input` are separate. `ai-input=no` can reduce how freely models summarize/quote pages in answers, and sits oddly next to `llms-full.txt` (which exists to be fed into AI). Deliberate trade-off: if maximum AI visibility is the goal, `ai-input=yes` is the consistent choice.

**2c. Add `article:published_time` / `article:modified_time`** OG tags in `Layout.astro` for posts — freshness signals for AI and social crawlers.

#### P3 — Nice-to-haves

- **Direct-answer intro** (also content): AI Overviews cite early page content disproportionately (CXL: 55% of citations from the first 30%). A one-sentence answer `<p>` right under each post's H1 — layout choice in `[id].astro` plus a writing habit.
- **`ai.txt`** — emerging Perplexity-proposed format; adoption mixed, hasn't won. Watch, don't invest yet.
- **Ops note:** `env.ts:12-13` falls back to `CF_PAGES_URL` then `localhost`. Set `SITE_URL` to `https://adngx.com` in Cloudflare Pages production settings, or canonical/sitemap/llms URLs can point at the wrong host.

**No external domains are added by any of these changes** — `public/_headers` CSP and `headers.test.ts` stay untouched.

### Non-coding actions

1. **Audit test right now** (podcast step 1, ~5 min): paste `https://adngx.com` into Claude — _"How visible is this site in AI search, and why isn't it showing up?"_
2. **Google Search Console** (podcast step 4): verify adngx.com, submit `https://adngx.com/sitemap-index.xml`. Direct line to Google AI Overviews. Podcast team: 91 pages indexed, ~700 clicks/month. Expect ~4 weeks before Google identifies you.
3. **Bing Webmaster Tools**: verify + submit sitemap. Bing's index feeds Copilot and part of ChatGPT search traffic.
4. **Create your Wikidata entry** (podcast step 3 — "moved everything the most"). Verified: **no entry exists**. QID for Anh-Duc Nguyen: `instance of: human`, occupation (software developer / student / writer), educated at, official website, GitHub, social accounts. Feeds Google Knowledge Graph and Gemini. A few hours.
5. **One identical sentence everywhere** (podcast core principle): when sources disagree AI plays safe; when they agree word-for-word it repeats your sentence. One sentence, e.g. _"Anh-Duc Nguyen is a high school student learning software development in public."_ — same words in About page, Wikidata, GitHub bio, LinkedIn, X bio, newsletter footer.
6. **Match titles to AI-query phrasing**: think in the questions people type — "is Java worth learning in 2026?", "should I learn React or React Native?". Existing titles are already question-shaped; tune against tracker data.
7. **Pick one tracker, watch weekly** (podcast step 5): **Peec AI** (podcast's tool), **Aperture** (open-source, self-hosted, free), **OpenLens** (free tier), Similarweb AI Search Intelligence, Yext, Adobe Brand Visibility. Small tracked-query set; trends over weeks not days.
8. **Earned media is the endgame**: ~82% of what AI cites is other people talking about you. Share posts on HN/Reddit (`r/webdev`, `r/learnprogramming`, `r/java`), pitch dev newsletters (Java Weekly, TLDR, etc.), get into listicles — a single Forbes-style mention moves broad "best X" queries.

### Research evidence

- **GEO academic origin**: Princeton — [_GEO: Generative Engine Optimization_](https://arxiv.org/abs/2311.09735) (2023/2024).
- **Citations cluster at page top**: [CXL study](https://cxl.com/blog/google-ai-overview-citation-sources/) — 55% of AI Overview citations from the first 30% of a page; 21% from the bottom 40%.
- **AI Overviews prevalence**: [Semrush](https://www.semrush.com/blog/semrush-ai-overviews-study/) — ~16% of queries trigger AI Overviews in 2025; [Search Engine Journal](https://www.searchenginejournal.com/google-ai-overviews-favor-major-news-outlets-study-reveals/548359/) — top-10 outlets capture ~80% of news citations.
- **Trust/entity signals**: [Yext analysis of 6.8M AI citations](https://www.yext.com/blog/ai-visibility-in-2025-how-gemini-chatgpt-perplexity-cite-brands); Wikidata + `sameAs`/JSON-LD `@id` linking as mechanism ([appearmore Wikidata guide](https://appearmore.com/geo-knowledge-base/semantic-web-knowledge-graphs/public-graphs/wikidata-editing), [geo-schema JSON-LD templates](https://github.com/getauracite/geo-schema)).
- **Content-Signal spec**: [contentsignals.org](https://contentsignals.org/).
- **llms.txt status**: [llms-txt.io](https://llms-txt.io/blog/is-llms-txt-dead) — real but adoption uneven; keep it, don't bet on it.
- **Podcast stats (unverified)**: 35% of US start shopping in AI; ChatGPT referral conversion 15.9% vs organic Google 1.76%; 92% of marketers plan to optimize for AI search, only 40% do.

### Suggested 2-week roadmap

| When     | Action                                                                                            | Effort    |
| -------- | ------------------------------------------------------------------------------------------------- | --------- |
| Day 1    | Claude audit prompt on adngx.com; GSC + Bing verify & submit sitemap                              | ~1.5 hrs  |
| Day 2–3  | P1 code changes (author identity, `@id` graph, llms.txt, RSS full content) + update `seo.test.ts` | ~half day |
| Day 3–5  | Wikidata entry (person + website + links)                                                         | 2–4 hrs   |
| Week 1–2 | One consistent sentence everywhere; direct-answer intros; title phrasing                          | ongoing   |
| Week 2   | Pick a tracker, define 10–20 tracked queries, baseline                                            | ~1 hr     |
| Ongoing  | Earned media: Reddit/HN/newsletter pitches, listicle outreach                                     | weekly    |

---

## 4. Who this plan is for — my profile (from the wiki)

Section 3 was written for "a blog". This section is what it was missing: the plan's target is _me_. Every action below was chosen because it serves these facts, taken from `C:\my-second-brain` (`wiki/profile.md`, `wiki/entities/blog.md`, `wiki/plans/*`, `wiki/topics/*`).

**Identity.** Anh-Duc Nguyen, 16, high school student in Vietnam, entering senior year September 2026 (specialized math class). Self-taught developer. Planning computer science at TU Dortmund via Studienbrücke (direct entry, no Studienkolleg). B2 German (Goethe B2) by March 2027. Long arc: study → Werkstudent → employment → citizenship → startup.

**What the blog is actually for** (`wiki/entities/blog.md`): a _retrieval mechanism_ (writing is how I retain what I learn) and a _portfolio signal_ (public proof of skills for recruiters). It is not a traffic business. So AI visibility is a means, not the goal:

- AI recommendations attack the "no experience" problem — when a recruiter, or anyone researching junior devs / student blogs, asks an AI, the blog answers for me (`wiki/topics/first-software-internship`: projects over GPA).
- The same machine identity that makes AI cite the blog is what German employers see — adesso SE and Materna are both Dortmund-HQ with Java/cloud focus (`wiki/entities/adesso-se`, `wiki/entities/materna`), and Java is the deep skill I'm building for that market.

**Distinctiveness (the niche).** Almost nobody occupies this position: a Vietnamese high-schooler learning **Java/Spring Boot (deep) + React/TypeScript (broad)** for the **German enterprise market**, documented in public with real research (Netflix's JavaOne trade-off talk, Jobriver listing data, Bitkom's 155k unfilled IT positions). AI answers about "Java in Germany 2026" or "best programming language for jobs in Germany" draw on very few English-language first-hand sources — the blog can become one. That is the honest GEO moat: generic React tutorials cannot claim it.

**Constraints that shape every time estimate in this plan** (`wiki/profile.md`):

- ~7–14 hrs/week of self-study, in 25-min Pomodoro blocks; exam-season floor of 1 Pomodoro/week.
- Sessions must produce concrete output — a blog post _is_ output, which makes writing the cheapest GEO action available (no separate "content marketing" budget).
- Solo learner, ADHD tendencies: every tactic must be build-first and low-ceremony; nothing that requires "maintaining a content calendar".
- Post cadence floor: one post per learning phase (~2–3 months); the weekly newsletter is the short loop (`wiki/entities/blog.md`).

**Current assets (verified live, plus §3):** 3 posts — "Why I'm Learning Java in 2026" (flagship), "I Thought I Knew React. Then I Got Roasted.", "I Built a Mobile App in 3 Weeks…". Newsletter (Buttondown) on homepage + every post. GitHub `adngx`, X `adngx0`, email contact@adngx.com (`src/data/social-links.ts`). Already cross-posting: **dev.to** (`dev.to/adngx`, joined Jul 2026, 2 of 3 posts) and **Hashnode** (`adngx.hashnode.dev`, all 3 posts, ships its own sitemap/RSS).

**Identity gaps the wiki check surfaced (new):**

1. **No LinkedIn** in `social-links.ts` — LinkedIn is one of the sources AI models cite most for people, and the platform German recruiters actually use. Highest-value identity gap. **Known blocker: account verification has failed repeatedly — see M-5 for the fallback plan; no other task depends on it.**
2. **dev.to + Hashnode exist but aren't wired into the entity graph** — `dev.to/adngx` (2 of 3 posts, 1 comment, a few reactions) and `adngx.hashnode.dev` (all 3 posts) are live, but neither is in `social-links.ts`, so they never reach JSON-LD `sameAs` or the llms.txt identity section. dev.to's bio is also stale and contradicts the pivot: skills say "React, Database", no Java/Spring Boot, and it still promises "try to post weekly".
3. **Stale About page** — `src/content/pages/about.md` still says "focused on the fundamentals — Git, database" and "aim to post weekly"; the real position (Java/Spring Boot pivot, Germany) is not what the machine reads. Identity inconsistency is exactly the failure mode the podcast describes.
4. Author JSON-LD is the brand "adngx", not the person (already P1 in §3).
5. **The site's own `robots.txt` declares `Content-Signal: ai-input=no`** — semantically "don't use this content as AI input", the opposite of AI visibility. Verified as the cause of Claude web chat refusing the site: it claimed "no AI-specific signals (no llms.txt, no dev.to)" — both false, both exist and serve 200. Fixed by AI-4 (§6.1).

## 5. Positioning & content strategy

**5.1 The one sentence (podcast core principle: identical phrasing everywhere).** Draft — to be confirmed before mass-copying:

> Anh-Duc Nguyen is a 16-year-old high school student in Vietnam teaching himself Java and Spring Boot in public, on his way to study computer science in Germany.

Places it must appear, word-for-word on the phrases that matter: About page, GitHub profile bio, X bio, LinkedIn headline + about, dev.to bio, Hashnode about, newsletter footer, `llms.txt` identity section, JSON-LD Person `name`/`description`, RSS `<description>`. When sources agree word-for-word, models repeat the sentence; when they disagree, they play safe and name someone else.

**5.2 Content pillars → AI-answerable queries.** Each learning phase ships one post aimed at one query (the report's roadmap already implies this; here are the concrete queries):

| Pillar (wiki)                                                    | Post type                                   | Queries to win                                                                                                                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Java/Spring Boot pivot (active)                                  | Trade-off analysis (Netflix, German market) | "is Java worth learning in 2026", "Java or TypeScript backend 2026", "is Java dead" — flagship post exists, title already query-shaped                                               |
| German tech market (research already done)                       | Data-backed analysis                        | "best programming language for jobs in Germany", "Java jobs in Germany", "Java or Spring Boot for enterprise" — the Java post's market angle, few English first-hand sources; unique |
| Databases / PostgreSQL / Supabase (active ultralearning project) | Build log + schema decisions                | "PostgreSQL vs Supabase", "how to design a database schema"                                                                                                                          |
| Learn in public / ultralearning (methodology)                    | Method post                                 | "how to learn programming in public", "ultralearning software development"                                                                                                           |
| React/Next.js lessons (past)                                     | Retrospective                               | "React Native vs React", "how to learn React properly"                                                                                                                               |
| Productivity / GTD (Ord app story)                               | Story                                       | "open source GTD app", "self-hosted GTD app"                                                                                                                                         |
| System design (simple-first philosophy)                          | Architecture thinking                       | "how to learn system design", "when to use microservices"                                                                                                                            |

**5.3 Hero post treatment.** "Why I'm Learning Java in 2026" is already the strongest GEO asset: query-shaped title, the answer (Netflix trade-off quote) in the first lines, tables, named sources, first-person. Rule for every future post: put the direct answer in the first 30% of the page — 55% of AI Overview citations come from the first 30% (CXL, cited in §3) — implemented as the AI-6 summary card.

**5.4 Language.** Content stays English now (readers and the German market both read English). German-language GEO is a real second move (§6.3) — schedule it after B2, not before.

## 6. The final action plan — work from here

Organized by **who does the work**, spec-style (Goal / Do / Verify) so both an AI agent and you can execute without juggling sections. §3 is the original analysis for context only; §4 (profile) and §5 (positioning) are the _why_. **Already done ✅**: Google Search Console verified + sitemap submitted · Bing Webmaster Tools verified + sitemap submitted · `SITE_URL` set to `https://adngx.com` in Cloudflare Pages.

**Dependencies:** AI-4 first — it unblocks the Claude audit (M-1). M-2 (approve the one sentence) gates AI-1, AI-2, AI-7, M-3. M-5 (LinkedIn) is independent — if verification stays stuck, do everything else and retry monthly.

### 6.1 What the AI can do for you (agent-executable)

An agent runs these in the repo: implement → `npm run test` → `npm run build` → commit → deploy to Cloudflare Pages → verify against the production URL. Nothing here loads new external domains, so the CSP (`public/_headers`) and `headers.test.ts` stay untouched.

**Commit discipline (atomic):** one small, atomic commit per task — each `AI-x` ships as its own commit with a conventional message (`type(scope): description`), containing only that task's changes (no bundling several `AI-x`s together, no unrelated edits, no stray files like `.reasonix/`).

**AI-1 — Make the author a person in structured data** _(highest leverage)_

- Goal: Every page's JSON-LD identifies the author as the person Anh-Duc Nguyen, not the "adngx" brand, and every entity links to the same identity node.
- Do: On the About page define a stable `Person` node with a permanent id (`/about#person`), `name: "Anh-Duc Nguyen"`, description = the approved one sentence (from AI-7), and `sameAs` = GitHub, X, dev.to, Hashnode (+ LinkedIn once it exists). Link the homepage `WebSite`/`Blog` to that Person. On every post, set `author` to that Person **by id** (not a name string), and enrich `BlogPosting` with `publisher`, `mainEntityOfPage`, `inLanguage: "en"`, `keywords` (from post tags), `wordCount`, `timeRequired` (reading time already computed in the codebase).
- Verify: post pages' JSON-LD shows `"author": {"@id": ".../about#person"}`; `seo.test.ts` covers the new fields and the id link; build passes.

**AI-2 — Identity block in llms.txt**

- Goal: `llms.txt` tells machines who you are, not just what the site is.
- Do: Add an identity section to `llms.txt`: the approved one sentence, the author's name, social profile links, and a pointer that `llms-full.txt` contains full post bodies.
- Verify: fetching `/llms.txt` shows the identity block.

**AI-3 — Full post bodies in RSS**

- Goal: the RSS feed carries full post content (the podcast's "full transcripts" principle), not just descriptions.
- Do: render each post's body into the feed's content field.
- Verify: fetching `/rss.xml` shows full post bodies.

**AI-4 — Fix the robots.txt AI signal** _(do first — verified breakage)_

- Goal: stop declaring "don't use this content as AI input".
- Do: change the `Content-Signal` line in `robots.txt` to `ai-train=no, search=yes, ai-input=yes`. Keep the `Sitemap` line. (Why: `ai-input=no` made Claude web chat refuse the site — it claimed "no llms.txt, no dev.to", both false. Evidence in §7.)
- Verify: `curl https://adngx.com/robots.txt` shows `ai-input=yes`; then re-run the Claude audit (M-1) — it should fetch the site normally.

**AI-5 — Freshness tags on posts**

- Goal: post pages expose published/modified timestamps to AI and social crawlers.
- Do: add `article:published_time` and `article:modified_time` OG tags to post pages.
- Verify: post page HTML head contains both; build passes.

**AI-6 — "TL;DR" summary card at the top of every post** _(draft + implement; you review before publish)_

- Goal: every post opens with a summary card containing the direct answer — a discrete, crawlable block inside the first 30% of the page (55% of AI Overview citations come from there).
- Do:
  - Add a per-post frontmatter field (e.g. `summary`) for the card's content.
  - Render a static (non-island) summary card in the post layout, directly under the header (after tags, before the prose) — same shell as the hero card on the front page (`border-border bg-card mx-auto max-w-[var(--container-prose)] rounded-lg border p-6`), but with **normal body text** (`max-w-prose`, no `text-muted-foreground`): the summary is primary content, full-contrast like the hero card, not the muted secondary blurb the newsletter card uses. Small bold label ("TL;DR" / "Short answer") as the card heading.
  - Content: one sentence answering the post's target query + up to 3 one-line takeaways. Keep it short — a long card defeats the purpose.
  - Draft the content for the 3 existing posts (the Java post's opening already answers — tighten it into card form) and tune titles/descriptions to the §5.2 queries.
  - Static HTML, no JS: the newsletter card is an island only because it's interactive; the summary card must be server-rendered so crawlers and AI read it without JS.
- Verify: on each post the card is the first content element after the header and fully visible in the first screen; page renders with JS disabled; build + tests pass.

**AI-7 — One-sentence copy drafted and applied** _(needs M-2 approval first)_

- Goal: the identical one sentence (§5.1) appears in every machine-read place in the repo.
- Do: finalize the sentence with the user (M-2), then apply it to: the About page (rewrite the stale copy — it still says "Git, database"), the llms.txt identity block (AI-2), the JSON-LD description (AI-1), the RSS feed description. Prepare the exact same text (a copy-paste block) for the profiles you update manually in M-3.
- Verify: grep for the sentence in the repo — present in about page, llms.txt, RSS; About page no longer mentions the old fundamentals.

**AI-8 — Crawler-access verification report**

- Goal: prove AI crawlers can read the site, and catch any Cloudflare-side block.
- Do: curl `robots.txt`, `llms.txt`, `sitemap-index.xml`, and a post page with user agents `ClaudeBot`, `anthropic-ai`, `GPTBot`, `PerplexityBot`, `Google-Extended`; record status codes.
- Verify: all 200 (expected today). If any fail, report which UA/path so M-4 can be targeted precisely.

**AI-9 — Test coverage for all of the above**

- Goal: the identity/AI-signal changes are protected by the existing test gate.
- Do: extend `seo.test.ts` for the new JSON-LD fields, the `ai-input=yes` line, the llms.txt identity block, and that every post page renders the summary card (AI-6) before the prose.
- Verify: `npm run test` passes.

**AI-10 — Tracked-query list** _(input for M-6)_

- Goal: a ready-to-use baseline list for the tracker.
- Do: derive 10–15 queries from §5.2 — mix of topic queries ("is Java worth learning in 2026", "best programming language for jobs in Germany", "Spring Boot vs NestJS", "Java lernen 2026") and identity queries (your name, adngx.com, your post titles).
- Verify: list written to a file/note the tracker can use.

**Watch, no action:** `ai.txt` — adoption is still mixed; revisit only if it wins.

### 6.2 What only you can do (manual)

**M-1 — Run the Claude audit** (now, 1 Pomodoro; re-run after AI-4 ships)

- Do: paste `https://adngx.com` into Claude web chat: "How visible is this site in AI search, and why isn't it showing up?"
- Treat every claim as a hypothesis — the first audit said "no llms.txt, no dev.to" (both false; cause was `ai-input=no`, now fixed in AI-4). Verify claims before acting.

**M-2 — Approve the one sentence** (1 Pomodoro; gate for AI-1/AI-2/AI-7/M-3)

- Do: confirm or edit the draft in §5.1. Keep it true for the next 12 months; don't overthink it.

**M-3 — Update profile bios** (after M-2, ~2 Pomodoros)

- Do: paste the approved sentence into: GitHub profile bio, X bio, newsletter (Buttondown) footer. On dev.to: replace the stale bio/skills ("React, Database", "try to post weekly") with the sentence + Java/Spring Boot, and post the missing GTD article (dev.to has 2 of 3 posts).
- Verify: the sentence is word-for-word identical everywhere.

**M-4 — Cloudflare bot settings** (after AI-8, ~1 Pomodoro)

- Do: Cloudflare dashboard → Security → Bots: make sure "AI Scraper Protection", "Bot Fight Mode", and WAF rules don't block known AI crawlers; if needed add allow rules for `anthropic-ai`, `ClaudeBot`, `Claude-Web`, `GPTBot`, `PerplexityBot`, `Google-Extended`.
- Verify: re-run AI-8 — all 200.

**M-5 — LinkedIn — known blocker: account verification** (after M-2; independent — don't let it block the plan)

- Do: create the profile and get the account verified. You've repeatedly hit verification failures — try a different path each attempt: phone vs email code, a different browser/device/network, the LinkedIn app instead of the web, or a fresh attempt after a few days. Once it works, set headline + about to the approved sentence (AI-7 provides the text).
- Fallback: if it stays stuck, proceed with everything else and retry monthly. LinkedIn matters, but no other task depends on it.

**M-6 — Tracker** (free-first, 1 Pomodoro setup + 20 min weekly)

- Do: set up Aperture (open-source, self-hosted) or OpenLens free tier — budget is zero; Peec AI only if a paid option becomes affordable. Load the AI-10 query list, baseline now.
- Verify: one weekly read — check whether your name/site appears for the tracked queries; judge trends over weeks, not days (Google took ~4 weeks).

**M-7 — Earned media, tied to the post cadence** (~82% of AI citations are earned media; also the precondition for Wikidata)

- Do: after each post — cross-post to dev.to + Hashnode (both already set up); share on HN (Show HN only when a project ships), r/learnjava, r/learnprogramming, r/cscareerquestionsEU, and r/germany for German-market posts; pitch dev newsletters (Java Weekly, TLDR, Bytes, This Week in Spring); tag the creators whose content the post builds on (swyx's PUWTPD: consume → create → tag) — swyx, Amigoscode, Bro Code, Telusko are already in the wiki.
- Target one "listicle-class" mention (student developer blogs, learn-in-public, Java learning, Java-in-Germany market analysis) — one such mention moves broad queries and unlocks Wikidata (M-8).

**M-8 — Wikidata — parked until earned media**

- Do: nothing now. When the first earned-media mention lands (M-7), create the entry: `instance of: human`; occupation software developer / student / writer; educated at TU Dortmund (once enrolled); official website adngx.com; GitHub, X, LinkedIn. Notability policy: without coverage the entry gets deleted, so wait.

### 6.3 German-language phase (scheduled, not now)

Content stays English until after Goethe B2 (Mar 2027) — readers and the German market both read English. Then: German queries ("Java lernen 2026", "Spring Boot lernen", "Informatik Jobs Deutschland") have far less competition. **You** (after B2): write German summaries/descriptions. **Agent**: add `hreflang`-ready structure and translate hero posts one at a time from your summaries — keeping the one-sentence identity in German. (Multilingual GEO evidence in §7.)

### 6.4 Roadmap

| When                        | What                                                                          | Who         |
| --------------------------- | ----------------------------------------------------------------------------- | ----------- |
| Now                         | AI-4 (robots.txt fix) → deploy → re-run M-1 audit                             | agent + you |
| Week 1                      | AI-1, AI-2, AI-3, AI-5, AI-9 (one session)                                    | agent       |
| Week 1                      | M-2 approve the one sentence                                                  | you         |
| Week 1–2                    | AI-7 (About rewrite + one sentence everywhere), AI-6 (summary cards) → deploy | agent       |
| Week 1–2                    | M-3 bios (GitHub, X, newsletter, dev.to + missing GTD post)                   | you         |
| Week 2                      | AI-8 crawler report → M-4 Cloudflare settings → re-run AI-8                   | agent + you |
| Week 2                      | AI-10 query list → M-6 tracker baseline                                       | agent + you |
| Week 2–3                    | M-5 LinkedIn (verification attempt; retry monthly if stuck)                   | you         |
| Ongoing                     | M-7 earned media per post; weekly tracker read                                | you         |
| After Goethe B2 (~Mar 2027) | §6.3 German phase                                                             | you + agent |
| Exam season                 | Floor: 1 Pomodoro/week — newsletter + tracker read only                       | you         |

### 6.5 How this differs from the original report (§3) — and why

| §3 said                                         | This plan                                                                                                                                           | Why                                                                                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Create Wikidata entry now ("a few hours")       | Parked until first earned-media mention (M-8)                                                                                                       | Wikidata notability policy requires significant coverage; a student with no press coverage gets rejected/deleted                           |
| llms.txt as a signal                            | Keep as-is, spend zero more time                                                                                                                    | Real crawler logs (Buytaert, Jul 2026): AI crawlers almost never request `llms.txt`/Markdown                                               |
| GSC / Bing / earned media as separate options   | One system: GSC + Bing + earned media                                                                                                               | Engines cite differently: Perplexity = recency + mentions; AI Overviews = E-E-A-T; Copilot = Bing authority                                |
| GSC + Bing WMT + SITE_URL ops note as tasks     | ✅ Already done — removed from the plan                                                                                                             | Done before this refinement                                                                                                                |
| LinkedIn create + verify                        | M-5, flagged as a persistent verification blocker with a fallback                                                                                   | You've repeatedly failed account verification; the plan must not depend on it                                                              |
| Vietnamese dev community in earned media        | Dropped                                                                                                                                             | You said skip it                                                                                                                           |
| —                                               | LinkedIn created; dev.to + Hashnode wired into the identity (they already existed, but weren't in `social-links.ts`/`sameAs`; dev.to bio was stale) | All are top AI-cited surfaces for people; LinkedIn is also what German recruiters use                                                      |
| —                                               | About page rewrite (AI-7)                                                                                                                           | It still says "Git, database" — identity inconsistency is the failure mode the podcast describes                                           |
| `ai-input=no` only flagged for "review" (§3 2b) | Changed to `ai-input=yes` with verified evidence it was breaking things                                                                             | Claude web chat refused the site and claimed "no llms.txt / no dev.to" — both false; `ai-input=no` is semantically "don't use as AI input" |
| —                                               | German-language phase post-B2 (§6.3)                                                                                                                | Multilingual GEO: content must exist in the query language to be retrieved                                                                 |
| Coding / non-coding split                       | Split by actor: AI-executable (6.1) vs manual (6.2), spec-style                                                                                     | Agents can now execute the repo tasks end-to-end without a human in the loop                                                               |

## 7. Additional research evidence (July–Aug 2026)

- **Wikidata notability gate**: data outside Wikidata's notability guidelines "won't be accepted"; people need significant coverage in reliable sources; Wikibase Cloud is the listed alternative for non-notable data (https://www.wikidata.org/wiki/Wikidata:Notability).
- **llms.txt crawler reality**: Buytaert's Cloudflare log analysis — AI crawlers fetched ~1,241 pages per citation, rarely request Markdown, never use content negotiation or llms.txt (https://dri.es/markdown-llms-txt-and-ai-crawlers).
- **Engine-specific citation factors**: Perplexity = recency + external mentions; Google AI Overviews = SEO authority (E-E-A-T); Copilot = Bing authority + technical structure (https://www.trygeometrics.com/blog/why-chatgpt-gemini-perplexity-cite-differently-9-models).
- **Multilingual GEO**: content must exist in the query language to be retrieved; multilingual signals completeness/credibility to AI (https://www.weglot.com/multilingual-geo-hub; https://dev.to/mio_storksoft/geo-for-multilingual-content-how-to-appear-in-ai-search-answers-across-languages-cmg).
- **Content-Signals semantics (verified cause of the Claude fetch failure)**: `ai-input=no` is the opt-out for sites that don't want to be used as AI input (e.g. Q&A/docs cannibalization); the AI-visibility config is `ai-input=yes` (https://contentsignals.org/; https://www.searchengineworld.com/cloudflare-enters-the-robots-txt-fray-with-a-content-signals-policy-for-ai-bots). Cloudflare auto-applies Content-Signals to managed robots.txt on ~3.8M domains (https://arstechnica.com/ai/2025/10/inside-the-web-infrastructure-revolt-over-googles-ai-overviews).
- **Claude web fetch behavior**: Claude's web fetch tool reads specific URLs (https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool); it has known flakiness against bot-protected or headless-blocked endpoints (https://github.com/anthropics/claude-code/issues/39896). Site-side verification (curl with crawler UAs) is the reliable way to check access.

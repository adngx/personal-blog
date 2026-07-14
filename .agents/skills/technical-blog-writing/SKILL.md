---
name: technical-blog-writing
description: Guide for drafting, structuring, editing, and preparing technical blog posts for publication. Covers finding real substance before writing, quick research and fact-verification, headline and hook writing, body structure and formatting for skimmable technical content, code-snippet handling, image/packaging choices, and a distribution checklist. Use this skill whenever the user asks for help writing, outlining, drafting, editing, or giving feedback on a blog post, article, dev-log entry, or technical write-up, or says things like "help me write a post about X," "review my draft," "give me a headline for this," "how should I structure this article," or "help me get this ready to publish" — even if they don't use the word "skill" or "blog" explicitly.
---

# Technical Blog Writing

Most technical blog posts don't fail because the writer can't write. They fail for one of three separate reasons, and it's worth diagnosing which one before reaching for fixes:

1. **No substance** — the post doesn't tell an experienced reader anything they couldn't get from the official docs in five minutes.
2. **Bad packaging** — the substance is real, but the post is technically accurate and painful to actually read.
3. **No distribution** — the post is good and well-packaged, but nobody besides the author's mom ever saw it.

These are independent problems with independent fixes. A better headline can't rescue a post with no substance, and more substance can't rescue a post nobody found. Work through them in order below.

## Step 0: Clarify before drafting from scratch

If the user hasn't already said, get a quick read on three things before writing a full draft — but don't block on this if there's enough context already; infer a sensible default and state the assumption instead of stalling:

- **The one thing.** What's the single thing a reader should walk away knowing that they couldn't easily get elsewhere? If the user can't answer this yet, that's the actual first problem to solve (see Step 1), not a missing formality.
- **The reader.** Complete beginner, "I've done the basics but not confidently," or expert? This changes vocabulary, pacing, and what needs explaining vs. what can be assumed.
- **The venue.** Their own blog/audience-building, a company blog, or a specific publication with its own norms? This affects tone, length, and how much self-promotion is appropriate.

## Step 1: Find the substance before writing a word

No amount of editing fixes a post with nothing new to say. Before drafting, pressure-test the angle: *why would someone bookmark or share this instead of one of the ten similar posts already ranking for this topic?*

Three reliable sources of real substance:

- **Depth on something narrow beats breadth on something common.** "Getting started with X" competes against thousands of near-identical posts. A specific bug, an unusual combination of tools, or a real incident has almost no competition.
- **The underserved middle.** Technical writing clusters at two extremes — complete-beginner tutorials and "I've done this for a decade" expert takes. The middle ground ("I understand the basics, here's what changes when it gets real") is thin. If a draft naturally lands there, lean into it instead of flattening it to fit a beginner template.
- **A genuine, specific experience.** The strongest technical posts usually come from something the writer actually did — a bug they chased for three hours, a decision they'd make differently now, a benchmark they ran themselves — rather than a summary of documentation. If a draft reads like a rehash of the docs, ask what part of it the person actually lived through, and pull that forward as the spine of the piece.

If the user has a topic but no angle yet, ask what surprised them, what took longer than expected, or what they'd tell a friend doing the same thing tomorrow. That's usually the real post.

## Step 2: Research and verify

- Never state a technical claim, benchmark number, version-specific behavior, or "as of [date]" fact without verifying it. For code claims, actually run the snippet if you have the tools to — don't write code from memory and assume it works.
- If a current-tool-behavior or "best practice" claim could be stale, verify it (web search if available) rather than trusting training data — APIs and conventions change fast enough that a best practice from even a year ago can be wrong.
- Flag speculative or unverified claims to the user rather than quietly asserting them as fact.
- Credit sources for anything drawn from someone else's writing, and never reproduce large blocks of someone else's text or code verbatim — paraphrase, link out, and keep any direct quoting short and clearly attributed.

## Step 3: Structure before prose

Draft an outline of subheadings before writing full paragraphs under each one. This makes the piece skimmable by construction instead of as an afterthought edit pass.

Default shape (adapt freely, don't force it onto a piece that wants something else):

```
Headline
Hook / intro
Body (2-5 subsections, each answering one sub-question)
Conclusion
```

## Step 4: Write several headline candidates, not one

Readers decide whether to open a piece almost entirely from the headline — a great body under a weak headline mostly goes unread. Generate at least three variants in different registers, then let the user pick (or pick the most accurate one that also creates real curiosity):

- **Literal/descriptive** — "What changed in the Postgres 17 query planner"
- **Benefit-led** — "How I cut this query's runtime by 80% with one index"
- **Curiosity-led** — used carefully; for technical writing, accuracy matters more than click-through, so never promise something the piece doesn't actually deliver.

## Step 5: Write a hook, not a preamble

Open with something concrete that shows why the topic matters, then briefly forecast what the piece covers so a skimming reader can decide whether to keep going. Cut any throat-clearing ("In this post, I'm going to talk about...") — get to the actual hook in the first sentence.

## Step 6: Body — formatting that keeps technical readers reading

- **Subheadings roughly every 150–300 words**, each specific enough to make sense read in isolation (a reader scanning the table of contents should be able to tell what's in each section).
- **Short paragraphs, one idea each.** A wall of text loses readers on any screen, and especially on mobile.
- **Code blocks always tagged with a language** for syntax highlighting, and kept runnable/self-contained where possible rather than fragments. Show the output when it clarifies the point, not just the code.
- **Images and diagrams earn their place** when they do something words can't — architecture, before/after, a results chart — not decoratively. For a long technical piece, roughly one visual every few hundred words is a reasonable default; more if the topic is inherently visual (UI work, data).
- **Link to primary sources** (the actual docs, the GitHub issue, the paper) instead of paraphrasing secondhand — more credible, and more useful to the reader who wants to go deeper.
- **Simplify the language, not the idea.** Short sentences and plain words don't mean cutting the substance — the goal is to make a real idea easy to follow, not to dumb it down.

## Step 7: Conclusion that earns engagement

- Summarize the one thing you want to stick — don't just restate the intro in past tense.
- If the goal is discussion or audience-building, close with a genuine open question inviting readers to share their own version of the experience — only if it's a real question, not a rhetorical placeholder.
- A plain, clearly labeled conclusion heading ("Wrapping up," "Conclusion") is fine and often useful — plenty of readers scroll to the end first to decide whether the full piece is worth reading, so it should stand on its own.

## Step 8: Self-edit checklist before calling a draft done

- [ ] Every code snippet has been tested/verified, not just written from memory
- [ ] The headline matches what the piece actually delivers — no false promise
- [ ] No paragraph runs more than ~6 lines
- [ ] Every non-obvious claim has a link, a citation, or is clearly marked as the author's own tested result or opinion
- [ ] The intro and conclusion agree with each other when read back to back
- [ ] Any sentence you can't justify keeping gets cut

## Step 9: Packaging checklist before publishing

- **Meta description / link-preview text** — one or two sentences that work standalone if all someone ever sees is the link card.
- **Alt text on every image** — accessibility, and it's what search indexes.
- **A lead image**, if the platform displays one.
- **Platform choice, made deliberately, not by default:** a personal blog/domain builds long-term, compounding ownership; a larger platform or publication trades some ownership for a bigger built-in audience on day one. Publishing on your own site with the canonical link, then cross-posting elsewhere pointing back to it, is a reasonable way to get both.

## Step 10: Distribution — the step most technical writers skip

Publishing and doing nothing else is the single most common reason a genuinely good post gets no readers. Distribution regularly takes as much real effort as writing did, and skipping it is the most common way good work goes unread. If the user wants help here:

- Draft a short, genuine note to people or projects mentioned or linked in the piece, letting them know and inviting a share if they found it useful — only to people actually relevant to the content, never a form-letter blast.
- Draft a short version tailored to a specific community's norms (a particular subreddit, a Discord, a relevant Slack) rather than reusing the same blurb everywhere.
- Suggest 2–3 realistic, topic-relevant venues instead of a generic list — a language's subreddit, a newsletter that accepts guest links, a forum where this specific problem gets discussed.
- Treat a single submission to a high-traffic aggregator (Hacker News, Reddit's front page, etc.) as a lottery ticket worth buying, not a channel to rely on exclusively.

## A note on tone

Match the user's actual voice from any past writing they share, rather than defaulting to a generic "content marketing" voice. Technical readers notice quickly when a post is padded to hit a word count or shaped to satisfy an SEO checklist instead of written to explain something real — in this genre, substance and honesty read as credibility more reliably than polish does.

---

## Quick reference

| Stage | One-line test |
|---|---|
| Substance | Would an experienced reader learn something they can't get from the docs in 5 minutes? |
| Headline | Does it promise exactly what the piece delivers — no more, no less? |
| Body | Could someone skim just the subheadings and know what's in each section? |
| Code | Has it actually been run, not just remembered? |
| Packaging | Does the link-preview text work standalone with zero other context? |
| Distribution | Does the plan name specific people/communities, not "post it and see"? |

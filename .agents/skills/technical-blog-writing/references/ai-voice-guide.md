# AI Voice Guide — Writing That Reads as Human

Detectors (and human readers) flag AI-generated writing based on patterns in structure, vocabulary, punctuation, and tone. This guide covers what to watch for and how to fix it.

For the wordlist of overused verbs, adjectives, transitions, and filler words, see `seo-audit/references/ai-writing-detection.md` — no need to duplicate that here.

---

## Sentence Burstiness

AI produces sentences of uniform length and complexity. Humans alternate between long, complex sentences and short punchy ones. This variation is called "burstiness."

- Deliberately vary sentence length — follow a long compound sentence with a two-word fragment.
- Mix simple, compound, and complex structures. Don't let every sentence follow the same Subject-Verb-Object pattern.
- Short standalone sentences land harder for emphasis: "It worked." / "I was wrong." / "Three weeks, gone."

**Test:** Highlight every sentence in a paragraph. If they're all roughly the same length, rewrite two of them — one shorter, one longer.

---

## Punctuation Patterns

### Em Dashes — The Primary Tell

Human writers use 1–2 em dashes per 1,000 words. AI uses 8–15. The problem isn't that em dashes exist; it's how they're used:

- AI appends parallel clauses: "X does A — and it also does B"
- AI adds hedges: "This is a great approach — though it has limitations"
- AI creates dramatic reveals: "The answer is simple — do nothing"
- Paired em dashes are also a tell: "This technique — while counterintuitive — works"

**Fix:** Replace with period + new sentence, commas, colons, parentheses, or just delete. Break the sentence structure instead of just swapping punctuation.

| Instead of | Use |
|---|---|
| X — which also does Y | X. It also does Y. |
| X — rebase, merge conflicts, workflows | X: rebase, merge conflicts, workflows |
| GTD — Getting Things Done | GTD (Getting Things Done) |
| The results — which were surprising — showed | The results, which were surprising, showed |

**Rule of thumb:** If you're averaging more than 5–6 em dashes in a post, audit each one. Is it doing real work, or is it a crutch for sentence variety?

### Semicolon-Before-"However"

AI inserts semicolons before "however" frequently, which is stylistically unusual in human writing. When told to stop using em dashes, AI often swaps them for semicolons or colons connecting independent clauses.

**Fix:** Vary connectors. Use periods, commas, or write separate sentences.

### Serial Comma Rigidity

AI never forgets the Oxford comma, making text feel robotic when every list follows the exact same pattern.

**Fix:** Drop the Oxford comma sometimes. It's a choice, not a rule.

### Colon Overuse

AI uses colon-followed-by-list on every other paragraph. Humans vary their list introduction methods.

**Fix:** Introduce lists differently — with commas, dashes, or prose. Mix "X, Y, and Z" with narrative introductions.

---

## Ta-Da Phrases

AI creates artificial conflict or drama with "ta-da" phrases. These feel energetic in isolation but become a pattern detectors recognize:

- "But here's the truth..."
- "But here's what nobody's saying..."
- "But here's the thing..."
- "Crucially..."
- "The answer might surprise you..."

**Fix:** Replace with a plain "But" or just state the point directly. Let the content create the tension, not the phrasing.

---

## Tone and Voice

### Formal Hedging

AI hedges constantly to sound balanced. Cut these:

- "It's worth noting that..." → just say it
- "It's important to note that..." → just say it
- "That said..." → "But" or start the sentence
- "With that in mind..." → delete, start the next thought

### Overly Positive / Submissive Tone

AI writing tends to be uniformly positive and agreeable. Humans include disagreements, creative risk-taking, and bold opinions. Don't soften every statement into acceptability.

### Too-Formal Academic Tone

AI defaults to academic register without personality, energy, or the casual flow of actual human conversation. Match how you'd explain the same thing to a colleague over coffee.

---

## Content Texture

AI-written text often lacks:

- **Specific facts** — real numbers, real tool names, real error messages
- **Personal stories** — what actually happened, not what generally happens
- **Humor that depends on shared cultural context** — references that require lived experience
- **Emotional impact from real experience** — frustration, surprise, the moment something clicked
- **Minor errors, intentional grammar breaks, or stylistic quirks** — contractions, fragments, your natural way of explaining things

**The substance being genuinely yours is half the battle.** These texture items just make sure the presentation doesn't trigger detectors or feel generic.

---

## Self-Check

1. **Read it aloud.** If it feels choppy or overly emphasized, trim. Machines still lose the read-aloud test.
2. **Count em dashes.** More than 5–6 in a post? Audit each one.
3. **Check sentence length variation.** Highlight sentences — if they're all similar length, rewrite.
4. **Scan for ta-da phrases.** Strip "but here's the thing," "crucially," etc.
5. **Check punctuation consistency.** If you're using 2 em dashes in paragraph 1 and 0 in paragraph 2, make sure that's intentional.
6. **Ask: would I say this in conversation?** If a phrase sounds unnatural spoken, revise it.

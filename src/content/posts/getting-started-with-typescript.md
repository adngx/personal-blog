---
title: "Getting Started with TypeScript"
description: "Why I switched from JavaScript to TypeScript and how strict typing caught bugs I would have shipped to production."
pubDate: 2026-07-13
tags: ["typescript", "beginners"]
---

TypeScript has been on my radar for a while, but I kept putting it off. "JavaScript works fine," I told myself. Then I shipped a bug that cost me an entire weekend of debugging.

## The bug that changed my mind

I was building a small CLI tool for a school project. The function expected a number, but somewhere upstream I was passing a string. JavaScript happily concatenated them instead of doing math. No error, no warning, just wrong output.

```typescript
// This is what I had
function calculateGrade(score) {
  return score * 1.1;
}

// This is what I passed
const input = "85"; // from readline
calculateGrade(input); // "851.1" instead of 93.5
```

TypeScript would have caught this immediately.

## What I learned

Strict mode is your friend. Yes, it complains a lot at first. But every complaint is a bug you did not ship. The `strict: true` flag in `tsconfig.json` is worth the initial friction.

## Resources that helped

- The official TypeScript handbook
- Matt Pocock's Total TypeScript series
- Building real projects (not just tutorials)

The switch took about a week of productive time. The payoff has been every bug I did not ship since.

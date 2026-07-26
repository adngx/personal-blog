# 0013. Newsletter signup

**Date**: 2026-07-26
**Status**: In Progress

## Summary

Add a newsletter signup form to the blog using Buttondown as the subscriber platform. A Cloudflare Worker proxies subscription requests to Buttondown's API, keeping the API key server side and the Astro site static. The form appears on the homepage and on every blog post. Buttondown handles confirmation emails, double opt in, and unsubscribe. This is the thinnest usable version: a form, a proxy, and a success message.

## Context

The blog has no way for readers to subscribe to a newsletter. The scope lists this as Release 3, item 12. The original scope mentioned Resend, but Buttondown is a better fit because it manages the full subscriber lifecycle (confirmation, unsubscribe, sending) without custom backend code. Resend is a raw email API that would require building all of that ourselves.

The site is a static Astro build deployed on Cloudflare Pages. There is no server side code. To call Buttondown's API without exposing the API key in client JavaScript, a server side proxy is needed. A Cloudflare Worker on a custom subdomain keeps the Astro build static and the API key secure.

Buttondown's free plan allows creating subscribers via the API (since December 2023). The default rate limit is 100 requests per day, which grows with newsletter reputation. Double opt in is on by default: new subscribers receive a confirmation email and stay unactivated until they confirm. This double opt in is also the primary spam protection: even if bots submit garbage emails, none will confirm and become active subscribers.

## Requirements

**User stories**:

- As a reader, I want to subscribe to the blog's newsletter so I receive new posts by email.
- As the blog owner, I want to collect email subscribers without managing a database or sending confirmation emails myself.

**Acceptance criteria**:

- **AC-1**: Newsletter signup form renders on the homepage below the hero section.
- **AC-2**: Newsletter signup form renders on every blog post page above the comments section.
- **AC-3**: Form displays as a card with a heading, short description, email input, and submit button.
- **AC-4**: Submitting a valid email sends a POST request to the Worker endpoint with the email address.
- **AC-5**: Successful submission replaces the form with an inline success message: "Check your email and click the confirmation link to complete your subscription." The message makes clear that the subscription is not active until confirmed.
- **AC-6**: If the email is already subscribed, the form shows the same success message (treats duplicate as success).
- **AC-7**: Client side validation rejects invalid email formats before making the API call.
- **AC-8**: Network or API errors display an inline error message below the form.
- **AC-9**: The submit button shows a loading state while the API call is in progress.
- **AC-10**: The form meets WCAG AA accessibility: labeled input, keyboard navigable, focus management on state change.
- **AC-11**: The Cloudflare Worker proxies requests to Buttondown's POST /v1/subscribers endpoint with the email address, a "blog" tag, and the client's IP address (read from the CF-Connecting-IP header).
- **AC-12**: The Worker applies rate limiting of 5 requests per IP per minute.
- **AC-13**: The Worker validates email format and returns 400 for invalid input.
- **AC-14**: The Worker returns appropriate status codes: 201 for success, 400 for invalid input, 429 for rate limit, 500 for upstream errors.
- **AC-15**: CSP headers in public/_headers allowlist the Worker subdomain for connect-src.
- **AC-16**: The Worker sets CORS headers to allow requests from the blog domain.
- **AC-17**: The form includes a hidden honeypot field. If the field has a value when submitted, the Worker silently rejects the request (returns 200 but does not create a subscriber).

## Options considered

### Option 1: Cloudflare Worker proxy

Deploy a standalone Cloudflare Worker on a custom subdomain (e.g., api.adngx.com). The Worker receives the email, validates it, checks rate limits, and calls Buttondown's API. The Astro site stays static.

**Pros**:

- Astro build stays static, no adapter change needed
- API key stored as a Worker secret, never in client code
- Worker deploys independently, easy to test and iterate
- Cloudflare Workers are free for 100k requests/day

**Cons**:

- Separate deployment from the Astro site
- Requires DNS configuration for the subdomain
- One more piece of infrastructure to maintain

### Option 2: Astro server endpoint

Switch Astro to hybrid or server rendering mode and add an API endpoint. Requires @astrojs/cloudflare adapter.

**Pros**:

- Everything in one project and deployment
- No separate DNS or Worker setup

**Cons**:

- Changes the Astro build from static to server rendered
- Adds complexity to the build configuration
- A single API endpoint does not justify changing the rendering model

### Option 3: Client side only

Call Buttondown's API directly from the browser with a scoped, subscriber-only API key.

**Pros**:

- Simplest implementation, no server code at all

**Cons**:

- Exposes the API key in client JavaScript
- Even scoped keys can be abused if exposed
- Cannot add server side rate limiting

## Decision

**Chosen option**: Option 1: Cloudflare Worker proxy

A standalone Cloudflare Worker is the right choice. The site is static Astro on Cloudflare Pages. Switching to server rendering for one endpoint is disproportionate. A Worker keeps the architecture clean: static site stays static, server logic lives in a Worker. The API key stays server side. Cloudflare Workers have generous free limits and deploy in seconds on the same platform.

**Implementation skills**: none (no community skills needed; uses standard Cloudflare Worker patterns and Buttondown's REST API)

## Rationale

The core constraint is that the Astro site must remain static. Buttondown's API requires an API key, which cannot be in client code. A Worker proxy solves both problems with minimal infrastructure. The Astro server endpoint option would require changing the rendering model, which is a larger architectural change than this feature justifies. The client only option is not viable because it exposes the API key.

Buttondown over Resend because Buttondown manages the full subscriber lifecycle. With Resend, we would need to build confirmation emails, subscriber storage, unsubscribe handling, and sending logic. Buttondown does all of this through its API and web interface. The free plan's API subscriber creation (since December 2023) removes the last barrier.

Bot protection is deliberately lightweight: a honeypot field to stop dumb bots, rate limiting to stop rapid abuse, ip_address forwarding to help Buttondown's spam filter, and double opt in as the real safety net. Turnstile was considered but is overkill for a personal blog where double opt in already prevents the only real harm (fake active subscribers).

## Feature design

**Data model sketch**: No custom data model. Subscribers are stored in Buttondown. The Worker is stateless. The only persistent state is a simple in memory counter for rate limiting (resets on Worker restart, which is acceptable for spam prevention).

**State transitions**: Not applicable. Subscriber lifecycle is managed by Buttondown (unactivated after creation, activated after double opt in confirmation, can unsubscribe).

**API surface**:

| Endpoint       | Method | Key inputs                                                    | Key outputs     | Auth                                 | Key errors                                            |
| -------------- | ------ | ------------------------------------------------------------- | --------------- | ------------------------------------ | ----------------------------------------------------- |
| /api/subscribe | POST   | email_address: string (req), hp_field: string (must be empty) | message: string | none (public, honeypot + rate limit) | 400 invalid email, 429 rate limit, 500 upstream error |

**Key invariants**:

- The Buttondown API key must never be exposed to the client.
- The Worker must validate email format before forwarding to Buttondown.
- Rate limiting must be per IP, not global.
- Duplicate subscriptions must be treated as success, not error.
- The honeypot field must be hidden from humans but visible to bots.

**Security model**:

- The Worker is a public endpoint protected by honeypot field and rate limiting.
- The Buttondown API key is stored as a Worker secret.
- Rate limiting prevents abuse (5 requests per IP per minute).
- The client's IP address is forwarded to Buttondown for spam validation.
- Double opt in prevents fake active subscriptions.
- CORS is restricted to the blog domain only.
- CSP headers must allowlist the Worker subdomain.

**Configuration required**:

- `BUTTONDOWN_API_KEY`: Buttondown API key (stored as Cloudflare Worker secret)
- Worker environment variable `ALLOWED_ORIGIN`: the blog's origin URL for CORS

**Critical test scenarios**:

- Happy path: submit a valid email with empty honeypot, receive 201, form shows success message, verifies AC-4, AC-5
- Duplicate: submit an email that already exists in Buttondown, form shows success message, verifies AC-6
- Invalid email: submit "notanemail", form shows inline validation error, no API call made, verifies AC-7
- Bot: submit with honeypot field filled, Worker returns 200 but does not create subscriber, verifies AC-17
- Rate limit: submit 6 requests in 1 minute from same IP, 6th request returns 429, verifies AC-8, AC-12
- Network failure: Worker cannot reach Buttondown, form shows inline error, verifies AC-8

## Build plan

1. **Create the Cloudflare Worker** with POST /api/subscribe endpoint, email validation, honeypot check, rate limiting, Buttondown API integration with ip_address forwarding, and CORS headers. Satisfies AC-11, AC-12, AC-13, AC-14, AC-16, AC-17
2. **Create the newsletter signup React component** at src/components/newsletter/newsletter-signup.tsx as a self contained React island. Card layout with heading, description, email input, hidden honeypot field, submit button. Client side validation, loading state, success state, error state. Satisfies AC-3, AC-4, AC-5, AC-6, AC-7, AC-8, AC-9, AC-10
3. **Integrate the component into the homepage** below the hero section. Satisfies AC-1
4. **Integrate the component into the blog post page** above the comments section. Satisfies AC-2
5. **Update CSP headers** in public/_headers to allowlist the Worker subdomain for connect-src. Update REQUIRED_CSP_EXCEPTIONS in src/**tests**/headers.test.ts. Satisfies AC-15
6. **Write tests** for the component (validation, state transitions, accessibility) and the Worker (email validation, honeypot, rate limiting, error handling)

## Consequences

**Positive**:

- Readers can subscribe to the blog's newsletter directly from the site.
- Buttondown handles all subscriber lifecycle management (confirmation, unsubscribe, sending).
- The Astro site stays static. No server rendering, no adapter changes.
- The Worker is independently deployable and testable.
- Minimal infrastructure: one Worker, one secret, one DNS record.

**Negative / tradeoffs**:

- Buttondown is a third party dependency. If it goes down, subscriptions fail.
- The Worker subdomain requires DNS configuration and a new CSP entry.
- Rate limiting uses in memory state, which resets on Worker restart. This is acceptable for spam prevention but not for strict rate limiting.
- The free plan limits API subscriber creation to 100 requests/day (grows with reputation).

**Neutral**:

- Buttondown's double opt in means subscribers are not immediately active. This is standard for newsletters and protects sender reputation.
- The Worker is a new piece of infrastructure separate from the Astro deployment.

## Follow-up

- [ ] Create a Buttondown account and generate an API key with subscriber_access write permission.
- [ ] Configure DNS for the Worker subdomain (e.g., api.adngx.com) in Cloudflare.
- [ ] Deploy the Worker and set the BUTTONDOWN_API_KEY secret.
- [ ] Consider adding the Buttondown archive page link to the site for past newsletter issues (future enhancement).

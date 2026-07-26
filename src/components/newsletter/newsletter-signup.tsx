import { useState, useRef, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WORKER_URL = import.meta.env.DEV
  ? "http://localhost:8787/api/subscribe"
  : "https://newsletter.adngx.com/api/subscribe";

type FormState = "idle" | "loading" | "success" | "error";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function NewsletterSignup() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const email = emailRef.current?.value.trim() ?? "";

    if (!isValidEmail(email)) {
      setState("error");
      setErrorMessage("Please enter a valid email address.");
      emailRef.current?.focus();
      return;
    }

    if (honeypotRef.current?.value) {
      setState("success");
      return;
    }

    setState("loading");

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: email }),
      });

      if (response.ok) {
        setState("success");
      } else if (response.status === 429) {
        setState("error");
        setErrorMessage("Too many attempts. Please try again later.");
      } else {
        setState("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  if (state === "success") {
    return (
      <section
        aria-labelledby="newsletter-heading"
        className="border-border bg-card mx-auto max-w-[var(--container-prose)] rounded-lg border p-6"
      >
        <h2 id="newsletter-heading" className="text-2xl font-bold">
          Newsletter
        </h2>
        <p className="text-muted-foreground mt-2">
          Check your email and click the confirmation link to complete your
          subscription.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-border bg-card mx-auto max-w-[var(--container-prose)] rounded-lg border p-6"
    >
      <h2 id="newsletter-heading" className="text-2xl font-bold">
        Newsletter
      </h2>
      <p className="text-muted-foreground mt-2">
        Early access to new posts, plus unfiltered notes and experiences.
      </p>
      <form onSubmit={handleSubmit} className="mt-4" noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            ref={emailRef}
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={state === "loading"}
            aria-invalid={state === "error" ? "true" : undefined}
            aria-describedby={
              state === "error" ? "newsletter-error" : undefined
            }
            className={cn(
              "border-border bg-background text-foreground placeholder:text-muted-foreground",
              "h-9 w-full rounded-lg border px-3 text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="newsletter-hp">Leave this empty</label>
            <input
              ref={honeypotRef}
              id="newsletter-hp"
              name="hp_field"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <Button
            type="submit"
            disabled={state === "loading"}
            className="shrink-0"
          >
            {state === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        {state === "error" && errorMessage && (
          <p
            id="newsletter-error"
            role="alert"
            className="text-destructive mt-2 text-sm"
          >
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  );
}

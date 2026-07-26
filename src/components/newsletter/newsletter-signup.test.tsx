import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { NewsletterSignup } from "./newsletter-signup";

const mockFetch = vi.fn();

describe("NewsletterSignup", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    mockFetch.mockClear();
  });

  // AC-3: Form displays as a card with heading, description, email input, and submit button
  it("renders the form with heading, description, email input, and submit button", () => {
    render(<NewsletterSignup />);
    expect(
      screen.getByRole("heading", { name: /newsletter/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /subscribe/i }),
    ).toBeInTheDocument();
  });

  // AC-10: Labeled input for accessibility
  it("has a labeled email input", () => {
    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("autoComplete", "email");
  });

  // AC-10: Heading is linked via aria-labelledby on the section
  it("links the section to its heading via aria-labelledby", () => {
    const { container } = render(<NewsletterSignup />);
    const section = container.querySelector("section");
    const heading = screen.getByRole("heading", { name: /newsletter/i });
    expect(section).toHaveAttribute("aria-labelledby", heading.id);
  });

  // AC-7: Client side validation rejects invalid email formats
  it("shows validation error for invalid email", async () => {
    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "notanemail" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // AC-7: Empty email is rejected
  it("shows validation error for empty email", async () => {
    render(<NewsletterSignup />);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.click(button);

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // AC-4: Submitting a valid email sends a POST request to the Worker endpoint
  it("sends a POST request with the email on valid submission", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 201 });

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/subscribe"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: "test@example.com" }),
      },
    );
  });

  // AC-9: The submit button shows a loading state while the API call is in progress
  it("shows loading state while the API call is in progress", async () => {
    mockFetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/subscribing/i);
    expect(input).toBeDisabled();
  });

  // AC-5: Successful submission shows success message
  it("shows success message after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 201 });

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(
        /check your email and click the confirmation link/i,
      ),
    ).toBeInTheDocument();
  });

  // AC-6: Duplicate subscription is treated as success
  it("shows success message for duplicate subscription", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, status: 201 });

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "existing@example.com" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(
        /check your email and click the confirmation link/i,
      ),
    ).toBeInTheDocument();
  });

  // AC-8: Network errors display an inline error message
  it("shows error message on network failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
  });

  // AC-8: API errors display an inline error message
  it("shows error message on API failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  // AC-8, AC-12: Rate limit returns 429
  it("shows rate limit error on 429 response", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 429 });

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    expect(await screen.findByText(/too many attempts/i)).toBeInTheDocument();
  });

  // AC-17: Honeypot field is hidden from humans
  it("includes a hidden honeypot field", () => {
    render(<NewsletterSignup />);
    const honeypot = screen.getByLabelText(/leave this empty/i);
    expect(honeypot).toHaveAttribute("name", "hp_field");
    expect(honeypot.closest("[aria-hidden]")).toBeInTheDocument();
  });

  // AC-10: Error message has role="alert" for screen readers
  it("error message has alert role for screen readers", async () => {
    mockFetch.mockRejectedValueOnce(new Error("fail"));

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  // AC-17: Honeypot filled silently succeeds without calling fetch
  it("silently succeeds without calling fetch when honeypot is filled", async () => {
    render(<NewsletterSignup />);
    const honeypot = screen.getByLabelText(/leave this empty/i);
    const button = screen.getByRole("button", { name: /subscribe/i });
    const emailInput = screen.getByLabelText(/email address/i);

    fireEvent.change(emailInput, { target: { value: "bot@example.com" } });
    fireEvent.change(honeypot, { target: { value: "spam" } });
    fireEvent.click(button);

    expect(
      await screen.findByText(
        /check your email and click the confirmation link/i,
      ),
    ).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  // AC-10: Input gets aria-invalid when validation error occurs
  it("sets aria-invalid on input when email is invalid", async () => {
    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "bad" } });
    fireEvent.click(button);

    await screen.findByRole("alert");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  // AC-10: Error message is linked to input via aria-describedby
  it("links error message to input via aria-describedby", async () => {
    mockFetch.mockRejectedValueOnce(new Error("fail"));

    render(<NewsletterSignup />);
    const input = screen.getByLabelText(/email address/i);
    const button = screen.getByRole("button", { name: /subscribe/i });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    const alert = await screen.findByRole("alert");
    expect(input).toHaveAttribute("aria-describedby", alert.id);
  });

  // AC-3: Description text is present
  it("renders the newsletter description", () => {
    render(<NewsletterSignup />);
    expect(screen.getByText(/early access to new posts/i)).toBeInTheDocument();
  });
});

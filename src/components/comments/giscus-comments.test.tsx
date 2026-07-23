import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { GiscusComments } from "./giscus-comments";

// Mock @giscus/react to capture props without rendering a real iframe
vi.mock("@giscus/react", () => ({
  default: (props: Record<string, string>) => (
    <div data-testid="giscus-widget" data-props={JSON.stringify(props)} />
  ),
}));

function getGiscusProps(): Record<string, string> {
  const widget = screen.getByTestId("giscus-widget");
  return JSON.parse(widget.getAttribute("data-props") ?? "{}");
}

describe("GiscusComments", () => {
  afterEach(() => {
    cleanup();
  });

  // AC-1: Comments section renders on every blog post page
  it("renders the comments section", () => {
    render(<GiscusComments />);
    expect(screen.getByTestId("giscus-widget")).toBeInTheDocument();
  });

  // AC-5: Comments section has a visible heading for accessibility
  it("renders a visible heading for accessibility", () => {
    render(<GiscusComments />);
    const heading = screen.getByRole("heading", { name: /comments/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H2");
  });

  // AC-5: heading is linked via aria-labelledby on the section
  it("links the section to its heading via aria-labelledby", () => {
    const { container } = render(<GiscusComments />);
    const section = container.querySelector("section");
    const heading = screen.getByRole("heading", { name: /comments/i });
    expect(section).toHaveAttribute("aria-labelledby", heading.id);
  });

  // AC-3: Comments follow the site's theme toggle
  it("uses light theme when no dark class is present", () => {
    document.documentElement.classList.remove("dark");
    render(<GiscusComments />);
    expect(getGiscusProps().theme).toBe("light");
  });

  it("uses dark theme when dark class is present", () => {
    document.documentElement.classList.add("dark");
    render(<GiscusComments />);
    expect(getGiscusProps().theme).toBe("dark");
    document.documentElement.classList.remove("dark");
  });

  it("updates theme when dark class changes", async () => {
    document.documentElement.classList.remove("dark");
    render(<GiscusComments />);
    expect(getGiscusProps().theme).toBe("light");

    document.documentElement.classList.add("dark");
    // MutationObserver fires asynchronously; wait for React to re-render
    await screen.findByTestId("giscus-widget");
    expect(getGiscusProps().theme).toBe("dark");

    document.documentElement.classList.remove("dark");
  });

  // AC-4: Emoji reactions are enabled on the main post
  it("enables emoji reactions", () => {
    render(<GiscusComments />);
    expect(getGiscusProps().reactionsEnabled).toBe("1");
  });

  // AC-6: Uses the pathname mapping strategy
  it("uses pathname mapping strategy", () => {
    render(<GiscusComments />);
    expect(getGiscusProps().mapping).toBe("pathname");
  });

  // AC-7: Discussion category is Announcements
  it("uses the Announcements category", () => {
    render(<GiscusComments />);
    expect(getGiscusProps().category).toBe("Announcements");
  });

  // AC-2: Lazy loading (the Giscus loading prop)
  it("sets lazy loading on the widget", () => {
    render(<GiscusComments />);
    expect(getGiscusProps().loading).toBe("lazy");
  });
});

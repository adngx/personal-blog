import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./theme-toggle";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  Moon: ({ className }: { className?: string }) => (
    <span data-testid="moon-icon" className={className}>
      Moon
    </span>
  ),
  Sun: ({ className }: { className?: string }) => (
    <span data-testid="sun-icon" className={className}>
      Sun
    </span>
  ),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

vi.stubGlobal("localStorage", localStorageMock);

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove("dark");
    // Reset matchMedia mock
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders with Moon icon in light mode by default", () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("renders with Sun icon when system prefers dark", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: true })),
    );
    render(<ThemeToggle />);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("toggles from light to dark on click", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await user.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("persists theme to localStorage on toggle", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await user.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("has correct aria-label for light mode", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it("applies dark class to document when toggled", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    await user.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});

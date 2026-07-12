import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, badgeVariants } from "./badge";

describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>intro</Badge>);
    expect(screen.getByText("intro")).toBeInTheDocument();
  });

  it("renders with secondary variant when specified", () => {
    render(<Badge variant="secondary">tag</Badge>);
    const badge = screen.getByText("tag");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("bg-muted");
  });

  it("renders multiple badges as siblings", () => {
    render(
      <div>
        <Badge variant="secondary">astro</Badge>
        <Badge variant="secondary">web-dev</Badge>
      </div>,
    );
    expect(screen.getByText("astro")).toBeInTheDocument();
    expect(screen.getByText("web-dev")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Badge className="mt-4">custom</Badge>);
    const badge = screen.getByText("custom");
    expect(badge.className).toContain("mt-4");
  });

  it("forwards HTML attributes", () => {
    render(<Badge data-testid="my-badge">test</Badge>);
    expect(screen.getByTestId("my-badge")).toBeInTheDocument();
  });
});

describe("badgeVariants", () => {
  it("returns a class string for default variant", () => {
    const classes = badgeVariants({ variant: "default" });
    expect(classes).toContain("inline-flex");
    expect(classes).toContain("rounded-md");
  });

  it("returns different classes for secondary variant", () => {
    const defaultClasses = badgeVariants({ variant: "default" });
    const secondaryClasses = badgeVariants({ variant: "secondary" });
    expect(defaultClasses).not.toBe(secondaryClasses);
  });
});

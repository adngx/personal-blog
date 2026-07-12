import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function getStoredTheme(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return getStoredTheme() ?? getSystemTheme();
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}

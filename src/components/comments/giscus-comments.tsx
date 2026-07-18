import Giscus from "@giscus/react";
import { useEffect, useState } from "react";

// Configuration from giscus.app. Replace these placeholders with real values
// after enabling Discussions and installing the Giscus app on the repository.
const GISCUS_REPO = "adngx/personal-blog" as const;
const GISCUS_REPO_ID = "R_kgDOTXqACQ" as const;
const GISCUS_CATEGORY = "Announcements" as const;
const GISCUS_CATEGORY_ID = "DIC_kwDOTXqACc4DBVG9" as const;

function getTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function GiscusComments() {
  const [theme, setTheme] = useState<"light" | "dark">(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="comments-heading" className="mt-12">
      <h2 id="comments-heading" className="mb-6 text-2xl font-bold">
        Comments
      </h2>
      <Giscus
        repo={GISCUS_REPO}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="en"
        loading="lazy"
      />
    </section>
  );
}

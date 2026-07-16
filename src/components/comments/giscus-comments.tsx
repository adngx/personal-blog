import Giscus from "@giscus/react";

// Configuration from giscus.app. Replace these placeholders with real values
// after enabling Discussions and installing the Giscus app on the repository.
const GISCUS_REPO = "adngx/personal-blog" as const;
const GISCUS_REPO_ID = "R_kgDOTXqACQ" as const;
const GISCUS_CATEGORY = "Announcements" as const;
const GISCUS_CATEGORY_ID = "DIC_kwDOTXqACc4DBVG9" as const;

export function GiscusComments() {
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
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
      />
    </section>
  );
}

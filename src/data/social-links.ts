export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

export const socialLinks: readonly SocialLink[] = [
  { label: "GitHub", url: "https://github.com" },
  { label: "X (Twitter)", url: "https://x.com" },
  { label: "Email", url: "mailto:hello@example.com" },
] as const;

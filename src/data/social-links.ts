export interface SocialLink {
  readonly label: string;
  readonly url: string;
}

export const socialLinks: readonly SocialLink[] = [
  { label: "GitHub", url: "https://github.com/adngx" },
  { label: "X (Twitter)", url: "https://x.com/adngx0" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/anh-duc-nguyen-809111429/",
  },
  { label: "Email", url: "mailto:contact@adngx.com" },
] as const;

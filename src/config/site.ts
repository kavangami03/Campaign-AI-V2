/** Overridable per environment so canonical + OG URLs are correct on previews. */
const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://campaignx.ai";

export const siteConfig = {
  name: "CampaignX",
  tagline: "The AI Campaign Agent",
  url,
  description:
    "CampaignX transforms marketing briefs into strategy, creative, targeting, launch and optimization with AI.",
  title: "CampaignX — Turn One Brief Into a Complete Campaign",
  twitter: "@campaignx",
  copyrightYear: 2026,
  legal: [
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
    { label: "Security", href: "#security" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

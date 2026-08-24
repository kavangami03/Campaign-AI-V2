import type {
  FragmentTool,
  HeroChannel,
  HowStep,
  Platform,
} from "@/types/content";

/* ---------------------------------------------------------------- hero -- */

export const hero = {
  /**
   * One entry per visual line. `highlight` names the word in that line to
   * set in the hand-drawn face; it must appear in the line verbatim.
   */
  headline: [
    { text: "Turn one brief into", highlight: "one" },
    { text: "a complete campaign.", highlight: "complete" },
  ],
  supporting:
    "Describe the campaign once. CampaignX writes the strategy, generates the creative, and ships it to every channel in the format that channel expects.",
  primaryCta: { label: "Start a Campaign", href: "#start" },
  secondaryCta: { label: "See how it works", href: "#how" },

  /** The brief that types itself into the prompt bar. */
  prompt: {
    placeholder: "Ask CampaignX to write a campaign for…",
    /**
     * Cycled through in order, each typed out then cleared. Plain language
     * on purpose: these should read like something a person would actually
     * type into the box, not like marketing copy about marketing.
     *
     * Each is written to fill two lines in the bar, so the height never
     * changes between briefs. Keep new ones to a similar length.
     */
    briefs: [
      "Write a campaign to bring back customers who stopped buying from us, and give them a reason to return.",
      "Create a Black Friday sale campaign for my whole store, with a clear offer people will remember.",
      "Make a campaign to get more people to book a demo, and explain what they will actually see on the call.",
      "Launch our new app to people who only use the website, and show them what they are missing.",
      "Build a campaign to fill the seats at next month's webinar, and tell people what they will learn.",
      "Write a summer sale campaign for our clothing collection, aimed at people shopping on their phones.",
      "Create a campaign to tell everyone about our new prices, and be honest about what is changing.",
      "Make a welcome campaign for people who just signed up, and help them get started in a few minutes.",
      "Write a campaign to remind people about the items they left in their cart, without sounding pushy.",
      "Build a back to school campaign for parents, and keep the tone calm and genuinely helpful.",
      "Create a campaign to get more reviews from happy customers, and make it easy for them to reply.",
      "Write a campaign to share our biggest news this year, and say plainly why it matters to customers.",
      "Make a campaign that gets people to invite their friends, and explain the reward in one sentence.",
      "Create a thank you campaign for our most loyal customers, and make them feel genuinely appreciated.",
      "Write a campaign to win back the people who left last month, and ask what we could have done better.",
    ],
    action: "Generate",
    hint: "Free to start · no credit card",
  },

  /**
   * The three devices below the routing strip. Drop a 9:16 clip into
   * public/videos, then add `src` + `poster` here to swap the animated
   * placeholder for real footage — no component changes needed.
   */
  channels: [
    {
      name: "Instagram",
      output: "Story frame + square post",
      icon: "sparkles",
      platform: "instagram",
      mock: "story",
      src: "/videos/campaignx-instagram.mp4",
    },
    {
      name: "SMS",
      output: "Broadcast + reply",
      icon: "message",
      platform: "sms",
      mock: "chat",
    },
    {
      name: "Email",
      output: "Subject line + 3 variants",
      icon: "mail",
      platform: "email",
      mock: "email",
      src: "/videos/campaignx-email.mp4",
    },
  ] as const satisfies readonly HeroChannel[],
} as const;

/* -------------------------------------------------------- social proof -- */

export const socialProof = {
  statement:
    "Write it once. CampaignX reformats and ships it to each platform in the format that platform expects.",
  platforms: [
    { id: "instagram", name: "Instagram" },
    { id: "facebook", name: "Facebook" },
    { id: "linkedin", name: "LinkedIn" },
    { id: "google", name: "Google Business" },
    { id: "x", name: "X" },
    { id: "email", name: "Email" },
    { id: "sms", name: "SMS" },
  ] as const satisfies readonly Platform[],
};

/* ------------------------------------------------------------- problem -- */

export const problem = {
  eyebrow: "The cost of fragmentation",
  heading: "A campaign shouldn't take four tools and three weeks.",
  headingHighlight: "four tools",
  /**
   * One entry per line. Authored rather than balanced by the browser: the
   * break belongs between the two sentences, and text-balance would put it
   * in the middle of the list of tools.
   */
  supporting: [
    "A doc, a design file, an ad manager, a spreadsheet.",
    "Every handoff loses something.",
  ],

  /** The stack a campaign currently passes through, in order. */
  tools: [
    {
      name: "The doc",
      role: "Strategy",
      loss: "Nobody re-reads it after week one",
    },
    {
      name: "The design file",
      role: "Creative",
      loss: "Off-brand by the third variant",
    },
    {
      name: "The ad manager",
      role: "Distribution",
      loss: "Every channel rebuilt from scratch",
    },
    {
      name: "The spreadsheet",
      role: "Reporting",
      loss: "Arrives after the budget is spent",
    },
  ] as const satisfies readonly FragmentTool[],

  /** The cost, stated plainly. */
  cost: { value: "3 weeks", label: "from brief to live, on a good run" },

  /** What replaces it. */
  after: {
    label: "With CampaignX",
    heading: "One workspace. One brief. One afternoon.",
    /**
     * One entry per tool above, in the same order — so each card answers
     * the card it replaces rather than floating as a generic benefit.
     */
    points: [
      { replaces: "Strategy", text: "Written into the brief, not a doc nobody reopens" },
      { replaces: "Creative", text: "A private brand model holds the voice across every variant" },
      { replaces: "Distribution", text: "Channel versions generate together, not one after another" },
      { replaces: "Reporting", text: "Results land while the budget is still live" },
    ],
  },
} as const;

/* -------------------------------------------------------- how it works -- */

export const howItWorks = {
  eyebrow: "How it works",
  heading: "From a sentence to a shipped campaign.",
  headingHighlight: "shipped",
  supporting:
    "Four steps, and you only write the first one. Everything after it happens in the same workspace, on the same brief.",
  steps: [
    {
      step: "01",
      title: "You write the brief",
      description:
        "One sentence in plain language. No templates, no fields to fill, no brief document to circulate for approval.",
      visual: "brief",
      image: "/images/how-01-brief.png",
      points: ["Plain language", "No templates", "No approval chain"],
      stat: { value: "1", label: "sentence in" },
      takeaway:
        "If you can describe it to a colleague, you can brief CampaignX.",
    },
    {
      step: "02",
      title: "It learns your brand",
      description:
        "Connect a site, upload guidelines, or paste past campaigns. CampaignX builds a private model of how you sound — and it never leaves your workspace.",
      visual: "brand",
      image: "/images/how-02-brand.png",
      points: ["Private to you", "Voice and tone", "Never trained on"],
      stat: { value: "100%", label: "yours alone" },
      takeaway:
        "Your model is isolated to your workspace. It is never pooled, shared or used to train anything else.",
    },
    {
      step: "03",
      title: "Every channel, natively",
      description:
        "Not one asset resized nine times. Each channel gets copy and creative written for how people actually read it there.",
      visual: "adapt",
      image: "/images/how-03-channels.png",
      points: ["Per-channel copy", "Native formats", "On-brand by default"],
      stat: { value: "9", label: "channels, natively" },
      takeaway:
        "An email is not a story frame with different margins. Each one is written for how people actually read it there.",
    },
    {
      step: "04",
      title: "It learns what worked",
      description:
        "Results feed straight back into the model. The next campaign starts from what performed, not from a blank page.",
      visual: "learn",
      image: "/images/how-04-learn.png",
      points: ["Live performance", "Reallocates spend", "Rewrites the losers"],
      stat: { value: "24/7", label: "optimising" },
      takeaway:
        "Every campaign makes the next one better, without anyone rebuilding a report.",
    },
  ] as readonly HowStep[],
};

/* ----------------------------------------------------------- final cta -- */

export const finalCta = {
  heading: "Write the sentence. We ship the campaign.",
  headingHighlight: "sentence",
  supporting:
    "Strategy, creative and every channel — from one line of plain English.",
  primaryCta: { label: "Start a Campaign", href: "#start" },
  secondaryCta: { label: "See how it works", href: "#how" },
  /** The working prompt bar in the closing panel. */
  prompt: {
    action: "Generate",
    hint: "Free to start · no credit card required",
  },
} as const;

export const footerBlurb =
  "The AI campaign agent for marketing teams who care about craft, clarity and results.";

import type { IconName } from "./common";

/** A phone mockup below the hero prompt bar. */
export interface HeroChannel {
  /** Channel name, shown under the device. */
  readonly name: string;
  /** Short label for what this channel received. */
  readonly output: string;
  readonly icon: IconName;
  /** Which brand mark to show on the caption card. */
  readonly platform: PlatformName;
  /** Portrait clip. Absent until a real file is dropped in. */
  readonly src?: string;
  readonly poster?: string;
  /** Chooses which animated placeholder UI renders inside the screen. */
  readonly mock: "story" | "chat" | "email";
}

/** Platforms CampaignX publishes to. Keys map to marks in <BrandGlyph />. */
export type PlatformName =
  | "instagram"
  | "facebook"
  | "linkedin"
  | "email"
  | "sms"
  | "x"
  | "google";

export interface Platform {
  readonly id: PlatformName;
  readonly name: string;
}

/** One step in the "How it works" rail. */
export interface HowStep {
  /** Two-digit ordinal, shown on the card. */
  readonly step: string;
  readonly title: string;
  readonly description: string;
  /** Chooses which live visual renders beside the step. */
  readonly visual: "brief" | "brand" | "adapt" | "learn";
  /**
   * A 4:3 illustration for this step. When present it replaces the DOM
   * visual; without it the DOM visual renders, so the section is never
   * broken while only some images exist.
   */
  readonly image?: string;
  /** Three short proof points under the copy. */
  readonly points: readonly string[];
  /** A single headline figure for the step, with its own label. */
  readonly stat: { readonly value: string; readonly label: string };
  /** One closing line that says what the step means for the reader. */
  readonly takeaway: string;
}

/** One tool in the fragmented "before" stack. */
export interface FragmentTool {
  readonly name: string;
  readonly role: string;
  /** What is lost at the handoff out of this tool. */
  readonly loss: string;
}

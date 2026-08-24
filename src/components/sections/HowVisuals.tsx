import { BrandGlyph } from "@/components/ui/BrandGlyph";
import type { HowStep } from "@/types/content";

/* --------------------------------------------------------------------------
   The four step visuals.

   Each is composed in DOM rather than shipped as an image: they stay sharp
   at any zoom, follow the brand tokens automatically, weigh nothing, and
   can be edited in a text editor. All are decorative — the step's own copy
   carries the meaning — so the parent hides them from assistive tech.
   -------------------------------------------------------------------------- */

/** 01 — the brief, being read and broken into its parts. */
function BriefVisual() {
  const PARSED = [
    { label: "Goal", value: "Win back lapsed buyers" },
    { label: "Audience", value: "No order in 90 days" },
    { label: "Tone", value: "Warm, not salesy" },
    { label: "Deadline", value: "Friday" },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      {/* The sentence someone typed. */}
      <div className="rounded-card border border-line bg-surface px-4 py-3.5 shadow-soft">
        <p className="text-[0.9375rem] leading-relaxed text-foreground">
          &ldquo;Bring back customers who stopped buying. Warm, not salesy.
          Ship by Friday.&rdquo;
        </p>
      </div>

      {/* What it understood. */}
      <div className="grid grid-cols-2 gap-2">
        {PARSED.map((item) => (
          <div
            key={item.label}
            className="rounded-chip border border-line bg-surface-soft/70 px-3 py-2.5"
          >
            <p className="text-[0.625rem] font-semibold tracking-[0.12em] text-muted uppercase">
              {item.label}
            </p>
            <p className="mt-1 text-[0.8125rem] font-medium text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 02 — the brand model, assembled from sources. */
function BrandVisual() {
  const SOURCES = ["Website", "Guidelines", "Past campaigns"] as const;
  const TRAITS = [
    { label: "Warm", weight: 88 },
    { label: "Direct", weight: 72 },
    { label: "Playful", weight: 41 },
    { label: "Formal", weight: 18 },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      {/* Sources feeding the model. */}
      <div className="flex flex-wrap gap-2">
        {SOURCES.map((source) => (
          <span
            key={source}
            className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-muted-strong"
          >
            <span className="bg-brand block size-1.5 rounded-full" />
            {source}
          </span>
        ))}
      </div>

      {/* The resulting voice profile. */}
      <div className="rounded-card border border-line bg-surface p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <p className="text-[0.8125rem] font-medium">Your voice</p>
          <span className="rounded-pill bg-brand-soft px-2 py-0.5 text-[0.625rem] font-semibold tracking-[0.1em] text-accent uppercase">
            Private
          </span>
        </div>

        <dl className="mt-3.5 flex flex-col gap-2.5">
          {TRAITS.map((trait) => (
            <div key={trait.label} className="flex items-center gap-3">
              <dt className="w-16 shrink-0 text-[0.75rem] text-muted">
                {trait.label}
              </dt>
              <dd className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-sunk">
                <span
                  className="bg-brand block h-full rounded-full"
                  style={{ width: `${trait.weight}%` }}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/** 03 — one brief, adapted per channel. */
function AdaptVisual() {
  const OUTPUTS = [
    {
      platform: "instagram" as const,
      name: "Instagram",
      copy: "Still thinking about it? 🌸",
      meta: "Story + square post",
    },
    {
      platform: "email" as const,
      name: "Email",
      copy: "We saved your basket — and 20% off",
      meta: "Subject + 3 variants",
    },
    {
      platform: "sms" as const,
      name: "SMS",
      copy: "Your favourites are back in stock.",
      meta: "Broadcast + reply",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-2">
      {OUTPUTS.map((output) => (
        <div
          key={output.name}
          className="flex items-start gap-3 rounded-card border border-line bg-surface px-3.5 py-3 shadow-soft"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
            <BrandGlyph name={output.platform} className="size-4" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.875rem] font-medium text-foreground">
              {output.copy}
            </p>
            <p className="mt-0.5 text-[0.75rem] text-muted">{output.meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** 04 — results feeding back into the next generation. */
function LearnVisual() {
  const BARS = [
    { label: "Email", now: 92, before: 61 },
    { label: "WhatsApp", now: 74, before: 52 },
    { label: "Instagram", now: 48, before: 55 },
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-card border border-line bg-surface p-4 shadow-soft">
        <div className="flex items-baseline justify-between">
          <p className="text-[0.8125rem] font-medium">Where budget moved</p>
          <p className="text-[0.75rem] text-muted">This week</p>
        </div>

        {/* Two bars per channel: what it was, and what it became. The
            faint bar behind is the previous allocation, so the shift is
            legible without a legend. */}
        <dl className="mt-4 flex flex-col gap-3">
          {BARS.map((bar) => (
            <div key={bar.label} className="flex items-center gap-3">
              <dt className="w-20 shrink-0 text-[0.75rem] text-muted">
                {bar.label}
              </dt>
              <dd className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-sunk">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-line-strong"
                  style={{ width: `${bar.before}%` }}
                />
                <span
                  className="bg-brand absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${bar.now}%` }}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* The loop closing. */}
      <div className="flex items-center gap-2.5 rounded-card border border-accent-line bg-brand-soft px-3.5 py-3">
        <span className="bg-brand flex size-6 shrink-0 items-center justify-center rounded-full">
          <svg viewBox="0 0 24 24" className="size-3 text-white" fill="none">
            <path
              d="M4 12a8 8 0 0 1 13.7-5.7M20 12a8 8 0 0 1-13.7 5.7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M17 3v4h-4M7 21v-4h4"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-[0.8125rem] text-muted-strong">
          Fed back into the next campaign automatically.
        </p>
      </div>
    </div>
  );
}

const VISUALS = {
  brief: BriefVisual,
  brand: BrandVisual,
  adapt: AdaptVisual,
  learn: LearnVisual,
} as const;

export function HowVisual({ name }: { name: HowStep["visual"] }) {
  const Visual = VISUALS[name];
  return <Visual />;
}

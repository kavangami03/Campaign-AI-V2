/**
 * Hero backdrop — an off-white page with a faint grid and a whisper of
 * brand colour low in the frame.
 *
 * Deliberately restrained: the brand gradient earns its impact on the CTA
 * and the highlighted words, and a large colour wash behind them would
 * spend that impact on nothing. What is left is two low-opacity volumes,
 * far enough down and light enough that they read as paper catching
 * coloured light rather than as a gradient background.
 *
 * Everything here is decorative and hidden from assistive tech.
 */
export function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />

      {/* Faint grid, fading out before it reaches the colour. */}
      <div className="bg-grid mask-fade-edges absolute inset-x-0 top-0 h-[62vh] opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />

      {/* Two volumes only, at the ends of the brand ramp, sitting low. */}
      <div className="absolute inset-x-0 bottom-[-22vh] h-[80vh]">
        <div className="cx-drift absolute bottom-[8vh] left-[4vw] h-[52vh] w-[58vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,123,255,0.10),rgba(0,123,255,0))] blur-[90px]" />
        <div className="cx-drift absolute right-[2vw] bottom-[2vh] h-[46vh] w-[52vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(208,0,255,0.07),rgba(208,0,255,0))] blur-[95px] [animation-delay:-7s]" />
      </div>

      {/* Key light, upper centre — keeps the headline sitting on paper. */}
      <div className="absolute top-[-26vh] left-1/2 h-[76vh] w-[120vw] max-w-[1700px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.97),rgba(255,255,255,0))]" />

      {/* Veil behind the prompt bar so type stays legible over the colour. */}
      <div className="absolute inset-x-0 top-[22vh] h-[46vh] bg-[radial-gradient(60%_50%_at_50%_40%,rgba(255,255,255,0.85),rgba(255,255,255,0))]" />

      {/* Grounding wash so the devices don't float on raw colour. */}
      <div className="absolute inset-x-0 bottom-0 h-[26vh] bg-[linear-gradient(to_top,var(--background),transparent)]" />

      <div className="bg-noise absolute inset-0 opacity-[0.03] mix-blend-multiply" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withHighlight } from "@/components/ui/Highlight";
import { problem } from "@/config/content";
import {
  gsap,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";

/**
 * The problem.
 *
 * The page's first section after the hero, and the one that earns everything
 * below it: without a stated problem, "one brief becomes a campaign" is a
 * claim about nothing.
 *
 * The argument is made structurally rather than in prose. Four tool cards
 * sit in a row, each tilted a little further out of alignment than the last
 * and each carrying what it loses at the handoff — so the row visibly
 * degrades left to right. The resolution below it is a single flat panel,
 * deliberately the only thing on the page that is perfectly square to the
 * grid.
 */
export function Problem() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Runs on every path: the CSS in animations.css keeps
         [data-animate="reveal"] hidden until GSAP clears it, so skipping
         this on the motion path leaves the section invisible. */
      revealOnScroll(root, { stagger: 0.08, start: "top 78%" });

      if (prefersReducedMotion()) return;

      /* The chain breaks as it scrolls in: each card drifts a little
         further from true than the one before it, so the row falls out of
         alignment rather than simply appearing. */
      const cards = gsap.utils.toArray<HTMLElement>("[data-fragment]", root);
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotate: 0, y: 0 },
          {
            rotate: (i - 1.5) * 1.6,
            y: i * 6,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.8,
            },
          },
        );
      });

      /* The answers do the opposite: they arrive tilted and settle square,
         so the resolution is legible as motion and not only as copy. */
      const resolved = gsap.utils.toArray<HTMLElement>("[data-resolve]", root);
      resolved.forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotate: (i - 1.5) * 2.2, y: 18, opacity: 0 },
          {
            rotate: 0,
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          },
        );
      });

      /* Each card's rule fills once it has landed. */
      const rules = gsap.utils.toArray<HTMLElement>("[data-resolve-rule]", root);
      rules.forEach((rule, i) => {
        gsap.to(rule, {
          width: "100%",
          duration: 0.8,
          delay: 0.5 + i * 0.09,
          ease: "power2.inOut",
          scrollTrigger: { trigger: rule, start: "top 92%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="relative py-[90px]"
    >
      <Container>
        <div ref={rootRef}>
          {/* Heading */}
          <div className="mx-auto flex max-w-[64rem] flex-col items-center gap-5 text-center">
            <Eyebrow data-animate="reveal">{problem.eyebrow}</Eyebrow>

            <h2
              id="problem-heading"
              data-animate="reveal"
              className="text-display max-w-[52rem] text-balance text-[clamp(2rem,4.4vw,3.75rem)]"
            >
              {withHighlight(problem.heading, problem.headingHighlight)}
            </h2>

            <p
              data-animate="reveal"
              className="text-[1.0625rem] leading-relaxed text-muted"
            >
              {problem.supporting.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* The broken chain */}
          <ol className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {problem.tools.map((tool, index) => (
              <li
                key={tool.name}
                data-animate="reveal"
                data-fragment
                className="relative flex flex-col gap-3 rounded-panel border border-line bg-surface/60 p-6"
              >
                {/* Break marker between cards, desktop only. */}
                {index < problem.tools.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-[9px] z-10 hidden size-3.5 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background lg:flex"
                  >
                    <span className="block h-px w-1.5 bg-muted/40" />
                  </span>
                ) : null}

                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-eyebrow">{tool.role}</span>
                  <span className="text-[0.6875rem] tabular-nums text-muted/40">
                    0{index + 1}
                  </span>
                </div>

                <p className="text-display text-[1.25rem]">{tool.name}</p>

                {/* What is lost here. Struck through, because that is what
                    the handoff does to it. */}
                <p className="mt-1 flex items-start gap-2 text-[0.875rem] leading-relaxed text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[0.45em] block h-px w-3 shrink-0 bg-muted/40"
                  />
                  {tool.loss}
                </p>
              </li>
            ))}
          </ol>

          {/* The cost of all that */}
          <p
            data-animate="reveal"
            className="mt-10 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center"
          >
            <span className="text-display text-[clamp(1.75rem,3vw,2.5rem)] text-muted-strong">
              {problem.cost.value}
            </span>
            <span className="text-[0.9375rem] text-muted">
              {problem.cost.label}
            </span>
          </p>


          {/* The resolution.

              Four cards answering the four above, in the same order and the
              same grid — so the eye reads them as replacements rather than
              a separate list of benefits. Where the tool cards drift apart
              on scroll, these snap square, which is the whole argument made
              as motion. */}
          <div className="relative mt-16 sm:mt-20">
            <div
              data-animate="reveal"
              className="relative overflow-hidden rounded-frame bg-foreground p-8 sm:p-12"
            >
              {/* Brand light, low right. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-[15%] -bottom-1/2 size-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.35),transparent)] blur-[70px]"
              />

              <div className="relative flex flex-col items-center gap-3 text-center">
                <span className="inline-flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="flex items-center gap-[3px]"
                  >
                    <span className="bg-brand block h-2.5 w-[3px] rounded-full" />
                    <span className="bg-brand block h-1.5 w-[3px] rounded-full opacity-50" />
                  </span>
                  <span className="text-eyebrow text-white/60">
                    {problem.after.label}
                  </span>
                </span>

                <h3 className="text-display max-w-[18ch] text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.12] text-balance text-white">
                  {problem.after.heading}
                </h3>
              </div>

              {/* The four answers, in the tools' own grid. */}
              <ol className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {problem.after.points.map((point, index) => (
                  <li
                    key={point.replaces}
                    data-resolve
                    className="group relative flex flex-col gap-3 rounded-panel border border-white/10 bg-white/[0.03] p-5 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-eyebrow text-white/45">
                        {point.replaces}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-brand text-[0.6875rem] font-semibold tabular-nums"
                      >
                        0{index + 1}
                      </span>
                    </div>

                    <p className="text-[0.9375rem] leading-relaxed text-white/80">
                      {point.text}
                    </p>

                    {/* A rule that fills as the card settles, marking it
                        resolved. */}
                    <span
                      aria-hidden="true"
                      className="mt-auto block h-px w-full overflow-hidden bg-white/10"
                    >
                      <span
                        data-resolve-rule
                        className="bg-brand block h-full w-0 rounded-full"
                      />
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

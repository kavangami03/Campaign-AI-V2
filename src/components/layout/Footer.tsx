"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowRight, Paperclip, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { withHighlight } from "@/components/ui/Highlight";
import { Logo } from "@/components/ui/Logo";
import { finalCta, footerBlurb } from "@/config/content";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import {
  gsap,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/animations/gsap";
import { revealOnScroll } from "@/lib/animations/reveal";

/** Where the prompt bar sends people. A placeholder until auth exists. */
const LOGIN_HREF = "#login";

/**
 * The closing CTA and footer.
 *
 * They are one component because they are one moment: the CTA is the page's
 * last argument and the footer is what holds it up. Splitting them would
 * put a seam between the ask and the ground it sits on.
 *
 * `#start` lives here. Every "Start a Campaign" control in the header and
 * hero points at it, so without this section those buttons scroll nowhere.
 */
export function Footer() {
  const rootRef = useRef<HTMLElement>(null);
  const [brief, setBrief] = useState("");
  const router = useRouter();

  /* The brief is carried to the login screen as a query param, so whatever
     was typed survives sign-up instead of being retyped afterwards. */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = brief.trim();
    router.push(
      trimmed
        ? `${LOGIN_HREF}?brief=${encodeURIComponent(trimmed)}`
        : LOGIN_HREF,
    );
  };

  /* Enter submits; Shift+Enter keeps its usual newline, since this is a
     textarea and a brief may well run to two lines. */
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  useEffect(() => {
    registerGsap();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      /* Must run on every path, not just reduced motion: the CSS in
         animations.css keeps [data-animate="reveal"] hidden until GSAP
         clears it, so skipping this leaves the content invisible. */
      revealOnScroll(root, { stagger: 0.07, start: "top 85%" });

      if (prefersReducedMotion()) return;

      /* The wordmark draws itself up out of the footer's bottom edge as the
         page ends — a last piece of motion rather than a static sign-off. */
      const mark = root.querySelector<HTMLElement>("[data-footer-mark]");
      if (mark) {
        /* Only the transform is animated. The element's opacity is its
           resting style (0.16) — tweening it to 1 would blast the wordmark
           to full strength and swamp the footer. */
        gsap.fromTo(
          mark,
          { yPercent: 14 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: mark,
              start: "top 95%",
              end: "bottom bottom",
              scrub: 0.6,
            },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="relative">
      {/* ---------------------------------------------------------------
          Closing CTA

          A bounded dark panel rather than centred text on a wash. The page
          is off-white the whole way down, so ending on an inverted card
          gives the final ask somewhere to land instead of dissolving into
          the same background as everything above it.
          --------------------------------------------------------------- */}
      <section id="start" aria-labelledby="cta-heading" className="pb-20">
        <Container>
          <div
            data-animate="reveal"
            className="relative isolate overflow-hidden rounded-frame bg-foreground px-6 py-16 sm:px-14 sm:py-20"
          >
            {/* Brand light, from the lower right. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-1/4 -bottom-1/2 -z-10 size-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(var(--brand-blue-rgb),0.45),transparent)] blur-[60px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-1/3 -left-[10%] -z-10 size-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(208,0,255,0.30),transparent)] blur-[70px]"
            />

            <div className="mx-auto flex max-w-[46rem] flex-col items-center gap-6 text-center">
              {/* The ask */}
              <div className="flex flex-col items-center gap-5">
                <h2
                  id="cta-heading"
                  className="text-display max-w-[18ch] text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] text-white"
                >
                  {withHighlight(finalCta.heading, finalCta.headingHighlight)}
                </h2>

                <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-white/55">
                  {finalCta.supporting}
                </p>

                <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                  <Link
                    href={finalCta.primaryCta.href}
                    className="bg-brand shadow-brand group inline-flex h-14 items-center justify-center gap-2 rounded-pill px-8 text-base font-medium text-white transition-[box-shadow,transform,filter] duration-200 ease-[var(--ease-out-soft)] hover:-translate-y-px hover:brightness-[1.07] hover:shadow-brand-hover"
                  >
                    {finalCta.primaryCta.label}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>

                  <Link
                    href={finalCta.secondaryCta.href}
                    className="inline-flex h-14 items-center justify-center rounded-pill border border-white/20 px-8 text-base font-medium text-white transition-colors duration-300 hover:border-white/40 hover:bg-white/5"
                  >
                    {finalCta.secondaryCta.label}
                  </Link>
                </div>
              </div>

              {/* A working prompt bar, echoing the hero's. Unlike the hero's
                  — which is a link, because it sits above the fold before
                  anyone has read anything — this one accepts real input:
                  by this point the visitor has read the page and typing is
                  the action they are ready to take. Submitting carries the
                  brief to the login screen so it is not lost on sign-up. */}
              <form
                onSubmit={onSubmit}
                className="mt-4 w-full text-left"
              >
                <div className="rounded-frame border border-white/10 bg-white/[0.04] p-2.5 backdrop-blur-sm transition-colors duration-300 focus-within:border-white/25">
                  <div className="rounded-[1.4rem] bg-white/[0.04] px-5 pt-5 pb-3.5">
                    <label htmlFor="cta-brief" className="sr-only">
                      Describe your campaign
                    </label>

                    <textarea
                      id="cta-brief"
                      name="brief"
                      value={brief}
                      onChange={(event) => setBrief(event.target.value)}
                      onKeyDown={onKeyDown}
                      rows={2}
                      placeholder="Launch our spring collection to everyone who bought last season."
                      className="w-full resize-none bg-transparent text-[0.9375rem] leading-[1.6] text-white placeholder:text-white/35 focus:outline-none"
                    />

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-8 items-center justify-center rounded-full border border-white/15"
                      >
                        <Paperclip className="size-3.5 text-white/40" />
                      </span>

                      <button
                        type="submit"
                        className="bg-brand shadow-brand inline-flex h-10 cursor-pointer items-center gap-2 rounded-pill pr-3.5 pl-4 text-[0.9375rem] font-medium text-white transition-[filter,box-shadow] duration-200 hover:brightness-[1.07] hover:shadow-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <Sparkles className="size-3.5" aria-hidden="true" />
                        {finalCta.prompt.action}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-center text-[0.8125rem] text-white/40">
                  {finalCta.prompt.hint}
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          Footer proper
          --------------------------------------------------------------- */}
      <div className="border-t border-line bg-background">
        <Container className="pt-16 pb-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
            <div data-animate="reveal" className="flex max-w-[34ch] flex-col gap-5">
              <Logo />
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                {footerBlurb}
              </p>
            </div>

            <nav
              aria-label="Footer"
              className="grid grid-cols-2 gap-8 sm:grid-cols-3"
            >
              {footerNavigation.map((column) => (
                <div
                  key={column.title}
                  data-animate="reveal"
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-eyebrow">{column.title}</h2>
                  <ul className="flex flex-col gap-3">
                    {column.items.map((item) => (
                      <li key={`${column.title}-${item.label}`}>
                        <Link
                          href={item.href}
                          className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors duration-300 hover:text-foreground"
                        >
                          {item.label}
                          {/* A hairline that grows from the left on hover,
                              matching the desktop nav's own treatment. */}
                          <span
                            aria-hidden="true"
                            className="bg-brand block h-px w-0 rounded-full transition-[width] duration-300 ease-[var(--ease-out-soft)] group-hover:w-3"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.8125rem] text-muted">
              © {siteConfig.copyrightYear} {siteConfig.name}, Inc. All rights
              reserved.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {siteConfig.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[0.8125rem] text-muted transition-colors duration-300 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Oversized wordmark, clipped by the page edge. Decorative: the
            name is already in the logo above, so it is hidden from AT.

            Filled with a faded brand gradient rather than an outline stroke
            — a 1px stroke in the border colour sits at 1.35:1 against the
            page, which reads as nothing at all. */}
        <div aria-hidden="true" className="mt-8 overflow-hidden pb-6">
          <Container>
            {/* Opacity sits on the wrapper, not on the gradient text: some
                browsers drop a background-clip fill when the element it is
                painted on is itself transparent. Strong enough to read as
                a deliberate sign-off rather than a printing error. */}
            <div data-footer-mark className="opacity-[0.38]">
              <p className="text-display bg-brand bg-clip-text pb-[0.08em] text-center text-[clamp(4rem,18vw,16rem)] leading-[1] font-semibold tracking-[-0.04em] text-transparent select-none">
                {siteConfig.name}
              </p>
            </div>
          </Container>
        </div>
      </div>
    </footer>
  );
}

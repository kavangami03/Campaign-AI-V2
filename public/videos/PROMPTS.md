# Hero device video prompts

Three portrait clips, one per phone in the hero. Generate these, drop the
files in this folder, then add `src` (and optionally `poster`) to the
matching channel in `src/config/content.ts` — the component swaps from the
animated placeholder to real footage automatically.

**Status:** Instagram is done and live on the site
(`campaignx-instagram.mp4`, 720x1280, 10s, 0.83 MB). WhatsApp and LinkedIn
are still to generate.

## Output spec (applies to all three)

| Constraint | Value                                              |
| ---------- | -------------------------------------------------- |
| Aspect     | **9:16 portrait** (the screen is `aspect-[9/16]`)   |
| Resolution | 720x1280 (matches the delivered Instagram clip)    |
| Duration   | **10 seconds** for 1 and 2; 8s for 3               |
| Loop       | **Seamless** — last frame must match the first      |
| Audio      | **None** (muted autoplay; audio is dead weight)     |
| Codec      | H.264 MP4, `-movflags +faststart`                   |
| Weight     | Under 1 MB each is achievable at this size         |

The clip is rendered with `object-cover` inside a rounded phone screen, so
**keep everything important away from the outer 8%** — the edges get cropped
and the corners are rounded off.

### Look, shared across all three

Light UI on off-white (`#F8F8F6`), matching the site. Brand accents only,
from the CampaignX ramp: blue `#007BFF` -> violet `#4B3CFF` -> purple
`#8A2BE2` -> magenta `#D000FF`. Clean modern SaaS product feel. No dark
mode, no neon, no rainbow, no heavy glow.

### Avoiding glitches — put this in every prompt

These are the phrases that actually prevent the artefacts:

- "seamless loop, first and last frame identical"
- "no flickering, no warping, no morphing text"
- "camera is locked and completely still"
- "consistent lighting throughout"
- "clean vector-sharp UI, no distorted letterforms"
- "no watermark, no logos, no faces, no hands, no cursor"

### Never put hex codes in a prompt

Codes like `#007BFF` are **text**, and a video model renders text it finds
in the prompt — they leak onto the frame as literal colour codes floating at
the top and bottom. Describe colours in words instead: "vivid electric
blue", "deep indigo violet", "bright magenta", "warm off-white".

The same applies to anything that looks like a label: resolutions, file
names, and technical terms belong in the settings panel of the tool, not in
the descriptive prompt. Keep the prompt to things you want *drawn*.

### On-screen text

Text is where generated video most often falls apart — letters crawl and
reshape between frames. It is worth having anyway, because real words read
as real people; blurred bars read as a loading state. The rules that make it
survive:

- **Few words.** Two or three per line, never a sentence.
- **Large.** The clip renders at roughly **303px wide** on the site, a 0.42x
  scale from a 720px source — so text must be **at least 30px** in the
  source to be legible. Anything smaller becomes mush twice over.
- **Static.** Text must be typeset once and then hold pixel-identical. Any
  instruction that implies the text itself animates (typing on, shimmering,
  counting) is what produces crawling letters.
- **Spelled out in the prompt.** Give the exact words in quotes and say
  "spell every word precisely as written".

Changing numbers are the one thing to still avoid — digits mid-roll are
the least stable thing these models draw.

---

## 1 — Instagram (`campaignx-instagram.mp4`) · 10s · v3

### What changed from v2

- **The like counter is gone.** Rolling digits were the single biggest
  source of glitching, and at the size this renders the number was never
  legible anyway. Rising engagement is now carried by hearts popping and
  floating upward, which is pure shape motion and cannot garble.
- **"Sponsored" removed** from the profile header. One less piece of small
  text to render, and the post reads as organic rather than an ad.
- Everything on screen is now either a **shape** or a **short static
  label**. Nothing animates as text.

### The prompt

> A 10 second vertical 9:16 motion graphics animation of a premium light
> theme Instagram style mobile app interface. Crisp flat vector UI design,
> pure white post card on a warm off-white background, high end SaaS product
> demo quality, extremely clean, precise and elegant.
>
> LAYOUT, fixed and stable for the entire shot. One rounded post card fills
> most of the frame with generous margins. Top of the card: a small circular
> profile avatar on the left filled with a soft blue to violet gradient, and
> immediately to its right the single word "northwave" in bold dark grey
> modern sans serif. Middle of the card: a large square media panel. Below
> the media: a horizontal row of three outline icons evenly spaced on the
> left, a heart, a speech bubble and a paper plane. Below the icons: the
> comment area.
>
> ANIMATION SEQUENCE, in this exact order.
>
> 0.0 to 2.0 seconds. The square media panel fills with a beautiful abstract
> campaign visual: smooth flowing ribbons of vivid electric blue, deep
> indigo violet and bright magenta, with soft depth, gentle film grain and
> elegant light falloff, like a professionally art directed brand key
> visual. The panel scales gently from 96 percent to 100 percent and
> settles. The avatar and the username fade in.
>
> 2.0 to 3.0 seconds. A thin bright blue ring sweeps once clockwise all the
> way around the circular avatar and completes, marking the post going live.
> A soft light pulse travels outward from the card edge once and fades.
>
> 3.0 to 7.5 seconds. Engagement begins and builds. The outline heart icon
> scales up with a springy bounce and fills solid red. Then small solid red
> hearts pop into existence one after another near the heart icon and float
> gently upward across the lower half of the card, fading out as they rise,
> each at a slightly different speed and horizontal drift, overlapping so
> there are always two or three hearts in the air at once. They keep coming
> steadily through this whole stretch. There are no numbers, no digits and
> no counters anywhere in the frame.
>
> 4.5 to 8.0 seconds. Three comment rows slide up one after another from the
> bottom edge of the card, generously spaced apart, each landing with a
> gentle spring. Every row is a small solid circular avatar on the left in a
> distinct soft colour, one blue, one warm coral, one green, and to the right
> of it two short lines of sharp, crisp, perfectly legible dark grey text in
> a clean modern geometric sans serif, rendered large like real interface
> typography.
>
> The comment text reads exactly, word for word:
>
>   Row one: bold "sofia.mkt" then regular "need this"
>   Row two: bold "dan_makes" then regular "how do I get it"
>   Row three: bold "priya.co" then regular "just ordered"
>
> Spell every word exactly as written. Each row is fully typeset before it
> slides in and stays completely frozen and pixel identical afterwards. The
> text never types on, never re-renders, never shimmers, never wobbles and
> never reflows.
>
> 8.0 to 8.8 seconds. A direct message notification slides down into the top
> right corner: a small rounded white panel with a soft drop shadow, a
> circular gradient avatar, the short sharp legible words "New message" in
> dark grey beside it, and a small solid blue dot. It lands with a gentle
> bounce and then holds perfectly still.
>
> 8.8 to 10.0 seconds. Everything holds briefly, then the hearts, the
> comment rows and the notification all fade out smoothly together, and the
> media panel returns to exactly its opening appearance, so the final frame
> is identical to the first frame.
>
> VISUAL STYLE. Minimal premium flat vector interface design. Pure white
> card on warm off-white, generous white space, hairline separators, soft
> realistic shadows, perfectly rounded corners. The colour palette is
> restricted to vivid electric blue, deep indigo violet and bright magenta,
> plus solid red for the hearts and dark grey for text. Elegant, restrained
> and expensive looking, like a top tier design agency product film.
>
> CAMERA AND MOTION. The camera is completely locked and absolutely still.
> Only interface elements move. No camera push, no zoom, no pan, no
> parallax, no drift, no rotation, no floating. All motion is smooth,
> precise and physically weighted with gentle spring easing.
>
> TECHNICAL. Perfect seamless loop, the first and last frame are identical.
> Lighting is completely consistent throughout. Every element holds a stable
> position, size, colour and shape for its entire time on screen.
>
> TYPOGRAPHY. All text is sharp, correctly spelled and completely static.
> Type is set large with strong contrast against white. Letters must never
> crawl, morph, reshape, flicker, vibrate or change between frames. Once a
> word appears it stays pixel identical until it fades out.
>
> NEGATIVE, do not include any of the following: no numbers, no digits, no
> counters, no like counts, no follower counts, no statistics, no
> "Sponsored" label, no flickering, no warping, no morphing shapes, no
> wobbling, no jittering, no misspelled words, no gibberish text, no
> garbled typography, no fake letterforms, no tiny unreadable text, no hex
> codes, no colour codes, no hash symbols, no technical annotations in
> frame, no watermark, no logo, no brand marks, no faces, no people, no
> hands, no cursor, no emoji, no dark mode, no photographic imagery, no 3D
> perspective, no lens flare, no neon glow, no rainbow colours.

**Reads as:** a generated campaign post going live and gaining momentum —
hearts flooding in, people commenting, a DM arriving.

**Why the hearts work where the counter did not.** A counter asks the model
to draw *changing symbols*, which is the hardest thing it does; every frame
is a fresh chance to garble. Floating hearts ask it to draw *the same simple
shape moving*, which is what these models are best at. The meaning conveyed
is identical: engagement is climbing.

**On the timings.** The hearts (3.0 to 7.5s) deliberately overlap the
comments (4.5 to 8.0s), so engagement builds in parallel rather than in a
queue. Overlap is what makes it feel like real traction instead of a
checklist being ticked.

**Only three pieces of text remain:** the username, the three comment rows,
and "New message". Each is short, large, and completely static once placed —
which is the combination that survives generation. Everything else on screen
is a shape.

---


## 2 — WhatsApp (`campaignx-whatsapp.mp4`) · 10s · v2

### What changed from v1

- **The double ticks are gone.** Two tiny overlapping checkmarks are the
  hardest kind of shape to render at this scale — they smear into a grey
  smudge or wobble frame to frame. The "message delivered" beat is now
  carried by the bubble itself settling and brightening, which cannot
  garble.
- **Soft dimensional styling.** Bubbles now read as physical objects with
  real drop shadows and gentle rounded depth, rather than flat rectangles.
  The camera stays locked and the UI stays flat and light — this is depth
  and material, not a 3D scene.
- Every remaining element is a **shape** or a **short frozen label**.

### The prompt

> A 10 second vertical 9:16 motion graphics animation of a premium light
> theme messaging app interface, in the style of a high end product film.
> Clean modern UI on a soft off-white background, with gentle three
> dimensional depth: every chat bubble is a smooth rounded soft body object
> with subtle thickness, a soft realistic drop shadow beneath it and a
> delicate highlight along its upper edge, as though moulded from smooth
> matte material and resting slightly above the surface. Elegant, tactile
> and expensive looking. The interface itself stays flat and light; only the
> bubbles have dimension.
>
> LAYOUT, fixed and stable for the entire shot. A slim header across the
> top: a small circular avatar with a soft blue to violet gradient, and
> beside it the single word "northwave" in bold dark grey modern sans serif,
> with a hairline divider beneath. The middle of the frame is the
> conversation area. Along the bottom sits a rounded input bar with a small
> circular bright blue send button on its right.
>
> ANIMATION SEQUENCE, in this exact order.
>
> 0.0 to 1.0 seconds. The frame opens on the empty conversation area. The
> header avatar and username fade in gently.
>
> 1.0 to 3.5 seconds. An outgoing campaign message rises smoothly into the
> lower right of the conversation and settles with a soft spring, casting a
> gentle shadow as it lands. It is a rounded bright blue bubble containing a
> small square image panel filled with a beautiful abstract campaign visual:
> flowing ribbons of vivid electric blue, deep indigo violet and bright
> magenta with soft depth and gentle grain. Beneath the image inside the
> same bubble is one short line of sharp legible white text reading exactly
> "Spring offer inside".
>
> 3.5 to 4.3 seconds. The message registers as delivered: the blue bubble
> brightens very slightly and its shadow settles a little deeper, as if
> pressing into the surface. Nothing else changes. There are no checkmarks,
> no ticks and no status icons anywhere in the frame.
>
> 4.3 to 5.5 seconds. A small pale grey rounded bubble appears at the lower
> left with three soft grey dots inside it, and the dots pulse in sequence,
> one after another, indicating someone typing. The bubble has the same
> gentle depth and soft shadow as the others.
>
> 5.5 to 8.3 seconds. The typing bubble is replaced by a reply. A pale grey
> rounded bubble rises smoothly from the bottom left and settles with a soft
> spring, containing one short line of sharp legible dark grey text reading
> exactly "is this available today". A moment later a second, shorter grey
> bubble rises beneath it reading exactly "sending it now". As each arrives
> the conversation shifts upward by a small, gentle amount to make room, no
> more than a short distance, never a continuous scroll.
>
> All bubble text is fully typeset before its bubble appears and stays
> completely frozen and pixel identical afterwards. Spell every word exactly
> as written. The text never types on, never re-renders, never shimmers,
> never wobbles and never reflows.
>
> 8.3 to 9.0 seconds. The circular blue send button in the bottom input bar
> pulses once softly and settles.
>
> 9.0 to 10.0 seconds. All bubbles fade out smoothly together and the
> conversation area returns to exactly its empty opening appearance, so the
> final frame is identical to the first frame.
>
> VISUAL STYLE. Premium light interface design with soft dimensional
> objects. Warm off-white background, pure white input bar, hairline
> separators, generous spacing, perfectly rounded corners, soft realistic
> shadows with gentle falloff. The colour palette is restricted to bright
> blue for outgoing bubbles, pale warm grey for incoming bubbles, dark grey
> for text, and vivid electric blue through deep indigo violet to bright
> magenta inside the campaign image only. Calm, tactile, restrained.
>
> CAMERA AND MOTION. The camera is completely locked and absolutely still.
> Only interface elements move. No camera push, no zoom, no pan, no
> parallax, no orbit, no rotation, no perspective shift, no drift. All
> motion is smooth, precise and physically weighted with gentle spring
> easing, as though the bubbles have real mass.
>
> TECHNICAL. Perfect seamless loop, the first and last frame are identical.
> Lighting is completely consistent throughout, one soft light source from
> above. Every element holds a stable position, size, colour and shape for
> its entire time on screen.
>
> TYPOGRAPHY. All text is sharp, correctly spelled and completely static.
> Type is set large with strong contrast. Letters must never crawl, morph,
> reshape, flicker, vibrate or change between frames. Once a word appears it
> stays pixel identical until it fades out.
>
> NEGATIVE, do not include any of the following: no checkmarks, no ticks, no
> double ticks, no read receipts, no status icons, no timestamps, no
> numbers, no digits, no counters, no flickering, no warping, no morphing
> shapes, no wobbling, no jittering, no misspelled words, no gibberish text,
> no garbled typography, no fake letterforms, no tiny unreadable text, no
> hex codes, no colour codes, no technical annotations in frame, no
> watermark, no logo, no brand marks, no faces, no people, no hands, no
> cursor, no emoji, no dark mode, no photographic imagery, no glossy plastic
> reflections, no lens flare, no neon glow, no rainbow colours, no
> continuous scrolling.

**Reads as:** a campaign broadcast going out and a customer replying — the
conversation the campaign started.

**Why the ticks had to go.** Two small overlapping checkmarks are among the
worst shapes to ask for at this scale: they are thin, they touch, and they
change colour mid-shot. Any one of those alone invites smearing. The delivery
beat is now the bubble brightening and its shadow deepening — a change in
light rather than a change in symbol, which cannot garble.

**On the depth.** "Soft body object with subtle thickness, a soft realistic
drop shadow and a delicate highlight along its upper edge" gives dimension
without asking for a 3D scene. The negatives forbid orbit, perspective shift
and glossy reflections specifically, because those are what turn a tactile
flat UI into an unstable rendered object.

**Four short frozen labels only:** the username, and one line inside each of
the three bubbles. Everything else is shape and light.

---


## 3 — LinkedIn (`campaignx-linkedin.mp4`) · 8s

> Vertical 9:16 screen recording of a clean, modern light-theme professional
> feed on an off-white background, scrolling slowly and smoothly upward. Two
> post cards pass through frame: each has a small rounded avatar square, two
> short blurred text lines, and a wide landscape image panel filled with a
> soft blue-to-violet gradient. A thin engagement bar sits under each card,
> and small blue accents highlight as the cards pass the centre. The scroll
> is slow, even and continuous with no easing stutter and no bounce at the
> ends. Minimal flat corporate UI, lots of white space, sharp vector edges.
> Camera is locked; only the feed content moves. Seamless loop where the
> first and last frame are identical so the scroll appears endless. No
> flickering, no warping, no morphing text, no readable letterforms, no
> watermark, no logos, no faces, no people. Consistent soft lighting
> throughout. 8 seconds.

**Reads as:** a sponsored post moving through a feed.

---

## After generating

1. Drop the three MP4s in `public/videos/`.
2. Generate a poster frame for each (first frame, so there is no jump):

   ```bash
   for c in instagram whatsapp linkedin; do
     ffmpeg -i public/videos/campaignx-$c.mp4 -vframes 1 \
       -c:v libwebp -quality 82 public/videos/campaignx-$c-poster.webp
   done
   ```

3. Add the paths to each channel in `src/config/content.ts`:

   ```ts
   {
     name: "Instagram",
     output: "Story frame + square post",
     icon: "sparkles",
     mock: "story",
     src: "/videos/campaignx-instagram.mp4",
     poster: "/videos/campaignx-instagram-poster.webp",
   },
   ```

The `mock` field stays — it is the fallback if a file is ever missing.

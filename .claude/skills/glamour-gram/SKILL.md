---
name: glamour-gram
description: The charter and recipe for making a new Glamour Gram page and its gene, true to the site's founding intent. Use whenever choosing a topic for, writing, wiring in, testing or reviewing a Glamour Gram page, including the weekly scheduled run.
---

# Glamour Gram

This file is the charter and the recipe. Read all of it before choosing a topic. Where your own taste and this file disagree, this file wins. Where this file and the code disagree on a mechanical detail, follow the code and say so in the pull request.

## What it is

> Natural philosophy for the long dawn. Interactive pages about physics and wonder, and the futures we could spell into being. (README)

The first two pages set the intent. Reread them every time, not only the latest page:

- **I · Four Days Old.** If the age of stars were one human life, the universe would be four days old. "Everything is still ahead." Everything alive is a fall done well. The ladder of wholes has no top rung. Anything the laws of physics allow can be done, given the right knowledge (Deutsch).
- **II · The Three-Letter Spell.** Everything is written in three letters; what's scarce is the spelling. *Glamour* began as a Scots form of *grammar*: learning so deep it looks like enchantment.

Core convictions. A page may question one honestly, but never quietly drop them:

1. **We are early.** Optimism is earned from physics and evidence, never from hype.
2. **Understanding is the real magic.** Knowledge is the bottleneck, not the laws of physics.
3. **Suffering is the one quantity worth driving to zero.**
4. **Connection should leave both minds larger.**
5. **Wonder is renewable.** Every layer has another under it.

The practice from page I is the compass, and it is the home page's footer: **Zoom. Record. Lessen. Ride. Join.** Every page serves at least one of these five words.

## What makes a page a Glamour Gram

- It teaches by **play**: at least three instruments you learn from by using them, not charts to look at.
- It is **true first**: the wonder comes from accuracy.
- It has a **turn**: the last section brings the idea back to the reader's own mind, life or choices, and ends on a short closer line.
- It adds a **gene**. The home page (`index.html`) is a living organism. Each page is a cell on a golden-angle spiral, and zooming into a cell shows its sections. Each page adds one gene that changes how the whole organism behaves. Read in order, the genes are the spell the site is writing. A page without a gene isn't finished.

## Choosing a topic

A good topic has all of these:

- A true, surprising core that a curious adult can explore with their hands.
- Real science underneath: physics, biology, mind, time, decisions, cooperation, or the long future. Links between scales are welcome.
- A turn back to the reader.
- A new angle. It isn't one of the pages below. A new angle on an old subject links to the earlier page and adds something that page didn't have.

These are drift. Don't make them:

- News, product launches, company profiles, opinion columns, listicles, self-help without science, coding tutorials.
- Pages whose core can't be stated accurately without a partisan frame.
- Hype: "soon", "revolutionary", "will change everything". Say what is built, shown, drawn or still missing.
- A page that is mostly prose with an instrument bolted on.

**Pitch test.** Before building anything, write a three-sentence pitch: the surprising true thing, what the reader will do with their hands, and the turn. Then answer:

1. Which of Zoom, Record, Lessen, Ride, Join does it serve?
2. Is it new relative to the table below?
3. Can every load-bearing claim be sourced?
4. Is the wonder coming from accuracy rather than from hype?
5. Would the author of page I recognise it as the same site?

If any answer is no, choose again. Put the pitch and the answers in the pull request.

### Pages so far

Keep this table current: add a row whenever you add a page.

| # | File | Title | Hue | Gene | Core |
|---|------|-------|-----|------|------|
| I | `four-days-old.html` | Four Days Old | dawn | wave | The age of stars as one life; life as a fall done well; the ladder of wholes; the five-word practice |
| II | `three-letter-spell.html` | The Three-Letter Spell | sea | letters | Three particles spell everything; von Neumann's constructor; glamour began as grammar |
| III | `the-duet.html` | The Duet | dawn | duet | Two minds that predict each other fall into step; synchronised fireflies |
| IV | `specious-present.html` | The Specious Present | sea | echo | Live experiments that catch the brain editing time |
| V | `microcosm.html` | The Microcosm Next Door | ember | spores | Tardigrades, micrometeorites, powers of ten down to DNA |
| VI | `workarounds.html` | Nature's Workarounds | dawn | nest | The nitroplast, a brainless maze-solver, the hallmarks of aging, why aging was never fixed |
| VII | `price-of-a-mind.html` | The Price of a Mind | sea | mesh | Bus versus mesh computing; the energy cost of a mind; an open problem |
| VIII | `view-from-elsewhere.html` | The View from Elsewhere | ember | daydream | Moods as lenses; forecasting yourself; brain networks; a letter to a later you |
| IX | `every-path.html` | Every Path at Once | dawn | ray | Least time and every path: the lifeguard, Feynman's mirror, ants and a corgi that refract |
| X | `everyone-like-you.html` | Everyone Like You | sea | twin | Correlated choices: your twin, Hamilton's rule, Newcomb, the CHSH ceiling, tomorrow's you |
| XI | `missing-rungs.html` | The Missing Rungs | ember | rung | Human to posthuman: superintelligence, superhappiness, superhealth, rung by rung |

Next page: **XII**, hue **dawn**. From V onward the hues cycle ember, dawn, sea.

## Accuracy

- Verify every number, date, name and recent development with web search before you write it. Prefer primary sources: papers, official releases, registries.
- Cite in the text as (Author Year) or (Author et al. Year), and list every source in the footer in order of appearance.
- Date-stamp anything that moves fast: "as of October 2026".
- Say so, in the same sentence, when a result is from one lab, one patient, a small or uncontrolled trial, an unreplicated study or a company's own report.
- Keep finding, interpretation and speculation apart. Speculation goes in a callout headed "Speculation, flagged", or is labelled in the sentence: "That's an interpretation, and a contested one, not a finding."
- Never invent a quote, number or citation. If you can't verify it, leave it out.
- A toy model says it's a toy in its caption, and says how it differs from reality.
- On sensitive subjects (genetics, enhancement, psychiatric drugs, death), describe neutrally, attribute every claim, include the ethical concerns the researchers themselves raise, and never advocate.

## Voice

- Plain, short, declarative sentences, one idea each. Prefer full stops and colons to dashes.
- Concrete before abstract: a person, a year, a number, then the idea.
- Address the reader as "you". Let evidence carry the wonder.
- No exclamation marks and no "fascinating", "mind-blowing", "game-changer" or "revolutionary".
- Spell as the existing pages do: colour, centre, behaviour.
- Each section: an `.eyebrow` in capitals above an `h2` with the key words in `<em>`.
- End the page with a `.closer`: one or two sentences that land the turn.

## Page anatomy

Copy the structure of the most recent page rather than inventing a new one.

- **Head:** the same meta tags, manifest, icons, service-worker registration, font link and `glam.css` as the other pages, then a page-local `<style>` that opens with a `Layout:` comment describing the page.
- **Hero:** `header.hero` with `canvas#heroCanvas` (and an `aria-label`), the `.home.corner` link, eyebrow `Glamour Gram · N`, an `h1` title and a `p.lede`. The hero animation is the page's idea in motion. It keeps the title text clear, answers a tap, and has a still frame for reduced motion.
- **Sections:** five to eight, each with an `id`. The ids feed the home page's section organelles.
- **Instruments:** `.instrument` holding a canvas with an `aria-label`, `.controls`, a `.readout` of label and value pairs, a `p.say` with `aria-live="polite"`, and a `p.caption` that explains the model and its sources.
- **Callouts:** "Speculation, flagged", "How much weight it bears" and "Try this week", as needed.
- **Footer:** a `Sources:` paragraph and a `.next` row linking to the previous page and back to the home page.

## Code

- Plain HTML, CSS and JavaScript in one file plus the shared `glam.css`. No build step, no frameworks, no external scripts. Fonts only from the existing Google Fonts link.
- Start the script with the helper set from the last page (`C`, `reduce`, `$`, `fit`, `clamp`, `smooth`, `onScreen`, `animate`, `local`) and reuse it.
- Colours only from the tokens: `--night`, `--deep`, `--line`, `--ink`, `--mute`, `--dawn`, `--sea`, `--ember`.
- Every animation respects `prefers-reduced-motion` with a meaningful still frame, and pauses when off screen.
- Works at 360 px wide with no sideways scrolling.
- Controls are real buttons and inputs that work from the keyboard. Every canvas has a text equivalent nearby.
- Write long content to a file and append it, rather than through one giant shell heredoc.

## Wiring a page in

All of these are required:

1. `index.html`: append the page to `PAGES` as `{n, slug, title, hue, gene, hook, effect, sections}`.
2. `index.html`: add `motif[gene](x, y, R, t)`, the hero animation in miniature, drawn inside radius `R`.
3. `index.html`: add the gene's whole-organism behaviour to `render()` as `if(has("gene")) …`, with its function beside the other genes. It must fade when a cell is zoomed, respect reduced motion, and leave the other genes visible.
4. `sw.js`: add the file to `PAGES` and bump `VERSION`.
5. `icons/make-icons.js`: append the hue to `HUES`, then run `node make-icons.js` inside `icons/`.
6. `README.md`: add the page's line.
7. The previous page's footer: replace "Back to Glamour Gram" with a forward link, `N · Title →`.
8. This file: add the page to the table and update "Next page".

**Genes.** One new behaviour, visible at the overview zoom, that expresses the page's idea through the organism rather than decorating it. Name it with one lowercase word. Write the effect as one plain, literal sentence.

## Test before you ship

- In headless Chromium (Playwright is preinstalled: `require('playwright')`), load the new page and `index.html` at about 1200 px and 390 px wide, with normal and reduced motion. Press every button, move every slider, type into every input. There must be no console errors apart from the service-worker registration error on `file://`.
- Look at screenshots of the hero, every instrument and the home organism with the new gene. Fix overlapping or clipped text and unreadable labels.
- Check that every element id the script uses exists and that brackets balance.
- Reread the whole page once for accuracy only, and once for voice only.

## Deliver

- Work on a new branch from the latest `main`.
- One commit, titled like `Add page XI, The Missing Rungs, and the rung gene`, with a body in the style of the earlier commits: what the reader can do, what is flagged, the gene, and the service-worker and icon changes.
- Open a pull request containing the pitch, the five pitch-test answers, the instruments, the accuracy notes (what was verified, what was corrected, what is flagged) and the test results. **Do not merge it.** The owner reviews and merges.
- If the Artifact tool is available, publish a private preview of the page with `glam.css` as a supporting file, and put the link in the pull request and your summary.
- If you are cut short by usage or time, push what is finished to the branch and say exactly where you stopped.

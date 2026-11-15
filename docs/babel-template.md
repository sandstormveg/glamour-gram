# Babel → GlamGram: the climb template

*Design, 2026-11-15. For the Babel deck-builder in `sandstormveg/epistemic-atlas` (`assets/babel.js`, `docs/babel.md`) and the GlamGram site in this repository. Babel's side builds the export in §3; GlamGram's side builds `climb.html` from §4 onward.*

Reaching the top of an Epic climb should unlock a GlamGram page made from that climb, with no human or agent in the loop. This is the design for that.

## The short answer

- **Two kinds of page.** A climb page is not a numbered Glamour Gram. Numbered pages are curated, verified and each adds a gene to the organism (see `.claude/skills/glamour-gram/SKILL.md`). Climb pages are personal: generated, unnumbered and gene-free. They never enter the genome. A good climb can be *promoted*, but only through the normal pitch-first process.
- **No agent and no LLM.** Every sentence on a climb page is one of three things: a fact computed from the climb, a Wikidata/Wikipedia/Wikiquote fact shown with its source and date, or a hand-written sentence from a reviewed bank that is true for every climb that selects it. That keeps GlamGram's accuracy rule without a reviewer. It also closes a hole: Wikidata labels can be edited by anyone, so a model reading them could be prompt-injected. A template can't be.
- **Where it lives: both, precisely.** One static template, `climb.html`, lives in glamour-gram, shares `glam.css` and is precached for offline use. Each climb page is generated in the reader's browser from a climb record that Babel puts in the link's fragment (`climb.html#v1.…`). Nothing is committed per climb, and the record never reaches a server.
- **The hero is drawn, not a photo.** Every GlamGram hero is a canvas animation of the page's idea. A climb's hero is the climb itself: a five-band tower of the things you met, with the links you made drawn between them, solid where Wikidata says so and dashed where it's your own claim.
- **The contract carries provenance.** Every link says where its "why" came from: your proposal, a Wikidata relation, a shared ancestor, or the game's type system. The page draws and words each kind differently. Without that, a generated page can't tell your guess from a fact.

## 1. Why two kinds of page

The skill's charter puts accuracy first: every load-bearing claim is verified, speculation is flagged, and the owner reviews every page before it goes live. A page generated automatically from a game can't be web-verified, and nobody reviews it. There are two ways to square that:

1. Put a model in the loop to write and check prose. It would be slow, cost money on every climb, and could not be audited, and it reads Wikidata labels anyone can edit.
2. **Generate only sentences that are true by construction.** (Chosen.)

Option 2 limits what a climb page can say. That's the right trade: the page reports *your* climb and *Wikidata's* statements with their dates, and lets the hand-written bank supply the wonder and the turn.

The organism stays curated. Genes are the site's spell, one per numbered page. If every summit added a cell or a gene, the spell would turn to noise within a week. Climb pages:

- carry eyebrow **Glamour Gram · A climb**, not a numeral;
- are not in `PAGES` in `index.html`, not in the README list, and add no gene;
- link to the numbered page their turn echoes (§4.6), which is how they join the site.

**Promotion.** A good climb can become a numbered Glamour Gram, but only with a human in the loop:

1. At the end of the climb page's turn (§4.1, `#turn`), below *Try this week*, there's a quiet button: **Suggest as a Glamour Gram**.
2. It copies a short plain-text **climb seed**: the title, the summit Luminary and their masterwork, the floor themes, the longest bridge, any discoveries, and the climb's own link. If the clipboard is refused, it shows the seed in a text box to copy by hand.
3. The owner pastes the seed as a reply in a Thursday pitch session. That session pitches it in the usual format, and it has to pass the same pitch test as any other idea. If the owner picks it, the session builds it like any numbered page: every claim is verified again from primary sources, and the climb supplies only the topic.

Nothing is sent anywhere automatically. The seed is just text the owner chooses to paste. The skill's "Pitch first, build after a pick" section says how a session treats one.

## 2. Where it lives and how a climb gets there

| Piece | Lives in | Notes |
|---|---|---|
| `climb.html` (template) | glamour-gram, next to the other pages | Plain HTML + `glam.css`, no build, no external scripts. Added to `FILES` in `sw.js` (not `PAGES`) so it works offline. |
| Climb record | URL fragment, or a `.json` file | Babel builds it at the Epic summit (§3). |
| Climb pages | The reader's browser | Rendered from the record. Not committed, not indexed. |
| Your climbs list | glamour-gram's own `localStorage` | `climb.html` remembers climbs opened on this device (key `glamgram.climbs.v1`, up to 20). It is optional, and the page works without it. |

Babel is served from a different origin (Vercel) than GlamGram (GitHub Pages), so the two can't share storage. The handoff is the link:

```
https://sandstormveg.github.io/glamour-gram/climb.html#v1.<base64url(deflate-raw(JSON))>
```

- **Encoding.** `v1.` + base64url of the record's UTF-8 JSON, compressed with `CompressionStream('deflate-raw')`. If `CompressionStream` is missing, use `v1u.` + base64url of the uncompressed JSON. The template accepts both.
- **Why the fragment:** browsers never send it to a server, so the climb stays private until you share the link. It's also shareable and works offline.
- **Size budget.** Aim for 12 KB encoded or less, which survives most chat apps. The hard cap is 32 KB. Over the cap, Babel offers **Download climb (.json)**, and `climb.html` has **Open a climb file**. Both go through the same validation.
- **At the summit, Babel shows:** *Read your climb* (opens the link in a new tab), *Copy link* and *Download climb*.
- **Which climbs unlock a page.** An Epic summit always unlocks one. A classic (3-floor) summit unlocks one only if the player turns on **Classic climbs make a page** in Babel's ⚙ Settings. It's off by default and stored as `classicPage: false` in `infodex.babel.settings.v1`, beside `carry`. The template renders either mode, because `source.mode` says which.
- **Link previews** (chat apps, social sites) only see the generic template, because the fragment isn't sent. That's expected.

## 3. The data contract: `glamgram.climb/1`

GlamGram owns the contract, and Babel exports to it. The record is a snapshot taken at the summit, so the page never needs Wikidata or the Infodex to render. Every fact the page shows is in the record with its `as_of` date.

### 3.1 Example

Illustrative only. The Q-ids are real. The descriptions are abbreviated, and the sitelink counts and the climb itself are made up.

```json
{
  "schema": "glamgram.climb/1",
  "as_of": "2026-11-15T09:12:00Z",
  "source": { "app": "babel", "version": "2026-11-15", "mode": "epic" },
  "climb": {
    "id": "k3Xq9w2m",
    "started": "2026-11-15T07:40:00Z",
    "finished": "2026-11-15T09:12:00Z",
    "summit": true,
    "floors": 5,
    "galleries": 47,
    "best_chain": { "n": 14, "why": "polonium · is studied in · radioactivity" },
    "pages": 212
  },
  "items": {
    "Q897":  { "label": "gold", "desc": "chemical element with symbol Au and atomic number 79", "type": "MATTER", "sitelinks": 230 },
    "Q979":  { "label": "polonium", "desc": "chemical element with symbol Po and atomic number 84", "type": "MATTER", "sitelinks": 170 },
    "Q1128": { "label": "radium", "desc": "chemical element with symbol Ra and atomic number 88", "type": "MATTER", "sitelinks": 170 },
    "Q7186": { "label": "Marie Curie", "desc": "Polish and naturalised-French physicist and chemist", "type": "FIGURE", "sitelinks": 260,
               "born": { "y": 1867, "p": 11 }, "died": { "y": 1934, "p": 11 } },
    "Q1035": { "label": "Charles Darwin", "desc": "English naturalist", "type": "FIGURE", "sitelinks": 250,
               "born": { "y": 1809, "p": 11 }, "died": { "y": 1882, "p": 11 } }
  },
  "floors": [
    { "n": 1, "name": "The Near Shelves", "hops": [1, 2], "met": ["Q897"], "archetype": null,
      "scholars": [{ "q": "Q1035", "works": [] }],
      "luminary": null },
    { "n": 5, "name": "The Summit", "hops": [5, null], "met": ["Q979", "Q1128"], "archetype": null,
      "scholars": [],
      "luminary": {
        "q": "Q7186",
        "ties": [{ "q": "Q979", "rel": "P61" }, { "q": "Q1128", "rel": "P61" }],
        "team": ["Q1128", "Q979"],
        "masterwork": "Q979",
        "lesson": {
          "quote":   { "text": "Nothing in life is to be feared, it is only to be understood.", "wikiquote": "Marie Curie" },
          "summary": { "text": "Marie Curie was a physicist and chemist who conducted pioneering research on radioactivity.", "wikipedia": "Marie Curie" },
          "learned": true
        }
      } }
  ],
  "summit": "Q7186",
  "deck": [
    { "q": "Q897", "finish": "foil", "from": "starter" },
    { "q": "Q7186", "finish": "prismatic", "from": "mentor" }
  ],
  "links": [
    { "a": "Q979", "b": "Q7186", "why": "polonium · comes from · Marie Curie", "basis": "relation", "lens": "origin", "floor": 5, "times": 3 },
    { "a": "Q897", "b": "Q1035", "why": "your link: gold ↔ Charles Darwin", "basis": "player", "discovery": true, "floor": 3, "times": 1 }
  ],
  "kept": { "caught": ["Q979"], "mentors": ["Q7186"] }
}
```

The example shows two of the five floors to keep it short. A real Epic record has all five.

### 3.2 Fields

All keys are lower case. Every Q-id is a key of `items`, so labels and descriptions appear once and everything else refers to them by id.

| Field | Type | Req. | Meaning, and where it comes from in Babel |
|---|---|---|---|
| `schema` | `"glamgram.climb/1"` | ✓ | Contract version. A breaking change bumps the major version, and the template refuses majors it doesn't know. |
| `as_of` | ISO 8601 time | ✓ | When the facts were snapshotted, usually the summit time. The page prints it beside every Wikidata fact. |
| `source` | `{app, version, mode}` | ✓ | `mode`: `"epic"` (5 floors) or `"classic"` (3). |
| `climb.id` | string `[A-Za-z0-9]{6,16}` | ✓ | Random id. Also seeds the page's layout, so the same climb always draws the same. |
| `climb.started` / `finished` | ISO 8601 time | ✓ | `run.stats.started` and the summit time. |
| `climb.summit` | boolean | ✓ | `run.win`. The template only renders summit climbs. |
| `climb.floors` | 1–5 | ✓ | Number of floors. Babel's code calls a floor `run.act`. |
| `climb.galleries` | integer | ✓ | Galleries explored (`run.floor`). This is **not** the floor count. |
| `climb.best_chain` | `{n, why}` | – | `run.stats.maxChain` and `chainWhy`. |
| `climb.pages` | integer | – | Ex Libris pages earned on this climb. |
| `items[q]` | object | ✓ | Snapshot of each Wikidata item the page may mention. See §3.3. |
| `floors[]` | array, in order | ✓ | One entry per floor climbed. See §3.4. |
| `summit` | Q-id | ✓ | The last floor's Luminary. |
| `deck[]` | `{q, finish, from}` | ✓ | The final deck, without basics. `from` is one of `starter`, `caught`, `reward`, `shop`, `mentor`, `event`. |
| `links[]` | array | ✓ | Distinct pairs joined on the climb. See §3.5. May be empty. |
| `kept` | `{caught[], mentors[]}` | ✓ | From `run.stats.caught` and `run.stats.mentors`. |

### 3.3 `items`

| Key | Type | Notes |
|---|---|---|
| `label` | string ≤ 80 | English label as Babel showed it. Items whose only label is their Q-id are left out. |
| `desc` | string ≤ 160 | Wikidata description, if any. The first thing to drop when trimming for size. |
| `type` | Babel type | `FORCE`, `COSMOS`, `LIFE`, `MATTER`, `CRAFT`, `MIND`, `MYTH`, `FIGURE`, `REALM`, `EVENT`, `CULTURE` or `WILD`. Only `FIGURE` matters for "people". |
| `sitelinks` | integer | Wikipedia articles about the item. Used to rank fame (§4.5). Babel already queries it. |
| `born`, `died` | `{y, p}` | People only. `y` is the year as an integer, negative for BCE. `p` is Wikidata's precision: 7 century, 8 decade, 9 year, 10 month, 11 day. Leave out what isn't known. |
| `rarity` | string | Optional: Babel's rarity, for the hero's star sizes. |

Not in v1: images. Commons licences vary and need the artist and licence for credit. They can come in a later version as `image: {file, licence, artist}` and be shown only when all three are present.

### 3.4 `floors[]`

| Key | Type | Notes |
|---|---|---|
| `n` | 1–5 | Floor number. The page shows it in Roman numerals, as Babel does. |
| `name` | string ≤ 40 | The floor's theme: Babel's floor song names, such as *The Near Shelves*, *The Far Stacks* and *The Upper Galleries*, plus the two new Epic floors. |
| `hops` | `[min, max\|null]` | Frontier distance foes were drawn from: floor I `[1,2]`, II `[2,3]`, III `[3,null]`, and Epic's own bands. |
| `met` | Q-ids, in order met | `run.actMet` for this floor: everything fought. Note that `run.met` is every item met, not only scholars. |
| `archetype` | Q-id or null | The floor's Archetype if one was understood (`run.archSeen`). The class goes in `items` too. |
| `scholars[]` | `{q, works[]}` | Scholars fought at Crossroads. `works` is their team, as `{q, rel}`, where `rel` is the property that tied them: `P61`, `P170`, `P50`, `P138`, `P86`, `P84`, `P112` or `P800`. |
| `luminary` | object or null | The floor boss. `q`; `ties[]` as `{q, rel}` (the intro's "discovered polonium" lines); `team[]` in the order fought; `masterwork`; and `lesson`. |
| `luminary.lesson` | object | `quote: {text ≤ 300, wikiquote: page title}`, `summary: {text ≤ 400, wikipedia: page title}`, `learned: boolean` (answered right, so they became a Mentor). Leave out any part Babel didn't load. |

### 3.5 `links[]`: provenance is the point

Babel's `linkBetween()` already knows why two cards link. Export that reason, not just the sentence:

| `basis` | Babel's link | Chain + | On the page |
|---|---|---|---|
| `player` | *Your link*: proposed this climb (`run.links`) or a Dex bridge | 4 | **Dashed** line. Worded as yours: "your link". If `discovery: true` (`linkStatus` found it uncharted), add: "when you made it, Wikidata didn't link them". |
| `relation` | *Linked*: one names the other in its relations (`nb`) | 3 | **Solid** line. Worded as Wikidata's statement, with the `as_of` date. `lens` is the `nb` kind: `madeof`, `found`, `origin`, `does`, `kin`, `fields` or `branches`. |
| `ancestry` | *Linked*: one is in the other's ancestry ("X is a Y") | 3 | **Solid** line. Wikidata's classification. |
| `shared` | *Kin*: "both are Z", a specific shared ancestor | 2 | **Faint** solid line. Worded "both are Z". |
| `type` | Same Babel type | 1 | **Not exported.** That's the game's classifier, not a fact about the world. |

| Key | Type | Notes |
|---|---|---|
| `a`, `b` | Q-ids | For `relation`, `a` is the subject of `why`: Babel's `why` already puts the naming side first. |
| `why` | string ≤ 160 | Babel's sentence, verbatim, for example "gold · is made of · …" or "both are Fungi". |
| `basis` | see above | ✓ |
| `lens` | string | `relation` only. |
| `discovery` | boolean | `player` only. |
| `floor` | 1–5 | Floor where the pair was first joined. |
| `times` | integer | How many times the pair chained. Pairs are deduplicated in either order. |

Selection when Babel trims: all `player` links first, then `relation`, `ancestry` and `shared`, each by `times`. Cap at 30.

### 3.6 Babel's export rules

1. **Only Wikidata-derived content and your own climb.** Don't export anything personal from the Infodex: no Pondering questions, no Insight text, no names. A shared link must be safe to share.
2. **Snapshot, don't reference.** Put everything the page shows into the record. The template makes no network calls (§7).
3. **Trim in this order** until the record fits: descriptions → `shared` links → scholars' `works` beyond two → items no longer referenced → the summary. Keep `summit`, all floors and all `player` links.
4. **Limits:** `items` ≤ 90, `links` ≤ 30, people (`FIGURE` items) ≤ 16, `floors` ≤ 5, plus the string lengths above. Anything over a limit is cut at a word boundary with "…".
5. **Determinism:** the same run exports the same bytes, with keys and arrays in a stable order. Test it.

## 4. The page

It follows the skill's anatomy (hero, five to eight `id`'d sections, instruments, callouts, a sourced footer) and its voice: plain declarative sentences, numbers before adjectives.

### 4.1 Order

The page follows the ascent, because it's a record of something you did ("Record", in the site's practice), and it ends on the turn:

| § | `id` | Eyebrow / heading | Included when | Instrument |
|---|---|---|---|---|
| Hero | – | **Glamour Gram · A climb** / title (§4.4) | always | The tower (§4.2) |
| 1 | `climb` | *The ascent* / {Five} floors, *farther out* | always | **Floor by floor**: a slider through the floors. Readouts: floor, hop band, things met, Archetype, Luminary. The tower highlights the floor. |
| 2 | `people` | *Who you met* / A conversation *across centuries* | ≥ 2 people with a `born` year | **Timeline**: people placed by birth year, with their works under them. Drag to read. Readout: years spanned. Otherwise a plain list. |
| 3 | `joined` | *What you joined* / The *links* you made | ≥ 3 links | **Link web**: a draggable force layout. Solid, faint and dashed lines as in §3.5, and the longest bridge (§4.5) lit. Otherwise a short list. |
| 4 | `summit` | *At the top* / Meeting *{summit label}* | always | None: the summit card, ties, masterwork and lesson. |
| 5 | `kept` | *What you kept* / Into *the Dex* | `kept` not empty | None: caught specimens and Mentors. |
| 6 | `turn` | *The turn* / (from the bank) | always | None: the turn, the closer, *Try this week*, and the numbered page it echoes. |
| Footer | – | Sources | always | Every item linked to `https://www.wikidata.org/wiki/{q}`, plus licences (§4.7). |

That's three instruments, the skill's minimum, and each one teaches by being played with.

### 4.2 The hero: the tower

No photograph. The hero is the climb drawn as a tower of `floors` horizontal bands, floor I at the bottom.

- **Stars.** Each item in `floors[].met` is a star in its floor's band. Its x position comes from a seeded hash of its Q-id, and its size from `rarity`, or else from `log(sitelinks)`. People are ringed. Each Luminary sits at the crown of its band, and the summit Luminary at the top, where the bands narrow like Babel's tower.
- **Lines.** `links` drawn between their stars: solid for `relation` and `ancestry`, faint for `shared`, dashed for `player`. These match the built, shown and drawn rungs on page XI.
- **Motion.** On load the ascent replays: stars light floor by floor and lines draw in order of `floor`, then `times`. Tap to replay. Reduced motion shows the finished tower.
- **Colour.** Tokens only. Floors cycle sea → dawn → ember from the bottom up, and dashed lines are ink.
- **Determinism.** A PRNG seeded from `climb.id`, so a shared link always shows the same tower.

### 4.3 Accuracy rules for generated text

These are the generator's version of the skill's accuracy section. Tests enforce them (§8).

1. **Three sources only:** computed facts about the climb; snapshot facts with their source and `as_of` date; and bank sentences whose selection rule guarantees they're true.
2. **No free-form generation.** Every sentence is a template with typed slots.
3. **Superlatives only about the climb.** "Your longest bridge" is fine. "The first" or "the greatest" said about the world is never fine.
4. **Basis decides wording.** A `relation` link: "Wikidata records that …". A `player` link: "you linked …". A `shared` link: "both are …".
5. **Quotes as attributed.** "Wikiquote attributes to Marie Curie: …", because Wikiquote's attributions vary in quality.
6. **Dates by precision.** Show 1867 at precision 9 or more, "the 1860s" at 8, and "the 19th century" at 7. BCE years say BCE.
7. **Plurals and zeros are handled.** Never "1 people", never "0 links". A section's inclusion rule removes it rather than print an empty claim.

### 4.4 Title and lede

**Title.** Use the first rule that applies, then capitalise the first letter of each label:

1. "From *{anchor}* to *{summit}*". The anchor is the starter that appears in the most `links`; on a tie, the first starter. Example: *From Gold to Marie Curie*.
2. "*{floors}* Floors to *{summit}*". Example: *Five Floors to Marie Curie*.

**Lede.** Up to three computed sentences:

- "You climbed {floors in words} floors, from {anchor} to {summit}."
- If there are 2 or more people: "On the way you met {n} people whose births span {span} years."
- If there are 1 or more links: "You joined {k} pairs of things." If any are discoveries, add: "{d} of those joins are yours alone: when you made them, Wikidata didn't link them."

### 4.5 Selection rules

Picks are deterministic, so the same record always gives the same page:

- **The famous and the obscure.** In *Who you met*, feature two people: the one with the most `sitelinks`, and the one with the fewest who still has at least one work. "The one you'd have heard of, and the one you wouldn't." This is the site's "Zoom" in miniature: wonder in what's overlooked.
- **The longest bridge.** The `links` pair whose endpoints are furthest apart in time, using `born` years for people and leaving out undated items. If no pair qualifies, use the first discovery; if there's none, the most-chained `relation` link. It gets the hero's brightest line and a sentence in *What you joined*: "Your longest bridge spans {n} years: {why}."
- **Masterwork.** The summit section leads with `luminary.masterwork`, then the other `ties`.
- **Ties broken** by Q-id order. Never at random.

### 4.6 The turn bank

These are written once, by hand, in GlamGram's voice and reviewed like a numbered page. A climb only selects. The first rule that matches wins. Each entry has the turn, a closer, a *Try this week* line, and the numbered page it echoes.

| # | Selected when | Turn | Closer | Try this week | Echoes |
|---|---|---|---|---|---|
| T1 | any `discovery: true` | Your dashed lines are guesses nobody has written down yet. A guess becomes knowledge when someone else can check it. Wikidata is open: anyone can add a statement, with a source. | A link nobody has written down is a rung drawn, not built. | Pick one dashed link and look for a source that would make it solid. | XI · The Missing Rungs |
| T2 | summit `lesson.learned` | You answered {summit}'s question, and they came down the tower with you as a card. That's how one mind joins another it never met: what one found, the other now knows. | Learning is how you join a mind that has gone. | Read something {summit} wrote, in their own words. | I · Four Days Old (Join) |
| T3 | people span ≥ 500 years | The people you met were born {span} years apart, and you met them in one sitting. Writing does that: a memory is a footprint pointing back to its cause. | Leave a trace that points at something worth finding. | Find the oldest person you met and read one page about how we know what they did. | I · Four Days Old (Record) |
| T4 | ≥ half the links have `lens: madeof` | Most of what you joined, you joined by what it's made of. Follow "made of" far enough through anything you can hold and it ends in the same three letters: up quarks, down quarks and electrons. | Everything you held on this climb was spelled in three letters. | Pick one thing on your desk and follow "made of" down as far as you can. | II · The Three-Letter Spell |
| T5 | always (default) | Each floor drew its foes from farther out: by the top, from things {last hops}+ steps from your own cards. Most of them you'd never met, and you climbed past them by knowing how things relate. | Wonder is renewable: every layer has another under it. | Open your Dex, choose a card, and look one layer under it. | I · Four Days Old (Zoom) |

New entries go through a pull request with their selection rule and a fixture that triggers them.

### 4.7 Footer: sources and licences

- **Sources:** every Q-id on the page, in order of appearance, as "label (Q-id)" linking to Wikidata, then: "Facts from Wikidata as of {as_of}. Wikidata is CC0."
- **If a lesson is shown:** "Quotation from Wikiquote, '{page}'. Summary from Wikipedia, '{page}'. Both are CC BY-SA 4.0." Link both pages; build the URLs from the titles.
- "Made from a Babel climb on {finished}. Dashed links are the climber's own."
- `.next` row: back to Glamour Gram, plus the echoed numbered page.

## 5. Gene question, settled

A climb adds **no gene** and no cell to the shared organism. A backlog idea (§11) could show *your* climbs on *your* copy of the home page as small personal spores, read from glamour-gram's own `localStorage` (§2) and never written to the repository. That would make the organism personal without touching its spell. It isn't part of v1.

## 6. Code

The template follows the skill's code rules: one HTML file plus `glam.css`, the shared helpers, tokens only, reduced motion, 360 px wide, real controls and `aria-label`s. Specific to the template:

- **Pipeline:** read the fragment (or file), decode, inflate, parse, validate (§7), normalise into a view model, then render. Each step is a plain function you can test.
- **Errors are pages, not crashes.** An unreadable, invalid or newer-schema record shows a short explanation and a link back to Babel. A climb that never reached the summit says so and offers nothing else.
- **No network for data.** Fonts come from the existing link. Data comes only from the record.

## 7. Security

The fragment is attacker-controlled: anyone can hand someone a crafted link, and Wikidata text is editable by anyone. So:

1. **Never insert record data as HTML.** Use `textContent` and `createElement` only. Never `innerHTML`, `insertAdjacentHTML` or `document.write` with record data.
2. **Build every URL yourself** from validated ids and titles (`https://www.wikidata.org/wiki/` + Q-id; `https://en.wikiquote.org/wiki/` + `encodeURIComponent(title)`). Never use a URL taken from the record.
3. **Validate strictly.** Q-ids match `^Q[1-9][0-9]{0,9}$`. Every field has the type, enum or range in §3. Strings are cut to their limits. Unknown keys are ignored. Every Q-id referenced must exist in `items`. A record that fails validation is refused, never partly rendered.
4. **Bound the work.** Refuse fragments over 32 KB, or more than 256 KB after inflating. Cap the force layout's iterations.
5. **Content Security Policy** as a `<meta>` tag, since GitHub Pages can't set headers: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'none'; base-uri 'none'; form-action 'none'`.

## 8. Testing

**In glamour-gram, `tests/climbs/`, as fixtures plus a Playwright script:**

| Fixture | Checks |
|---|---|
| `epic-typical.json` | All sections render. Three instruments respond. No console errors at 1200 and 390 px, with normal and reduced motion. |
| `epic-max.json` | Every limit at once. Encoded size stays under the 32 KB cap. Layout holds. |
| `minimal.json` | Summit, one floor, no links, one person. The *Who you met* and *What you joined* sections fall back, and nothing reads "0" or "1 people". |
| `discoveries.json`, `madeof.json`, `ancient.json`, `mentor.json` | Each triggers its turn (T1 to T4). A plain record triggers T5. |
| `hostile.json` | Labels holding `<script>`, `<img onerror>` and `javascript:`; 10,000-character strings; malformed Q-ids; missing references; wrong types. Expect a refusal page. No element is created from record text, and every `href` starts with an allowed prefix. |
| `schema-2.json`, `not-summit.json` | Their explanation pages. |

The script loads each fixture both through the fragment and through *Open a climb file*.

**In Babel:** a saved Epic run fixture → `toClimbRecord(run)` validates against this contract, fits the budget, and gives the same bytes twice.

## 9. Build order

1. **Babel:** `toClimbRecord(run)` per §3, `encodeClimb()`, and the three summit buttons. Commit a sample record from a real Epic climb to `tests/climbs/` here, in this repository, as the first fixture.
2. **GlamGram:** `climb.html`, the fixtures and the test script, the turn bank as reviewed copy, and `sw.js` (`climb.html` added to `FILES`, `VERSION` bumped).
3. **End to end:** a real Epic summit opens the deployed template with the right page.
4. **Promotion** ships with v1: the *Suggest as a Glamour Gram* button (§1) in `climb.html`, and the matching line in the skill.

Everything else is in the backlog (§11).

## 10. Decisions (Silica, 2026-11-15)

- **Classic climbs:** a Babel setting, *Classic climbs make a page*, off by default. Epic summits always make one (§2).
- **Promotion:** yes. A climb can be suggested as a numbered Glamour Gram, through the Thursday pitch session (§1).
- **Showing who climbed:** not in v1. It's in the backlog.

## 11. Backlog

Ideas that are agreed in spirit but not scheduled. Each one needs its own design note before it's built.

- **Who climbed.** An optional name on a climb page. If built, it should be off by default and typed fresh for each climb, never taken from the Infodex account. The page should warn that a link with a name in it is personal data once shared.
- **Personal spores.** Your climbs shown on your own copy of the home organism, read from glamour-gram's `localStorage` and never committed (§5).
- **Images.** Portraits and specimen photos from Wikimedia Commons, shown only when the record carries the file, licence and artist (§3.3).

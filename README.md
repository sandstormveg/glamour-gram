# Glamour Gram

Natural philosophy for the long dawn. Interactive pages about physics and wonder, and the futures we could spell into being.

The home page is a living organism. Each page is a cell you can zoom into, then into its sections. Each page also adds one gene that changes how the whole organism moves, so the home page grows with every new page. Read in order, the genes are the site's spell.

- **I · Four Days Old**: ride an endless wave, zoom into the age of stars, and climb the ladder of wholes.
- **II · The Three-Letter Spell**: everything is written in three letters (up quark, down quark, electron). Learning to spell in them is the closest thing to real magic.
- **III · The Duet**: two minds that predict each other fall into step without becoming one. Tap with a partner, sync sixty fireflies.
- **IV · The Specious Present**: four live experiments that catch your brain editing time.
- **V · The Microcosm Next Door**: tardigrades in the moss, stardust in the gutter. Zoom from a moss cushion down to DNA.
- **VI · Nature's Workarounds**: a swallowed bacterium turned nitrogen factory, a brainless maze-solver, and the twelve hallmarks of aging.
- **VII · The Price of a Mind**: von Neumann machines shuttle data while tissue computes where it stands. What would a mind cost in watts, and an open problem.
- **VIII · The View from Elsewhere**: you can't see the state you're in. Wear a lens until it fades, forecast your own mood, heat a landscape of mind-states, and write a letter to a later you.
- **IX · Every Path at Once**: light, a corgi and a column of ants all find the fastest way across a border, and none of them can see it. Race a lifeguard, scrape a mirror into a grating, grow an ant trail, and play fetch with Elvis.
- **X · Everyone Like You**: copies cooperate with no message and no second meeting, and genes found out first. Play your twin and Newcomb's boxes, watch Hamilton's rule decide a dish, bend a forecast its subject can hear, and play the game physics caps at 85%.
- **XI · The Missing Rungs**: the road from human to posthuman as it stands. A living timeline of what's built, shown, drawn and still missing for mind, mood and body, kept up to date. Then run the arithmetic of escape velocity, measure your own bandwidth, and ride the treadmill inside.
- **XII · The Way Out Looks Wrong**: some problems are deceptive, and every step toward the answer leads into a trap. Spin Maxwell's colour top, run Dijkstra's twenty-minute frontier through a cave grown from a few rules, race two kinds of evolution through a deceptive maze, and sort what physics says can and can't be done.
- **XIII · The Editable Body**: how editable is a living body, easiest to hardest? Aim a base editor at one letter to mend a baby's liver, lift the BCL11A brake to wake a sleeping gene and round out sickled blood, paint the voltage that tells a flatworm where to grow a head, push ten thousand tiny dials for height into shrinking returns, and delete genes from the smallest living cell until you hit the ones that are essential and unknown.

**Climb pages.** `climb.html` is not a numbered page. It builds a page in your browser from a climb in Babel (the deck-builder in the Infodex): at an Epic summit, Babel's *Open your GlamGram* opens `climb.html` with the climb carried in the link's fragment, which never reaches a server. Climb pages add no gene. A good one can be suggested as a numbered Glamour Gram, through the Thursday pitch. Design: `docs/babel-template.md`. Tests: `node tests/climbs/climb.test.js` (needs Playwright).

Plain HTML, no build step. Pages III onward share `glam.css`. Served with GitHub Pages from the `main` branch.

It's also an installable app, GlamGram, that works offline: `manifest.webmanifest` and the service worker `sw.js`. The icons are drawn by `icons/make-icons.js` (run `node make-icons.js` in `icons/`).

// Tests for climb.html: a record shaped like a real Epic climb (The Machinery of Life), packed the way Babel packs it.
// Run from anywhere with Playwright installed: node tests/climbs/climb.test.js. Serves the repository on 127.0.0.1 and writes
// screenshots and the sample record to a temp folder. The Q-ids are illustrative: the page is tested, not Wikidata.
const {chromium} = require('playwright');
const {spawn} = require('child_process');
const zlib = require('zlib'), fs = require('fs'), path = require('path'), os = require('os');
const ROOT = path.resolve(__dirname, '..', '..'), S = fs.mkdtempSync(path.join(os.tmpdir(), 'glamgram-climb-')) + path.sep;
const b64u = buf => buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const pack = rec => 'v1.' + b64u(zlib.deflateRawSync(Buffer.from(JSON.stringify(rec))));
const packPlain = rec => 'v1u.' + b64u(Buffer.from(JSON.stringify(rec)));

const deck = [['Q7868','Cell','LIFE'],['Q7430','Deoxyribonucleic acid','MATTER'],['Q8054','Protein','MATTER'],['Q7187','Gene','REALM'],['Q8047','Enzyme','MATTER'],
  ['Q898483','Protein tertiary structure','WILD'],['Q11053','Ribonucleic acid','MATTER'],['Q1564644','Foundation series','CULTURE'],['Q1035','Charles Darwin','FIGURE'],
  ['Q20124','On the Origin of Species','CULTURE'],['Q123619','Nucleic acids','MATTER'],['Q37970','Gregor Mendel','FIGURE'],['Q7162','Genetics','LIFE'],['Q31151','Population genetics','LIFE'],
  ['Q16424695','Meiosis','LIFE'],['Q60535862','Nucleic acid double helix','FORCE'],['Q7474','Rosalind Franklin','FIGURE'],['Q123280','Francis Crick','FIGURE'],['Q3939311','Positronic robot','MYTH']]
  .map(([q, l, type]) => ({q, l, type, rarity: 'common', lv: 0}));
const met = [['Q898483','Protein tertiary structure',1],['Q11053','Ribonucleic acid',1],['Q393018','I, Robot',1],['Q1564644','Foundation series',1],['Q105252429','Protein chemistry',1],
  ['Q20124','On the Origin of Species',1],['Q123619','Nucleic acids',2],['Q185055','Mendelian inheritance',2],['Q7162','Genetics',2],['Q31151','Population genetics',2],
  ['Q246128','Cytogenetics',3],['Q16424695','Meiosis',3],['Q85209825','RNA motif',3],['Q178593','Macromolecule',4],['Q60535862','Nucleic acid double helix',4],
  ['Q5208161','Daedalus; or, Science and the Future',5],['Q116918315','Life Itself: Its Origin and Nature',5]].map(([q, l, f]) => ({q, l, f}));
const L = (a, al, b, bl, why, basis, floor, times, lens) => ({a, b, al, bl, why, basis, lens: lens || null, floor, times});
const links = [
  L('Q7430','Deoxyribonucleic acid','Q123619','Nucleic acids','Deoxyribonucleic acid is a nucleic acid','ancestry',2,6),
  L('Q60535862','Nucleic acid double helix','Q7430','Deoxyribonucleic acid','Nucleic acid double helix · names · nucleic acid, which Deoxyribonucleic acid is','name',4,3),
  L('Q11053','Ribonucleic acid','Q7430','Deoxyribonucleic acid','both are nucleic acid','shared',1,4),
  L('Q8054','Protein','Q8047','Enzyme','Enzyme is a protein','ancestry',1,5),
  L('Q7187','Gene','Q7430','Deoxyribonucleic acid','Gene · is made of · Deoxyribonucleic acid','relation',2,3,'madeof'),
  L('Q7162','Genetics','Q7187','Gene','Genetics · is studied in · Gene','relation',2,2,'fields'),
  L('Q31151','Population genetics','Q7162','Genetics','Population genetics · names · Genetics','name',2,2),
  L('Q16424695','Meiosis','Q7868','Cell','both are found in cell nucleus','shared-rel',3,2),
  L('Q20124','On the Origin of Species','Q1035','Charles Darwin','On the Origin of Species · comes from · Charles Darwin','relation',1,1,'origin'),
  L('Q3939311','Positronic robot','Q1564644','Foundation series','your link: Positronic robot ↔ Foundation series','player',3,1)];
const base = {schema: 'babel.climb/2', made: '2026-11-15T22:38:24.977Z', started: '2026-11-15T10:07:27.954Z', win: true, mode: 'epic', theme: 'The Machinery of Life',
  floors: ['The Near Shelves','The Far Stacks','The Upper Galleries','The High Reading Rooms','The Summit Stacks'].map((name, i) => ({n: i + 1, name})), galleries: 50,
  luminaries: [['Q1035','Charles Darwin','On the Origin of Species'],['Q37970','Gregor Mendel',null],['Q199654','Barbara McClintock',null],['Q7474','Rosalind Franklin',null],['Q123280','Francis Crick','Life Itself: Its Origin and Nature']]
    .map(([q, l, work], i) => ({q, l, work, floor: i + 1, arena: 'field'})),
  mentors: [['Q1035','Charles Darwin'],['Q37970','Gregor Mendel'],['Q199654','Barbara McClintock'],['Q7474','Rosalind Franklin'],['Q123280','Francis Crick']].map(([q, l]) => ({q, l})),
  deck, met, links, proposed: [], discoveries: [], bestChain: {n: 23, why: 'Protein · shares parent · Ribonucleic acid'},
  caught: [['Q898483','Protein tertiary structure'],['Q11053','Ribonucleic acid'],['Q31151','Population genetics'],['Q16424695','Meiosis']].map(([q, l]) => ({q, l, n: true})),
  relics: ['net','encyclo']};
const noOwn = JSON.parse(JSON.stringify(base)); noOwn.links = noOwn.links.filter(x => x.basis !== 'player');
const v1 = JSON.parse(JSON.stringify(base)); v1.schema = 'babel.climb/1'; v1.links = [['Q1','Q2']]; v1.met = v1.met.map(m => ({q: m.q, l: m.l}));
const hostile = JSON.parse(JSON.stringify(base));
hostile.deck[0].l = '<img src=x onerror="window.__pwned=1">Cell'; hostile.luminaries[4].l = '<script>window.__pwned=2</script>Crick';
hostile.links[0].why = '<b onmouseover="window.__pwned=3">x</b>'; hostile.links.push({a: 'javascript:alert(1)', b: 'Q1', basis: 'name', why: 'bad'});
hostile.met.push({q: 'Q1"><svg onload=alert(1)>', l: 'bad'}); hostile.theme = 'x'.repeat(5000); hostile.caught.push({q: 'Q12', l: 'A'.repeat(10000)});
const loser = JSON.parse(JSON.stringify(base)); loser.win = false;
fs.writeFileSync(S + 'climb-sample.json', JSON.stringify(base, null, 2));

(async () => {
  const srv = spawn('python3', ['-m', 'http.server', '8781', '--bind', '127.0.0.1'], {cwd: ROOT, stdio: 'ignore'});
  await new Promise(r => setTimeout(r, 800));
  const URL0 = 'http://127.0.0.1:8781/climb.html';
  const b = await chromium.launch(), res = [], ok = (n, c, i) => res.push((c ? 'PASS ' : 'FAIL ') + n + (i !== undefined ? '  ' + JSON.stringify(i) : ''));
  const errs = [];
  async function open(frag, vp, motion) {
    const ctx = await b.newContext({viewport: vp || {width: 1200, height: 900}, deviceScaleFactor: 2, reducedMotion: motion || 'no-preference'});
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    p.on('console', m => { if (m.type() === 'error' && !/ServiceWorker|service worker|sw\.js|fonts\.g/i.test(m.text())) errs.push('console: ' + m.text()); });
    await p.goto(URL0 + (frag ? '#' + frag : ''), {waitUntil: 'domcontentloaded'});
    await p.waitForTimeout(900);
    return {p, ctx};
  }
  const frag = pack(base);
  ok('fragment size (deflate + base64url)', frag.length < 12000, frag.length + ' chars');

  // 1. a typical climb, desktop
  let {p, ctx} = await open(frag);
  ok('title', (await p.textContent('#title')) === 'From Cell to Francis Crick', await p.textContent('#title'));
  ok('lede counts', /five floors of The Machinery of Life, from Cell to Francis Crick\. You met five Luminaries, and all five became your Mentors\. You joined ten pairs of things, .* of them across kinds\./.test(await p.textContent('#lede')), await p.textContent('#lede'));
  ok('all six sections shown', await p.evaluate(() => ['climb','joined','kinds','people','kept','turn'].every(id => !document.getElementById(id).hidden && document.getElementById('page').hidden === false)));
  ok('links paragraph counts bases', /Wikidata records five of those links directly, two rest on a kind or a relation the two cards share, two are matches of names, and one is your own\./.test(await p.textContent('#joinedP')), await p.textContent('#joinedP'));
  ok('turn picks "your own link" first (T1)', (await p.textContent('#turnH')).includes('drawn, not built'), await p.textContent('#turnH'));
  await p.fill('#floorR', '4'); await p.dispatchEvent('#floorR', 'input');
  ok('floor slider: IV shows Rosalind Franklin and the double helix', (await p.textContent('#flLum')) === 'Rosalind Franklin' && (await p.textContent('#flChips')).includes('Nucleic acid double helix'), [await p.textContent('#flLum'), await p.textContent('#flMet')]);
  await p.locator('#kindCv').scrollIntoViewIfNeeded(); const box = await p.locator('#kindCv').boundingBox(); await p.mouse.click(box.x + box.width / 2, box.y + box.height * 0.14);
  ok('kind wheel tap lists cross-kind links', (await p.textContent('#kindSay')).includes('in your deck'), await p.textContent('#kindSay'));
  await p.locator('#webCv').scrollIntoViewIfNeeded(); const wb = await p.locator('#webCv').boundingBox();
  const hitNode = await p.evaluate(() => 1); // canvas: find a node by scanning taps
  let tapped = false;
  for (let gx = 0.1; gx < 0.95 && !tapped; gx += 0.05) for (let gy = 0.1; gy < 0.95 && !tapped; gy += 0.08) { await p.mouse.click(wb.x + wb.width * gx, wb.y + wb.height * gy); if ((await p.textContent('#webSay')).includes(':')) tapped = true; }
  ok('web tap lists a card\'s links with their basis', tapped && (await p.locator('#webWhys li').count()) > 0, await p.textContent('#webSay'));
  ok('every link on the page is Wikidata, GitHub or the site', await p.evaluate(() => [...document.querySelectorAll('a[href]')].every(a => /^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$|^https:\/\/github\.com\/sandstormveg\/glamour-gram\/issues\/new\?|^http:\/\/127\.0\.0\.1:8781\/[a-z-]*\.html|^http:\/\/127\.0\.0\.1:8781\/(#.*)?$/.test(a.href))),
    await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => !/wikidata|github|127/.test(h))));
  ok('suggest link is a pre-filled GitHub issue under 7,500 chars', await p.evaluate(() => { const h = document.getElementById('suggestA').href; return h.startsWith('https://github.com/sandstormveg/glamour-gram/issues/new?title=Climb%20seed') && h.length < 7500; }));
  await p.screenshot({path: S + 'climb-desk-hero.png'});
  await p.screenshot({path: S + 'climb-desk-full.png', fullPage: true});
  ok('climb remembered on this device', await p.evaluate(() => JSON.parse(localStorage.getItem('glamgram.climbs.v1') || '[]').length) === 1);
  await ctx.close();

  // 2. phone width, and a climb without own links: Mentor turn
  ({p, ctx} = await open(pack(noOwn), {width: 390, height: 844}));
  ok('phone: turn is the Mentor turn (T2)', (await p.textContent('#turnH')).includes('you never met'), await p.textContent('#turnH'));
  ok('phone: no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth));
  await p.screenshot({path: S + 'climb-phone-full.png', fullPage: true});
  await ctx.close();

  // 3. a /1 record (what Babel saved before links were kept), uncompressed packing, reduced motion
  ({p, ctx} = await open(packPlain(v1), null, 'reduce'));
  ok('v1 record renders, explains missing links', (await p.textContent('#joinedP')).includes('recorded before Babel kept the links'), await p.textContent('#joinedP'));
  await ctx.close();

  // 4. hostile record: nothing injected, long strings cut, bad ids dropped
  ({p, ctx} = await open(pack(hostile)));
  ok('hostile: no script ran', await p.evaluate(() => !window.__pwned));
  ok('hostile: no element made from record text', await p.evaluate(() => document.querySelectorAll('main img, main svg, main script, main iframe, [onerror], [onload], [onmouseover]').length === 0));
  ok('hostile: label shown as text', (await p.textContent('#title')).includes('<img'), await p.textContent('#title'));
  ok('hostile: long theme cut', (await p.textContent('#climbP')).length < 400);
  await ctx.close();

  // 5. not a summit, a broken link, an empty page listing past climbs
  ({p, ctx} = await open(pack(loser)));
  ok('not a summit: explained', (await p.textContent('#emptyH')).includes('reach the top'), await p.textContent('#emptyH'));
  await ctx.close();
  ({p, ctx} = await open('v1.not!valid'));
  ok('broken link: explained', (await p.textContent('#emptyH')).includes("hold a climb"), await p.textContent('#emptyH'));
  await ctx.close();
  ({p, ctx} = await open(''));
  ok('empty page: invites a climb', (await p.textContent('#emptyP')).includes('Open your GlamGram'));
  // file open: choose the sample file, page re-packs it into the link and renders
  await p.setInputFiles('#fileIn', S + 'climb-sample.json');
  await p.waitForFunction(() => location.hash.startsWith('#v1'), null, {timeout: 5000});
  await p.waitForTimeout(1200);
  ok('file open: packed into the link and rendered', (await p.textContent('#title')) === 'From Cell to Francis Crick', await p.textContent('#title'));
  await ctx.close();

  console.log(res.join('\n'));
  console.log(errs.length ? 'errors: ' + errs.join(' | ') : 'no page errors');
  await b.close(); srv.kill();
})();

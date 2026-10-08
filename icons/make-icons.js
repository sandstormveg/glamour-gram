// Draws the Glamour Gram app icons: the organism from the home page, one cell per page on a golden-angle spiral.
// Run with Node from this folder (`node make-icons.js`) after adding pages, to grow the icon too. No dependencies.
const fs = require("fs"), path = require("path"), zlib = require("zlib");

const HUES = ["dawn", "sea", "dawn", "sea", "ember", "dawn", "sea", "ember", "dawn", "sea"];   // the pages' hues, in order
const RGB = {night:[11,16,22], deep:[18,26,35], dawn:[240,168,90], sea:[111,194,184], ember:[227,115,90]};
const HEX = {night:"#0b1016", deep:"#121a23", dawn:"#f0a85a", sea:"#6fc2b8", ember:"#e3735a"};
const GA = Math.PI*(3 - Math.sqrt(5));

// The same layout as index.html: world units, membrane at radius 0.95.
function layout(){
  const n = HUES.length, c = 0.86/(Math.sqrt(n - 0.4) + 0.62);
  return HUES.map((hue, i) => { const rho = c*Math.sqrt(i + 0.6), a = i*GA - 0.6; return {x:rho*Math.cos(a), y:rho*Math.sin(a), r:0.62*c, hue}; });
}

// Shapes in pixels, painted in order. Coverage comes from signed distance, so edges are antialiased.
function shapes(S, body, rounded){
  const k = body*S/0.95, o = S/2, out = [];
  out.push({kind: rounded ? "rbox" : "box", r: 0.22*S, col: RGB.night, a: 1});
  out.push({kind:"disc", x:o, y:o, r:body*S, col:RGB.sea, a:0.13, fade:0.6});
  out.push({kind:"ring", x:o, y:o, r:body*S, w:Math.max(1.2, 0.013*S), col:RGB.sea, a:0.8});
  for(const c of layout()){
    const x = o + c.x*k, y = o + c.y*k, r = c.r*k;
    out.push({kind:"disc", x, y, r, col:RGB.deep, a:0.95});
    out.push({kind:"ring", x, y, r, w:Math.max(1, 0.012*S), col:RGB[c.hue], a:0.95});
    out.push({kind:"disc", x, y, r:0.34*r, col:RGB[c.hue], a:0.9});
  }
  return out;
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function cover(s, px, py, S){
  if(s.kind === "box") return 1;
  if(s.kind === "rbox"){ const h = S/2 - s.r, qx = Math.abs(px - S/2) - h, qy = Math.abs(py - S/2) - h;
    const d = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - s.r; return clamp(0.5 - d, 0, 1); }
  const d = Math.hypot(px - s.x, py - s.y);
  if(s.kind === "disc") return clamp(0.5 - (d - s.r), 0, 1)*(s.fade ? 1 - s.fade*clamp(d/s.r, 0, 1) : 1);
  return clamp(0.5 - (Math.abs(d - s.r) - s.w/2), 0, 1);
}

function render(S, body, rounded){
  const list = shapes(S, body, rounded), px = Buffer.alloc(S*S*4);
  for(let y=0;y<S;y++) for(let x=0;x<S;x++){
    let r = 0, g = 0, b = 0, a = 0;   // premultiplied
    for(const s of list){
      const al = cover(s, x + 0.5, y + 0.5, S)*s.a; if(!al) continue;
      r = s.col[0]*al + r*(1 - al); g = s.col[1]*al + g*(1 - al); b = s.col[2]*al + b*(1 - al); a = al + a*(1 - al);
    }
    const i = (y*S + x)*4;
    px[i] = a ? Math.round(r/a) : 0; px[i+1] = a ? Math.round(g/a) : 0; px[i+2] = a ? Math.round(b/a) : 0; px[i+3] = Math.round(a*255);
  }
  return png(S, S, px);
}

// A minimal PNG writer: 8-bit RGBA, no interlace.
const CRC = Array.from({length:256}, (_, n) => { let c = n; for(let k=0;k<8;k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
function crc32(buf){ let c = 0xFFFFFFFF; for(const v of buf) c = CRC[(c ^ v) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function chunk(type, data){
  const len = Buffer.alloc(4), crc = Buffer.alloc(4), td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  len.writeUInt32BE(data.length); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function png(w, h, rgba){
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc((w*4 + 1)*h);
  for(let y=0;y<h;y++) rgba.copy(raw, y*(w*4 + 1) + 1, y*w*4, (y + 1)*w*4);
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw, {level:9})), chunk("IEND", Buffer.alloc(0))]);
}

// The favicon is an SVG, bolder so it still reads at 16 pixels.
function svg(){
  const S = 64, body = 0.44, k = body*S/0.95, o = S/2, f = v => +v.toFixed(2);
  const cells = layout().map(c => `<circle cx="${f(o + c.x*k)}" cy="${f(o + c.y*k)}" r="${f(c.r*k*1.08)}" fill="${HEX[c.hue]}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}"><rect width="${S}" height="${S}" rx="14" fill="${HEX.night}"/>` +
    `<circle cx="${o}" cy="${o}" r="${f(body*S)}" fill="${HEX.sea}" fill-opacity=".14" stroke="${HEX.sea}" stroke-width="2.4"/>${cells}</svg>\n`;
}

const dir = path.resolve(process.argv[2] || __dirname);
const files = {
  "icon-192.png": render(192, 0.4, true),
  "icon-512.png": render(512, 0.4, true),
  "maskable-512.png": render(512, 0.34, false),   // inside the 80% safe zone, full bleed
  "apple-touch-icon.png": render(180, 0.38, false),
  "icon.svg": svg()
};
for(const [name, data] of Object.entries(files)){ fs.writeFileSync(path.join(dir, name), data); console.log(name, data.length, "bytes"); }

// Extract the real emblem from imgs/logo.webp and regenerate the full favicon set.
// No hand-drawn approximation: the emblem is cropped from the actual logo art, seated
// on the brand charcoal tile (the emblem is gold/grey, invisible on light tab backgrounds).
// Usage: node tools/make-favicons.mjs [path/to/logo.webp]
import { chromium } from 'playwright-core';
import fs from 'fs';

const LOGO = process.argv[2] || 'imgs/logo.webp';
const BG = '#13171c';                 // brand charcoal
const chromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
];
const exe = chromePaths.find(p => { try { fs.accessSync(p); return true; } catch { return false; } });

const b64 = fs.readFileSync(LOGO).toString('base64');
const logoDataUrl = `data:image/webp;base64,${b64}`;

const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage();

const out = await page.evaluate(async ({ logoDataUrl, BG }) => {
  const img = new Image();
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = logoDataUrl; });
  const W = img.naturalWidth, H = img.naturalHeight;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, W, H).data;
  const isContent = i => {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 24) return false;                 // transparent
    if (r > 240 && g > 240 && b > 240) return false; // white-ish
    return true;
  };
  // Row profile -> find vertical content bands; the TOP band is the emblem (above the wordmark).
  const rows = new Array(H).fill(0);
  for (let y = 0; y < H; y++) { let n = 0; for (let x = 0; x < W; x += 2) if (isContent((y * W + x) * 4)) n++; rows[y] = n; }
  const maxr = Math.max(...rows), thr = maxr * 0.04;
  const bands = []; let inb = false, s = 0;
  for (let y = 0; y < H; y++) {
    if (rows[y] > thr && !inb) { inb = true; s = y; }
    else if (rows[y] <= thr && inb) { inb = false; bands.push([s, y - 1]); }
  }
  if (inb) bands.push([s, H - 1]);
  let [y0, y1] = bands[0];                     // emblem band
  let x0 = W, x1 = 0;                          // tight x bounds within the band
  for (let y = y0; y <= y1; y++) for (let x = 0; x < W; x++) if (isContent((y * W + x) * 4)) { if (x < x0) x0 = x; if (x > x1) x1 = x; }
  const pad = Math.round((x1 - x0) * 0.05);
  x0 = Math.max(0, x0 - pad); x1 = Math.min(W - 1, x1 + pad);
  y0 = Math.max(0, y0 - pad); y1 = Math.min(H - 1, y1 + pad);
  const cw = x1 - x0 + 1, ch = y1 - y0 + 1;

  const makeTile = (size, scale, rounded) => {
    const t = document.createElement('canvas'); t.width = size; t.height = size;
    const g = t.getContext('2d');
    if (rounded) {
      const r = size * 0.22; g.beginPath();
      g.moveTo(r, 0); g.arcTo(size, 0, size, size, r); g.arcTo(size, size, 0, size, r);
      g.arcTo(0, size, 0, 0, r); g.arcTo(0, 0, size, 0, r); g.closePath(); g.clip();
    }
    g.fillStyle = BG; g.fillRect(0, 0, size, size);
    const target = size * scale, ar = cw / ch;
    let dw, dh; if (ar >= 1) { dw = target; dh = target / ar; } else { dh = target; dw = target * ar; }
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(c, x0, y0, cw, ch, (size - dw) / 2, (size - dh) / 2, dw, dh);
    return t;
  };
  // transparent emblem crop (for the SVG <image>), downscaled so the inlined SVG stays small
  const cap = 160, es = Math.min(1, cap / Math.max(cw, ch));
  const ec = document.createElement('canvas'); ec.width = Math.round(cw * es); ec.height = Math.round(ch * es);
  const eg = ec.getContext('2d'); eg.imageSmoothingQuality = 'high';
  eg.drawImage(c, x0, y0, cw, ch, 0, 0, ec.width, ec.height);

  return {
    bbox: [x0, y0, cw, ch], aspect: cw / ch,
    emblem: ec.toDataURL('image/png'),
    png16: makeTile(16, 0.76, false).toDataURL('image/png'),
    png32: makeTile(32, 0.76, false).toDataURL('image/png'),
    apple: makeTile(180, 0.70, false).toDataURL('image/png'),
    i192: makeTile(192, 0.64, false).toDataURL('image/png'),   // maskable safe area
    i512: makeTile(512, 0.64, false).toDataURL('image/png'),
    webp: makeTile(512, 0.64, false).toDataURL('image/webp', 0.92),
  };
}, { logoDataUrl, BG });

await browser.close();

const write = (file, dataUrl) =>
  fs.writeFileSync(file, Buffer.from(dataUrl.split(',')[1], 'base64'));

write('imgs/favicon-16.png', out.png16);
write('imgs/favicon-32.png', out.png32);
write('imgs/apple-touch-icon.png', out.apple);
write('imgs/icon-192.png', out.i192);
write('imgs/icon-512.png', out.i512);
write('imgs/favicon.webp', out.webp);

// SVG favicon: rounded charcoal tile + the real emblem (embedded), matching the PNG tiles.
const SZ = 64, scale = 0.76, ar = out.aspect;
let ew, eh; if (ar >= 1) { ew = SZ * scale; eh = ew / ar; } else { eh = SZ * scale; ew = eh * ar; }
const ex = (SZ - ew) / 2, ey = (SZ - eh) / 2;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SZ} ${SZ}" role="img" aria-label="GrykonX">
  <rect width="${SZ}" height="${SZ}" rx="14" fill="${BG}"/>
  <image x="${ex.toFixed(2)}" y="${ey.toFixed(2)}" width="${ew.toFixed(2)}" height="${eh.toFixed(2)}" href="${out.emblem}"/>
</svg>
`;
fs.writeFileSync('imgs/favicon.svg', svg);

console.log('emblem bbox [x,y,w,h] =', out.bbox, ' aspect =', ar.toFixed(3));
console.log('wrote: favicon-16/32.png, apple-touch-icon.png, icon-192/512.png, favicon.webp, favicon.svg');

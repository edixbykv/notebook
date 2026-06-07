import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const pub = path.join(root, "public");
const app = path.join(root, "src", "app");

await mkdir(pub, { recursive: true });

const PAPER = "#F8F5EE";
const INK = "#111111";
const RED = "#E53935";
const YELLOW = "#FFF176";

/* ---------- OG image (1200x630) ---------- */
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="lines" width="1200" height="48" patternUnits="userSpaceOnUse">
      <rect width="1200" height="48" fill="${PAPER}"/>
      <line x1="0" y1="47" x2="1200" y2="47" stroke="rgba(17,17,17,0.06)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect width="1200" height="630" fill="url(#lines)"/>
  <line x1="120" y1="0" x2="120" y2="630" stroke="rgba(229,57,53,0.25)" stroke-width="3"/>

  <!-- logo -->
  <g transform="translate(72,64)">
    <rect width="72" height="72" rx="16" fill="${INK}"/>
    <text x="36" y="50" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="800" fill="${PAPER}" text-anchor="middle">KV</text>
    <circle cx="60" cy="14" r="7" fill="${RED}"/>
    <text x="92" y="30" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="800" fill="${INK}">KVAI Solutions</text>
    <text x="92" y="60" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#3A3A3A">kvai.in</text>
  </g>

  <!-- headline -->
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="72" y="320" font-size="74" font-weight="800" fill="${INK}">Your competitors are using AI.</text>
    <text x="72" y="408" font-size="74" font-weight="800" fill="${RED}">Are you?</text>
  </g>
  <text x="72" y="470" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#3A3A3A">AI-powered websites, marketing &amp; automation for faster growth.</text>

  <!-- footer -->
  <g transform="translate(72,520)">
    <rect width="360" height="56" rx="28" fill="${YELLOW}"/>
    <text x="180" y="37" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="800" fill="${INK}" text-anchor="middle">Book a Free Consultation</text>
    <text x="392" y="37" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="800" fill="${INK}">Call +91 76781 20635</text>
  </g>
</svg>`;

/* ---------- App icon (square) ---------- */
const iconSvg = (s) => `
<svg width="${s}" height="${s}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="${INK}"/>
  <text x="256" y="338" font-family="Arial, Helvetica, sans-serif" font-size="240" font-weight="800" fill="${PAPER}" text-anchor="middle">KV</text>
  <circle cx="396" cy="116" r="46" fill="${RED}"/>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(path.join(pub, "og.png"));
await sharp(Buffer.from(iconSvg(512))).png().toFile(path.join(app, "icon.png"));
await sharp(Buffer.from(iconSvg(180))).png().toFile(path.join(app, "apple-icon.png"));
await sharp(Buffer.from(iconSvg(48)))
  .resize(48, 48)
  .toFormat("png")
  .toFile(path.join(app, "favicon.png"));

console.log("Generated: public/og.png, src/app/icon.png, apple-icon.png, favicon.png");

// One-off: capture a full-page screenshot of resume.kvai.in into the tablet
// preview format used by the portfolio (public/projects/<slug>.webp).
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const URL = "https://resume.kvai.in/";
const OUT = "public/projects/resume.webp";
const WIDTH = 1440;

const CHROME =
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: 1200, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });
// give lazy content / fonts a moment, then nudge scroll to trigger anims
await page.evaluate(async () => {
  await new Promise((r) => setTimeout(r, 1500));
  window.scrollTo(0, document.body.scrollHeight);
  await new Promise((r) => setTimeout(r, 1200));
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 600));
});

const png = await page.screenshot({ fullPage: true, type: "png" });
await browser.close();

const img = sharp(png);
const meta = await img.metadata();
await img.webp({ quality: 80 }).toFile(OUT);
console.log(`saved ${OUT}  imgW=${meta.width} imgH=${meta.height}`);

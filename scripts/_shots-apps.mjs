// One-off: capture desktop + mobile full-page screenshots for the app projects
// (ecomm / wedding / learn) into the portfolio preview format.
//   public/projects/<slug>.webp        (desktop, 1440 wide)
//   public/projects/<slug>-phone.webp  (mobile,  390 wide @2x)
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const SITES = [
  { slug: "ecomm", url: "https://ecomm.kvai.in/" },
  { slug: "wedding", url: "https://wedding.kvai.in/" },
  { slug: "learn", url: "https://learn.kvai.in/" },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

async function shoot({ url, width, deviceScaleFactor, isMobile, out }) {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height: 1200,
    deviceScaleFactor,
    isMobile,
    hasTouch: isMobile,
  });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 90000 });
  await page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 1500));
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 1200));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  const png = await page.screenshot({ fullPage: true, type: "png" });
  await page.close();
  const meta = await sharp(png).metadata();
  await sharp(png).webp({ quality: 80 }).toFile(out);
  console.log(`saved ${out}  imgW=${meta.width} imgH=${meta.height}`);
}

for (const { slug, url } of SITES) {
  await shoot({
    url,
    width: 1440,
    deviceScaleFactor: 1,
    isMobile: false,
    out: `public/projects/${slug}.webp`,
  });
  await shoot({
    url,
    width: 390,
    deviceScaleFactor: 2,
    isMobile: true,
    out: `public/projects/${slug}-phone.webp`,
  });
}

await browser.close();

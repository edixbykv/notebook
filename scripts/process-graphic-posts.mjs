import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const srcDir = "./Post";
const outDir = "./public/portfolio/graphic";

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const items = [
  { file: "395541771_572646b9-2215-427d-ae70-adb357599214.jpg", slug: "social-campaign-1", title: "Brand Launch Campaign", client: "KVai Creatives", tag: "Social Media" },
  { file: "Aditi-100.jpg", slug: "aditi-story", title: "Vertical Editorial Story", client: "Aditi Couture", tag: "Poster / Story" },
  { file: "Aditi-a-100.jpg", slug: "aditi-banner", title: "Luxury Brand Header", client: "Aditi Couture", tag: "Banner" },
  { file: "BHARAT09.jpg", slug: "bharat-post", title: "Festival Growth Post", client: "Bharat Retail", tag: "Social Post" },
  { file: "bright01-100.jpg", slug: "bright-post", title: "Commercial Promotion", client: "Bright Electronics", tag: "Ad Creative" },
  { file: "CC.png", slug: "cc-creative", title: "Content System Graphic", client: "Creator Hub", tag: "Branding" },
  { file: "ChatGPT Image Jul 16, 2026, 05_50_58 PM.png", slug: "ai-creative-1", title: "AI Automation Visual", client: "KVai AI Labs", tag: "AI Art" },
  { file: "ChatGPT Image Jul 16, 2026, 08_35_24 AM.png", slug: "ai-creative-2", title: "Future of Tech Post", client: "KVai AI Labs", tag: "AI Art" },
  { file: "Company Profile.webp", slug: "company-profile", title: "Corporate Profile Deck", client: "Apex Group", tag: "Brochure" },
  { file: "DENT.jpg", slug: "dental-care-1", title: "Healthcare Patient Trust", client: "DentCare Dental", tag: "Healthcare" },
  { file: "DENT2.jpg", slug: "dental-care-2", title: "Smile Transformation Post", client: "DentCare Dental", tag: "Healthcare" },
  { file: "features-100.jpg", slug: "features-banner", title: "Feature Highlights Banner", client: "TechStack", tag: "Banner" },
  { file: "Final_SALTY SPOON.jpg", slug: "salty-spoon", title: "Salty Spoon Food Branding", client: "Salty Spoon Diner", tag: "Food & Beverage" },
  { file: "GORE01.jpg", slug: "gore-campaign-1", title: "Premium Skincare Creative 1", client: "Gore Aesthetics", tag: "Skincare" },
  { file: "GORE07-100.jpg", slug: "gore-campaign-2", title: "Premium Skincare Creative 2", client: "Gore Aesthetics", tag: "Skincare" },
  { file: "OM01-100.jpg", slug: "om-brand-1", title: "Omni Growth Post 1", client: "OM Enterprises", tag: "Marketing" },
  { file: "OM09.jpg", slug: "om-brand-2", title: "Omni Growth Post 2", client: "OM Enterprises", tag: "Marketing" },
  { file: "OM12-100.jpg", slug: "om-brand-3", title: "Omni Growth Post 3", client: "OM Enterprises", tag: "Marketing" },
  { file: "RKS-100.jpg", slug: "rks-post-1", title: "Corporate Leadership Post", client: "RKS Global", tag: "Corporate" },
  { file: "RKSs-100.jpg", slug: "rks-post-2", title: "Strategic Business Poster", client: "RKS Global", tag: "Corporate" },
  { file: "RR1-100.jpg", slug: "rr-banner", title: "Retail Special Offer Banner", client: "RR Stores", tag: "Banner" },
  { file: "VELVET OUD V1-100.jpg", slug: "velvet-oud", title: "Velvet Oud Luxury Perfume", client: "Velvet Oud", tag: "Luxury Goods" },
  { file: "WhatsApp Image 2026-07-16 at 11.36.54 AM.jpeg", slug: "brand-showcase-custom", title: "Social Media Offer Post", client: "KVai Client", tag: "Social Post" }
];

async function run() {
  const resultData = [];
  for (const item of items) {
    const srcFile = path.join(srcDir, item.file);
    const outFile = path.join(outDir, `${item.slug}.webp`);

    const image = sharp(srcFile);
    const meta = await image.metadata();

    let resized = image;
    if ((meta.width && meta.width > 1200) || (meta.height && meta.height > 1200)) {
      resized = image.resize({
        width: meta.width >= meta.height ? 1200 : undefined,
        height: meta.height > meta.width ? 1200 : undefined,
        fit: "inside"
      });
    }

    await resized.webp({ quality: 85 }).toFile(outFile);
    const outMeta = await sharp(outFile).metadata();

    resultData.push({
      slug: item.slug,
      title: item.title,
      client: item.client,
      tag: item.tag,
      image: `/portfolio/graphic/${item.slug}.webp`,
      width: outMeta.width,
      height: outMeta.height,
      aspectRatio: +((outMeta.width || 1) / (outMeta.height || 1)).toFixed(2),
    });
    console.log(`Processed ${item.slug}.webp (${outMeta.width}x${outMeta.height})`);
  }

  const dataDir = "./src/data";
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync("./src/data/graphic-portfolio.json", JSON.stringify(resultData, null, 2));
  console.log("Saved graphic portfolio metadata to ./src/data/graphic-portfolio.json");
}

run();

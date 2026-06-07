# KVAI Solutions — Premium Notebook Website

A world-class, conversion-focused website for **KVAI Solutions** (AI-Powered
Business Growth Partner) — designed to feel like a strategist's premium business
notebook brought to life.

> _"AI should empower people, not replace them."_

## ✨ Highlights

- **Realistic notebook design** — paper texture, ruled pages, red margin lines,
  sticky notes, hand-drawn arrows, marker highlights, sketch circles and doodles.
- **Website-wide drawing layer** — visitors can sketch anywhere with a pen,
  pick colours, change brush size, erase and clear. Mouse + touch, never blocks
  clicks (opt-in via the floating sketch-pad button), and clears on refresh.
- **Notebook page-turn transitions** — navigating between pages flips a hinged
  paper sheet away from the left spine to reveal the next page (3D fold on
  desktop, lightweight slide on mobile, disabled for reduced-motion).
- **GSAP + Framer Motion animations** — self-drawing SVG arrows/underlines,
  scroll-triggered reveals, floating sticky notes, settling doodles.
- **Lenis smooth scroll**, fully **responsive** (mobile → desktop, each
  breakpoint intentionally laid out, no horizontal scroll).
- **Complete SEO** — SSR/SSG, Metadata API (dynamic titles & descriptions),
  Open Graph + Twitter cards, canonical URLs, `robots.txt`, `sitemap.xml`,
  and JSON-LD (Organization, LocalBusiness, WebSite, Service, FAQ, Breadcrumb,
  BlogPosting).
- **Accessibility** — skip link, focus styles, semantic landmarks, reduced-motion
  support, ARIA on interactive controls.

## 🧱 Tech Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · GSAP · Framer Motion ·
Lenis · Lucide Icons · class-variance-authority (shadcn-style UI).

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

### Regenerating images

OG / icon images are pre-rendered to static PNGs (better Lighthouse + portable):

```bash
node scripts/gen-images.mjs   # writes public/og.png, src/app/icon.png, apple-icon.png
```

## 🗂️ Structure

```
src/
├─ app/                     # routes (App Router)
│  ├─ layout.tsx            # fonts, metadata, header/footer, drawing layer
│  ├─ template.tsx          # page-turn transition wrapper (re-mounts per nav)
│  ├─ page.tsx              # home (9 sections)
│  ├─ services/             # overview + [slug] detail pages
│  ├─ portfolio/ about/ blog/ (+ [slug]) contact/
│  ├─ sitemap.ts robots.ts manifest.ts
│  └─ icon.png apple-icon.png
├─ components/
│  ├─ drawing/              # website-wide sketch canvas
│  ├─ providers/            # Lenis smooth scroll + page transition
│  ├─ layout/               # header, footer, logo, page hero, breadcrumbs
│  ├─ notebook/             # sticky notes, doodles, highlights, accordion…
│  ├─ sections/             # hero, problem, services, portfolio, faq…
│  └─ ui/                   # button
├─ hooks/use-gsap.ts        # reveal / draw-path / parallax hooks
└─ lib/                     # site config, SEO helpers, JSON-LD schemas
```

## ⚙️ Configuration

All business content (brand, phone, services, portfolio, FAQs, blog posts) lives
in **`src/lib/site.ts`** — edit there to update the site. Update the production
domain in `siteConfig.url` (`https://kvai.in`).

## 📞 Contact

Phone: **+91 76781 20635** · Web: **https://kvai.in**

---

> Note: OG/icon images are static PNGs rather than `next/og` runtime routes —
> this keeps generation portable (the `@vercel/og` font loader fails on local
> paths containing spaces) and improves performance.

export const siteConfig = {
  name: "KVAI Solutions",
  legalName: "KVAI Solutions",
  tagline: "AI-Powered Business Growth Partner",
  principle: "AI should empower people, not replace them.",
  description:
    "KVAI Solutions is your AI-powered business growth partner. We build mobile-first websites, drive social media growth, and deploy AI automation that helps businesses grow faster — combining human creativity with artificial intelligence.",
  url: "https://kvai.in",
  phone: "7678120635",
  phoneDisplay: "+91 76781 20635",
  phoneHref: "tel:+917678120635",
  whatsapp: "https://wa.me/917678120635",
  email: "hello@kvai.in",
  emailHref: "mailto:hello@kvai.in",
  locale: "en_IN",
  ogImage: "https://kvai.in/og.png",
  twitter: "@kvaisolutions",
  address: {
    locality: "New Delhi",
    region: "Delhi",
    country: "IN",
    countryName: "India",
  },
  founded: "2023",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Website Development",
        href: "/services/website-development",
        description: "Fast, SEO-ready, mobile-first websites that convert.",
      },
      {
        label: "Social Media Growth",
        href: "/services/social-media-growth",
        description: "Content + strategy that builds a real audience.",
      },
      {
        label: "AI Automation",
        href: "/services/ai-automation",
        description: "Automate the busywork. Scale without burning out.",
      },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    slug: "website-development",
    number: "01",
    title: "Website Development",
    short: "Websites that work as hard as you do.",
    color: "sticky" as const,
    rotate: "-2deg",
    tagline: "Fast. Found. Converts.",
    description:
      "We design and build mobile-first, lightning-fast websites engineered to rank on Google and turn visitors into customers — not just look pretty.",
    benefits: [
      "More qualified leads from organic search",
      "Sub-2-second load times on mobile",
      "A site that sells while you sleep",
    ],
    features: [
      "Mobile-first responsive design",
      "Next.js + modern performance stack",
      "On-page SEO baked in from day one",
      "Conversion-focused copy & layout",
      "Analytics & lead tracking setup",
      "Ongoing care & support plans",
    ],
    cta: "Get a Website That Converts",
  },
  {
    slug: "social-media-growth",
    number: "02",
    title: "Social Media Growth",
    short: "Turn scrollers into customers.",
    color: "marker" as const,
    rotate: "1.5deg",
    tagline: "Content that compounds.",
    description:
      "We build content systems and growth strategies that grow a real, engaged audience — and route that attention straight to your business.",
    benefits: [
      "Consistent, on-brand content without the stress",
      "Audience growth that actually buys",
      "A pipeline of attention you own",
    ],
    features: [
      "Content strategy & calendar",
      "Short-form video & reels direction",
      "AI-assisted content production",
      "Community engagement systems",
      "Paid + organic growth funnels",
      "Monthly performance reporting",
    ],
    cta: "Grow My Audience",
  },
  {
    slug: "ai-automation",
    number: "03",
    title: "AI Automation",
    short: "Automate the busywork. Keep the humans.",
    color: "ink" as const,
    rotate: "-1deg",
    tagline: "Work smarter, not harder.",
    description:
      "We map your repetitive workflows and replace them with smart AI automations — so your team spends time on what humans do best.",
    benefits: [
      "Hours saved every single week",
      "Faster lead response, more closed deals",
      "Scale operations without scaling headcount",
    ],
    features: [
      "Workflow & process audit",
      "AI chatbots & lead qualification",
      "CRM & tool integrations",
      "Automated reports & follow-ups",
      "Custom GPT / agent workflows",
      "Training so your team stays in control",
    ],
    cta: "Automate My Business",
  },
];

export const faqs = [
  {
    q: "What exactly does KVAI Solutions do?",
    a: "We're an AI-powered growth partner. We build high-converting websites, grow your social media, and automate repetitive work with AI — all designed to help your business grow faster while keeping humans in the driver's seat.",
  },
  {
    q: "Will AI replace my team?",
    a: "No — and that's our core principle. AI should empower people, not replace them. We use AI to remove busywork so your team can focus on strategy, creativity, and relationships that machines can't replicate.",
  },
  {
    q: "How long does a typical website take?",
    a: "Most marketing websites launch in 2–4 weeks depending on scope and content readiness. We'll give you a clear timeline and milestones before we start.",
  },
  {
    q: "Do you work with small businesses and startups?",
    a: "Absolutely. We tailor our packages for solo founders, local businesses, and growing startups — not just large enterprises. Book a free consultation and we'll find the right fit.",
  },
  {
    q: "How is your SEO different?",
    a: "We build SEO into the foundation — server-side rendering, clean structured data, fast load times, and content strategy — instead of bolting it on later. The result is sites that consistently rank and convert.",
  },
  {
    q: "What does the free consultation include?",
    a: "A focused 30-minute call where we audit your current presence, identify your biggest growth opportunities, and give you a clear, no-pressure action plan — whether you work with us or not.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We dig into your business, goals, and customers to find the real growth levers worth pulling.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We design and develop your website, content systems, and automations — fast, and with care.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "We ship it to the world, wire up tracking, and make sure everything converts from day one.",
  },
  {
    number: "04",
    title: "Scale",
    description:
      "We measure, optimise, and add AI leverage so your growth keeps compounding month over month.",
  },
];

export const problems = [
  {
    title: "No online visibility",
    note: "Customers can't find you on Google or social — so they find your competitor instead.",
  },
  {
    title: "Poor lead generation",
    note: "Traffic comes, but nobody books, buys, or calls. The funnel leaks everywhere.",
  },
  {
    title: "Manual repetitive work",
    note: "Your team drowns in copy-paste tasks that a smart automation could handle in seconds.",
  },
  {
    title: "Lack of automation",
    note: "Follow-ups slip, leads go cold, and growth depends entirely on you remembering things.",
  },
  {
    title: "Slow business growth",
    note: "You're working harder than ever, but the numbers just aren't moving fast enough.",
  },
];

export const whyKvai = [
  {
    title: "Mobile-first websites",
    description:
      "Designed for thumbs first. Most of your customers are on a phone — so that's where we start.",
  },
  {
    title: "SEO-focused development",
    description:
      "Built to be found. Structured data, speed, and clean code that Google actually rewards.",
  },
  {
    title: "AI-powered workflows",
    description:
      "We bake intelligent automation into how you operate, not just bolt a chatbot on top.",
  },
  {
    title: "Faster business growth",
    description:
      "Every decision is measured against one question: will this move the business forward?",
  },
  {
    title: "Human + AI approach",
    description:
      "AI does the heavy lifting; humans bring the taste, judgement, and relationships.",
  },
  {
    title: "Modern technology stack",
    description:
      "Next.js, TypeScript, and a best-in-class toolset — future-proof, fast, and reliable.",
  },
];

export const testimonials = [
  {
    quote:
      "KVAI rebuilt our website and our leads doubled in two months. It finally feels like our site is working for us.",
    name: "Rahul Mehta",
    role: "Founder, Mehta Interiors",
    highlight: "leads doubled in two months",
  },
  {
    quote:
      "The AI automations they set up save my team at least 15 hours a week. Game-changing for a small business.",
    name: "Priya Sharma",
    role: "Director, Bloom Wellness",
    highlight: "save my team 15 hours a week",
  },
  {
    quote:
      "Our Instagram went from invisible to a real lead source. Smart strategy, consistent content, real results.",
    name: "Arjun Verma",
    role: "Owner, Verma Fitness Studio",
    highlight: "a real lead source",
  },
];

export const portfolio = [
  {
    slug: "mehta-interiors",
    client: "Mehta Interiors",
    category: "Website Development",
    color: "sticky" as const,
    rotate: "-2deg",
    summary: "A premium portfolio site that turned browsers into booked consultations.",
    before: "Outdated site, no leads, invisible on Google.",
    after: "2× monthly leads, page-1 ranking for local keywords.",
    metrics: [
      { label: "Leads", value: "+112%" },
      { label: "Load time", value: "1.4s" },
      { label: "SEO score", value: "98" },
    ],
  },
  {
    slug: "bloom-wellness",
    client: "Bloom Wellness",
    category: "AI Automation",
    color: "marker" as const,
    rotate: "1.5deg",
    summary: "Automated booking, reminders, and follow-ups for a busy wellness studio.",
    before: "Manual bookings, missed follow-ups, no-shows.",
    after: "15 hrs/week saved, 40% fewer no-shows.",
    metrics: [
      { label: "Hours saved", value: "15/wk" },
      { label: "No-shows", value: "-40%" },
      { label: "Rebookings", value: "+58%" },
    ],
  },
  {
    slug: "verma-fitness",
    client: "Verma Fitness Studio",
    category: "Social Media Growth",
    color: "ink" as const,
    rotate: "-1deg",
    summary: "A content engine that turned a quiet Instagram into a lead machine.",
    before: "300 followers, zero leads from social.",
    after: "11k followers, 30+ leads a month from reels.",
    metrics: [
      { label: "Followers", value: "11k+" },
      { label: "Leads/mo", value: "30+" },
      { label: "Reach", value: "+900%" },
    ],
  },
  {
    slug: "spice-route",
    client: "Spice Route Bistro",
    category: "Website Development",
    color: "sticky" as const,
    rotate: "2deg",
    summary: "A mouth-watering restaurant site with online table reservations.",
    before: "Phone-only bookings, no online menu.",
    after: "Online reservations live, +35% weekend covers.",
    metrics: [
      { label: "Reservations", value: "+35%" },
      { label: "Mobile speed", value: "97" },
      { label: "Bounce", value: "-22%" },
    ],
  },
  {
    slug: "nova-consulting",
    client: "Nova Consulting",
    category: "AI Automation",
    color: "marker" as const,
    rotate: "-1.5deg",
    summary: "An AI lead-qualifier that books meetings while the team sleeps.",
    before: "Slow lead response, leads going cold.",
    after: "Instant replies, 3× more qualified meetings.",
    metrics: [
      { label: "Response", value: "<1 min" },
      { label: "Meetings", value: "3×" },
      { label: "Cost/lead", value: "-46%" },
    ],
  },
  {
    slug: "urban-threads",
    client: "Urban Threads",
    category: "Social Media Growth",
    color: "ink" as const,
    rotate: "1deg",
    summary: "A viral-leaning content system for a homegrown fashion label.",
    before: "Inconsistent posting, flat sales.",
    after: "2 viral reels, +180% store visits.",
    metrics: [
      { label: "Store visits", value: "+180%" },
      { label: "Engagement", value: "+260%" },
      { label: "Sales", value: "+74%" },
    ],
  },
];

export const blogPosts = [
  {
    slug: "ai-for-small-business-growth",
    title: "How Small Businesses Can Actually Use AI to Grow (Without the Hype)",
    excerpt:
      "Forget the buzzwords. Here are practical, proven ways small businesses are using AI today to win more customers and save real hours.",
    category: "AI Strategy",
    date: "2026-05-28",
    readTime: "6 min read",
    color: "sticky" as const,
  },
  {
    slug: "website-that-converts",
    title: "The Anatomy of a Website That Actually Converts",
    excerpt:
      "A beautiful website that doesn't generate leads is just an expensive brochure. Here's what high-converting sites do differently.",
    category: "Web Development",
    date: "2026-05-14",
    readTime: "7 min read",
    color: "marker" as const,
  },
  {
    slug: "social-media-content-system",
    title: "Build a Content System, Not Just Content",
    excerpt:
      "Random posting is exhausting and ineffective. Learn how to build a repeatable content engine that grows your audience on autopilot.",
    category: "Social Media",
    date: "2026-04-30",
    readTime: "5 min read",
    color: "ink" as const,
  },
  {
    slug: "automation-workflows-to-start-with",
    title: "5 Automation Workflows Every Business Should Set Up First",
    excerpt:
      "Not sure where to start with automation? These five workflows deliver the fastest return for almost any business.",
    category: "Automation",
    date: "2026-04-12",
    readTime: "8 min read",
    color: "sticky" as const,
  },
  {
    slug: "human-plus-ai",
    title: "Why the Future Is Human + AI, Not Human vs AI",
    excerpt:
      "The businesses winning with AI aren't replacing people — they're amplifying them. Here's the mindset shift that matters.",
    category: "AI Strategy",
    date: "2026-03-22",
    readTime: "6 min read",
    color: "marker" as const,
  },
  {
    slug: "local-seo-checklist",
    title: "The Local SEO Checklist That Gets You Found in 2026",
    excerpt:
      "If local customers can't find you on Google, you're invisible. This checklist covers everything that moves the needle.",
    category: "SEO",
    date: "2026-03-05",
    readTime: "9 min read",
    color: "ink" as const,
  },
];

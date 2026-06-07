import type { Metadata, Viewport } from "next";
import {
  Inter,
  Fraunces,
  Caveat,
  Permanent_Marker,
} from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { DrawingLayer } from "@/components/drawing/drawing-layer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { JsonLd } from "@/components/seo/json-ld";
import {
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
} from "@/lib/schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["600", "700"],
});

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-permanent",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata(),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  formatDetection: { telephone: true, email: true, address: true },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#F8F5EE",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable} ${permanentMarker.variable}`}
      suppressHydrationWarning
    >
      <body className="font-feature-default min-h-screen">
        <noscript>
          <style>{`.reveal-on-scroll,.reveal-item,.reveal-load{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            localBusinessSchema(),
          ]}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
        <MobileCtaBar />
        <DrawingLayer />
      </body>
    </html>
  );
}

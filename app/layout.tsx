import type { Metadata, Viewport } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

// brand-nw.com uses Suisse Int'l; Inter Tight is the closest free match.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "MARLBS · Mustafa Kapadiya, Senior UI/UX Product Designer, Dubai";
const description =
  "Mustafa Kapadiya, Senior UI/UX Product Designer in Dubai. From Pune to Dubai: craft, enterprise products, government design systems and service journeys, and now AI and HubSpot. Articulation with logic.";

// Absolute base for social preview images. On Vercel this is picked up automatically;
// set NEXT_PUBLIC_SITE_URL (e.g. https://marlbs.com) if you use a custom domain.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/mustafa-kapadiya.webp", alt: "Mustafa Kapadiya" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/mustafa-kapadiya.webp"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F0F0E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

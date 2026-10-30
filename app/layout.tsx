import type { Metadata, Viewport } from "next";
import { Antonio } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Tall condensed face for the case-study titles.
const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

// Geist (sans + mono) ships with the site via the `geist` package: the clean grotesk
// behind graysunderland.com, used for the journey reel and the display type.

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
  themeColor: "#0C0C0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${antonio.variable}`}>
      <body>{children}</body>
    </html>
  );
}

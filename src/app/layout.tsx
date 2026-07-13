// Types
import type { Metadata, Viewport } from "next";
type Props = Readonly<{ children: React.ReactNode }>;

// Next
import { Instrument_Sans } from "next/font/google";

// Styles
import "./globals.scss";
import Script from "next/script";

/**
 * Metadata export
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (process.env.NODE_ENV === "production" && !siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be configured in production.");
}

const metadataBase = new URL(siteUrl ?? "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,

  title: {
    default: "LiveAxis",
    template: "%s | LiveAxis",
  },

  description:
    "LiveAxis builds powerful technology for venues and live entertainment, including digital signage, ordering and operational management tools.",

  applicationName: "LiveAxis",
  authors: [{ name: "LiveAxis", url: metadataBase }],
  creator: "LiveAxis",
  publisher: "LiveAxis",
  category: "Technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "LiveAxis",
    title: "LiveAxis",
    description:
      "Powerful technology built for venues and the live entertainment industry.",
    locale: "en_GB",
  },

  twitter: {
    card: "summary_large_image",
    title: "LiveAxis",
    description:
      "Powerful technology built for venues and the live entertainment industry.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

/**
 * Root application layout
 */
export default function RootLayout({ children }: Props): React.ReactNode {
  return (
    <html lang="en-GB" className={instrumentSans.variable}>
      <body>{children}</body>
    </html>
  );
}

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
export const metadata: Metadata = {
  title: "LiveAxis",
  description: "A new way to manage digital signage.",
  authors: [{ name: "LiveAxis" }],
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

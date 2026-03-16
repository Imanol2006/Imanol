import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"]
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Imanol Galvan | Portfolio",
  description:
    "A portfolio for Imanol Galvan, a UTEP computer science student building across software engineering, AI, leadership, and entrepreneurship."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} ${sora.variable} bg-[var(--color-bg)] font-sans text-[var(--color-text)] antialiased`}>
        {children}
      </body>
    </html>
  );
}

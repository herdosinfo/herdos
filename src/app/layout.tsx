import type { Metadata } from "next";
import { Kalam, Patrick_Hand } from "next/font/google";
import "./globals.css";

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["700"],
});

const patrick = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Herdos — Hand-Drawn AgTech Toolkit",
  description: "A hand-drawn design system for AgTech research, livestock market analysis, and field workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kalam.variable} ${patrick.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper text-foreground">{children}</body>
    </html>
  );
}

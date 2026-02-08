import React from "react"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./layout-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ndi Raoul - Full Stack Developer",
  description: "Full Stack Developer Portfolio - Crafting digital experiences with cutting-edge web technologies",
  keywords: "Full Stack Developer, React, Next.js, Firebase, TypeScript, Web Development",
  authors: [{ name: "Ndi Raoul" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ndi-raoul.com",
    title: "Ndi Raoul - Full Stack Developer",
    description: "Full Stack Developer Portfolio",
  },
};

import HeroParticles from "@/components/animations/HeroParticles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <HeroParticles />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

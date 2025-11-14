import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jiilan Nashrulloh Tanjung — Full-Stack & Mobile Developer",
  description: "The depressed man who hates coding but writes it anyway. Full-stack developer specializing in Next.js, React, TypeScript, and modern web technologies.",
  keywords: ["full-stack developer", "mobile developer", "Next.js", "React", "TypeScript", "web development"],
  authors: [{ name: "Jiilan Nashrulloh Tanjung" }],
  openGraph: {
    title: "Jiilan Nashrulloh Tanjung — Full-Stack & Mobile Developer",
    description: "The depressed man who hates coding but writes it anyway.",
    type: "website",
    locale: "en_US",
    siteName: "Jiilan Nashrulloh Tanjung Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiilan Nashrulloh Tanjung — Full-Stack & Mobile Developer",
    description: "The depressed man who hates coding but writes it anyway.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maphy",
  description: "A chat-based Maths, Physics, Computer Science, Graphs Research & Assistance powered by Gemini.",
  authors: [
    {
      name: "Rohit Solanki",
      url: "https://solanki-rohit-portfolio.vercel.app",
    }
  ],
  keywords: [
    "Maphy",
    "Maths Assistant",
    "Physics Assistant",
    "Computer Science Assistant",
    "Graphing Assistant",
    "Gemini AI",
    "Google Gemini",
    "AI Chatbot",
    "Maths Tutor",
    "Physics Tutor",
    "Coding Help",
    "Graphing Calculator",
    "Open Source",
    "Free Forever",
  ],
  openGraph: {
    title: "Maphy",
    description: "A chat-based Maths, Physics, Computer Science, Graphs Research & Assistance powered by Gemini.",
    url: "https://maphy.vercel.app",
    siteName: "Maphy",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Maphy Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}

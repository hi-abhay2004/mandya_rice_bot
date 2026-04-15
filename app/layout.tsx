import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ChatProvider } from "@/context/ChatContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mandya Raita Mitra – AI Farming Assistant",
  description: "AgriChatBot for rice farmers in Mandya, Karnataka. Crop disease detection, yield prediction, and expert farming guidance.",
  keywords: ["agriculture", "farming", "Mandya", "Karnataka", "rice", "crop disease", "yield prediction"],
  openGraph: {
    title: "Mandya Raita Mitra",
    description: "AI Farming Assistant for Mandya Rice Farmers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

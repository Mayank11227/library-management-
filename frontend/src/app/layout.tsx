import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "LibraryOS | Next-Gen Library Management",
  description: "Futuristic library management and student productivity platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} dark antialiased`}>
      <body className="font-sans selection:bg-blue-500/30 bg-[#050A18] text-slate-100 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

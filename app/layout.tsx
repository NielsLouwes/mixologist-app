import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mixologist App",
  description: "Quiz yourself on your cocktail knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased py-4 px-4 md:py-8 md:px-8 lg:px-16`}
      >
        <nav className="mb-8 md:mb-12">
          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link href="/">
              <button className="brutal-border bg-[#FFD700] px-6 py-3 font-bold text-lg brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer uppercase tracking-wide">
                Home
              </button>
            </Link>
            <Link href="/search">
              <button className="brutal-border bg-[#87CEEB] px-6 py-3 font-bold text-lg brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer uppercase tracking-wide">
                Search By Ingredient
              </button>
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

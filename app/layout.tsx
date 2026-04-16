import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Addy Meals - Desi Soul, Healthy Goal",
  description: "Nutrition-first food platform combining familiar Indian flavors with modern nutrition principles.",
  icons: {
    icon: "https://i.ibb.co/cc1RgLLz/BEIGE-VERTICAL-LOGO-ALT.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito, Fraunces } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cheurn Lyheng | Full-Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Cheurn Lyheng — a full-stack developer and UI/UX designer crafting clean, functional, and delightful digital experiences.",
};

export const viewport = {
  themeColor: "#f6f1e6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${fraunces.variable} bg-[#f6f1e6] font-sans antialiased`}
        suppressHydrationWarning
      >
        <ScrollProgress />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

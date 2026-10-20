import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cheurn Lyheng | Full-Stack Developer & UI/UX Designer",
  description:
    "Portfolio of Cheurn Lyheng — a full-stack developer and UI/UX designer crafting clean, functional, and delightful digital experiences.",
};

export const viewport = {
  themeColor: "#fbfbfb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body
        className="bg-[#fbfbfb] font-sans antialiased"
        suppressHydrationWarning
      >
        <ScrollProgress />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
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
  themeColor: "#faf9f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} bg-[#faf9f6] font-sans antialiased`}
        suppressHydrationWarning
      >
        <ScrollProgress />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}

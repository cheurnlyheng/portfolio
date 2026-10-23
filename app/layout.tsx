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

const siteUrl = "https://cheurnlyheng.com";
const siteTitle = "Cheurn Lyheng | Full-Stack Developer & UI/UX Designer & Software Tester";
const siteDescription =
  "Portfolio of Cheurn Lyheng (Lyheng Cheurn) — a full-stack developer and UI/UX designer in Phnom Penh, Cambodia, with a software tester's mindset, crafting clean, functional, and delightful digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Cheurn Lyheng",
  },
  description: siteDescription,
  keywords: [
    "Cheurn Lyheng",
    "Lyheng Cheurn",
    "CheurnLyheng",
    "LyhengCheurn",
    "Lyheng",
    "Cheurn Lyheng portfolio",
    "Lyheng developer",
    "full-stack developer Cambodia",
    "web developer Phnom Penh",
    "UI/UX designer Cambodia",
  ],
  authors: [{ name: "Cheurn Lyheng", url: siteUrl }],
  creator: "Cheurn Lyheng",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "NA4xELIIuTkQaW6GpjPdfxksxKteEXiLLKe1NN_Spjs",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Cheurn Lyheng",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
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

import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import ViewCanvas from "@/components/ViewCanvas";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Porsche 918 Spyder — Asphalt Edition | 3D Experience",
  description:
    "Immersive 3D interactive showcase of the iconic Porsche 918 Spyder hybrid supercar. Powered by Next.js, Three.js, and GSAP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${mulish.className} bg-black text-white antialiased selection:bg-sky-500 selection:text-white`}>
        <ViewCanvas />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

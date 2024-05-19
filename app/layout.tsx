import "../styles/globals.css";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { PT_Serif } from "next/font/google";

import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const ptSerif = PT_Serif({ 
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Meditor",
  description: "A Medium-like editor built with TipTap and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      <body className={ptSerif.className}>
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-end">
          <Navbar className="absolute top-2 mr-4" />
        </div>
        {children}
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

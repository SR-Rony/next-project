// app/layout.tsx
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "./redux/provider";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import DashboardNavbar from "@/components/dashboard/navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {isDashboard ? <DashboardNavbar /> : <Header />}
          {children}
          {!isDashboard && <Footer />}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

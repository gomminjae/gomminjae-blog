// src/app/layout.tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../app/globals.css";
import Header from "../app/components/Header";
import SplineBackground from "../app/SplineBackground"; // 추가

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Spline 3D 배경 */}
        <SplineBackground />

        {/* 레이아웃 */}
        <div className="flex relative">
          {/* Left Sidebar */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 p-6 bg-transparent">{children}</main>
        </div>
      </body>
    </html>
  );
}

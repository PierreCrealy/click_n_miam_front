import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Utensils} from "lucide-react";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          {/* Header */}
          <header className="bg-orange-500 p-6 text-white text-center">
              <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                  <Utensils className="h-8 w-8" />
                  Borne de Commande
              </h1>
          </header>

          {children}

          {/* Footer */}
          <footer className="bg-white border border-gray-200 p-6 text-center fixed bottom-0 w-full">
              <span className="text-sm font-bold flex items-center justify-center gap-2">
                  © Copyright 2025 by <h3 className="text-orange-500">Notre Dame du Roc</h3>
              </span>
          </footer>

      </body>
    </html>
  );
}

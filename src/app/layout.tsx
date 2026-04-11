import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Твои настройки для Google
export const metadata: Metadata = {
  title: "FLIPINTEL — Калькулятор арбитража скинов CS2 и Dota 2",
  description: "Профессиональный инструмент для расчета профита, маржинальности и арбитража скинов между Steam, DMarket и Skinport. Считай чистую прибыль с учетом комиссий.",
  keywords: ["арбитраж скинов", "калькулятор цен кс2", "трейд дота 2", "profit calculator cs2", "skin arbitrage", "flipintel"],
  openGraph: {
    title: "FLIPINTEL | Арбитраж нового поколения",
    description: "Рассчитай свой профит в два клика. Поддержка Steam, DMarket, Skinport.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}